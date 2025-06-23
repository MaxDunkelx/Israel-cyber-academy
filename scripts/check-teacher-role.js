/**
 * Check Teacher Role Script
 * 
 * This script checks if a user has the correct teacher role in the database.
 * It can also fix the role if it's incorrect.
 * 
 * Usage: node scripts/check-teacher-role.js [email] [fix]
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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
  console.error('Required variables: VITE_FIREBASE_API_KEY, VITE_FIREBASE_PROJECT_ID, etc.');
  process.exit(1);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function checkTeacherRole(email, shouldFix = false) {
  try {
    console.log(`🔍 Checking role for user: ${email}`);
    
    // First, try to sign in to get the user
    const userCredential = await signInWithEmailAndPassword(auth, email, 'password123');
    const user = userCredential.user;
    
    console.log(`✅ User authenticated: ${user.uid}`);
    
    // Get user document from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      console.log('❌ User document not found in Firestore');
      return;
    }
    
    const userData = userDoc.data();
    console.log('📋 Current user data:');
    console.log(`  - Display Name: ${userData.displayName}`);
    console.log(`  - Email: ${userData.email}`);
    console.log(`  - Role: ${userData.role}`);
    console.log(`  - Created At: ${userData.createdAt}`);
    console.log(`  - Last Login: ${userData.lastLogin}`);
    
    if (userData.role === 'teacher') {
      console.log('✅ User already has teacher role');
    } else {
      console.log('❌ User does not have teacher role');
      
      if (shouldFix) {
        console.log('🔧 Fixing user role...');
        await updateDoc(doc(db, 'users', user.uid), {
          role: 'teacher',
          updatedAt: new Date()
        });
        console.log('✅ User role updated to teacher');
      } else {
        console.log('💡 Run with "fix" parameter to update the role');
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.code === 'auth/user-not-found') {
      console.log('💡 User not found. Make sure the email is correct.');
    } else if (error.code === 'auth/wrong-password') {
      console.log('💡 Wrong password. You may need to reset the password.');
    }
  }
}

// Get command line arguments
const args = process.argv.slice(2);
const email = args[0];
const shouldFix = args[1] === 'fix';

if (!email) {
  console.log('❌ Please provide an email address');
  console.log('Usage: node scripts/check-teacher-role.js [email] [fix]');
  console.log('Example: node scripts/check-teacher-role.js teacher@example.com fix');
  process.exit(1);
}

console.log('🚀 Starting teacher role check...');
checkTeacherRole(email, shouldFix)
  .then(() => {
    console.log('✅ Script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }); 