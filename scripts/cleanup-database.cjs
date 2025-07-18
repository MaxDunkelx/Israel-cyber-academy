const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, deleteDoc, writeBatch } = require('firebase/firestore');

// Firebase config (development)
const firebaseConfig = {
  projectId: 'israel-cyber-academy',
  authDomain: 'israel-cyber-academy.firebaseapp.com',
  storageBucket: 'israel-cyber-academy.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abcdef'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function cleanupDatabase() {
  console.log('🧹 CLEANING UP DATABASE...\n');
  
  try {
    // 1. Get all lessons
    const lessonsRef = collection(db, 'lessons');
    const snapshot = await getDocs(lessonsRef);
    const lessons = [];
    
    snapshot.forEach(doc => {
      lessons.push({
        id: doc.id,
        ref: doc.ref,
        data: doc.data()
      });
    });
    
    console.log(`📊 Found ${lessons.length} total lessons in database`);
    
    // 2. Identify old format lessons
    const oldFormatLessons = lessons.filter(lesson => 
      lesson.id.match(/^lesson\d{1,2}$/) // lesson1, lesson2, lesson3, etc.
    );
    
    const newFormatLessons = lessons.filter(lesson => 
      lesson.id.match(/^lesson\d{3}$/) // lesson001, lesson002, etc.
    );
    
    console.log(`📋 Old format lessons (to delete): ${oldFormatLessons.length}`);
    oldFormatLessons.forEach(lesson => {
      console.log(`   - ${lesson.id} - "${lesson.data.title}"`);
    });
    
    console.log(`📋 New format lessons (to keep): ${newFormatLessons.length}`);
    newFormatLessons.forEach(lesson => {
      console.log(`   - ${lesson.id} - "${lesson.data.title}"`);
    });
    
    if (oldFormatLessons.length === 0) {
      console.log('✅ No old format lessons found - database is already clean!');
      return;
    }
    
    // 3. Delete old format lessons
    console.log('\n🗑️ Deleting old format lessons...');
    const batch = writeBatch(db);
    
    oldFormatLessons.forEach(lesson => {
      console.log(`   Deleting: ${lesson.id}`);
      batch.delete(lesson.ref);
    });
    
    await batch.commit();
    console.log('✅ Successfully deleted old format lessons!');
    
    // 4. Verify cleanup
    console.log('\n🔍 Verifying cleanup...');
    const verifySnapshot = await getDocs(lessonsRef);
    const remainingLessons = [];
    
    verifySnapshot.forEach(doc => {
      remainingLessons.push({
        id: doc.id,
        title: doc.data().title
      });
    });
    
    console.log(`📊 Remaining lessons: ${remainingLessons.length}`);
    remainingLessons.forEach(lesson => {
      console.log(`   - ${lesson.id} - "${lesson.title}"`);
    });
    
    // 5. Check for any remaining old format
    const remainingOldFormat = remainingLessons.filter(lesson => 
      lesson.id.match(/^lesson\d{1,2}$/)
    );
    
    if (remainingOldFormat.length === 0) {
      console.log('✅ Cleanup successful! No old format lessons remain.');
    } else {
      console.log(`⚠️ Warning: ${remainingOldFormat.length} old format lessons still exist`);
    }
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    throw error;
  }
}

// Run the cleanup
cleanupDatabase().catch(console.error); 