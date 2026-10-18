import { createFirebaseConfig } from "./firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = createFirebaseConfig(import.meta.env);

const app = initializeApp(firebaseConfig);
if (typeof window !== "undefined") {
  isSupported().then(supported => { if (supported) getAnalytics(app); }).catch(() => {});
}

import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";

export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google sign in popup error, falling back to redirect", error);
    await signInWithRedirect(auth, googleProvider);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error", error);
    throw error;
  }
};