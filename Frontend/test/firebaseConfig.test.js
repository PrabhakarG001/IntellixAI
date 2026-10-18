import test from 'node:test';
import assert from 'node:assert/strict';
import { createFirebaseConfig } from '../src/services/firebaseConfig.js';

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
