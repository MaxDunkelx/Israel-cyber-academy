const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc, setDoc } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxGQoKzLxKjKjKjKjKjKjKjKjKjKjKjKjK",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefghijklmnop"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function debugLessonCompletionFlow() {
  console.log('🚀 Starting lesson completion flow debug...');
  
  // Test user ID (replace with actual user ID)
  const userId = 'test-user-id';
  
  try {
    // 1. Check current user state
    console.log('📊 Step 1: Checking current user state...');
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      console.log('❌ User does not exist, creating test user...');
      await setDoc(userRef, {
        displayName: 'test-user',
        currentLesson: 1,
        completedLessons: [],
        progress: {},
        totalTimeSpent: 0,
        totalPagesEngaged: 0,
        achievements: []
      });
    }
    
    const userData = userDoc.exists() ? userDoc.data() : {
      displayName: 'test-user',
      currentLesson: 1,
      completedLessons: [],
      progress: {},
      totalTimeSpent: 0,
      totalPagesEngaged: 0,
      achievements: []
    };
    
    console.log('📊 Current user state:', {
      displayName: userData.displayName,
      currentLesson: userData.currentLesson,
      completedLessons: userData.completedLessons,
      progressKeys: Object.keys(userData.progress || {}),
      totalTimeSpent: userData.totalTimeSpent,
      totalPagesEngaged: userData.totalPagesEngaged
    });
    
    // 2. Simulate lesson completion for lesson 1
    console.log('\n📚 Step 2: Simulating lesson 1 completion...');
    const lessonNumber = 1;
    const firestoreLessonId = 'p0FLOCJjIEhJ731LAren';
    const completed = true;
    const score = 100;
    const allSlideIds = ['slide1', 'slide2', 'slide3', 'slide4', 'slide5'];
    
    console.log('📋 Lesson completion parameters:', {
      lessonNumber,
      firestoreLessonId,
      completed,
      score,
      allSlideIds
    });
    
    // 3. Update progress (simulating updateUserProgress function)
    console.log('\n💾 Step 3: Updating user progress...');
    const progress = userData.progress || {};
    
    // Initialize lesson progress if it doesn't exist
    if (!progress[firestoreLessonId]) {
      progress[firestoreLessonId] = {
        completed: false,
        score: 0,
        completedAt: null,
        temporary: false,
        lastSlide: 0,
        pagesEngaged: [],
        lastActivity: new Date()
      };
    }
    
    // Update lesson progress with new data
    progress[firestoreLessonId] = {
      ...progress[firestoreLessonId],
      completed,
      score,
      completedAt: completed ? new Date() : progress[firestoreLessonId].completedAt,
      temporary: false,
      lastActivity: new Date(),
      lastSlide: 20
    };
    
    // If lesson is completed, ensure all slides are marked as engaged
    if (completed && allSlideIds && Array.isArray(allSlideIds)) {
      const currentEngaged = progress[firestoreLessonId].pagesEngaged || [];
      const allEngaged = [...new Set([...currentEngaged, ...allSlideIds])];
      progress[firestoreLessonId].pagesEngaged = allEngaged;
      console.log(`📊 All slides marked as engaged for lesson ${firestoreLessonId}: ${allEngaged.length} slides`);
    }
    
    // Calculate total time spent and pages engaged across all lessons
    let totalTimeSpent = 0;
    let totalPagesEngaged = 0;
    Object.values(progress).forEach(lessonProgress => {
      if (lessonProgress.pagesEngaged && Array.isArray(lessonProgress.pagesEngaged)) {
        totalPagesEngaged += lessonProgress.pagesEngaged.length;
        // Estimate 3 minutes per page/slide
        totalTimeSpent += lessonProgress.pagesEngaged.length * 3;
      }
    });
    
    // Update completed lessons
    const currentCompletedLessons = userData.completedLessons || [];
    let newCompletedLessons = currentCompletedLessons;
    
    if (completed) {
      // Add to completed lessons if not already there (using Firestore ID)
      if (!currentCompletedLessons.includes(firestoreLessonId)) {
        newCompletedLessons = [...currentCompletedLessons, firestoreLessonId];
        console.log(`✅ Lesson ${firestoreLessonId} completed and added to completedLessons`);
      }
    }
    
    // Calculate achievements
    const achievements = userData.achievements || [];
    const newAchievements = [...achievements];
    
    // First lesson completion achievement
    if (completed && firestoreLessonId === 'p0FLOCJjIEhJ731LAren' && !achievements.includes('first_lesson')) {
      newAchievements.push('first_lesson');
      console.log('🏆 Achievement unlocked: First Lesson Completed!');
    }
    
    console.log('📊 Progress update summary:', {
      lessonId: firestoreLessonId,
      originalLessonId: lessonNumber,
      completed,
      score,
      totalTimeSpent,
      totalPagesEngaged,
      completedLessons: newCompletedLessons.length,
      achievements: newAchievements.length
    });
    
    // 4. Save to Firestore
    console.log('\n💾 Step 4: Saving to Firestore...');
    await setDoc(userRef, {
      progress,
      completedLessons: newCompletedLessons,
      currentLesson: userData.currentLesson,
      lastActivityDate: new Date(),
      totalTimeSpent,
      totalPagesEngaged,
      achievements: newAchievements
    }, { merge: true });
    
    console.log('✅ Progress saved successfully to Firestore');
    
    // 5. Verify the update
    console.log('\n🔍 Step 5: Verifying the update...');
    const updatedUserDoc = await getDoc(userRef);
    const updatedUserData = updatedUserDoc.data();
    
    console.log('📊 Updated user state:', {
      displayName: updatedUserData.displayName,
      currentLesson: updatedUserData.currentLesson,
      completedLessons: updatedUserData.completedLessons,
      progressKeys: Object.keys(updatedUserData.progress || {}),
      totalTimeSpent: updatedUserData.totalTimeSpent,
      totalPagesEngaged: updatedUserData.totalPagesEngaged,
      achievements: updatedUserData.achievements
    });
    
    // Check specific lesson progress
    const lessonProgress = updatedUserData.progress[firestoreLessonId];
    console.log('📊 Lesson 1 progress details:', {
      lessonId: firestoreLessonId,
      completed: lessonProgress?.completed,
      score: lessonProgress?.score,
      completedAt: lessonProgress?.completedAt,
      lastSlide: lessonProgress?.lastSlide,
      pagesEngaged: lessonProgress?.pagesEngaged?.length || 0
    });
    
    console.log('\n✅ Lesson completion flow debug completed successfully!');
    
  } catch (error) {
    console.error('❌ Error in lesson completion flow debug:', error);
  }
}

// Run the debug
debugLessonCompletionFlow(); 