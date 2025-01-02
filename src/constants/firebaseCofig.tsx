// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7pSR_uEiUkOaxoJpjtPTpsp9TT33-yQI",
  authDomain: "mobile-house-website.firebaseapp.com",
  databaseURL: "https://mobile-house-website-default-rtdb.firebaseio.com/",
  projectId: "mobile-house-website",
  storageBucket: "mobile-house-website.firebasestorage.app",
  messagingSenderId: "637804329146",
  appId: "1:637804329146:web:fad9ac9011e234c6b32a83",
  measurementId: "G-GGNKGKJM86",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
