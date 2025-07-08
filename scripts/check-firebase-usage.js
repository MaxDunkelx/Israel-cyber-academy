/**
 * Firebase Usage Checker
 * Helps identify what's consuming Firebase quota
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';

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

async function checkFirebaseUsage() {
  console.log('🔍 Checking Firebase usage...\n');

  try {
    // Check sessions
    console.log('📊 Checking sessions...');
    const sessionsRef = collection(db, 'sessions');
    const sessionsSnapshot = await getDocs(sessionsRef);
    const sessions = [];
    sessionsSnapshot.forEach(doc => {
      sessions.push({ id: doc.id, ...doc.data() });
    });

    const activeSessions = sessions.filter(s => s.status === 'active');
    const endedSessions = sessions.filter(s => s.status === 'ended');
    const staleSessions = sessions.filter(s => {
      if (s.status !== 'active') return false;
      const lastActivity = s.lastActivity?.toDate?.() || new Date(s.lastActivity);
      const timeDiff = Date.now() - lastActivity.getTime();
      return timeDiff > 5 * 60 * 1000; // 5 minutes
    });

    console.log(`   Total sessions: ${sessions.length}`);
    console.log(`   Active sessions: ${activeSessions.length}`);
    console.log(`   Ended sessions: ${endedSessions.length}`);
    console.log(`   Stale sessions (inactive >5min): ${staleSessions.length}`);

    if (staleSessions.length > 0) {
      console.log('\n⚠️  Found stale sessions that should be cleaned up:');
      staleSessions.forEach(session => {
        const lastActivity = session.lastActivity?.toDate?.() || new Date(session.lastActivity);
        const timeDiff = Math.floor((Date.now() - lastActivity.getTime()) / 1000 / 60);
        console.log(`   - ${session.lessonName} (${session.className}) - inactive for ${timeDiff} minutes`);
      });
    }

    // Check users
    console.log('\n👥 Checking users...');
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersRef);
    const users = [];
    usersSnapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });

    const teachers = users.filter(u => u.role === 'teacher');
    const students = users.filter(u => u.role === 'student');
    const systemManagers = users.filter(u => u.role === 'system_manager');

    console.log(`   Total users: ${users.length}`);
    console.log(`   Teachers: ${teachers.length}`);
    console.log(`   Students: ${students.length}`);
    console.log(`   System Managers: ${systemManagers.length}`);

    // Check classes
    console.log('\n🏫 Checking classes...');
    const classesRef = collection(db, 'classes');
    const classesSnapshot = await getDocs(classesRef);
    const classes = [];
    classesSnapshot.forEach(doc => {
      classes.push({ id: doc.id, ...doc.data() });
    });

    console.log(`   Total classes: ${classes.length}`);
    classes.forEach(cls => {
      console.log(`   - ${cls.name}: ${cls.studentIds?.length || 0} students`);
    });

    // Recommendations
    console.log('\n💡 Recommendations:');
    
    if (staleSessions.length > 0) {
      console.log('   1. Clean up stale sessions to reduce quota usage');
      console.log('   2. Consider implementing automatic session cleanup');
    }
    
    if (activeSessions.length > 5) {
      console.log('   3. You have many active sessions - consider limiting concurrent sessions');
    }
    
    if (sessions.length > 100) {
      console.log('   4. Consider archiving old sessions to reduce storage costs');
    }

    console.log('\n✅ Firebase usage check complete!');

  } catch (error) {
    console.error('❌ Error checking Firebase usage:', error);
  }
}

// Run the check
checkFirebaseUsage(); 