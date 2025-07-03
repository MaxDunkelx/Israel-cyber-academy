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

async function checkLesson2() {
  try {
    console.log('🔍 Checking lesson 2 structure...');
    
    // Try to find lesson 2 by searching for lessons with originalId = 2
    const { collection, getDocs, query, where } = await import('firebase/firestore');
    const lessonsRef = collection(db, 'lessons');
    const q = query(lessonsRef, where('originalId', '==', 2));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log('📊 Lesson 2 found:');
        console.log('- Firestore ID:', doc.id);
        console.log('- originalId:', data.originalId);
        console.log('- title:', data.title);
        console.log('- totalSlides:', data.totalSlides);
        console.log('- has content:', !!data.content);
        console.log('- has slides:', !!data.content?.slides);
        console.log('- slides count:', data.content?.slides?.length || 0);
      });
    } else {
      console.log('❌ No lesson found with originalId = 2');
      
      // Try to find any lesson with title containing "מבנה המחשב"
      const allLessonsQuery = query(lessonsRef);
      const allLessonsSnapshot = await getDocs(allLessonsQuery);
      
      console.log('🔍 All lessons in database:');
      allLessonsSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`- ${doc.id}: originalId=${data.originalId}, title="${data.title}"`);
      });
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkLesson2(); 