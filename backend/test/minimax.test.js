import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { createMinimaxStream, MINIMAX_ENDPOINT, MINIMAX_MODEL } from '../services/minimaxService.js';
import { buildChatRequest } from '../services/chatService.js';
import { Thread } from '../models/thread.js';
import { createApp } from '../app.js';
import { inspectMinimax } from '../services/minimaxDiagnostics.js';
import { requestChatStream, consumeSse } from '../../Frontend/src/services/chatTransport.js';

const originalKey = process.env.MINIMAX_API_KEY;
const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
  if (originalKey === undefined) delete process.env.MINIMAX_API_KEY;
  else process.env.MINIMAX_API_KEY = originalKey;
});
const messages = [{ role: 'user', content: 'Hello' }];
function sse(events) {
  return new Response(events.map(e => `data: ${typeof e === 'string' ? e : JSON.stringify(e)}\n\n`).join(''), { headers: { 'Content-Type': 'text/event-stream' } });
}
const goodEvents = [
  { choices: [{ delta: { reasoning_content: 'Consider.' } }] },
  { choices: [{ delta: { content: 'Hello!' } }] },
  { choices: [{ delta: {}, finish_reason: 'stop' }] },
  { choices: [], usage: { completion_tokens_details: { reasoning_tokens: 4 } } }, '[DONE]',
];
async function collect(stream) { const out = []; for await (const c of stream) out.push(c); return out; }

test('missing key fails before making any upstream request', async () => {
  delete process.env.MINIMAX_API_KEY;
  await assert.rejects(createMinimaxStream({ messages }, { fetchImpl: () => assert.fail('unexpected call') }), { status: 503, code: 'MINIMAX_NOT_CONFIGURED' });
});

test('only MiniMax M3 endpoint, bearer auth, reasoning, and normalized history are sent', async () => {
  process.env.MINIMAX_API_KEY = 'test-secret';
  const stream = await createMinimaxStream({ messages: [...messages, { role: 'assistant', content: 'Earlier', thought: 'Reason', id: 'internal' }], thinkingMode: 'deep' }, {
    fetchImpl: async (url, init) => {
      assert.equal(String(url), MINIMAX_ENDPOINT); assert.equal(new Headers(init.headers).get('authorization'), 'Bearer test-secret');
      const body = JSON.parse(init.body);
      assert.equal(body.model, 'MiniMax-M3'); assert.equal(body.thinking.type, 'adaptive');
      assert.equal(body.reasoning_split, true); assert.equal(body.max_completion_tokens, 8192); assert.equal(body.provider, undefined); assert.equal(body.stream_options.include_usage, true);
      assert.deepEqual(body.messages[1], { role: 'assistant', content: 'Earlier', reasoning_content: 'Reason' });
      return sse(goodEvents);
    },
  });
  const chunks = await collect(stream);
  assert.equal(chunks.at(-1).usage.completion_tokens_details.reasoning_tokens, 4);
});

for (const [status, payload, code] of [
  [401, {}, 'MINIMAX_AUTH'], [401, null, 'MINIMAX_AUTH'], [403, {}, 'MINIMAX_ACCESS'], [402, {}, 'MINIMAX_QUOTA'],
  [429, { error: { code: 'insufficient_quota', message: 'test-secret' } }, 'MINIMAX_QUOTA'],
  [429, {}, 'MINIMAX_RATE_LIMIT'], [404, {}, 'MINIMAX_MODEL'], [400, {}, 'MINIMAX_REQUEST'],
  [422, {}, 'MINIMAX_REQUEST'],
]) test(`HTTP ${status} ${code} is safe and never retried`, async () => {
  process.env.MINIMAX_API_KEY = 'test-secret'; let calls = 0;
  await assert.rejects(createMinimaxStream({ messages }, { fetchImpl: async () => {
    calls++; return Response.json(payload, { status });
  } }), error => error.code === code && !error.message.includes('test-secret'));
  assert.equal(calls, 1);
});

