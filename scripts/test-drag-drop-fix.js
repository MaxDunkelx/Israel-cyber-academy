/**
 * Test Drag and Drop Fix - Israel Cyber Academy
 * 
 * This script tests the drag and drop cursor centering improvements
 * by checking the updated components and CSS.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 Testing Drag and Drop Fix...\n');

// Test 1: Check DragDropExercise component updates
console.log('📋 Test 1: Checking DragDropExercise component updates...');
const dragDropPath = path.join(__dirname, '../src/components/exercises/DragDropExercise.jsx');
const dragDropContent = fs.readFileSync(dragDropPath, 'utf8');

const requiredUpdates = [
  'draggable-item',
  'drag-transition',
  'drag-item-active',
  'drag-container',
  'drop-zone-active',
  'draggable={false}',
  'select-none',
  'transformOrigin: \'center center\'',
  'zIndex: snapshot.isDragging ? 9999 : \'auto\''
];

let allUpdatesPresent = true;
requiredUpdates.forEach(update => {
  const hasUpdate = dragDropContent.includes(update);
  console.log(`   ${hasUpdate ? '✅' : '❌'} ${update}`);
  if (!hasUpdate) allUpdatesPresent = false;
});

console.log(`\n📊 DragDropExercise Updates: ${allUpdatesPresent ? '✅ All present' : '❌ Missing some updates'}\n`);

// Test 2: Check CSS improvements
console.log('📋 Test 2: Checking CSS improvements...');
const cssPath = path.join(__dirname, '../src/App.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

const requiredCSS = [
  '.draggable-item',
  '.drag-cursor',
  '.drag-item-active',
  '.drop-zone-active',
  '.drag-container',
  'cursor: grab',
  'cursor: grabbing',
  'transform-origin: center center',
  'z-index: 9999'
];

let allCSSPresent = true;
requiredCSS.forEach(css => {
  const hasCSS = cssContent.includes(css);
  console.log(`   ${hasCSS ? '✅' : '❌'} ${css}`);
  if (!hasCSS) allCSSPresent = false;
});

console.log(`\n📊 CSS Improvements: ${allCSSPresent ? '✅ All present' : '❌ Missing some CSS'}\n`);

// Test 3: Check for proper imports
console.log('📋 Test 3: Checking component imports...');
const interactiveSlidePath = path.join(__dirname, '../src/components/slides/InteractiveSlide.jsx');
const interactiveSlideContent = fs.readFileSync(interactiveSlidePath, 'utf8');

const hasDragDropImport = interactiveSlideContent.includes('import DragDropExercise');
const hasDragDropUsage = interactiveSlideContent.includes('DragDropExercise');

console.log(`   ${hasDragDropImport ? '✅' : '❌'} DragDropExercise import`);
console.log(`   ${hasDragDropUsage ? '✅' : '❌'} DragDropExercise usage`);

console.log(`\n📊 Component Integration: ${hasDragDropImport && hasDragDropUsage ? '✅ Properly integrated' : '❌ Integration issues'}\n`);

// Test 4: Check for drag and drop exercises in lessons
console.log('📋 Test 4: Checking for drag and drop exercises in lessons...');
const lessonsDir = path.join(__dirname, '../src/data/lessons');
const lessonFiles = fs.readdirSync(lessonsDir).filter(file => file.endsWith('.js'));

let dragDropExercisesFound = 0;
lessonFiles.forEach(file => {
  const filePath = path.join(lessonsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('drag-drop')) {
    dragDropExercisesFound++;
    console.log(`   ✅ Found drag-drop exercises in ${file}`);
  }
});

console.log(`\n📊 Drag & Drop Exercises: ${dragDropExercisesFound} lessons contain drag-drop exercises\n`);

// Summary
console.log('🎯 Summary:');
console.log(`   DragDropExercise Updates: ${allUpdatesPresent ? '✅' : '❌'}`);
console.log(`   CSS Improvements: ${allCSSPresent ? '✅' : '❌'}`);
console.log(`   Component Integration: ${hasDragDropImport && hasDragDropUsage ? '✅' : '❌'}`);
console.log(`   Exercises Available: ${dragDropExercisesFound} lessons`);

const overallSuccess = allUpdatesPresent && allCSSPresent && hasDragDropImport && hasDragDropUsage && dragDropExercisesFound > 0;

console.log(`\n${overallSuccess ? '🎉 All tests passed! Drag and drop fix is ready.' : '⚠️ Some tests failed. Please check the issues above.'}`);

if (overallSuccess) {
  console.log('\n🚀 Next steps:');
  console.log('   1. Test the drag and drop functionality in the browser');
  console.log('   2. Verify cursor centering during drag operations');
  console.log('   3. Check visual feedback improvements');
  console.log('   4. Apply similar fixes to teacher and system manager components if needed');
} 