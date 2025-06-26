/**
 * Simple Database Check - No Index Required
 * 
 * This script checks what's currently in your Firebase database
 * without requiring the missing index
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

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

console.log('🔍 Simple Database Check');
console.log('========================\n');

/**
 * Check all collections without complex queries
 */
const checkDatabase = async () => {
  console.log('📊 Checking database collections...\n');
  
  try {
    // Check lessons collection
    console.log('📚 Checking lessons collection...');
    const lessonsSnapshot = await getDocs(collection(db, 'lessons'));
    console.log(`Found ${lessonsSnapshot.size} lessons`);
    
    lessonsSnapshot.docs.forEach((doc, index) => {
      const data = doc.data();
      console.log(`  ${index + 1}. ${data.title || 'Untitled'} (ID: ${doc.id})`);
      console.log(`     Order: ${data.order || 'N/A'}`);
      console.log(`     Type: ${data.type || 'N/A'}`);
    });
    console.log('');
    
    // Check slides collection
    console.log('📋 Checking slides collection...');
    const slidesSnapshot = await getDocs(collection(db, 'slides'));
    console.log(`Found ${slidesSnapshot.size} slides`);
    
    // Group slides by lessonId
    const slidesByLesson = {};
    slidesSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      const lessonId = data.lessonId || 'unknown';
      if (!slidesByLesson[lessonId]) {
        slidesByLesson[lessonId] = [];
      }
      slidesByLesson[lessonId].push({
        id: doc.id,
        title: data.title || 'Untitled',
        type: data.type || 'unknown',
        order: data.order || 0,
        hasContent: !!data.content,
        contentType: typeof data.content
      });
    });
    
    // Display slides by lesson
    Object.keys(slidesByLesson).forEach(lessonId => {
      console.log(`\n📖 Lesson ID: ${lessonId}`);
      const slides = slidesByLesson[lessonId].sort((a, b) => a.order - b.order);
      slides.forEach((slide, index) => {
        console.log(`  ${index + 1}. ${slide.title} (ID: ${slide.id})`);
        console.log(`     Type: ${slide.type}, Order: ${slide.order}`);
        console.log(`     Has Content: ${slide.hasContent ? '✅' : '❌'}`);
        console.log(`     Content Type: ${slide.contentType}`);
      });
    });
    
    // Check if we have any lessons without slides
    const lessonIds = lessonsSnapshot.docs.map(doc => doc.id);
    const lessonIdsWithSlides = Object.keys(slidesByLesson);
    
    console.log('\n📊 Summary:');
    console.log(`Total Lessons: ${lessonsSnapshot.size}`);
    console.log(`Total Slides: ${slidesSnapshot.size}`);
    console.log(`Lessons with Slides: ${lessonIdsWithSlides.length}`);
    
    // Check for lessons without slides
    const lessonsWithoutSlides = lessonIds.filter(id => !lessonIdsWithSlides.includes(id));
    if (lessonsWithoutSlides.length > 0) {
      console.log(`\n⚠️  Lessons without slides: ${lessonsWithoutSlides.length}`);
      lessonsWithoutSlides.forEach(id => {
        console.log(`  - ${id}`);
      });
    }
    
    // Check for slides without proper lessonId
    const orphanSlides = slidesByLesson['unknown'] || [];
    if (orphanSlides.length > 0) {
      console.log(`\n⚠️  Slides without lessonId: ${orphanSlides.length}`);
      orphanSlides.forEach(slide => {
        console.log(`  - ${slide.title} (ID: ${slide.id})`);
      });
    }
    
    return {
      lessons: lessonsSnapshot.size,
      slides: slidesSnapshot.size,
      slidesByLesson,
      lessonsWithoutSlides,
      orphanSlides
    };
    
  } catch (error) {
    console.error('❌ Error checking database:', error);
    return { error: error.message };
  }
};

/**
 * Check specific slide content
 */
const checkSlideContent = async (slideId) => {
  try {
    const slideDoc = await getDoc(doc(db, 'slides', slideId));
    if (slideDoc.exists()) {
      const data = slideDoc.data();
      console.log(`\n📋 Slide Content Check: ${data.title || 'Untitled'}`);
      console.log(`ID: ${slideId}`);
      console.log(`Type: ${data.type || 'N/A'}`);
      console.log(`Lesson ID: ${data.lessonId || 'N/A'}`);
      console.log(`Order: ${data.order || 'N/A'}`);
      console.log(`Has Content: ${!!data.content}`);
      console.log(`Content Type: ${typeof data.content}`);
      
      if (data.content) {
        if (typeof data.content === 'object') {
          console.log('✅ Content is proper JSON object');
          console.log(`Content Keys: ${Object.keys(data.content).join(', ')}`);
        } else if (typeof data.content === 'string') {
          console.log('⚠️  Content is string, trying to parse...');
          try {
            const parsed = JSON.parse(data.content);
            console.log('✅ Content can be parsed as JSON');
            console.log(`Parsed Keys: ${Object.keys(parsed).join(', ')}`);
          } catch (e) {
            console.log('❌ Content is string but not valid JSON');
          }
        }
      } else {
        console.log('❌ No content found');
      }
    } else {
      console.log(`❌ Slide ${slideId} not found`);
    }
  } catch (error) {
    console.error(`❌ Error checking slide ${slideId}:`, error);
  }
};

/**
 * Main execution
 */
const main = async () => {
  console.log('🎯 Database Content Check\n');
  
  try {
    const dbState = await checkDatabase();
    
    if (dbState.error) {
      console.log('❌ Database check failed:', dbState.error);
      return;
    }
    
    console.log('\n🔧 NEXT STEPS:');
    console.log('1. Create the missing Firebase index');
    console.log('2. Wait for index to build (2-5 minutes)');
    console.log('3. Test your application');
    
    console.log('\n🔗 Create Index Here:');
    console.log('https://console.firebase.google.com/v1/r/project/israel-cyber-academy/firestore/indexes?create_composite=ClNwcm9qZWN0cy9pc3JhZWwtY3liZXItYWNhZGVteS9kYXRhYmFzZXMvKGRlZmF1bHQpL2NvbGxlY3Rpb25Hcm91cHMvc2xpZGVzL2luZGV4ZXMvXxABGgwKCGxlc3NvbklkEAEaCQoFb3JkZXIQARoMCghfX25hbWVfXxAB');
    
    // If we have slides, check a few for content structure
    if (dbState.slides > 0) {
      console.log('\n🔍 Checking sample slide content...');
      const allSlides = Object.values(dbState.slidesByLesson).flat();
      if (allSlides.length > 0) {
        await checkSlideContent(allSlides[0].id);
        if (allSlides.length > 1) {
          await checkSlideContent(allSlides[1].id);
        }
      }
    }
    
    console.log('\n✅ Check completed!');
    
  } catch (error) {
    console.error('❌ Check failed:', error);
  }
};

// Run the main function
main().catch(console.error); 