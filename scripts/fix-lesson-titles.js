/**
 * Fix Lesson Titles
 * 
 * This script updates the database lessons with their real Hebrew titles
 * from the local content files.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
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

console.log('🔧 Fixing Lesson Titles');
console.log('======================\n');

// Helper function to extract lesson title from index.js file
const extractLessonTitle = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Look for title in the lesson data
    const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
    if (titleMatch) {
      return titleMatch[1];
    }
    
    // Look for title in export statement
    const exportMatch = content.match(/title:\s*["']([^"']+)["']/);
    if (exportMatch) {
      return exportMatch[1];
    }
    
    return null;
  } catch (error) {
    console.log(`Error reading lesson file: ${error.message}`);
    return null;
  }
};

const fixLessonTitles = async () => {
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

    // Read local lessons for real titles
    console.log('📖 Reading local lesson titles...');
    const lessonsDir = path.join(process.cwd(), 'src', 'data', 'lessons');
    const lessonDirs = fs.readdirSync(lessonsDir).filter(dir => 
      fs.statSync(path.join(lessonsDir, dir)).isDirectory() && 
      dir.startsWith('lesson')
    ).sort();

    const titleMap = new Map(); // Map lesson number to real title

    for (const lessonDir of lessonDirs) {
      const lessonNumber = parseInt(lessonDir.replace('lesson', ''));
      const lessonPath = path.join(lessonsDir, lessonDir);
      const indexPath = path.join(lessonPath, 'index.js');
      
      if (fs.existsSync(indexPath)) {
        const realTitle = extractLessonTitle(indexPath);
        if (realTitle) {
          titleMap.set(lessonNumber, realTitle);
          console.log(`📝 Lesson ${lessonNumber}: "${realTitle}"`);
        }
      }
    }

    console.log(`\n📚 Found ${titleMap.size} real lesson titles\n`);

    // Update database lessons with real titles
    console.log('🔄 Updating database lessons with real titles...');
    let updatedCount = 0;

    for (const dbLesson of dbLessons) {
      const lessonNumber = dbLesson.originalId;
      const realTitle = titleMap.get(lessonNumber);
      
      if (realTitle && dbLesson.title !== realTitle) {
        try {
          const lessonRef = doc(db, 'lessons', dbLesson.id);
          await updateDoc(lessonRef, {
            title: realTitle,
            updatedAt: new Date()
          });
          
          console.log(`✅ Updated lesson ${lessonNumber}: "${dbLesson.title}" → "${realTitle}"`);
          updatedCount++;
        } catch (error) {
          console.log(`❌ Error updating lesson ${lessonNumber}:`, error.message);
        }
      } else if (realTitle) {
        console.log(`⏭️ Lesson ${lessonNumber} already has correct title: "${realTitle}"`);
      } else {
        console.log(`⚠️ No real title found for lesson ${lessonNumber}`);
      }
    }

    console.log(`\n📊 Summary`);
    console.log(`==========`);
    console.log(`✅ Updated ${updatedCount} lesson titles`);
    console.log(`✅ Database now has real Hebrew lesson titles`);
    console.log('');
    console.log('🎯 Next Steps:');
    console.log('1. Go to teacher dashboard → Slide Preview Manager');
    console.log('2. You should now see real lesson titles in the dropdown');
    console.log('3. All lessons will be properly organized by their real names');

  } catch (error) {
    console.error('❌ Error:', error);
  }
};

// Run the script
fixLessonTitles().then(() => {
  console.log('🏁 Script completed');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Script failed:', error);
  process.exit(1);
}); 