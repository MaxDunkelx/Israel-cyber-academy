/**
 * Add sample teacher activities to the database
 * This script creates sample activity logs for testing the dashboard
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
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

const sampleActivities = [
  {
    teacherId: 'teacher1', // Replace with actual teacher ID
    type: 'class_created',
    title: 'כיתה חדשה נוצרה',
    description: 'הכיתה "מבוא לסייבר - קבוצה א" נוצרה בהצלחה',
    metadata: {
      classId: 'class1',
      className: 'מבוא לסייבר - קבוצה א',
      maxStudents: 25
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    read: false
  },
  {
    teacherId: 'teacher1',
    type: 'student_added',
    title: 'תלמידים נוספו לכיתה',
    description: '3 תלמידים נוספו לכיתה "מבוא לסייבר - קבוצה א"',
    metadata: {
      classId: 'class1',
      className: 'מבוא לסייבר - קבוצה א',
      studentsAdded: 3,
      studentIds: ['student1', 'student2', 'student3']
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    read: false
  },
  {
    teacherId: 'teacher1',
    type: 'class_edited',
    title: 'כיתה עודכנה',
    description: 'הכיתה "מבוא לסייבר - קבוצה א" עודכנה: מספר מקסימלי של תלמידים: 25 → 30',
    metadata: {
      classId: 'class1',
      className: 'מבוא לסייבר - קבוצה א',
      changes: ['מספר מקסימלי של תלמידים: 25 → 30'],
      originalData: { maxStudents: 25 },
      updatedData: { maxStudents: 30 }
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false
  },
  {
    teacherId: 'teacher1',
    type: 'class_created',
    title: 'כיתה חדשה נוצרה',
    description: 'הכיתה "רכיבי מחשב - מתחילים" נוצרה בהצלחה',
    metadata: {
      classId: 'class2',
      className: 'רכיבי מחשב - מתחילים',
      maxStudents: 20
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    read: false
  },
  {
    teacherId: 'teacher1',
    type: 'student_removed',
    title: 'תלמיד הוסר מהכיתה',
    description: 'תלמיד הוסר מהכיתה "מבוא לסייבר - קבוצה א"',
    metadata: {
      classId: 'class1',
      className: 'מבוא לסייבר - קבוצה א',
      studentsRemoved: 1,
      studentIds: ['student4']
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
    read: false
  }
];

const addSampleActivities = async () => {
  try {
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
    console.log(`📊 Added ${sampleActivities.length} activities`);
    
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
addSampleActivities()
  .then(() => {
    console.log('✅ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }); 