import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

async function testSlideIds() {
  try {
    console.log('🔍 Testing slide lessonId values...');
    
    // Get all slides
    const slidesSnapshot = await getDocs(collection(db, 'slides'));
    
    console.log(`Found ${slidesSnapshot.size} slides total`);
    
    // Group slides by lessonId
    const slidesByLessonId = {};
    
    slidesSnapshot.docs.forEach(doc => {
      const data = doc.data();
      const lessonId = data.lessonId;
      
      if (!slidesByLessonId[lessonId]) {
        slidesByLessonId[lessonId] = [];
      }
      
      slidesByLessonId[lessonId].push({
        id: doc.id,
        title: data.title,
        type: data.type,
        order: data.order
      });
    });
    
    console.log('\n📊 Slides grouped by lessonId:');
    Object.keys(slidesByLessonId).forEach(lessonId => {
      console.log(`\nLessonId: "${lessonId}" (${slidesByLessonId[lessonId].length} slides)`);
      slidesByLessonId[lessonId].slice(0, 3).forEach(slide => {
        console.log(`  - ${slide.title} (${slide.type}, order: ${slide.order})`);
      });
      if (slidesByLessonId[lessonId].length > 3) {
        console.log(`  ... and ${slidesByLessonId[lessonId].length - 3} more`);
      }
    });
    
    // Get all lessons
    const lessonsSnapshot = await getDocs(collection(db, 'lessons'));
    
    console.log('\n📚 Lessons with their document IDs:');
    lessonsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      console.log(`- "${data.title}" (numeric ID: ${data.id}, Doc ID: ${doc.id})`);
    });
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testSlideIds(); 