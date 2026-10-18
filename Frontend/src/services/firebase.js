import { initializeFirebaseAuth } from "./firebaseConfig.js";
import { createAuthActions } from "./authFlow.js";
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut } from "firebase/auth";

const state = initializeFirebaseAuth(import.meta.env, initializeApp, getAuth);
export const auth = state.auth;
export const firebaseConfigurationError = state.configurationError;
const app = state.app;
if (app && typeof window !== "undefined") {
  isSupported().then(supported => { if (supported) getAnalytics(app); }).catch(() => {});
}

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
const actions = createAuthActions({ auth, provider: googleProvider, popup: signInWithPopup,
  redirect: signInWithRedirect, redirectResult: getRedirectResult, signOut });
export const loginWithGoogle = actions.login;
export const completeGoogleRedirect = actions.completeRedirect;
export const logout = actions.logout;
