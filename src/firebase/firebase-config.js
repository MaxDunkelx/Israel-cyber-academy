// src/firebase/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC35sH38k9co_R0zBsbDT0S6RE1Cp-ksHE",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.firebasestorage.app",
  messagingSenderId: "750693821908",
  appId: "1:750693821908:web:6518d1facad1d8095cfa41"
};

// Debug: Log the configuration (remove this in production)
console.log('Firebase Config:', firebaseConfig);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
