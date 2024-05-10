// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_WgnmZl1HhAe9Ngdbj3ABDwhhSsnxf1E",
  authDomain: "app-a45d5.firebaseapp.com",
  projectId: "app-a45d5",
  storageBucket: "app-a45d5.appspot.com",
  messagingSenderId: "1070770707756",
  appId: "1:1070770707756:web:04e964979f7f5bf03ce089"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);