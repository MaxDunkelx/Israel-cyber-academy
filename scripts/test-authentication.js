/**
 * Authentication Test Script
 * Tests the pure Firestore authentication with the reconstructed database
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC35sH38k9co_R0zBsbDT0S6RE1Cp-ksHE",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "750693821908",
  appId: "1:750693821908:web:6518d1facad1d8095cfa41"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Simple hash function (same as in pure-firestore-auth.js)
const simpleHash = (password) => {
  let hash = 0;
  if (password.length === 0) return hash.toString();
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
};

async function testAuthentication(email, password) {
  console.log(`🔐 Testing authentication for: ${email}`);
  console.log('=' .repeat(60));
  
  try {
    // Step 1: Query user by email
    console.log('📋 Step 1: Querying user by email...');
    const usersRef = collection(db, 'users');
    const emailQuery = query(usersRef, where('email', '==', email.toLowerCase().trim()));
    const querySnapshot = await getDocs(emailQuery);
    
    if (querySnapshot.empty) {
      console.log('❌ No user found with email:', email);
      return false;
    }
    
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    
    console.log('✅ User found:', {
      id: userDoc.id,
      email: userData.email,
      role: userData.role,
      hasPassword: !!userData.password,
      status: userData.status
    });
    
    // Step 2: Check password
    console.log('\n📋 Step 2: Checking password...');
    console.log('   Stored password:', userData.password);
    console.log('   Input password:', password);
    console.log('   Hashed input:', simpleHash(password));
    
    if (!userData.password) {
      console.log('❌ User has no password field');
      return false;
    }
    
    const isPasswordValid = userData.password === password || userData.password === simpleHash(password);
    console.log('   Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('❌ Invalid password');
      return false;
    }
    
    // Step 3: Check user status
    console.log('\n📋 Step 3: Checking user status...');
    if (userData.status === 'inactive' || userData.isDisabled) {
      console.log('❌ User account is disabled');
      return false;
    }
    
    console.log('✅ User account is active');
    
    // Step 4: Create session object
    console.log('\n📋 Step 4: Creating session object...');
    const userSession = {
      id: userDoc.id,
      email: userData.email,
      displayName: userData.displayName || `${userData.firstName || ''} ${userData.lastName || ''}`.trim(),
      role: userData.role,
      firstName: userData.firstName,
      lastName: userData.lastName,
      school: userData.school,
      grade: userData.grade,
      classId: userData.classId,
      teacherId: userData.teacherId,
      isAuthenticated: true,
      authenticatedAt: new Date().toISOString(),
      sessionId: `session_${Date.now()}_${userDoc.id}`
    };
    
    console.log('✅ Authentication successful!');
    console.log('👤 User session:', {
      id: userSession.id,
      email: userSession.email,
      displayName: userSession.displayName,
      role: userSession.role
    });
    
    return true;
    
  } catch (error) {
    console.error('❌ Authentication test failed:', error);
    return false;
  }
}

async function runAuthenticationTests() {
  console.log('🧪 Running authentication tests...\n');
  
  const testUsers = [
    { email: 'student001@cyber.academy', password: 'password123', expectedRole: 'student' },
    { email: 'teacher01@cyber.academy', password: 'password123', expectedRole: 'teacher' },
    { email: 'manager01@cyber.academy', password: 'password123', expectedRole: 'system_manager' }
  ];
  
  let successCount = 0;
  let totalCount = testUsers.length;
  
  for (const testUser of testUsers) {
    console.log(`\n🧪 Testing: ${testUser.email}`);
    const success = await testAuthentication(testUser.email, testUser.password);
    
    if (success) {
      successCount++;
      console.log(`✅ PASS: ${testUser.email} (${testUser.expectedRole})`);
    } else {
      console.log(`❌ FAIL: ${testUser.email} (${testUser.expectedRole})`);
    }
    
    console.log('-'.repeat(60));
  }
  
  // Summary
  console.log('\n📊 AUTHENTICATION TEST SUMMARY:');
  console.log('=' .repeat(50));
  console.log(`✅ Successful: ${successCount}/${totalCount}`);
  console.log(`❌ Failed: ${totalCount - successCount}/${totalCount}`);
  
  if (successCount === totalCount) {
    console.log('\n🎉 ALL AUTHENTICATION TESTS PASSED!');
    console.log('✅ Pure Firestore authentication is working correctly.');
  } else {
    console.log('\n⚠️  SOME AUTHENTICATION TESTS FAILED!');
    console.log('Please check the user data and authentication logic.');
  }
  
  return successCount === totalCount;
}

// Run tests
runAuthenticationTests().then((allPassed) => {
  console.log('\n🔍 Authentication testing completed!');
  process.exit(allPassed ? 0 : 1);
}).catch((error) => {
  console.error('❌ Authentication testing failed:', error);
  process.exit(1);
}); 