/**
 * Populate All Lessons with Slides Script
 * 
 * This script ensures all 19 lessons have the complete slide set from lesson 1
 * as placeholders, so the analytics show consistent data.
 */

import { db } from '../src/firebase/firebase-config.js';
import { collection, getDocs, doc, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';

async function populateAllLessonsWithSlides() {
  console.log('🔄 Starting to populate all lessons with slides...\n');

  try {
    // Get lesson 1 slides as template
    console.log('📖 Getting lesson 1 slides as template...');
    const lesson1SlidesSnapshot = await getDocs(collection(db, 'lessons', 'lesson-1', 'slides'));
    const lesson1Slides = lesson1SlidesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log(`📄 Found ${lesson1Slides.length} slides in lesson 1`);

    // Get all lessons
    console.log('\n📚 Getting all lessons...');
    const lessonsSnapshot = await getDocs(collection(db, 'lessons'));
    const lessons = lessonsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log(`📖 Found ${lessons.length} lessons total`);

    // Process each lesson
    for (const lesson of lessons) {
      console.log(`\n🔄 Processing lesson: ${lesson.id} - ${lesson.title}`);
      
      // Get current slides for this lesson
      const currentSlidesSnapshot = await getDocs(collection(db, 'lessons', lesson.id, 'slides'));
      const currentSlides = currentSlidesSnapshot.docs.map(doc => doc.id);
      
      console.log(`   📄 Current slides: ${currentSlides.length}`);
      
      // If lesson has less than lesson 1 slides, populate it
      if (currentSlides.length < lesson1Slides.length) {
        console.log(`   ⚠️  Lesson ${lesson.id} needs more slides. Adding missing slides...`);
        
        const batch = writeBatch(db);
        
        // Add missing slides
        for (const slideTemplate of lesson1Slides) {
          const slideId = slideTemplate.id;
          
          // Skip if slide already exists
          if (currentSlides.includes(slideId)) {
            console.log(`      ✅ Slide ${slideId} already exists`);
            continue;
          }
          
          // Create new slide based on template
          const newSlide = {
            ...slideTemplate,
            lessonId: lesson.id,
            title: slideTemplate.title?.replace('שיעור 1', `שיעור ${lesson.id.split('-')[1]}`) || slideTemplate.title,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: 'system',
            updatedBy: 'system',
            isPublished: true,
            version: 1
          };
          
          // Update slide content to reflect lesson number
          if (newSlide.content?.elements) {
            newSlide.content.elements = newSlide.content.elements.map(element => {
              if (element.text && element.text.includes('שיעור 1')) {
                return {
                  ...element,
                  text: element.text.replace('שיעור 1', `שיעור ${lesson.id.split('-')[1]}`)
                };
              }
              return element;
            });
          }
          
          const slideRef = doc(collection(db, 'lessons', lesson.id, 'slides'), slideId);
          batch.set(slideRef, newSlide);
          
          console.log(`      ➕ Adding slide ${slideId}`);
        }
        
        // Commit the batch
        await batch.commit();
        console.log(`   ✅ Successfully added slides to lesson ${lesson.id}`);
        
      } else {
        console.log(`   ✅ Lesson ${lesson.id} already has ${currentSlides.length} slides (sufficient)`);
      }
    }

    // Verify the results
    console.log('\n🔍 Verifying results...');
    let totalSlides = 0;
    
    for (const lesson of lessons) {
      const slidesSnapshot = await getDocs(collection(db, 'lessons', lesson.id, 'slides'));
      console.log(`📖 Lesson ${lesson.id}: ${slidesSnapshot.size} slides`);
      totalSlides += slidesSnapshot.size;
    }
    
    console.log(`\n📊 Total slides across all lessons: ${totalSlides}`);
    console.log(`📊 Expected total: ${lessons.length * lesson1Slides.length}`);
    
    if (totalSlides === lessons.length * lesson1Slides.length) {
      console.log('✅ All lessons now have the complete slide set!');
    } else {
      console.log('⚠️  Some lessons may still be missing slides');
    }

  } catch (error) {
    console.error('❌ Error populating lessons:', error);
    throw error;
  }
}

// Run the population
populateAllLessonsWithSlides().then(() => {
  console.log('\n✅ Lesson population complete!');
  process.exit(0);
}).catch((error) => {
  console.error('❌ Population failed:', error);
  process.exit(1);
}); 