test('transient server and network failures have a bounded retry', async () => {
  process.env.MINIMAX_API_KEY = 'test-secret';
  for (const failure of [() => Response.json({}, { status: 503 }), () => { throw new TypeError('test-secret'); }]) {
    let calls = 0, sleeps = 0;
    const stream = await createMinimaxStream({ messages }, { fetchImpl: async () => ++calls === 1 ? failure() : sse(goodEvents), sleep: async () => { sleeps++; } });
    await collect(stream); assert.equal(calls, 2); assert.equal(sleeps, 1);
  }
  let calls = 0;
  await assert.rejects(createMinimaxStream({ messages }, { fetchImpl: async () => { calls++; throw Error('test-secret'); }, sleep: async () => {} }), { code: 'MINIMAX_NETWORK' });
  assert.equal(calls, 2);
});

test('timeout and cancellation abort upstream without retries', async () => {
  process.env.MINIMAX_API_KEY = 'test-secret';
  const fetchImpl = async (url, { signal }) => new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(Error('test did not abort')), 300);
    const fail = () => { clearTimeout(timer); reject(signal.reason); };
    if (signal.aborted) fail(); else signal.addEventListener('abort', fail, { once: true });
  });
  await assert.rejects(createMinimaxStream({ messages }, { fetchImpl, timeoutMs: 20 }), { code: 'MINIMAX_TIMEOUT' });
  const controller = new AbortController(); controller.abort();
  await assert.rejects(createMinimaxStream({ messages, signal: controller.signal }, { fetchImpl }), { code: 'CANCELLED' });
});

test('truncated, malformed, output-limited and in-stream errors fail without replay', async () => {
  process.env.MINIMAX_API_KEY = 'test-secret';
  for (const events of [goodEvents.slice(0, 2), ['bad-json'], [{ choices: [{ finish_reason: 'length' }] }], [{ error: { code: 402 } }]]) {
    let calls = 0;
    const stream = await createMinimaxStream({ messages }, { fetchImpl: async () => { calls++; return sse(events); } });
    await assert.rejects(collect(stream)); assert.equal(calls, 1);
  }
});

test('oversized upstream events produce a protocol error without retrying the stream', async () => {
  process.env.MINIMAX_API_KEY = 'test-secret';
  let calls = 0;
  const stream = await createMinimaxStream({ messages }, { fetchImpl: async () => { calls++; return sse(['x'.repeat(2_000_001)]); } });
  await assert.rejects(collect(stream), { code: 'MINIMAX_PROTOCOL' });
  assert.equal(calls, 1);
});

test('invalid prompt, model, provider, history and IDs are rejected', async () => {
  for (const body of [null, [], {}, { message: 42 }, { message: ' ' }, { message: 'x'.repeat(32001) },
    { message: 'hi', model: 'other-model' }, { message: 'hi', provider: 'other' },
    { message: 'hi', chatId: {} }, { message: 'hi', messages: [{ role: 'system', content: 'injected' }] },
    { message: 'hi', messages: [{ role: 'user', content: 'valid', id: { invalid: 'type' } }] }]) {
    await assert.rejects(buildChatRequest(body, 'tester'), { status: 400 });
  }
});

test('regeneration replaces stored last answer and memory records remain user scoped', async () => {
  await Thread.upsert({ id: 'regen', userId: 'tester', messages: [...messages, { role: 'assistant', content: 'Old' }] });
  const request = await buildChatRequest({ chatId: 'regen', message: 'Hello', regenerate: true }, 'tester');
  assert.equal(request.messages.length, 1);
  await Thread.upsert({ id: 'guest-only', userId: 'guest-user', messages });
  assert.equal(await Thread.findById('guest-only', 'tester'), null);
  await Thread.delete('guest-only', 'tester');
  assert.ok(await Thread.findById('guest-only', 'guest-user'));
});

