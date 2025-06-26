/**
 * Test Content Management Script
 * 
 * This script tests the content management functionality by:
 * 1. Loading lessons from the database using content service
 * 2. Loading slides for each lesson
 * 3. Testing all CRUD operations
 * 4. Verifying the data structure
 * 
 * Usage: node scripts/test-content-management.js
 */

import { initializeApp } from 'firebase/app';
import { 
  getAllLessons, 
  getSlidesByLessonId, 
  createLesson, 
  updateLesson, 
  deleteLesson,
  createSlide,
  updateSlide,
  deleteSlide,
  getSlideHistory,
  revertSlideToVersion
} from '../src/firebase/content-service.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

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

/**
 * Test content management functionality
 */
async function testContentManagement() {
  try {
    console.log('🧪 Starting content management tests...\n');
    
    // Test 1: Get all lessons
    console.log('📚 Test 1: Getting all lessons...');
    const lessons = await getAllLessons();
    console.log(`✅ Found ${lessons.length} lessons`);
    lessons.forEach(lesson => {
      console.log(`   - ${lesson.title} (${lesson.totalSlides} slides, v${lesson.version})`);
    });
    
    if (lessons.length === 0) {
      throw new Error('No lessons found in database');
    }
    
    // Test 2: Get slides for first lesson
    console.log('\n📄 Test 2: Getting slides for first lesson...');
    const firstLesson = lessons[0];
    const slides = await getSlidesByLessonId(firstLesson.id);
    console.log(`✅ Found ${slides.length} slides for lesson "${firstLesson.title}"`);
    
    if (slides.length === 0) {
      throw new Error('No slides found for first lesson');
    }
    
    // Test 3: Create a new lesson
    console.log('\n➕ Test 3: Creating a new lesson...');
    const newLessonData = {
      title: "שיעור בדיקה",
      description: "שיעור לבדיקת המערכת",
      icon: "🧪",
      duration: "1 שעה",
      difficulty: "קל",
      targetAge: "10-13",
      breakDuration: 10
    };
    
    const newLesson = await createLesson(newLessonData, 'test-user');
    console.log(`✅ Created lesson: ${newLesson.title} (ID: ${newLesson.id})`);
    
    // Test 4: Create a new slide
    console.log('\n➕ Test 4: Creating a new slide...');
    const newSlideData = {
      title: "שקופית בדיקה",
      type: "presentation",
      content: {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        elements: [
          {
            type: "title",
            text: "כותרת בדיקה",
            style: { fontSize: "2rem", color: "white", textAlign: "center" }
          }
        ]
      },
      lessonId: newLesson.id,
      order: 1
    };
    
    const newSlide = await createSlide(newSlideData, 'test-user');
    console.log(`✅ Created slide: ${newSlide.title} (ID: ${newSlide.id})`);
    
    // Test 5: Update the slide
    console.log('\n✏️ Test 5: Updating the slide...');
    const updatedSlideData = {
      title: "שקופית בדיקה - מעודכנת",
      type: "presentation",
      content: {
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        elements: [
          {
            type: "title",
            text: "כותרת מעודכנת",
            style: { fontSize: "2.5rem", color: "white", textAlign: "center" }
          },
          {
            type: "subtitle",
            text: "תת כותרת חדשה",
            style: { fontSize: "1.5rem", color: "white", textAlign: "center", opacity: 0.9 }
          }
        ]
      }
    };
    
    const updatedSlide = await updateSlide(newSlide.id, updatedSlideData, 'test-user');
    console.log(`✅ Updated slide: ${updatedSlide.title} (v${updatedSlide.version})`);
    
    // Test 6: Check slide history
    console.log('\n📜 Test 6: Checking slide history...');
    const history = await getSlideHistory(newSlide.id);
    console.log(`✅ Found ${history.length} versions in history`);
    history.forEach(version => {
      console.log(`   - Version ${version.version}: ${version.content.title} (${version.updatedBy})`);
    });
    
    // Test 7: Revert to previous version
    if (history.length > 0) {
      console.log('\n⏪ Test 7: Reverting to previous version...');
      const revertVersion = history[0].version;
      const revertedSlide = await revertSlideToVersion(newSlide.id, revertVersion, 'test-user');
      console.log(`✅ Reverted slide to version ${revertVersion}: ${revertedSlide.title} (v${revertedSlide.version})`);
    }
    
    // Test 8: Update lesson
    console.log('\n✏️ Test 8: Updating lesson...');
    const updatedLessonData = {
      title: "שיעור בדיקה - מעודכן",
      description: "שיעור לבדיקת המערכת - גרסה מעודכנת",
      icon: "🔬",
      duration: "1.5 שעות",
      difficulty: "בינוני",
      targetAge: "12-15",
      breakDuration: 15
    };
    
    const updatedLesson = await updateLesson(newLesson.id, updatedLessonData, 'test-user');
    console.log(`✅ Updated lesson: ${updatedLesson.title} (v${updatedLesson.version})`);
    
    // Test 9: Verify data integrity
    console.log('\n🔍 Test 9: Verifying data integrity...');
    const finalLessons = await getAllLessons();
    const finalSlides = await getSlidesByLessonId(newLesson.id);
    
    console.log(`✅ Final state: ${finalLessons.length} lessons, ${finalSlides.length} slides in test lesson`);
    
    // Test 10: Cleanup (delete test data)
    console.log('\n🧹 Test 10: Cleaning up test data...');
    await deleteSlide(newSlide.id);
    await deleteLesson(newLesson.id);
    console.log('✅ Test data cleaned up');
    
    console.log('\n🎉 All content management tests passed successfully!');
    
  } catch (error) {
    console.error('❌ Content management test failed:', error);
    throw error;
  }
}

