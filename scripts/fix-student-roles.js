/**
 * Fix Student Roles Script
 * 
 * This script ensures all students have the correct role field set to 'student'.
 * 
 * Usage: node scripts/fix-student-roles.js
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Validate configuration
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('❌ Missing Firebase configuration. Please check your .env file.');
  process.exit(1);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fixStudentRoles() {
  try {
    console.log('🔍 Checking all users for role issues...\n');
    
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    
    if (querySnapshot.empty) {
      console.log('❌ No users found in the database');
      return;
    }
    
    console.log(`📊 Found ${querySnapshot.size} users to check:\n`);
    
    let fixedCount = 0;
    let alreadyCorrectCount = 0;
    
    for (const docSnapshot of querySnapshot.docs) {
      const userData = docSnapshot.data();
      const userId = docSnapshot.id;
      
      // Skip teachers
      if (userData.role === 'teacher') {
        console.log(`👨‍🏫 Teacher: ${userData.displayName} (${userData.email}) - Role: ${userData.role}`);
        continue;
      }
      
      // Check if this looks like a student (has student-specific fields)
      const hasStudentFields = userData.currentLesson || userData.progress || userData.completedLessons;
      const hasTeacherFields = userData.teacherClasses || userData.teacherPermissions;
      
      if (hasStudentFields && !hasTeacherFields) {
        // This is definitely a student
        if (userData.role !== 'student') {
          console.log(`🔧 Fixing student role: ${userData.displayName} (${userData.email})`);
          console.log(`   Current role: ${userData.role || 'undefined'} → student`);
          
          await updateDoc(doc(db, 'users', userId), {
            role: 'student',
            updatedAt: new Date()
          });
          
          fixedCount++;
        } else {
          console.log(`✅ Student role correct: ${userData.displayName} (${userData.email}) - Role: ${userData.role}`);
          alreadyCorrectCount++;
        }
      } else if (!userData.role) {
        // User has no role, determine based on fields
        if (hasStudentFields) {
          console.log(`🔧 Setting missing role to student: ${userData.displayName} (${userData.email})`);
          
          await updateDoc(doc(db, 'users', userId), {
            role: 'student',
            updatedAt: new Date()
          });
          
          fixedCount++;
        } else {
          console.log(`❓ Unknown user type: ${userData.displayName} (${userData.email}) - No role and no clear indicators`);
        }
      } else {
        console.log(`ℹ️ User: ${userData.displayName} (${userData.email}) - Role: ${userData.role}`);
        alreadyCorrectCount++;
      }
    }
    
    console.log('\n📈 SUMMARY:');
    console.log(`  Total users checked: ${querySnapshot.size}`);
    console.log(`  Roles fixed: ${fixedCount}`);
    console.log(`  Already correct: ${alreadyCorrectCount}`);
    
    if (fixedCount > 0) {
      console.log('\n✅ Student roles have been fixed!');
      console.log('💡 The student pool should now show all students correctly.');
    } else {
      console.log('\n✅ All student roles are already correct!');
    }
    
  } catch (error) {
    console.error('❌ Error fixing student roles:', error);
  }
}

// Run the script
fixStudentRoles()
  .then(() => {
    console.log('✅ Script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }); 