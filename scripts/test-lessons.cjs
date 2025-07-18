const fs = require('fs');
const path = require('path');

// Test loading lessons from local data
async function testLocalLessons() {
  console.log('🧪 Testing local lessons loading...');
  
  try {
    // Import the lessons
    const { lessons } = await import('../src/data/lessons/index.js');
    
    console.log(`✅ Loaded ${lessons.length} lessons from local data`);
    
    lessons.forEach((lesson, index) => {
      console.log(`\n📚 Lesson ${index + 1}:`);
      console.log(`   ID: ${lesson.id}`);
      console.log(`   Original ID: ${lesson.originalId}`);
      console.log(`   Title: ${lesson.title}`);
      console.log(`   Slides count: ${lesson.content?.slides?.length || 0}`);
      
      if (lesson.content?.slides) {
        console.log(`   First 3 slides:`, lesson.content.slides.slice(0, 3).map(s => s.id));
      }
    });
    
    // Test filtering logic (same as Roadmap component)
    const clearIdLessons = lessons?.filter(lesson => 
      lesson.id && lesson.id.startsWith('lesson')
    ) || [];
    
    console.log(`\n🔍 Filtered lessons (starting with 'lesson'): ${clearIdLessons.length}`);
    clearIdLessons.forEach(lesson => {
      console.log(`   - ${lesson.id}: ${lesson.title}`);
    });
    
    // Test sorting logic
    const sortedLessons = clearIdLessons.sort((a, b) => {
      const aId = a.originalId || a.id || '';
      const bId = b.originalId || b.id || '';
      return aId.localeCompare(bId);
    });
    
    console.log(`\n📋 Sorted lessons:`);
    sortedLessons.forEach(lesson => {
      console.log(`   - ${lesson.id}: ${lesson.title}`);
    });
    
  } catch (error) {
    console.error('❌ Error testing local lessons:', error);
  }
}

testLocalLessons(); 