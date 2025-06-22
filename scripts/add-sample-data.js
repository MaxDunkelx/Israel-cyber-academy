/**
 * Add Sample Data Script for Israel Cyber Academy
 * This script adds sample users and classes to test the student pool system
 */

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc,
  writeBatch,
  serverTimestamp
} from 'firebase/firestore';

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

/**
 * Add sample data to the database
 */
async function addSampleData() {
  console.log('🚀 Adding sample data to database...');

  try {
    const batch = writeBatch(db);

    // Add sample users
    const sampleUsers = [
      {
        uid: 'teacher_001',
        email: 'teacher1@cyberacademy.co.il',
        displayName: 'ד"ר משה כהן',
        role: 'teacher',
        profile: {
          firstName: 'משה',
          lastName: 'כהן',
          phone: '+972-50-123-4567',
          bio: 'מורה בכיר לאבטחת סייבר'
        },
        academic: {
          specialization: 'אבטחת סייבר',
          experience: '15 שנים',
          education: 'דוקטורט במדעי המחשב'
        },
        assignedClass: null,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        updatedAt: serverTimestamp()
      },
      {
        uid: 'student_001',
        email: 'student1@school.co.il',
        displayName: 'אבי כהן',
        role: 'student',
        profile: {
          firstName: 'אבי',
          lastName: 'כהן',
          phone: '+972-50-345-6789',
          bio: 'תלמיד מתחיל באבטחת סייבר'
        },
        academic: {
          grade: 'י"א',
          school: 'תיכון הרצליה',
          graduationYear: 2025
        },
        progress: {
          '1': {
            completed: true,
            score: 85,
            completedAt: new Date('2024-12-15T10:00:00.000Z'),
            lastSlide: 12,
            pagesEngaged: ['slide1', 'slide2'],
            lastActivity: new Date('2024-12-20T10:30:00.000Z')
          }
        },
        completedLessons: [1],
        currentLesson: 2,
        assignedClass: null, // Unassigned student
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        updatedAt: serverTimestamp()
      },
      {
        uid: 'student_002',
        email: 'student2@school.co.il',
        displayName: 'מיכל לוי',
        role: 'student',
        profile: {
          firstName: 'מיכל',
          lastName: 'לוי',
          phone: '+972-50-456-7890',
          bio: 'תלמידה מתקדמת באבטחת סייבר'
        },
        academic: {
          grade: 'י"ב',
          school: 'תיכון הרצליה',
          graduationYear: 2024
        },
        progress: {
          '1': {
            completed: true,
            score: 92,
            completedAt: new Date('2024-12-10T10:00:00.000Z'),
            lastSlide: 18,
            pagesEngaged: ['slide1', 'slide2', 'slide3'],
            lastActivity: new Date('2024-12-20T14:30:00.000Z')
          },
          '2': {
            completed: true,
            score: 88,
            completedAt: new Date('2024-12-18T10:00:00.000Z'),
            lastSlide: 15,
            pagesEngaged: ['slide1', 'slide2'],
            lastActivity: new Date('2024-12-19T16:30:00.000Z')
          }
        },
        completedLessons: [1, 2],
        currentLesson: 3,
        assignedClass: null, // Unassigned student
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        updatedAt: serverTimestamp()
      },
      {
        uid: 'student_003',
        email: 'student3@school.co.il',
        displayName: 'דניאל רוזן',
        role: 'student',
        profile: {
          firstName: 'דניאל',
          lastName: 'רוזן',
          phone: '+972-50-567-8901',
          bio: 'תלמיד חדש באבטחת סייבר'
        },
        academic: {
          grade: 'י"א',
          school: 'תיכון הרצליה',
          graduationYear: 2025
        },
        progress: {},
        completedLessons: [],
        currentLesson: 1,
        assignedClass: null, // Unassigned student
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
    ];

    // Add users to batch
    sampleUsers.forEach(user => {
      const userRef = doc(db, 'users', user.uid);
      batch.set(userRef, user);
    });

    // Add sample classes
    const sampleClasses = [
      {
        classId: 'class_001_2024',
        className: 'Class 1',
        classNumber: 1,
        description: 'כיתה ראשונה באבטחת סייבר',
        instructorId: 'teacher_001',
        instructorName: 'ד"ר משה כהן',
        students: [],
        studentCount: 0,
        maxStudents: 25,
        schedule: {
          days: ['ראשון', 'שלישי'],
          time: '16:00-18:00',
          timezone: 'Asia/Jerusalem'
        },
        status: 'active',
        semester: '2024-א',
        year: 2024,
        startDate: new Date('2024-02-01T00:00:00.000Z'),
        endDate: new Date('2024-06-30T23:59:59.000Z'),
        currentLesson: 1,
        lessonProgress: {},
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      },
      {
        classId: 'class_002_2024',
        className: 'Class 2',
        classNumber: 2,
        description: 'כיתה שנייה באבטחת סייבר',
        instructorId: 'teacher_001',
        instructorName: 'ד"ר משה כהן',
        students: [],
        studentCount: 0,
        maxStudents: 20,
        schedule: {
          days: ['שני', 'רביעי'],
          time: '17:00-19:00',
          timezone: 'Asia/Jerusalem'
        },
        status: 'active',
        semester: '2024-א',
        year: 2024,
        startDate: new Date('2024-02-01T00:00:00.000Z'),
        endDate: new Date('2024-06-30T23:59:59.000Z'),
        currentLesson: 1,
        lessonProgress: {},
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
    ];

    // Add classes to batch
    sampleClasses.forEach(classData => {
      const classRef = doc(db, 'classes', classData.classId);
      batch.set(classRef, classData);
    });

    // Commit all changes
    await batch.commit();

    console.log('✅ Sample data added successfully!');
    console.log(`📊 Added ${sampleUsers.length} users and ${sampleClasses.length} classes`);

  } catch (error) {
    console.error('❌ Error adding sample data:', error);
    throw error;
  }
}

// Run the script
addSampleData()
  .then(() => {
    console.log('🎉 Sample data setup completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Sample data setup failed:', error);
    process.exit(1);
  }); 