/**
 * Fix Missing Slides Script
 * 
 * This script checks for lessons with missing slides and fixes them
 * by importing slides from the local data files.
 */

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs,
  doc,
  setDoc,
  query,
  where
} from 'firebase/firestore';

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

// Import local lesson data
import { lessons } from '../src/data/lessons.js';

/**
 * Check and fix missing slides
 */
const fixMissingSlides = async () => {
  try {
    console.log('🔍 Checking for lessons with missing slides...');
    
    // Get all lessons from Firestore
    const lessonsSnapshot = await getDocs(collection(db, 'lessons'));
    const firestoreLessons = [];
    
    lessonsSnapshot.forEach(doc => {
      firestoreLessons.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log(`📚 Found ${firestoreLessons.length} lessons in Firestore`);
    
    // Check each lesson for slides
    for (const firestoreLesson of firestoreLessons) {
      console.log(`\n🔍 Checking lesson: ${firestoreLesson.title} (${firestoreLesson.id})`);
      
      // Get slides for this lesson
      const slidesQuery = query(
        collection(db, 'slides'),
        where('lessonId', '==', firestoreLesson.id)
      );
      
      const slidesSnapshot = await getDocs(slidesQuery);
      const slideCount = slidesSnapshot.size;
      
      console.log(`📊 Found ${slideCount} slides for lesson ${firestoreLesson.title}`);
      
      // If no slides found, try to import from local data
      if (slideCount === 0) {
        console.log(`⚠️ No slides found for lesson ${firestoreLesson.title} - attempting to import from local data`);
        
        // Find matching lesson in local data
        const localLesson = lessons.find(lesson => 
          lesson.title === firestoreLesson.title || 
          lesson.order === firestoreLesson.order
        );
        
        if (localLesson && localLesson.slides) {
          console.log(`📥 Importing ${localLesson.slides.length} slides from local data`);
          
          // Import slides
          for (let i = 0; i < localLesson.slides.length; i++) {
            const slide = localLesson.slides[i];
            
            const slideData = {
              lessonId: firestoreLesson.id,
              order: i + 1,
              title: slide.title,
              content: slide.content,
              type: slide.type || 'content',
              createdAt: new Date(),
              updatedAt: new Date()
            };
            
            // Create slide document
            const slideRef = doc(collection(db, 'slides'));
            await setDoc(slideRef, slideData);
            
            console.log(`✅ Imported slide ${i + 1}: ${slide.title}`);
          }
          
          console.log(`🎉 Successfully imported ${localLesson.slides.length} slides for lesson ${firestoreLesson.title}`);
        } else {
          console.log(`❌ No matching local lesson found for ${firestoreLesson.title}`);
        }
      }
    }
    
    console.log('\n✅ Slide check completed!');
    
  } catch (error) {
    console.error('❌ Error fixing missing slides:', error);
  }
};

// Run the fix
fixMissingSlides(); 