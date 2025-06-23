import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testNotesSystem() {
  console.log('🧪 Testing Notes System...\n');

  try {
    // Test teacher ID
    const teacherId = 'test-teacher-123';
    const lessonId = 'lesson1';
    const slideId = 'slide1-intro';

    console.log('1. Testing note creation...');
    const noteData = {
      teacherId,
      lessonId,
      slideId,
      content: 'This is a test note for slide 1',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const noteRef = await addDoc(collection(db, 'teacherNotes'), noteData);
    console.log('✅ Note created successfully:', noteRef.id);

    console.log('\n2. Testing note retrieval...');
    const notesQuery = query(
      collection(db, 'teacherNotes'),
      where('teacherId', '==', teacherId),
      where('lessonId', '==', lessonId)
    );
    
    const notesSnapshot = await getDocs(notesQuery);
    const notes = [];
    notesSnapshot.forEach(doc => {
      notes.push({ id: doc.id, ...doc.data() });
    });
    
    console.log('✅ Notes retrieved successfully:', notes.length, 'notes found');

    console.log('\n3. Testing activity logging...');
    const activityData = {
      teacherId,
      type: 'note_added',
      title: 'הערה נוספה',
      description: 'Test note added for lesson1, slide1',
      metadata: {
        lessonId,
        slideId,
        noteLength: noteData.content.length
      },
      timestamp: new Date()
    };

    const activityRef = await addDoc(collection(db, 'teacherActivities'), activityData);
    console.log('✅ Activity logged successfully:', activityRef.id);

    console.log('\n4. Testing note deletion...');
    await deleteDoc(doc(db, 'teacherNotes', noteRef.id));
    console.log('✅ Note deleted successfully');

    console.log('\n5. Testing activity retrieval...');
    const activitiesQuery = query(
      collection(db, 'teacherActivities'),
      where('teacherId', '==', teacherId)
    );
    
    const activitiesSnapshot = await getDocs(activitiesQuery);
    const activities = [];
    activitiesSnapshot.forEach(doc => {
      activities.push({ id: doc.id, ...doc.data() });
    });
    
    console.log('✅ Activities retrieved successfully:', activities.length, 'activities found');

    console.log('\n🎉 All Notes system tests passed!');
    console.log('\n📊 Summary:');
    console.log('- Note creation: ✅');
    console.log('- Note retrieval: ✅');
    console.log('- Activity logging: ✅');
    console.log('- Note deletion: ✅');
    console.log('- Activity retrieval: ✅');

  } catch (error) {
    console.error('❌ Test failed:', error);
    console.error('Error details:', error.message);
  }
}

testNotesSystem(); 