import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBb5Qm_KP2iuw5u1uqNjEr3z96cLpSSHzg",
  authDomain: "intellixai-3aaaf.firebaseapp.com",
  projectId: "intellixai-3aaaf",
  storageBucket: "intellixai-3aaaf.firebasestorage.app",
  messagingSenderId: "503527457818",
  appId: "1:503527457818:web:ce56b47de63ee912707da3",
  measurementId: "G-J6FK8P65G6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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