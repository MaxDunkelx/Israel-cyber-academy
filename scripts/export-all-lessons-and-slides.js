/**
 * Export All Lessons and Slides to Database
 * 
 * This script exports all lessons and slides from the file system to Firestore
 * to make them editable in the content manager.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Helper function to extract slide data from file content
const extractSlideFromFile = (fileContent, fileName) => {
  // Remove export statement and get the object
  const match = fileContent.match(/export const \w+ = ({[\s\S]*});/);
  if (!match) {
    console.warn(`Could not extract slide from ${fileName}`);
    return null;
  }
  
  try {
    // Convert the object string to actual object
    const slideObject = eval(`(${match[1]})`);
    return slideObject;
  } catch (error) {
    console.error(`Error parsing slide from ${fileName}:`, error);
    return null;
  }
};

// Helper function to extract lesson data from file content
const extractLessonFromFile = (fileContent, fileName) => {
  // Remove export statement and get the object
  const match = fileContent.match(/export const \w+ = ({[\s\S]*});/);
  if (!match) {
    console.warn(`Could not extract lesson from ${fileName}`);
    return null;
  }
  
  try {
    // Convert the object string to actual object
    const lessonObject = eval(`(${match[1]})`);
    return lessonObject;
  } catch (error) {
    console.error(`Error parsing lesson from ${fileName}:`, error);
    return null;
  }
};

// Function to read all slides from a lesson directory
const readSlidesFromLesson = (lessonPath) => {
  const slidesPath = path.join(lessonPath, 'slides');
  const slides = [];
  
  if (!fs.existsSync(slidesPath)) {
    console.warn(`Slides directory not found: ${slidesPath}`);
    return slides;
  }
  
  const slideFiles = fs.readdirSync(slidesPath)
    .filter(file => file.endsWith('.js'))
    .sort((a, b) => {
      // Sort by slide number
      const aNum = parseInt(a.match(/slide(\d+)/)?.[1] || '0');
      const bNum = parseInt(b.match(/slide(\d+)/)?.[1] || '0');
      return aNum - bNum;
    });
  
  slideFiles.forEach((file, index) => {
    const filePath = path.join(slidesPath, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const slide = extractSlideFromFile(fileContent, file);
    
    if (slide) {
      // Add metadata for database
      slide.order = index + 1;
      slide.createdAt = new Date();
      slide.updatedAt = new Date();
      slide.version = 1;
      slide.createdBy = 'system-export';
      slide.updatedBy = 'system-export';
      slide.fileName = file;
      slide.filePath = filePath;
      
      slides.push(slide);
    }
  });
  
  return slides;
};

// Function to read lesson data
const readLessonData = (lessonPath, lessonId) => {
  const indexPath = path.join(lessonPath, 'index.js');
  
  if (!fs.existsSync(indexPath)) {
    console.warn(`Lesson index not found: ${indexPath}`);
    return null;
  }
  
  const fileContent = fs.readFileSync(indexPath, 'utf8');
  const lesson = extractLessonFromFile(fileContent, 'index.js');
  
  if (lesson) {
    // Add metadata for database
    lesson.id = lessonId;
    lesson.createdAt = new Date();
    lesson.updatedAt = new Date();
    lesson.version = 1;
    lesson.createdBy = 'system-export';
    lesson.updatedBy = 'system-export';
    lesson.filePath = lessonPath;
    
    return lesson;
  }
  
  return null;
};

// Main export function
const exportAllLessonsAndSlides = async () => {
  console.log('🚀 Starting comprehensive export of all lessons and slides...\n');
  
  try {
    // Clear existing data
    console.log('🧹 Clearing existing lessons and slides...');
    const existingLessons = await getDocs(collection(db, 'lessons'));
    const existingSlides = await getDocs(collection(db, 'slides'));
    
    for (const doc of existingLessons.docs) {
      await deleteDoc(doc.ref);
    }
    for (const doc of existingSlides.docs) {
      await deleteDoc(doc.ref);
    }
    console.log('✅ Existing data cleared');
    
    // Get lessons directory
    const lessonsDir = path.join(__dirname, '..', 'src', 'data', 'lessons');
    const lessonDirs = fs.readdirSync(lessonsDir)
      .filter(item => {
        const itemPath = path.join(lessonsDir, item);
        return fs.statSync(itemPath).isDirectory() && item.startsWith('lesson');
      })
      .sort((a, b) => {
        const aNum = parseInt(a.replace('lesson', ''));
        const bNum = parseInt(b.replace('lesson', ''));
        return aNum - bNum;
      });
    
    console.log(`📚 Found ${lessonDirs.length} lesson directories:`, lessonDirs);
    
    let totalSlides = 0;
    
    // Process each lesson
    for (const lessonDir of lessonDirs) {
      const lessonPath = path.join(lessonsDir, lessonDir);
      const lessonId = lessonDir.replace('lesson', '');
      
      console.log(`\n📖 Processing ${lessonDir}...`);
      
      // Read lesson data
      const lesson = readLessonData(lessonPath, lessonId);
      if (!lesson) {
        console.warn(`⚠️ Could not read lesson data for ${lessonDir}`);
        continue;
      }
      
      // Read slides
      const slides = readSlidesFromLesson(lessonPath);
      console.log(`  📄 Found ${slides.length} slides`);
      
      // Save lesson to database
      const lessonRef = doc(db, 'lessons', lessonId);
      await setDoc(lessonRef, {
        ...lesson,
        totalSlides: slides.length,
        slides: slides.map(slide => slide.id) // Reference to slide IDs
      });
      console.log(`  ✅ Lesson saved: ${lesson.title}`);
      
      // Save slides to database
      for (const slide of slides) {
        const slideRef = doc(db, 'slides', slide.id);
        await setDoc(slideRef, {
          ...slide,
          lessonId: lessonId
        });
        totalSlides++;
      }
      console.log(`  ✅ ${slides.length} slides saved`);
    }
    
    console.log(`\n🎉 Export completed successfully!`);
    console.log(`📊 Summary:`);
    console.log(`  📚 Lessons exported: ${lessonDirs.length}`);
    console.log(`  📄 Total slides exported: ${totalSlides}`);
    
    // Verify export
    console.log(`\n🔍 Verifying export...`);
    const verifyLessons = await getDocs(collection(db, 'lessons'));
    const verifySlides = await getDocs(collection(db, 'slides'));
    
    console.log(`  ✅ Lessons in database: ${verifyLessons.size}`);
    console.log(`  ✅ Slides in database: ${verifySlides.size}`);
    
    // Display lesson summary
    console.log(`\n📋 Lesson Summary:`);
    verifyLessons.forEach(doc => {
      const lesson = doc.data();
      console.log(`  ${lesson.id}. ${lesson.title} - ${lesson.totalSlides} slides`);
    });
    
  } catch (error) {
    console.error('❌ Error during export:', error);
    console.error('Stack trace:', error.stack);
  }
};

// Run the export
exportAllLessonsAndSlides().then(() => {
  console.log('\n🏁 Export process completed');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Export failed:', error);
  process.exit(1);
}); 