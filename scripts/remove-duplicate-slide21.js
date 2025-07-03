/**
 * Remove Duplicate Slide 21 from Lesson 1
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, query, where, deleteDoc } from 'firebase/firestore';
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

// Remove duplicate slide 21
const removeDuplicateSlide = async () => {
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
    
    // Find slide 21 (the duplicate)
    const slidesRef = collection(db, 'slides');
    const slideQuery = query(
      slidesRef, 
      where('lessonId', '==', lessonDoc.id),
      where('id', '==', '7DbzqvFVLfMZ2Y5lmQTB')
    );
    const slideSnapshot = await getDocs(slideQuery);
    
    if (slideSnapshot.empty) {
      console.log('❌ Slide 21 not found');
      return;
    }
    
    const slideDoc = slideSnapshot.docs[0];
    console.log('🔍 Found slide 21:', slideDoc.id);
    console.log('📝 Slide title:', slideDoc.data().title);
    
    // Delete the duplicate slide
    await deleteDoc(doc(db, 'slides', slideDoc.id));
    console.log('✅ Successfully deleted duplicate slide 21');
    
  } catch (error) {
    console.error('❌ Error removing duplicate slide:', error);
  }
};

// Run the removal
removeDuplicateSlide(); 