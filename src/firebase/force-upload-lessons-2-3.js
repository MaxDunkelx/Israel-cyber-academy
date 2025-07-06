/**
 * Force Upload Lessons 2 and 3 to Firebase Database
 * 
 * This script deletes existing lessons 2 and 3 and uploads the new versions
 * with all 36 slides to the Firebase database.
 */

import { 
  collection, 
  doc, 
  serverTimestamp,
  writeBatch,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from './firebase-config.js';
import { lesson2 } from '../data/lessons/lesson2/index.js';
import { lesson3 } from '../data/lessons/lesson3/index.js';

/**
 * Delete lesson and all its slides by title
 */
export const deleteLessonByTitle = async (lessonTitle) => {
  try {
    console.log(`🗑️ Deleting lesson: ${lessonTitle}`);
    
    // Find lesson by title
    const lessonsRef = collection(db, 'lessons');
    const lessonQuery = query(lessonsRef, where('title', '==', lessonTitle));
    const lessonSnapshot = await getDocs(lessonQuery);
    
    if (lessonSnapshot.empty) {
      console.log(`ℹ️ Lesson "${lessonTitle}" not found in database`);
      return false;
    }
    
    const lessonDoc = lessonSnapshot.docs[0];
    const lessonId = lessonDoc.id;
    
    console.log(`🗑️ Found lesson with ID: ${lessonId}`);
    
    // Delete all slides for this lesson
    const slidesRef = collection(db, 'lessons', lessonId, 'slides');
    const slidesSnapshot = await getDocs(slidesRef);
    
    const batch = writeBatch(db);
    
    // Delete all slides
    slidesSnapshot.docs.forEach(slideDoc => {
      batch.delete(slideDoc.ref);
    });
    
    // Delete the lesson
    batch.delete(lessonDoc.ref);
    
    await batch.commit();
    
    console.log(`✅ Deleted lesson "${lessonTitle}" with ${slidesSnapshot.docs.length} slides`);
    return true;
    
  } catch (error) {
    console.error(`❌ Error deleting lesson "${lessonTitle}":`, error);
    throw error;
  }
};

/**
 * Upload lesson2 to Firebase
 */
export const uploadLesson2 = async () => {
  try {
    console.log('🚀 Starting lesson2 upload...');
    
    // Create lesson document with specific ID
    const lessonRef = doc(db, 'lessons', 'lesson-2');
    const lessonData = {
      ...lesson2,
      id: 'lesson-2',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdBy: 'system',
      updatedBy: 'system',
      version: 1,
      isActive: true,
      totalSlides: lesson2.content.slides.length,
      source: 'force_upload'
    };
    
    // Create batch for atomic operations
    const batch = writeBatch(db);
    
    // Add lesson to batch
    batch.set(lessonRef, lessonData);
    
    // Add all slides to batch
    lesson2.content.slides.forEach((slide, index) => {
      const slideRef = doc(collection(db, 'lessons', 'lesson-2', 'slides'), slide.id);
      const slideData = {
        ...slide,
        id: slide.id,
        lessonId: 'lesson-2',
        order: index + 1,
        sortOrder: index + 1,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: 'system',
        updatedBy: 'system',
        version: 1,
        isActive: true
      };
      
      batch.set(slideRef, slideData);
    });
    
    // Commit all changes
    await batch.commit();
    
    console.log('✅ Lesson2 uploaded successfully!');
    console.log(`📊 Lesson ID: lesson-2`);
    console.log(`📊 Total slides: ${lesson2.content.slides.length}`);
    
    return {
      lessonId: 'lesson-2',
      totalSlides: lesson2.content.slides.length,
      success: true
    };
    
  } catch (error) {
    console.error('❌ Error uploading lesson2:', error);
    throw new Error(`Failed to upload lesson2: ${error.message}`);
  }
};

/**
 * Upload lesson3 to Firebase
 */
export const uploadLesson3 = async () => {
  try {
    console.log('🚀 Starting lesson3 upload...');
    
    // Create lesson document with specific ID
    const lessonRef = doc(db, 'lessons', 'lesson-3');
    const lessonData = {
      ...lesson3,
      id: 'lesson-3',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdBy: 'system',
      updatedBy: 'system',
      version: 1,
      isActive: true,
      totalSlides: lesson3.content.slides.length,
      source: 'force_upload'
    };
    
    // Create batch for atomic operations
    const batch = writeBatch(db);
    
    // Add lesson to batch
    batch.set(lessonRef, lessonData);
    
    // Add all slides to batch
    lesson3.content.slides.forEach((slide, index) => {
      const slideRef = doc(collection(db, 'lessons', 'lesson-3', 'slides'), slide.id);
      const slideData = {
        ...slide,
        id: slide.id,
        lessonId: 'lesson-3',
        order: index + 1,
        sortOrder: index + 1,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: 'system',
        updatedBy: 'system',
        version: 1,
        isActive: true
      };
      
      batch.set(slideRef, slideData);
    });
    
    // Commit all changes
    await batch.commit();
    
    console.log('✅ Lesson3 uploaded successfully!');
    console.log(`📊 Lesson ID: lesson-3`);
    console.log(`📊 Total slides: ${lesson3.content.slides.length}`);
    
    return {
      lessonId: 'lesson-3',
      totalSlides: lesson3.content.slides.length,
      success: true
    };
    
  } catch (error) {
    console.error('❌ Error uploading lesson3:', error);
    throw new Error(`Failed to upload lesson3: ${error.message}`);
  }
};

/**
 * Force upload both lessons 2 and 3 (delete old ones first)
 */
export const forceUploadLessons2And3 = async () => {
  try {
    console.log('🚀 Starting force upload of lessons 2 and 3...');
    
    // Delete existing lessons first
    console.log('🗑️ Deleting existing lessons...');
    await deleteLessonByTitle(lesson2.title);
    await deleteLessonByTitle(lesson3.title);
    
    // Upload new lessons
    console.log('📤 Uploading new lessons...');
    const lesson2Result = await uploadLesson2();
    const lesson3Result = await uploadLesson3();
    
    console.log('✅ Force upload completed successfully!');
    
    return {
      lesson2: lesson2Result,
      lesson3: lesson3Result,
      success: true
    };
    
  } catch (error) {
    console.error('❌ Error in force upload:', error);
    throw error;
  }
};

// Export for use in other modules
export default forceUploadLessons2And3; 