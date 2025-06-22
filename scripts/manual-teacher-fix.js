/**
 * Manual Teacher Role Fix Script
 * 
 * This script manually fixes teacher roles in the database.
 * Run this if other methods don't work.
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, doc, updateDoc, getDoc, collection, query, where, getDocs } = require('firebase/firestore');

// Your Firebase config - replace with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fixTeacherRole(email) {
  try {
    console.log(`🔧 Fixing teacher role for: ${email}`);
    
    // First, find the user by email
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('❌ User not found');
      return;
    }
    
    const userDoc = querySnapshot.docs[0];
    const userId = userDoc.id;
    
    console.log(`📝 Found user ID: ${userId}`);
    
    // Update the role to teacher
    await updateDoc(doc(db, 'users', userId), {
      role: 'teacher',
      updatedAt: new Date()
    });
    
    console.log('✅ Teacher role updated successfully!');
    console.log('🔄 Please refresh your browser and try logging in again.');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Get email from command line argument
const email = process.argv[2];

if (!email) {
  console.log('❌ Please provide an email address:');
  console.log('node scripts/manual-teacher-fix.js your-email@example.com');
  process.exit(1);
}

fixTeacherRole(email); 