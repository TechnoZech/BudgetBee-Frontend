// Only export the Firebase app and auth safely for client-side use
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase config from environment variables
const firebaseConfig = {
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// Initialize Firebase app safely (avoid double init)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export app for use in other modules
export { app };

// Export auth for client-side Firebase auth
export const auth =
  typeof window !== "undefined" ? getAuth(app) : null;