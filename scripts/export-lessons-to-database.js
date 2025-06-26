/**
 * Export Lessons to Database Script
 * 
 * This script exports all existing lessons from static JavaScript files
 * to Firebase Firestore database for proper content management.
 * 
 * Creates the following collections:
 * - lessons: Lesson metadata and structure
 * - slides: Individual slide content
 * - media: Media assets and references
 * 
 * Usage: node scripts/export-lessons-to-database.js
 */

import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  setDoc, 
  doc,
  getDocs,
  query,
  where,
  deleteDoc
} from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxQqQqQqQqQqQqQqQqQqQqQqQqQqQqQqQ",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Path to lessons directory
const LESSONS_DIR = path.join(__dirname, '../src/data/lessons');

/**
 * Clear existing data
 */
async function clearExistingData() {
  try {
    console.log('🧹 Clearing existing data...');
    
    // Clear slides
    const slidesRef = collection(db, 'slides');
    const slidesSnapshot = await getDocs(slidesRef);
    for (const slideDoc of slidesSnapshot.docs) {
      await deleteDoc(slideDoc.ref);
    }
    console.log(`🗑️ Deleted ${slidesSnapshot.size} existing slides`);
    
    // Clear lessons
    const lessonsRef = collection(db, 'lessons');
    const lessonsSnapshot = await getDocs(lessonsRef);
    for (const lessonDoc of lessonsSnapshot.docs) {
      await deleteDoc(lessonDoc.ref);
    }
    console.log(`🗑️ Deleted ${lessonsSnapshot.size} existing lessons`);
    
  } catch (error) {
    console.error('❌ Error clearing data:', error);
    throw error;
  }
}

/**
 * Process lesson directory and extract lesson data
 */
function processLessonDirectory(lessonPath, lessonId) {
  try {
    const indexPath = path.join(lessonPath, 'index.js');
    if (!fs.existsSync(indexPath)) {
      console.warn(`⚠️ No index.js found in ${lessonPath}`);
      return null;
    }

    // Read the index.js file
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // Extract lesson data using regex (simplified approach)
    const titleMatch = indexContent.match(/title:\s*["']([^"']+)["']/);
    const descriptionMatch = indexContent.match(/description:\s*["']([^"']+)["']/);
    const iconMatch = indexContent.match(/icon:\s*["']([^"']+)["']/);
    const durationMatch = indexContent.match(/duration:\s*["']([^"']+)["']/);
    const difficultyMatch = indexContent.match(/difficulty:\s*["']([^"']+)["']/);
    const targetAgeMatch = indexContent.match(/targetAge:\s*["']([^"']+)["']/);
    const breakDurationMatch = indexContent.match(/breakDuration:\s*(\d+)/);
    
    if (!titleMatch) {
      console.warn(`⚠️ Could not extract title from ${indexPath}`);
      return null;
    }

    const lessonData = {
      id: parseInt(lessonId),
      title: titleMatch[1],
      description: descriptionMatch ? descriptionMatch[1] : '',
      icon: iconMatch ? iconMatch[1] : '📚',
      duration: durationMatch ? durationMatch[1] : '1 שעה',
      difficulty: difficultyMatch ? difficultyMatch[1] : 'קל',
      targetAge: targetAgeMatch ? targetAgeMatch[1] : '10-13',
      breakDuration: breakDurationMatch ? parseInt(breakDurationMatch[1]) : 15,
      slides: []
    };

    // Process slides
    const slidesDir = path.join(lessonPath, 'slides');
    if (fs.existsSync(slidesDir)) {
      const slideFiles = fs.readdirSync(slidesDir)
        .filter(file => file.endsWith('.js'))
        .sort((a, b) => {
          // Extract slide number for sorting
          const aNum = parseInt(a.match(/\d+/)?.[0] || '0');
          const bNum = parseInt(b.match(/\d+/)?.[0] || '0');
          return aNum - bNum;
        });

      slideFiles.forEach((slideFile, index) => {
        const slidePath = path.join(slidesDir, slideFile);
        const slideContent = fs.readFileSync(slidePath, 'utf8');
        
        // Extract slide data
        const slideIdMatch = slideContent.match(/id:\s*["']([^"']+)["']/);
        const slideTitleMatch = slideContent.match(/title:\s*["']([^"']+)["']/);
        const slideTypeMatch = slideContent.match(/type:\s*["']([^"']+)["']/);
        
        if (slideIdMatch && slideTitleMatch) {
          const slideData = {
            id: slideIdMatch[1],
            title: slideTitleMatch[1],
            type: slideTypeMatch ? slideTypeMatch[1] : 'presentation',
            content: {}, // We'll extract content later if needed
            order: index + 1
          };
          lessonData.slides.push(slideData);
        }
      });
    }

    return lessonData;
  } catch (error) {
    console.error(`❌ Error processing lesson directory ${lessonPath}:`, error);
    return null;
  }
}

