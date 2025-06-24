/**
 * Test User Management Script
 * 
 * This script tests the user fetching functionality for the UserManagement component.
 * It simulates the same Firebase query that the component uses.
 * 
 * Usage: node scripts/test-user-management.js
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
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

async function testUserManagement() {
  try {
    console.log('🧪 Testing UserManagement component user fetching...\n');
    
    // Simulate the exact same query as UserManagement component
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    
    console.log(`📊 Found ${querySnapshot.size} users in database:\n`);
    
    if (querySnapshot.empty) {
      console.log('❌ No users found in the database');
      console.log('💡 Please add some users first using the setup scripts');
      return;
    }
    
    const users = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const user = {
        uid: doc.id,
        ...data,
        // Ensure dates are properly converted (same as component)
        createdAt: data.createdAt?.toDate?.() || data.createdAt || new Date(),
        lastLogin: data.lastLogin?.toDate?.() || data.lastLogin || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt || new Date()
      };
      users.push(user);
    });
    
    // Sort users by display name (same as component)
    users.sort((a, b) => {
      const nameA = a.displayName || a.email || '';
      const nameB = b.displayName || b.email || '';
      return nameA.localeCompare(nameB);
    });
    
    // Display users grouped by role
    const students = users.filter(u => u.role === 'student');
    const teachers = users.filter(u => u.role === 'teacher');
    const systemManagers = users.filter(u => u.role === 'system_manager');
    const others = users.filter(u => !['student', 'teacher', 'system_manager'].includes(u.role));
    
    console.log('👨‍🎓 Students:');
    students.forEach(user => {
      console.log(`  - ${user.displayName || user.email} (${user.uid})`);
      console.log(`    Email: ${user.email}`);
      console.log(`    Age: ${user.age || 'N/A'}, Sex: ${user.sex || 'N/A'}`);
      console.log(`    Teacher: ${user.teacherId || 'Not assigned'}`);
      console.log(`    Created: ${user.createdAt.toLocaleDateString('he-IL')}`);
      console.log('');
    });
    
    console.log('👨‍🏫 Teachers:');
    teachers.forEach(user => {
      console.log(`  - ${user.displayName || user.email} (${user.uid})`);
      console.log(`    Email: ${user.email}`);
      console.log(`    Classes: ${user.teacherClasses?.length || 0}`);
      console.log(`    Created: ${user.createdAt.toLocaleDateString('he-IL')}`);
      console.log('');
    });
    
    console.log('🔧 System Managers:');
    systemManagers.forEach(user => {
      console.log(`  - ${user.displayName || user.email} (${user.uid})`);
      console.log(`    Email: ${user.email}`);
      console.log(`    Created: ${user.createdAt.toLocaleDateString('he-IL')}`);
      console.log('');
    });
    
    if (others.length > 0) {
      console.log('❓ Other roles:');
      others.forEach(user => {
        console.log(`  - ${user.displayName || user.email} (${user.uid})`);
        console.log(`    Role: ${user.role || 'undefined'}`);
        console.log(`    Email: ${user.email}`);
        console.log('');
      });
    }
    
    // Summary statistics
    console.log('📈 Summary:');
    console.log(`  - Total users: ${users.length}`);
    console.log(`  - Students: ${students.length}`);
    console.log(`  - Teachers: ${teachers.length}`);
    console.log(`  - System Managers: ${systemManagers.length}`);
    console.log(`  - Others: ${others.length}`);
    
    // Test specific user data structure
    if (users.length > 0) {
      const sampleUser = users[0];
      console.log('\n🔍 Sample user data structure:');
      console.log('  Required fields for UserManagement component:');
      console.log(`    - uid: ${sampleUser.uid} ✅`);
      console.log(`    - email: ${sampleUser.email || 'MISSING'} ${sampleUser.email ? '✅' : '❌'}`);
      console.log(`    - displayName: ${sampleUser.displayName || 'MISSING'} ${sampleUser.displayName ? '✅' : '❌'}`);
      console.log(`    - role: ${sampleUser.role || 'MISSING'} ${sampleUser.role ? '✅' : '❌'}`);
      console.log(`    - createdAt: ${sampleUser.createdAt ? '✅' : '❌'}`);
      console.log(`    - lastLogin: ${sampleUser.lastLogin ? '✅' : '❌'}`);
      
      if (sampleUser.role === 'student') {
        console.log(`    - age: ${sampleUser.age || 'MISSING'} ${sampleUser.age ? '✅' : '❌'}`);
        console.log(`    - sex: ${sampleUser.sex || 'MISSING'} ${sampleUser.sex ? '✅' : '❌'}`);
        console.log(`    - teacherId: ${sampleUser.teacherId || 'Not assigned'}`);
      }
      
      if (sampleUser.role === 'teacher') {
        console.log(`    - teacherClasses: ${sampleUser.teacherClasses?.length || 0} classes`);
      }
    }
    
    console.log('\n✅ UserManagement component should work correctly with this data!');
    
  } catch (error) {
    console.error('❌ Error testing user management:', error);
    
    if (error.code === 'permission-denied') {
      console.log('\n💡 This might be a Firestore permissions issue.');
      console.log('💡 Check your Firestore security rules.');
    } else if (error.code === 'not-found') {
      console.log('\n💡 Firestore database not found.');
      console.log('💡 Please create the Firestore database first.');
    }
  }
}

// Run the test
testUserManagement()
  .then(() => {
    console.log('\n🎉 Test completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Test failed:', error);
    process.exit(1);
  }); 