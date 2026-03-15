// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPHsRTjkWInzXmtLbAJOpBDn6Hs8oHGcQ",
  authDomain: "budgetbee-a10a3.firebaseapp.com",
  projectId: "budgetbee-a10a3",
  storageBucket: "budgetbee-a10a3.firebasestorage.app",
  messagingSenderId: "478350851910",
  appId: "1:478350851910:web:d72f10a042de2a97402f47",
  measurementId: "G-642HTT0GVQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);