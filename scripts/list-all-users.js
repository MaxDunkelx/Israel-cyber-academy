/**
 * List All Users Script
 * 
 * This script lists all users in the database to see what students and teachers exist.
 * 
 * Usage: node scripts/list-all-users.js
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';
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

async function listAllUsers() {
  try {
    console.log('🔍 Fetching all users from database...\n');
    
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('displayName'));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('❌ No users found in the database');
      return;
    }
    
    console.log(`📊 Found ${querySnapshot.size} users:\n`);
    
    const students = [];
    const teachers = [];
    const others = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const user = {
        id: doc.id,
        ...data
      };
      
      if (data.role === 'student') {
        students.push(user);
      } else if (data.role === 'teacher') {
        teachers.push(user);
      } else {
        others.push(user);
      }
    });
    
    // Display teachers
    if (teachers.length > 0) {
      console.log('👨‍🏫 TEACHERS:');
      teachers.forEach((teacher, index) => {
        console.log(`  ${index + 1}. ${teacher.displayName} (${teacher.email})`);
        console.log(`     Role: ${teacher.role}`);
        console.log(`     Created: ${teacher.createdAt?.toDate?.() || teacher.createdAt}`);
        console.log(`     Classes: ${teacher.teacherClasses?.length || 0}`);
        console.log('');
      });
    }
    
    // Display students
    if (students.length > 0) {
      console.log('👨‍🎓 STUDENTS:');
      students.forEach((student, index) => {
        console.log(`  ${index + 1}. ${student.displayName} (${student.email})`);
        console.log(`     Role: ${student.role}`);
        console.log(`     Age: ${student.age || 'N/A'}`);
        console.log(`     Sex: ${student.sex || 'N/A'}`);
        console.log(`     Assigned to class: ${student.classId ? 'Yes' : 'No'}`);
        console.log(`     Teacher: ${student.teacherId ? 'Yes' : 'No'}`);
        console.log(`     Current lesson: ${student.currentLesson || 1}`);
        console.log(`     Completed lessons: ${student.completedLessons?.length || 0}`);
        console.log(`     Created: ${student.createdAt?.toDate?.() || student.createdAt}`);
        console.log('');
      });
    }
    
    // Display others
    if (others.length > 0) {
      console.log('❓ OTHER USERS:');
      others.forEach((user, index) => {
        console.log(`  ${index + 1}. ${user.displayName} (${user.email})`);
        console.log(`     Role: ${user.role || 'undefined'}`);
        console.log(`     Created: ${user.createdAt?.toDate?.() || user.createdAt}`);
        console.log('');
      });
    }
    
    // Summary
    console.log('📈 SUMMARY:');
    console.log(`  Total users: ${querySnapshot.size}`);
    console.log(`  Teachers: ${teachers.length}`);
    console.log(`  Students: ${students.length}`);
    console.log(`  Others: ${others.length}`);
    console.log(`  Assigned students: ${students.filter(s => s.classId).length}`);
    console.log(`  Unassigned students: ${students.filter(s => !s.classId).length}`);
    
  } catch (error) {
    console.error('❌ Error fetching users:', error);
  }
}

// Run the script
listAllUsers()
  .then(() => {
    console.log('✅ Script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }); 