/**
 * Content Service for Lessons and Slides Management
 * 
 * This service provides all CRUD operations for lessons and slides
 * in the Firestore database, with proper error handling and validation.
 */

import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  writeBatch,
  limit,
  onSnapshot
} from 'firebase/firestore';
import { db } from './firebase-config.js';
import { toast } from 'react-hot-toast';

// Import local lesson data for migration
import { lessons as localLessons } from '../data/lessons/index.js';

/**
 * Lesson Management Functions
 */

/**
 * Get all lessons from the database
 */
export const getAllLessons = async () => {
  try {
    console.log('🔍 Loading lessons from Firestore...');
    
    // First try with ordering by the numeric id field
    try {
      const lessonsQuery = query(
        collection(db, 'lessons'),
        orderBy('id', 'asc')
      );
      
      const snapshot = await getDocs(lessonsQuery);
      const lessons = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date()
        };
      });
      
      console.log(`✅ Loaded ${lessons.length} lessons from database with ordering`);
      return lessons;
    } catch (orderError) {
      console.log('⚠️ Ordering failed, trying without order...');
      
      // If ordering fails, try without it
      const lessonsQuery = query(collection(db, 'lessons'));
      
      const snapshot = await getDocs(lessonsQuery);
      const lessons = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date()
        };
      });
      
      // Sort in memory by the numeric id field
      lessons.sort((a, b) => (a.id || 0) - (b.id || 0));
      
      console.log(`✅ Loaded ${lessons.length} lessons from database without ordering`);
      
      if (lessons.length === 0) {
        console.log('⚠️ No lessons found in database. Run the sync script to populate from local files.');
      }
      
      return lessons;
    }
  } catch (error) {
    console.error('❌ Error getting lessons:', error);
    
    if (error.code === 'permission-denied') {
      console.error('🔒 Permission denied. Check your Firestore security rules.');
    } else if (error.code === 'unavailable') {
      console.error('🌐 Network error. Check your internet connection.');
    }
    
    throw error;
  }
};

/**
 * Get a specific lesson by ID
 */
