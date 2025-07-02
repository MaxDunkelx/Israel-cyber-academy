/**
 * Setup Unlocked Lessons Tracking
 * 
 * This script ensures that all classes in the database have the proper structure
 * for tracking unlocked lessons with timestamps and teacher information.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
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

async function setupUnlockedLessonsTracking() {
  try {
    console.log('🔧 Setting up unlocked lessons tracking...');
    
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
    
    let updatedCount = 0;
    let skippedCount = 0;
    
    // Process each class
    for (const classDoc of classesSnapshot.docs) {
      const classData = classDoc.data();
      const classId = classDoc.id;
      
      console.log(`\n🏫 Processing class: ${classData.name || classId}`);
      
      // Check if class already has unlockedLessons array
      if (classData.unlockedLessons && Array.isArray(classData.unlockedLessons)) {
        console.log(`  ✅ Class already has unlockedLessons tracking (${classData.unlockedLessons.length} entries)`);
        skippedCount++;
        continue;
      }
      
      // Initialize unlockedLessons array
      const unlockedLessons = [];
      
      // If class has currentLesson, create an initial unlocked lesson entry
      if (classData.currentLesson && classData.currentLesson > 0) {
        const initialUnlockedLesson = {
          lessonId: classData.currentLesson,
          unlockedAt: classData.lessonStartDate || classData.lastUpdated || new Date().toISOString(),
          unlockedBy: classData.teacherId || 'system',
          unlockedByTeacher: classData.teacherName || 'System Manager'
        };
        
        unlockedLessons.push(initialUnlockedLesson);
        console.log(`  📝 Created initial unlocked lesson entry for lesson ${classData.currentLesson}`);
      }
      
      // Update class with unlockedLessons array
      const classRef = doc(db, 'classes', classId);
      await updateDoc(classRef, {
        unlockedLessons: unlockedLessons,
        lastUpdated: new Date().toISOString()
      });
      
      console.log(`  ✅ Updated class with unlockedLessons tracking`);
      updatedCount++;
    }
    
    console.log(`\n🎉 Setup completed successfully!`);
    console.log(`📊 Summary:`);
    console.log(`  - Classes processed: ${classesSnapshot.size}`);
    console.log(`  - Classes updated: ${updatedCount}`);
    console.log(`  - Classes skipped (already had tracking): ${skippedCount}`);
    
  } catch (error) {
    console.error('❌ Error setting up unlocked lessons tracking:', error);
    throw error;
  }
}

// Run the setup
setupUnlockedLessonsTracking()
  .then(() => {
    console.log('✅ Setup completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }); 