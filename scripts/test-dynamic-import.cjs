const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');

async function testDynamicImport() {
  console.log('Testing dynamic import of lessons...');
  
  try {
    // Test importing the main lessons index
    const lessonsPath = path.join(__dirname, '..', 'src', 'data', 'lessons', 'index.js');
    const fileUrl = `file:///${lessonsPath.replace(/\\/g, '/')}`;
    
    console.log('Lessons index path:', lessonsPath);
    console.log('File URL:', fileUrl);
    console.log('File exists:', fs.existsSync(lessonsPath));
    
    if (fs.existsSync(lessonsPath)) {
      const lessonsModule = await import(fileUrl);
      console.log('✅ Successfully imported lessons module');
      console.log('Available exports:', Object.keys(lessonsModule));
      
      if (lessonsModule.lessons) {
        console.log(`📚 Found ${lessonsModule.lessons.length} lessons`);
        lessonsModule.lessons.forEach((lesson, index) => {
          console.log(`  ${index + 1}. ${lesson.id}: ${lesson.title}`);
        });
      }
    }
    
  } catch (error) {
    console.error('❌ Error importing lessons:', error.message);
    console.error('Stack:', error.stack);
  }
}

testDynamicImport(); 