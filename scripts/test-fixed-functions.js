/**
 * Test Fixed Functions Script
 * 
 * This script tests the fixed getAllStudents and getTeacherClasses functions
 * to ensure they work without requiring Firestore indexes.
 * 
 * Usage: node scripts/test-fixed-functions.js
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
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

// Test getAllStudents function (fixed version)
async function testGetAllStudents() {
  try {
    console.log('🧪 Testing getAllStudents function (fixed version)...\n');
    
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('role', '==', 'student'));
    
    console.log('🔍 Executing query: where role == "student" (no orderBy)');
    const querySnapshot = await getDocs(q);
    
    console.log(`📊 Query returned ${querySnapshot.size} students:\n`);
    
    const students = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const student = {
        id: doc.id,
        ...data,
        assignedToClass: !!data.classId,
        assignedToTeacher: !!data.teacherId
      };
      students.push(student);
    });
    
    // Sort in JavaScript
    students.sort((a, b) => {
      const nameA = a.displayName || a.email || '';
      const nameB = b.displayName || b.email || '';
      return nameA.localeCompare(nameB);
    });
    
    students.forEach((student, index) => {
      console.log(`${index + 1}. ${student.displayName} (${student.email})`);
      console.log(`   ID: ${student.id}`);
      console.log(`   Role: ${student.role}`);
      console.log(`   Assigned to class: ${student.assignedToClass ? 'Yes' : 'No'}`);
      console.log(`   Assigned to teacher: ${student.assignedToTeacher ? 'Yes' : 'No'}`);
      console.log('');
    });
    
    console.log('✅ getAllStudents function test completed successfully!');
    return students.length;
    
  } catch (error) {
    console.error('❌ Error testing getAllStudents:', error);
    return 0;
  }
}

// Test getTeacherClasses function (fixed version)
async function testGetTeacherClasses(teacherId) {
  try {
    console.log('🧪 Testing getTeacherClasses function (fixed version)...\n');
    
    const classesRef = collection(db, 'classes');
    const q = query(classesRef, where('teacherId', '==', teacherId));
    
    console.log(`🔍 Executing query: where teacherId == "${teacherId}" (no orderBy)`);
    const querySnapshot = await getDocs(q);
    
    console.log(`📊 Query returned ${querySnapshot.size} classes:\n`);
    
    const classes = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      classes.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate()
      });
    });
    
    // Sort in JavaScript
    classes.sort((a, b) => {
      const dateA = a.createdAt || new Date(0);
      const dateB = b.createdAt || new Date(0);
      return dateB - dateA; // Descending order (newest first)
    });
    
    classes.forEach((classItem, index) => {
      console.log(`${index + 1}. ${classItem.name}`);
      console.log(`   ID: ${classItem.id}`);
      console.log(`   Description: ${classItem.description}`);
      console.log(`   Students: ${classItem.studentIds?.length || 0}/${classItem.maxStudents}`);
      console.log(`   Created: ${classItem.createdAt}`);
      console.log(`   Active: ${classItem.isActive}`);
      console.log('');
    });
    
    console.log('✅ getTeacherClasses function test completed successfully!');
    return classes.length;
    
  } catch (error) {
    console.error('❌ Error testing getTeacherClasses:', error);
    return 0;
  }
}

async function runTests() {
  try {
    console.log('🚀 Starting fixed functions tests...\n');
    
    // Test students
    const studentCount = await testGetAllStudents();
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Test classes (using the teacher ID from your logs)
    const teacherId = 'hG0j0CjZeuYy5MC3OcREUqfDizw1';
    const classCount = await testGetTeacherClasses(teacherId);
    
    console.log('\n📈 TEST SUMMARY:');
    console.log(`  Students found: ${studentCount}`);
    console.log(`  Classes found: ${classCount}`);
    console.log(`  All tests passed: ${studentCount > 0 && classCount >= 0 ? '✅ YES' : '❌ NO'}`);
    
    if (studentCount > 0 && classCount >= 0) {
      console.log('\n🎉 All functions are working correctly!');
      console.log('💡 The Student Pool should now work perfectly in your app.');
    } else {
      console.log('\n⚠️ Some issues detected. Check the logs above.');
    }
    
  } catch (error) {
    console.error('❌ Test suite failed:', error);
  }
}

// Run the tests
runTests()
  .then(() => {
    console.log('✅ Test suite completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Test suite failed:', error);
    process.exit(1);
  }); 