/**
 * Populate Slides Only
 * 
 * This script adds slides to existing lessons in the database
 * by reading from local content files.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC35sH38k9co_R0zBsbDT0S6RE1Cp-ksHE",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "750693821908",
  appId: "1:750693821908:web:6518d1facad1d8095cfa41"
};

console.log('📋 Populating Slides Only');
console.log('========================\n');

const populateSlides = async () => {
  try {
    // Initialize Firebase
    console.log('🔥 Initializing Firebase...');
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    console.log('✅ Firebase initialized successfully\n');

    // Get existing lessons from database
    console.log('📚 Getting existing lessons from database...');
    const lessonsRef = collection(db, 'lessons');
    const lessonsSnapshot = await getDocs(lessonsRef);
    const dbLessons = [];
    
    lessonsSnapshot.forEach(doc => {
      dbLessons.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log(`✅ Found ${dbLessons.length} lessons in database\n`);

    // Read local lessons for slide content
    console.log('📖 Reading local lesson content...');
    const lessonsDir = path.join(process.cwd(), 'src', 'data', 'lessons');
    const lessonDirs = fs.readdirSync(lessonsDir).filter(dir => 
      fs.statSync(path.join(lessonsDir, dir)).isDirectory() && 
      dir.startsWith('lesson')
    );

    let totalSlidesAdded = 0;

    for (const lessonDir of lessonDirs) {
      const lessonId = parseInt(lessonDir.replace('lesson', ''));
      const lessonPath = path.join(lessonsDir, lessonDir);
      const slidesDir = path.join(lessonPath, 'slides');
      
      // Find matching database lesson
      const dbLesson = dbLessons.find(l => l.id === lessonId.toString() || l.originalId === lessonId);
      
      if (!dbLesson) {
        console.log(`⚠️ No database lesson found for lesson ${lessonId}`);
        continue;
      }

      console.log(`📚 Processing lesson ${lessonId}: ${dbLesson.title || 'Untitled'}`);

      if (fs.existsSync(slidesDir)) {
        const slideFiles = fs.readdirSync(slidesDir)
          .filter(file => file.endsWith('.js'))
          .sort((a, b) => {
            const aNum = parseInt(a.match(/\d+/)?.[0] || '0');
            const bNum = parseInt(b.match(/\d+/)?.[0] || '0');
            return aNum - bNum;
          });

        console.log(`  📋 Found ${slideFiles.length} slide files`);

        for (let i = 0; i < slideFiles.length; i++) {
          const slideFile = slideFiles[i];
          const slidePath = path.join(slidesDir, slideFile);
          
          try {
            // Import the slide content
            const slideModule = await import(slidePath);
            const slideData = slideModule.default || slideModule;
            
            if (slideData) {
              // Create slide document
              const slideDoc = {
                lessonId: dbLesson.id,
                title: slideData.title || `Slide ${i + 1}`,
                type: slideData.type || 'presentation',
                content: slideData.content || {},
                order: i + 1,
                createdAt: new Date(),
                updatedAt: new Date()
              };

              await addDoc(collection(db, 'slides'), slideDoc);
              console.log(`    ✅ Added slide: ${slideData.title || `Slide ${i + 1}`}`);
              totalSlidesAdded++;
            }
          } catch (slideError) {
            console.log(`    ❌ Error processing slide ${slideFile}:`, slideError.message);
          }
        }
      } else {
        console.log(`  ⚠️ No slides directory found for lesson ${lessonId}`);
      }
      
      console.log('');
    }

    console.log('📊 Summary');
    console.log('==========');
    console.log(`✅ Total slides added: ${totalSlidesAdded}`);
    console.log(`✅ Database lessons: ${dbLessons.length}`);
    console.log('');
    console.log('🎯 Next Steps:');
    console.log('1. Check the teacher UI - Slide Preview Manager');
    console.log('2. Verify all lessons now have slides');
    console.log('3. Test slide navigation and preview');

  } catch (error) {
    console.error('❌ Error:', error);
  }
};

// Run the script
populateSlides().then(() => {
  console.log('🏁 Script completed');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Script failed:', error);
  process.exit(1);
}); 