export const getLessonById = async (lessonId) => {
  try {
    const lessonDoc = await getDoc(doc(db, 'lessons', lessonId));
    if (lessonDoc.exists()) {
      const data = lessonDoc.data();
      return {
        id: lessonDoc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date()
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting lesson:', error);
    throw error;
  }
};

/**
 * Create a new lesson
 */
export const createLesson = async (lessonData) => {
  try {
    const lessonRef = doc(collection(db, 'lessons'));
    const newLesson = {
      ...lessonData,
      id: lessonRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      version: 1,
      totalSlides: 0,
      slides: []
    };
    
    await setDoc(lessonRef, newLesson);
    console.log('Lesson created:', lessonRef.id);
    return lessonRef.id;
  } catch (error) {
    console.error('Error creating lesson:', error);
    throw error;
  }
};

/**
 * Update an existing lesson
 */
export const updateLesson = async (lessonId, lessonData) => {
  try {
    // Validate and sanitize lesson data
    const sanitizedData = {
      ...lessonData,
      title: String(lessonData?.title || ''),
      description: String(lessonData?.description || ''),
      difficulty: lessonData?.difficulty || 'beginner',
      targetAge: Number(lessonData?.targetAge) || 12,
      duration: Number(lessonData?.duration) || 30,
      order: Number(lessonData?.order) || 1,
      tags: Array.isArray(lessonData?.tags) ? lessonData.tags : [],
      totalSlides: Number(lessonData?.totalSlides) || 0,
      isPublished: Boolean(lessonData?.isPublished)
    };

    const lessonRef = doc(db, 'lessons', lessonId);
    const updateData = {
      ...sanitizedData,
      updatedAt: serverTimestamp(),
      version: (lessonData.version || 0) + 1
    };
    
    await updateDoc(lessonRef, updateData);
    console.log('Lesson updated:', lessonId);
    return lessonId;
  } catch (error) {
    console.error('Error updating lesson:', error);
    throw error;
  }
};

/**
 * Delete a lesson and all its slides
 */
export const deleteLesson = async (lessonId) => {
  try {
    const batch = writeBatch(db);
    
    // Delete all slides for this lesson
    const slidesQuery = query(
      collection(db, 'slides'),
      where('lessonId', '==', lessonId)
    );
    const slidesSnapshot = await getDocs(slidesQuery);
    
    slidesSnapshot.docs.forEach(slideDoc => {
      batch.delete(slideDoc.ref);
    });
    
    // Delete the lesson
    batch.delete(doc(db, 'lessons', lessonId));
    
    await batch.commit();
    console.log(`Lesson ${lessonId} and ${slidesSnapshot.size} slides deleted`);
  } catch (error) {
    console.error('Error deleting lesson:', error);
    throw error;
  }
};

/**
 * Slide Management Functions
 */

/**
 * Get slides by lesson ID with fallback to local content
 */
export const getSlidesByLessonId = async (lessonId) => {
  try {
    // First try to get from database with ordering
    const slidesQuery = query(
      collection(db, 'slides'),
      where('lessonId', '==', lessonId),
      orderBy('order', 'asc')
    );
    
    const snapshot = await getDocs(slidesQuery);
    const slides = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date()
      };
    });
    
    if (slides.length > 0) {
      console.log(`✅ Loaded ${slides.length} slides from database for lesson ${lessonId}`);
      return slides;
    }
    
    // Fallback to local content
    console.log(`📋 No database slides found for lesson ${lessonId}, falling back to local content`);
    return getLocalSlidesForLesson(lessonId);
    
  } catch (error) {
    console.error('Error getting slides:', error);
    
    // Check if it's an index error
    const isIndexError = error.message.includes('index') || 
                        error.code === 'failed-precondition' ||
                        error.message.includes('requires an index');
    
    if (isIndexError) {
      console.log('⚠️ Index not found, trying without ordering...');
      
      // Show user-friendly notification
      showIndexNotification();
      
      try {
        // Try without ordering first
        const slidesQuery = query(
          collection(db, 'slides'),
          where('lessonId', '==', lessonId)
        );
        
        const snapshot = await getDocs(slidesQuery);
        const slides = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate?.() || new Date(),
            updatedAt: data.updatedAt?.toDate?.() || new Date()
          };
        });
        
        // Sort in memory
        slides.sort((a, b) => (a.order || 0) - (b.order || 0));
        
        if (slides.length > 0) {
          console.log(`✅ Loaded ${slides.length} slides for lesson ${lessonId} (without ordering)`);
          return slides;
        }
      } catch (fallbackError) {
        console.error('Fallback error getting slides:', fallbackError);
      }
    }
    
    // Final fallback to local content
    console.log('🔄 Falling back to local content...');
    return getLocalSlidesForLesson(lessonId);
  }
};

/**
 * Get slides from local content as fallback
 */