/**
 * Export lessons to Firestore
 */
async function exportLessons() {
  try {
    console.log('📚 Starting lesson export...');
    
    // Get all lesson directories
    const lessonDirs = fs.readdirSync(LESSONS_DIR)
      .filter(item => {
        const itemPath = path.join(LESSONS_DIR, item);
        return fs.statSync(itemPath).isDirectory() && item.startsWith('lesson');
      })
      .sort();
    
    console.log(`📊 Found ${lessonDirs.length} lesson directories: ${lessonDirs.join(', ')}\n`);
    
    for (const lessonDir of lessonDirs) {
      const lessonId = lessonDir.replace('lesson', '');
      const lessonPath = path.join(LESSONS_DIR, lessonDir);
      
      const lessonData = processLessonDirectory(lessonPath, lessonId);
      
      if (lessonData) {
        console.log(`📖 Processing lesson: ${lessonData.title}`);
        
        // Create lesson document with metadata
        const lessonDocData = {
          ...lessonData,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'system',
          updatedBy: 'system',
          version: 1,
          isActive: true,
          totalSlides: lessonData.slides.length
        };
        
        // Remove slides array from lesson data (slides will be separate documents)
        delete lessonDocData.slides;
        
        const lessonRef = doc(db, 'lessons', `lesson-${lessonData.id}`);
        await setDoc(lessonRef, lessonDocData);
        
        console.log(`✅ Lesson ${lessonData.id} exported with ID: lesson-${lessonData.id}`);
        
        // Export slides for this lesson
        await exportSlidesForLesson(lessonData.slides, `lesson-${lessonData.id}`);
      }
    }
    
    console.log('\n🎉 All lessons exported successfully!');
    
  } catch (error) {
    console.error('❌ Error exporting lessons:', error);
    throw error;
  }
}

/**
 * Export slides for a specific lesson
 */
async function exportSlidesForLesson(slides, lessonId) {
  try {
    console.log(`  📄 Exporting ${slides.length} slides for lesson ${lessonId}...`);
    
    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      
      // Create slide document with full metadata
      const slideData = {
        ...slide,
        lessonId: lessonId,
        order: i + 1, // Start from 1
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'system',
        updatedBy: 'system',
        version: 1,
        isActive: true,
        // Initialize empty history array
        history: []
      };
      
      // Create a unique slide ID
      const slideId = `${lessonId}-slide-${slide.order}`;
      const slideRef = doc(db, 'slides', slideId);
      await setDoc(slideRef, slideData);
      
      console.log(`    ✅ Slide ${slide.order} exported with ID: ${slideId}`);
    }
    
  } catch (error) {
    console.error(`❌ Error exporting slides for lesson ${lessonId}:`, error);
    throw error;
  }
}

/**
 * Verify export
 */
async function verifyExport() {
  try {
    console.log('\n🔍 Verifying export...');
    
    // Check lessons
    const lessonsRef = collection(db, 'lessons');
    const lessonsSnapshot = await getDocs(lessonsRef);
    console.log(`📚 Found ${lessonsSnapshot.size} lessons in database`);
    
    // Check slides
    const slidesRef = collection(db, 'slides');
    const slidesSnapshot = await getDocs(slidesRef);
    console.log(`📄 Found ${slidesSnapshot.size} slides in database`);
    
    // Check slides per lesson
    for (const lessonDoc of lessonsSnapshot.docs) {
      const lesson = lessonDoc.data();
      const slidesQuery = query(slidesRef, where('lessonId', '==', lessonDoc.id));
      const lessonSlidesSnapshot = await getDocs(slidesQuery);
      console.log(`  📖 ${lesson.title}: ${lessonSlidesSnapshot.size} slides`);
    }
    
    console.log('\n✅ Export verification completed!');
    
  } catch (error) {
    console.error('❌ Error verifying export:', error);
    throw error;
  }
}

// Run the export
async function main() {
  try {
    await clearExistingData();
    await exportLessons();
    await verifyExport();
  } catch (error) {
    console.error('❌ Export failed:', error);
    process.exit(1);
  }
}

main(); 