const fs = require('fs');
const path = require('path');

// Migration mapping for lesson1 slides
const lesson1SlideMapping = [
  { old: 'slide1-intro.js', new: 'slide001-intro.js', export: 'slide001Intro' },
  { old: 'slide1a-welcome.js', new: 'slide002-welcome.js', export: 'slide002Welcome' },
  { old: 'slide2-poll.js', new: 'slide003-poll.js', export: 'slide003Poll' },
  { old: 'slide3-cyber-intro.js', new: 'slide004-cyber-intro.js', export: 'slide004CyberIntro' },
  { old: 'slide4-hacker-video.js', new: 'slide005-hacker-video.js', export: 'slide005HackerVideo' },
  { old: 'slide5-hacker-game.js', new: 'slide006-hacker-game.js', export: 'slide006HackerGame' },
  { old: 'slide6-security-info.js', new: 'slide007-security-info.js', export: 'slide007SecurityInfo' },
  { old: 'slide6a-security-implementation.js', new: 'slide008-security-implementation.js', export: 'slide008SecurityImplementation' },
  { old: 'slide7-security-tools.js', new: 'slide009-security-tools.js', export: 'slide009SecurityTools' },
  { old: 'slide8-cyber-triangle.js', new: 'slide010-cyber-triangle.js', export: 'slide010CyberTriangle' },
  { old: 'slide9-cyber-triangle-quiz.js', new: 'slide011-cyber-triangle-quiz.js', export: 'slide011CyberTriangleQuiz' },
  { old: 'slide10-break.js', new: 'slide012-break.js', export: 'slide012Break' },
  { old: 'slide11-digital-threats.js', new: 'slide013-digital-threats.js', export: 'slide013DigitalThreats' },
  { old: 'slide12-threat-identification.js', new: 'slide014-threat-identification.js', export: 'slide014ThreatIdentification' },
  { old: 'slide13-staying-safe.js', new: 'slide015-staying-safe.js', export: 'slide015StayingSafe' },
  { old: 'slide14-password-strength.js', new: 'slide016-password-strength.js', export: 'slide016PasswordStrength' },
  { old: 'slide15-password-video.js', new: 'slide017-password-video.js', export: 'slide017PasswordVideo' },
  { old: 'slide16-passwordGenerator.js', new: 'slide018-passwordGenerator.js', export: 'slide018PasswordGenerator' },
  { old: 'slide17-final-quiz.js', new: 'slide019-final-quiz.js', export: 'slide019FinalQuiz' },
  { old: 'slide18-reflection.js', new: 'slide020-reflection.js', export: 'slide020Reflection' },
  { old: 'slide19-summary.js', new: 'slide021-summary.js', export: 'slide021Summary' }
];

// Migration mapping for lesson2 slides (25 slides)
const lesson2SlideMapping = [];
for (let i = 1; i <= 25; i++) {
  const oldFile = `slide${i}.js`;
  const newFile = `slide${String(i).padStart(3, '0')}.js`;
  const exportName = `slide${String(i).padStart(3, '0')}`;
  lesson2SlideMapping.push({ old: oldFile, new: newFile, export: exportName });
}

// Migration mapping for lesson3 slides (22 slides)
const lesson3SlideMapping = [];
for (let i = 1; i <= 22; i++) {
  const oldFile = `slide${i}.js`;
  const newFile = `slide${String(i).padStart(3, '0')}.js`;
  const exportName = `slide${String(i).padStart(3, '0')}`;
  lesson3SlideMapping.push({ old: oldFile, new: newFile, export: exportName });
}

// Migration mapping for lesson4 slides (24 slides)
const lesson4SlideMapping = [];
for (let i = 1; i <= 24; i++) {
  const oldFile = `slide${i}.js`;
  const newFile = `slide${String(i).padStart(3, '0')}.js`;
  const exportName = `slide${String(i).padStart(3, '0')}`;
  lesson4SlideMapping.push({ old: oldFile, new: newFile, export: exportName });
}

