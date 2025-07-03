/**
 * Network Diagnosis Script for Firestore QUIC Protocol Issues
 * 
 * This script helps diagnose and potentially resolve network connectivity issues
 * that cause ERR_QUIC_PROTOCOL_ERROR with Firestore Listen requests.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, onSnapshot } from 'firebase/firestore';

// Firebase configuration
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

/**
 * Test basic Firestore connectivity
 */
async function testBasicConnectivity() {
  console.log('🔍 Testing basic Firestore connectivity...');
  
  try {
    const testCollection = collection(db, '_test_connection');
    const snapshot = await getDocs(testCollection);
    console.log('✅ Basic connectivity test passed');
    console.log(`📊 Found ${snapshot.size} documents in test collection`);
    return true;
  } catch (error) {
    console.error('❌ Basic connectivity test failed:', error.message);
    console.error('🔍 Error code:', error.code);
    return false;
  }
}

/**
 * Test real-time listener (the problematic feature)
 */
function testRealTimeListener() {
  console.log('\n🔍 Testing real-time listener...');
  
  return new Promise((resolve) => {
    const testCollection = collection(db, '_test_realtime');
    let success = false;
    let error = null;
    
    const unsubscribe = onSnapshot(testCollection, (snapshot) => {
      console.log('✅ Real-time listener test passed');
      console.log(`📊 Received ${snapshot.size} documents in real-time`);
      success = true;
      unsubscribe();
      resolve({ success: true, error: null });
    }, (err) => {
      console.error('❌ Real-time listener test failed:', err.message);
      console.error('🔍 Error code:', err.code);
      error = err;
      unsubscribe();
      resolve({ success: false, error: err });
    });
    
    // Timeout after 10 seconds
    setTimeout(() => {
      if (!success) {
        console.error('⏰ Real-time listener test timed out');
        unsubscribe();
        resolve({ success: false, error: new Error('Timeout') });
      }
    }, 10000);
  });
}

/**
 * Generate troubleshooting recommendations
 */
function generateRecommendations(basicTest, realtimeTest) {
  console.log('\n💡 Troubleshooting Recommendations:');
  
  if (!basicTest) {
    console.log('\n🔧 Basic Connectivity Issues:');
    console.log('1. Check your internet connection');
    console.log('2. Verify Firebase project configuration');
    console.log('3. Check Firestore security rules');
    console.log('4. Ensure Firestore database exists');
  }
  
  if (!realtimeTest.success) {
    console.log('\n🔧 Real-time Listener Issues (QUIC Protocol):');
    console.log('1. Network/Firewall Issues:');
    console.log('   - Check if your network blocks QUIC protocol (UDP port 443)');
    console.log('   - Try disabling VPN if you\'re using one');
    console.log('   - Check corporate firewall settings');
    
    console.log('\n2. Browser Issues:');
    console.log('   - Try a different browser (Chrome, Firefox, Edge)');
    console.log('   - Clear browser cache and cookies');
    console.log('   - Disable browser extensions temporarily');
    console.log('   - Try incognito/private browsing mode');
    
    console.log('\n3. System Issues:');
    console.log('   - Restart your browser');
    console.log('   - Restart your computer');
    console.log('   - Check Windows Firewall settings');
    console.log('   - Update your browser to the latest version');
    
    console.log('\n4. Alternative Solutions:');
    console.log('   - Use a different network (mobile hotspot)');
    console.log('   - Try accessing from a different device');
    console.log('   - Contact your network administrator');
    
    console.log('\n5. Temporary Workarounds:');
    console.log('   - The app will still work without real-time updates');
    console.log('   - Users can refresh manually to get updates');
    console.log('   - Consider implementing polling as fallback');
  }
  
  if (basicTest && realtimeTest.success) {
    console.log('✅ All tests passed! No issues detected.');
  }
}

/**
 * Test network connectivity to Google services
 */
async function testNetworkConnectivity() {
  console.log('\n🌐 Testing network connectivity to Google services...');
  
  const endpoints = [
    'https://firestore.googleapis.com',
    'https://www.googleapis.com',
    'https://googleapis.com'
  ];
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, { 
        method: 'HEAD',
        mode: 'no-cors' // Avoid CORS issues
      });
      console.log(`✅ ${endpoint} - Accessible`);
    } catch (error) {
      console.log(`❌ ${endpoint} - Not accessible: ${error.message}`);
    }
  }
}

/**
 * Main diagnosis function
 */
async function diagnoseNetworkIssues() {
  console.log('🔧 Network Diagnosis for Firestore QUIC Protocol Issues\n');
  
  // Test 1: Basic connectivity
  const basicTest = await testBasicConnectivity();
  
  // Test 2: Real-time listener
  const realtimeTest = await testRealTimeListener();
  
  // Test 3: Network connectivity
  await testNetworkConnectivity();
  
  // Generate recommendations
  generateRecommendations(basicTest, realtimeTest);
  
  // Summary
  console.log('\n📊 Diagnosis Summary:');
  console.log(`Basic Connectivity: ${basicTest ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Real-time Listener: ${realtimeTest.success ? '✅ PASS' : '❌ FAIL'}`);
  
  if (realtimeTest.error) {
    console.log(`Error Type: ${realtimeTest.error.code || 'Unknown'}`);
    console.log(`Error Message: ${realtimeTest.error.message}`);
  }
  
  console.log('\n🎯 Next Steps:');
  if (basicTest && !realtimeTest.success) {
    console.log('Focus on QUIC protocol/network issues');
  } else if (!basicTest) {
    console.log('Focus on basic Firebase connectivity');
  } else {
    console.log('All systems operational');
  }
}

// Run the diagnosis
diagnoseNetworkIssues()
  .then(() => {
    console.log('\n✅ Diagnosis completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Diagnosis failed:', error);
    process.exit(1);
  }); 