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
    
    console.log(`Loaded ${lessons.length} lessons from database`);
    return lessons;
  } catch (error) {
    console.error('Error getting lessons:', error);
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
    const lessonRef = doc(db, 'lessons', lessonId);
    const updateData = {
      ...lessonData,
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
 * Create a new slide
 */
export const createSlide = async (slideData) => {
  try {
    const slideRef = doc(collection(db, 'slides'));
    const newSlide = {
      ...slideData,
      id: slideRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      version: 1
    };
    
    await setDoc(slideRef, newSlide);
    console.log('Slide created:', slideRef.id);
    return slideRef.id;
  } catch (error) {
    console.error('Error creating slide:', error);
    throw error;
  }
};

/**
 * Update an existing slide
 */
export const updateSlide = async (slideId, slideData) => {
  try {
    const slideRef = doc(db, 'slides', slideId);
    const updateData = {
      ...slideData,
      updatedAt: serverTimestamp(),
      version: (slideData.version || 0) + 1
    };
    
    await updateDoc(slideRef, updateData);
    console.log('Slide updated:', slideId);
    return slideId;
  } catch (error) {
    console.error('Error updating slide:', error);
    throw error;
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
    
    const filteredLessons = lessons.filter(lesson => 
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
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
 * Show index creation notification
 */
const showIndexNotification = () => {
  const indexUrl = 'https://console.firebase.google.com/v1/r/project/israel-cyber-academy/firestore/indexes?create_composite=ClNwcm9qZWN0cy9pc3JhZWwtY3liZXItYWNhZGVteS9kYXRhYmFzZXMvKGRlZmF1bHQpL2NvbGxlY3Rpb25Hcm91cHMvc2xpZGVzL2luZGV4ZXMvXxABGgwKCGxlc3NvbklkEAEaCQoFb3JkZXIQARoMCghfX25hbWVfXxAB';
  
  toast.error(
    `Firebase Index Required. Click here to create: ${indexUrl}`,
    {
      duration: 10000,
      position: 'top-right',
      onClick: () => window.open(indexUrl, '_blank')
    }
  );
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