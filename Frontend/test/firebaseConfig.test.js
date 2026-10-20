import test from 'node:test';
import assert from 'node:assert/strict';
import { createFirebaseConfig, initializeFirebaseAuth } from '../src/services/firebaseConfig.js';
import { defaultFirebaseConfig } from '../src/config/firebasePublicConfig.js';

const valid = {
  VITE_FIREBASE_API_KEY: 'test-public-browser-key',
  VITE_FIREBASE_AUTH_DOMAIN: 'test-project.firebaseapp.com',
  VITE_FIREBASE_PROJECT_ID: 'test-project',
  VITE_FIREBASE_APP_ID: 'test-app-id',
};

test('Firebase configuration accepts only the named public settings', () => {
  const result = createFirebaseConfig({ ...valid, MINIMAX_API_KEY: 'private-test-value', VITE_API_BASE_URL: '/api' });
  assert.deepEqual(result, { apiKey: valid.VITE_FIREBASE_API_KEY, authDomain: valid.VITE_FIREBASE_AUTH_DOMAIN, projectId: valid.VITE_FIREBASE_PROJECT_ID, appId: valid.VITE_FIREBASE_APP_ID });
  assert.ok(!JSON.stringify(result).includes('private-test-value'));
});

test('missing Firebase settings report variable names without exposing supplied values', () => {
  assert.throws(() => createFirebaseConfig({ VITE_FIREBASE_API_KEY: 'do-not-echo-this-value' }), error =>
    error.message.includes('VITE_FIREBASE_PROJECT_ID') && !error.message.includes('do-not-echo-this-value'));
});

test('Firebase example placeholders must be replaced before initialization', () => {
  assert.throws(() => createFirebaseConfig({ ...valid, VITE_FIREBASE_API_KEY: 'your_firebase_web_api_key_here' }), /VITE_FIREBASE_API_KEY/);
});

test('partial configuration never initializes Firebase or mixes in project defaults', () => {
  const unexpected = () => assert.fail('SDK initialization must not run');
  const state = initializeFirebaseAuth({ VITE_FIREBASE_PROJECT_ID: 'another-project' }, unexpected, unexpected);
  assert.equal(state.auth, null);
  assert.equal(state.app, null);
  assert.match(state.configurationError, /VITE_FIREBASE_API_KEY/);
});

test('configured Firebase initializes and exposes the authenticated SDK instance', () => {
  const app = {};
  const auth = {};
  const state = initializeFirebaseAuth(valid, config => {
    assert.equal(config.projectId, valid.VITE_FIREBASE_PROJECT_ID);
    return app;
  }, initializedApp => {
    assert.equal(initializedApp, app);
    return auth;
  });
  assert.deepEqual(state, { app, auth, configurationError: null });
});

test('SDK initialization errors become a safe unavailable state', () => {
  const state = initializeFirebaseAuth(valid, () => ({}), () => {
    throw new Error('SDK error containing a sensitive value');
  });
  assert.equal(state.auth, null);
  assert.equal(state.app, null);
  assert.match(state.configurationError, /could not initialize/);
  assert.ok(!state.configurationError.includes('sensitive value'));
});

test('the actual Firebase service initializes the default project without Vite variables', async () => {
  const service = await import('../src/services/firebase.js');
  assert.ok(service.auth);
  assert.equal(service.auth.app.options.projectId, defaultFirebaseConfig.projectId);
  assert.equal(service.firebaseConfigurationError, null);
});

test('absent Firebase overrides use only the four approved public project identifiers', () => {
  const config = createFirebaseConfig({ VITE_API_BASE_URL: '/api', PRIVATE_KEY: 'private-test-value' });
  assert.deepEqual(config, defaultFirebaseConfig);
  assert.deepEqual(Object.keys(config).sort(), ['apiKey', 'appId', 'authDomain', 'projectId']);
  assert.equal(config.projectId, 'intellixai-3aaaf');
  config.projectId = 'changed-copy';
  assert.equal(createFirebaseConfig().projectId, 'intellixai-3aaaf');
});

test('empty and partial overrides fail instead of silently selecting another project', () => {
  for (const env of [{ VITE_FIREBASE_API_KEY: '' }, { VITE_FIREBASE_PROJECT_ID: 'another-project' }]) {
    assert.throws(() => createFirebaseConfig(env), /VITE_FIREBASE_API_KEY/);
  }
  assert.equal(createFirebaseConfig(valid).projectId, 'test-project');
});