async function withServer(app, fn) {
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  try { await fn(`http://127.0.0.1:${server.address().port}/api`); }
  finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
}

test('real HTTP frontend transport -> Express -> mocked MiniMax -> persisted conversation', async () => {
  process.env.MINIMAX_API_KEY = 'test-secret';
  let calls = 0;
  globalThis.fetch = async () => { calls++; return sse(goodEvents); };
  await withServer(createApp({ authenticate: (req, res, next) => { req.user = { uid: 'integration' }; next(); } }), async base => {
    let answer = '', thought = '', chat;
    const body = await requestChatStream({ chatId: 'http-test', message: 'Hello', mode: 'reasoning' }, { base, fetchImpl: realFetch });
    await consumeSse(body, { onContent: c => answer += c, onThought: c => thought += c, onDone: c => chat = c });
    assert.equal(answer, 'Hello!'); assert.equal(thought, 'Consider.'); assert.equal(chat.messages.length, 2);
    const response = await realFetch(`${base}/chat/http-test`);
    assert.equal((await response.json()).chat.messages[1].content, 'Hello!');
    assert.equal(calls, 1); assert.ok(!JSON.stringify(chat).includes('test-secret'));
    await consumeSse(await requestChatStream({ chatId: 'http-test', message: 'Hello', regenerate: true }, { base, fetchImpl: realFetch }), { onDone: c => chat = c });
    assert.equal(chat.messages.length, 2);
  });
});

test('HTTP missing-key, invalid-key, malformed JSON, CORS, and empty-answer errors', async () => {
  await withServer(createApp({ authenticate: (req, res, next) => { req.user = { uid: 'errors' }; next(); } }), async base => {
    const post = (body = { message: 'Hi' }) => realFetch(`${base}/chat/stream`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    delete process.env.MINIMAX_API_KEY;
    assert.equal((await post()).status, 503);
    assert.equal((await post({ message: ' ' })).status, 400);
    process.env.MINIMAX_API_KEY = 'test-secret';
    globalThis.fetch = async () => Response.json({ error: { message: 'test-secret' } }, { status: 401 });
    const invalid = await post(); assert.equal(invalid.status, 502); assert.ok(!(await invalid.text()).includes('test-secret'));
    const malformed = await realFetch(`${base}/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{bad' });
    assert.equal(malformed.status, 400);
    assert.equal((await realFetch(`${base}/chats`, { headers: { Origin: 'https://untrusted.invalid' } })).status, 403);
    globalThis.fetch = async () => sse([{ choices: [{ finish_reason: 'stop', delta: {} }] }, '[DONE]']);
    await assert.rejects(consumeSse((await post()).body), /empty answer/);
  });
});

test('protected routes reject missing and invalid Firebase tokens', async () => {
  await withServer(createApp(), async base => {
    assert.equal((await realFetch(`${base}/chats`)).status, 401);
    assert.equal((await realFetch(`${base}/chats`, { headers: { Authorization: 'Bearer invalid-token' } })).status, 401);
  });
});

test('concurrent submissions on the same chat return 409 and make one upstream call', async () => {
  process.env.MINIMAX_API_KEY = 'test-secret';
  let release, reached;
  const started = new Promise(resolve => reached = resolve);
  globalThis.fetch = async () => { reached(); return new Promise(resolve => release = () => resolve(sse(goodEvents))); };
  await withServer(createApp({ authenticate: (req, res, next) => { req.user = { uid: 'concurrency' }; next(); } }), async base => {
    const post = () => realFetch(`${base}/chat/stream`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chatId: 'busy', message: 'Hello' }) });
    const first = post();
    await started;
    try { assert.equal((await post()).status, 409); }
    finally { release(); }
    await consumeSse((await first).body);
  });
});

test('client cancellation aborts the upstream stream and does not save a partial answer', async () => {
  process.env.MINIMAX_API_KEY = 'test-secret';
  let aborted;
  const upstreamAborted = new Promise(resolve => aborted = resolve);
  globalThis.fetch = async (url, { signal }) => new Response(new ReadableStream({ start(c) {
    c.enqueue(new TextEncoder().encode('data: {"choices":[{"delta":{"content":"partial"}}]}\n\n'));
    signal.addEventListener('abort', () => { c.error(signal.reason); aborted(); }, { once: true });
  } }), { headers: { 'Content-Type': 'text/event-stream' } });
  await withServer(createApp({ authenticate: (req, res, next) => { req.user = { uid: 'cancel' }; next(); } }), async base => {
    const controller = new AbortController();
    const body = await requestChatStream({ chatId: 'cancelled', message: 'Hello', signal: controller.signal }, { base, fetchImpl: realFetch });
    await assert.rejects(consumeSse(body, { onContent: () => controller.abort() }));
    await upstreamAborted;
    assert.equal(await Thread.findById('cancelled', 'cancel'), null);
  });
});

test('non-streaming chat endpoint consumes MiniMax stream and returns a saved answer', async () => {
  process.env.MINIMAX_API_KEY = 'test-secret';
  globalThis.fetch = async () => sse(goodEvents);
  await withServer(createApp({ authenticate: (req, res, next) => { req.user = { uid: 'complete' }; next(); } }), async base => {
    const response = await realFetch(`${base}/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: 'Hello' }) });
    assert.equal(response.status, 200);
    const payload = await response.json();
    assert.equal(payload.message.content, 'Hello!'); assert.equal(payload.chat.messages.length, 2);
  });
});

