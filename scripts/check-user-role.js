/**
 * Check User Role Script
 * 
 * This script checks the current role of a user in Firebase.
 * Run this script to verify user roles for debugging.
 * 
 * Usage:
 * 1. Make sure you have your .env file with Firebase credentials
 * 2. Run: node scripts/check-user-role.js
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';

// Your Firebase config
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

async function checkUserRoles() {
  try {
    console.log('🔍 Checking user roles in database...\n');

    // Get all users
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);

    if (snapshot.empty) {
      console.log('❌ No users found in database');
      return;
    }

    console.log(`📊 Found ${snapshot.size} users:\n`);

    snapshot.forEach((doc) => {
      const userData = doc.data();
      console.log(`👤 User: ${doc.id}`);
      console.log(`   Email: ${userData.email || 'N/A'}`);
      console.log(`   Display Name: ${userData.displayName || 'N/A'}`);
      console.log(`   Role: ${userData.role || 'N/A'}`);
      console.log(`   Assigned Class: ${userData.assignedClass || 'None'}`);
      console.log(`   Created At: ${userData.createdAt ? new Date(userData.createdAt.toDate()).toLocaleString() : 'N/A'}`);
      console.log('---');
    });

    // Check for specific user
    const specificEmail = 'maxbunnyshow@gmail.com';
    console.log(`\n🔍 Looking for user with email: ${specificEmail}`);
    
    const userQuery = snapshot.docs.find(doc => doc.data().email === specificEmail);
    if (userQuery) {
      console.log('✅ Found user:');
      console.log(`   UID: ${userQuery.id}`);
      console.log(`   Role: ${userQuery.data().role}`);
      console.log(`   Display Name: ${userQuery.data().displayName}`);
    } else {
      console.log('❌ User not found');
    }

  } catch (error) {
    console.error('❌ Error checking user roles:', error);
  }
}

async function checkClasses() {
  try {
    console.log('\n🏫 Checking classes in database...\n');

    const classesRef = collection(db, 'classes');
    const snapshot = await getDocs(classesRef);

    if (snapshot.empty) {
      console.log('❌ No classes found in database');
      return;
    }

    console.log(`📚 Found ${snapshot.size} classes:\n`);

    snapshot.forEach((doc) => {
      const classData = doc.data();
      console.log(`📖 Class: ${doc.id}`);
      console.log(`   Name: ${classData.className || 'N/A'}`);
      console.log(`   Instructor: ${classData.instructorId || 'N/A'}`);
      console.log(`   Status: ${classData.status || 'N/A'}`);
      console.log(`   Students: ${classData.studentCount || 0}`);
      console.log('---');
    });

  } catch (error) {
    console.error('❌ Error checking classes:', error);
  }
}

async function main() {
  console.log('🚀 Starting database check...\n');
  
  await checkUserRoles();
  await checkClasses();
  
  console.log('\n✅ Database check completed');
}

main().catch(console.error); 