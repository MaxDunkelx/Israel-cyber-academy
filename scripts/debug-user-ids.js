/**
 * Debug User IDs Script
 * 
 * This script helps debug the issue with EditUserModal by showing
 * the actual document IDs and user data structure.
 * 
 * Usage: node scripts/debug-user-ids.js
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
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
  process.exit(1);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function debugUserIds() {
  try {
    console.log('🔍 Debugging User IDs and Data Structure...\n');
    
    // Fetch all users from Firebase (same as UserManagement component)
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    
    console.log(`📊 Found ${querySnapshot.size} users:\n`);
    
    const users = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const user = {
        documentId: doc.id, // This is the actual Firestore document ID
        uid: doc.id, // This is what the component sets
        ...data,
        // Ensure dates are properly converted
        createdAt: data.createdAt?.toDate?.() || data.createdAt || new Date(),
        lastLogin: data.lastLogin?.toDate?.() || data.lastLogin || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt || new Date()
      };
      users.push(user);
    });

    // Sort users by display name (same as component)
    users.sort((a, b) => {
      const nameA = a.displayName || a.email || '';
      const nameB = b.displayName || b.email || '';
      return nameA.localeCompare(nameB);
    });

    // Display each user's data structure
    users.forEach((user, index) => {
      console.log(`👤 User ${index + 1}:`);
      console.log(`   Document ID: "${user.documentId}"`);
      console.log(`   UID (from component): "${user.uid}"`);
      console.log(`   Display Name: "${user.displayName}"`);
      console.log(`   Email: "${user.email}"`);
      console.log(`   Role: "${user.role}"`);
      console.log(`   Firebase Auth UID: "${user.uid}"`);
      console.log(`   Has teacherId: ${!!user.teacherId}`);
      console.log(`   Teacher ID: "${user.teacherId || 'None'}"`);
      console.log('');
    });

    // Check for potential issues
    console.log('🔍 Potential Issues:');
    
    // Check if any user has display name as document ID
    const problematicUsers = users.filter(user => 
      user.documentId === user.displayName || 
      user.documentId === user.email
    );
    
    if (problematicUsers.length > 0) {
      console.log('❌ Found users with problematic document IDs:');
      problematicUsers.forEach(user => {
        console.log(`   - Document ID: "${user.documentId}"`);
        console.log(`   - Display Name: "${user.displayName}"`);
        console.log(`   - Email: "${user.email}"`);
      });
    } else {
      console.log('✅ All document IDs look correct');
    }

    // Check for duplicate UIDs
    const uids = users.map(u => u.uid);
    const duplicateUids = uids.filter((uid, index) => uids.indexOf(uid) !== index);
    
    if (duplicateUids.length > 0) {
      console.log('❌ Found duplicate UIDs:');
      duplicateUids.forEach(uid => {
        console.log(`   - UID: "${uid}"`);
      });
    } else {
      console.log('✅ No duplicate UIDs found');
    }

    // Test the exact query that EditUserModal would use
    console.log('\n🧪 Testing EditUserModal Query:');
    const testUser = users[0]; // Use first user for testing
    if (testUser) {
      console.log(`Testing update for user: ${testUser.displayName}`);
      console.log(`Document ID: ${testUser.documentId}`);
      console.log(`UID: ${testUser.uid}`);
      
      // This is the exact query that EditUserModal uses
      const testQuery = `doc(db, 'users', '${testUser.uid}')`;
      console.log(`Query: ${testQuery}`);
      
      if (testUser.uid === testUser.documentId) {
        console.log('✅ UID matches document ID - query should work');
      } else {
        console.log('❌ UID does not match document ID - this will cause the error!');
      }
    }

    console.log('\n💡 Recommendations:');
    console.log('1. Make sure all users have proper Firestore document IDs');
    console.log('2. The UID should always be the Firestore document ID');
    console.log('3. Check if any users were created with incorrect document IDs');
    
  } catch (error) {
    console.error('❌ Error debugging user IDs:', error);
  }
}

// Run the debug
debugUserIds()
  .then(() => {
    console.log('\n🎉 Debug completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Debug failed:', error);
    process.exit(1);
  }); 