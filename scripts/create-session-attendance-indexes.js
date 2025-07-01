/**
 * Create Firestore Indexes for Session Attendance
 * 
 * This script creates the necessary Firestore indexes for efficient
 * session attendance queries and real-time updates.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log('🔧 Creating Firestore Indexes for Session Attendance');
console.log('==================================================\n');

/**
 * Index configurations for session attendance
 */
const sessionIndexes = [
  {
    collectionGroup: 'sessions',
    queryScope: 'COLLECTION',
    fields: [
      { fieldPath: 'teacherId', order: 'ASCENDING' },
      { fieldPath: 'status', order: 'ASCENDING' },
      { fieldPath: 'startTime', order: 'DESCENDING' }
    ]
  },
  {
    collectionGroup: 'sessions',
    queryScope: 'COLLECTION',
    fields: [
      { fieldPath: 'teacherId', order: 'ASCENDING' },
      { fieldPath: 'classId', order: 'ASCENDING' },
      { fieldPath: 'startTime', order: 'DESCENDING' }
    ]
  },
  {
    collectionGroup: 'sessions',
    queryScope: 'COLLECTION',
    fields: [
      { fieldPath: 'status', order: 'ASCENDING' },
      { fieldPath: 'startTime', order: 'DESCENDING' }
    ]
  },
  {
    collectionGroup: 'sessions',
    queryScope: 'COLLECTION',
    fields: [
      { fieldPath: 'studentIds', order: 'ASCENDING' },
      { fieldPath: 'startTime', order: 'DESCENDING' }
    ]
  }
];

/**
 * Index configurations for user queries
 */
const userIndexes = [
  {
    collectionGroup: 'users',
    queryScope: 'COLLECTION',
    fields: [
      { fieldPath: 'teacherId', order: 'ASCENDING' },
      { fieldPath: 'role', order: 'ASCENDING' },
      { fieldPath: 'lastActivityAt', order: 'DESCENDING' }
    ]
  },
  {
    collectionGroup: 'users',
    queryScope: 'COLLECTION',
    fields: [
      { fieldPath: 'classId', order: 'ASCENDING' },
      { fieldPath: 'role', order: 'ASCENDING' },
      { fieldPath: 'progress', order: 'DESCENDING' }
    ]
  }
];

/**
 * Index configurations for class queries
 */
const classIndexes = [
  {
    collectionGroup: 'classes',
    queryScope: 'COLLECTION',
    fields: [
      { fieldPath: 'teacherId', order: 'ASCENDING' },
      { fieldPath: 'isActive', order: 'ASCENDING' },
      { fieldPath: 'createdAt', order: 'DESCENDING' }
    ]
  }
];

/**
 * Display index creation instructions
 */
const displayIndexInstructions = () => {
  console.log('📋 Firestore Index Configuration Instructions');
  console.log('============================================\n');
  
  console.log('🔗 Go to your Firebase Console:');
  console.log('   https://console.firebase.google.com/project/' + process.env.VITE_FIREBASE_PROJECT_ID + '/firestore/indexes\n');
  
  console.log('📝 Create the following indexes manually in the Firebase Console:\n');
  
  console.log('1️⃣ Sessions Collection Indexes:');
  sessionIndexes.forEach((index, i) => {
    console.log(`   Index ${i + 1}:`);
    console.log(`   Collection: sessions`);
    console.log(`   Fields: ${index.fields.map(f => `${f.fieldPath} (${f.order})`).join(', ')}`);
    console.log('');
  });
  
  console.log('2️⃣ Users Collection Indexes:');
  userIndexes.forEach((index, i) => {
    console.log(`   Index ${i + 1}:`);
    console.log(`   Collection: users`);
    console.log(`   Fields: ${index.fields.map(f => `${f.fieldPath} (${f.order})`).join(', ')}`);
    console.log('');
  });
  
  console.log('3️⃣ Classes Collection Indexes:');
  classIndexes.forEach((index, i) => {
    console.log(`   Index ${i + 1}:`);
    console.log(`   Collection: classes`);
    console.log(`   Fields: ${index.fields.map(f => `${f.fieldPath} (${f.order})`).join(', ')}`);
    console.log('');
  });
  
  console.log('⚠️  Important Notes:');
  console.log('   • These indexes are required for efficient session attendance queries');
  console.log('   • Index creation may take a few minutes');
  console.log('   • You will see "Missing Index" errors in the console until indexes are created');
  console.log('   • After creating indexes, restart your development server');
  console.log('');
  
  console.log('🚀 Next Steps:');
  console.log('   1. Create the indexes in Firebase Console');
  console.log('   2. Wait for indexes to be built (check the "Indexes" tab)');
  console.log('   3. Run: npm run dev');
  console.log('   4. Test session attendance tracking in your teacher dashboard');
  console.log('');
};

/**
 * Check if indexes are needed
 */
const checkIndexRequirements = () => {
  console.log('🔍 Checking index requirements...\n');
  
  console.log('✅ The following queries require indexes:');
  console.log('   • Sessions by teacherId and status');
  console.log('   • Sessions by teacherId and classId');
  console.log('   • Sessions by status and startTime');
  console.log('   • Sessions by studentIds (array contains)');
  console.log('   • Users by teacherId and role');
  console.log('   • Users by classId and role');
  console.log('   • Classes by teacherId and isActive');
  console.log('');
  
  console.log('📊 These indexes will enable:');
  console.log('   • Fast session attendance queries');
  console.log('   • Real-time session updates');
  console.log('   • Efficient student progress tracking');
  console.log('   • Quick class analytics');
  console.log('');
};

/**
 * Main execution
 */
const main = async () => {
  try {
    console.log('🚀 Starting Firestore Index Setup for Session Attendance...\n');
    
    checkIndexRequirements();
    displayIndexInstructions();
    
    console.log('🎉 Index configuration instructions generated!');
    console.log('\n💡 Follow the instructions above to create the required indexes.');
    console.log('   This will ensure optimal performance for session attendance tracking.');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
};

// Run the setup
main(); 