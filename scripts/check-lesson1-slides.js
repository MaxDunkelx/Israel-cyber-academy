/**
 * Check Lesson 1 Slides in Firebase
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, query, where, orderBy } from 'firebase/firestore';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Check slides in Firebase
const checkSlides = async () => {
  try {
    console.log('🔍 Finding lesson 1 in Firebase...');
    
    // Find lesson 1
    const lessonsRef = collection(db, 'lessons');
    const lessonQuery = query(lessonsRef, where('originalId', '==', 1));
    const lessonSnapshot = await getDocs(lessonQuery);
    
    if (lessonSnapshot.empty) {
      console.log('❌ Lesson 1 not found');
      return;
    }
    
    const lessonDoc = lessonSnapshot.docs[0];
    console.log('✅ Found lesson 1:', lessonDoc.id);
    
    // Get all slides for lesson 1
    const slidesRef = collection(db, 'slides');
    const slidesQuery = query(
      slidesRef, 
      where('lessonId', '==', lessonDoc.id),
      orderBy('order', 'asc')
    );
    const slidesSnapshot = await getDocs(slidesQuery);
    
    console.log(`📊 Found ${slidesSnapshot.size} slides for lesson 1:\n`);
    
    slidesSnapshot.docs.forEach((doc, index) => {
      const slide = doc.data();
      console.log(`${index + 1}. ID: ${slide.id} | Type: ${slide.type} | Title: ${slide.title}`);
    });
    
  } catch (error) {
    console.error('❌ Error checking slides:', error);
  }
};

// Run the check
checkSlides(); 