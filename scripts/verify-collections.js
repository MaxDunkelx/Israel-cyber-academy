/**
 * Collection Verification Script
 * Verifies that all required collections exist in the database
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

const requiredCollections = [
  'users',
  'classes',
  'sessions',
  'teacherComments',
  'teacherActivities',
  'teacherNotes',
  'securityEvents',
  'userActivities',
  'userPresence',
  'security_logs',
  'lessons',
  'login-analytics'
];

async function verifyCollections() {
  console.log('🔍 Verifying database collections...\n');

  const results = {
    found: [],
    missing: [],
    errors: []
  };

  for (const collectionName of requiredCollections) {
    try {
      console.log(`📁 Checking collection: ${collectionName}`);
      const snapshot = await getDocs(collection(db, collectionName));
      console.log(`   ✅ Found: ${collectionName} (${snapshot.size} documents)`);
      results.found.push({ name: collectionName, count: snapshot.size });
    } catch (error) {
      console.log(`   ❌ Missing: ${collectionName} - ${error.message}`);
      results.missing.push(collectionName);
    }
  }

  // Summary
  console.log('\n📊 VERIFICATION SUMMARY:');
  console.log('=' .repeat(50));
  console.log(`✅ Found: ${results.found.length} collections`);
  console.log(`❌ Missing: ${results.missing.length} collections`);
  console.log(`🚨 Errors: ${results.errors.length} errors`);

  if (results.found.length > 0) {
    console.log('\n✅ FOUND COLLECTIONS:');
    results.found.forEach(col => {
      console.log(`   📁 ${col.name}: ${col.count} documents`);
    });
  }

  if (results.missing.length > 0) {
    console.log('\n❌ MISSING COLLECTIONS:');
    results.missing.forEach(col => {
      console.log(`   ❌ ${col}`);
    });
  }

  if (results.missing.length === 0) {
    console.log('\n🎉 ALL REQUIRED COLLECTIONS ARE PRESENT!');
    console.log('✅ Database is ready for the application.');
  } else {
    console.log('\n⚠️  SOME COLLECTIONS ARE MISSING!');
    console.log('Please run the reconstruction script again.');
  }

  return results;
}

// Run verification
verifyCollections().then((results) => {
  console.log('\n🔍 Verification completed!');
  process.exit(results.missing.length === 0 ? 0 : 1);
}).catch((error) => {
  console.error('❌ Verification failed:', error);
  process.exit(1);
}); 