/**
 * Add sample teacher activities to the database for a real teacher
 * This script finds a real teacher and creates sample activity logs for testing
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

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

const addRealTeacherActivities = async () => {
  try {
    console.log('🔍 Finding a real teacher...');
    
    // Find a teacher in the database
    const usersRef = collection(db, 'users');
    const teacherQuery = query(usersRef, where('role', '==', 'teacher'));
    const teacherSnapshot = await getDocs(teacherQuery);
    
    if (teacherSnapshot.empty) {
      console.log('❌ No teachers found in the database');
      console.log('💡 Please create a teacher account first');
      return;
    }
    
    const teacherDoc = teacherSnapshot.docs[0];
    const teacherId = teacherDoc.id;
    const teacherData = teacherDoc.data();
    
    console.log(`✅ Found teacher: ${teacherData.displayName || teacherData.email} (${teacherId})`);
    
    // Create sample activities for this teacher
    const sampleActivities = [
      {
        teacherId: teacherId,
        type: 'class_created',
        title: 'כיתה חדשה נוצרה',
        description: 'הכיתה "מבוא לסייבר - קבוצה א" נוצרה בהצלחה',
        metadata: {
          classId: 'sample-class-1',
          className: 'מבוא לסייבר - קבוצה א',
          maxStudents: 25
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        read: false
      },
      {
        teacherId: teacherId,
        type: 'student_added',
        title: 'תלמידים נוספו לכיתה',
        description: '3 תלמידים נוספו לכיתה "מבוא לסייבר - קבוצה א"',
        metadata: {
          classId: 'sample-class-1',
          className: 'מבוא לסייבר - קבוצה א',
          studentsAdded: 3,
          studentIds: ['sample-student-1', 'sample-student-2', 'sample-student-3']
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
        read: false
      },
      {
        teacherId: teacherId,
        type: 'class_edited',
        title: 'כיתה עודכנה',
        description: 'הכיתה "מבוא לסייבר - קבוצה א" עודכנה: מספר מקסימלי של תלמידים: 25 → 30',
        metadata: {
          classId: 'sample-class-1',
          className: 'מבוא לסייבר - קבוצה א',
          changes: ['מספר מקסימלי של תלמידים: 25 → 30'],
          originalData: { maxStudents: 25 },
          updatedData: { maxStudents: 30 }
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false
      },
      {
        teacherId: teacherId,
        type: 'class_created',
        title: 'כיתה חדשה נוצרה',
        description: 'הכיתה "רכיבי מחשב - מתחילים" נוצרה בהצלחה',
        metadata: {
          classId: 'sample-class-2',
          className: 'רכיבי מחשב - מתחילים',
          maxStudents: 20
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        read: false
      },
      {
        teacherId: teacherId,
        type: 'student_removed',
        title: 'תלמיד הוסר מהכיתה',
        description: 'תלמיד הוסר מהכיתה "מבוא לסייבר - קבוצה א"',
        metadata: {
          classId: 'sample-class-1',
          className: 'מבוא לסייבר - קבוצה א',
          studentsRemoved: 1,
          studentIds: ['sample-student-4']
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
        read: false
      }
    ];
    
    console.log('🚀 Starting to add sample activities...');
    
    const activitiesRef = collection(db, 'teacherActivities');
    
    for (const activity of sampleActivities) {
      console.log(`📝 Adding activity: ${activity.title}`);
      
      const activityDoc = {
        ...activity,
        timestamp: serverTimestamp()
      };
      
      await addDoc(activitiesRef, activityDoc);
      console.log(`✅ Added activity: ${activity.title}`);
    }
    
    console.log('🎉 All sample activities added successfully!');
    console.log(`📊 Added ${sampleActivities.length} activities for teacher: ${teacherData.displayName || teacherData.email}`);
    console.log(`🆔 Teacher ID: ${teacherId}`);
    
  } catch (error) {
    console.error('❌ Error adding sample activities:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
  }
};

// Run the script
addRealTeacherActivities()
  .then(() => {
    console.log('✅ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }); 