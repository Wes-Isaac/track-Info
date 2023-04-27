import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-5EEzDxSl86skiwSKyiPI4kGByisXdJY",
  authDomain: "track-info-77bca.firebaseapp.com",
  projectId: "track-info-77bca",
  storageBucket: "track-info-77bca.appspot.com",
  messagingSenderId: "376873156260",
  appId: "1:376873156260:web:d43798324ccf0c543c3031",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const timestamp = serverTimestamp;
