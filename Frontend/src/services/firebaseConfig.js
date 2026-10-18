const fields = {
  apiKey: 'VITE_FIREBASE_API_KEY',
  authDomain: 'VITE_FIREBASE_AUTH_DOMAIN',
  projectId: 'VITE_FIREBASE_PROJECT_ID',
  appId: 'VITE_FIREBASE_APP_ID',
  storageBucket: 'VITE_FIREBASE_STORAGE_BUCKET',
  messagingSenderId: 'VITE_FIREBASE_MESSAGING_SENDER_ID',
  measurementId: 'VITE_FIREBASE_MEASUREMENT_ID',
};

export function createFirebaseConfig(env = {}) {
  const config = {};
  for (const [field, variable] of Object.entries(fields)) {
    const value = typeof env[variable] === 'string' ? env[variable].trim() : '';
    if (value) config[field] = value;
  }
  const missing = ['apiKey', 'authDomain', 'projectId', 'appId'].filter(field =>
    !config[field] || /^(your_|replace_|<)/i.test(config[field]));
  if (missing.length) {
    throw new Error(`Configure ${missing.map(field => fields[field]).join(', ')} in the frontend environment before starting the app.`);
  }
  return config;
}

export function initializeFirebaseAuth(env, initializeApp, getAuth) {
  let config;
  try {
    config = createFirebaseConfig(env);
  } catch (error) {
    return { app: null, auth: null, configurationError: error.message };
  }
  try {
    const app = initializeApp(config);
    return { app, auth: getAuth(app), configurationError: null };
  } catch {
    return { app: null, auth: null, configurationError: 'Firebase sign-in could not initialize. Verify the frontend Firebase configuration and rebuild the app.' };
  }
}
