/**
 * Check Lesson IDs in Database
 * 
 * This script checks the actual lesson IDs in the database to understand the structure.
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

async function checkLessonIds() {
  console.log('🔍 Checking lesson IDs in Firebase...\n');

  try {
    // Get all lessons
    const lessonsCollection = collection(db, 'lessons');
    const lessonsSnapshot = await getDocs(lessonsCollection);
    
    console.log(`📚 Found ${lessonsSnapshot.size} lessons in database\n`);
    
    const lessons = [];
    
    lessonsSnapshot.forEach((doc) => {
      const lesson = doc.data();
      const lessonId = doc.id;
      
      lessons.push({
        id: lessonId,
        title: lesson.title,
        order: lesson.order,
        originalId: lesson.originalId,
        totalSlides: lesson.totalSlides
      });
    });
    
    // Sort by order for better display
    lessons.sort((a, b) => {
      const aOrder = a.order || a.originalId || parseInt(a.id.replace(/\D/g, '')) || 0;
      const bOrder = b.order || b.originalId || parseInt(b.id.replace(/\D/g, '')) || 0;
      return aOrder - bOrder;
    });
    
    console.log('📋 LESSON DETAILS:');
    console.log('==================');
    
    lessons.forEach((lesson, index) => {
      console.log(`\n${index + 1}. Lesson ID: "${lesson.id}"`);
      console.log(`   Title: ${lesson.title}`);
      console.log(`   Order: ${lesson.order || 'NOT SET'}`);
      console.log(`   Original ID: ${lesson.originalId || 'NOT SET'}`);
      console.log(`   Total Slides: ${lesson.totalSlides || 0}`);
      
      // Check if this is lesson 1 or 2 specifically
      if (lesson.order === 1 || lesson.originalId === 1 || lesson.id === 'lesson1' || lesson.id === '1') {
        console.log(`   ✅ This appears to be Lesson 1`);
      }
      if (lesson.order === 2 || lesson.originalId === 2 || lesson.id === 'lesson2' || lesson.id === '2') {
        console.log(`   ✅ This appears to be Lesson 2`);
      }
    });
    
    // Check for specific lesson IDs
    console.log('\n🎯 SPECIFIC CHECKS:');
    console.log('===================');
    
    const lesson1 = lessons.find(l => 
      l.order === 1 || l.originalId === 1 || l.id === 'lesson1' || l.id === '1'
    );
    
    const lesson2 = lessons.find(l => 
      l.order === 2 || l.originalId === 2 || l.id === 'lesson2' || l.id === '2'
    );
    
    if (lesson1) {
      console.log(`✅ Lesson 1 found with ID: "${lesson1.id}"`);
    } else {
      console.log('❌ Lesson 1 not found');
    }
    
    if (lesson2) {
      console.log(`✅ Lesson 2 found with ID: "${lesson2.id}"`);
    } else {
      console.log('❌ Lesson 2 not found');
    }
    
    // Summary
    console.log('\n📊 SUMMARY:');
    console.log('===========');
    console.log(`Total lessons: ${lessons.length}`);
    console.log(`Lesson IDs: ${lessons.map(l => l.id).join(', ')}`);
    
    console.log('\n💡 RECOMMENDATIONS:');
    console.log('===================');
    console.log('1. Check if the frontend is using the correct lesson IDs');
    console.log('2. Verify that lesson IDs match between frontend and database');
    console.log('3. Ensure the getSlidesByLessonId function is called with correct IDs');
    
  } catch (error) {
    console.error('❌ Error checking lessons:', error);
  }
}

// Run the check
checkLessonIds(); 