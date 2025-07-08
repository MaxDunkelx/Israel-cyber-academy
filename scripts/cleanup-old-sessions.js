/**
 * Cleanup Old Sessions
 * Removes old sessions to reduce Firebase usage
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, deleteDoc, query, where } from 'firebase/firestore';

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

async function cleanupOldSessions() {
  console.log('🧹 Starting session cleanup...\n');

  try {
    // Get all ended sessions
    const sessionsRef = collection(db, 'sessions');
    const q = query(sessionsRef, where('status', '==', 'ended'));
    const sessionsSnapshot = await getDocs(q);
    
    const sessions = [];
    sessionsSnapshot.forEach(doc => {
      sessions.push({ id: doc.id, ...doc.data() });
    });

    console.log(`Found ${sessions.length} ended sessions`);

    if (sessions.length === 0) {
      console.log('✅ No sessions to clean up!');
      return;
    }

    // Sort by end time (oldest first)
    sessions.sort((a, b) => {
      const timeA = a.endTime?.toDate?.() || new Date(a.endTime) || new Date(0);
      const timeB = b.endTime?.toDate?.() || new Date(b.endTime) || new Date(0);
      return timeA - timeB;
    });

    // Keep the 10 most recent sessions, delete the rest
    const sessionsToDelete = sessions.slice(0, Math.max(0, sessions.length - 10));
    
    if (sessionsToDelete.length === 0) {
      console.log('✅ No old sessions to delete (keeping 10 most recent)');
      return;
    }

    console.log(`Deleting ${sessionsToDelete.length} old sessions...`);

    let deletedCount = 0;
    for (const session of sessionsToDelete) {
      try {
        const sessionRef = doc(db, 'sessions', session.id);
        await deleteDoc(sessionRef);
        deletedCount++;
        console.log(`   ✅ Deleted: ${session.lessonName} (${session.className})`);
      } catch (error) {
        console.error(`   ❌ Failed to delete session ${session.id}:`, error.message);
      }
    }

    console.log(`\n🎉 Cleanup complete! Deleted ${deletedCount} old sessions.`);
    console.log(`📊 Kept ${sessions.length - deletedCount} recent sessions.`);

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  }
}

// Run the cleanup
cleanupOldSessions(); 