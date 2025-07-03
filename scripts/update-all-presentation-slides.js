/**
 * Update All Presentation Slides - Add headers and consistent sizing
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

// Updated slide content with headers and consistent sizing
const updatedSlides = {
  'lLhyDD49ym59um9zrel6': { // slide-1
    content: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      elements: [
        {
          type: "title",
          text: "ברוכים הבאים לעולם הסייבר! 🚀",
          style: { fontSize: "3rem", color: "white", textAlign: "center", marginBottom: "2rem", fontWeight: "bold", textShadow: "0 4px 8px rgba(0,0,0,0.3)" }
        },
        {
          type: "subtitle",
          text: "היום נלמד על האקרים, איומים דיגיטליים ואיך להישאר בטוחים באינטרנט",
          style: { fontSize: "1.5rem", color: "white", textAlign: "center", opacity: 0.9, marginBottom: "2rem" }
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400",
          alt: "Cybersecurity",
          style: { width: "350px", borderRadius: "15px", margin: "2rem auto" }
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
          type: "title",
          text: "מה נלמד היום?",
          style: { fontSize: "3rem", color: "white", textAlign: "center", marginBottom: "2rem", fontWeight: "bold", textShadow: "0 4px 8px rgba(0,0,0,0.3)" }
        },
        {
          type: "image",
          src: "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&w=600&h=400&fit=crop",
          alt: "Welcome sign",
          style: { width: "350px", borderRadius: "30px", margin: "2rem auto", transform: "rotate(-20deg)" }
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
          style: { fontSize: "1.5rem", color: "white", textAlign: "right", lineHeight: "2", margin: "2rem 0" }
        }
      ]
    }
  },
  '9Xsv2e3oGQRFkJrxh8Fs': { // slide-3
    content: {
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      elements: [
        {
          type: "title",
          text: "מה זה סייבר? 🧭",
          style: { fontSize: "3rem", color: "white", textAlign: "center", marginBottom: "2rem", fontWeight: "bold", textShadow: "0 4px 8px rgba(0,0,0,0.3)" }
        },
        {
          type: "list",
          items: [
            "🔹 קיצור של 'קיברנטיקה' – תקשורת בין אדם למכונה",
            "🔹 'סייבר סיקיוריטי' = הגנה על מחשבים ומידע",
            "🔹 'סייבר התקפי' = תקיפות מחשבים",
            "🔹 'האקר' = אדם שמבצע פעולות בתחום"
          ],
          style: { fontSize: "1.5rem", color: "white", textAlign: "right", lineHeight: "2.5", margin: "2rem 0" }
        },
        {
          type: "animation",
          type: "bounce",
          element: "💻",
          style: { fontSize: "4rem", textAlign: "center", margin: "2rem" }
        }
      ]
    }
  },
  'J21FFrixcuzNVTKvo5Tb': { // slide-6
    content: {
      background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      elements: [
        {
          type: "title",
          text: "מה זה אבטחת מידע? 🔒",
          style: { fontSize: "3rem", color: "#333", textAlign: "center", marginBottom: "2rem", fontWeight: "bold", textShadow: "0 4px 8px rgba(0,0,0,0.3)" }
        },
        {
          type: "subtitle",
          text: "הגנה על מערכות מידע",
          style: { fontSize: "1.5rem", color: "#666", textAlign: "center", marginBottom: "2rem" }
        },
        {
          type: "list",
          items: [
            "💻 מחשבים, שרתים, רשתות",
            "🚗 תחבורה חכמה",
            "🏠 מכשירים חכמים (IoT)",
            "📱 טלפונים ניידים"
          ],
          style: { fontSize: "1.5rem", color: "#333", textAlign: "right", lineHeight: "2.5", margin: "2rem 0" }
        },
        {
          type: "subtitle",
          text: "שיטות הגנה:",
          style: { fontSize: "1.5rem", color: "#666", textAlign: "center", marginTop: "2rem", marginBottom: "1rem" }
        },
        {
          type: "list",
          items: [
            "✅ אימות זהות",
            "👁️ ניטור פעילות",
            "🎛️ בקרה על גישה",
            "📚 מודעות והדרכה"
          ],
          style: { fontSize: "1.5rem", color: "#333", textAlign: "right", lineHeight: "2.5", margin: "2rem 0" }
        }
      ]
    }
  },
  'slide-19': { // slide-19
    content: {
      background: "linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)",
      elements: [
        {
          type: "title",
          text: "סיכום השיעור 📚",
          style: { fontSize: "3rem", color: "white", textAlign: "center", marginBottom: "2rem", fontWeight: "bold", textShadow: "0 4px 8px rgba(0,0,0,0.3)" }
        },
        {
          type: "list",
          items: [
            "🔍 הכרנו את עולם הסייבר והאקרים",
            "🎯 הבנו את ההבדל בין האקרים 'כובע לבן', 'אפור' ו'שחור'",
            "🛡️ למדנו על כלי אבטחה חשובים",
            "🔐 הבנו את חשיבות הסיסמאות החזקות",
            "📱 למדנו איך להישאר בטוחים באינטרנט"
          ],
          style: { 
            fontSize: "1.5rem", 
            color: "white", 
            textAlign: "right", 
            lineHeight: "2.5", 
            margin: "2rem 0",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)"
          }
        },
        {
          type: "subtitle",
          text: "כל הכבוד! סיימת את השיעור הראשון בעולם הסייבר 🎉",
          style: { 
            fontSize: "2.2rem", 
            color: "white", 
            textAlign: "center", 
            marginTop: "3rem", 
            fontWeight: "bold",
            textShadow: "0 3px 6px rgba(0,0,0,0.4)"
          }
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400",
          alt: "Cybersecurity Success",
          style: { 
            width: "350px", 
            borderRadius: "20px", 
            margin: "3rem auto",
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
          }
        },
        {
          type: "timer",
          duration: 90,
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
    console.log('📱 All presentation slides now have consistent headers and sizing.');
    
  } catch (error) {
    console.error('❌ Error updating slides:', error);
  }
};

// Run the update
updateSlides(); 