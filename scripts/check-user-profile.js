import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import readline from 'readline';

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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your user UID: ', async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid.trim()));
    if (userDoc.exists()) {
      const data = userDoc.data();
      console.log('User Profile Data:');
      console.log('- completedLessons:', data.completedLessons);
      console.log('- totalPagesEngaged:', data.totalPagesEngaged);
      console.log('- totalTimeSpent:', data.totalTimeSpent);
      console.log('- progress:', JSON.stringify(data.progress, null, 2));
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error:', error);
  }
  rl.close();
}); 