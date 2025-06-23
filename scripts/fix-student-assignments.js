/**
 * Fix Student Assignments Script
 * 
 * This script fixes student assignments by clearing classId and teacherId
 * for students who are assigned to non-existent classes.
 * 
 * Usage: node scripts/fix-student-assignments.js
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc, updateDoc, query, where } from 'firebase/firestore';
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

async function fixStudentAssignments() {
  try {
    console.log('🔍 Checking student assignments...\n');
    
    // Get all students
    const usersRef = collection(db, 'users');
    const studentsQuery = query(usersRef, where('role', '==', 'student'));
    const studentsSnapshot = await getDocs(studentsQuery);
    
    console.log(`📊 Found ${studentsSnapshot.size} students to check:\n`);
    
    let fixedCount = 0;
    let alreadyCorrectCount = 0;
    
    for (const studentDoc of studentsSnapshot.docs) {
      const studentData = studentDoc.data();
      const studentId = studentDoc.id;
      
      console.log(`👤 Checking: ${studentData.displayName} (${studentData.email})`);
      console.log(`   Current classId: ${studentData.classId || 'None'}`);
      console.log(`   Current teacherId: ${studentData.teacherId || 'None'}`);
      
      // Check if student has assignments
      if (studentData.classId || studentData.teacherId) {
        // Check if the assigned class exists
        let classExists = false;
        if (studentData.classId) {
          const classRef = doc(db, 'classes', studentData.classId);
          const classDoc = await getDoc(classRef);
          classExists = classDoc.exists();
          console.log(`   Class exists: ${classExists}`);
        }
        
        // If class doesn't exist, fix the assignment
        if (!classExists) {
          console.log(`   🔧 Fixing assignment for ${studentData.displayName}`);
          
          await updateDoc(doc(db, 'users', studentId), {
            classId: null,
            teacherId: null,
            updatedAt: new Date()
          });
          
          fixedCount++;
          console.log(`   ✅ Fixed: cleared classId and teacherId`);
        } else {
          console.log(`   ✅ Assignment is valid`);
          alreadyCorrectCount++;
        }
      } else {
        console.log(`   ✅ No assignments to fix`);
        alreadyCorrectCount++;
      }
      
      console.log('');
    }
    
    console.log('📈 SUMMARY:');
    console.log(`  Total students checked: ${studentsSnapshot.size}`);
    console.log(`  Assignments fixed: ${fixedCount}`);
    console.log(`  Already correct: ${alreadyCorrectCount}`);
    
    if (fixedCount > 0) {
      console.log('\n✅ Student assignments have been fixed!');
      console.log('💡 Students should now show as "unassigned" in the Student Pool.');
    } else {
      console.log('\n✅ All student assignments are already correct!');
    }
    
  } catch (error) {
    console.error('❌ Error fixing student assignments:', error);
  }
}

// Run the script
fixStudentAssignments()
  .then(() => {
    console.log('✅ Script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }); 