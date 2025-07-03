/**
 * Reset User Progress Script
 * 
 * This script resets a specific user's progress to start fresh
 * with the new standardized system.
 */

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  updateDoc,
  getDoc
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
 * Reset user progress
 */
const resetUserProgress = async () => {
  try {
    console.log('🔄 Resetting user progress for maximdunkelx...');
    
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
    console.log('📊 Current user data:', {
      displayName: userData.displayName,
      currentLesson: userData.currentLesson,
      completedLessons: userData.completedLessons?.length || 0,
      progressKeys: Object.keys(userData.progress || {}).length
    });
    
    // Reset progress to clean state
    const resetData = {
      // Keep basic user info
      displayName: userData.displayName,
      email: userData.email,
      role: userData.role,
      currentLesson: 2, // Teacher unlocked up to lesson 2
      
      // Reset all progress tracking
      progress: {
        // Initialize lesson 1 with empty progress (not completed)
        "p0FLOCJjIEhJ731LAren": {
          completed: false,
          score: 0,
          completedAt: null,
          temporary: false,
          lastSlide: 0,
          pagesEngaged: [],
          lastActivity: new Date()
        },
        // Initialize lesson 2 with empty progress (not completed)
        "Kga6ih6MBgdMTU3phiWv": {
          completed: false,
          score: 0,
          completedAt: null,
          temporary: false,
          lastSlide: 0,
          pagesEngaged: [],
          lastActivity: new Date()
        }
      },
      completedLessons: [], // Empty array - no lessons completed
      totalTimeSpent: 0,
      totalPagesEngaged: 0,
      achievements: [],
      streak: 0,
      lastActivityDate: new Date(),
      updatedAt: new Date()
    };
    
    // Update user document
    await updateDoc(userRef, resetData);
    
    console.log('✅ User progress reset successfully!');
    console.log('📊 Reset data:', {
      currentLesson: resetData.currentLesson,
      completedLessons: resetData.completedLessons.length,
      progressKeys: Object.keys(resetData.progress).length,
      totalTimeSpent: resetData.totalTimeSpent,
      totalPagesEngaged: resetData.totalPagesEngaged
    });
    
  } catch (error) {
    console.error('❌ Error resetting user progress:', error);
  }
};

// Run the reset
resetUserProgress(); 