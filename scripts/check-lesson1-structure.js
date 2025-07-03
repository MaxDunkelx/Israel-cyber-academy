const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc, collection, getDocs, query, where, orderBy } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxGQoKzLxKjKjKjKjKjKjKjKjKjKjKjKjK",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefghijklmnop"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkLesson1Structure() {
  console.log('🔍 Checking lesson 1 structure in Firebase...');
  
  try {
    // Find lesson 1 by originalId
    const lessonsRef = collection(db, 'lessons');
    const querySnapshot = await getDocs(lessonsRef);
    
    let lesson1 = null;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.originalId === 1) {
        lesson1 = {
          id: doc.id,
          ...data
        };
      }
    });
    
    if (!lesson1) {
      console.log('❌ Lesson 1 not found');
      return;
    }
    
    console.log('📋 Lesson 1 structure:');
    console.log('- ID:', lesson1.id);
    console.log('- originalId:', lesson1.originalId);
    console.log('- title:', lesson1.title);
    console.log('- totalSlides:', lesson1.totalSlides);
    console.log('- has content:', !!lesson1.content);
    console.log('- content slides count:', lesson1.content?.slides?.length || 0);
    
    // Get slides for this lesson
    const slidesQuery = query(
      collection(db, 'slides'),
      where('lessonId', '==', lesson1.id),
      orderBy('order', 'asc')
    );
    
    const slidesSnapshot = await getDocs(slidesQuery);
    const slides = slidesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log('- actual slides count:', slides.length);
    console.log('- slides with order field:', slides.filter(s => s.order !== undefined).length);
    
    // Check if totalSlides needs to be updated
    if (lesson1.totalSlides !== slides.length) {
      console.log('⚠️ MISMATCH: totalSlides field is', lesson1.totalSlides, 'but actual slides count is', slides.length);
      console.log('💡 The totalSlides field should be updated to', slides.length);
    } else {
      console.log('✅ totalSlides field is correct');
    }
    
  } catch (error) {
    console.error('❌ Error checking lesson structure:', error);
  }
}

checkLesson1Structure(); 