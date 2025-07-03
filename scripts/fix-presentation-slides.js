/**
 * Fix Presentation Slides - Remove redundant title elements
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
  'slide-1': {
    id: "slide-1",
    type: "presentation",
    title: "ברוכים הבאים לעולם הסייבר! 🚀",
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
  'slide-1a': {
    id: "slide-1a",
    type: "presentation",
    title: "מה נלמד היום?",
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
  'slide-6a': {
    id: "slide-6a",
    type: "presentation",
    title: "יישום אבטחה מעשי 🔒",
    content: {
      background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
      elements: [
        {
          type: "list",
          items: [
            "🔐 סיסמאות חזקות עם אותיות, מספרים וסימנים",
            "📱 עדכון קבוע של אפליקציות ומערכות הפעלה",
            "🔍 בדיקת כתובות אתרים לפני הזנת פרטים",
            "📧 אי פתיחת קישורים ממיילים חשודים",
            "💾 גיבוי קבוע של קבצים חשובים"
          ],
          style: { fontSize: "1.4rem", color: "white", textAlign: "right", lineHeight: "2.5", margin: "2rem 0" }
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400",
          alt: "Security Implementation",
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
  'slide-19': {
    id: "slide-19",
    type: "presentation",
    title: "סיכום השיעור 📚",
    content: {
      background: "linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)",
      elements: [
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
            fontSize: "1.8rem", 
            color: "white", 
            textAlign: "right", 
            lineHeight: "2.8", 
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
    
    // Get all slides for lesson 1
    const slidesRef = collection(db, 'slides');
    const slidesQuery = query(
      slidesRef, 
      where('lessonId', '==', lessonDoc.id),
      orderBy('order', 'asc')
    );
    const slidesSnapshot = await getDocs(slidesQuery);
    
    console.log(`📊 Found ${slidesSnapshot.size} slides for lesson 1`);
    
    let updatedCount = 0;
    
    // Update each slide that needs fixing
    for (const [slideId, updatedContent] of Object.entries(updatedSlides)) {
      const slide = slidesSnapshot.docs.find(doc => doc.data().id === slideId);
      
      if (slide) {
        console.log(`🔄 Updating ${slideId}...`);
        
        await updateDoc(doc(db, 'slides', slide.id), {
          ...updatedContent,
          updatedAt: serverTimestamp()
        });
        
        updatedCount++;
        console.log(`✅ Updated ${slideId}`);
      } else {
        console.log(`⚠️ Slide ${slideId} not found`);
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