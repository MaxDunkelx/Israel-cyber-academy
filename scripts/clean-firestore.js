import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, writeBatch, doc } from 'firebase/firestore';

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

async function cleanFirestore() {
  try {
    console.log('🧹 Starting Firestore cleanup...');
    
    const batch = writeBatch(db);
    let totalDeleted = 0;
    
    // Delete all slides first
    console.log('📄 Deleting all slides...');
    const slidesSnapshot = await getDocs(collection(db, 'slides'));
    slidesSnapshot.docs.forEach(slideDoc => {
      batch.delete(slideDoc.ref);
      totalDeleted++;
    });
    
    // Delete all lessons
    console.log('📚 Deleting all lessons...');
    const lessonsSnapshot = await getDocs(collection(db, 'lessons'));
    lessonsSnapshot.docs.forEach(lessonDoc => {
      batch.delete(lessonDoc.ref);
      totalDeleted++;
    });
    
    // Commit the batch
    await batch.commit();
    
    console.log(`✅ Cleanup completed! Deleted ${totalDeleted} documents total`);
    console.log(`   - ${slidesSnapshot.size} slides deleted`);
    console.log(`   - ${lessonsSnapshot.size} lessons deleted`);
    
  } catch (error) {
    console.error('❌ Cleanup failed:', error);
    throw error;
  }
}

cleanFirestore()
  .then(() => {
    console.log('🎉 Firestore is now clean and ready for fresh data!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Cleanup failed:', error);
    process.exit(1);
  }); 