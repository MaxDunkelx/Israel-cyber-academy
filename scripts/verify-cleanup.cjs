const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying lesson cleanup...\n');

const lessonsDir = path.join(__dirname, '..', 'src', 'data', 'lessons');
const items = fs.readdirSync(lessonsDir);

console.log('📁 Current items in lessons directory:');
items.forEach(item => {
  const itemPath = path.join(lessonsDir, item);
  const stats = fs.statSync(itemPath);
  const type = stats.isDirectory() ? '📁' : '📄';
  console.log(`  ${type} ${item}`);
});

console.log(`\n📊 Summary:`);
console.log(`  Total items: ${items.length}`);
console.log(`  Directories: ${items.filter(item => fs.statSync(path.join(lessonsDir, item)).isDirectory()).length}`);
console.log(`  Files: ${items.filter(item => fs.statSync(path.join(lessonsDir, item)).isFile()).length}`);

// Check for correct format lessons
const correctLessons = items.filter(item => 
  item.startsWith('lesson') && /^lesson\d{3}$/.test(item)
);

console.log(`\n✅ Correct format lessons (lesson001-lesson016): ${correctLessons.length}`);
correctLessons.forEach(lesson => {
  console.log(`  📁 ${lesson}`);
});

// Check for any remaining old format items
const oldFormatItems = items.filter(item => 
  item.startsWith('lesson') && !/^lesson\d{3}$/.test(item)
);

if (oldFormatItems.length > 0) {
  console.log(`\n❌ Old format items found:`);
  oldFormatItems.forEach(item => {
    console.log(`  ❌ ${item}`);
  });
} else {
  console.log(`\n✅ No old format items found - cleanup successful!`);
}

// Verify lesson order
const sortedLessons = correctLessons.sort();
console.log(`\n📋 Lesson order verification:`);
sortedLessons.forEach((lesson, index) => {
  const expectedNumber = String(index + 1).padStart(3, '0');
  const expectedLesson = `lesson${expectedNumber}`;
  const status = lesson === expectedLesson ? '✅' : '❌';
  console.log(`  ${status} ${lesson} (expected: ${expectedLesson})`);
});

console.log(`\n🎉 Cleanup verification complete!`); 