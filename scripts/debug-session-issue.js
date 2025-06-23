/**
 * Debug Session Issue Script
 * 
 * This script helps debug session-related issues by:
 * 1. Checking if sessions exist in the database
 * 2. Listing all active sessions
 * 3. Validating session data structure
 */

const { initializeApp } = require('firebase/app');
const { 
  getFirestore, 
  collection, 
  getDocs,
  query,
  where,
  orderBy,
  limit
} = require('firebase/firestore');

// Firebase config (replace with your actual config)
const firebaseConfig = {
  // Add your Firebase config here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * List all sessions in the database
 */
async function listAllSessions() {
  console.log('🔍 Listing all sessions in database...');
  
  try {
    const sessionsRef = collection(db, 'sessions');
    const querySnapshot = await getDocs(sessionsRef);
    
    if (querySnapshot.empty) {
      console.log('❌ No sessions found in database');
      return;
    }
    
    console.log(`✅ Found ${querySnapshot.size} session(s):`);
    
    querySnapshot.forEach((doc) => {
      const sessionData = doc.data();
      console.log(`\n📋 Session ID: ${doc.id}`);
      console.log(`   Lesson: ${sessionData.lessonName || 'Unknown'}`);
      console.log(`   Class: ${sessionData.className || 'Unknown'}`);
      console.log(`   Status: ${sessionData.status || 'Unknown'}`);
      console.log(`   Teacher: ${sessionData.teacherId || 'Unknown'}`);
      console.log(`   Start Time: ${sessionData.startTime ? sessionData.startTime.toDate() : 'Unknown'}`);
      console.log(`   Current Slide: ${sessionData.currentSlide || 0}`);
      console.log(`   Connected Students: ${sessionData.connectedStudents?.length || 0}`);
    });
    
  } catch (error) {
    console.error('❌ Error listing sessions:', error);
  }
}

/**
 * List only active sessions
 */
async function listActiveSessions() {
  console.log('\n🔍 Listing active sessions only...');
  
  try {
    const sessionsRef = collection(db, 'sessions');
    const q = query(
      sessionsRef,
      where('status', '==', 'active'),
      orderBy('startTime', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('❌ No active sessions found');
      return;
    }
    
    console.log(`✅ Found ${querySnapshot.size} active session(s):`);
    
    querySnapshot.forEach((doc) => {
      const sessionData = doc.data();
      console.log(`\n📋 Active Session ID: ${doc.id}`);
      console.log(`   Lesson: ${sessionData.lessonName || 'Unknown'}`);
      console.log(`   Class: ${sessionData.className || 'Unknown'}`);
      console.log(`   Teacher: ${sessionData.teacherId || 'Unknown'}`);
      console.log(`   Start Time: ${sessionData.startTime ? sessionData.startTime.toDate() : 'Unknown'}`);
      console.log(`   Current Slide: ${sessionData.currentSlide || 0}`);
      console.log(`   Connected Students: ${sessionData.connectedStudents?.length || 0}`);
    });
    
  } catch (error) {
    console.error('❌ Error listing active sessions:', error);
  }
}

/**
 * Check if a specific session exists
 */
async function checkSessionExists(sessionId) {
  console.log(`\n🔍 Checking if session ${sessionId} exists...`);
  
  try {
    const sessionsRef = collection(db, 'sessions');
    const q = query(sessionsRef, where('__name__', '==', sessionId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log(`❌ Session ${sessionId} does not exist`);
      return false;
    }
    
    const sessionData = querySnapshot.docs[0].data();
    console.log(`✅ Session ${sessionId} exists:`);
    console.log(`   Lesson: ${sessionData.lessonName || 'Unknown'}`);
    console.log(`   Status: ${sessionData.status || 'Unknown'}`);
    console.log(`   Teacher: ${sessionData.teacherId || 'Unknown'}`);
    
    return true;
    
  } catch (error) {
    console.error(`❌ Error checking session ${sessionId}:`, error);
    return false;
  }
}

/**
 * Run all debug functions
 */
async function runDebug() {
  console.log('🚀 Starting Session Debug...\n');
  
  await listAllSessions();
  await listActiveSessions();
  
  // Check for a specific session ID if provided
  const sessionId = process.argv[2];
  if (sessionId) {
    await checkSessionExists(sessionId);
  }
  
  console.log('\n✅ Debug completed!');
}

// Run debug if this file is executed directly
if (require.main === module) {
  runDebug().catch(console.error);
}

module.exports = {
  listAllSessions,
  listActiveSessions,
  checkSessionExists,
  runDebug
}; 