const getLocalSlidesForLesson = (lessonId) => {
  const localLesson = localLessons.find(lesson => lesson.id === parseInt(lessonId));
  if (localLesson && localLesson.content?.slides) {
    const localSlides = localLesson.content.slides.map((slide, index) => ({
      ...slide,
      lessonId: lessonId,
      order: index + 1,
      source: 'local_fallback',
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    console.log(`✅ Loaded ${localSlides.length} slides from local content for lesson ${lessonId}`);
    return localSlides;
  }
  
  console.log(`❌ No slides found for lesson ${lessonId}`);
  return [];
};

/**
 * Get a specific slide by ID
 */
export const getSlideById = async (slideId) => {
  try {
    const slideDoc = await getDoc(doc(db, 'slides', slideId));
    if (slideDoc.exists()) {
      const data = slideDoc.data();
      return {
        id: slideDoc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date()
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting slide:', error);
    throw error;
  }
};

/**
 * Enhanced create slide function with verification
 */
export const createSlide = async (slideData) => {
  try {
    // Generate a proper ID for the slide
    const slideId = `slide-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const slideRef = doc(db, 'slides', slideId);
    
    const newSlide = {
      ...slideData,
      id: slideId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastEdited: serverTimestamp(),
      version: 1
    };
    
    await setDoc(slideRef, newSlide);
    console.log('✅ Slide created successfully:', slideId);
    
    // Verify the creation
    const verifyDoc = await getDoc(slideRef);
    if (verifyDoc.exists()) {
      console.log('✅ Slide creation verified in database');
      return slideId;
    } else {
      throw new Error('Slide was not created properly');
    }
    
  } catch (error) {
    console.error('❌ Error creating slide:', error);
    
    // Provide specific error messages
    if (error.code === 'permission-denied') {
      throw new Error('Permission denied. Please check your Firebase security rules.');
    } else if (error.code === 'unavailable') {
      throw new Error('Firebase is temporarily unavailable. Please try again.');
    } else {
      throw new Error(`Failed to create slide: ${error.message}`);
    }
  }
};

/**
 * Enhanced update slide function with verification
 */
export const updateSlide = async (slideId, slideData) => {
  try {
    // Validate and sanitize slide data
    const sanitizedData = {
      ...slideData,
      title: String(slideData?.title || ''),
      type: String(slideData?.type || 'presentation'),
      order: Number(slideData?.order) || 1,
      lessonId: String(slideData?.lessonId || ''),
      content: slideData?.content || {}
    };

    const slideRef = doc(db, 'slides', slideId);
    
    // Check if document exists
    const slideDoc = await getDoc(slideRef);
    
    if (slideDoc.exists()) {
      // Update existing slide
      const updateData = {
        ...sanitizedData,
        updatedAt: serverTimestamp(),
        lastEdited: serverTimestamp(),
        version: (slideData.version || 0) + 1
      };
      
      await updateDoc(slideRef, updateData);
      console.log('✅ Slide updated successfully:', slideId);
      
      // Verify the update was saved
      const verifyDoc = await getDoc(slideRef);
      if (verifyDoc.exists()) {
        const savedData = verifyDoc.data();
        console.log('✅ Slide update verified in database');
        console.log('📊 Updated fields:', Object.keys(updateData));
        return slideId;
      } else {
        throw new Error('Slide was not saved properly');
      }
      
    } else {
      // Create new slide if it doesn't exist
      const newSlide = {
        ...sanitizedData,
        id: slideId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastEdited: serverTimestamp(),
        version: 1
      };
      
      await setDoc(slideRef, newSlide);
      console.log('✅ Slide created (was missing):', slideId);
      return slideId;
    }
    
  } catch (error) {
    console.error('❌ Error updating slide:', error);
    
    // Provide specific error messages
    if (error.code === 'permission-denied') {
      throw new Error('Permission denied. Please check your Firebase security rules.');
    } else if (error.code === 'unavailable') {
      throw new Error('Firebase is temporarily unavailable. Please try again.');
    } else {
      throw new Error(`Failed to save slide: ${error.message}`);
    }
  }
};

/**
 * Delete a slide
 */
export const deleteSlide = async (slideId) => {
  try {
    await deleteDoc(doc(db, 'slides', slideId));
    console.log('Slide deleted:', slideId);
  } catch (error) {
    console.error('Error deleting slide:', error);
    throw error;
  }
};

/**
 * Reorder slides for a lesson
 */
export const reorderSlides = async (lessonId, slideOrders, userId = 'system') => {
  try {
    const batch = writeBatch(db);
    
    for (const { slideId, newOrder } of slideOrders) {
      const slideRef = doc(db, 'slides', slideId);
      batch.update(slideRef, {
        order: newOrder,
        updatedAt: serverTimestamp(),
        updatedBy: userId
      });
    }
    
    await batch.commit();
    return true;
  } catch (error) {
    console.error('Error reordering slides:', error);
    throw new Error('Failed to reorder slides');
  }
};

/**
 * Helper Functions
 */

/**
 * Update lesson's total slides count
 */
const updateLessonSlideCount = async (lessonId) => {
  try {
    const slides = await getSlidesByLessonId(lessonId);
    await updateLesson(lessonId, { totalSlides: slides.length });
  } catch (error) {
    console.error('Error updating lesson slide count:', error);
  }
};

/**
 * Get lesson with all its slides
 */
export const getLessonWithSlides = async (lessonId) => {
  try {
    const [lesson, slides] = await Promise.all([
      getLessonById(lessonId),
      getSlidesByLessonId(lessonId)
    ]);
    
    return {
      ...lesson,
      slides
    };
  } catch (error) {
    console.error('Error fetching lesson with slides:', error);
    throw new Error('Failed to fetch lesson with slides');
  }
};

/**
 * Search lessons by title or description
 */
export const searchLessons = async (searchTerm, limitCount = 10) => {
  try {
    const lessons = await getAllLessons();
    
    // Ensure searchTerm is a string
    const safeSearchTerm = String(searchTerm || '').toLowerCase();
    
    const filteredLessons = lessons.filter(lesson => {
      const title = String(lesson?.title || '').toLowerCase();
      const description = String(lesson?.description || '').toLowerCase();
      
      return title.includes(safeSearchTerm) || description.includes(safeSearchTerm);
    });
    
    return filteredLessons.slice(0, limitCount);
  } catch (error) {
    console.error('Error searching lessons:', error);
    throw new Error('Failed to search lessons');
  }
};

/**
 * Get lessons by difficulty level
 */
export const getLessonsByDifficulty = async (difficulty) => {
  try {
    const lessons = await getAllLessons();
    return lessons.filter(lesson => lesson.difficulty === difficulty);
  } catch (error) {
    console.error('Error fetching lessons by difficulty:', error);
    throw new Error('Failed to fetch lessons by difficulty');
  }
};

/**
 * Get lessons by target age
 */
export const getLessonsByTargetAge = async (targetAge) => {
  try {
    const lessons = await getAllLessons();
    return lessons.filter(lesson => lesson.targetAge === targetAge);
  } catch (error) {
    console.error('Error fetching lessons by target age:', error);
    throw new Error('Failed to fetch lessons by target age');
  }
};

/**
 * Bulk operations
 */

/**
 * Import multiple lessons and slides
 */
export const importLessons = async (lessonsData) => {
  try {
    const batch = writeBatch(db);
    const importedLessons = [];
    
    for (const lessonData of lessonsData) {
      const lessonRef = doc(db, 'lessons', lessonData.id.toString());
      const lesson = {
        ...lessonData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      batch.set(lessonRef, lesson);
      importedLessons.push(lesson);
      
      // Import slides for this lesson
      if (lessonData.slides && Array.isArray(lessonData.slides)) {
        lessonData.slides.forEach((slide, index) => {
          const slideId = `${lessonData.id}_${slide.id}`;
          const slideRef = doc(db, 'slides', slideId);
          const slideData = {
            ...slide,
            lessonId: lessonData.id.toString(),
            order: index + 1,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          };
          
          batch.set(slideRef, slideData);
        });
      }
    }
    
    await batch.commit();
    
    // Log security event
    await logSecurityEvent('lessons_imported', {
      lessonCount: lessonsData.length,
      userId: 'system'
    });
    
    return importedLessons;
  } catch (error) {
    console.error('Error importing lessons:', error);
    throw new Error('Failed to import lessons');
  }
};

/**
 * Export lessons and slides for backup
 */
export const exportLessons = async () => {
  try {
    const lessons = await getAllLessons();
    const exportedData = [];
    
    for (const lesson of lessons) {
      const slides = await getSlidesByLessonId(lesson.id);
      exportedData.push({
        ...lesson,
        slides
      });
    }
    
    return exportedData;
  } catch (error) {
    console.error('Error exporting lessons:', error);
    throw new Error('Failed to export lessons');
  }
};

/**
 * Get slide history
 */
export const getSlideHistory = async (slideId) => {
  try {
    // For now, return basic history info
    // In a full implementation, you'd store version history
    const slide = await getSlideById(slideId);
    if (slide) {
      return [{
        version: slide.version,
        updatedAt: slide.updatedAt,
        updatedBy: slide.updatedBy,
        content: slide
      }];
    }
    return [];
  } catch (error) {
    console.error('Error getting slide history:', error);
    throw error;
  }
};

/**
 * Revert slide to a specific version
 */
export const revertSlideToVersion = async (slideId, version) => {
  try {
    // For now, just update the slide
    // In a full implementation, you'd restore from version history
    const slide = await getSlideById(slideId);
    if (slide) {
      await updateSlide(slideId, {
        ...slide,
        version: version + 1,
        updatedBy: 'system-revert'
      });
    }
  } catch (error) {
    console.error('Error reverting slide:', error);
    throw error;
  }
};

/**
 * MIGRATION FUNCTIONS - Sync local content with database
 */

/**
 * Migrate all local lessons to Firebase
 */
export const migrateLocalLessonsToFirebase = async () => {
  try {
    console.log('🔄 Starting local lessons migration to Firebase...');
    
    const batch = writeBatch(db);
    let migratedCount = 0;
    
    for (const lesson of localLessons) {
      // Check if lesson already exists
      const existingLesson = await getLessonByTitle(lesson.title);
      
      if (!existingLesson) {
        // Create lesson
        const lessonRef = doc(collection(db, 'lessons'));
        const lessonData = {
          ...lesson,
          id: lessonRef.id,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          source: 'local_migration',
          totalSlides: lesson.content?.slides?.length || 0
        };
        
        batch.set(lessonRef, lessonData);
        console.log(`📝 Created lesson: ${lesson.title}`);
        
        // Migrate slides for this lesson
        if (lesson.content?.slides) {
          for (let i = 0; i < lesson.content.slides.length; i++) {
            const slide = lesson.content.slides[i];
            const slideRef = doc(collection(db, 'slides'));
            const slideData = {
              ...slide,
              id: slideRef.id,
              lessonId: lessonRef.id,
              order: i + 1,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
              source: 'local_migration',
              version: 1
            };
            
            batch.set(slideRef, slideData);
            console.log(`  📄 Created slide: ${slide.title}`);
          }
        }
        
        migratedCount++;
      } else {
        console.log(`⏭️ Lesson already exists: ${lesson.title}`);
      }
    }
    
    await batch.commit();
    console.log(`✅ Migration completed! ${migratedCount} lessons migrated.`);
    return migratedCount;
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw new Error(`Migration failed: ${error.message}`);
  }
};

/**
 * Get lesson by title (for migration checks)
 */
const getLessonByTitle = async (title) => {
  try {
    const q = query(collection(db, 'lessons'), where('title', '==', title));
    const snapshot = await getDocs(q);
    return snapshot.docs[0]?.data() || null;
  } catch (error) {
    console.error('Error getting lesson by title:', error);
    return null;
  }
};

/**
 * Sync local content with database content
 */
export const syncLocalWithDatabase = async () => {
  try {
    console.log('🔄 Starting content synchronization...');
    
    const dbLessons = await getAllLessons();
    const syncResults = {
      created: 0,
      updated: 0,
      unchanged: 0,
      errors: 0
    };
    
    for (const localLesson of localLessons) {
      try {
        const existingLesson = dbLessons.find(dbLesson => dbLesson.title === localLesson.title);
        
        if (!existingLesson) {
          // Create new lesson
          await createLesson({
            ...localLesson,
            source: 'local_sync',
            totalSlides: localLesson.content?.slides?.length || 0
          });
          
          // Create slides
          if (localLesson.content?.slides) {
            for (let i = 0; i < localLesson.content.slides.length; i++) {
              const slide = localLesson.content.slides[i];
              await createSlide({
                ...slide,
                lessonId: localLesson.id,
                order: i + 1,
                source: 'local_sync'
              });
            }
          }
          
          syncResults.created++;
          console.log(`✅ Created: ${localLesson.title}`);
        } else {
          // Check if content needs updating
          const needsUpdate = JSON.stringify(localLesson) !== JSON.stringify(existingLesson);
          
          if (needsUpdate) {
            await updateLesson(existingLesson.id, {
              ...localLesson,
              source: 'local_sync',
              updatedAt: serverTimestamp()
            });
            syncResults.updated++;
            console.log(`🔄 Updated: ${localLesson.title}`);
          } else {
            syncResults.unchanged++;
            console.log(`⏭️ Unchanged: ${localLesson.title}`);
          }
        }
      } catch (error) {
        console.error(`❌ Error syncing lesson ${localLesson.title}:`, error);
        syncResults.errors++;
      }
    }
    
    console.log('📊 Sync Results:', syncResults);
    return syncResults;
    
  } catch (error) {
    console.error('❌ Sync failed:', error);
    throw new Error(`Sync failed: ${error.message}`);
  }
};

/**
 * Get content status (local vs database)
 */
export const getContentStatus = async () => {
  try {
    const dbLessons = await getAllLessons();
    
    const status = {
      local: {
        totalLessons: localLessons.length,
        totalSlides: localLessons.reduce((sum, lesson) => 
          sum + (lesson.content?.slides?.length || 0), 0
        )
      },
      database: {
        totalLessons: dbLessons.length,
        totalSlides: dbLessons.reduce((sum, lesson) => 
          sum + (lesson.totalSlides || 0), 0
        )
      },
      comparison: []
    };
    
    // Compare each lesson
    for (const localLesson of localLessons) {
      const dbLesson = dbLessons.find(db => db.title === localLesson.title);
      
      status.comparison.push({
        title: localLesson.title,
        local: {
          exists: true,
          slides: localLesson.content?.slides?.length || 0
        },
        database: {
          exists: !!dbLesson,
          slides: dbLesson?.totalSlides || 0
        },
        status: !dbLesson ? 'missing_in_db' : 
                (localLesson.content?.slides?.length || 0) !== (dbLesson?.totalSlides || 0) ? 'different_slide_count' : 'synced'
      });
    }
    
    return status;
    
  } catch (error) {
    console.error('Error getting content status:', error);
    throw error;
  }
};

/**
 * Enhanced index notification with direct link
 */
const showIndexNotification = () => {
  const message = 'Firebase index needed for optimal performance. Click to create it now!';
  const directLink = 'https://console.firebase.google.com/v1/r/project/israel-cyber-academy/firestore/indexes?create_composite=ClNwcm9qZWN0cy9pc3JhZWwtY3liZXItYWNhZGVteS9kYXRhYmFzZXMvKGRlZmF1bHQpL2NvbGxlY3Rpb25Hcm91cHMvc2xpZGVzL2luZGV4ZXMvXxABGgwKCGxlc3NvbklkEAEaCQoFb3JkZXIQARoMCghfX25hbWVfXxAB';
  
  console.log('⚠️ Firebase Index Required');
  console.log('📝 Message:', message);
  console.log('🔗 Direct Link:', directLink);
  
  // Show toast notification if available
  if (typeof toast !== 'undefined') {
    toast.error(message, {
      duration: 10000,
      action: {
        label: 'Create Index',
        onClick: () => window.open(directLink, '_blank')
      }
    });
  }
};

export default {
  // Lesson operations
  getAllLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
  getLessonWithSlides,
  searchLessons,
  getLessonsByDifficulty,
  getLessonsByTargetAge,
  
  // Slide operations
  getSlidesByLessonId,
  getSlideById,
  createSlide,
  updateSlide,
  deleteSlide,
  reorderSlides,
  
  // Bulk operations
  importLessons,
  exportLessons,
  
  // Slide history
  getSlideHistory,
  revertSlideToVersion,
  
  // Migration functions
  migrateLocalLessonsToFirebase,
  getLessonByTitle,
  syncLocalWithDatabase,
  getContentStatus
}; 