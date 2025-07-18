const fs = require('fs');
const path = require('path');

function updateLessonIndex(lessonNumber) {
  const lessonPath = `src/data/lessons/lesson${lessonNumber}`;
  const indexPath = `${lessonPath}/index.js`;
  const slidesPath = `${lessonPath}/slides`;
  
  if (!fs.existsSync(indexPath)) {
    console.log(`❌ Index file not found: ${indexPath}`);
    return;
  }
  
  console.log(`\n🔄 Updating lesson${lessonNumber} index...`);
  
  // Get all slide files
  const files = fs.readdirSync(slidesPath);
  const slideFiles = files.filter(file => file.startsWith('slide') && file.endsWith('.js'));
  slideFiles.sort();
  
  // Read the index file
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // Update imports
  slideFiles.forEach((file, index) => {
    const slideNumber = String(index + 1).padStart(3, '0');
    const oldImportPattern = new RegExp(`import \\{ [^}]+ \\} from '\\./slides/[^']+';`, 'g');
    const newImport = `import { slide${slideNumber} } from './slides/${file}';`;
    
    // Replace the import for this slide
    const lines = content.split('\n');
    const updatedLines = lines.map(line => {
      if (line.includes('import') && line.includes('./slides/')) {
        return newImport;
      }
      return line;
    });
    content = updatedLines.join('\n');
  });
  
  // Update lesson object
  const newLessonId = `lesson${String(lessonNumber).padStart(3, '0')}`;
  content = content.replace(
    new RegExp(`export const lesson${lessonNumber}`, 'g'),
    `export const ${newLessonId}`
  );
  
  content = content.replace(
    new RegExp(`id: ${lessonNumber}`, 'g'),
    `id: "${newLessonId}"`
  );
  
  content = content.replace(
    new RegExp(`originalId: ${lessonNumber}`, 'g'),
    `originalId: "${newLessonId}"`
  );
  
  // Update slides array
  const slidesArray = slideFiles.map((file, index) => {
    const slideNumber = String(index + 1).padStart(3, '0');
    return `slide${slideNumber}`;
  });
  
  const slidesArrayString = `slides: [\n      ${slidesArray.join(',\n      ')}\n    ]`;
  
  content = content.replace(
    /slides: \[[\s\S]*?\n    \]/,
    slidesArrayString
  );
  
  // Write the updated content
  fs.writeFileSync(indexPath, content);
  console.log(`  ✅ Updated ${indexPath}`);
}

function updateSlideFiles(lessonNumber) {
  const lessonPath = `src/data/lessons/lesson${lessonNumber}`;
  const slidesPath = `${lessonPath}/slides`;
  
  console.log(`\n🔄 Updating slide files in lesson${lessonNumber}...`);
  
  // Get all slide files
  const files = fs.readdirSync(slidesPath);
  const slideFiles = files.filter(file => file.startsWith('slide') && file.endsWith('.js'));
  slideFiles.sort();
  
  // Update each slide file
  slideFiles.forEach((file, index) => {
    const slideNumber = String(index + 1).padStart(3, '0');
    const filePath = `${slidesPath}/${file}`;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update export name
    const oldExportPattern = new RegExp(`export const [^\\s]+`, 'g');
    const newExport = `export const slide${slideNumber}`;
    content = content.replace(oldExportPattern, newExport);
    
    // Update slide ID
    content = content.replace(
      /id: ["'][^"']*["']/g,
      `id: "slide${slideNumber}"`
    );
    
    // Write the updated content
    fs.writeFileSync(filePath, content);
    console.log(`  ✅ Updated ${file}`);
  });
}

// Update all lessons
console.log('🚀 Starting lesson index and slide file updates...');

for (let i = 1; i <= 9; i++) {
  updateLessonIndex(i);
  updateSlideFiles(i);
}

console.log('\n✅ Lesson updates completed!'); 