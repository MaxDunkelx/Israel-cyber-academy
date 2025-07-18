/**
 * Test Authentication Flow - Israel Cyber Academy
 * 
 * Diagnostic script to test the authentication flow for specific users
 * and identify any issues with the login/redirect process
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  const serviceAccount = require('../service-account-key.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'israel-cyber-academy'
  });
}

const auth = admin.auth();
const cybercampusDb = admin.firestore();
cybercampusDb.settings({ databaseId: 'cyber-campus' });

async function testUserAuthentication(userEmail) {
  console.log('🧪 Testing authentication flow for:', userEmail);
  console.log('=' .repeat(60));
  
  try {
    // Step 1: Check Firebase Auth
    console.log('📋 Step 1: Checking Firebase Auth...');
    let firebaseUser;
    try {
      firebaseUser = await auth.getUserByEmail(userEmail);
      console.log('✅ Firebase Auth found:', {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        disabled: firebaseUser.disabled,
        emailVerified: firebaseUser.emailVerified
      });
    } catch (authError) {
      console.log('❌ Firebase Auth not found:', authError.message);
      return;
    }

    // Step 2: Check Firestore database
    console.log('\n📋 Step 2: Checking Firestore database...');
    const usersRef = cybercampusDb.collection('users');
    const emailQuery = usersRef.where('email', '==', userEmail);
    const querySnapshot = await emailQuery.get();
    
    if (querySnapshot.empty) {
      console.log('❌ User not found in Firestore database');
      return;
    }
    
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    console.log('✅ Firestore user found:', {
      id: userDoc.id,
      email: userData.email,
      role: userData.role,
      hasFirebaseAuth: userData.hasFirebaseAuth,
      authUid: userData.authUid || 'Not set'
    });

    // Step 3: Test role-based redirect logic
    console.log('\n📋 Step 3: Testing redirect logic...');
    const dashboards = {
      student: '/student/roadmap',
      teacher: '/teacher/dashboard',
      system_manager: '/system-manager/dashboard'
    };
    
    const expectedRedirect = dashboards[userData.role];
    if (expectedRedirect) {
      console.log('✅ Role-based redirect should be:', expectedRedirect);
    } else {
      console.log('❌ Invalid role or missing redirect for role:', userData.role);
    }

    // Step 4: Check for potential issues
    console.log('\n📋 Step 4: Checking for potential issues...');
    const issues = [];
    
    if (firebaseUser.disabled) {
      issues.push('Firebase Auth account is disabled');
    }
    
    if (!userData.role) {
      issues.push('Missing role field in Firestore');
    } else if (!['student', 'teacher', 'system_manager'].includes(userData.role)) {
      issues.push(`Invalid role: ${userData.role}`);
    }
    
    if (!userData.hasFirebaseAuth) {
      issues.push('hasFirebaseAuth field is false (should be true)');
    }
    
    if (firebaseUser.uid !== userData.authUid) {
      issues.push(`Firebase UID mismatch: Auth=${firebaseUser.uid}, DB=${userData.authUid}`);
    }

    if (issues.length === 0) {
      console.log('✅ No issues found - authentication should work correctly');
    } else {
      console.log('⚠️  Issues found:');
      issues.forEach(issue => console.log(`   - ${issue}`));
    }

    return {
      success: true,
      firebaseUser,
      userData,
      expectedRedirect,
      issues
    };

  } catch (error) {
    console.error('❌ Test failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

async function testMultipleUsers() {
  console.log('🧪 Testing authentication flow for multiple users...\n');
  
  const testUsers = [
    'student001@cyber.academy',
    'student120@cyber.academy', // One that showed as having auth
    'student122@cyber.academy', // One that showed as not having auth
    'teacher01@cyber.academy',
    'manager01@cyber.academy'
  ];

  for (const email of testUsers) {
    await testUserAuthentication(email);
    console.log('\n' + '-'.repeat(60) + '\n');
  }
}

async function main() {
  try {
    console.log('🎯 Starting Authentication Flow Diagnostic...\n');
    
    await testMultipleUsers();
    
    console.log('🏁 Authentication Flow Diagnostic Completed!');
    
  } catch (error) {
    console.error('💥 Script failed:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main()
    .then(() => {
      console.log('\n🎯 Script completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Script failed:', error);
      process.exit(1);
    });
}

module.exports = { testUserAuthentication }; 