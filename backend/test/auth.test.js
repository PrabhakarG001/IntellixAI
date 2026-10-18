import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../app.js';

test('every chat endpoint rejects unauthenticated and malformed tokens before API actions', async () => {
  const server = createApp().listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  try {
    const base = `http://127.0.0.1:${server.address().port}/api`;
    const routes = [['GET', '/chats'], ['GET', '/chat/test-id'], ['POST', '/new-chat'],
      ['DELETE', '/chat/test-id'], ['POST', '/chat/test-id/clear'], ['POST', '/chat'],
      ['POST', '/chat/stream'], ['POST', '/stream']];
    for (const [method, path] of routes) {
      for (const authorization of [null, 'Basic test-only', 'Bearer', 'Bearer invalid-test-token']) {
        const response = await fetch(base + path, { method, headers: authorization ? { Authorization: authorization } : {} });
        assert.equal(response.status, 401, `${method} ${path}`);
        const body = await response.json();
        assert.equal(typeof body.error, 'string');
        assert.ok(!JSON.stringify(body).includes('invalid-test-token'));
        assert.ok(!body.user && !body.token && !body.stack);
      }
    }
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
