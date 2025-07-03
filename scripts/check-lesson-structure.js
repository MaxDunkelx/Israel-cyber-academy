/**
 * Check Lesson Structure in Database
 * 
 * This script examines the actual lesson structure in Firebase to understand
 * how lessons are identified and which ones correspond to lessons 1 and 2.
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

async function checkLessonStructure() {
  console.log('🔍 Examining lesson structure in Firebase...\n');

  try {
    // Get all lessons
    const lessonsCollection = collection(db, 'lessons');
    const lessonsSnapshot = await getDocs(lessonsCollection);
    
    console.log(`📚 Found ${lessonsSnapshot.size} lessons in database\n`);
    
    const lessons = [];
    
    for (const lessonDoc of lessonsSnapshot.docs) {
      const lesson = lessonDoc.data();
      const lessonId = lessonDoc.id;
      
      lessons.push({
        id: lessonId,
        ...lesson
      });
      
      console.log(`📖 Lesson ID: ${lessonId}`);
      console.log(`   Title: ${lesson.title}`);
      console.log(`   Order: ${lesson.order || 'NOT SET'}`);
      console.log(`   Total Slides: ${lesson.totalSlides || 'NOT SET'}`);
      console.log(`   Original ID: ${lesson.originalId || 'NOT SET'}`);
      console.log(`   All fields:`, Object.keys(lesson));
      console.log('');
    }
    
    // Try to identify lessons 1 and 2 by title or other means
    console.log('🎯 TRYING TO IDENTIFY LESSONS 1 & 2:');
    console.log('====================================');
    
    const lesson1 = lessons.find(l => 
      l.title === 'מבוא לעולם הסייבר' || 
      l.originalId === 'lesson1' ||
      l.order === 1
    );
    
    const lesson2 = lessons.find(l => 
      l.title === 'מבנה המחשב' || 
      l.originalId === 'lesson2' ||
      l.order === 2
    );
    
    if (lesson1) {
      console.log(`✅ Found Lesson 1: ${lesson1.id} - "${lesson1.title}"`);
      console.log(`   Order: ${lesson1.order || 'NOT SET'}`);
      console.log(`   Total Slides: ${lesson1.totalSlides || 'NOT SET'}`);
      
      // Check slides for lesson 1
      const slidesCollection = collection(db, 'lessons', lesson1.id, 'slides');
      const slidesSnapshot = await getDocs(slidesCollection);
      console.log(`   Slides in database: ${slidesSnapshot.size}`);
      
      // Check slide content
      let slidesWithContent = 0;
      for (const slideDoc of slidesSnapshot.docs) {
        const slide = slideDoc.data();
        if (slide.content && Object.keys(slide.content).length > 0) {
          slidesWithContent++;
        }
      }
      console.log(`   Slides with content: ${slidesWithContent}`);
      
    } else {
      console.log('❌ Lesson 1 not found');
    }
    
    if (lesson2) {
      console.log(`✅ Found Lesson 2: ${lesson2.id} - "${lesson2.title}"`);
      console.log(`   Order: ${lesson2.order || 'NOT SET'}`);
      console.log(`   Total Slides: ${lesson2.totalSlides || 'NOT SET'}`);
      
      // Check slides for lesson 2
      const slidesCollection = collection(db, 'lessons', lesson2.id, 'slides');
      const slidesSnapshot = await getDocs(slidesCollection);
      console.log(`   Slides in database: ${slidesSnapshot.size}`);
      
      // Check slide content
      let slidesWithContent = 0;
      for (const slideDoc of slidesSnapshot.docs) {
        const slide = slideDoc.data();
        if (slide.content && Object.keys(slide.content).length > 0) {
          slidesWithContent++;
        }
      }
      console.log(`   Slides with content: ${slidesWithContent}`);
      
    } else {
      console.log('❌ Lesson 2 not found');
    }
    
    // Show all lesson titles for reference
    console.log('\n📋 ALL LESSON TITLES:');
    console.log('=====================');
    lessons.forEach((lesson, index) => {
      console.log(`${index + 1}. ${lesson.title} (ID: ${lesson.id})`);
    });
    
  } catch (error) {
    console.error('❌ Error checking lesson structure:', error);
  }
}

// Run the check
checkLessonStructure(); 