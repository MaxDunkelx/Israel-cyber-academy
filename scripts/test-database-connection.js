/**
 * Test Database Connection
 * 
 * Simple script to test if the database is working and data is accessible
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC35sH38k9co_R0zBsbDT0S6RE1Cp-ksHE",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "750693821908",
  appId: "1:750693821908:web:6518d1facad1d8095cfa41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log('🧪 Testing Database Connection');
console.log('=============================\n');

const testConnection = async () => {
  try {
    console.log('📋 Testing Firestore connection...');
    
    // Test lessons collection
    const lessonsSnapshot = await getDocs(collection(db, 'lessons'));
    console.log(`✅ Found ${lessonsSnapshot.size} lessons`);
    
    lessonsSnapshot.docs.forEach((doc, index) => {
      const data = doc.data();
      console.log(`  ${index + 1}. ${data.title} (ID: ${doc.id})`);
    });
    
    // Test slides collection
    const slidesSnapshot = await getDocs(collection(db, 'slides'));
    console.log(`✅ Found ${slidesSnapshot.size} slides`);
    
    // Group slides by lesson
    const slidesByLesson = {};
    slidesSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      const lessonId = data.lessonId || 'unknown';
      if (!slidesByLesson[lessonId]) {
        slidesByLesson[lessonId] = [];
      }
      slidesByLesson[lessonId].push({
        id: doc.id,
        title: data.title,
        type: data.type
      });
    });
    
    Object.keys(slidesByLesson).forEach(lessonId => {
      console.log(`\n📖 Lesson ${lessonId}:`);
      slidesByLesson[lessonId].forEach((slide, index) => {
        console.log(`  ${index + 1}. ${slide.title} (${slide.type})`);
      });
    });
    
    console.log('\n🎉 Database connection test successful!');
    console.log('✅ Your Firebase is working correctly');
    console.log('✅ Your lesson data is accessible');
    console.log('✅ You can now use the slide editor');
    
  } catch (error) {
    console.error('❌ Database connection test failed:', error);
    console.log('\n💡 Troubleshooting:');
    console.log('1. Check your Firebase project settings');
    console.log('2. Ensure Firestore is enabled');
    console.log('3. Check security rules');
  }
};

testConnection(); 