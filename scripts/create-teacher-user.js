/**
 * Create Teacher User Script
 * 
 * This script creates a teacher user in Firebase for testing purposes.
 * Run this script to create a teacher account that can access the teacher dashboard.
 * 
 * Usage:
 * 1. Make sure you have your .env file with Firebase credentials
 * 2. Run: node scripts/create-teacher-user.js
 */

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Validate environment variables
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN', 
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars);
  console.error('💡 Please check your .env file and ensure all Firebase configuration variables are set.');
  process.exit(1);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Teacher user details
const teacherUser = {
  email: 'maxbunnyshow@gmail.com',
  password: 'M1a2x3d4',
  displayName: 'Max Teacher',
  firstName: 'Max',
  lastName: 'Teacher',
  age: 30,
  sex: 'male',
  role: 'teacher'
};

async function createTeacherUser() {
  try {
    console.log('🚀 Creating teacher user...');
    console.log('📧 Email:', teacherUser.email);
    console.log('👤 Display Name:', teacherUser.displayName);
    console.log('🎭 Role:', teacherUser.role);
    
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      teacherUser.email, 
      teacherUser.password
    );
    
    const user = userCredential.user;
    console.log('✅ User created in Firebase Auth:', user.uid);
    
    // Update display name
    await updateProfile(user, {
      displayName: teacherUser.displayName
    });
    console.log('✅ Display name updated');
    
    // Create comprehensive user profile in Firestore
    const userProfile = {
      uid: user.uid,
      email: user.email,
      displayName: teacherUser.displayName,
      role: teacherUser.role,
      // User credentials
      firstName: teacherUser.firstName,
      lastName: teacherUser.lastName,
      age: teacherUser.age,
      sex: teacherUser.sex,
      // Teacher-specific fields
      teacherClasses: [], // Array of class IDs managed by this teacher
      teacherPermissions: ['manage_students', 'view_analytics', 'add_comments'],
      teacherSettings: {
        defaultClassId: null,
        notificationPreferences: {
          emailNotifications: true,
          studentProgressAlerts: true,
          classUpdates: true
        }
      },
      // Teacher doesn't need progress tracking but keeping for consistency
      progress: {},
      completedLessons: [],
      currentLesson: 1,
      totalTimeSpent: 0,
      totalPagesEngaged: 0,
      achievements: [],
      streak: 0,
      createdAt: new Date(),
      lastLogin: new Date(),
      lastActivityDate: new Date(),
      updatedAt: new Date()
    };
    
    // Store profile in Firestore
    await setDoc(doc(db, 'users', user.uid), userProfile);
    console.log('✅ User profile created in Firestore');
    
    // Grant teacher lesson access
    const { grantTeacherLessonAccess } = await import('../src/firebase/teacher-service.jsx');
    await grantTeacherLessonAccess(user.uid);
    console.log('✅ Teacher lesson access granted');
    
    console.log('\n🎉 Teacher user created successfully!');
    console.log('📋 User Details:');
    console.log('   UID:', user.uid);
    console.log('   Email:', user.email);
    console.log('   Display Name:', teacherUser.displayName);
    console.log('   Role:', teacherUser.role);
    console.log('\n🔗 You can now login to the teacher dashboard at:');
    console.log('   http://localhost:5173/#/teacher');
    console.log('\n📝 Login credentials:');
    console.log('   Email: maxbunnyshow@gmail.com');
    console.log('   Password: M1a2x3d4');
    
  } catch (error) {
    console.error('❌ Error creating teacher user:', error);
    
    if (error.code === 'auth/email-already-in-use') {
      console.log('💡 This email is already registered. You can:');
      console.log('   1. Use a different email address');
      console.log('   2. Reset the password for this account');
      console.log('   3. Delete the existing account and recreate it');
    } else if (error.code === 'auth/weak-password') {
      console.log('💡 Password is too weak. Please use a stronger password.');
    } else if (error.code === 'auth/invalid-email') {
      console.log('💡 Invalid email format.');
    } else {
      console.log('💡 Check your Firebase configuration and network connection.');
    }
  }
}

// Run the script
createTeacherUser(); 