/**
 * Test Progress System Script
 * 
 * This script tests the progress tracking system to ensure
 * it works correctly with Firestore IDs.
 */

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  getDoc,
  updateDoc
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
 * Test progress system
 */
const testProgressSystem = async () => {
  try {
    console.log('🧪 Testing progress system...');
    
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
      progressKeys: Object.keys(userData.progress || {}),
      totalTimeSpent: userData.totalTimeSpent || 0,
      totalPagesEngaged: userData.totalPagesEngaged || 0
    });
    
    // Test 1: Check if progress structure is correct
    console.log('\n🔍 Test 1: Progress Structure');
    if (userData.progress) {
      Object.entries(userData.progress).forEach(([lessonId, progress]) => {
        console.log(`  Lesson ${lessonId}:`, {
          completed: progress.completed,
          score: progress.score,
          lastSlide: progress.lastSlide,
          pagesEngaged: progress.pagesEngaged?.length || 0
        });
      });
    }
    
    // Test 2: Check if completedLessons is an array
    console.log('\n🔍 Test 2: Completed Lessons');
    console.log(`  Type: ${Array.isArray(userData.completedLessons) ? 'Array' : typeof userData.completedLessons}`);
    console.log(`  Length: ${userData.completedLessons?.length || 0}`);
    console.log(`  Content:`, userData.completedLessons || []);
    
    // Test 3: Simulate lesson completion for lesson 1
    console.log('\n🔍 Test 3: Simulating Lesson 1 Completion');
    
    const testProgress = {
      ...userData.progress,
      "p0FLOCJjIEhJ731LAren": {
        completed: true,
        score: 95,
        completedAt: new Date(),
        temporary: false,
        lastSlide: 20,
        pagesEngaged: ['slide1', 'slide2', 'slide3', 'slide4', 'slide5'],
        lastActivity: new Date()
      }
    };
    
    const testCompletedLessons = [...(userData.completedLessons || []), "p0FLOCJjIEhJ731LAren"];
    
    // Update user with test data
    await updateDoc(userRef, {
      progress: testProgress,
      completedLessons: testCompletedLessons,
      totalTimeSpent: (userData.totalTimeSpent || 0) + 1800, // Add 30 minutes
      totalPagesEngaged: (userData.totalPagesEngaged || 0) + 5,
      lastActivityDate: new Date()
    });
    
    console.log('✅ Test data updated successfully');
    
    // Verify the update
    const updatedDoc = await getDoc(userRef);
    const updatedData = updatedDoc.data();
    
    console.log('\n📊 Updated user data:', {
      completedLessons: updatedData.completedLessons?.length || 0,
      lesson1Completed: updatedData.progress?.["p0FLOCJjIEhJ731LAren"]?.completed,
      totalTimeSpent: updatedData.totalTimeSpent,
      totalPagesEngaged: updatedData.totalPagesEngaged
    });
    
    console.log('\n✅ Progress system test completed successfully!');
    
  } catch (error) {
    console.error('❌ Error testing progress system:', error);
  }
};

// Run the test
testProgressSystem(); 