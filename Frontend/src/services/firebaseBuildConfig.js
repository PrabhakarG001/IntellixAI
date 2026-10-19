import { createFirebaseConfig } from './firebaseConfig.js';

export function validateFirebaseBuildConfig(config) {
  if (config.command !== 'build') return;
  try {
    createFirebaseConfig(config.env);
  } catch (error) {
    throw new Error(
      `Firebase authentication configuration is missing or invalid. ${error.message} ` +
      'For Vercel, set these variables in Project Settings > Environment Variables ' +
      'for the target environment, then redeploy. See docs/authentication-deployment.md.',
    );
  }
}

export function firebaseBuildConfiguration() {
  return {
    name: 'validate-firebase-auth-configuration',
    configResolved: validateFirebaseBuildConfig,
  };
}
