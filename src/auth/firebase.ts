// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_FIREBASE,
  authDomain: "watchflix-ec0bf.firebaseapp.com",
  projectId: "watchflix-ec0bf",
  storageBucket: "watchflix-ec0bf.appspot.com",
  messagingSenderId: "1057987215628",
  appId: "1:1057987215628:web:f11ee6467aef4fe1178929",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
