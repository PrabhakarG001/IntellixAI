// Decode SSE across arbitrary network and UTF-8 boundaries, including CRLF.
export class SseProtocolError extends Error {}

export async function* readSse(body) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let data = [];
  let dataSize = 0;
  const maxEventSize = 2_000_000;
  function line(value) {
    if (value.length > maxEventSize) throw new SseProtocolError('SSE event exceeds size limit.');
    if (value === '') {
      const event = data.length ? data.join('\n') : null;
      data = [];
      dataSize = 0;
      return event;
    }
    if (value.startsWith('data:')) {
      const content = value.slice(5).replace(/^ /, '');
      dataSize += content.length + 1;
      if (dataSize > maxEventSize) throw new SseProtocolError('SSE event exceeds size limit.');
      data.push(content);
    }
    return null;
  }
  try {
    while (true) {
      const { value, done } = await reader.read();
      buffer += done ? decoder.decode() : decoder.decode(value, { stream: true });
      let index;
      while ((index = buffer.indexOf('\n')) !== -1) {
        const event = line(buffer.slice(0, index).replace(/\r$/, ''));
        buffer = buffer.slice(index + 1);
        if (event !== null) yield event;
      }
      if (buffer.length > maxEventSize) throw new SseProtocolError('SSE event exceeds size limit.');
      if (done) {
        if (buffer) line(buffer.replace(/\r$/, ''));
        if (data.length) yield data.join('\n');
        return;
      }
    }
  } finally {
    await reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}
