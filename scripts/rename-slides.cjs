const fs = require('fs');
const path = require('path');

function renameSlidesInLesson(lessonNumber) {
  const lessonPath = `src/data/lessons/lesson${lessonNumber}`;
  const slidesPath = `${lessonPath}/slides`;
  
  if (!fs.existsSync(slidesPath)) {
    console.log(`❌ Slides directory not found: ${slidesPath}`);
    return;
  }
  
  console.log(`\n🔄 Renaming slides in lesson${lessonNumber}...`);
  
  // Get all slide files
  const files = fs.readdirSync(slidesPath);
  const slideFiles = files.filter(file => file.startsWith('slide') && file.endsWith('.js'));
  
  // Sort files to ensure consistent numbering
  slideFiles.sort();
  
  // Rename files
  slideFiles.forEach((file, index) => {
    const oldPath = `${slidesPath}/${file}`;
    const newFileName = `slide${String(index + 1).padStart(3, '0')}.js`;
    const newPath = `${slidesPath}/${newFileName}`;
    
    try {
      fs.renameSync(oldPath, newPath);
      console.log(`  ✅ ${file} → ${newFileName}`);
    } catch (error) {
      console.log(`  ❌ Failed to rename ${file}: ${error.message}`);
    }
  });
  
  console.log(`  📊 Renamed ${slideFiles.length} slides`);
}

// Rename slides in all lessons
console.log('🚀 Starting slide renaming...');

for (let i = 1; i <= 9; i++) {
  renameSlidesInLesson(i);
}

console.log('\n✅ Slide renaming completed!'); 