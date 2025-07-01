/**
 * Setup Session Attendance Database Structure
 * 
 * This script sets up the proper database structure for tracking
 * live session attendance with detailed student information.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log('🔧 Setting up Session Attendance Database Structure');
console.log('==================================================\n');

/**
 * Create sample session data for testing
 */
const createSampleSession = async () => {
  try {
    console.log('📝 Creating sample session data...');
    
    const sessionsRef = collection(db, 'sessions');
    
    // Sample session data
    const sampleSession = {
      teacherId: 'sample-teacher-id',
      classId: 'sample-class-id',
      className: 'כיתה לדוגמה',
      lessonId: 1,
      lessonName: 'שיעור 1 - מבוא לאבטחת סייבר',
      studentIds: ['student1', 'student2', 'student3', 'student4', 'student5'],
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
          joinedAt: serverTimestamp(),
          lastActivity: serverTimestamp(),
          currentSlide: 15
        },
        {
          id: 'student2',
          name: 'שרה לוי',
          joinedAt: serverTimestamp(),
          lastActivity: serverTimestamp(),
          currentSlide: 14
        },
        {
          id: 'student3',
          name: 'דוד אברהם',
          joinedAt: serverTimestamp(),
          lastActivity: serverTimestamp(),
          currentSlide: 12
        },
        {
          id: 'student4',
          name: 'מיכל שפירא',
          joinedAt: serverTimestamp(),
          lastActivity: serverTimestamp(),
          currentSlide: 10
        }
      ],
      studentProgress: {
        student1: { completedSlides: 15, totalTime: 45 },
        student2: { completedSlides: 14, totalTime: 42 },
        student3: { completedSlides: 12, totalTime: 38 },
        student4: { completedSlides: 10, totalTime: 35 }
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

/**
 * Create sample users for testing
 */
const createSampleUsers = async () => {
  try {
    console.log('👥 Creating sample users...');
    
    const usersRef = collection(db, 'users');
    
    const sampleUsers = [
      {
        uid: 'student1',
        displayName: 'יוסי כהן',
        email: 'yossi@example.com',
        role: 'student',
        classId: 'sample-class-id',
        teacherId: 'sample-teacher-id',
        progress: 75,
        completedLessons: [1, 2, 3],
        totalTimeSpent: 240,
        lastActivityAt: serverTimestamp(),
        createdAt: serverTimestamp()
      },
      {
        uid: 'student2',
        displayName: 'שרה לוי',
        email: 'sarah@example.com',
        role: 'student',
        classId: 'sample-class-id',
        teacherId: 'sample-teacher-id',
        progress: 88,
        completedLessons: [1, 2, 3, 4],
        totalTimeSpent: 320,
        lastActivityAt: serverTimestamp(),
        createdAt: serverTimestamp()
      },
      {
        uid: 'student3',
        displayName: 'דוד אברהם',
        email: 'david@example.com',
        role: 'student',
        classId: 'sample-class-id',
        teacherId: 'sample-teacher-id',
        progress: 92,
        completedLessons: [1, 2, 3, 4, 5],
        totalTimeSpent: 380,
        lastActivityAt: serverTimestamp(),
        createdAt: serverTimestamp()
      },
      {
        uid: 'student4',
        displayName: 'מיכל שפירא',
        email: 'michal@example.com',
        role: 'student',
        classId: 'sample-class-id',
        teacherId: 'sample-teacher-id',
        progress: 65,
        completedLessons: [1, 2],
        totalTimeSpent: 180,
        lastActivityAt: serverTimestamp(),
        createdAt: serverTimestamp()
      },
      {
        uid: 'student5',
        displayName: 'עמית כהן',
        email: 'amit@example.com',
        role: 'student',
        classId: 'sample-class-id',
        teacherId: 'sample-teacher-id',
        progress: 45,
        completedLessons: [1],
        totalTimeSpent: 120,
        lastActivityAt: serverTimestamp(),
        createdAt: serverTimestamp()
      }
    ];
    
    for (const user of sampleUsers) {
      await setDoc(doc(usersRef, user.uid), user);
    }
    
    console.log('✅ Sample users created successfully');
  } catch (error) {
    console.error('❌ Error creating sample users:', error);
    throw error;
  }
};

/**
 * Create sample class for testing
 */
const createSampleClass = async () => {
  try {
    console.log('🏫 Creating sample class...');
    
    const classesRef = collection(db, 'classes');
    
    const sampleClass = {
      id: 'sample-class-id',
      name: 'כיתה לדוגמה',
      description: 'כיתה לדוגמה לבדיקת נוכחות בשיעורים חיים',
      teacherId: 'sample-teacher-id',
      studentIds: ['student1', 'student2', 'student3', 'student4', 'student5'],
      maxStudents: 30,
      isActive: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    await setDoc(doc(classesRef, 'sample-class-id'), sampleClass);
    console.log('✅ Sample class created successfully');
  } catch (error) {
    console.error('❌ Error creating sample class:', error);
    throw error;
  }
};

/**
 * Verify database structure
 */
const verifyDatabaseStructure = async () => {
  try {
    console.log('🔍 Verifying database structure...');
    
    // Check sessions collection
    const sessionsRef = collection(db, 'sessions');
    console.log('✅ Sessions collection structure verified');
    
    // Check users collection
    const usersRef = collection(db, 'users');
    console.log('✅ Users collection structure verified');
    
    // Check classes collection
    const classesRef = collection(db, 'classes');
    console.log('✅ Classes collection structure verified');
    
    console.log('\n📊 Database structure is ready for session attendance tracking!');
  } catch (error) {
    console.error('❌ Error verifying database structure:', error);
    throw error;
  }
};

/**
 * Main execution
 */
const main = async () => {
  try {
    console.log('🚀 Starting session attendance database setup...\n');
    
    // Create sample data
    await createSampleUsers();
    await createSampleClass();
    const sessionId = await createSampleSession();
    
    // Verify structure
    await verifyDatabaseStructure();
    
    console.log('\n🎉 Session Attendance Database Setup Complete!');
    console.log('\n📋 What was created:');
    console.log('   • 5 sample students with attendance data');
    console.log('   • 1 sample class');
    console.log('   • 1 sample completed session with 4 attending students');
    console.log('\n🔗 Sample session ID:', sessionId);
    console.log('\n💡 You can now test the session attendance tracking in your teacher dashboard!');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
};

// Run the setup
main(); 