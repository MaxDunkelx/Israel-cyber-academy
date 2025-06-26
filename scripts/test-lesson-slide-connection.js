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

async function testLessonSlideConnection() {
  try {
    console.log('🧪 Testing lesson-slide connection...\n');
    
    // Get all lessons
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
    
    // Test the first lesson specifically
    const firstLesson = lessons[0];
    console.log(`\n🔍 Testing first lesson: "${firstLesson.title}"`);
    console.log(`  Firestore ID: ${firstLesson.firestoreId}`);
    console.log(`  Numeric ID: ${firstLesson.id}`);
    
    // Get slides for this lesson using Firestore ID
    console.log(`\n📄 Getting slides for lesson with Firestore ID: ${firstLesson.firestoreId}`);
    const slidesQuery = query(
      collection(db, 'slides'),
      where('lessonId', '==', firstLesson.firestoreId),
      orderBy('order', 'asc')
    );
    
    const slidesSnapshot = await getDocs(slidesQuery);
    const slides = slidesSnapshot.docs.map(doc => ({
      firestoreId: doc.id,
      ...doc.data()
    }));
    
    console.log(`Found ${slides.length} slides with Firestore ID ${firstLesson.firestoreId}:`);
    slides.forEach(slide => {
      console.log(`  - "${slide.title}" (Order: ${slide.order}, lessonId: ${slide.lessonId})`);
    });
    
    // Also check for slides with numeric ID
    console.log(`\n📄 Getting slides for lesson with numeric ID: ${firstLesson.id}`);
    const slidesQueryNumeric = query(
      collection(db, 'slides'),
      where('lessonId', '==', firstLesson.id),
      orderBy('order', 'asc')
    );
    
    const slidesSnapshotNumeric = await getDocs(slidesQueryNumeric);
    const slidesNumeric = slidesSnapshotNumeric.docs.map(doc => ({
      firestoreId: doc.id,
      ...doc.data()
    }));
    
    console.log(`Found ${slidesNumeric.length} slides with numeric ID ${firstLesson.id}:`);
    slidesNumeric.forEach(slide => {
      console.log(`  - "${slide.title}" (Order: ${slide.order}, lessonId: ${slide.lessonId})`);
    });
    
    // Get all slides to see the distribution
    console.log(`\n📄 Getting all slides to see lessonId distribution...`);
    const allSlidesQuery = query(collection(db, 'slides'), orderBy('order', 'asc'));
    const allSlidesSnapshot = await getDocs(allSlidesQuery);
    
    const allSlides = allSlidesSnapshot.docs.map(doc => ({
      firestoreId: doc.id,
      ...doc.data()
    }));
    
    // Group slides by lessonId
    const slidesByLessonId = {};
    allSlides.forEach(slide => {
      const lessonId = slide.lessonId;
      if (!slidesByLessonId[lessonId]) {
        slidesByLessonId[lessonId] = [];
      }
      slidesByLessonId[lessonId].push(slide);
    });
    
    console.log('Slides grouped by lessonId:');
    Object.keys(slidesByLessonId).forEach(lessonId => {
      console.log(`  lessonId "${lessonId}": ${slidesByLessonId[lessonId].length} slides`);
      slidesByLessonId[lessonId].forEach(slide => {
        console.log(`    - "${slide.title}" (Order: ${slide.order})`);
      });
    });
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testLessonSlideConnection(); 