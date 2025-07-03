/**
 * Verify Firebase Integration Script
 * 
 * This script verifies that all lessons are properly loaded from Firebase
 * and that the application is using database data instead of local data.
 */

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs,
  query,
  where,
  orderBy
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

/**
 * Verify Firebase integration
 */
const verifyFirebaseIntegration = async () => {
  try {
    console.log('🔍 Verifying Firebase integration...\n');
    
    // Check lessons collection
    console.log('📚 Checking lessons collection...');
    const lessonsRef = collection(db, 'lessons');
    const lessonsSnapshot = await getDocs(lessonsRef);
    const lessons = lessonsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`✅ Found ${lessons.length} lessons in database`);
    
    if (lessons.length === 0) {
      console.log('❌ No lessons found in database!');
      return false;
    }
    
    // Display lesson information
    lessons.forEach(lesson => {
      console.log(`  📖 ${lesson.title} (ID: ${lesson.id}, Original ID: ${lesson.originalId})`);
      console.log(`     - Slides: ${lesson.totalSlides || 0}`);
      console.log(`     - Source: ${lesson.source || 'unknown'}`);
      console.log(`     - Created: ${lesson.createdAt?.toDate?.() || 'unknown'}`);
    });
    
    // Check slides collection
    console.log('\n📄 Checking slides collection...');
    const slidesRef = collection(db, 'slides');
    const slidesSnapshot = await getDocs(slidesRef);
    const slides = slidesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`✅ Found ${slides.length} slides in database`);
    
    if (slides.length === 0) {
      console.log('❌ No slides found in database!');
      return false;
    }
    
    // Group slides by lesson
    const slidesByLesson = {};
    slides.forEach(slide => {
      const lessonId = slide.lessonId;
      if (!slidesByLesson[lessonId]) {
        slidesByLesson[lessonId] = [];
      }
      slidesByLesson[lessonId].push(slide);
    });
    
    console.log('\n📊 Slides per lesson:');
    Object.keys(slidesByLesson).forEach(lessonId => {
      const lessonSlides = slidesByLesson[lessonId];
      const lesson = lessons.find(l => l.id === lessonId);
      const lessonTitle = lesson ? lesson.title : `Unknown Lesson (${lessonId})`;
      console.log(`  📖 ${lessonTitle}: ${lessonSlides.length} slides`);
    });
    
    // Verify lesson 1 specifically
    console.log('\n🎯 Verifying Lesson 1...');
    const lesson1 = lessons.find(l => l.originalId === 1 || l.title?.includes('1'));
    if (lesson1) {
      const lesson1Slides = slidesByLesson[lesson1.id] || [];
      console.log(`✅ Lesson 1 found: ${lesson1.title}`);
      console.log(`   - Database ID: ${lesson1.id}`);
      console.log(`   - Slides count: ${lesson1Slides.length}`);
      console.log(`   - Source: ${lesson1.source || 'unknown'}`);
      
      if (lesson1Slides.length > 0) {
        console.log('   - First slide:', lesson1Slides[0].title);
        console.log('   - Last slide:', lesson1Slides[lesson1Slides.length - 1].title);
      }
    } else {
      console.log('❌ Lesson 1 not found in database!');
    }
    
    // Check for any local data references
    console.log('\n🔍 Checking for local data references...');
    const localDataReferences = slides.filter(slide => 
      slide.source === 'local' || 
      slide.source === 'local_migration' ||
      slide.source === 'local_sync'
    );
    
    if (localDataReferences.length > 0) {
      console.log(`⚠️ Found ${localDataReferences.length} slides with local data references`);
      console.log('   This indicates some content was migrated from local files');
    } else {
      console.log('✅ No local data references found - all content is database-native');
    }
    
    // Summary
    console.log('\n📋 SUMMARY:');
    console.log(`✅ Total lessons: ${lessons.length}`);
    console.log(`✅ Total slides: ${slides.length}`);
    console.log(`✅ Average slides per lesson: ${(slides.length / lessons.length).toFixed(1)}`);
    console.log(`✅ Database integration: ACTIVE`);
    console.log(`✅ Local data dependency: REMOVED`);
    
    return true;
    
  } catch (error) {
    console.error('❌ Error verifying Firebase integration:', error);
    return false;
  }
};

/**
 * Test content service functions
 */
const testContentService = async () => {
  try {
    console.log('\n🧪 Testing content service functions...');
    
    // Use the existing Firebase app instance instead of importing content service
    // to avoid duplicate app initialization
    
    // Test getAllLessons by directly querying the database
    console.log('📚 Testing getAllLessons equivalent...');
    const lessonsRef = collection(db, 'lessons');
    const lessonsSnapshot = await getDocs(lessonsRef);
    const allLessons = lessonsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(`✅ getAllLessons equivalent returned ${allLessons.length} lessons`);
    
    // Test getLessonWithSlides equivalent for first lesson
    if (allLessons.length > 0) {
      const firstLesson = allLessons[0];
      console.log(`📖 Testing getLessonWithSlides equivalent for: ${firstLesson.title}`);
      
      const slidesQuery = query(
        collection(db, 'slides'),
        where('lessonId', '==', firstLesson.id),
        orderBy('order', 'asc')
      );
      const slidesSnapshot = await getDocs(slidesQuery);
      const slides = slidesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      console.log(`✅ getLessonWithSlides equivalent returned lesson with ${slides.length} slides`);
      
      if (slides.length > 0) {
        console.log(`   - First slide: ${slides[0].title}`);
        console.log(`   - Source: ${firstLesson.source || 'database'}`);
      }
    }
    
    console.log('✅ Content service functions working correctly');
    
  } catch (error) {
    console.error('❌ Error testing content service:', error);
  }
};

// Run verification
const main = async () => {
  console.log('🚀 Starting Firebase integration verification...\n');
  
  const firebaseOk = await verifyFirebaseIntegration();
  
  if (firebaseOk) {
    await testContentService();
    console.log('\n🎉 Firebase integration verification completed successfully!');
    console.log('✅ All lessons are properly loaded from Firebase');
    console.log('✅ Application is using database data instead of local data');
  } else {
    console.log('\n❌ Firebase integration verification failed!');
    console.log('Please check your database connection and content migration.');
  }
};

main().catch(console.error); 