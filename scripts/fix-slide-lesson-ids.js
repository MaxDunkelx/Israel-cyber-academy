import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, orderBy, updateDoc, doc } from 'firebase/firestore';

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

async function fixSlideLessonIds() {
  try {
    console.log('🔧 Fixing slide lessonId mismatches...\n');
    
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
    
    console.log(`Found ${slides.length} slides`);
    
    // Find slides with wrong lessonId (numeric instead of Firestore ID)
    const slidesToFix = slides.filter(slide => {
      // Check if the lessonId is numeric (wrong) instead of a Firestore ID
      const isNumeric = !isNaN(slide.lessonId) && typeof slide.lessonId === 'number';
      return isNumeric;
    });
    
    console.log(`\n🔧 Found ${slidesToFix.length} slides with wrong lessonId (numeric):`);
    slidesToFix.forEach(slide => {
      console.log(`  - "${slide.title}" (Current lessonId: ${slide.lessonId}, Type: ${typeof slide.lessonId})`);
    });
    
    if (slidesToFix.length === 0) {
      console.log('✅ No slides need fixing!');
      return;
    }
    
    // Fix each slide
    console.log('\n🔧 Fixing slides...');
    let fixedCount = 0;
    
    for (const slide of slidesToFix) {
      try {
        // Find the lesson with matching numeric ID
        const lesson = lessons.find(l => l.id === slide.lessonId);
        
        if (lesson) {
          // Update the slide with the correct Firestore document ID
          const slideRef = doc(db, 'slides', slide.firestoreId);
          await updateDoc(slideRef, {
            lessonId: lesson.firestoreId
          });
          
          console.log(`✅ Fixed slide "${slide.title}": ${slide.lessonId} → ${lesson.firestoreId}`);
          fixedCount++;
        } else {
          console.log(`❌ Could not find lesson with numeric ID ${slide.lessonId} for slide "${slide.title}"`);
        }
      } catch (error) {
        console.error(`❌ Error fixing slide "${slide.title}":`, error.message);
      }
    }
    
    console.log(`\n🎉 Fixed ${fixedCount} out of ${slidesToFix.length} slides!`);
    
    // Verify the fix
    console.log('\n🔍 Verifying the fix...');
    const verifyQuery = query(collection(db, 'slides'), orderBy('order', 'asc'));
    const verifySnapshot = await getDocs(verifyQuery);
    
    const verifySlides = verifySnapshot.docs.map(doc => ({
      firestoreId: doc.id,
      ...doc.data()
    }));
    
    const stillWrong = verifySlides.filter(slide => {
      const isNumeric = !isNaN(slide.lessonId) && typeof slide.lessonId === 'number';
      return isNumeric;
    });
    
    if (stillWrong.length === 0) {
      console.log('✅ All slides now have correct Firestore document IDs!');
    } else {
      console.log(`❌ ${stillWrong.length} slides still have wrong lessonId:`);
      stillWrong.forEach(slide => {
        console.log(`  - "${slide.title}" (lessonId: ${slide.lessonId})`);
      });
    }
    
  } catch (error) {
    console.error('❌ Fix failed:', error);
  }
}

fixSlideLessonIds(); 