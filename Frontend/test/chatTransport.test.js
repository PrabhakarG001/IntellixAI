import test from 'node:test';
import assert from 'node:assert/strict';
import { consumeSse, requestChatStream } from '../src/services/chatTransport.js';
import { historyBeforePrompt } from '../src/services/chatHistory.js';

function stream(text, size = 1) {
  const bytes = new TextEncoder().encode(text);
  return new ReadableStream({ start(c) {
    for (let i = 0; i < bytes.length; i += size) c.enqueue(bytes.slice(i, i + size));
    c.close();
  } });
}

test('SSE preserves fragmented Unicode, CRLF, reasoning, usage, and final unterminated event', async () => {
  const events = [
    { type: 'thought', content: 'Check' }, { type: 'content', content: 'Hello 🌍' },
    { type: 'usage', usage: { completion_tokens: 7 } }, { type: 'done', chat: { id: 'a' } },
  ];
  let content = '', thought = '', usage, chat;
  await consumeSse(stream(': ping\r\n\r\n' + events.map(e => `data: ${JSON.stringify(e)}`).join('\r\n\r\n')), {
    onContent: s => content += s, onThought: s => thought += s,
    onUsage: u => usage = u, onDone: c => chat = c,
  });
  assert.equal(content, 'Hello 🌍'); assert.equal(thought, 'Check');
  assert.equal(usage.completion_tokens, 7); assert.equal(chat.id, 'a');
});

test('truncated, malformed, and error streams reject without done', async () => {
  for (const text of ['data: {"type":"content","content":"partial"}\n\n', 'data: broken\n\n', 'data: {"type":"error","content":"quota"}\n\n']) {
    let done = false;
    await assert.rejects(consumeSse(stream(text), { onDone: () => done = true }));
    assert.equal(done, false);
  }
});

test('network failure makes exactly one request and reports a useful error', async () => {
  let attempts = 0;
  await assert.rejects(requestChatStream({ message: 'Hi' }, { fetchImpl: async () => { attempts++; throw new TypeError('offline'); } }), /Could not reach/);
  assert.equal(attempts, 1);
});

test('HTTP failures are surfaced without endpoint retries', async () => {
  for (const status of [400, 401, 429, 502, 503, 504]) {
    let attempts = 0;
    await assert.rejects(requestChatStream({ message: 'Hi' }, { fetchImpl: async () => {
      attempts++; return Response.json({ error: 'Safe error' }, { status });
    } }), /Safe error/);
    assert.equal(attempts, 1);
  }
});

test('request contains only chat data and the supplied Firebase header', async () => {
  await requestChatStream({ chatId: 'a', message: 'Hello', mode: 'talk' }, {
    base: '/api/', headers: { Authorization: 'Bearer firebase-token' },
    fetchImpl: async (url, init) => {
      assert.equal(url, '/api/chat/stream');
      assert.deepEqual(JSON.parse(init.body), { chatId: 'a', message: 'Hello', mode: 'talk' });
      assert.equal(init.headers.Authorization, 'Bearer firebase-token');
      return new Response(stream(''), { headers: { 'Content-Type': 'text/event-stream' } });
    },
  });
});

test('regeneration replaces last exchange, keeps message IDs and earlier context', () => {
  const messages = [
    { id: '1', role: 'user', content: 'first' }, { id: '2', role: 'assistant', content: 'answer' },
    { id: '3', role: 'user', content: 'second' }, { id: '4', role: 'assistant', content: 'failed', error: true },
  ];
  assert.deepEqual(historyBeforePrompt(messages, true), messages.slice(0, 2));
  assert.equal(historyBeforePrompt(messages, false).length, 3);
});

test('request timeout remains a timeout instead of being mislabeled as a network failure', async () => {
  const controller = new AbortController();
  controller.abort(new DOMException('The request timed out.', 'TimeoutError'));
  await assert.rejects(requestChatStream({ message: 'Hi', signal: controller.signal }, {
    fetchImpl: async () => { throw controller.signal.reason; },
  }), { name: 'TimeoutError', message: 'The request timed out.' });
});

test('SSE bounds total event size across multiple data lines', async () => {
  const text = `data: ${'x'.repeat(1_000_001)}\ndata: ${'x'.repeat(1_000_001)}\n\n`;
  await assert.rejects(consumeSse(new Response(text).body), /size limit/);
});
