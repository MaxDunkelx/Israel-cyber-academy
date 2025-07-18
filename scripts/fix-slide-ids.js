const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, updateDoc, query, orderBy } = require('firebase/firestore');
const serviceAccount = require('../service-account-key.json');

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBvOkJqXqXqXqXqXqXqXqXqXqXqXqXqXqXq",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkAndFixSlideIds() {
  try {
    console.log('🔍 Checking slide IDs in database...');
    
    // Get all lessons
    const lessonsRef = collection(db, 'lessons');
    const lessonsSnapshot = await getDocs(lessonsRef);
    
    let totalSlidesChecked = 0;
    let totalSlidesFixed = 0;
    
    for (const lessonDoc of lessonsSnapshot.docs) {
      const lessonId = lessonDoc.id;
      const lessonData = lessonDoc.data();
      
      console.log(`\n📚 Checking lesson: ${lessonData.title || lessonId}`);
      
      // Get slides for this lesson
      const slidesRef = collection(db, 'lessons', lessonId, 'slides');
      const slidesSnapshot = await getDocs(slidesRef);
      
      console.log(`   Found ${slidesSnapshot.docs.length} slides`);
      
      for (const slideDoc of slidesSnapshot.docs) {
        const slideId = slideDoc.id;
        const slideData = slideDoc.data();
        
        totalSlidesChecked++;
        
        // Check if slide ID needs fixing
        const originalId = slideData.originalId;
        const expectedId = slideData.order ? `slide${String(slideData.order).padStart(3, '0')}` : null;
        
        if (expectedId && slideId !== expectedId) {
          console.log(`   ❌ Slide ID mismatch: ${slideId} should be ${expectedId}`);
          
          // Update the slide ID
          try {
            const slideRef = doc(db, 'lessons', lessonId, 'slides', slideId);
            await updateDoc(slideRef, {
              originalId: expectedId,
              updatedAt: new Date()
            });
            
            console.log(`   ✅ Fixed slide ID to: ${expectedId}`);
            totalSlidesFixed++;
          } catch (updateError) {
            console.error(`   ❌ Failed to fix slide ID: ${updateError.message}`);
          }
        } else {
          console.log(`   ✅ Slide ID correct: ${slideId}`);
        }
      }
    }
    
    console.log(`\n📊 Summary:`);
    console.log(`   Total slides checked: ${totalSlidesChecked}`);
    console.log(`   Total slides fixed: ${totalSlidesFixed}`);
    
  } catch (error) {
    console.error('❌ Error checking slide IDs:', error);
  }
}

// Run the script
checkAndFixSlideIds().then(() => {
  console.log('✅ Slide ID check completed');
  process.exit(0);
}).catch((error) => {
  console.error('❌ Script failed:', error);
  process.exit(1);
}); 