import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, createUserWithEmailAndPassword } from "firebase/auth";

// Firebase config object
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
  };

// Initializing the firebase app
const app = initializeApp(firebaseConfig)

// And getting the auth instance
export const auth = getAuth(app)

// Set up the Google OAuth provider per "Getting Started > 2. Set up firebase auth"
export const googleProvider = new GoogleAuthProvider()
export const googleSignIn = () => signInWithPopup(auth, googleProvider)

// Set up email/password sign in and sign up (for new users)
export const emailSignUp = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password)
export const emailSignIn = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password)

// Sign out the user
export const signOutUser = () => signOut(auth)