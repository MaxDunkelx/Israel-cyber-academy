/**
 * Reset Progress for maximdunkelx - Lesson 1
 * 
 * This script resets the progress for the user "maximdunkelx" specifically for lesson 1,
 * allowing them to start fresh and test the lesson completion flow.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC35sH38k9co_R0zBsbDT0S6RE1Cp-ksHE",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "750693821908",
  appId: "1:750693821908:web:6518d1facad1d8095cfa41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// User credentials
const USER_EMAIL = 'maximdunkelx@gmail.com';
const USER_PASSWORD = 'M1a2x3d4'; // Correct password

// Lesson 1 Firestore ID
const LESSON_1_ID = 'p0FLOCJjIEhJ731LAren';

async function resetUserProgress() {
  try {
    console.log('🚀 Starting progress reset for maximdunkelx...');
    
    // Sign in as the user
    console.log('🔐 Signing in as maximdunkelx...');
    const userCredential = await signInWithEmailAndPassword(auth, USER_EMAIL, USER_PASSWORD);
    const user = userCredential.user;
    console.log('✅ Signed in successfully:', user.email);
    
    // Get current user data
    console.log('📋 Fetching current user data...');
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      console.error('❌ User document does not exist');
      return;
    }
    
    const userData = userDoc.data();
    console.log('📊 Current user data:', {
      displayName: userData.displayName,
      currentLesson: userData.currentLesson,
      completedLessons: userData.completedLessons?.length || 0,
      totalTimeSpent: userData.totalTimeSpent || 0,
      totalPagesEngaged: userData.totalPagesEngaged || 0
    });
    
    // Show current lesson 1 progress
    const progress = userData.progress || {};
    const lesson1Progress = progress[LESSON_1_ID];
    console.log('📚 Current Lesson 1 Progress:', lesson1Progress || 'No progress found');
    
    // Reset lesson 1 progress
    console.log('🔄 Resetting lesson 1 progress...');
    const updatedProgress = {
      ...progress,
      [LESSON_1_ID]: {
        completed: false,
        score: 0,
        completedAt: null,
        temporary: false,
        lastSlide: 0,
        pagesEngaged: [],
        lastActivity: new Date()
      }
    };
    
    // Remove lesson 1 from completed lessons if it exists
    const completedLessons = userData.completedLessons || [];
    const updatedCompletedLessons = completedLessons.filter(lessonId => lessonId !== LESSON_1_ID);
    
    // Update user document
    console.log('💾 Updating user document...');
    await updateDoc(userRef, {
      progress: updatedProgress,
      completedLessons: updatedCompletedLessons,
      lastActivityDate: new Date()
    });
    
    console.log('✅ Progress reset completed successfully!');
    console.log('📊 Updated user state:', {
      lesson1Completed: false,
      lesson1LastSlide: 0,
      lesson1PagesEngaged: 0,
      totalCompletedLessons: updatedCompletedLessons.length,
      completedLessonsArray: updatedCompletedLessons
    });
    
    // Verify the update
    console.log('🔍 Verifying update...');
    const updatedDoc = await getDoc(userRef);
    const updatedData = updatedDoc.data();
    const updatedLesson1Progress = updatedData.progress[LESSON_1_ID];
    
    console.log('✅ Verification complete:', {
      lesson1Completed: updatedLesson1Progress.completed,
      lesson1LastSlide: updatedLesson1Progress.lastSlide,
      lesson1PagesEngaged: updatedLesson1Progress.pagesEngaged.length,
      totalCompletedLessons: updatedData.completedLessons.length
    });
    
    console.log('🎉 maximdunkelx can now start lesson 1 fresh!');
    
  } catch (error) {
    console.error('❌ Error resetting progress:', error);
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
  }
}

// Run the reset
resetUserProgress()
  .then(() => {
    console.log('✅ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }); 