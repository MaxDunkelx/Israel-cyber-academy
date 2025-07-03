/**
 * Debug Lesson Completion Script
 * 
 * This script monitors the lesson completion process to identify
 * why progress isn't being saved properly.
 */

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  getDoc,
  onSnapshot
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxGUOlJqXqXqXqXqXqXqXqXqXqXqXqXqXq",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Monitor user profile changes in real-time
 */
const monitorUserProfile = async () => {
  try {
    console.log('🔍 Starting user profile monitoring...');
    
    // User UID for maximdunkelx
    const userId = 'nabbV9GZUJehS8utlx1ixDkVOvK2';
    
    // Set up real-time listener
    const userRef = doc(db, 'users', userId);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        console.log('🔄 USER PROFILE UPDATED:', {
          timestamp: new Date().toISOString(),
          displayName: userData.displayName,
          currentLesson: userData.currentLesson,
          completedLessons: userData.completedLessons?.length || 0,
          completedLessonsArray: userData.completedLessons || [],
          progressKeys: Object.keys(userData.progress || {}),
          progressStructure: userData.progress ? 'object' : typeof userData.progress,
          totalTimeSpent: userData.totalTimeSpent || 0,
          totalPagesEngaged: userData.totalPagesEngaged || 0,
          achievements: userData.achievements?.length || 0
        });
        
        // Check specific lesson progress
        if (userData.progress) {
          console.log('📊 LESSON PROGRESS DETAILS:');
          Object.entries(userData.progress).forEach(([lessonId, progress]) => {
            console.log(`  ${lessonId}:`, {
              completed: progress.completed,
              score: progress.score,
              lastSlide: progress.lastSlide,
              pagesEngaged: progress.pagesEngaged?.length || 0,
              completedAt: progress.completedAt
            });
          });
        }
      } else {
        console.log('❌ User document not found');
      }
    }, (error) => {
      console.error('❌ Error monitoring user profile:', error);
    });
    
    console.log('✅ User profile monitoring active. Complete a lesson to see real-time updates.');
    console.log('📝 Instructions:');
    console.log('1. Go to the web app');
    console.log('2. Complete lesson 1 or 2');
    console.log('3. Watch this console for real-time updates');
    
    // Keep the script running
    return unsubscribe;
    
  } catch (error) {
    console.error('❌ Error setting up monitoring:', error);
  }
};

/**
 * Check current user state
 */
const checkCurrentState = async () => {
  try {
    console.log('🔍 Checking current user state...');
    
    // User UID for maximdunkelx
    const userId = 'nabbV9GZUJehS8utlx1ixDkVOvK2';
    
    // Get current user data
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      console.log('❌ User not found');
      return;
    }
    
    const userData = userDoc.data();
    console.log('📊 CURRENT USER STATE:', {
      displayName: userData.displayName,
      currentLesson: userData.currentLesson,
      completedLessons: userData.completedLessons?.length || 0,
      completedLessonsArray: userData.completedLessons || [],
      progressKeys: Object.keys(userData.progress || {}),
      progressStructure: userData.progress ? 'object' : typeof userData.progress,
      totalTimeSpent: userData.totalTimeSpent || 0,
      totalPagesEngaged: userData.totalPagesEngaged || 0,
      achievements: userData.achievements?.length || 0
    });
    
    // Check specific lesson progress
    if (userData.progress) {
      console.log('📊 LESSON PROGRESS DETAILS:');
      Object.entries(userData.progress).forEach(([lessonId, progress]) => {
        console.log(`  ${lessonId}:`, {
          completed: progress.completed,
          score: progress.score,
          lastSlide: progress.lastSlide,
          pagesEngaged: progress.pagesEngaged?.length || 0,
          completedAt: progress.completedAt
        });
      });
    }
    
  } catch (error) {
    console.error('❌ Error checking current state:', error);
  }
};

// Run the debug
console.log('🚀 Starting lesson completion debug...');
checkCurrentState().then(() => {
  console.log('\n📡 Setting up real-time monitoring...');
  return monitorUserProfile();
}).then((unsubscribe) => {
  console.log('\n✅ Debug setup complete. Monitoring user profile changes...');
  console.log('💡 Complete a lesson in the web app to see real-time updates.');
  
  // Keep the process alive
  process.stdin.resume();
  console.log('Press Ctrl+C to stop monitoring');
}).catch((error) => {
  console.error('❌ Debug setup failed:', error);
}); 