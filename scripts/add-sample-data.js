/**
 * Add Sample Data Script
 * 
 * This script adds sample students and classes to the database for testing.
 * 
 * Usage: node scripts/add-sample-data.js
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
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
const auth = getAuth(app);

// Sample student data
const sampleStudents = [
  {
    email: 'student1@test.com',
    password: 'password123',
    displayName: 'דוד כהן',
    firstName: 'דוד',
    lastName: 'כהן',
    age: 15,
    sex: 'male'
  },
  {
    email: 'student2@test.com',
    password: 'password123',
    displayName: 'שרה לוי',
    firstName: 'שרה',
    lastName: 'לוי',
    age: 14,
    sex: 'female'
  },
  {
    email: 'student3@test.com',
    password: 'password123',
    displayName: 'יוסי גולדברג',
    firstName: 'יוסי',
    lastName: 'גולדברג',
    age: 16,
    sex: 'male'
  },
  {
    email: 'student4@test.com',
    password: 'password123',
    displayName: 'מיכל רוזן',
    firstName: 'מיכל',
    lastName: 'רוזן',
    age: 15,
    sex: 'female'
  },
  {
    email: 'student5@test.com',
    password: 'password123',
    displayName: 'עמית שפירא',
    firstName: 'עמית',
    lastName: 'שפירא',
    age: 14,
    sex: 'male'
  },
  {
    email: 'student6@test.com',
    password: 'password123',
    displayName: 'נועה ברק',
    firstName: 'נועה',
    lastName: 'ברק',
    age: 15,
    sex: 'female'
  },
  {
    email: 'student7@test.com',
    password: 'password123',
    displayName: 'אלון דוד',
    firstName: 'אלון',
    lastName: 'דוד',
    age: 16,
    sex: 'male'
  },
  {
    email: 'student8@test.com',
    password: 'password123',
    displayName: 'יעל אברהם',
    firstName: 'יעל',
    lastName: 'אברהם',
    age: 14,
    sex: 'female'
  }
];

// Sample classes data
const sampleClasses = [
  {
    name: 'כיתה א\' - מתחילים',
    description: 'כיתה למתחילים בלימודי סייבר',
    maxStudents: 20,
    teacherId: 'maxbunnyshow@gmail.com' // Replace with actual teacher ID
  },
  {
    name: 'כיתה ב\' - מתקדמים',
    description: 'כיתה למתקדמים בלימודי סייבר',
    maxStudents: 15,
    teacherId: 'maxbunnyshow@gmail.com' // Replace with actual teacher ID
  }
];

async function checkExistingStudents() {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('role', '==', 'student'));
    const querySnapshot = await getDocs(q);
    
    console.log(`📊 Found ${querySnapshot.size} existing students`);
    return querySnapshot.size;
  } catch (error) {
    console.error('Error checking existing students:', error);
    return 0;
  }
}

async function createStudent(studentData) {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      studentData.email, 
      studentData.password
    );
    
    // Update display name
    await updateProfile(userCredential.user, {
      displayName: studentData.displayName
    });
    
    // Create user profile in Firestore
    const userProfile = {
      uid: userCredential.user.uid,
      email: studentData.email,
      displayName: studentData.displayName,
      role: 'student',
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      age: studentData.age,
      sex: studentData.sex,
      progress: {
        1: {
          completed: false,
          score: 0,
          completedAt: null,
          temporary: false,
          lastSlide: 0,
          pagesEngaged: [],
          lastActivity: new Date()
        }
      },
      completedLessons: [],
      currentLesson: 1,
      totalTimeSpent: 0,
      totalPagesEngaged: 0,
      achievements: [],
      streak: 0,
      classId: null,
      teacherId: null,
      createdAt: new Date(),
      lastLogin: new Date(),
      lastActivityDate: new Date(),
      updatedAt: new Date()
    };
    
    await setDoc(doc(db, 'users', userCredential.user.uid), userProfile);
    
    console.log(`✅ Created student: ${studentData.displayName} (${studentData.email})`);
    return userCredential.user.uid;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log(`⚠️ Student already exists: ${studentData.email}`);
      return null;
    } else {
      console.error(`❌ Error creating student ${studentData.email}:`, error.message);
      return null;
    }
  }
}

async function createClass(classData) {
  try {
    // Get teacher ID from email
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', classData.teacherId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log(`⚠️ Teacher not found: ${classData.teacherId}`);
      return null;
    }
    
    const teacherDoc = querySnapshot.docs[0];
    const teacherId = teacherDoc.id;
    
    // Create class document
    const classDoc = {
      name: classData.name,
      description: classData.description,
      teacherId: teacherId,
      studentIds: [],
      maxStudents: classData.maxStudents,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const classRef = doc(collection(db, 'classes'));
    await setDoc(classRef, classDoc);
    
    console.log(`✅ Created class: ${classData.name}`);
    return classRef.id;
  } catch (error) {
    console.error(`❌ Error creating class ${classData.name}:`, error.message);
    return null;
  }
}

async function addSampleData() {
  try {
    console.log('🚀 Starting sample data creation...');
    
    // Check existing students
    const existingCount = await checkExistingStudents();
    
    if (existingCount > 0) {
      console.log(`📊 ${existingCount} students already exist. Skipping student creation.`);
    } else {
      console.log('👥 Creating sample students...');
      
      // Create students
      for (const studentData of sampleStudents) {
        await createStudent(studentData);
      }
    }
    
    console.log('🏫 Creating sample classes...');
    
    // Create classes
    for (const classData of sampleClasses) {
      await createClass(classData);
    }
    
    console.log('✅ Sample data creation completed!');
    console.log('\n📋 Created:');
    console.log(`  - ${sampleStudents.length} sample students`);
    console.log(`  - ${sampleClasses.length} sample classes`);
    console.log('\n💡 You can now test the student pool functionality in the teacher dashboard.');
    
  } catch (error) {
    console.error('❌ Error creating sample data:', error);
  }
}

// Run the script
addSampleData()
  .then(() => {
    console.log('✅ Script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }); 