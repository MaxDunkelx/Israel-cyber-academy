/**
 * Test Firebase Connection
 * 
 * Simple script to test if Firebase is working properly
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

console.log('🔍 Testing Firebase Connection');
console.log('=============================\n');

// Check environment variables
console.log('📋 Environment Variables Check:');
console.log('API Key exists:', !!process.env.VITE_FIREBASE_API_KEY);
console.log('Project ID exists:', !!process.env.VITE_FIREBASE_PROJECT_ID);
console.log('Auth Domain exists:', !!process.env.VITE_FIREBASE_AUTH_DOMAIN);
console.log('');

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

console.log('📋 Firebase Config:');
console.log('Project ID:', firebaseConfig.projectId);
console.log('Auth Domain:', firebaseConfig.authDomain);
console.log('');

try {
  // Initialize Firebase
  console.log('🚀 Initializing Firebase...');
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  console.log('✅ Firebase initialized successfully');
  
  // Test database connection
  console.log('🔗 Testing database connection...');
  const lessonsSnapshot = await getDocs(collection(db, 'lessons'));
  console.log(`✅ Database connection successful! Found ${lessonsSnapshot.size} lessons`);
  
  // Test slides collection
  console.log('📋 Testing slides collection...');
  const slidesSnapshot = await getDocs(collection(db, 'slides'));
  console.log(`✅ Slides collection accessible! Found ${slidesSnapshot.size} slides`);
  
  console.log('\n🎉 All tests passed! Firebase is working correctly.');
  
} catch (error) {
  console.error('❌ Firebase test failed:', error);
  console.error('Error code:', error.code);
  console.error('Error message:', error.message);
  
  if (error.code === 'invalid-argument') {
    console.log('\n💡 This usually means:');
    console.log('1. Firebase project ID is incorrect');
    console.log('2. Firebase rules are blocking access');
    console.log('3. Environment variables are not set correctly');
  }
} 