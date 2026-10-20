import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { createServer } from 'vite';

let server, LoginPage, WelcomePage, ProtectedRoute;
before(async () => {
  server = await createServer({ root: fileURLToPath(new URL('../', import.meta.url)), envDir: false,
    server: { middlewareMode: true, watch: null }, appType: 'custom' });
  ({ default: LoginPage } = await server.ssrLoadModule('/src/pages/LoginPage/LoginPage.jsx'));
  ({ default: WelcomePage } = await server.ssrLoadModule('/src/pages/LoginPage/WelcomePage.jsx'));
  ({ default: ProtectedRoute } = await server.ssrLoadModule('/src/components/ProtectedRoute/ProtectedRoute.jsx'));
});
after(async () => { await server?.close(); });

function render(Component, props = {}) {
  return renderToStaticMarkup(React.createElement(MemoryRouter, { initialEntries: ['/login'] }, React.createElement(Component, props)));
}

test('login and session-loading screens render an accessible non-submit back arrow', () => {
  for (const authLoading of [false, true]) {
    const html = render(LoginPage, { user: null, authLoading });
    assert.match(html, /<button type="button" class="login-back-arrow" aria-label="Back"/);
    assert.match(html, /lucide-arrow-left/);
    assert.match(html, /aria-hidden="true"/);
  }
});

test('direct login without environment overrides enables Google login using the public default', () => {
  const html = render(LoginPage, { user: null, authLoading: false });
  assert.doesNotMatch(html, /Sign-in is unavailable/);
  assert.doesNotMatch(html, /disabled="" class="login-google-btn"/);
  assert.match(html, /Continue with Google/);
});

test('provider errors remain visible without disabling retries', () => {
  const html = render(LoginPage, { user: null, authLoading: false, authError: 'Google sign-in is not enabled.' });
  assert.match(html, /role="alert"/);
  assert.match(html, /Google sign-in is not enabled/);
  assert.doesNotMatch(html, /disabled="" class="login-google-btn"/);
});

test('public home offers an in-app route to sign in without exposing the workspace', () => {
  const html = render(WelcomePage);
  assert.match(html, /Welcome to IntellixAI/);
  assert.match(html, /href="\/login"/);
  assert.ok(!html.includes('private-chat-content'));
});

test('protected content is rendered only after a user is authenticated', () => {
  const children = React.createElement('p', null, 'private-chat-content');
  assert.ok(!render(ProtectedRoute, { user: null, authLoading: false, children }).includes('private-chat-content'));
  assert.ok(!render(ProtectedRoute, { user: { uid: 'test' }, authLoading: true, children }).includes('private-chat-content'));
  assert.ok(render(ProtectedRoute, { user: { uid: 'test' }, authLoading: false, children }).includes('private-chat-content'));
});
