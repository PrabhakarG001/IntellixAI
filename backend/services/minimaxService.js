import { setTimeout as delay } from 'node:timers/promises';
import { readSse, SseProtocolError } from '../../shared/sse.js';
import { AppError } from '../utils/errors.js';

export const MINIMAX_MODEL = 'minimax/minimax-m3.1-flash:free';
export const MINIMAX_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

export function isMinimaxConfigured() {
  const key = process.env.OPENROUTER_API_KEY?.trim();
  return Boolean(key && !/^(your_|replace_|<)|\.\.\./i.test(key));
}

function upstreamError(status, payload = {}) {
  payload = payload && typeof payload === 'object' ? payload : {};
  const code = String(payload.error?.code || '');
  const description = `${code} ${payload.error?.message || ''}`;
  if (status === 401 || code === '401' || /invalid_api_key|unauthorized|user not found/i.test(description)) {
    return new AppError(502, 'MINIMAX_AUTH', 'OpenRouter authentication failed. Check the backend OPENROUTER_API_KEY and its account.');
  }
  if (status === 402 || code === '402' || /insufficient_quota|insufficient.*credits/i.test(description)) {
    return new AppError(503, 'MINIMAX_QUOTA', 'OpenRouter credits or quota are exhausted. Check the account limits.');
  }
  if (status === 429 || code === '429') {
    return new AppError(429, 'MINIMAX_RATE_LIMIT', 'OpenRouter free-model rate limit reached. Please retry later.');
  }
  if (status === 404 || code === '404' || /model_not_found|unsupported_model|model.*(?:not supported|not found)/i.test(description)) {
    return new AppError(502, 'MINIMAX_MODEL', 'MiniMax M3.1 Flash free is unavailable on OpenRouter. Check model availability and routing.');
  }
  if (status === 403 || code === '403') return new AppError(502, 'MINIMAX_ACCESS', 'OpenRouter blocked this request. Check key permissions, budgets and guardrails.');
  if ([408, 504].includes(status) || ['408', '504'].includes(code)) return new AppError(504, 'MINIMAX_TIMEOUT', 'OpenRouter timed out. Please retry.');
  if ((status >= 400 && status < 500) || ['400', '413', '422'].includes(code)) {
    return new AppError(502, 'MINIMAX_REQUEST', 'OpenRouter rejected the request. Check input and parameter limits.');
  }
  return new AppError(502, 'MINIMAX_UNAVAILABLE', 'MiniMax is temporarily unavailable. Please retry later.');
}

export async function createMinimaxStream({ messages, thinkingMode = 'quick', signal, maxCompletionTokens = 8192 }, {
  fetchImpl = globalThis.fetch, timeoutMs = 120_000, sleep = delay,
} = {}) {
  if (!isMinimaxConfigured()) throw new AppError(503, 'MINIMAX_NOT_CONFIGURED', 'Set OPENROUTER_API_KEY on the backend to enable MiniMax M3.1 Flash free.');
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
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY.trim()}`,
          'Content-Type': 'application/json',
          'X-OpenRouter-Title': 'IntellixAI',
          ...(process.env.OPENROUTER_SITE_URL?.trim() ? { 'HTTP-Referer': process.env.OPENROUTER_SITE_URL.trim() } : {}),
        },
        body: JSON.stringify({
          model: MINIMAX_MODEL,
          messages: messages.map(({ role, content, thought, reasoning_details }) => ({
            role, content,
            ...(role === 'assistant' && reasoning_details?.length ? { reasoning_details } :
              role === 'assistant' && thought ? { reasoning: thought } : {}),
          })),
          stream: true, stream_options: { include_usage: true },
          max_tokens: Math.max(1, Math.min(8192, maxCompletionTokens)),
          reasoning: { effort: thinkingMode === 'deep' ? 'high' : 'low', exclude: false },
        }),
      });
      if (!response.ok) throw upstreamError(response.status, await response.json().catch(() => ({})));
      if (!response.body || !response.headers.get('content-type')?.includes('text/event-stream')) {
        const payload = await response.json().catch(() => ({}));
        if (payload?.error) throw upstreamError(response.status, payload);
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
        if (chunk.error) throw upstreamError(Number(chunk.error?.code) || 502, chunk);
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
