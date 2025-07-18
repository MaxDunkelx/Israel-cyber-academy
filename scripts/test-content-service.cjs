// Test the content service
async function testContentService() {
  console.log('🧪 Testing content service...');
  
  try {
    // Import the content service
    const { getAllLessons } = await import('../src/firebase/content-service.js');
    
    console.log('📚 Calling getAllLessons...');
    const lessons = await getAllLessons(true); // Force refresh
    
    console.log(`✅ Loaded ${lessons.length} lessons from content service`);
    
    lessons.forEach((lesson, index) => {
      console.log(`\n📚 Lesson ${index + 1}:`);
      console.log(`   ID: ${lesson.id}`);
      console.log(`   Original ID: ${lesson.originalId}`);
      console.log(`   Title: ${lesson.title}`);
      console.log(`   Source: ${lesson.source || 'database'}`);
      console.log(`   Total slides: ${lesson.totalSlides || 0}`);
    });
    
    // Test filtering logic (same as Roadmap component)
    const clearIdLessons = lessons?.filter(lesson => 
      lesson.id && lesson.id.startsWith('lesson')
    ) || [];
    
    console.log(`\n🔍 Filtered lessons (starting with 'lesson'): ${clearIdLessons.length}`);
    clearIdLessons.forEach(lesson => {
      console.log(`   - ${lesson.id}: ${lesson.title}`);
    });
    
  } catch (error) {
    console.error('❌ Error testing content service:', error);
  }
}

testContentService(); 