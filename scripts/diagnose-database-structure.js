/**
 * Database Structure Diagnostic Script
 * 
 * This script will check what collections and data actually exist in Firestore
 * to help diagnose why analytics are showing incorrect data.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';

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

async function diagnoseDatabase() {
  console.log('🔍 Diagnosing database structure...\n');

  try {
    // Check main collections
    const collections = ['users', 'lessons', 'sessions', 'userActivities', 'security_logs', 'system'];
    
    for (const collectionName of collections) {
      console.log(`📊 Checking collection: ${collectionName}`);
      
      try {
        const snapshot = await getDocs(collection(db, collectionName));
        console.log(`   ✅ Found ${snapshot.size} documents`);
        
        if (snapshot.size > 0) {
          // Show first document structure
          const firstDoc = snapshot.docs[0];
          console.log(`   📄 First document ID: ${firstDoc.id}`);
          console.log(`   📄 First document data:`, JSON.stringify(firstDoc.data(), null, 2));
        }
      } catch (error) {
        console.log(`   ❌ Error accessing collection: ${error.message}`);
      }
      console.log('');
    }

    // Check lesson subcollections
    console.log('📚 Checking lesson subcollections...');
    const lessonsSnapshot = await getDocs(collection(db, 'lessons'));
    
    for (const lessonDoc of lessonsSnapshot.docs) {
      console.log(`\n📖 Lesson: ${lessonDoc.id}`);
      console.log(`   Title: ${lessonDoc.data().title || 'No title'}`);
      
      try {
        const slidesSnapshot = await getDocs(collection(db, 'lessons', lessonDoc.id, 'slides'));
        console.log(`   📄 Slides: ${slidesSnapshot.size} found`);
        
        if (slidesSnapshot.size > 0) {
          const firstSlide = slidesSnapshot.docs[0];
          console.log(`   📄 First slide ID: ${firstSlide.id}`);
          console.log(`   📄 First slide data:`, JSON.stringify(firstSlide.data(), null, 2));
        }
      } catch (error) {
        console.log(`   ❌ Error accessing slides: ${error.message}`);
      }
    }

    // Check for any other collections
    console.log('\n🔍 Checking for other collections...');
    const allCollections = await getDocs(collection(db, ''));
    console.log(`Total collections found: ${allCollections.size}`);

  } catch (error) {
    console.error('❌ Error during diagnosis:', error);
  }
}

// Run the diagnosis
diagnoseDatabase().then(() => {
  console.log('\n✅ Database diagnosis complete');
  process.exit(0);
}).catch((error) => {
  console.error('❌ Diagnosis failed:', error);
  process.exit(1);
}); 