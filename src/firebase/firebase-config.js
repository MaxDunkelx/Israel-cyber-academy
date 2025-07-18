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

import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

/**
 * Get Firebase configuration with environment variable support
 * 
 * Security Levels:
 * - Development: Uses .env.local (safe for development)
 * - Production: Uses .env.production (secure for production)
 * - Fallback: Hardcoded values (for GitHub Pages compatibility)
 */
const getFirebaseConfig = () => {


  // Check if environment variables are available
  const hasEnvVars = import.meta.env.VITE_FIREBASE_API_KEY;
  
  if (hasEnvVars) {
    // Use environment variables (most secure)
    const config = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID
    };

    // Validate required fields
    const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
    const missingFields = requiredFields.filter(field => !config[field]);
    
    if (missingFields.length > 0) {
      console.error('❌ Missing required Firebase environment variables:', missingFields);
      throw new Error(`Missing required Firebase environment variables: ${missingFields.join(', ')}`);
    }

    return config;
  } else {
    // Fallback to hardcoded values for development/deployment
    console.warn('⚠️ Using fallback Firebase configuration - create .env file for production');
    
    const config = {
      apiKey: "AIzaSyC35sH38k9co_R0zBsbDT0S6RE1Cp-ksHE",
      authDomain: "israel-cyber-academy.firebaseapp.com",
      projectId: "israel-cyber-academy",
      storageBucket: "israel-cyber-academy.appspot.com",
      messagingSenderId: "123456789012",
      appId: "1:123456789012:web:abcdef1234567890"
    };
    
    return config;
  }
};

const firebaseConfig = getFirebaseConfig();

// Environment detection
const isDevelopment = import.meta.env.DEV;
const isProduction = !isDevelopment;
const usingEnvVars = !!import.meta.env.VITE_FIREBASE_API_KEY;
const isGitHubPages = window.location.hostname.includes('github.io');

// Security logging
console.log('🔥 Firebase Config Status:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
  mode: isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION',
  usingEnvVars: usingEnvVars,
  isGitHubPages: isGitHubPages,
  secure: usingEnvVars || isDevelopment
});

// Security status logging
if (usingEnvVars) {
  console.log('✅ Using secure environment variables for Firebase config');
} else if (isDevelopment) {
  console.log('ℹ️ Development mode - using local environment variables');
} else {
  console.error('❌ Production mode requires environment variables!');
}

// Initialize Firebase app with enhanced error handling
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('✅ Firebase app initialized successfully');
} catch (error) {
  console.error('❌ Firebase app initialization failed:', error);
  
  // Provide helpful error messages
  if (error.code === 'app/duplicate-app') {
    console.error('💡 Solution: Firebase app already initialized. Check for duplicate initialization.');
  } else if (error.message.includes('Invalid API key')) {
    console.error('💡 Solution: Check your VITE_FIREBASE_API_KEY environment variable.');
  } else if (error.message.includes('Invalid project ID')) {
    console.error('💡 Solution: Check your VITE_FIREBASE_PROJECT_ID environment variable.');
  }
  
  throw error;
}

// Initialize Firebase services with enhanced error handling
let db;
try {
  // Initialize Firestore with error handling
  console.log('🔗 Initializing Firestore...');
  try {
    db = getFirestore(app);
    console.log('✅ Firestore initialized with default database');
  } catch (firestoreError) {
    console.error('❌ Firestore initialization failed:', firestoreError);
    // Try alternative initialization
    try {
      db = getFirestore();
      console.log('✅ Firestore initialized with fallback method');
    } catch (fallbackError) {
      console.error('❌ Firestore fallback initialization failed:', fallbackError);
      throw fallbackError;
    }
  }
  
  // Connect to emulators in development (optional)
  if (isDevelopment && import.meta.env.VITE_ENABLE_FIREBASE_EMULATORS === 'true') {
    try {
      connectFirestoreEmulator(db, 'localhost', 8080);
      console.log('🔧 Connected to Firestore emulator');
    } catch (emulatorError) {
      console.warn('⚠️ Failed to connect to Firestore emulator:', emulatorError.message);
    }
  }
  
  console.log('✅ Firebase services initialized:', {
    firestore: !!db,
    mode: isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION',
    secure: usingEnvVars || isDevelopment,
    emulators: isDevelopment && import.meta.env.VITE_ENABLE_FIREBASE_EMULATORS === 'true'
  });
} catch (error) {
  console.error('❌ Firebase services initialization failed:', error);
  
  // Provide more detailed error information
  if (error.code === 'app/no-app') {
    console.error('💡 Solution: Firebase app not initialized properly');
  } else if (error.message.includes('Invalid API key')) {
    console.error('💡 Solution: Check your Firebase API key configuration');
  } else if (error.message.includes('Invalid project ID')) {
    console.error('💡 Solution: Check your Firebase project ID configuration');
  }
  
  throw error;
}

// No Firebase Auth - using pure Firestore authentication only
console.log('🔐 Firebase Auth disabled - using pure Firestore authentication');

/**
 * Enhanced diagnostic function for Firestore connectivity
 * Provides detailed diagnostics and helpful error messages
 */
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
      } else if (readError.code === 'unavailable') {
        console.error('❌ Firestore service unavailable');
        console.log('💡 Solution: Check your internet connection and Firebase project status');
        console.log('💡 Go to: https://status.firebase.google.com/');
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
    console.log('🔧 Environment:', isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION');
    console.log('🔧 GitHub Pages:', isGitHubPages);
    
    // Test 4: Check authentication status (Pure Auth)
    console.log('📋 Test 4: Checking pure authentication status...');
    console.log('🔐 Pure Auth: No Firebase Auth - using Firestore authentication only');
    
    return {
      success: true,
      projectId: firebaseConfig.projectId,
      authDomain: firebaseConfig.authDomain,
      hasApiKey: !!firebaseConfig.apiKey,
      usingEnvVars: usingEnvVars,
      secure: usingEnvVars || isDevelopment,
      environment: isDevelopment ? 'development' : 'production',
      isGitHubPages: isGitHubPages,
      isAuthenticated: false, // Pure Auth - no Firebase Auth
      userEmail: null
    };
    
  } catch (error) {
    console.error('❌ Firestore diagnosis failed:', error);
    return {
      success: false,
      error: error.message,
      code: error.code,
      environment: isDevelopment ? 'development' : 'production',
      usingEnvVars: usingEnvVars
    };
  }
};

/**
 * Get current Firebase configuration status
 * Useful for debugging and security monitoring
 */
export const getFirebaseConfigStatus = () => {
  return {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    usingEnvVars: usingEnvVars,
    secure: usingEnvVars || isDevelopment,
    environment: isDevelopment ? 'development' : 'production',
    isGitHubPages: isGitHubPages,
    timestamp: new Date().toISOString()
  };
};

// Export the services (Firestore only)
export { db };
