/**
 * Firebase Configuration - Israel Cyber Academy
 * 
 * This file configures Firebase services for the application:
 * - Firebase Authentication for user management
 * - Firestore Database for user profiles and progress tracking
 * 
 * Firebase Services Used:
 * - Authentication: User login, registration, and session management
 * - Firestore: User profiles, lesson progress, and analytics data
 * 
 * Security Note: In production, these API keys should be stored in environment variables
 * and not committed to version control.
 */

// src/firebase/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Firebase project configuration
// This contains the project settings and API keys for Firebase services
const firebaseConfig = {
  apiKey: "AIzaSyC35sH38k9co_R0zBsbDT0S6RE1Cp-ksHE",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.firebasestorage.app",
  messagingSenderId: "750693821908",
  appId: "1:750693821908:web:6518d1facad1d8095cfa41"
};

// Debug: Log the configuration (remove this in production)
console.log('🔥 Firebase Config:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
  apiKey: firebaseConfig.apiKey ? '***' + firebaseConfig.apiKey.slice(-4) : 'undefined'
});

// Initialize Firebase app with configuration
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('✅ Firebase app initialized successfully');
} catch (error) {
  console.error('❌ Firebase app initialization failed:', error);
  throw error;
}

// Initialize Firebase services
let auth, db;
try {
  auth = getAuth(app); // Authentication service
  db = getFirestore(app); // Firestore database service
  console.log('✅ Firebase services initialized:', {
    auth: !!auth,
    firestore: !!db
  });
} catch (error) {
  console.error('❌ Firebase services initialization failed:', error);
  throw error;
}

// Enhanced diagnostic function for Firestore connectivity
export const diagnoseFirestoreConnection = async () => {
  console.log('🔍 Starting Firestore connection diagnosis...');
  
  try {
    // Test 1: Check if Firestore is accessible
    console.log('📋 Test 1: Checking Firestore accessibility...');
    const { collection, getDocs } = await import('firebase/firestore');
    
    // Try to read from a test collection
    const testCollection = collection(db, '_test_connection');
    console.log('✅ Firestore collection reference created successfully');
    
    // Test 2: Try to get documents (this will fail if database doesn't exist or rules block access)
    console.log('📋 Test 2: Testing document read access...');
    try {
      const snapshot = await getDocs(testCollection);
      console.log('✅ Firestore read access successful');
      console.log('📊 Documents in test collection:', snapshot.size);
    } catch (readError) {
      console.warn('⚠️ Firestore read test failed:', readError.message);
      
      // Check if it's a permissions error vs database not existing
      if (readError.code === 'permission-denied') {
        console.error('❌ Firestore Security Rules are blocking access');
        console.log('💡 Solution: Update Firestore security rules to allow read/write');
        console.log('💡 Go to Firebase Console > Firestore Database > Rules');
        console.log('💡 Use these development rules:');
        console.log(`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
        `);
      } else if (readError.code === 'not-found') {
        console.error('❌ Firestore database not found');
        console.log('💡 Solution: Create Firestore database in Firebase Console');
        console.log('💡 Go to: https://console.firebase.google.com/project/israel-cyber-academy/firestore');
        console.log('💡 Click "Create Database" > "Start in test mode" > Choose location > "Done"');
      } else {
        console.error('❌ Unknown Firestore error:', readError.code, readError.message);
        console.log('💡 This might be a database creation issue');
        console.log('💡 Please create the Firestore database first');
      }
    }
    
    // Test 3: Check project configuration
    console.log('📋 Test 3: Verifying project configuration...');
    console.log('🔧 Project ID:', firebaseConfig.projectId);
    console.log('🔧 Auth Domain:', firebaseConfig.authDomain);
    console.log('🔧 API Key present:', !!firebaseConfig.apiKey);
    
    return {
      success: true,
      projectId: firebaseConfig.projectId,
      authDomain: firebaseConfig.authDomain,
      hasApiKey: !!firebaseConfig.apiKey
    };
    
  } catch (error) {
    console.error('❌ Firestore diagnosis failed:', error);
    return {
      success: false,
      error: error.message,
      code: error.code
    };
  }
};

// Export the services
export { auth, db };
