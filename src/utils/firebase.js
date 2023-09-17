// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRc1LBpfD4Qc5r5iUAlWIWMMYyvi003Io",
  authDomain: "netflix-gpt-c3783.firebaseapp.com",
  projectId: "netflix-gpt-c3783",
  storageBucket: "netflix-gpt-c3783.appspot.com",
  messagingSenderId: "668824075344",
  appId: "1:668824075344:web:56e2a3c8966051600fa555",
  measurementId: "G-98SSKBQSN7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
