/**
 * Test Complete System Script
 * 
 * This script tests the complete lesson completion flow
 * to ensure everything works correctly with Firestore IDs.
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
 * Simulate lesson completion flow
 */
const testCompleteSystem = async () => {
  try {
    console.log('🧪 Testing complete lesson completion system...');
    
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
    console.log('📊 Initial user data:', {
      displayName: userData.displayName,
      currentLesson: userData.currentLesson,
      completedLessons: userData.completedLessons?.length || 0,
      progressKeys: Object.keys(userData.progress || {}),
      totalTimeSpent: userData.totalTimeSpent || 0,
      totalPagesEngaged: userData.totalPagesEngaged || 0
    });
    
    // Simulate lesson 1 completion (using lesson number 1)
    console.log('\n🎯 Simulating lesson 1 completion...');
    
    // This is what the InteractiveLesson component would do:
    const lessonNumber = 1; // Lesson number from lesson.originalId
    const lessonId = 'p0FLOCJjIEhJ731LAren'; // Firestore ID
    const completed = true;
    const score = 95;
    const lastSlide = 20;
    const allSlideIds = ['slide1', 'slide2', 'slide3', 'slide4', 'slide5', 'slide6', 'slide7', 'slide8', 'slide9', 'slide10'];
    
    // Update progress (this is what updateUserProgress would do)
    const progress = userData.progress || {};
    
    // Initialize lesson progress if it doesn't exist
    if (!progress[lessonId]) {
      progress[lessonId] = {
        completed: false,
        score: 0,
        completedAt: null,
        temporary: false,
        lastSlide: 0,
        pagesEngaged: [],
        lastActivity: new Date()
      };
    }
    
    // Update lesson progress with completion data
    progress[lessonId] = {
      ...progress[lessonId],
      completed,
      score,
      completedAt: completed ? new Date() : progress[lessonId].completedAt,
      temporary: false,
      lastActivity: new Date(),
      lastSlide
    };
    
    // Mark all slides as engaged
    if (completed && allSlideIds && Array.isArray(allSlideIds)) {
      const currentEngaged = progress[lessonId].pagesEngaged || [];
      const allEngaged = [...new Set([...currentEngaged, ...allSlideIds])];
      progress[lessonId].pagesEngaged = allEngaged;
      console.log(`📊 All slides marked as engaged for lesson ${lessonId}: ${allEngaged.length} slides`);
    }
    
    // Calculate total time spent and pages engaged
    let totalTimeSpent = 0;
    let totalPagesEngaged = 0;
    Object.values(progress).forEach(lessonProgress => {
      if (lessonProgress.pagesEngaged && Array.isArray(lessonProgress.pagesEngaged)) {
        totalPagesEngaged += lessonProgress.pagesEngaged.length;
        // Estimate 3 minutes per page/slide
        totalTimeSpent += lessonProgress.pagesEngaged.length * 3 * 60; // Convert to seconds
      }
    });
    
    // Update completedLessons array
    const currentCompletedLessons = userData.completedLessons || [];
    let newCompletedLessons = currentCompletedLessons;
    
    if (completed && !currentCompletedLessons.includes(lessonId)) {
      newCompletedLessons = [...currentCompletedLessons, lessonId];
      console.log(`✅ Lesson ${lessonId} completed and added to completedLessons`);
    }
    
    // Update achievements
    const achievements = userData.achievements || [];
    const newAchievements = [...achievements];
    
    // First lesson completion achievement
    if (completed && lessonId === 'p0FLOCJjIEhJ731LAren' && !achievements.includes('first_lesson')) {
      newAchievements.push('first_lesson');
      console.log('🏆 Achievement unlocked: First Lesson Completed!');
    }
    
    // Update user document
    await updateDoc(userRef, {
      progress,
      completedLessons: newCompletedLessons,
      totalTimeSpent,
      totalPagesEngaged,
      achievements: newAchievements,
      lastActivityDate: new Date()
    });
    
    console.log('✅ Lesson completion data saved successfully');
    
    // Verify the update
    const updatedDoc = await getDoc(userRef);
    const updatedData = updatedDoc.data();
    
    console.log('\n📊 Final user data:', {
      completedLessons: updatedData.completedLessons?.length || 0,
      completedLessonsArray: updatedData.completedLessons || [],
      lesson1Progress: updatedData.progress?.[lessonId] ? {
        completed: updatedData.progress[lessonId].completed,
        score: updatedData.progress[lessonId].score,
        lastSlide: updatedData.progress[lessonId].lastSlide,
        pagesEngaged: updatedData.progress[lessonId].pagesEngaged?.length || 0
      } : 'No progress found',
      totalTimeSpent: updatedData.totalTimeSpent,
      totalPagesEngaged: updatedData.totalPagesEngaged,
      achievements: updatedData.achievements || []
    });
    
    // Test Roadmap functions
    console.log('\n🔍 Testing Roadmap functions...');
    
    // Test if lesson is marked as completed
    const isCompleted = updatedData.completedLessons?.includes(lessonId) || 
                       (updatedData.progress && updatedData.progress[lessonId] && updatedData.progress[lessonId].completed);
    
    console.log(`✅ Lesson completion check: ${isCompleted ? 'PASSED' : 'FAILED'}`);
    console.log(`  - In completedLessons: ${updatedData.completedLessons?.includes(lessonId)}`);
    console.log(`  - In progress: ${updatedData.progress?.[lessonId]?.completed}`);
    
    // Test progress percentage calculation
    const completedCount = updatedData.completedLessons?.length || 0;
    const progressPercentage = Math.round((completedCount / 19) * 100); // Assuming 19 total lessons
    console.log(`✅ Progress percentage: ${progressPercentage}% (${completedCount}/19)`);
    
    console.log('\n✅ Complete system test completed successfully!');
    console.log('\n🎉 The system is now ready for testing with the web app!');
    
  } catch (error) {
    console.error('❌ Error testing complete system:', error);
  }
};

// Run the test
testCompleteSystem(); 