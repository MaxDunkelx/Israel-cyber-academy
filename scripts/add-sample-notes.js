/**
 * Add sample teacher notes to the database for testing
 * This script finds a real teacher and creates sample notes for lesson slides
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

const addSampleNotes = async () => {
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
    
    // Create sample notes for different lessons and slides
    const sampleNotes = [
      {
        teacherId: teacherId,
        lessonId: 'lesson1',
        slideId: 'slide1',
        content: `הערות לשיעור מבוא לסייבר - שקופית 1

• התחלה עם הסבר על מה זה סייבר
• שאל את התלמידים מה הם יודעים על סייבר
• הדגש על החשיבות של אבטחת מידע
• זמן מוקצב: 5 דקות לדיון

טיפים:
- השתמש בדוגמאות מהחיים האמיתיים
- שאל שאלות מעוררות מחשבה
- שמור על עניין התלמידים`,
        createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        updatedAt: new Date(Date.now() - 1000 * 60 * 30),
        read: false
      },
      {
        teacherId: teacherId,
        lessonId: 'lesson1',
        slideId: 'slide5',
        content: `הערות לשקופית 5 - משחק האקר

• זהו חלק אינטראקטיבי חשוב
• וודא שכל התלמידים משתתפים
• הסבר את הכללים בבירור
• זמן מוקצב: 10 דקות

הכנה:
- בדוק שהמשחק עובד לפני השיעור
- הכין גיבוי למקרה של בעיות טכניות
- וודא שיש מספיק זמן לדיון אחרי המשחק`,
        createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        updatedAt: new Date(Date.now() - 1000 * 60 * 60),
        read: false
      },
      {
        teacherId: teacherId,
        lessonId: 'lesson2',
        slideId: 'slide1',
        content: `הערות לשיעור רכיבי מחשב - שקופית 1

• התחלה עם סקירה כללית של המחשב
• שאל את התלמידים איזה רכיבים הם מכירים
• הדגש על הקשר בין הרכיבים השונים
• זמן מוקצב: 7 דקות

חומרים נדרשים:
- תמונות של רכיבי מחשב
- דוגמאות פיזיות אם אפשר
- מצגת עם אנימציות`,
        createdAt: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
        updatedAt: new Date(Date.now() - 1000 * 60 * 90),
        read: false
      },
      {
        teacherId: teacherId,
        lessonId: 'lesson2',
        slideId: 'slide17',
        content: `הערות לשקופית 17 - סימולטור מחשב

• זהו החלק המעשי של השיעור
• וודא שכל התלמידים מבינים את המשימה
• עזור לתלמידים שמתקשים
• זמן מוקצב: 15 דקות

בדיקות:
- וודא שהסימולטור עובד בכל המחשבים
- הכין הוראות ברורות
- וודא שיש מספיק זמן לשאלות`,
        createdAt: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
        updatedAt: new Date(Date.now() - 1000 * 60 * 120),
        read: false
      },
      {
        teacherId: teacherId,
        lessonId: 'lesson3',
        slideId: 'slide1',
        content: `הערות לשיעור Windows - שקופית 1

• התחלה עם היסטוריה של Windows
• שאל איזה גרסאות Windows התלמידים מכירים
• הדגש על השינויים בין הגרסאות
• זמן מוקצב: 8 דקות

הכנה:
- הכין תמונות של גרסאות Windows שונות
- וודא שיש דוגמאות מעשיות
- הכין שאלות לדיון`,
        createdAt: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
        updatedAt: new Date(Date.now() - 1000 * 60 * 180),
        read: false
      }
    ];
    
    console.log('🚀 Starting to add sample notes...');
    
    const notesRef = collection(db, 'teacherNotes');
    
    for (const note of sampleNotes) {
      console.log(`📝 Adding notes for lesson ${note.lessonId}, slide ${note.slideId}`);
      
      const noteDoc = {
        ...note,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      await addDoc(notesRef, noteDoc);
      console.log(`✅ Added notes for lesson ${note.lessonId}, slide ${note.slideId}`);
    }
    
    console.log('🎉 All sample notes added successfully!');
    console.log(`📊 Added ${sampleNotes.length} notes for teacher: ${teacherData.displayName || teacherData.email}`);
    console.log(`🆔 Teacher ID: ${teacherId}`);
    
  } catch (error) {
    console.error('❌ Error adding sample notes:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
  }
};

// Run the script
addSampleNotes()
  .then(() => {
    console.log('✅ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }); 