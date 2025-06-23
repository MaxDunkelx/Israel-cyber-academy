/**
 * Test Student Pool Script
 * 
 * This script tests the getAllStudents function to see what students are being fetched.
 * 
 * Usage: node scripts/test-student-pool.js
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, orderBy } from 'firebase/firestore';
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

async function testGetAllStudents() {
  try {
    console.log('🧪 Testing getAllStudents function...\n');
    
    // Test the exact same query as getAllStudents
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef, 
      where('role', '==', 'student'),
      orderBy('displayName')
    );
    
    console.log('🔍 Executing query: where role == "student"');
    const querySnapshot = await getDocs(q);
    
    console.log(`📊 Query returned ${querySnapshot.size} students:\n`);
    
    if (querySnapshot.empty) {
      console.log('❌ No students found with role "student"');
      console.log('\n🔍 Let\'s check what users exist with different roles:');
      
      // Check all users
      const allUsersQuery = query(usersRef, orderBy('displayName'));
      const allUsersSnapshot = await getDocs(allUsersQuery);
      
      allUsersSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`  - ${data.displayName} (${data.email}) - Role: "${data.role || 'undefined'}"`);
      });
      
      return;
    }
    
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
    
    students.forEach((student, index) => {
      console.log(`${index + 1}. ${student.displayName} (${student.email})`);
      console.log(`   ID: ${student.id}`);
      console.log(`   Role: ${student.role}`);
      console.log(`   Assigned to class: ${student.assignedToClass ? 'Yes' : 'No'}`);
      console.log(`   Assigned to teacher: ${student.assignedToTeacher ? 'Yes' : 'No'}`);
      console.log(`   Class ID: ${student.classId || 'None'}`);
      console.log(`   Teacher ID: ${student.teacherId || 'None'}`);
      console.log(`   Current lesson: ${student.currentLesson || 'N/A'}`);
      console.log(`   Completed lessons: ${student.completedLessons?.length || 0}`);
      console.log('');
    });
    
    console.log('✅ getAllStudents function test completed!');
    console.log(`📈 Found ${students.length} students with role "student"`);
    
  } catch (error) {
    console.error('❌ Error testing getAllStudents:', error);
    
    if (error.code === 'failed-precondition') {
      console.log('\n💡 This error usually means you need to create a composite index.');
      console.log('💡 Go to Firebase Console > Firestore > Indexes and create an index for:');
      console.log('   Collection: users');
      console.log('   Fields: role (Ascending), displayName (Ascending)');
    }
  }
}

// Run the script
testGetAllStudents()
  .then(() => {
    console.log('✅ Script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }); 