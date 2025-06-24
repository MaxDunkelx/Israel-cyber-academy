/**
 * Test System Manager Login Script
 * 
 * This script tests the system manager login process and role detection
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxJjowL60YhAxPHWzOOSESOjMIfXj5pXk",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "1098765432109",
  appId: "1:1098765432109:web:abcdef1234567890"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const SYSTEM_MANAGER_EMAIL = 'maxibunnyshow@gmail.com';

async function testSystemManagerLogin() {
  try {
    console.log('🧪 Testing system manager login process...\n');

    // Step 1: Check if user exists in Firestore
    console.log('1️⃣ Checking user in Firestore...');
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', SYSTEM_MANAGER_EMAIL));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('❌ User not found in Firestore');
      return;
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    
    console.log('✅ User found in Firestore:');
    console.log(`   UID: ${userDoc.id}`);
    console.log(`   Email: ${userData.email}`);
    console.log(`   Role: ${userData.role}`);
    console.log(`   Display Name: ${userData.displayName}`);
    console.log(`   Permissions: ${userData.systemManagerPermissions?.length || 0} permissions`);

    // Step 2: Test Firebase Auth login (this would require a password)
    console.log('\n2️⃣ Firebase Auth status:');
    console.log('   Note: Cannot test actual login without password');
    console.log('   But user should exist in Firebase Auth if registered');

    // Step 3: Simulate the role detection process
    console.log('\n3️⃣ Simulating role detection process...');
    
    // This simulates what happens in AuthContext
    const role = userData.role;
    console.log(`   Detected role: ${role}`);
    
    if (role === 'system_manager') {
      console.log('✅ Role detection: system_manager');
      console.log('✅ Should redirect to: /system-manager/dashboard');
    } else if (role === 'teacher') {
      console.log('⚠️ Role detection: teacher');
      console.log('⚠️ Should redirect to: /teacher/dashboard');
    } else if (role === 'student') {
      console.log('⚠️ Role detection: student');
      console.log('⚠️ Should redirect to: /student/roadmap');
    } else {
      console.log('❌ Role detection: unknown');
      console.log('❌ Should redirect to: /student/roadmap (default)');
    }

    // Step 4: Check if the user has the correct permissions
    console.log('\n4️⃣ Checking system manager permissions...');
    
    if (userData.systemManagerPermissions) {
      console.log('✅ System manager permissions found:');
      userData.systemManagerPermissions.forEach(permission => {
        console.log(`   - ${permission}`);
      });
    } else {
      console.log('❌ No system manager permissions found');
    }

    // Step 5: Check system manager settings
    console.log('\n5️⃣ Checking system manager settings...');
    
    if (userData.systemManagerSettings) {
      console.log('✅ System manager settings found:');
      console.log(`   Default Language: ${userData.systemManagerSettings.defaultLanguage}`);
      console.log(`   Email Notifications: ${userData.systemManagerSettings.notificationPreferences?.emailNotifications}`);
    } else {
      console.log('❌ No system manager settings found');
    }

    console.log('\n🎉 System manager user test completed!');
    console.log('💡 If role is system_manager, login should work correctly');
    console.log('💡 If role is not system_manager, run the fix-system-manager.js script');

  } catch (error) {
    console.error('❌ Error testing system manager login:', error);
    console.error('Error details:', {
      code: error.code,
      message: error.message
    });
  }
}

// Run the test
testSystemManagerLogin().then(() => {
  console.log('\n🏁 Test completed');
  process.exit(0);
}).catch((error) => {
  console.error('❌ Test failed:', error);
  process.exit(1);
}); 