/**
 * Check All Lesson Slides in Database
 * 
 * This script checks all lessons in Firebase and counts how many slides each lesson has.
 * It verifies that lessons 1 and 2 are fully loaded from the database.
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

async function checkAllLessonSlides() {
  console.log('🔍 Checking all lessons and their slides in Firebase...\n');

  try {
    // Get all lessons
    const lessonsCollection = collection(db, 'lessons');
    const lessonsSnapshot = await getDocs(lessonsCollection);
    
    console.log(`📚 Found ${lessonsSnapshot.size} lessons in database\n`);
    
    const lessonData = [];
    
    for (const lessonDoc of lessonsSnapshot.docs) {
      const lesson = lessonDoc.data();
      const lessonId = lessonDoc.id;
      
      console.log(`📖 Lesson ${lesson.order || 'N/A'} (${lessonId}):`);
      console.log(`   Title: ${lesson.title}`);
      console.log(`   Total Slides (from lesson): ${lesson.totalSlides || 'N/A'}`);
      
      // Get slides for this lesson
      const slidesCollection = collection(db, 'lessons', lessonId, 'slides');
      const slidesSnapshot = await getDocs(slidesCollection);
      
      console.log(`   Slides in database: ${slidesSnapshot.size}`);
      
      // Check if slides have content
      let slidesWithContent = 0;
      let slidesWithoutContent = 0;
      
      for (const slideDoc of slidesSnapshot.docs) {
        const slide = slideDoc.data();
        if (slide.content && Object.keys(slide.content).length > 0) {
          slidesWithContent++;
        } else {
          slidesWithoutContent++;
        }
      }
      
      console.log(`   Slides with content: ${slidesWithContent}`);
      console.log(`   Slides without content: ${slidesWithoutContent}`);
      
      // Check if this is lesson 1 or 2
      if (lesson.order === 1 || lesson.order === 2) {
        console.log(`   ✅ This is lesson ${lesson.order} - should be fully loaded from database`);
        
        // Verify slide content for lessons 1 and 2
        if (slidesWithContent === 0) {
          console.log(`   ❌ WARNING: Lesson ${lesson.order} has no slides with content!`);
        } else {
          console.log(`   ✅ Lesson ${lesson.order} has ${slidesWithContent} slides with content`);
        }
      }
      
      lessonData.push({
        order: lesson.order,
        id: lessonId,
        title: lesson.title,
        totalSlides: lesson.totalSlides,
        slidesInDB: slidesSnapshot.size,
        slidesWithContent,
        slidesWithoutContent
      });
      
      console.log('');
    }
    
    // Summary
    console.log('📊 SUMMARY:');
    console.log('===========');
    
    lessonData.sort((a, b) => a.order - b.order);
    
    for (const lesson of lessonData) {
      const status = lesson.slidesWithContent > 0 ? '✅' : '❌';
      console.log(`${status} Lesson ${lesson.order}: ${lesson.slidesWithContent}/${lesson.totalSlides} slides with content`);
    }
    
    // Check lessons 1 and 2 specifically
    const lesson1 = lessonData.find(l => l.order === 1);
    const lesson2 = lessonData.find(l => l.order === 2);
    
    console.log('\n🎯 LESSONS 1 & 2 VERIFICATION:');
    console.log('=============================');
    
    if (lesson1) {
      console.log(`Lesson 1: ${lesson1.slidesWithContent} slides with content (expected: 24)`);
      if (lesson1.slidesWithContent === 24) {
        console.log('✅ Lesson 1 is fully loaded from database');
      } else {
        console.log('❌ Lesson 1 is NOT fully loaded from database');
      }
    } else {
      console.log('❌ Lesson 1 not found in database');
    }
    
    if (lesson2) {
      console.log(`Lesson 2: ${lesson2.slidesWithContent} slides with content (expected: 25)`);
      if (lesson2.slidesWithContent === 25) {
        console.log('✅ Lesson 2 is fully loaded from database');
      } else {
        console.log('❌ Lesson 2 is NOT fully loaded from database');
      }
    } else {
      console.log('❌ Lesson 2 not found in database');
    }
    
  } catch (error) {
    console.error('❌ Error checking lessons:', error);
  }
}

// Run the check
checkAllLessonSlides(); 