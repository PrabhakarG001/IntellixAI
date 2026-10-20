// Bound JSON requests through body parsing, including a stalled token lookup.
// Streaming requests keep their separate, longer generation timeout.
export async function requestJson(url, options, fetchImpl, expected, timeoutMs = 30_000) {
  const controller = new AbortController();
  const signal = options?.signal ? AbortSignal.any([options.signal, controller.signal]) : controller.signal;
  const timer = setTimeout(() => controller.abort(new DOMException('The request timed out. Please retry.', 'TimeoutError')), timeoutMs);
  let onAbort;
  try {
    const aborted = new Promise((_, reject) => {
      onAbort = () => reject(signal.reason);
      if (signal.aborted) onAbort();
      else signal.addEventListener('abort', onAbort, { once: true });
    });
    const request = (async () => {
      const response = await fetchImpl(url, { ...options, signal });
      let payload;
      if (response.headers.get('content-type')?.includes('json')) {
        try { payload = await response.json(); }
        catch (error) {
          if (signal.aborted) throw signal.reason;
          throw new Error('The backend returned invalid JSON. Please retry.');
        }
      }
      if (!response.ok) {
        throw new Error(typeof payload?.error === 'string' ? payload.error : `Request failed (HTTP ${response.status}). Please retry.`);
      }
      const validChat = chat => chat && typeof chat.id === 'string' && chat.id &&
        (chat.title === undefined || typeof chat.title === 'string') && Array.isArray(chat.messages) &&
        chat.messages.every(message => message && ['user', 'assistant'].includes(message.role) &&
          typeof (message.content ?? message.text) === 'string' &&
          (message.thought === undefined || typeof message.thought === 'string'));
      const valid = expected === 'chats' ? Array.isArray(payload?.chats) && payload.chats.every(validChat)
        : expected === 'chat' ? validChat(payload?.chat) : payload?.ok === true;
      if (!valid) throw new Error('The backend returned an invalid response. Check the API URL.');
      return payload;
    })();
    return await Promise.race([request, aborted]);
  } catch (error) {
    if (signal.aborted) throw signal.reason;
    if (error instanceof TypeError) throw new Error('Could not reach the backend. Check your connection and backend URL.');
    throw error;
  } finally {
    clearTimeout(timer);
    signal.removeEventListener('abort', onAbort);
  }
}
