/**
 * Firebase Usage Monitor
 * Monitors Firebase usage in real-time
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot, query, where } from 'firebase/firestore';

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

let activeSessions = 0;
let totalListeners = 0;

function monitorFirebaseUsage() {
  console.log('🔍 Starting Firebase usage monitor...\n');
  console.log('📊 Real-time monitoring active. Press Ctrl+C to stop.\n');

  // Monitor active sessions
  const sessionsRef = collection(db, 'sessions');
  const activeSessionsQuery = query(sessionsRef, where('status', '==', 'active'));
  
  const unsubscribeSessions = onSnapshot(activeSessionsQuery, (snapshot) => {
    const newActiveSessions = snapshot.size;
    
    if (newActiveSessions !== activeSessions) {
      activeSessions = newActiveSessions;
      console.log(`📊 Active sessions: ${activeSessions}`);
      
      if (activeSessions > 0) {
        snapshot.forEach(doc => {
          const session = doc.data();
          console.log(`   - ${session.lessonName} (${session.className}) - ${session.connectedStudents?.length || 0} students`);
        });
      }
    }
  });

  // Monitor users collection (for debugging)
  const usersRef = collection(db, 'users');
  const unsubscribeUsers = onSnapshot(usersRef, (snapshot) => {
    const totalUsers = snapshot.size;
    const onlineUsers = snapshot.docs.filter(doc => {
      const user = doc.data();
      const lastActivity = user.lastActivityAt?.toDate?.() || new Date(user.lastActivityAt);
      const timeDiff = Date.now() - lastActivity.getTime();
      return timeDiff < 5 * 60 * 1000; // 5 minutes
    }).length;
    
    console.log(`👥 Users: ${totalUsers} total, ${onlineUsers} recently active`);
  });

  // Monitor classes
  const classesRef = collection(db, 'classes');
  const unsubscribeClasses = onSnapshot(classesRef, (snapshot) => {
    const totalClasses = snapshot.size;
    console.log(`🏫 Classes: ${totalClasses} total`);
  });

  // Keep track of listeners
  totalListeners = 3; // sessions, users, classes
  console.log(`🎧 Active listeners: ${totalListeners}`);

  // Cleanup function
  return () => {
    unsubscribeSessions();
    unsubscribeUsers();
    unsubscribeClasses();
    console.log('\n🔌 Monitoring stopped');
  };
}

// Start monitoring
const cleanup = monitorFirebaseUsage();

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down monitor...');
  cleanup();
  process.exit(0);
});

// Keep the process alive
setInterval(() => {
  // Heartbeat to keep the process running
}, 60000); 