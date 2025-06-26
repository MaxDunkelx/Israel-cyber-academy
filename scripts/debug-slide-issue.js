import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, orderBy } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvOkT3v1EQqMVIupBA-BmOoOqXjKJQJQw",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function debugSlideIssue() {
  try {
    console.log('🔍 Debugging slide issue...\n');
    
    // Get all lessons first
    console.log('📚 Getting all lessons...');
    const lessonsQuery = query(collection(db, 'lessons'), orderBy('id', 'asc'));
    const lessonsSnapshot = await getDocs(lessonsQuery);
    
    const lessons = lessonsSnapshot.docs.map(doc => ({
      firestoreId: doc.id,
      ...doc.data()
    }));
    
    console.log(`Found ${lessons.length} lessons:`);
    lessons.forEach(lesson => {
      console.log(`  - "${lesson.title}" (Firestore ID: ${lesson.firestoreId}, Numeric ID: ${lesson.id})`);
    });
    
    // Get all slides
    console.log('\n📄 Getting all slides...');
    const slidesQuery = query(collection(db, 'slides'), orderBy('order', 'asc'));
    const slidesSnapshot = await getDocs(slidesQuery);
    
    const slides = slidesSnapshot.docs.map(doc => ({
      firestoreId: doc.id,
      ...doc.data()
    }));
    
    console.log(`Found ${slides.length} slides:`);
    slides.forEach(slide => {
      console.log(`  - "${slide.title}" (Firestore ID: ${slide.firestoreId}, Lesson ID: ${slide.lessonId}, Type: ${typeof slide.lessonId})`);
    });
    
    // Check for each lesson, what slides it has
    console.log('\n🔗 Checking lesson-slide relationships...');
    for (const lesson of lessons) {
      console.log(`\n📁 Lesson: "${lesson.title}" (Firestore ID: ${lesson.firestoreId})`);
      
      // Try querying with Firestore ID
      try {
        const slidesForLessonQuery = query(
          collection(db, 'slides'),
          where('lessonId', '==', lesson.firestoreId)
        );
        const slidesForLessonSnapshot = await getDocs(slidesForLessonQuery);
        const slidesForLesson = slidesForLessonSnapshot.docs.map(doc => doc.data());
        console.log(`  ✅ Found ${slidesForLesson.length} slides with Firestore ID (${lesson.firestoreId}):`);
        slidesForLesson.forEach(slide => {
          console.log(`    - "${slide.title}" (Order: ${slide.order})`);
        });
      } catch (error) {
        console.log(`  ❌ Error querying with Firestore ID: ${error.message}`);
      }
      
      // Try querying with numeric ID
      try {
        const slidesForLessonQuery = query(
          collection(db, 'slides'),
          where('lessonId', '==', lesson.id)
        );
        const slidesForLessonSnapshot = await getDocs(slidesForLessonQuery);
        const slidesForLesson = slidesForLessonSnapshot.docs.map(doc => doc.data());
        console.log(`  ✅ Found ${slidesForLesson.length} slides with numeric ID (${lesson.id}):`);
        slidesForLesson.forEach(slide => {
          console.log(`    - "${slide.title}" (Order: ${slide.order})`);
        });
      } catch (error) {
        console.log(`  ❌ Error querying with numeric ID: ${error.message}`);
      }
      
      // Try querying with string numeric ID
      try {
        const slidesForLessonQuery = query(
          collection(db, 'slides'),
          where('lessonId', '==', lesson.id.toString())
        );
        const slidesForLessonSnapshot = await getDocs(slidesForLessonQuery);
        const slidesForLesson = slidesForLessonSnapshot.docs.map(doc => doc.data());
        console.log(`  ✅ Found ${slidesForLesson.length} slides with string numeric ID ("${lesson.id}"):`);
        slidesForLesson.forEach(slide => {
          console.log(`    - "${slide.title}" (Order: ${slide.order})`);
        });
      } catch (error) {
        console.log(`  ❌ Error querying with string numeric ID: ${error.message}`);
      }
    }
    
    // Check for orphaned slides
    console.log('\n👻 Checking for orphaned slides...');
    const orphanedSlides = slides.filter(slide => {
      const lessonExists = lessons.some(lesson => 
        lesson.firestoreId === slide.lessonId || 
        lesson.id === slide.lessonId || 
        lesson.id.toString() === slide.lessonId
      );
      return !lessonExists;
    });
    
    if (orphanedSlides.length > 0) {
      console.log(`Found ${orphanedSlides.length} orphaned slides:`);
      orphanedSlides.forEach(slide => {
        console.log(`  - "${slide.title}" (Lesson ID: ${slide.lessonId})`);
      });
    } else {
      console.log('✅ No orphaned slides found');
    }
    
  } catch (error) {
    console.error('❌ Debug failed:', error);
  }
}

debugSlideIssue(); 