/**
 * Test Slide Loading for Lesson 2
 * 
 * This script directly tests the getSlidesByLessonId function to see if it works for lesson2.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy, getDoc, doc } from 'firebase/firestore';

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

async function testSlideLoading() {
  console.log('🧪 Testing slide loading for lesson2...\n');

  try {
    const lessonId = 'lesson2';
    
    console.log(`📖 Testing lesson ID: "${lessonId}"`);
    
    // Test 1: Try with order field
    console.log('\n🔍 Test 1: Querying with order field...');
    try {
      const slidesQuery = query(
        collection(db, 'lessons', lessonId, 'slides'),
        orderBy('order', 'asc')
      );
      
      const snapshot = await getDocs(slidesQuery);
      console.log(`✅ Found ${snapshot.size} slides with order field`);
      
      if (snapshot.size > 0) {
        snapshot.docs.slice(0, 3).forEach((doc, index) => {
          const data = doc.data();
          console.log(`   Slide ${index + 1}: ${doc.id} - ${data.title} (order: ${data.order})`);
        });
      }
    } catch (error) {
      console.log(`❌ Error with order field: ${error.message}`);
    }
    
    // Test 2: Try without ordering
    console.log('\n🔍 Test 2: Querying without ordering...');
    try {
      const slidesQuery = query(
        collection(db, 'lessons', lessonId, 'slides')
      );
      
      const snapshot = await getDocs(slidesQuery);
      console.log(`✅ Found ${snapshot.size} slides without ordering`);
      
      if (snapshot.size > 0) {
        snapshot.docs.slice(0, 3).forEach((doc, index) => {
          const data = doc.data();
          console.log(`   Slide ${index + 1}: ${doc.id} - ${data.title}`);
        });
      }
    } catch (error) {
      console.log(`❌ Error without ordering: ${error.message}`);
    }
    
    // Test 3: Check if the subcollection exists
    console.log('\n🔍 Test 3: Checking if subcollection exists...');
    try {
      const slidesCollection = collection(db, 'lessons', lessonId, 'slides');
      const snapshot = await getDocs(slidesCollection);
      console.log(`✅ Subcollection exists with ${snapshot.size} documents`);
    } catch (error) {
      console.log(`❌ Subcollection error: ${error.message}`);
    }
    
    // Test 4: Check lesson document
    console.log('\n🔍 Test 4: Checking lesson document...');
    try {
      const lessonDoc = await getDoc(doc(db, 'lessons', lessonId));
      if (lessonDoc.exists()) {
        const lessonData = lessonDoc.data();
        console.log(`✅ Lesson document exists:`);
        console.log(`   Title: ${lessonData.title}`);
        console.log(`   Order: ${lessonData.order}`);
        console.log(`   Total Slides: ${lessonData.totalSlides}`);
      } else {
        console.log(`❌ Lesson document does not exist`);
      }
    } catch (error) {
      console.log(`❌ Error checking lesson document: ${error.message}`);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testSlideLoading(); 