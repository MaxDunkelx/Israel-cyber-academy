/**
 * Update Slide 19 Header in Firebase
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, query, where, updateDoc, serverTimestamp } from 'firebase/firestore';
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

// Updated slide 19 content with header
const updatedSlide19 = {
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
};

// Update slide 19 in Firebase
const updateSlide19 = async () => {
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
    
    // Find slide 19
    const slidesRef = collection(db, 'slides');
    const slideQuery = query(
      slidesRef, 
      where('lessonId', '==', lessonDoc.id),
      where('id', '==', 'slide-19')
    );
    const slideSnapshot = await getDocs(slideQuery);
    
    if (slideSnapshot.empty) {
      console.log('❌ Slide 19 not found');
      return;
    }
    
    const slideDoc = slideSnapshot.docs[0];
    console.log('🔍 Found slide 19:', slideDoc.id);
    
    // Update slide 19
    await updateDoc(doc(db, 'slides', slideDoc.id), {
      ...updatedSlide19,
      updatedAt: serverTimestamp()
    });
    
    console.log('✅ Successfully updated slide 19 with header!');
    
  } catch (error) {
    console.error('❌ Error updating slide 19:', error);
  }
};

// Run the update
updateSlide19(); 