/**
 * Fix Lesson ID Consistency Script
 * 
 * This script fixes any inconsistent lessonId values in the slides collection
 * to ensure proper data retrieval and updates.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxGUOlJqXqXqXqXqXqXqXqXqXqXqXqXqXq",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Fix lessonId consistency in the database
 */
const fixLessonIdConsistency = async () => {
  try {
    console.log('🔧 Starting lessonId consistency fix...');
    
    // Import the function from content-service
    const { fixLessonIdConsistency } = await import('../src/firebase/content-service.js');
    
    const updatedCount = await fixLessonIdConsistency();
    
    console.log(`✅ Successfully fixed ${updatedCount} slides`);
    
    if (updatedCount > 0) {
      console.log('🔄 Database has been updated. Please test the system manager and student views.');
    } else {
      console.log('✅ No inconsistencies found. Database is already consistent.');
    }
    
  } catch (error) {
    console.error('❌ Error fixing lessonId consistency:', error);
    process.exit(1);
  }
};

// Run the fix
fixLessonIdConsistency()
  .then(() => {
    console.log('🎉 Lesson ID consistency fix completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Lesson ID consistency fix failed:', error);
    process.exit(1);
  }); 