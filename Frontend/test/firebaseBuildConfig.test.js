import test from 'node:test';
import assert from 'node:assert/strict';
import { validateFirebaseBuildConfig } from '../src/services/firebaseBuildConfig.js';

const env = {
  VITE_FIREBASE_API_KEY: 'test-browser-key',
  VITE_FIREBASE_AUTH_DOMAIN: 'test-project.firebaseapp.com',
  VITE_FIREBASE_PROJECT_ID: 'test-project',
  VITE_FIREBASE_APP_ID: 'test-app-id',
};

test('a production build without overrides uses the verified public project defaults', () => {
  assert.doesNotThrow(() => validateFirebaseBuildConfig({ command: 'build', env: {} }));
});

test('a partially configured production build fails with hosting setup instructions', () => {
  assert.throws(() => validateFirebaseBuildConfig({ command: 'build', env: { VITE_FIREBASE_API_KEY: '' } }), error =>
    ['VITE_FIREBASE_API_KEY', 'VITE_FIREBASE_AUTH_DOMAIN', 'VITE_FIREBASE_PROJECT_ID',
      'VITE_FIREBASE_APP_ID', 'Vercel', 'redeploy'].every(value => error.message.includes(value)));
});

test('a configured build succeeds without exposing environment values', () => {
  assert.doesNotThrow(() => validateFirebaseBuildConfig({ command: 'build', env }));
  assert.throws(() => validateFirebaseBuildConfig({ command: 'build', env: {
    ...env, VITE_FIREBASE_APP_ID: '', MINIMAX_API_KEY: 'private-test-value',
  } }), error => !error.message.includes('private-test-value') &&
    !error.message.includes(env.VITE_FIREBASE_API_KEY));
});

test('example placeholder settings cannot produce a broken deployment', () => {
  assert.throws(() => validateFirebaseBuildConfig({ command: 'build', env: {
    ...env, VITE_FIREBASE_PROJECT_ID: 'your_firebase_project_id',
  } }), /VITE_FIREBASE_PROJECT_ID/);
});

test('development still opens the diagnostic login page with missing settings', () => {
  assert.doesNotThrow(() => validateFirebaseBuildConfig({ command: 'serve', env: {} }));
});
