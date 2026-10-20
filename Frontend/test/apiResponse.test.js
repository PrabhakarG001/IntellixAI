import test from 'node:test';
import assert from 'node:assert/strict';
import { requestJson } from '../src/services/apiResponse.js';

const chat = { id: 'chat-a', title: 'Hello', messages: [{ role: 'user', content: 'Hi' }] };
test('JSON requests preserve the method and return valid CRUD envelopes', async () => {
  for (const [expected, payload] of [['chat', { chat }], ['chats', { chats: [chat] }], ['ok', { ok: true }]]) {
    let calls = 0;
    assert.deepEqual(await requestJson('/api/test', { method: 'POST' }, async (url, options) => {
      calls++;
      assert.equal(url, '/api/test'); assert.equal(options.method, 'POST');
      assert.ok(options.signal instanceof AbortSignal);
      return Response.json(payload);
    }, expected), payload);
    assert.equal(calls, 1);
  }
});

test('backend busy, rate-limit and configuration errors survive CRUD parsing without retries', async () => {
  for (const status of [400, 403, 404, 409, 429, 500, 503]) {
    let calls = 0;
    await assert.rejects(requestJson('/api/test', {}, async () => {
      calls++; return Response.json({ error: 'Safe backend explanation.' }, { status });
    }, 'chat'), /Safe backend explanation/);
    assert.equal(calls, 1);
  }
});

test('HTML and malformed JSON responses produce actionable errors instead of parsing crashes', async () => {
  for (const response of [new Response('<html>site</html>', { headers: { 'Content-Type': 'text/html' } }), Response.json(null), Response.json({ chat: null }), Response.json({ chat: { ...chat, messages: [null] } })]) {
    await assert.rejects(requestJson('/api/test', {}, async () => response, 'chat'), /invalid response.*API URL/);
  }
  await assert.rejects(requestJson('/api/test', {}, async () => new Response('{broken', { headers: { 'Content-Type': 'application/json' } }), 'chat'), /invalid JSON/);
  await assert.rejects(requestJson('/api/test', {}, async () => new Response('<html>not found</html>', { status: 404 }), 'chat'), /HTTP 404/);
});

test('timeouts bound both a stalled request and stalled response body', async () => {
  for (const fetchImpl of [() => new Promise(() => {}), async () => new Response(new ReadableStream(), { headers: { 'Content-Type': 'application/json' } })]) {
    await assert.rejects(requestJson('/api/test', {}, fetchImpl, 'chat', 15), { name: 'TimeoutError' });
  }
});

test('caller cancellation and network failures have distinct messages', async () => {
  const controller = new AbortController();
  const pending = requestJson('/api/test', { signal: controller.signal }, () => new Promise(() => {}), 'chat');
  controller.abort();
  await assert.rejects(pending, { name: 'AbortError' });
  await assert.rejects(requestJson('/api/test', {}, async () => { throw new TypeError('Failed to fetch'); }, 'chat'), /Could not reach the backend/);
});
