import { initializeFirebaseAuth } from "./firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";

const state = initializeFirebaseAuth(import.meta.env, initializeApp, getAuth);
export const auth = state.auth;
export const firebaseConfigurationError = state.configurationError;
const app = state.app;
if (app && typeof window !== "undefined") {
  isSupported().then(supported => { if (supported) getAnalytics(app); }).catch(() => {});
}

const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  if (!auth) throw new Error('Sign-in is unavailable. Please contact the site administrator.');
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google sign in popup error, falling back to redirect", error);
    await signInWithRedirect(auth, googleProvider);
  }
};

export const logout = async () => {
  if (!auth) return;
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error", error);
    throw error;
  }
};
