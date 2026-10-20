import { readSse } from '../../../shared/sse.js';

export async function requestChatStream(payload, { base = '/api', headers = {}, fetchImpl = globalThis.fetch } = {}) {
  const { signal, ...body } = payload;
  let response;
  try {
    response = await fetchImpl(`${base.replace(/\/$/, '')}/chat/stream`, {
      method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' },
      signal, body: JSON.stringify(body),
    });
  } catch (error) {
    if (signal?.aborted) throw signal.reason || error;
    if (error.name === 'AbortError') throw error;
    throw new Error('Could not reach the backend. Check your connection and backend URL.');
  }
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(typeof payload.error === 'string' ? payload.error : `Chat request failed (HTTP ${response.status}).`);
  }
  if (!response.body || !response.headers.get('content-type')?.includes('text/event-stream')) {
    throw new Error('The backend returned an invalid stream. Check the API URL.');
  }
  return response.body;
}

export async function consumeSse(body, handlers = {}) {
  let completed = false;
  for await (const event of readSse(body)) {
    let payload;
    try { payload = JSON.parse(event); }
    catch { throw new Error('The backend returned malformed stream data.'); }
    if (!payload || typeof payload !== 'object' || Array.isArray(payload) || typeof payload.type !== 'string') {
      throw new Error('The backend returned malformed stream data.');
    }
    if (['content', 'thought', 'status', 'error'].includes(payload.type) && typeof payload.content !== 'string') {
      throw new Error('The backend returned malformed stream data.');
    }
    if (payload.type === 'error') throw new Error(payload.content || 'Generation failed.');
    if (payload.type === 'status') handlers.onStatus?.(payload.content || '');
    if (payload.type === 'thought') handlers.onThought?.(payload.content || '');
    if (payload.type === 'content') handlers.onContent?.(payload.content || '');
    if (payload.type === 'usage') handlers.onUsage?.(payload.usage);
    if (payload.type === 'done') {
      completed = true;
      handlers.onDone?.(payload.chat);
      break;
    }
  }
  if (!completed) throw new Error('The connection ended before the response completed. Please retry.');
}
