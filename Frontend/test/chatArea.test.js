import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

let server, ChatArea;
before(async () => {
  server = await createServer({ root: fileURLToPath(new URL('../', import.meta.url)), envDir: false,
    server: { middlewareMode: true, watch: null, hmr: false }, appType: 'custom' });
  ({ default: ChatArea } = await server.ssrLoadModule('/src/components/ChatArea/ChatArea.jsx'));
});
after(async () => { await server?.close(); });

test('API errors are visible on both the empty workspace and an existing conversation', () => {
  for (const messages of [[], [{ id: 'one', role: 'user', content: 'Hi' }]]) {
    const html = renderToStaticMarkup(React.createElement(ChatArea, {
      activeChat: { messages }, selectedMode: 'talk', error: 'Unable to reach the backend.',
    }));
    assert.match(html, /role="alert"/);
    assert.match(html, /Unable to reach the backend/);
  }
});
