/**
 * Simple Session Data Setup
 * Adds basic session data for testing without complex setup
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log('🔧 Adding Sample Session Data');
console.log('============================\n');

const addSampleSession = async () => {
  try {
    console.log('📝 Adding sample session...');
    
    const sessionsRef = collection(db, 'sessions');
    
    const sampleSession = {
      teacherId: 'test-teacher',
      classId: 'test-class',
      className: 'כיתה לדוגמה',
      lessonId: 1,
      lessonName: 'שיעור 1 - מבוא לאבטחת סייבר',
      studentIds: ['student1', 'student2', 'student3'],
      status: 'completed',
      currentSlide: 15,
      unlockedSlides: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      startTime: serverTimestamp(),
      endTime: serverTimestamp(),
      lastActivity: serverTimestamp(),
      isLocked: false,
      connectedStudents: [
        {
          id: 'student1',
          name: 'יוסי כהן',
          joinedAt: new Date(),
          lastActivity: new Date(),
          currentSlide: 15
        },
        {
          id: 'student2',
          name: 'שרה לוי',
          joinedAt: new Date(),
          lastActivity: new Date(),
          currentSlide: 14
        },
        {
          id: 'student3',
          name: 'דוד אברהם',
          joinedAt: new Date(),
          lastActivity: new Date(),
          currentSlide: 12
        }
      ],
      studentProgress: {
        student1: { completedSlides: 15, totalTime: 45 },
        student2: { completedSlides: 14, totalTime: 42 },
        student3: { completedSlides: 12, totalTime: 38 }
      },
      teacherNotes: {}
    };
    
    const docRef = await addDoc(sessionsRef, sampleSession);
    console.log(`✅ Sample session created with ID: ${docRef.id}`);
    
    return docRef.id;
  } catch (error) {
    console.error('❌ Error creating sample session:', error);
    throw error;
  }
};

const main = async () => {
  try {
    const sessionId = await addSampleSession();
    console.log('\n🎉 Sample session data added successfully!');
    console.log('🔗 Session ID:', sessionId);
    console.log('\n💡 You can now test session attendance tracking in your teacher dashboard!');
  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
};

main(); 