const fs = require('fs');
const path = require('path');

console.log('Testing lesson imports...');

try {
  // Test importing lesson010
  const lesson010Path = path.join(__dirname, '..', 'src', 'data', 'lessons', 'lesson010', 'index.js');
  console.log('Lesson010 path:', lesson010Path);
  console.log('File exists:', fs.existsSync(lesson010Path));
  
  if (fs.existsSync(lesson010Path)) {
    const content = fs.readFileSync(lesson010Path, 'utf8');
    console.log('File content preview:', content.substring(0, 200));
  }
  
  // Test importing a slide
  const slide001Path = path.join(__dirname, '..', 'src', 'data', 'lessons', 'lesson010', 'slides', 'slide001.js');
  console.log('Slide001 path:', slide001Path);
  console.log('File exists:', fs.existsSync(slide001Path));
  
  if (fs.existsSync(slide001Path)) {
    const content = fs.readFileSync(slide001Path, 'utf8');
    console.log('Slide content:', content);
  }
  
} catch (error) {
  console.error('Error:', error.message);
} 