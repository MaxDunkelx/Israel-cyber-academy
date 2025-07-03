import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBvOkJgJgJgJgJgJgJgJgJgJgJgJgJgJgJgJg",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefghijklmnop"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkLesson1() {
  try {
    const lessonDoc = await getDoc(doc(db, 'lessons', 'lesson1'));
    
    if (lessonDoc.exists()) {
      const data = lessonDoc.data();
      console.log('📊 Lesson 1 data:');
      console.log('- totalSlides:', data.totalSlides);
      console.log('- slides count:', data.content?.slides?.length || 0);
      console.log('- title:', data.title);
      console.log('- originalId:', data.originalId);
    } else {
      console.log('❌ Lesson 1 not found');
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkLesson1(); 