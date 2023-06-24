import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCzQyGrIeuIcbBKkenzwulOaKvO-SSmjZo",
  authDomain: "gradeguru-15307.firebaseapp.com",
  projectId: "gradeguru-15307",
  storageBucket: "gradeguru-15307.appspot.com",
  messagingSenderId: "830331114384",
  appId: "1:830331114384:web:178d43ac9d1209da5c1915",
  measurementId: "G-R5QRMZKY3Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);