/**
 * Test script to verify lesson data loading
 * This script tests loading actual lesson data from the data folder
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvOkT3v1EQqMVIupBA-BmOoOqXjKJQJQw",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testLessonLoading() {
  try {
    console.log('🔍 Testing lesson loading...');
    
    // Test 1: Get all lessons
    console.log('\n📚 Test 1: Getting all lessons...');
    const lessonsQuery = query(collection(db, 'lessons'));
    const lessonsSnapshot = await getDocs(lessonsQuery);
    
    console.log(`Found ${lessonsSnapshot.size} lessons in database`);
    
    lessonsSnapshot.forEach(doc => {
      const data = doc.data();
      console.log(`- Lesson: ${data.title} (ID: ${data.id}, Doc ID: ${doc.id})`);
    });
    
    // Test 2: Try with ordering
    console.log('\n📚 Test 2: Trying with ordering...');
    try {
      const orderedQuery = query(
        collection(db, 'lessons'),
        orderBy('id', 'asc')
      );
      const orderedSnapshot = await getDocs(orderedQuery);
      console.log(`✅ Ordered query successful: ${orderedSnapshot.size} lessons`);
    } catch (orderError) {
      console.log(`❌ Ordering failed: ${orderError.message}`);
    }
    
    // Test 3: Get slides for first lesson
    if (lessonsSnapshot.size > 0) {
      const firstLesson = lessonsSnapshot.docs[0];
      const lessonData = firstLesson.data();
      
      console.log(`\n📚 Test 3: Getting slides for lesson "${lessonData.title}"...`);
      
      const slidesQuery = query(collection(db, 'slides'));
      const slidesSnapshot = await getDocs(slidesQuery);
      
      const lessonSlides = slidesSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(slide => slide.lessonId === lessonData.id.toString());
      
      console.log(`Found ${lessonSlides.length} slides for lesson ${lessonData.id}`);
      lessonSlides.forEach(slide => {
        console.log(`- Slide: ${slide.title} (Type: ${slide.type}, Order: ${slide.order})`);
      });
    }
    
    console.log('\n✅ Test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testLessonLoading(); 