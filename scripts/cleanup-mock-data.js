/**
 * Cleanup Mock Data Script
 * 
 * This script removes all mock/demo data and ensures the system only uses real database data.
 * 
 * Usage: node scripts/cleanup-mock-data.js
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
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

/**
 * Remove sample/demo users
 */
const removeSampleUsers = async () => {
  try {
    console.log('🧹 Removing sample users...');
    
    const usersRef = collection(db, 'users');
    const sampleQuery = query(usersRef, where('email', 'in', [
      'student1@test.com',
      'student2@test.com', 
      'student3@test.com',
      'student4@test.com',
      'student5@test.com',
      'student6@test.com',
      'student7@test.com',
      'student8@test.com',
      'yossi@example.com',
      'sara@example.com',
      'david@example.com',
      'michal@example.com',
      'amit@example.com',
      'student1@school.co.il',
      'student2@school.co.il',
      'student3@school.co.il'
    ]));
    
    const querySnapshot = await getDocs(sampleQuery);
    let deletedCount = 0;
    
    for (const doc of querySnapshot.docs) {
      await deleteDoc(doc.ref);
      deletedCount++;
    }
    
    console.log(`✅ Removed ${deletedCount} sample users`);
    return deletedCount;
  } catch (error) {
    console.error('❌ Error removing sample users:', error);
    return 0;
  }
};

/**
 * Remove sample/demo classes
 */
const removeSampleClasses = async () => {
  try {
    console.log('🧹 Removing sample classes...');
    
    const classesRef = collection(db, 'classes');
    const sampleQuery = query(classesRef, where('name', 'in', [
      'כיתה א\' - מתחילים',
      'כיתה ב\' - מתקדמים',
      'כיתה לדוגמה',
      'מבוא לסייבר - קבוצה א',
      'רכיבי מחשב - מתחילים'
    ]));
    
    const querySnapshot = await getDocs(sampleQuery);
    let deletedCount = 0;
    
    for (const doc of querySnapshot.docs) {
      await deleteDoc(doc.ref);
      deletedCount++;
    }
    
    console.log(`✅ Removed ${deletedCount} sample classes`);
    return deletedCount;
  } catch (error) {
    console.error('❌ Error removing sample classes:', error);
    return 0;
  }
};

/**
 * Remove sample/demo sessions
 */
const removeSampleSessions = async () => {
  try {
    console.log('🧹 Removing sample sessions...');
    
    const sessionsRef = collection(db, 'sessions');
    const sampleQuery = query(sessionsRef, where('teacherId', 'in', [
      'sample-teacher-id',
      'test-teacher',
      'teacher1'
    ]));
    
    const querySnapshot = await getDocs(sampleQuery);
    let deletedCount = 0;
    
    for (const doc of querySnapshot.docs) {
      await deleteDoc(doc.ref);
      deletedCount++;
    }
    
    console.log(`✅ Removed ${deletedCount} sample sessions`);
    return deletedCount;
  } catch (error) {
    console.error('❌ Error removing sample sessions:', error);
    return 0;
  }
};

/**
 * Remove sample/demo activities
 */
const removeSampleActivities = async () => {
  try {
    console.log('🧹 Removing sample activities...');
    
    const activitiesRef = collection(db, 'teacherActivities');
    const sampleQuery = query(activitiesRef, where('teacherId', 'in', [
      'teacher1',
      'sample-teacher-id',
      'test-teacher'
    ]));
    
    const querySnapshot = await getDocs(sampleQuery);
    let deletedCount = 0;
    
    for (const doc of querySnapshot.docs) {
      await deleteDoc(doc.ref);
      deletedCount++;
    }
    
    console.log(`✅ Removed ${deletedCount} sample activities`);
    return deletedCount;
  } catch (error) {
    console.error('❌ Error removing sample activities:', error);
    return 0;
  }
};

/**
 * Remove sample/demo notes
 */
const removeSampleNotes = async () => {
  try {
    console.log('🧹 Removing sample notes...');
    
    const notesRef = collection(db, 'teacherNotes');
    const sampleQuery = query(notesRef, where('teacherId', 'in', [
      'teacher1',
      'sample-teacher-id',
      'test-teacher'
    ]));
    
    const querySnapshot = await getDocs(sampleQuery);
    let deletedCount = 0;
    
    for (const doc of querySnapshot.docs) {
      await deleteDoc(doc.ref);
      deletedCount++;
    }
    
    console.log(`✅ Removed ${deletedCount} sample notes`);
    return deletedCount;
  } catch (error) {
    console.error('❌ Error removing sample notes:', error);
    return 0;
  }
};

/**
 * Verify database is clean
 */
const verifyCleanDatabase = async () => {
  try {
    console.log('🔍 Verifying database is clean...');
    
    const collections = ['users', 'classes', 'sessions', 'teacherActivities', 'teacherNotes'];
    let totalRealRecords = 0;
    
    for (const collectionName of collections) {
      const collectionRef = collection(db, collectionName);
      const querySnapshot = await getDocs(collectionRef);
      
      console.log(`  - ${collectionName}: ${querySnapshot.size} records`);
      totalRealRecords += querySnapshot.size;
    }
    
    console.log(`\n📊 Total real records in database: ${totalRealRecords}`);
    
    if (totalRealRecords === 0) {
      console.log('⚠️  Database is empty. You may need to create real data.');
    } else {
      console.log('✅ Database contains only real data');
    }
    
    return totalRealRecords;
  } catch (error) {
    console.error('❌ Error verifying database:', error);
    return 0;
  }
};

/**
 * Main execution
 */
const main = async () => {
  try {
    console.log('🚀 Starting mock data cleanup...\n');
    
    // Remove all sample/demo data
    const usersRemoved = await removeSampleUsers();
    const classesRemoved = await removeSampleClasses();
    const sessionsRemoved = await removeSampleSessions();
    const activitiesRemoved = await removeSampleActivities();
    const notesRemoved = await removeSampleNotes();
    
    // Verify cleanup
    await verifyCleanDatabase();
    
    console.log('\n🎉 Mock Data Cleanup Complete!');
    console.log('\n📋 Summary:');
    console.log(`  • Removed ${usersRemoved} sample users`);
    console.log(`  • Removed ${classesRemoved} sample classes`);
    console.log(`  • Removed ${sessionsRemoved} sample sessions`);
    console.log(`  • Removed ${activitiesRemoved} sample activities`);
    console.log(`  • Removed ${notesRemoved} sample notes`);
    
    const totalRemoved = usersRemoved + classesRemoved + sessionsRemoved + activitiesRemoved + notesRemoved;
    console.log(`\n📊 Total records removed: ${totalRemoved}`);
    
    console.log('\n💡 The system now contains only real data from the database!');
    
  } catch (error) {
    console.error('❌ Cleanup failed:', error);
    process.exit(1);
  }
};

// Run the cleanup
main(); 