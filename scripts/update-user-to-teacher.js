/**
 * Update User to Teacher Script
 * 
 * This script updates an existing user to have teacher role.
 * Run this script to convert a student account to a teacher account.
 * 
 * Usage:
 * 1. Make sure you have your .env file with Firebase credentials
 * 2. Run: node scripts/update-user-to-teacher.js
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

// Firebase configuration - you'll need to replace with your actual config
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

async function updateUserToTeacher(email) {
  try {
    console.log(`🔍 Looking for user with email: ${email}`);
    
    // First, we need to find the user document
    // Since we can't query by email directly without an index, 
    // you'll need to provide the user's UID
    
    console.log('❌ This script requires the user UID');
    console.log('💡 To find the UID:');
    console.log('   1. Go to Firebase Console > Firestore Database');
    console.log('   2. Look in the "users" collection');
    console.log('   3. Find the document with your email');
    console.log('   4. Copy the document ID (that\'s the UID)');
    console.log('\n💡 Then run this script with the UID instead of email');
    
    return;
    
  } catch (error) {
    console.error('❌ Error updating user role:', error);
  }
}

async function updateUserRoleByUID(uid) {
  try {
    console.log(`🔍 Updating user role for UID: ${uid}`);
    
    // Get the user document
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      console.log('❌ User document not found');
      return;
    }
    
    const userData = userDoc.data();
    console.log('📋 Current user data:', {
      email: userData.email,
      displayName: userData.displayName,
      role: userData.role
    });
    
    // Update the role to teacher
    await updateDoc(userRef, {
      role: 'teacher',
      updatedAt: new Date()
    });
    
    console.log('✅ User role updated to teacher successfully!');
    console.log('🔄 Please refresh your browser and try logging in again');
    
  } catch (error) {
    console.error('❌ Error updating user role:', error);
  }
}

// Usage examples:
// updateUserToTeacher('maxbunnyshow@gmail.com'); // This will show instructions
// updateUserRoleByUID('your-user-uid-here'); // Replace with actual UID

console.log('🚀 User Role Update Script');
console.log('==========================\n');

console.log('To update a user to teacher role:');
console.log('1. Find the user UID in Firebase Console');
console.log('2. Uncomment the line below and replace with the actual UID');
console.log('3. Run this script');
console.log('\nExample:');
console.log('updateUserRoleByUID("abc123def456");');

// Uncomment and replace with actual UID:
// updateUserRoleByUID('your-actual-uid-here'); 