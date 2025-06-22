/**
 * Fix Teacher Role Script
 * 
 * This script fixes teacher roles in the database.
 * It will set the role to 'teacher' for the specified user.
 * 
 * Usage: node scripts/fix-teacher-role.js [email]
 */

const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, getDoc, setDoc } = require('firebase/firestore');

// Firebase configuration - you'll need to provide the actual values
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "your-api-key",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const EMAIL = 'maxbunnyshow@gmail.com';
const PASSWORD = 'your_password_here'; // You need to provide the actual password

async function fixTeacherRole() {
  try {
    console.log('🔍 Checking teacher role for:', EMAIL);
    
    // Sign in with the user
    console.log('📝 Attempting to sign in...');
    const userCredential = await signInWithEmailAndPassword(auth, EMAIL, PASSWORD);
    const user = userCredential.user;
    
    console.log('✅ Successfully signed in as:', user.email);
    console.log('🆔 User UID:', user.uid);
    
    // Check current role in Firestore
    console.log('📋 Checking current user data in Firestore...');
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log('📊 Current user data:', userData);
      
      if (userData.role === 'teacher') {
        console.log('✅ User already has teacher role!');
        console.log('🎯 User is ready to access teacher console at /teacher');
        return;
      } else {
        console.log('⚠️ User has role:', userData.role, '- updating to teacher...');
      }
    } else {
      console.log('📝 User document doesn\'t exist - creating with teacher role...');
    }
    
    // Update or create user document with teacher role
    const newUserData = {
      email: user.email,
      role: 'teacher',
      displayName: user.displayName || 'Teacher',
      createdAt: new Date(),
      updatedAt: new Date(),
      permissions: ['view_dashboard', 'manage_students', 'view_analytics', 'manage_classes', 'preview_lessons', 'add_notes'],
      isActive: true,
      teacherId: user.uid,
      teacherEmail: user.email
    };
    
    console.log('💾 Saving teacher role to Firestore...');
    await setDoc(userDocRef, newUserData, { merge: true });
    
    console.log('✅ Successfully updated user to teacher role!');
    console.log('📋 Updated user data:', newUserData);
    console.log('🎯 User can now access teacher console at /teacher');
    console.log('🔗 Teacher URL: http://localhost:5173/teacher');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.code === 'auth/user-not-found') {
      console.log('💡 User not found. Please create the user first in Firebase Auth.');
      console.log('🔗 Go to: https://console.firebase.google.com/project/YOUR_PROJECT/authentication/users');
    } else if (error.code === 'auth/wrong-password') {
      console.log('💡 Wrong password. Please provide the correct password in the script.');
      console.log('🔧 Update the PASSWORD variable in the script with the correct password.');
    } else if (error.code === 'auth/invalid-email') {
      console.log('💡 Invalid email format.');
    } else {
      console.log('💡 Unknown error. Check your Firebase configuration.');
    }
    
    console.log('\n🔧 To fix this:');
    console.log('1. Make sure the user exists in Firebase Auth');
    console.log('2. Update the PASSWORD variable with the correct password');
    console.log('3. Check your Firebase configuration');
  }
}

// Run the function
console.log('🚀 Starting teacher role fix...');
console.log('📧 Email:', EMAIL);
console.log('🔧 Make sure to update the PASSWORD variable with the correct password!\n');

fixTeacherRole(); 