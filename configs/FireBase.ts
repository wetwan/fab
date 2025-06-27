// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { GoogleAuthProvider, initializeAuth } from 'firebase/auth'; 
// import { getReactNativePersistence } from "firebase/auth/react-native"; 
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; 


// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDX-XnZgPNwdmOnEdlq0HT7GyzFG2-oZvM",
//   authDomain: "fab-food-c9722.firebaseapp.com",
//   projectId: "fab-food-c9722",
//   storageBucket: "fab-food-c9722.firebasestorage.app",
//   messagingSenderId: "649918441103",
//   appId: "1:649918441103:web:e7bd8d183981585c3172fa",
//   measurementId: "G-BWJK00QCSN"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);

// export const auths = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

// export const provider = new GoogleAuthProvider();
// configs/FireBase.ts
import { initializeApp, getApps } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  GoogleAuthProvider
} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDX-XnZgPNwdmOnEdlq0HT7GyzFG2-oZvM",
  authDomain: "fab-food-c9722.firebaseapp.com",
  projectId: "fab-food-c9722",
  storageBucket: "fab-food-c9722.appspot.com",
  messagingSenderId: "649918441103",
  appId: "1:649918441103:web:d33e450754c7541e3172fa",
  measurementId: "G-JEQ4H8K2B2"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const provider = new GoogleAuthProvider();
