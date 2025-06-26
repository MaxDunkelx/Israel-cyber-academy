/**
 * Firestore Indexes Setup Script
 * 
 * This script creates the required composite indexes for the Israel Cyber Academy application.
 * Run this script to ensure all queries work properly.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
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

/**
 * Test queries to trigger index creation
 */
const testIndexes = async () => {
  console.log('🔧 Testing Firestore indexes...\n');

  try {
    // Test 1: Slides by lessonId with orderBy
    console.log('📋 Testing slides query (lessonId + order)...');
    try {
      const slidesQuery = query(
        collection(db, 'slides'),
        where('lessonId', '==', 'test'),
        orderBy('order', 'asc')
      );
      await getDocs(slidesQuery);
      console.log('✅ Slides index test passed');
    } catch (error) {
      if (error.message.includes('index')) {
        console.log('⚠️  Slides index needed. Please create this index:');
        console.log('Collection: slides');
        console.log('Fields: lessonId (Ascending), order (Ascending)');
        console.log('Direct link: https://console.firebase.google.com/v1/r/project/israel-cyber-academy/firestore/indexes?create_composite=ClNwcm9qZWN0cy9pc3JhZWwtY3liZXItYWNhZGVteS9kYXRhYmFzZXMvKGRlZmF1bHQpL2NvbGxlY3Rpb25Hcm91cHMvc2xpZGVzL2luZGV4ZXMvXxABGgwKCGxlc3NvbklkEAEaCQoFb3JkZXIQARoMCghfX25hbWVfXxAB');
      } else {
        console.log('❌ Slides index test failed:', error.message);
      }
    }

    // Test 2: Sessions by status with orderBy
    console.log('\n📊 Testing sessions query (status + createdAt)...');
    try {
      const sessionsQuery = query(
        collection(db, 'sessions'),
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc')
      );
      await getDocs(sessionsQuery);
      console.log('✅ Sessions index test passed');
    } catch (error) {
      if (error.message.includes('index')) {
        console.log('⚠️  Sessions index needed. Please create this index:');
        console.log('Collection: sessions');
        console.log('Fields: status (Ascending), createdAt (Descending)');
      } else {
        console.log('❌ Sessions index test failed:', error.message);
      }
    }

    // Test 3: User progress by userId with orderBy
    console.log('\n👤 Testing user progress query (userId + completedAt)...');
    try {
      const progressQuery = query(
        collection(db, 'userProgress'),
        where('userId', '==', 'test'),
        orderBy('completedAt', 'desc')
      );
      await getDocs(progressQuery);
      console.log('✅ User progress index test passed');
    } catch (error) {
      if (error.message.includes('index')) {
        console.log('⚠️  User progress index needed. Please create this index:');
        console.log('Collection: userProgress');
        console.log('Fields: userId (Ascending), completedAt (Descending)');
      } else {
        console.log('❌ User progress index test failed:', error.message);
      }
    }

    // Test 4: System logs by severity with orderBy
    console.log('\n📝 Testing system logs query (severity + timestamp)...');
    try {
      const logsQuery = query(
        collection(db, 'systemLogs'),
        where('severity', '==', 'error'),
        orderBy('timestamp', 'desc')
      );
      await getDocs(logsQuery);
      console.log('✅ System logs index test passed');
    } catch (error) {
      if (error.message.includes('index')) {
        console.log('⚠️  System logs index needed. Please create this index:');
        console.log('Collection: systemLogs');
        console.log('Fields: severity (Ascending), timestamp (Descending)');
      } else {
        console.log('❌ System logs index test failed:', error.message);
      }
    }

    // Test 5: Lessons by category with orderBy
    console.log('\n📚 Testing lessons query (category + order)...');
    try {
      const lessonsQuery = query(
        collection(db, 'lessons'),
        where('category', '==', 'cybersecurity'),
        orderBy('order', 'asc')
      );
      await getDocs(lessonsQuery);
      console.log('✅ Lessons index test passed');
    } catch (error) {
      if (error.message.includes('index')) {
        console.log('⚠️  Lessons index needed. Please create this index:');
        console.log('Collection: lessons');
        console.log('Fields: category (Ascending), order (Ascending)');
      } else {
        console.log('❌ Lessons index test failed:', error.message);
      }
    }

  } catch (error) {
    console.error('❌ Index test failed:', error);
  }
};

/**
 * Create indexes manually using Firebase Admin SDK
 * Note: This requires Firebase Admin SDK and proper permissions
 */
const createIndexesManually = async () => {
  console.log('\n🔧 Attempting to create indexes manually...');
  
  // This would require Firebase Admin SDK
  // For now, we'll provide instructions
  console.log('📋 Manual index creation instructions:');
  console.log('1. Go to Firebase Console: https://console.firebase.google.com/');
  console.log('2. Select your project: israel-cyber-academy');
  console.log('3. Go to Firestore Database > Indexes');
  console.log('4. Click "Create Index"');
  console.log('5. Create the following composite indexes:');
  
  const requiredIndexes = [
    {
      collection: 'slides',
      fields: [
        { field: 'lessonId', order: 'Ascending' },
        { field: 'order', order: 'Ascending' }
      ],
      description: 'For querying slides by lesson with ordering'
    },
    {
      collection: 'sessions',
      fields: [
        { field: 'status', order: 'Ascending' },
        { field: 'createdAt', order: 'Descending' }
      ],
      description: 'For querying sessions by status with date ordering'
    },
    {
      collection: 'userProgress',
      fields: [
        { field: 'userId', order: 'Ascending' },
        { field: 'completedAt', order: 'Descending' }
      ],
      description: 'For querying user progress with completion date ordering'
    },
    {
      collection: 'systemLogs',
      fields: [
        { field: 'severity', order: 'Ascending' },
        { field: 'timestamp', order: 'Descending' }
      ],
      description: 'For querying system logs by severity with timestamp ordering'
    },
    {
      collection: 'lessons',
      fields: [
        { field: 'category', order: 'Ascending' },
        { field: 'order', order: 'Ascending' }
      ],
      description: 'For querying lessons by category with ordering'
    }
  ];

  requiredIndexes.forEach((index, i) => {
    console.log(`\n${i + 1}. Collection: ${index.collection}`);
    console.log(`   Fields: ${index.fields.map(f => `${f.field} (${f.order})`).join(', ')}`);
    console.log(`   Description: ${index.description}`);
  });

  console.log('\n💡 Quick Links:');
  console.log('Slides Index: https://console.firebase.google.com/v1/r/project/israel-cyber-academy/firestore/indexes?create_composite=ClNwcm9qZWN0cy9pc3JhZWwtY3liZXItYWNhZGVteS9kYXRhYmFzZXMvKGRlZmF1bHQpL2NvbGxlY3Rpb25Hcm91cHMvc2xpZGVzL2luZGV4ZXMvXxABGgwKCGxlc3NvbklkEAEaCQoFb3JkZXIQARoMCghfX25hbWVfXxAB');
};

/**
 * Main function
 */
const main = async () => {
  console.log('🚀 Firestore Indexes Setup Script');
  console.log('================================\n');

  // Test existing indexes
  await testIndexes();

  // Provide manual creation instructions
  await createIndexesManually();

  console.log('\n✅ Index setup script completed!');
  console.log('📝 Please create the required indexes in Firebase Console');
  console.log('🔄 After creating indexes, wait a few minutes for them to build');
  console.log('🎯 Then test your application again');
};

// Run the script
main().catch(console.error); 