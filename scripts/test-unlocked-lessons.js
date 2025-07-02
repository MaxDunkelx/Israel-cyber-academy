/**
 * Test Unlocked Lessons Tracking
 * 
 * This script tests the unlocked lessons tracking functionality
 * to ensure it's working properly in the database.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvOkJhHhHhHhHhHhHhHhHhHhHhHhHhHhH",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefghijklmnop"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const SYSTEM_MANAGER_EMAIL = 'maxibunnyshow@gmail.com';
const SYSTEM_MANAGER_PASSWORD = 'your-password-here'; // Replace with actual password

async function testUnlockedLessonsTracking() {
  try {
    console.log('🧪 Testing unlocked lessons tracking...');
    
    // Sign in as system manager
    console.log('🔐 Signing in as system manager...');
    await signInWithEmailAndPassword(auth, SYSTEM_MANAGER_EMAIL, SYSTEM_MANAGER_PASSWORD);
    console.log('✅ Signed in successfully');
    
    // Get all classes
    console.log('📚 Fetching all classes...');
    const classesRef = collection(db, 'classes');
    const classesSnapshot = await getDocs(classesRef);
    
    if (classesSnapshot.empty) {
      console.log('ℹ️ No classes found in database');
      return;
    }
    
    console.log(`📊 Found ${classesSnapshot.size} classes`);
    
    let classesWithTracking = 0;
    let classesWithoutTracking = 0;
    let totalUnlockedLessons = 0;
    
    // Process each class
    for (const classDoc of classesSnapshot.docs) {
      const classData = classDoc.data();
      const classId = classDoc.id;
      
      console.log(`\n🏫 Class: ${classData.name || classId}`);
      console.log(`  - Current Lesson: ${classData.currentLesson || 'None'}`);
      console.log(`  - Lesson Start Date: ${classData.lessonStartDate || 'None'}`);
      
      // Check unlocked lessons tracking
      if (classData.unlockedLessons && Array.isArray(classData.unlockedLessons)) {
        classesWithTracking++;
        totalUnlockedLessons += classData.unlockedLessons.length;
        
        console.log(`  ✅ Has unlocked lessons tracking (${classData.unlockedLessons.length} entries)`);
        
        // Display unlocked lessons
        classData.unlockedLessons.forEach((unlockedLesson, index) => {
          console.log(`    ${index + 1}. Lesson ${unlockedLesson.lessonId} - ${new Date(unlockedLesson.unlockedAt).toLocaleDateString('he-IL')} by ${unlockedLesson.unlockedByTeacher}`);
        });
      } else {
        classesWithoutTracking++;
        console.log(`  ❌ No unlocked lessons tracking`);
      }
    }
    
    console.log(`\n📊 Test Results:`);
    console.log(`  - Total classes: ${classesSnapshot.size}`);
    console.log(`  - Classes with tracking: ${classesWithTracking}`);
    console.log(`  - Classes without tracking: ${classesWithoutTracking}`);
    console.log(`  - Total unlocked lessons entries: ${totalUnlockedLessons}`);
    
    if (classesWithoutTracking > 0) {
      console.log(`\n⚠️  ${classesWithoutTracking} classes need to be updated with unlocked lessons tracking`);
      console.log(`   Run the setup script: node scripts/setup-unlocked-lessons-tracking.js`);
    } else {
      console.log(`\n✅ All classes have proper unlocked lessons tracking!`);
    }
    
  } catch (error) {
    console.error('❌ Error testing unlocked lessons tracking:', error);
    throw error;
  }
}

// Run the test
testUnlockedLessonsTracking()
  .then(() => {
    console.log('✅ Test completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }); 