// Migration mapping for lesson5 slides (22 slides)
const lesson5SlideMapping = [];
for (let i = 1; i <= 22; i++) {
  const oldFile = `slide${i}.js`;
  const newFile = `slide${String(i).padStart(3, '0')}.js`;
  const exportName = `slide${String(i).padStart(3, '0')}`;
  lesson5SlideMapping.push({ old: oldFile, new: newFile, export: exportName });
}

// Migration mapping for lesson6 slides (24 slides)
const lesson6SlideMapping = [];
for (let i = 1; i <= 24; i++) {
  const oldFile = `slide${i}.js`;
  const newFile = `slide${String(i).padStart(3, '0')}.js`;
  const exportName = `slide${String(i).padStart(3, '0')}`;
  lesson6SlideMapping.push({ old: oldFile, new: newFile, export: exportName });
}

// Migration mapping for lesson7 slides (18 slides)
const lesson7SlideMapping = [];
for (let i = 1; i <= 18; i++) {
  const oldFile = `slide${i}.js`;
  const newFile = `slide${String(i).padStart(3, '0')}.js`;
  const exportName = `slide${String(i).padStart(3, '0')}`;
  lesson7SlideMapping.push({ old: oldFile, new: newFile, export: exportName });
}

// Migration mapping for lesson8 slides (24 slides)
const lesson8SlideMapping = [];
for (let i = 1; i <= 24; i++) {
  const oldFile = `slide${i}.js`;
  const newFile = `slide${String(i).padStart(3, '0')}.js`;
  const exportName = `slide${String(i).padStart(3, '0')}`;
  lesson8SlideMapping.push({ old: oldFile, new: newFile, export: exportName });
}

// Migration mapping for lesson9 slides (20 slides)
const lesson9SlideMapping = [];
for (let i = 1; i <= 20; i++) {
  const oldFile = `slide${i}.js`;
  const newFile = `slide${String(i).padStart(3, '0')}.js`;
  const exportName = `slide${String(i).padStart(3, '0')}`;
  lesson9SlideMapping.push({ old: oldFile, new: newFile, export: exportName });
}

const lessonMappings = {
  1: lesson1SlideMapping,
  2: lesson2SlideMapping,
  3: lesson3SlideMapping,
  4: lesson4SlideMapping,
  5: lesson5SlideMapping,
  6: lesson6SlideMapping,
  7: lesson7SlideMapping,
  8: lesson8SlideMapping,
  9: lesson9SlideMapping
};

function migrateLesson(lessonNumber) {
  const oldLessonPath = `src/data/lessons/lesson${lessonNumber}`;
  const newLessonPath = `src/data/lessons/lesson${String(lessonNumber).padStart(3, '0')}`;
  const slideMapping = lessonMappings[lessonNumber];
  
  console.log(`\n🔄 Migrating lesson${lessonNumber} to lesson${String(lessonNumber).padStart(3, '0')}...`);
  
  // Create new lesson directory
  if (!fs.existsSync(newLessonPath)) {
    fs.mkdirSync(newLessonPath, { recursive: true });
    fs.mkdirSync(`${newLessonPath}/slides`, { recursive: true });
  }
  
  // Copy and rename slide files
  slideMapping.forEach(mapping => {
    const oldSlidePath = `${oldLessonPath}/slides/${mapping.old}`;
    const newSlidePath = `${newLessonPath}/slides/${mapping.new}`;
    
    if (fs.existsSync(oldSlidePath)) {
      let content = fs.readFileSync(oldSlidePath, 'utf8');
      
      // Update the export name and slide ID
      const oldExportName = mapping.old.replace('.js', '').replace('-', '');
      const newExportName = mapping.export;
      const oldSlideId = mapping.old.replace('.js', '');
      const newSlideId = mapping.new.replace('.js', '');
      
      // Replace export name
      content = content.replace(
        new RegExp(`export const ${oldExportName}`, 'g'),
        `export const ${newExportName}`
      );
      
      // Replace slide ID
      content = content.replace(
        new RegExp(`id: ["']${oldSlideId}["']`, 'g'),
        `id: "${newSlideId}"`
      );
      
      // Replace any other references to the old slide ID
      content = content.replace(
        new RegExp(oldSlideId, 'g'),
        newSlideId
      );
      
      fs.writeFileSync(newSlidePath, content);
      console.log(`  ✅ ${mapping.old} → ${mapping.new}`);
    } else {
      console.log(`  ⚠️  ${mapping.old} not found`);
    }
  });
  
  // Create new lesson index.js
  const oldIndexPath = `${oldLessonPath}/index.js`;
  if (fs.existsSync(oldIndexPath)) {
    let content = fs.readFileSync(oldIndexPath, 'utf8');
    
    // Update lesson ID
    const oldLessonId = lessonNumber;
    const newLessonId = `lesson${String(lessonNumber).padStart(3, '0')}`;
    
    // Update import statements
    slideMapping.forEach(mapping => {
      const oldImport = `import { ${mapping.old.replace('.js', '').replace('-', '')} } from './slides/${mapping.old}';`;
      const newImport = `import { ${mapping.export} } from './slides/${mapping.new}';`;
      content = content.replace(oldImport, newImport);
    });
    
    // Update lesson object
    content = content.replace(
      new RegExp(`export const lesson${lessonNumber}`, 'g'),
      `export const ${newLessonId}`
    );
    
    content = content.replace(
      new RegExp(`id: ${oldLessonId}`, 'g'),
      `id: "${newLessonId}"`
    );
    
    content = content.replace(
      new RegExp(`originalId: ${oldLessonId}`, 'g'),
      `originalId: "${newLessonId}"`
    );
    
    // Update slides array
    slideMapping.forEach(mapping => {
      const oldSlideRef = mapping.old.replace('.js', '').replace('-', '');
      const newSlideRef = mapping.export;
      content = content.replace(
        new RegExp(`\\b${oldSlideRef}\\b`, 'g'),
        newSlideRef
      );
    });
    
    fs.writeFileSync(`${newLessonPath}/index.js`, content);
    console.log(`  ✅ Created ${newLessonPath}/index.js`);
  }
}

