/**
 * Database Setup Script for Israel Cyber Academy
 * This script initializes Firestore collections and indexes for the student pool system (Multi-Class Model)
 */

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs,
  query,
  where,
  orderBy,
  limit,
  writeBatch,
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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
const auth = getAuth(app);

/**
 * Initialize database collections with sample data (Multi-Class Model)
 */
async function setupDatabase() {
  console.log('🚀 Starting database setup (Multi-Class Model)...');

  try {
    // Check if user is authenticated
    const user = auth.currentUser;
    if (!user) {
      console.log('⚠️  No authenticated user found. Please log in first.');
      return;
    }

    console.log(`✅ Authenticated as: ${user.email}`);

    // Initialize collections
    await initializeUsersCollection();
    await initializeClassesCollection();
    await initializeEnrollmentsCollection();
    await initializeLessonsCollection();

    console.log('✅ Database setup completed successfully!');
    console.log('📊 Collections created:');
    console.log('   - users');
    console.log('   - classes');
    console.log('   - classEnrollments');
    console.log('   - lessons');

  } catch (error) {
    console.error('❌ Database setup failed:', error);
    throw error;
  }
}

/**
 * Initialize users collection with sample data
 */
async function initializeUsersCollection() {
  console.log('📝 Setting up users collection...');

  const usersRef = collection(db, 'users');
  
  // Sample users data
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
      assignedClass: null, // Teachers don't have assigned classes
      createdAt: new Date('2024-01-15T10:00:00.000Z'),
      lastLogin: new Date(),
      updatedAt: new Date()
    },
    {
      uid: 'teacher_002',
      email: 'teacher2@cyberacademy.co.il',
      displayName: 'גב\' שרה לוי',
      role: 'teacher',
      profile: {
        firstName: 'שרה',
        lastName: 'לוי',
        phone: '+972-50-234-5678',
        bio: 'מורה לפרוטוקולי רשת'
      },
      academic: {
        specialization: 'פרוטוקולי רשת',
        experience: '8 שנים',
        education: 'תואר שני במדעי המחשב'
      },
      assignedClass: null, // Teachers don't have assigned classes
      createdAt: new Date('2024-01-20T10:00:00.000Z'),
      lastLogin: new Date(),
      updatedAt: new Date()
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
      createdAt: new Date('2024-01-10T10:00:00.000Z'),
      lastLogin: new Date(),
      updatedAt: new Date()
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
      createdAt: new Date('2024-01-05T10:00:00.000Z'),
      lastLogin: new Date(),
      updatedAt: new Date()
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
      createdAt: new Date('2024-01-25T10:00:00.000Z'),
      lastLogin: new Date(),
      updatedAt: new Date()
    },
    {
      uid: 'student_004',
      email: 'student4@school.co.il',
      displayName: 'נועה כהן',
      role: 'student',
      profile: {
        firstName: 'נועה',
        lastName: 'כהן',
        phone: '+972-50-678-9012',
        bio: 'תלמידה מצטיינת באבטחת סייבר'
      },
      academic: {
        grade: 'י"ב',
        school: 'תיכון הרצליה',
        graduationYear: 2024
      },
      progress: {
        '1': {
          completed: true,
          score: 95,
          completedAt: new Date('2024-12-08T10:00:00.000Z'),
          lastSlide: 20,
          pagesEngaged: ['slide1', 'slide2', 'slide3', 'slide4'],
          lastActivity: new Date('2024-12-20T16:30:00.000Z')
        },
        '2': {
          completed: true,
          score: 90,
          completedAt: new Date('2024-12-16T10:00:00.000Z'),
          lastSlide: 18,
          pagesEngaged: ['slide1', 'slide2', 'slide3'],
          lastActivity: new Date('2024-12-18T14:30:00.000Z')
        },
        '3': {
          completed: true,
          score: 87,
          completedAt: new Date('2024-12-22T10:00:00.000Z'),
          lastSlide: 15,
          pagesEngaged: ['slide1', 'slide2'],
          lastActivity: new Date('2024-12-23T12:30:00.000Z')
        }
      },
      completedLessons: [1, 2, 3],
      currentLesson: 4,
      assignedClass: null, // Unassigned student
      createdAt: new Date('2024-01-03T10:00:00.000Z'),
      lastLogin: new Date(),
      updatedAt: new Date()
    }
  ];

  const batch = writeBatch(db);

  // Add users to batch
  sampleUsers.forEach(user => {
    const userRef = doc(usersRef, user.uid);
    batch.set(userRef, user);
  });

  await batch.commit();
  console.log(`✅ Added ${sampleUsers.length} users to collection`);
}

/**
 * Initialize classes collection with sample data
 */
async function initializeClassesCollection() {
  console.log('📝 Setting up classes collection...');

  const classesRef = collection(db, 'classes');
  
  // Sample classes data
  const sampleClasses = [
    {
      classId: 'class_001_2024',
      className: 'Class 1',
      classNumber: 1,
      description: 'כיתה ראשונה באבטחת סייבר',
      instructorId: 'teacher_001',
      instructorName: 'ד"ר משה כהן',
      students: [], // Empty - no students assigned yet
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
      currentLesson: 1, // Start at first lesson
      lessonProgress: {}, // Empty progress object
      createdAt: new Date('2024-01-10T09:00:00.000Z'),
      updatedAt: new Date()
    },
    {
      classId: 'class_002_2024',
      className: 'Class 2',
      classNumber: 2,
      description: 'כיתה שנייה באבטחת סייבר',
      instructorId: 'teacher_001',
      instructorName: 'ד"ר משה כהן',
      students: [], // Empty - no students assigned yet
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
      currentLesson: 1, // Start at first lesson
      lessonProgress: {}, // Empty progress object
      createdAt: new Date('2024-01-15T09:00:00.000Z'),
      updatedAt: new Date()
    },
    {
      classId: 'class_003_2024',
      className: 'Class 3',
      classNumber: 3,
      description: 'כיתה שלישית בפרוטוקולי רשת',
      instructorId: 'teacher_002',
      instructorName: 'גב\' שרה לוי',
      students: [], // Empty - no students assigned yet
      studentCount: 0,
      maxStudents: 18,
      schedule: {
        days: ['שלישי', 'חמישי'],
        time: '18:00-20:00',
        timezone: 'Asia/Jerusalem'
      },
      status: 'active',
      semester: '2024-א',
      year: 2024,
      startDate: new Date('2024-02-01T00:00:00.000Z'),
      endDate: new Date('2024-06-30T23:59:59.000Z'),
      currentLesson: 1, // Start at first lesson
      lessonProgress: {}, // Empty progress object
      createdAt: new Date('2024-01-20T09:00:00.000Z'),
      updatedAt: new Date()
    }
  ];

  const batch = writeBatch(db);

  // Add classes to batch
  sampleClasses.forEach(classData => {
    const classRef = doc(classesRef, classData.classId);
    batch.set(classRef, classData);
  });

  await batch.commit();
  console.log(`✅ Added ${sampleClasses.length} classes to collection`);
}

/**
 * Initialize class enrollments collection
 */
async function initializeEnrollmentsCollection() {
  console.log('📝 Setting up class enrollments collection...');

  const enrollmentsRef = collection(db, 'classEnrollments');
  
  // Sample enrollments data (empty for now - students are unassigned)
  const sampleEnrollments = [
    // No enrollments initially - students start unassigned
  ];

  const batch = writeBatch(db);

  // Add enrollments to batch (if any)
  sampleEnrollments.forEach(enrollment => {
    const enrollmentRef = doc(enrollmentsRef, enrollment.enrollmentId);
    batch.set(enrollmentRef, enrollment);
  });

  await batch.commit();
  console.log(`✅ Added ${sampleEnrollments.length} enrollments to collection`);
}

/**
 * Initialize lessons collection with sample data
 */
async function initializeLessonsCollection() {
  console.log('📝 Setting up lessons collection...');

  const lessonsRef = collection(db, 'lessons');
  
  // Sample lessons data
  const sampleLessons = [
    {
      lessonId: 1,
      title: 'מבוא לאבטחת סייבר',
      description: 'שיעור ראשון בנושא אבטחת סייבר',
      slides: [
        {
          id: 'slide1',
          title: 'מה זה אבטחת סייבר?',
          content: 'אבטחת סייבר היא הגנה על מערכות מחשב מפני גישה לא מורשית',
          type: 'presentation'
        },
        {
          id: 'slide2',
          title: 'סוגי איומים',
          content: 'וירוסים, תולעים, טרויאנים, פישינג',
          type: 'interactive'
        }
      ],
      quiz: {
        questions: [
          {
            id: 'q1',
            question: 'מה זה פישינג?',
            options: ['סוג של דג', 'הונאה דיגיטלית', 'סוג של וירוס', 'תוכנה זדונית'],
            correct: 1,
            points: 10
          }
        ]
      },
      prerequisites: [],
      estimatedDuration: 45,
      difficulty: 'beginner',
      tags: ['cybersecurity', 'basics', 'phishing'],
      createdAt: new Date('2024-01-10T08:00:00.000Z'),
      updatedAt: new Date()
    },
    {
      lessonId: 2,
      title: 'פרוטוקולי רשת',
      description: 'שיעור על פרוטוקולי רשת בסיסיים',
      slides: [
        {
          id: 'slide1',
          title: 'מה זה פרוטוקול?',
          content: 'פרוטוקול הוא סט של כללים לתקשורת בין מחשבים',
          type: 'presentation'
        }
      ],
      quiz: {
        questions: [
          {
            id: 'q1',
            question: 'איזה פרוטוקול משמש לגלישה באינטרנט?',
            options: ['HTTP', 'FTP', 'SMTP', 'SSH'],
            correct: 0,
            points: 10
          }
        ]
      },
      prerequisites: [1],
      estimatedDuration: 60,
      difficulty: 'intermediate',
      tags: ['networking', 'protocols', 'http'],
      createdAt: new Date('2024-01-15T08:00:00.000Z'),
      updatedAt: new Date()
    },
    {
      lessonId: 3,
      title: 'אבטחת רשתות',
      description: 'שיעור על אבטחת רשתות מתקדמת',
      slides: [
        {
          id: 'slide1',
          title: 'חומת אש',
          content: 'חומת אש היא מערכת אבטחה שמסננת תעבורת רשת',
          type: 'presentation'
        }
      ],
      quiz: {
        questions: [
          {
            id: 'q1',
            question: 'מה תפקיד חומת האש?',
            options: ['להאיץ את הרשת', 'לסנן תעבורה', 'לשמור קבצים', 'לחבר מחשבים'],
            correct: 1,
            points: 10
          }
        ]
      },
      prerequisites: [1, 2],
      estimatedDuration: 75,
      difficulty: 'advanced',
      tags: ['cybersecurity', 'networking', 'firewall'],
      createdAt: new Date('2024-01-20T08:00:00.000Z'),
      updatedAt: new Date()
    }
  ];

  const batch = writeBatch(db);

  // Add lessons to batch
  sampleLessons.forEach(lesson => {
    const lessonRef = doc(lessonsRef, lesson.lessonId.toString());
    batch.set(lessonRef, lesson);
  });

  await batch.commit();
  console.log(`✅ Added ${sampleLessons.length} lessons to collection`);
}

/**
 * Assign students to classes (for testing)
 */
async function assignStudentsToClasses() {
  console.log('📝 Assigning students to classes...');

  try {
    // Assign student_001 to class_001_2024
    const batch = writeBatch(db);

    // Update student
    batch.update(doc(db, 'users', 'student_001'), {
      assignedClass: 'class_001_2024',
      updatedAt: new Date()
    });

    // Update class
    batch.update(doc(db, 'classes', 'class_001_2024'), {
      students: ['student_001'],
      studentCount: 1,
      updatedAt: new Date()
    });

    // Create enrollment
    const enrollmentData = {
      classId: 'class_001_2024',
      studentId: 'student_001',
      instructorId: 'teacher_001',
      status: 'active',
      enrolledAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const enrollmentRef = doc(collection(db, 'classEnrollments'));
    batch.set(enrollmentRef, enrollmentData);

    await batch.commit();
    console.log('✅ Assigned student_001 to class_001_2024');

  } catch (error) {
    console.error('❌ Error assigning students:', error);
  }
}

/**
 * Verify database setup
 */
async function verifySetup() {
  console.log('🔍 Verifying database setup...');

  try {
    // Check users collection
    const usersSnapshot = await getDocs(collection(db, 'users'));
    console.log(`✅ Users collection: ${usersSnapshot.size} documents`);

    // Check classes collection
    const classesSnapshot = await getDocs(collection(db, 'classes'));
    console.log(`✅ Classes collection: ${classesSnapshot.size} documents`);

    // Check enrollments collection
    const enrollmentsSnapshot = await getDocs(collection(db, 'classEnrollments'));
    console.log(`✅ Enrollments collection: ${enrollmentsSnapshot.size} documents`);

    // Check lessons collection
    const lessonsSnapshot = await getDocs(collection(db, 'lessons'));
    console.log(`✅ Lessons collection: ${lessonsSnapshot.size} documents`);

    console.log('✅ Database verification completed successfully!');

  } catch (error) {
    console.error('❌ Database verification failed:', error);
  }
}

// Export functions for use in other scripts
export {
  setupDatabase,
  initializeUsersCollection,
  initializeClassesCollection,
  initializeEnrollmentsCollection,
  initializeLessonsCollection,
  assignStudentsToClasses,
  verifySetup
};

// Run setup if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupDatabase()
    .then(() => verifySetup())
    .then(() => {
      console.log('🎉 Database setup completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Database setup failed:', error);
      process.exit(1);
    });
} 