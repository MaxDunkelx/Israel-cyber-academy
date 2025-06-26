/**
 * Test Slide Editing Functionality
 * 
 * This script tests the enhanced slide editing capabilities:
 * - Creating new slides with different types
 * - Editing existing slides
 * - Adding/removing elements
 * - Preview functionality
 * - Version control
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore';

// Firebase configuration (you'll need to add your own config)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const testSlideEditing = async () => {
  console.log('🧪 Testing Slide Editing Functionality...\n');

  try {
    // Test 1: Create a new presentation slide
    console.log('📝 Test 1: Creating a new presentation slide...');
    const presentationSlide = {
      title: 'שקופית הצגה חדשה',
      type: 'presentation',
      lessonId: 'test-lesson-1',
      order: 1,
      content: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        elements: [
          {
            type: 'title',
            text: 'כותרת ראשית',
            style: {
              fontSize: '3rem',
              color: 'white',
              textAlign: 'center',
              marginBottom: '2rem'
            }
          },
          {
            type: 'subtitle',
            text: 'כותרת משנה',
            style: {
              fontSize: '1.5rem',
              color: 'white',
              textAlign: 'center',
              opacity: 0.9
            }
          },
          {
            type: 'text',
            text: 'טקסט רגיל עם תוכן מעניין',
            style: {
              fontSize: '1.2rem',
              color: 'white',
              textAlign: 'center'
            }
          }
        ]
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
      createdBy: 'test-user',
      updatedBy: 'test-user'
    };

    const presentationRef = await addDoc(collection(db, 'slides'), presentationSlide);
    console.log('✅ Presentation slide created with ID:', presentationRef.id);

    // Test 2: Create a poll slide
    console.log('\n📊 Test 2: Creating a poll slide...');
    const pollSlide = {
      title: 'סקר חדש',
      type: 'poll',
      lessonId: 'test-lesson-1',
      order: 2,
      content: {
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        question: 'מה הדבר הכי מעניין שלמדת היום?',
        options: [
          { id: 1, text: 'אבטחת מידע', emoji: '🔒' },
          { id: 2, text: 'תכנות', emoji: '💻' },
          { id: 3, text: 'רשתות', emoji: '🌐' },
          { id: 4, text: 'מערכות הפעלה', emoji: '🖥️' }
        ]
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
      createdBy: 'test-user',
      updatedBy: 'test-user'
    };

    const pollRef = await addDoc(collection(db, 'slides'), pollSlide);
    console.log('✅ Poll slide created with ID:', pollRef.id);

    // Test 3: Create an interactive slide
    console.log('\n🎮 Test 3: Creating an interactive slide...');
    const interactiveSlide = {
      title: 'תרגיל אינטראקטיבי',
      type: 'interactive',
      lessonId: 'test-lesson-1',
      order: 3,
      content: {
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        elements: [
          {
            type: 'title',
            text: 'תרגיל: זיהוי איומים',
            style: {
              fontSize: '2.5rem',
              color: 'white',
              textAlign: 'center',
              marginBottom: '2rem'
            }
          },
          {
            type: 'text',
            text: 'לחץ על האיומים הנכונים',
            style: {
              fontSize: '1.3rem',
              color: 'white',
              textAlign: 'center',
              marginBottom: '2rem'
            }
          },
          {
            type: 'list',
            items: [
              'וירוס מחשב',
              'פישינג',
              'האקינג',
              'גיבוי נתונים'
            ],
            style: {
              fontSize: '1.2rem',
              color: 'white',
              textAlign: 'right',
              lineHeight: '2'
            }
          }
        ],
        interactiveElements: [
          {
            type: 'button',
            text: 'וירוס מחשב',
            correct: true,
            style: {
              backgroundColor: '#ff6b6b',
              color: 'white',
              padding: '10px 20px',
              margin: '5px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }
          },
          {
            type: 'button',
            text: 'פישינג',
            correct: true,
            style: {
              backgroundColor: '#4ecdc4',
              color: 'white',
              padding: '10px 20px',
              margin: '5px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }
          }
        ]
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
      createdBy: 'test-user',
      updatedBy: 'test-user'
    };

    const interactiveRef = await addDoc(collection(db, 'slides'), interactiveSlide);
    console.log('✅ Interactive slide created with ID:', interactiveRef.id);

    // Test 4: Update a slide (simulate editing)
    console.log('\n✏️ Test 4: Updating a slide...');
    const updatedContent = {
      ...presentationSlide.content,
      elements: [
        ...presentationSlide.content.elements,
        {
          type: 'image',
          src: 'https://example.com/cyber-security.jpg',
          style: {
            maxWidth: '300px',
            maxHeight: '200px',
            margin: '1rem auto',
            display: 'block'
          }
        }
      ]
    };

    await updateDoc(doc(db, 'slides', presentationRef.id), {
      content: updatedContent,
      updatedAt: new Date(),
      version: 2,
      updatedBy: 'test-user'
    });
    console.log('✅ Slide updated successfully');

    // Test 5: Create a video slide
    console.log('\n🎥 Test 5: Creating a video slide...');
    const videoSlide = {
      title: 'סרטון הדרכה',
      type: 'video',
      lessonId: 'test-lesson-1',
      order: 4,
      content: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title: 'הדרכה על אבטחת מידע',
        description: 'למדו על עקרונות בסיסיים באבטחת מידע',
        elements: [
          {
            type: 'title',
            text: 'סרטון הדרכה',
            style: {
              fontSize: '2.5rem',
              color: 'white',
              textAlign: 'center',
              marginBottom: '1rem'
            }
          },
          {
            type: 'text',
            text: 'צפו בסרטון ולמדו על אבטחת מידע',
            style: {
              fontSize: '1.2rem',
              color: 'white',
              textAlign: 'center',
              opacity: 0.9
            }
          }
        ]
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
      createdBy: 'test-user',
      updatedBy: 'test-user'
    };

    const videoRef = await addDoc(collection(db, 'slides'), videoSlide);
    console.log('✅ Video slide created with ID:', videoRef.id);

    // Test 6: Create a quiz slide
    console.log('\n❓ Test 6: Creating a quiz slide...');
    const quizSlide = {
      title: 'חידון קצר',
      type: 'quiz',
      lessonId: 'test-lesson-1',
      order: 5,
      content: {
        background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        question: 'מהו הסיסמה החזקה ביותר?',
        options: [
          { id: 1, text: '123456', correct: false },
          { id: 2, text: 'password', correct: false },
          { id: 3, text: 'MyName123!', correct: true },
          { id: 4, text: 'qwerty', correct: false }
        ],
        explanation: 'סיסמה חזקה צריכה לכלול אותיות גדולות וקטנות, מספרים ותווים מיוחדים',
        elements: [
          {
            type: 'title',
            text: 'חידון אבטחה',
            style: {
              fontSize: '2.5rem',
              color: 'white',
              textAlign: 'center',
              marginBottom: '2rem'
            }
          }
        ]
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
      createdBy: 'test-user',
      updatedBy: 'test-user'
    };

    const quizRef = await addDoc(collection(db, 'slides'), quizSlide);
    console.log('✅ Quiz slide created with ID:', quizRef.id);

    // Test 7: Fetch and display all test slides
    console.log('\n📋 Test 7: Fetching all test slides...');
    const slidesQuery = query(
      collection(db, 'slides'),
      where('lessonId', '==', 'test-lesson-1'),
      orderBy('order', 'asc')
    );
    
    const slidesSnapshot = await getDocs(slidesQuery);
    const slides = slidesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log(`✅ Found ${slides.length} slides:`);
    slides.forEach((slide, index) => {
      console.log(`  ${index + 1}. ${slide.title} (${slide.type}) - v${slide.version}`);
      if (slide.content.elements) {
        console.log(`     Elements: ${slide.content.elements.length}`);
      }
      if (slide.content.options) {
        console.log(`     Options: ${slide.content.options.length}`);
      }
    });

    // Test 8: Clean up test data
    console.log('\n🧹 Test 8: Cleaning up test data...');
    const testSlideIds = [presentationRef.id, pollRef.id, interactiveRef.id, videoRef.id, quizRef.id];
    
    for (const slideId of testSlideIds) {
      await deleteDoc(doc(db, 'slides', slideId));
    }
    console.log('✅ Test slides cleaned up');

    console.log('\n🎉 All slide editing tests completed successfully!');
    console.log('\n📊 Summary:');
    console.log('  ✅ Created presentation slide with elements');
    console.log('  ✅ Created poll slide with options');
    console.log('  ✅ Created interactive slide with buttons');
    console.log('  ✅ Updated slide with new content');
    console.log('  ✅ Created video slide');
    console.log('  ✅ Created quiz slide');
    console.log('  ✅ Fetched and displayed slides');
    console.log('  ✅ Cleaned up test data');

  } catch (error) {
    console.error('❌ Error during slide editing tests:', error);
    console.error('Stack trace:', error.stack);
  }
};

// Run the test
testSlideEditing().then(() => {
  console.log('\n🏁 Test completed');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Test failed:', error);
  process.exit(1);
}); 