import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyC7pSR_uEiUkOaxoJpjtPTpsp9TT33-yQI",
  authDomain: "mobile-house-website.firebaseapp.com",
  databaseURL: "https://mobile-house-website-default-rtdb.firebaseio.com",
  projectId: "mobile-house-website",
  storageBucket: "mobile-house-website.firebasestorage.app",
  messagingSenderId: "637804329146",
  appId: "1:637804329146:web:fad9ac9011e234c6b32a83",
  measurementId: "G-GGNKGKJM86",
};
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

export { database };
