/**
 * Fix All Presentation Slides - Remove redundant title elements
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, query, where, updateDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

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

// Updated slide content (without redundant titles)
const updatedSlides = {
  'lLhyDD49ym59um9zrel6': { // slide-1
    content: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      elements: [
        {
          type: "subtitle",
          text: "היום נלמד על האקרים, איומים דיגיטליים ואיך להישאר בטוחים באינטרנט",
          style: { fontSize: "1.5rem", color: "white", textAlign: "center", opacity: 0.9 }
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400",
          alt: "Cybersecurity",
          style: { width: "300px", borderRadius: "15px", margin: "2rem auto" }
        },
        {
          type: "timer",
          duration: 45,
          text: "זמן קריאה"
        }
      ]
    }
  },
  'kxXjeMOHa08kEp5npjFj': { // slide-1a
    content: {
      background: "#000000",
      elements: [
        {
          type: "image",
          src: "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&w=600&h=400&fit=crop",
          alt: "Welcome sign",
          style: { width: "400px", borderRadius: "30px", margin: "2rem 0 2rem 0", transform: "rotate(-20deg)" }
        },
        {
          type: "list",
          items: [
            "היום נלמד להכיר קצת את עולם הסייבר.",
            "נבין מי הם האנשים שתוקפים מחשבים ולמה הם עושים את זה.",
            "אחר כך נלמד מה זה בכלל 'סייבר' ונכיר חלק מהדברים החשובים בו.",
            "זה שיעור עם הרבה ידע מעניין – מומלץ מאוד לרשום נקודות חשובות.",
            "יש שאלות? אפשר ורצוי לשאול תוך כדי."
          ],
          style: { fontSize: "1.5rem", color: "white", textAlign: "right", lineHeight: "2", margin: "0 0 0 0" }
        }
      ]
    }
  },
  '9Xsv2e3oGQRFkJrxh8Fs': { // slide-3
    content: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      elements: [
        {
          type: "subtitle",
          text: "סייבר הוא עולם שלם של אבטחת מידע דיגיטלי",
          style: { fontSize: "1.5rem", color: "white", textAlign: "center", opacity: 0.9 }
        },
        {
          type: "list",
          items: [
            "🔒 הגנה על מידע מפני גישה לא מורשית",
            "🛡️ הגנה על מערכות מחשב מפני התקפות",
            "📱 הגנה על מכשירים ניידים וטאבלטים",
            "🌐 הגנה על פעילות באינטרנט",
            "💾 הגנה על קבצים ונתונים חשובים"
          ],
          style: { fontSize: "1.4rem", color: "white", textAlign: "right", lineHeight: "2.5", margin: "2rem 0" }
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400",
          alt: "Cybersecurity",
          style: { width: "350px", borderRadius: "15px", margin: "2rem auto" }
        },
        {
          type: "timer",
          duration: 60,
          text: "זמן קריאה"
        }
      ]
    }
  },
  'J21FFrixcuzNVTKvo5Tb': { // slide-6
    content: {
      background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
      elements: [
        {
          type: "subtitle",
          text: "אבטחת מידע היא הגנה על מידע מפני גישה לא מורשית",
          style: { fontSize: "1.5rem", color: "white", textAlign: "center", opacity: 0.9 }
        },
        {
          type: "list",
          items: [
            "🔐 סיסמאות חזקות ומורכבות",
            "🛡️ תוכנות אנטי-וירוס מעודכנות",
            "🔒 הצפנת מידע רגיש",
            "📧 זהירות מפני פישינג",
            "💾 גיבוי קבוע של נתונים"
          ],
          style: { fontSize: "1.4rem", color: "white", textAlign: "right", lineHeight: "2.5", margin: "2rem 0" }
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400",
          alt: "Security Tools",
          style: { width: "350px", borderRadius: "15px", margin: "2rem auto" }
        },
        {
          type: "timer",
          duration: 60,
          text: "זמן קריאה"
        }
      ]
    }
  }
};

// Update slides in Firebase
const updateSlides = async () => {
  try {
    console.log('🔍 Finding lesson 1 in Firebase...');
    
    // Find lesson 1
    const lessonsRef = collection(db, 'lessons');
    const lessonQuery = query(lessonsRef, where('originalId', '==', 1));
    const lessonSnapshot = await getDocs(lessonQuery);
    
    if (lessonSnapshot.empty) {
      console.log('❌ Lesson 1 not found');
      return;
    }
    
    const lessonDoc = lessonSnapshot.docs[0];
    console.log('✅ Found lesson 1:', lessonDoc.id);
    
    let updatedCount = 0;
    
    // Update each slide that needs fixing
    for (const [slideId, updatedContent] of Object.entries(updatedSlides)) {
      console.log(`🔄 Updating slide ${slideId}...`);
      
      try {
        await updateDoc(doc(db, 'slides', slideId), {
          ...updatedContent,
          updatedAt: serverTimestamp()
        });
        
        updatedCount++;
        console.log(`✅ Updated slide ${slideId}`);
      } catch (error) {
        console.log(`❌ Failed to update slide ${slideId}:`, error.message);
      }
    }
    
    console.log(`\n🎉 Successfully updated ${updatedCount} slides!`);
    console.log('📱 The presentation slides now have cleaner layouts without redundant headers.');
    
  } catch (error) {
    console.error('❌ Error updating slides:', error);
  }
};

// Run the update
updateSlides(); 