import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  projectId: 'israel-cyber-academy',
  authDomain: 'israel-cyber-academy.firebaseapp.com',
  storageBucket: 'israel-cyber-academy.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abcdef123456'
};

console.log('🔍 Checking Slides Content in Firestore');
console.log('=====================================\n');

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkSlidesContent() {
  try {
    console.log('🔥 Initializing Firebase...');
    console.log('✅ Firebase initialized successfully\n');

    // Check lessons
    console.log('📚 Checking Lessons...');
    const lessonsSnapshot = await getDocs(collection(db, 'lessons'));
    console.log(`✅ Found ${lessonsSnapshot.size} lessons\n`);

    // Check slides
    console.log('📋 Checking Slides...');
    const slidesSnapshot = await getDocs(collection(db, 'slides'));
    console.log(`✅ Found ${slidesSnapshot.size} slides\n`);

    // Sample lesson content
    console.log('🔍 Sample Lesson Content:');
    const firstLesson = lessonsSnapshot.docs[0];
    if (firstLesson) {
      const lessonData = firstLesson.data();
      console.log(`📖 Lesson: ${lessonData.title}`);
      console.log(`📊 Content field: ${JSON.stringify(lessonData.content, null, 2)}`);
      console.log(`📊 Total slides: ${lessonData.totalSlides}`);
    }

    // Sample slide content
    console.log('\n🔍 Sample Slide Content:');
    const firstSlide = slidesSnapshot.docs[0];
    if (firstSlide) {
      const slideData = firstSlide.data();
      console.log(`📖 Slide: ${slideData.title}`);
      console.log(`📊 Type: ${slideData.type}`);
      console.log(`📊 Lesson ID: ${slideData.lessonId}`);
      console.log(`📊 Content: ${JSON.stringify(slideData.content, null, 2)}`);
    }

    // Check lesson-slide linking
    console.log('\n🔗 Checking Lesson-Slide Linking...');
    const lessonIds = lessonsSnapshot.docs.map(doc => doc.id);
    const slideLessonIds = slidesSnapshot.docs.map(doc => doc.data().lessonId).filter(id => id);
    
    console.log(`📚 Lesson IDs: ${lessonIds.join(', ')}`);
    console.log(`📋 Slide Lesson IDs: ${slideLessonIds.join(', ')}`);
    
    const linkedSlides = slideLessonIds.filter(slideLessonId => 
      lessonIds.includes(slideLessonId)
    );
    
    console.log(`✅ ${linkedSlides.length} slides are properly linked to lessons`);
    console.log(`❌ ${slideLessonIds.length - linkedSlides.length} slides are not linked`);

  } catch (error) {
    console.error('❌ Error checking slides content:', error);
  }
}

checkSlidesContent(); 