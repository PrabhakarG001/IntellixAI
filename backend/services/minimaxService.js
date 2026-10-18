import { setTimeout as delay } from 'node:timers/promises';
import { readSse, SseProtocolError } from '../../shared/sse.js';
import { AppError } from '../utils/errors.js';

export const MINIMAX_MODEL = 'MiniMax-M3';
export const MINIMAX_ENDPOINT = 'https://api.minimax.io/v1/chat/completions';

export function isMinimaxConfigured() {
  const key = process.env.MINIMAX_API_KEY?.trim();
  return Boolean(key && !/^(your_|replace_|<)|\.\.\./i.test(key));
}

function upstreamError(status, payload = {}) {
  payload = payload && typeof payload === 'object' ? payload : {};
  const code = String(payload.error?.code || payload.base_resp?.status_code || '');
  const description = `${code} ${payload.error?.message || payload.base_resp?.status_msg || ''}`;
  if (status === 401 || ['1004', '2049'].includes(code) || /invalid_api_key|unauthorized/i.test(code)) {
    return new AppError(502, 'MINIMAX_AUTH', 'MiniMax authentication failed. Check the backend MINIMAX_API_KEY.');
  }
  if (status === 402 || ['1008', '2056'].includes(code) || /quota|balance|billing|credit|budget|insufficient/i.test(description)) {
    return new AppError(503, 'MINIMAX_QUOTA', 'MiniMax quota or balance is exhausted. Check account billing.');
  }
  if (status === 429 || ['1002', '1039', '1041', '2045'].includes(code)) {
    return new AppError(429, 'MINIMAX_RATE_LIMIT', 'MiniMax is rate limited. Please retry later.');
  }
  if (status === 404 || /model_not_found|unsupported_model|model.*(?:not supported|not found)/i.test(description)) {
    return new AppError(502, 'MINIMAX_MODEL', 'MiniMax-M3 is unavailable for this account or request. Check model access.');
  }
  if (status === 403) return new AppError(502, 'MINIMAX_ACCESS', 'MiniMax denied access. Check account permissions and model entitlement.');
  if (status === 408 || code === '1001') return new AppError(504, 'MINIMAX_TIMEOUT', 'MiniMax timed out. Please retry.');
  if ((status >= 400 && status < 500) || ['2013', '1026', '1027', '1042'].includes(code)) {
    return new AppError(502, 'MINIMAX_REQUEST', 'MiniMax rejected the request. Check input and parameter limits.');
  }
  return new AppError(502, 'MINIMAX_UNAVAILABLE', 'MiniMax is temporarily unavailable. Please retry later.');
}

export async function createMinimaxStream({ messages, thinkingMode = 'quick', signal, maxCompletionTokens = 8192 }, {
  fetchImpl = globalThis.fetch, timeoutMs = 120_000, sleep = delay,
} = {}) {
  if (!isMinimaxConfigured()) throw new AppError(503, 'MINIMAX_NOT_CONFIGURED', 'Set MINIMAX_API_KEY on the backend to enable MiniMax-M3.');
  const timeout = AbortSignal.timeout(timeoutMs);
  const combined = signal ? AbortSignal.any([signal, timeout]) : timeout;
  function transportError(error) {
    if (signal?.aborted) return new AppError(499, 'CANCELLED', 'Generation stopped.');
    if (timeout.aborted) return new AppError(504, 'MINIMAX_TIMEOUT', 'MiniMax timed out. Please retry.');
    if (error instanceof AppError) return error;
    if (error instanceof SseProtocolError) return new AppError(502, 'MINIMAX_PROTOCOL', 'MiniMax returned an oversized stream event.');
    return new AppError(502, 'MINIMAX_NETWORK', 'Could not reach MiniMax. Please retry later.');
  }
  let response;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      response = await fetchImpl(MINIMAX_ENDPOINT, {
        method: 'POST', signal: combined,
        headers: { Authorization: `Bearer ${process.env.MINIMAX_API_KEY.trim()}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: MINIMAX_MODEL,
          messages: messages.map(({ role, content, thought }) => ({
            role, content, ...(role === 'assistant' && thought ? { reasoning_content: thought } : {}),
          })),
          stream: true, stream_options: { include_usage: true }, reasoning_split: true,
          max_completion_tokens: Math.max(1, Math.min(8192, maxCompletionTokens)),
          thinking: { type: thinkingMode === 'deep' ? 'adaptive' : 'disabled' },
        }),
      });
      if (!response.ok) throw upstreamError(response.status, await response.json().catch(() => ({})));
      if (!response.body || !response.headers.get('content-type')?.includes('text/event-stream')) {
        const payload = await response.json().catch(() => ({}));
        if (payload?.error || payload?.base_resp?.status_code) throw upstreamError(response.status, payload);
        throw new AppError(502, 'MINIMAX_PROTOCOL', 'MiniMax returned an invalid stream.');
      }
      break;
    } catch (error) {
      const safe = transportError(error);
      if (attempt === 0 && ['MINIMAX_NETWORK', 'MINIMAX_UNAVAILABLE'].includes(safe.code)) {
        try { await sleep(400 + Math.floor(Math.random() * 200), undefined, { signal: combined }); }
        catch (abortError) { throw transportError(abortError); }
        continue;
      }
      throw safe;
    }
  }
  return (async function* () {
    let terminal = false;
    try {
      for await (const event of readSse(response.body)) {
        if (event === '[DONE]') break;
        let chunk;
        try { chunk = JSON.parse(event); }
        catch { throw new AppError(502, 'MINIMAX_PROTOCOL', 'MiniMax returned malformed stream data.'); }
        if (!chunk || typeof chunk !== 'object' || Array.isArray(chunk)) throw new AppError(502, 'MINIMAX_PROTOCOL', 'MiniMax returned malformed stream data.');
        if (chunk.error || chunk.base_resp?.status_code) throw upstreamError(Number(chunk.error?.code) || 502, chunk);
        const choice = chunk.choices?.[0];
        if (choice?.finish_reason === 'length') throw new AppError(502, 'MINIMAX_OUTPUT_LIMIT', 'MiniMax reached the output limit. Try a shorter request.');
        if (choice?.finish_reason && choice.finish_reason !== 'stop') throw new AppError(502, 'MINIMAX_INCOMPLETE', 'MiniMax could not complete the response. Please revise your request.');
        if (choice?.finish_reason === 'stop') terminal = true;
        yield chunk;
      }
      if (combined.aborted) throw combined.reason;
      if (!terminal) throw new AppError(502, 'MINIMAX_INTERRUPTED', 'MiniMax disconnected before completing the response.');
    } catch (error) { throw transportError(error); }
  })();
}
