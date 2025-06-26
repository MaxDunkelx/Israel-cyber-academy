import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';

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

async function debugDuplicateLessons() {
  try {
    console.log('🔍 Debugging duplicate lessons...');
    
    // Get all lessons
    const lessonsQuery = query(collection(db, 'lessons'), orderBy('id', 'asc'));
    const lessonsSnapshot = await getDocs(lessonsQuery);
    
    console.log(`📚 Found ${lessonsSnapshot.size} lessons total`);
    
    // Check for duplicates by numeric ID
    const lessonsByNumericId = {};
    const lessonsByFirestoreId = {};
    
    lessonsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      const firestoreId = doc.id;
      const numericId = data.id;
      
      // Group by numeric ID
      if (!lessonsByNumericId[numericId]) {
        lessonsByNumericId[numericId] = [];
      }
      lessonsByNumericId[numericId].push({
        firestoreId,
        numericId,
        title: data.title
      });
      
      // Group by Firestore ID
      if (!lessonsByFirestoreId[firestoreId]) {
        lessonsByFirestoreId[firestoreId] = [];
      }
      lessonsByFirestoreId[firestoreId].push({
        firestoreId,
        numericId,
        title: data.title
      });
    });
    
    console.log('\n📊 Lessons grouped by numeric ID:');
    Object.keys(lessonsByNumericId).forEach(numericId => {
      const lessons = lessonsByNumericId[numericId];
      console.log(`Numeric ID ${numericId}: ${lessons.length} lesson(s)`);
      lessons.forEach(lesson => {
        console.log(`  - "${lesson.title}" (Firestore ID: ${lesson.firestoreId})`);
      });
    });
    
    console.log('\n📊 Lessons grouped by Firestore ID:');
    Object.keys(lessonsByFirestoreId).forEach(firestoreId => {
      const lessons = lessonsByFirestoreId[firestoreId];
      console.log(`Firestore ID ${firestoreId}: ${lessons.length} lesson(s)`);
      lessons.forEach(lesson => {
        console.log(`  - "${lesson.title}" (Numeric ID: ${lesson.numericId})`);
      });
    });
    
    // Check for actual duplicates
    const duplicates = Object.keys(lessonsByNumericId).filter(id => lessonsByNumericId[id].length > 1);
    
    if (duplicates.length > 0) {
      console.log('\n❌ DUPLICATE NUMERIC IDs FOUND:', duplicates);
    } else {
      console.log('\n✅ No duplicate numeric IDs found');
    }
    
    const duplicateFirestoreIds = Object.keys(lessonsByFirestoreId).filter(id => lessonsByFirestoreId[id].length > 1);
    
    if (duplicateFirestoreIds.length > 0) {
      console.log('\n❌ DUPLICATE FIRESTORE IDs FOUND:', duplicateFirestoreIds);
    } else {
      console.log('\n✅ No duplicate Firestore IDs found');
    }
    
  } catch (error) {
    console.error('❌ Debug failed:', error);
  }
}

debugDuplicateLessons(); 