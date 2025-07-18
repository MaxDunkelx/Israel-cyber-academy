const fs = require('fs');
const path = require('path');

function fixLessonIndex(lessonNumber) {
  const lessonPath = `src/data/lessons/lesson${lessonNumber}`;
  const indexPath = `${lessonPath}/index.js`;
  const slidesPath = `${lessonPath}/slides`;
  
  if (!fs.existsSync(indexPath)) {
    console.log(`❌ Index file not found: ${indexPath}`);
    return;
  }
  
  console.log(`\n🔄 Fixing lesson${lessonNumber} index...`);
  
  // Get all slide files
  const files = fs.readdirSync(slidesPath);
  const slideFiles = files.filter(file => file.startsWith('slide') && file.endsWith('.js'));
  slideFiles.sort();
  
  // Create new content
  let content = '';
  
  // Add imports
  slideFiles.forEach((file, index) => {
    const slideNumber = String(index + 1).padStart(3, '0');
    content += `import { slide${slideNumber} } from './slides/${file}';\n`;
  });
  
  content += '\n';
  
  // Add lesson object
  const newLessonId = `lesson${String(lessonNumber).padStart(3, '0')}`;
  content += `export const ${newLessonId} = {\n`;
  content += `  id: "${newLessonId}",\n`;
  content += `  originalId: "${newLessonId}",\n`;
  content += `  title: "מבוא לעולם הסייבר",\n`;
  content += `  description: "שיעור מקיף בן 2.5 שעות - הכרת עולם הסייבר, האקרים, איומים דיגיטליים ופעילויות אינטראקטיביות משופרות",\n`;
  content += `  icon: "🛡️",\n`;
  content += `  duration: "2.5 שעות",\n`;
  content += `  difficulty: "קל",\n`;
  content += `  targetAge: "10-13",\n`;
  content += `  breakDuration: 15,\n`;
  content += `  content: {\n`;
  content += `    slides: [\n`;
  
  // Add slides array
  slideFiles.forEach((file, index) => {
    const slideNumber = String(index + 1).padStart(3, '0');
    content += `      slide${slideNumber}`;
    if (index < slideFiles.length - 1) {
      content += ',';
    }
    content += '\n';
  });
  
  content += `    ]\n`;
  content += `  }\n`;
  content += `};`;
  
  // Write the updated content
  fs.writeFileSync(indexPath, content);
  console.log(`  ✅ Fixed ${indexPath}`);
}

// Fix all lessons
console.log('🚀 Starting lesson index fixes...');

for (let i = 1; i <= 9; i++) {
  fixLessonIndex(i);
}

console.log('\n✅ Lesson index fixes completed!'); 