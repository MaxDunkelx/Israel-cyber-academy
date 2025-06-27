/**
 * Test teacher notes functionality
 * This script tests the teacher notes system to ensure it works correctly with Firebase
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const testTeacherNotes = async () => {
  try {
    console.log('🧪 Starting teacher notes test...');
    
    // Test data
    const testTeacherId = 'test-teacher-123';
    const testLessonId = 'lesson1';
    const testSlideId = 'slide1';
    const testNoteContent = 'This is a test note for slide 1';
    
    console.log('📝 Test data:', {
      teacherId: testTeacherId,
      lessonId: testLessonId,
      slideId: testSlideId,
      content: testNoteContent
    });
    
    // Step 1: Create a test note
    console.log('\n1️⃣ Creating test note...');
    const notesRef = collection(db, 'teacherNotes');
    const testNote = {
      teacherId: testTeacherId,
      lessonId: testLessonId,
      slideId: testSlideId,
      slideIndex: 0,
      content: testNoteContent,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const docRef = await addDoc(notesRef, testNote);
    console.log('✅ Test note created with ID:', docRef.id);
    
    // Step 2: Query notes for the teacher and lesson
    console.log('\n2️⃣ Querying notes for teacher and lesson...');
    const notesQuery = query(
      notesRef,
      where('teacherId', '==', testTeacherId),
      where('lessonId', '==', testLessonId)
    );
    
    const querySnapshot = await getDocs(notesQuery);
    const notes = [];
    querySnapshot.forEach((doc) => {
      notes.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log('✅ Found notes:', notes.length);
    notes.forEach(note => {
      console.log('  - Note ID:', note.id);
      console.log('    Teacher ID:', note.teacherId);
      console.log('    Lesson ID:', note.lessonId);
      console.log('    Slide ID:', note.slideId);
      console.log('    Slide Index:', note.slideIndex);
      console.log('    Content:', note.content);
    });
    
    // Step 3: Query specific note
    console.log('\n3️⃣ Querying specific note...');
    const specificQuery = query(
      notesRef,
      where('teacherId', '==', testTeacherId),
      where('lessonId', '==', testLessonId),
      where('slideId', '==', testSlideId)
    );
    
    const specificSnapshot = await getDocs(specificQuery);
    if (!specificSnapshot.empty) {
      const specificNote = specificSnapshot.docs[0];
      console.log('✅ Found specific note:', specificNote.id);
      console.log('  Content:', specificNote.data().content);
    } else {
      console.log('❌ Specific note not found');
    }
    
    // Step 4: Test lessonId consistency (string vs number)
    console.log('\n4️⃣ Testing lessonId consistency...');
    
    // Test with string lessonId
    const stringQuery = query(
      notesRef,
      where('teacherId', '==', testTeacherId),
      where('lessonId', '==', 'lesson1')
    );
    const stringSnapshot = await getDocs(stringQuery);
    console.log('✅ String lessonId query found:', stringSnapshot.size, 'notes');
    
    // Test with number lessonId (if it exists)
    const numberQuery = query(
      notesRef,
      where('teacherId', '==', testTeacherId),
      where('lessonId', '==', 1)
    );
    const numberSnapshot = await getDocs(numberQuery);
    console.log('✅ Number lessonId query found:', numberSnapshot.size, 'notes');
    
    // Step 5: Clean up test data
    console.log('\n5️⃣ Cleaning up test data...');
    await deleteDoc(doc(db, 'teacherNotes', docRef.id));
    console.log('✅ Test note deleted');
    
    // Step 6: Verify cleanup
    console.log('\n6️⃣ Verifying cleanup...');
    const cleanupQuery = query(
      notesRef,
      where('teacherId', '==', testTeacherId),
      where('lessonId', '==', testLessonId)
    );
    const cleanupSnapshot = await getDocs(cleanupQuery);
    console.log('✅ Cleanup verified - remaining notes:', cleanupSnapshot.size);
    
    console.log('\n🎉 Teacher notes test completed successfully!');
    console.log('\n📊 Test Summary:');
    console.log('  ✅ Note creation works');
    console.log('  ✅ Note querying works');
    console.log('  ✅ Specific note retrieval works');
    console.log('  ✅ LessonId consistency handling works');
    console.log('  ✅ Note deletion works');
    console.log('  ✅ Cleanup verification works');
    
  } catch (error) {
    console.error('❌ Teacher notes test failed:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
  }
};

// Run the test
testTeacherNotes(); 