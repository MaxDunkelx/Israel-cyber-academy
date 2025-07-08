/**
 * Firebase Configuration - Israel Cyber Academy
 * 
 * SECURE HYBRID APPROACH:
 * - Uses environment variables when available (for production)
 * - Falls back to hardcoded values (for development/GitHub Pages)
 * - Provides security warnings in production
 * - Maintains 100% compatibility with current system
 * 
 * Firebase Services Used:
 * - Authentication: User login, registration, and session management
 * - Firestore: Lessons, slides, user profiles, progress tracking, and analytics
 * 
 * IMPORTANT FOR PRODUCTION:
 * - Add your domain to Firebase Auth authorized domains
 * - Configure proper Firestore security rules
 * - Set up proper CORS and CSP headers
 */

// src/firebase/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// SECURE: Environment-aware Firebase configuration
const getFirebaseConfig = () => {
  // Check if environment variables are available
  const hasEnvVars = import.meta.env.VITE_FIREBASE_API_KEY;
  
  if (hasEnvVars) {
    // Use environment variables (most secure)
    return {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID
    };
  } else {
    // Fallback to hardcoded values (for GitHub Pages compatibility)
    return {
      apiKey: "AIzaSyC35sH38k9co_R0zBsbDT0S6RE1Cp-ksHE",
      authDomain: "israel-cyber-academy.firebaseapp.com",
      projectId: "israel-cyber-academy",
      storageBucket: "israel-cyber-academy.appspot.com",
      messagingSenderId: "750693821908",
      appId: "1:750693821908:web:6518d1facad1d8095cfa41"
    };
  }
};

const firebaseConfig = getFirebaseConfig();

// Check if we're in development mode
const isDevelopment = typeof import.meta !== 'undefined' && import.meta.env?.DEV;
const isProduction = !isDevelopment;
const usingEnvVars = !!import.meta.env.VITE_FIREBASE_API_KEY;

// Security logging
console.log('🔥 Firebase Config Status:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
  mode: isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION',
  usingEnvVars: usingEnvVars,
  secure: usingEnvVars || isDevelopment
});

// Security warnings
if (isProduction && !usingEnvVars) {
  console.warn('⚠️ SECURITY WARNING: Using hardcoded Firebase config in production!');
  console.warn('💡 For better security, set environment variables:');
  console.warn('   VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, etc.');
  console.warn('💡 Your app will continue working, but consider upgrading security.');
} else if (usingEnvVars) {
  console.log('✅ Using secure environment variables for Firebase config');
}

// Initialize Firebase app
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
  auth = getAuth(app);
  db = getFirestore(app);
  
  // Connect to emulators in development
  if (isDevelopment) {
    // Uncomment these lines if you want to use Firebase emulators
    // connectAuthEmulator(auth, 'http://localhost:9099');
    // connectFirestoreEmulator(db, 'localhost', 8080);
  }
  
  console.log('✅ Firebase services initialized:', {
    auth: !!auth,
    firestore: !!db,
    mode: isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION',
    secure: usingEnvVars || isDevelopment
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
    
    // Test 2: Try to get documents
    console.log('📋 Test 2: Testing document read access...');
    try {
      const snapshot = await getDocs(testCollection);
      console.log('✅ Firestore read access successful');
      console.log('📊 Documents in test collection:', snapshot.size);
    } catch (readError) {
      console.warn('⚠️ Firestore read test failed:', readError.message);
      
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
      allow read, write: if true;
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
      }
    }
    
    // Test 3: Check project configuration
    console.log('📋 Test 3: Verifying project configuration...');
    console.log('🔧 Project ID:', firebaseConfig.projectId);
    console.log('🔧 Auth Domain:', firebaseConfig.authDomain);
    console.log('🔧 API Key present:', !!firebaseConfig.apiKey);
    console.log('🔧 Using Environment Variables:', usingEnvVars);
    
    return {
      success: true,
      projectId: firebaseConfig.projectId,
      authDomain: firebaseConfig.authDomain,
      hasApiKey: !!firebaseConfig.apiKey,
      usingEnvVars: usingEnvVars,
      secure: usingEnvVars || isDevelopment
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
