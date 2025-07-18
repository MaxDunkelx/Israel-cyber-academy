const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, orderBy } = require('firebase/firestore');

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

async function checkSlideStructure() {
  try {
    console.log('🔍 Checking slide structure in database...');
    
    // Get all lessons
    const lessonsRef = collection(db, 'lessons');
    const lessonsSnapshot = await getDocs(lessonsRef);
    
    console.log(`📚 Found ${lessonsSnapshot.docs.length} lessons`);
    
    for (const lessonDoc of lessonsSnapshot.docs) {
      const lessonId = lessonDoc.id;
      const lessonData = lessonDoc.data();
      
      console.log(`\n📖 Lesson: ${lessonData.title || lessonId} (ID: ${lessonId})`);
      console.log(`   Original ID: ${lessonData.originalId}`);
      
      // Get slides for this lesson
      const slidesRef = collection(db, 'lessons', lessonId, 'slides');
      const slidesSnapshot = await getDocs(slidesRef);
      
      console.log(`   📄 Found ${slidesSnapshot.docs.length} slides`);
      
      if (slidesSnapshot.docs.length > 0) {
        console.log('   Slide IDs:');
        slidesSnapshot.docs.forEach((slideDoc, index) => {
          const slideData = slideDoc.data();
          console.log(`     ${index + 1}. Document ID: ${slideDoc.id}`);
          console.log(`        Original ID: ${slideData.originalId || 'N/A'}`);
          console.log(`        Order: ${slideData.order || 'N/A'}`);
          console.log(`        Title: ${slideData.title || 'N/A'}`);
          console.log(`        Type: ${slideData.type || 'N/A'}`);
        });
      }
    }
    
  } catch (error) {
    console.error('❌ Error checking slide structure:', error);
  }
}

// Run the script
checkSlideStructure().then(() => {
  console.log('\n✅ Slide structure check completed');
  process.exit(0);
}).catch((error) => {
  console.error('❌ Script failed:', error);
  process.exit(1);
}); 