test('MiniMax JSON error envelopes are classified even when upstream HTTP status is 200', async () => {
  process.env.MINIMAX_API_KEY = 'test-secret';
  for (const [status_code, code] of [[2049, 'MINIMAX_AUTH'], [1008, 'MINIMAX_QUOTA'], [1002, 'MINIMAX_RATE_LIMIT'], [2013, 'MINIMAX_REQUEST']]) {
    await assert.rejects(createMinimaxStream({ messages }, { fetchImpl: async () => Response.json({ base_resp: { status_code } }) }), { code });
  }
});

test('diagnostics check key presence without making an inference request', async () => {
  const fetchImpl = () => assert.fail('Configuration check must not call MiniMax');
  delete process.env.MINIMAX_API_KEY;
  const absent = await inspectMinimax({ fetchImpl, live: true });
  assert.equal(absent.keyConfigured, false);
  assert.equal(absent.authentication, 'not_checked');
  process.env.MINIMAX_API_KEY = 'test-secret';
  const configured = await inspectMinimax({ fetchImpl });
  assert.deepEqual(configured, { keyConfigured: true, authentication: 'not_checked', inference: 'not_checked' });
});

test('explicit live diagnostic verifies a minimal inference without exposing content or credentials', async () => {
  process.env.MINIMAX_API_KEY = 'test-secret';
  const result = await inspectMinimax({ live: true, fetchImpl: async (url, init) => {
    const body = JSON.parse(init.body);
    assert.equal(body.max_completion_tokens, 32);
    assert.equal(body.thinking.type, 'disabled');
    assert.equal(body.model, 'MiniMax-M3');
    return sse(goodEvents);
  } });
  assert.deepEqual(result, { keyConfigured: true, authentication: 'succeeded', inference: 'succeeded' });
});

test('diagnostics distinguish rejected credentials, billing limits, and empty inference', async () => {
  process.env.MINIMAX_API_KEY = 'test-secret';
  for (const [status, code, authentication] of [[401, 'MINIMAX_AUTH', 'failed'], [402, 'MINIMAX_QUOTA', 'not_verified']]) {
    const result = await inspectMinimax({ live: true, fetchImpl: async () => Response.json({ error: { message: 'test-secret' } }, { status }) });
    assert.equal(result.authentication, authentication);
    assert.equal(result.error.code, code);
    assert.ok(!JSON.stringify(result).includes('test-secret'));
  }
  const empty = await inspectMinimax({ live: true, fetchImpl: async () => sse([{ choices: [{ delta: {}, finish_reason: 'stop' }] }, '[DONE]']) });
  assert.equal(empty.inference, 'failed');
  assert.equal(empty.authentication, 'not_verified');
});