function updateMainIndex() {
  console.log('\n🔄 Updating main lessons index...');
  
  let content = fs.readFileSync('src/data/lessons/index.js', 'utf8');
  
  // Update imports
  for (let i = 1; i <= 9; i++) {
    const oldImport = `import { lesson${i} } from './lesson${i}/index.js';`;
    const newImport = `import { lesson${String(i).padStart(3, '0')} } from './lesson${String(i).padStart(3, '0')}/index.js';`;
    content = content.replace(oldImport, newImport);
  }
  
  // Update lessons array
  let lessonsArray = 'export const lessons = [\n';
  for (let i = 1; i <= 9; i++) {
    lessonsArray += `  lesson${String(i).padStart(3, '0')},\n`;
  }
  lessonsArray += '];';
  
  content = content.replace(
    /export const lessons = \[[\s\S]*?\];/,
    lessonsArray
  );
  
  // Update helper functions
  content = content.replace(
    /export const getLessonById = \(id\) => \{[\s\S]*?\};/,
    `export const getLessonById = (id) => {
  return lessons.find(lesson => lesson.id === id);
};`
  );
  
  content = content.replace(
    /export const getNextLesson = \(currentId\) => \{[\s\S]*?\};/,
    `export const getNextLesson = (currentId) => {
  const currentIndex = lessons.findIndex(lesson => lesson.id === currentId);
  return lessons[currentIndex + 1] || null;
};`
  );
  
  content = content.replace(
    /export const getPreviousLesson = \(currentId\) => \{[\s\S]*?\};/,
    `export const getPreviousLesson = (currentId) => {
  const currentIndex = lessons.findIndex(lesson => lesson.id === currentId);
  return lessons[currentIndex - 1] || null;
};`
  );
  
  fs.writeFileSync('src/data/lessons/index.js', content);
  console.log('  ✅ Updated main lessons index');
}

// Run migration
console.log('🚀 Starting lesson ID migration...');

// Migrate all lessons
for (let i = 1; i <= 9; i++) {
  migrateLesson(i);
}

// Update main index
updateMainIndex();

console.log('\n✅ Migration completed!');
console.log('\n📝 Next steps:');
console.log('1. Test the new lesson structure');
console.log('2. Update any hardcoded lesson/slide references in the codebase');
console.log('3. Remove old lesson folders if everything works correctly'); 