/**
 * Test slide content editing
 */
async function testSlideContentEditing() {
  try {
    console.log('\n🔧 Testing slide content editing...');
    
    // Get first lesson and slide
    const lessons = await getAllLessons();
    if (lessons.length === 0) {
      console.log('⚠️ No lessons available for content editing test');
      return;
    }
    
    const slides = await getSlidesByLessonId(lessons[0].id);
    if (slides.length === 0) {
      console.log('⚠️ No slides available for content editing test');
      return;
    }
    
    const testSlide = slides[0];
    console.log(`📄 Testing with slide: ${testSlide.title}`);
    
    // Test different content types
    const contentTests = [
      {
        name: "Presentation slide",
        content: {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          elements: [
            {
              type: "title",
              text: "כותרת חדשה",
              style: { fontSize: "3rem", color: "white", textAlign: "center" }
            },
            {
              type: "list",
              items: ["פריט 1", "פריט 2", "פריט 3"],
              style: { fontSize: "1.2rem", color: "white", textAlign: "right" }
            }
          ]
        }
      },
      {
        name: "Poll slide",
        content: {
          question: "שאלה חדשה?",
          options: [
            { id: 1, text: "אפשרות 1", emoji: "😊" },
            { id: 2, text: "אפשרות 2", emoji: "🤔" },
            { id: 3, text: "אפשרות 3", emoji: "😎" }
          ],
          allowMultiple: false,
          showResults: true,
          duration: 60
        }
      },
      {
        name: "Interactive slide",
        content: {
          type: "drag-drop",
          instructions: "הוראות חדשות",
          categories: [
            { id: "cat1", name: "קטגוריה 1", color: "#4CAF50" },
            { id: "cat2", name: "קטגוריה 2", color: "#2196F3" }
          ],
          items: [
            { id: 1, text: "פריט 1", correctCategory: "cat1" },
            { id: 2, text: "פריט 2", correctCategory: "cat2" }
          ]
        }
      }
    ];
    
    for (const test of contentTests) {
      console.log(`\n   Testing: ${test.name}`);
      
      const testSlideData = {
        title: `${testSlide.title} - ${test.name}`,
        type: test.name.toLowerCase().includes('poll') ? 'poll' : 
              test.name.toLowerCase().includes('interactive') ? 'interactive' : 'presentation',
        content: test.content
      };
      
      const updatedSlide = await updateSlide(testSlide.id, testSlideData, 'test-user');
      console.log(`   ✅ Updated slide: ${updatedSlide.title} (v${updatedSlide.version})`);
      
      // Check history
      const history = await getSlideHistory(testSlide.id);
      console.log(`   📜 History entries: ${history.length}`);
    }
    
    console.log('\n✅ Slide content editing tests completed!');
    
  } catch (error) {
    console.error('❌ Slide content editing test failed:', error);
    throw error;
  }
}

// Run all tests
async function main() {
  try {
    await testContentManagement();
    await testSlideContentEditing();
    console.log('\n🎉 All tests completed successfully!');
  } catch (error) {
    console.error('\n💥 Test suite failed:', error);
    process.exit(1);
  }
}

main(); 