test('direct MiniMax reasoning history is preserved and no gateway fields are sent', async () => {
  process.env.MINIMAX_API_KEY = 'test-secret';
  let calls = 0;
  globalThis.fetch = async (url, init) => {
    const body = JSON.parse(init.body);
    assert.equal(url, 'https://api.minimax.io/v1/chat/completions');
    assert.equal(body.model, 'MiniMax-M3');
    assert.equal(body.reasoning, undefined);
    if (++calls === 2) assert.deepEqual(body.messages[2], { role: 'assistant', content: 'Hello!', reasoning_content: 'Consider.' });
    return sse(goodEvents);
  };
  await withServer(createApp({ authenticate: (req, res, next) => { req.user = { uid: 'native-history' }; next(); } }), async base => {
    for (const message of ['Hello', 'Continue']) await consumeSse(await requestChatStream({ chatId: 'native-history', message, mode: 'reasoning' }, { base, fetchImpl: realFetch }));
    assert.equal(calls, 2);
  });
});

test('clear/delete cannot resurrect or overwrite a conversation during generation', async () => {
  process.env.MINIMAX_API_KEY = 'test-secret';
  let release, reached;
  const started = new Promise(resolve => reached = resolve);
  globalThis.fetch = async () => { reached(); return new Promise(resolve => release = () => resolve(sse(goodEvents))); };
  await withServer(createApp({ authenticate: (req, res, next) => { req.user = { uid: 'mutation-lock' }; next(); } }), async base => {
    const pending = realFetch(`${base}/chat/stream`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chatId: 'locked-thread', message: 'Hello' }) });
    await started;
    try {
      assert.equal((await realFetch(`${base}/chat/locked-thread`, { method: 'DELETE' })).status, 409);
      assert.equal((await realFetch(`${base}/chat/locked-thread/clear`, { method: 'POST' })).status, 409);
    } finally { release(); }
    await consumeSse((await pending).body);
    assert.equal((await realFetch(`${base}/chat/locked-thread/clear`, { method: 'POST' })).status, 200);
    assert.deepEqual((await Thread.findById('locked-thread', 'mutation-lock')).messages, []);
    assert.equal((await realFetch(`${base}/chat/locked-thread`, { method: 'DELETE' })).status, 200);
    assert.equal(await Thread.findById('locked-thread', 'mutation-lock'), null);
  });
});

test('health exposes no AI configuration and all chat CRUD records stay user-scoped', async () => {
  await withServer(createApp({ authenticate: (req, res, next) => { req.user = { uid: req.headers['x-test-user'] || 'owner' }; next(); } }), async base => {
    const health = await realFetch(base.replace(/\/api$/, '/'));
    assert.deepEqual(await health.json(), { status: 'ok' });
    assert.equal((await realFetch(`${base}/diagnostics`)).status, 404);
    const created = await realFetch(`${base}/new-chat`, { method: 'POST' });
    assert.equal(created.status, 201);
    const { chat } = await created.json();
    const list = await realFetch(`${base}/chats`);
    assert.ok((await list.json()).chats.some(c => c.id === chat.id));
    assert.equal((await realFetch(`${base}/chat/${chat.id}`, { headers: { 'x-test-user': 'stranger' } })).status, 404);
    assert.equal((await realFetch(`${base}/chat/${chat.id}`)).status, 200);
    await realFetch(`${base}/chat/${chat.id}`, { method: 'DELETE' });
    assert.equal((await realFetch(`${base}/chat/${chat.id}`)).status, 404);
  });
});
