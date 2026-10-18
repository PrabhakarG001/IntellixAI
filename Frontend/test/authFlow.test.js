import test from 'node:test';
import assert from 'node:assert/strict';
import { createAuthActions, authBackDestination, authErrorMessage } from '../src/services/authFlow.js';
import { createAuthenticatedFetch } from '../src/services/authRequest.js';

function actions(overrides = {}) {
  return createAuthActions({ auth: {}, provider: {}, popup: async () => ({ user: { uid: 'signed-in' } }),
    redirect: () => assert.fail('Unexpected redirect'), redirectResult: async () => null,
    signOut: async () => {}, ...overrides });
}

test('successful Google login returns the user and shares concurrent submissions', async () => {
  let calls = 0;
  const service = actions({ popup: async () => { calls++; return { user: { uid: 'signed-in' } }; } });
  const first = service.login();
  assert.equal(service.login(), first);
  assert.equal((await first).uid, 'signed-in');
  assert.equal(calls, 1);
  await service.login();
  assert.equal(calls, 2);
});

test('cancelled, unauthorized and network logins never start redirects and allow retry', async () => {
  for (const code of ['auth/popup-closed-by-user', 'auth/unauthorized-domain', 'auth/network-request-failed']) {
    let calls = 0;
    const service = actions({ popup: async () => { calls++; throw { code, message: 'private-value' }; } });
    await assert.rejects(service.login(), error => error.code === code);
    await assert.rejects(service.login(), error => error.code === code);
    assert.equal(calls, 2);
    assert.ok(!authErrorMessage({ code, message: 'private-value' }).includes('private-value'));
  }
});

test('only blocked popups use redirect and redirect failures propagate', async () => {
  let redirects = 0;
  const popup = async () => { throw { code: 'auth/popup-blocked' }; };
  const service = actions({ popup, redirect: async () => { redirects++; } });
  assert.equal(await service.login(), null);
  assert.equal(redirects, 1);
  await assert.rejects(actions({ popup, redirect: async () => { throw new Error('redirect failed'); } }).login(), /redirect failed/);
});

test('redirect completion is consumed once across StrictMode mounts; errors remain observable', async () => {
  let calls = 0;
  const service = actions({ redirectResult: async () => { calls++; throw { code: 'auth/unauthorized-domain' }; } });
  await assert.rejects(service.completeRedirect(), error => error.code === 'auth/unauthorized-domain');
  await assert.rejects(service.completeRedirect(), error => error.code === 'auth/unauthorized-domain');
  assert.equal(calls, 1);
});

test('switching accounts uses popup without logging out; logout delegates to Firebase', async () => {
  let signedOut = 0;
  const service = actions({ signOut: async () => { signedOut++; } });
  await service.login();
  assert.equal(signedOut, 0);
  await service.logout();
  assert.equal(signedOut, 1);
  await assert.rejects(actions({ signOut: async () => { throw new Error('offline'); } }).logout(), /offline/);
});

test('back navigation uses known in-app history or the public home fallback', () => {
  assert.equal(authBackDestination({ backTo: '/' }, 1), -1);
  for (const state of [null, {}, { backTo: 'https://untrusted.example' }, { backTo: '//untrusted.example' }, { backTo: '/login' }, { backTo: '/chat/private' }]) {
    assert.equal(authBackDestination(state, 5), '/');
  }
  assert.equal(authBackDestination({ backTo: '/' }, 0), '/');
  assert.equal(authBackDestination({ backTo: '/' }, undefined), '/');
});

test('unauthenticated requests never contact the backend', async () => {
  for (const auth of [null, { currentUser: null }]) {
    await assert.rejects(createAuthenticatedFetch({ auth, fetchImpl: () => assert.fail('Unexpected API call') })('/api/chats'));
  }
});

test('401 refreshes once and preserves request method, body and abort signal', async () => {
  const refreshes = [];
  const auth = { currentUser: { getIdToken: async refresh => { refreshes.push(refresh); return refresh ? 'fresh-test-token' : 'old-test-token'; } } };
  let calls = 0;
  const signal = new AbortController().signal;
  const fetcher = createAuthenticatedFetch({ auth, logout: () => assert.fail('Should not log out'), fetchImpl: async (url, init) => {
    assert.equal(init.method, 'POST'); assert.equal(init.body, '{}'); assert.equal(init.signal, signal);
    assert.equal(init.headers.get('Content-Type'), 'application/json');
    assert.equal(init.headers.get('Authorization'), calls === 0 ? 'Bearer old-test-token' : 'Bearer fresh-test-token');
    return new Response(null, { status: ++calls === 1 ? 401 : 200 });
  } });
  assert.equal((await fetcher('/api/new-chat', { method: 'POST', body: '{}', headers: { 'Content-Type': 'application/json' }, signal })).status, 200);
  assert.deepEqual(refreshes, [false, true]);
});

test('repeated unauthorized responses clear the session without unbounded retries', async () => {
  let calls = 0, signedOut = 0;
  const auth = { currentUser: { getIdToken: async () => 'test-token' } };
  const fetcher = createAuthenticatedFetch({ auth, logout: async () => { signedOut++; auth.currentUser = null; }, fetchImpl: async () => { calls++; return new Response(null, { status: 401 }); } });
  await assert.rejects(fetcher('/api/chats'), /session is invalid or expired/);
  assert.equal(calls, 2); assert.equal(signedOut, 1);
});

test('network failures and quota errors do not log out or replay requests', async () => {
  const auth = { currentUser: { getIdToken: async () => 'test-token' } };
  for (const status of [429, 503]) {
    let calls = 0;
    const fetcher = createAuthenticatedFetch({ auth, logout: () => assert.fail('Unexpected logout'), fetchImpl: async () => { calls++; return new Response(null, { status }); } });
    assert.equal((await fetcher('/api/chats')).status, status);
    assert.equal(calls, 1);
  }
  await assert.rejects(createAuthenticatedFetch({ auth, fetchImpl: async () => { throw new TypeError('offline'); } })('/api/chats'), /offline/);
});

test('requests cannot carry a previous account token after account switching', async () => {
  const auth = { currentUser: { getIdToken: async () => { auth.currentUser = { uid: 'other' }; return 'old-test-token'; } } };
  await assert.rejects(createAuthenticatedFetch({ auth, fetchImpl: () => assert.fail('Unexpected API call') })('/api/chats'), /session/);
});

test('revoked credentials clear the session while token refresh network failures preserve it', async () => {
  for (const code of ['auth/user-token-expired', 'auth/network-request-failed']) {
    let signedOut = 0;
    const auth = { currentUser: { getIdToken: async () => { throw { code }; } } };
    await assert.rejects(createAuthenticatedFetch({ auth, logout: async () => { signedOut++; }, fetchImpl: () => assert.fail('Unexpected API call') })('/api/chats'));
    assert.equal(signedOut, code === 'auth/user-token-expired' ? 1 : 0);
  }
});
