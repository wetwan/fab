// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX-XnZgPNwdmOnEdlq0HT7GyzFG2-oZvM",
  authDomain: "fab-food-c9722.firebaseapp.com",
  projectId: "fab-food-c9722",
  storageBucket: "fab-food-c9722.firebasestorage.app",
  messagingSenderId: "649918441103",
  appId: "1:649918441103:web:d33e450754c7541e3172fa",
  measurementId: "G-JEQ4H8K2B2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
