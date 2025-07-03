/**
 * Fix Slide 19 - Update with better visibility
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

// Updated slide 19 content
const updatedSlide19 = {
  id: "slide-19",
  type: "presentation",
  title: "סיכום השיעור 📚",
  content: {
    background: "linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)",
    elements: [
      {
        type: "title",
        text: "מה למדנו היום?",
        style: { 
          fontSize: "3.5rem", 
          color: "white", 
          textAlign: "center", 
          marginBottom: "3rem",
          fontWeight: "bold",
          textShadow: "0 4px 8px rgba(0,0,0,0.5)"
        }
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
};

// Find and update slide 19
const updateSlide19 = async () => {
  try {
    console.log('🔍 Finding slide 19 in Firebase...');
    
    // Find lesson 1 first
    const lessonsRef = collection(db, 'lessons');
    const lessonQuery = query(lessonsRef, where('originalId', '==', 1));
    const lessonSnapshot = await getDocs(lessonQuery);
    
    if (lessonSnapshot.empty) {
      console.log('❌ Lesson 1 not found');
      return;
    }
    
    const lessonDoc = lessonSnapshot.docs[0];
    console.log('✅ Found lesson 1:', lessonDoc.id);
    
    // Get all slides for lesson 1, ordered by order
    const slidesRef = collection(db, 'slides');
    const slidesQuery = query(
      slidesRef, 
      where('lessonId', '==', lessonDoc.id),
      orderBy('order', 'asc')
    );
    const slidesSnapshot = await getDocs(slidesQuery);
    
    console.log(`📊 Found ${slidesSnapshot.size} slides for lesson 1`);
    
    // Find slide 19 (should be the 19th slide, order 19)
    const slides = slidesSnapshot.docs;
    const slide19 = slides.find(doc => doc.data().order === 19);
    
    if (!slide19) {
      console.log('❌ Slide 19 (order 19) not found');
      console.log('Available slides:');
      slides.forEach(doc => {
        const data = doc.data();
        console.log(`  - Order ${data.order}: ${data.title} (ID: ${data.id})`);
      });
      return;
    }
    
    console.log('✅ Found slide 19:', slide19.id);
    console.log('Current slide data:', slide19.data());
    
    // Update slide 19
    await updateDoc(doc(db, 'slides', slide19.id), {
      ...updatedSlide19,
      updatedAt: serverTimestamp()
    });
    
    console.log('✅ Successfully updated slide 19!');
    console.log('📱 You can now test slide 19 in your app.');
    
  } catch (error) {
    console.error('❌ Error updating slide 19:', error);
  }
};

// Run the update
updateSlide19(); 