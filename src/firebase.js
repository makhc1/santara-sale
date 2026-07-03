
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7xo7L9_qdSao1p2OvosZU5GQrT3NTt5s",
  authDomain: "santara-sale.firebaseapp.com",
  projectId: "santara-sale",
  storageBucket: "santara-sale.firebasestorage.app",
  messagingSenderId: "143720919450",
  appId: "1:143720919450:web:e8e154e0ef12351d110a23",
  measurementId: "G-K7BB70M1EY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };