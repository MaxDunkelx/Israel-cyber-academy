/**
 * Database Reconstruction Script
 * Reconstructs all missing collections required by the application
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, addDoc, serverTimestamp } from 'firebase/firestore';

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

async function reconstructDatabase() {
  console.log('🏗️ Starting database reconstruction...\n');

  try {
    // 1. Create Classes Collection
    console.log('📚 Creating classes collection...');
    await createClassesCollection();
    
    // 2. Create Sessions Collection
    console.log('🎯 Creating sessions collection...');
    await createSessionsCollection();
    
    // 3. Create Teacher Comments Collection
    console.log('💬 Creating teacher comments collection...');
    await createTeacherCommentsCollection();
    
    // 4. Create Teacher Activities Collection
    console.log('📊 Creating teacher activities collection...');
    await createTeacherActivitiesCollection();
    
    // 5. Create Teacher Notes Collection
    console.log('📝 Creating teacher notes collection...');
    await createTeacherNotesCollection();
    
    // 6. Create Security Events Collection
    console.log('🔒 Creating security events collection...');
    await createSecurityEventsCollection();
    
    // 7. Create User Activities Collection
    console.log('👤 Creating user activities collection...');
    await createUserActivitiesCollection();
    
    // 8. Create User Presence Collection
    console.log('📍 Creating user presence collection...');
    await createUserPresenceCollection();
    
    // 9. Create Security Logs Collection
    console.log('📋 Creating security logs collection...');
    await createSecurityLogsCollection();
    
    // 10. Create Lessons Collection with Slides
    console.log('📖 Creating lessons collection with slides...');
    await createLessonsCollection();
    
    console.log('\n✅ Database reconstruction completed successfully!');
    console.log('🎉 All required collections have been created with sample data.');
    
  } catch (error) {
    console.error('❌ Database reconstruction failed:', error);
  }
}

async function createClassesCollection() {
  const classes = [
    {
      id: 'class01',
      name: 'כיתה ז1',
      teacherId: 'teacher01',
      teacherName: 'מורה 1',
      school: 'בית ספר 1',
      grade: 7,
      students: ['student001', 'student002', 'student003', 'student004', 'student005'],
      maxStudents: 25,
      status: 'active',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    },
    {
      id: 'class02',
      name: 'כיתה ח1',
      teacherId: 'teacher02',
      teacherName: 'מורה 2',
      school: 'בית ספר 1',
      grade: 8,
      students: ['student006', 'student007', 'student008', 'student009', 'student010'],
      maxStudents: 25,
      status: 'active',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    },
    {
      id: 'class03',
      name: 'כיתה ט1',
      teacherId: 'teacher03',
      teacherName: 'מורה 3',
      school: 'בית ספר 2',
      grade: 9,
      students: ['student011', 'student012', 'student013', 'student014', 'student015'],
      maxStudents: 25,
      status: 'active',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
  ];

  for (const classData of classes) {
    await setDoc(doc(db, 'classes', classData.id), classData);
    console.log(`   ✅ Created class: ${classData.name}`);
  }
}

async function createSessionsCollection() {
  const sessions = [
    {
      id: 'session001',
      sessionId: 'session001',
      teacherId: 'teacher01',
      teacherName: 'מורה 1',
      lessonId: 'lesson1',
      lessonName: 'מבוא לאבטחת סייבר',
      className: 'כיתה ז1',
      classId: 'class01',
      currentSlide: 1,
      totalSlides: 20,
      connectedStudents: ['student001', 'student002', 'student003'],
      totalStudents: 5,
      startTime: serverTimestamp(),
      lastActivity: serverTimestamp(),
      isLocked: false,
      chatEnabled: true,
      status: 'active',
      settings: {
        allowChat: true,
        allowQuestions: true,
        autoAdvance: false,
        showProgress: true
      }
    },
    {
      id: 'session002',
      sessionId: 'session002',
      teacherId: 'teacher02',
      teacherName: 'מורה 2',
      lessonId: 'lesson2',
      lessonName: 'מחשבים וחומרה',
      className: 'כיתה ח1',
      classId: 'class02',
      currentSlide: 5,
      totalSlides: 25,
      connectedStudents: ['student006', 'student007'],
      totalStudents: 5,
      startTime: serverTimestamp(),
      lastActivity: serverTimestamp(),
      isLocked: false,
      chatEnabled: true,
      status: 'active',
      settings: {
        allowChat: true,
        allowQuestions: true,
        autoAdvance: false,
        showProgress: true
      }
    }
  ];

  for (const sessionData of sessions) {
    await setDoc(doc(db, 'sessions', sessionData.id), sessionData);
    console.log(`   ✅ Created session: ${sessionData.lessonName}`);
  }
}

async function createTeacherCommentsCollection() {
  const comments = [
    {
      id: 'comment001',
      teacherId: 'teacher01',
      teacherName: 'מורה 1',
      studentId: 'student001',
      studentName: 'תלמיד 1',
      lessonId: 'lesson1',
      lessonName: 'מבוא לאבטחת סייבר',
      comment: 'עבודה מצוינת! הבנת את הנושא בצורה טובה מאוד.',
      type: 'positive',
      timestamp: serverTimestamp(),
      isPrivate: false
    },
    {
      id: 'comment002',
      teacherId: 'teacher01',
      teacherName: 'מורה 1',
      studentId: 'student002',
      studentName: 'תלמיד 2',
      lessonId: 'lesson1',
      lessonName: 'מבוא לאבטחת סייבר',
      comment: 'נסה להתאמן יותר על התרגילים.',
      type: 'suggestion',
      timestamp: serverTimestamp(),
      isPrivate: true
    }
  ];

  for (const commentData of comments) {
    await setDoc(doc(db, 'teacherComments', commentData.id), commentData);
    console.log(`   ✅ Created comment for: ${commentData.studentName}`);
  }
}

async function createTeacherActivitiesCollection() {
  const activities = [
    {
      id: 'activity001',
      teacherId: 'teacher01',
      teacherName: 'מורה 1',
      type: 'session_started',
      description: 'התחיל שיעור חדש: מבוא לאבטחת סייבר',
      lessonId: 'lesson1',
      lessonName: 'מבוא לאבטחת סייבר',
      classId: 'class01',
      className: 'כיתה ז1',
      timestamp: serverTimestamp(),
      metadata: {
        studentsCount: 5,
        sessionId: 'session001'
      }
    },
    {
      id: 'activity002',
      teacherId: 'teacher01',
      teacherName: 'מורה 1',
      type: 'comment_added',
      description: 'הוסיף הערה לתלמיד',
      studentId: 'student001',
      studentName: 'תלמיד 1',
      timestamp: serverTimestamp(),
      metadata: {
        commentId: 'comment001'
      }
    }
  ];

  for (const activityData of activities) {
    await setDoc(doc(db, 'teacherActivities', activityData.id), activityData);
    console.log(`   ✅ Created activity: ${activityData.type}`);
  }
}

async function createTeacherNotesCollection() {
  const notes = [
    {
      id: 'note001',
      teacherId: 'teacher01',
      teacherName: 'מורה 1',
      title: 'הערות על שיעור 1',
      content: 'השיעור עבר טוב. רוב התלמידים הבינו את החומר.',
      lessonId: 'lesson1',
      lessonName: 'מבוא לאבטחת סייבר',
      classId: 'class01',
      className: 'כיתה ז1',
      timestamp: serverTimestamp(),
      isPrivate: true
    },
    {
      id: 'note002',
      teacherId: 'teacher01',
      teacherName: 'מורה 1',
      title: 'תלמידים שצריכים עזרה נוספת',
      content: 'תלמיד 2 ותלמיד 3 צריכים עזרה נוספת בנושא סיסמאות.',
      lessonId: 'lesson1',
      lessonName: 'מבוא לאבטחת סייבר',
      classId: 'class01',
      className: 'כיתה ז1',
      timestamp: serverTimestamp(),
      isPrivate: true
    }
  ];

  for (const noteData of notes) {
    await setDoc(doc(db, 'teacherNotes', noteData.id), noteData);
    console.log(`   ✅ Created note: ${noteData.title}`);
  }
}

async function createSecurityEventsCollection() {
  const events = [
    {
      id: 'event001',
      type: 'login_success',
      userId: 'student001',
      userEmail: 'student001@cyber.academy',
      userRole: 'student',
      description: 'התחברות מוצלחת',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      timestamp: serverTimestamp(),
      severity: 'info'
    },
    {
      id: 'event002',
      type: 'login_failed',
      userEmail: 'unknown@example.com',
      description: 'ניסיון התחברות כושל',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      timestamp: serverTimestamp(),
      severity: 'warning'
    },
    {
      id: 'event003',
      type: 'session_created',
      userId: 'teacher01',
      userEmail: 'teacher01@cyber.academy',
      userRole: 'teacher',
      description: 'יצירת שיעור חדש',
      sessionId: 'session001',
      lessonId: 'lesson1',
      timestamp: serverTimestamp(),
      severity: 'info'
    }
  ];

  for (const eventData of events) {
    await setDoc(doc(db, 'securityEvents', eventData.id), eventData);
    console.log(`   ✅ Created security event: ${eventData.type}`);
  }
}

async function createUserActivitiesCollection() {
  const activities = [
    {
      id: 'user_activity001',
      userId: 'student001',
      userEmail: 'student001@cyber.academy',
      userRole: 'student',
      type: 'lesson_started',
      description: 'התחיל שיעור: מבוא לאבטחת סייבר',
      lessonId: 'lesson1',
      lessonName: 'מבוא לאבטחת סייבר',
      timestamp: serverTimestamp(),
      metadata: {
        slideNumber: 1
      }
    },
    {
      id: 'user_activity002',
      userId: 'student001',
      userEmail: 'student001@cyber.academy',
      userRole: 'student',
      type: 'slide_completed',
      description: 'השלים שקופית 5',
      lessonId: 'lesson1',
      lessonName: 'מבוא לאבטחת סייבר',
      timestamp: serverTimestamp(),
      metadata: {
        slideNumber: 5,
        timeSpent: 120
      }
    },
    {
      id: 'user_activity003',
      userId: 'teacher01',
      userEmail: 'teacher01@cyber.academy',
      userRole: 'teacher',
      type: 'session_created',
      description: 'יצר שיעור חדש',
      sessionId: 'session001',
      timestamp: serverTimestamp(),
      metadata: {
        studentsCount: 5
      }
    }
  ];

  for (const activityData of activities) {
    await setDoc(doc(db, 'userActivities', activityData.id), activityData);
    console.log(`   ✅ Created user activity: ${activityData.type}`);
  }
}

async function createUserPresenceCollection() {
  const presence = [
    {
      id: 'student001',
      userId: 'student001',
      userEmail: 'student001@cyber.academy',
      userRole: 'student',
      status: 'online',
      lastSeen: serverTimestamp(),
      currentSession: 'session001',
      metadata: {
        lessonId: 'lesson1',
        lessonName: 'מבוא לאבטחת סייבר',
        slideNumber: 5
      }
    },
    {
      id: 'student002',
      userId: 'student002',
      userEmail: 'student002@cyber.academy',
      userRole: 'student',
      status: 'online',
      lastSeen: serverTimestamp(),
      currentSession: 'session001',
      metadata: {
        lessonId: 'lesson1',
        lessonName: 'מבוא לאבטחת סייבר',
        slideNumber: 3
      }
    },
    {
      id: 'teacher01',
      userId: 'teacher01',
      userEmail: 'teacher01@cyber.academy',
      userRole: 'teacher',
      status: 'online',
      lastSeen: serverTimestamp(),
      currentSession: 'session001',
      metadata: {
        lessonId: 'lesson1',
        lessonName: 'מבוא לאבטחת סייבר',
        slideNumber: 5,
        studentsCount: 5
      }
    }
  ];

  for (const presenceData of presence) {
    await setDoc(doc(db, 'userPresence', presenceData.id), presenceData);
    console.log(`   ✅ Created presence for: ${presenceData.userEmail}`);
  }
}

async function createSecurityLogsCollection() {
  const logs = [
    {
      id: 'log001',
      type: 'authentication',
      action: 'login_success',
      userId: 'student001',
      userEmail: 'student001@cyber.academy',
      userRole: 'student',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      timestamp: serverTimestamp(),
      details: {
        method: 'pure_firestore_auth',
        success: true
      }
    },
    {
      id: 'log002',
      type: 'authorization',
      action: 'access_granted',
      userId: 'teacher01',
      userEmail: 'teacher01@cyber.academy',
      userRole: 'teacher',
      resource: 'teacher_dashboard',
      timestamp: serverTimestamp(),
      details: {
        method: 'role_based_access',
        success: true
      }
    }
  ];

  for (const logData of logs) {
    await setDoc(doc(db, 'security_logs', logData.id), logData);
    console.log(`   ✅ Created security log: ${logData.action}`);
  }
}

async function createLessonsCollection() {
  // Create lesson documents
  const lessons = [
    {
      id: 'lesson1',
      title: 'מבוא לאבטחת סייבר',
      description: 'שיעור מבוא בנושא אבטחת סייבר',
      grade: 7,
      difficulty: 'beginner',
      estimatedDuration: 45,
      slides: 20,
      status: 'active',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    },
    {
      id: 'lesson2',
      title: 'מחשבים וחומרה',
      description: 'הכרת רכיבי המחשב',
      grade: 8,
      difficulty: 'beginner',
      estimatedDuration: 60,
      slides: 25,
      status: 'active',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    },
    {
      id: 'lesson3',
      title: 'מערכות הפעלה',
      description: 'הכרת מערכות הפעלה',
      grade: 9,
      difficulty: 'intermediate',
      estimatedDuration: 50,
      slides: 22,
      status: 'active',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
  ];

  for (const lessonData of lessons) {
    await setDoc(doc(db, 'lessons', lessonData.id), lessonData);
    console.log(`   ✅ Created lesson: ${lessonData.title}`);
    
    // Create slides subcollection for each lesson
    await createLessonSlides(lessonData.id, lessonData.slides);
  }
}

async function createLessonSlides(lessonId, slideCount) {
  for (let i = 1; i <= slideCount; i++) {
    const slideData = {
      id: `slide${i}`,
      slideNumber: i,
      title: `שקופית ${i}`,
      type: i % 5 === 0 ? 'quiz' : i % 3 === 0 ? 'interactive' : 'presentation',
      content: {
        text: `תוכן השקופית ${i}`,
        media: i % 4 === 0 ? { type: 'image', url: 'https://example.com/image.jpg' } : null
      },
      duration: 120,
      isRequired: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    await setDoc(doc(db, 'lessons', lessonId, 'slides', slideData.id), slideData);
  }
  console.log(`   ✅ Created ${slideCount} slides for lesson ${lessonId}`);
}

// Run the reconstruction
reconstructDatabase().then(() => {
  console.log('\n🎉 Database reconstruction script completed!');
  process.exit(0);
}).catch((error) => {
  console.error('❌ Script failed:', error);
  process.exit(1);
}); 