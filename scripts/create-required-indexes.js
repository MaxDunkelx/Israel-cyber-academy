/**
 * Create Required Firestore Indexes
 * 
 * This script helps create all the required Firestore indexes for the Israel Cyber Academy.
 * Run this script to ensure all queries work properly.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, orderBy, getDocs, writeBatch, doc } from 'firebase/firestore';
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

console.log('🚀 Firestore Index Setup Script');
console.log('================================\n');

console.log('📋 Required Indexes to Create:\n');

const requiredIndexes = [
  {
    name: 'Slides by lessonId and order',
    collection: 'slides',
    fields: [
      { field: 'lessonId', order: 'Ascending' },
      { field: 'order', order: 'Ascending' }
    ],
    description: 'For querying slides by lesson with ordering',
    directLink: 'https://console.firebase.google.com/v1/r/project/israel-cyber-academy/firestore/indexes?create_composite=ClNwcm9qZWN0cy9pc3JhZWwtY3liZXItYWNhZGVteS9kYXRhYmFzZXMvKGRlZmF1bHQpL2NvbGxlY3Rpb25Hcm91cHMvc2xpZGVzL2luZGV4ZXMvXxABGgwKCGxlc3NvbklkEAEaCQoFb3JkZXIQARoMCghfX25hbWVfXxAB'
  },
  {
    name: 'Sessions by status and createdAt',
    collection: 'sessions',
    fields: [
      { field: 'status', order: 'Ascending' },
      { field: 'createdAt', order: 'Descending' }
    ],
    description: 'For querying sessions by status with date ordering'
  },
  {
    name: 'User Progress by userId and completedAt',
    collection: 'userProgress',
    fields: [
      { field: 'userId', order: 'Ascending' },
      { field: 'completedAt', order: 'Descending' }
    ],
    description: 'For querying user progress with completion date ordering'
  },
  {
    name: 'System Logs by severity and timestamp',
    collection: 'systemLogs',
    fields: [
      { field: 'severity', order: 'Ascending' },
      { field: 'timestamp', order: 'Descending' }
    ],
    description: 'For querying system logs by severity with timestamp ordering'
  },
  {
    name: 'Lessons by category and order',
    collection: 'lessons',
    fields: [
      { field: 'category', order: 'Ascending' },
      { field: 'order', order: 'Ascending' }
    ],
    description: 'For querying lessons by category with ordering'
  }
];

requiredIndexes.forEach((index, i) => {
  console.log(`${i + 1}. ${index.name}`);
  console.log(`   Collection: ${index.collection}`);
  console.log(`   Fields: ${index.fields.map(f => `${f.field} (${f.order})`).join(', ')}`);
  console.log(`   Description: ${index.description}`);
  if (index.directLink) {
    console.log(`   Direct Link: ${index.directLink}`);
  }
  console.log('');
});

console.log('🔧 Steps to Create Indexes:');
console.log('1. Go to Firebase Console: https://console.firebase.google.com/');
console.log('2. Select project: israel-cyber-academy');
console.log('3. Go to Firestore Database > Indexes');
console.log('4. Click "Create Index" for each required index above');
console.log('5. Wait 2-5 minutes for indexes to build\n');

console.log('💡 Quick Links:');
console.log('Main Indexes Page: https://console.firebase.google.com/project/israel-cyber-academy/firestore/indexes');
console.log('Slides Index (Direct): https://console.firebase.google.com/v1/r/project/israel-cyber-academy/firestore/indexes?create_composite=ClNwcm9qZWN0cy9pc3JhZWwtY3liZXItYWNhZGVteS9kYXRhYmFzZXMvKGRlZmF1bHQpL2NvbGxlY3Rpb25Hcm91cHMvc2xpZGVzL2luZGV4ZXMvXxABGgwKCGxlc3NvbklkEAEaCQoFb3JkZXIQARoMCghfX25hbWVfXxAB\n');

console.log('⏱️  After creating indexes:');
console.log('   - Wait 2-5 minutes for indexes to build');
console.log('   - Test your application');
console.log('   - All slide and lesson operations should work perfectly\n');

console.log('🚀 Ready to create the indexes? Use the links above!'); 