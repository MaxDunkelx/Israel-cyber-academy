/**
 * Migration Script: Convert to Unified Slide Types
 * 
 * This script converts existing lessons from the old slide types to the new unified system:
 * - 'presentation' -> 'content'
 * - 'poll' -> 'assessment' (with assessmentType: 'poll')
 * - 'quiz' -> 'assessment' (with assessmentType: 'quiz')
 * - 'reflection' -> 'assessment' (with assessmentType: 'reflection')
 * - 'video' -> 'video' (unchanged)
 * - 'interactive' -> 'interactive' (unchanged)
 * - 'break' -> 'break' (unchanged)
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc, updateDoc, collection, getDocs } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');

// Firebase configuration
const firebaseConfig = {
  // Add your Firebase config here
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Convert slide type from old to new format
 */
function convertSlideType(slide) {
  const newSlide = { ...slide };
  
  switch (slide.type) {
    case 'presentation':
      newSlide.type = 'content';
      break;
      
    case 'poll':
      newSlide.type = 'assessment';
      newSlide.content = {
        ...newSlide.content,
        assessmentType: 'poll'
      };
      break;
      
    case 'quiz':
      newSlide.type = 'assessment';
      newSlide.content = {
        ...newSlide.content,
        assessmentType: 'quiz'
      };
      break;
      
    case 'reflection':
      newSlide.type = 'assessment';
      newSlide.content = {
        ...newSlide.content,
        assessmentType: 'reflection'
      };
      break;
      
    // These types remain unchanged
    case 'video':
    case 'interactive':
    case 'break':
      // No changes needed
      break;
      
    default:
      console.warn(`⚠️ Unknown slide type: ${slide.type} in slide ${slide.id}`);
  }
  
  return newSlide;
}

/**
 * Convert a lesson to use unified slide types
 */
function convertLesson(lesson) {
  if (!lesson.content || !lesson.content.slides) {
    console.warn(`⚠️ Lesson ${lesson.id} has no slides to convert`);
    return lesson;
  }
  
  const convertedSlides = lesson.content.slides.map(slide => convertSlideType(slide));
  
  return {
    ...lesson,
    content: {
      ...lesson.content,
      slides: convertedSlides
    }
  };
}

/**
 * Migrate lessons in Firebase
 */
async function migrateFirebaseLessons() {
  console.log('🔄 Starting Firebase migration...');
  
  try {
    const lessonsRef = collection(db, 'lessons');
    const snapshot = await getDocs(lessonsRef);
    
    console.log(`📊 Found ${snapshot.size} lessons to migrate`);
    
    let migratedCount = 0;
    let errorCount = 0;
    
    for (const docSnapshot of snapshot.docs) {
      const lesson = docSnapshot.data();
      const lessonId = docSnapshot.id;
      
      try {
        console.log(`🔄 Migrating lesson: ${lesson.title || lessonId}`);
        
        const convertedLesson = convertLesson(lesson);
        
        // Update the lesson in Firebase
        await updateDoc(doc(db, 'lessons', lessonId), convertedLesson);
        
        console.log(`✅ Successfully migrated lesson: ${lesson.title || lessonId}`);
        migratedCount++;
        
      } catch (error) {
        console.error(`❌ Error migrating lesson ${lessonId}:`, error);
        errorCount++;
      }
    }
    
    console.log(`\n📈 Migration Summary:`);
    console.log(`✅ Successfully migrated: ${migratedCount} lessons`);
    console.log(`❌ Errors: ${errorCount} lessons`);
    console.log(`📊 Total processed: ${snapshot.size} lessons`);
    
  } catch (error) {
    console.error('❌ Error during Firebase migration:', error);
  }
}

/**
 * Migrate local lesson files
 */
function migrateLocalLessons() {
  console.log('🔄 Starting local lessons migration...');
  
  const lessonsDir = path.join(__dirname, '../src/data/lessons');
  
  if (!fs.existsSync(lessonsDir)) {
    console.log('📁 No local lessons directory found');
    return;
  }
  
  const lessonFolders = fs.readdirSync(lessonsDir).filter(folder => 
    folder.startsWith('lesson') && fs.statSync(path.join(lessonsDir, folder)).isDirectory()
  );
  
  console.log(`📊 Found ${lessonFolders.length} local lesson folders`);
  
  let migratedCount = 0;
  let errorCount = 0;
  
  lessonFolders.forEach(folder => {
    try {
      const lessonPath = path.join(lessonsDir, folder, 'index.js');
      
      if (!fs.existsSync(lessonPath)) {
        console.warn(`⚠️ No index.js found in ${folder}`);
        return;
      }
      
      console.log(`🔄 Migrating local lesson: ${folder}`);
      
      // Read the lesson file
      const lessonContent = fs.readFileSync(lessonPath, 'utf8');
      
      // Simple string replacement for common patterns
      let convertedContent = lessonContent
        .replace(/type:\s*['"]presentation['"]/g, "type: 'content'")
        .replace(/type:\s*['"]poll['"]/g, "type: 'assessment'")
        .replace(/type:\s*['"]quiz['"]/g, "type: 'assessment'")
        .replace(/type:\s*['"]reflection['"]/g, "type: 'assessment'");
      
      // Add assessmentType for assessment slides
      convertedContent = convertedContent.replace(
        /content:\s*{([^}]*)}/g,
        (match, content) => {
          if (match.includes("type: 'assessment'")) {
            // Determine assessment type based on context
            if (content.includes('question') && content.includes('options')) {
              return `content: {${content}, assessmentType: 'quiz'}`;
            } else if (content.includes('prompt')) {
              return `content: {${content}, assessmentType: 'reflection'}`;
            } else {
              return `content: {${content}, assessmentType: 'poll'}`;
            }
          }
          return match;
        }
      );
      
      // Write the converted content back
      fs.writeFileSync(lessonPath, convertedContent);
      
      console.log(`✅ Successfully migrated local lesson: ${folder}`);
      migratedCount++;
      
    } catch (error) {
      console.error(`❌ Error migrating local lesson ${folder}:`, error);
      errorCount++;
    }
  });
  
  console.log(`\n📈 Local Migration Summary:`);
  console.log(`✅ Successfully migrated: ${migratedCount} local lessons`);
  console.log(`❌ Errors: ${errorCount} local lessons`);
  console.log(`📊 Total processed: ${lessonFolders.length} local lessons`);
}

/**
 * Create a backup of the current state
 */
async function createBackup() {
  console.log('💾 Creating backup...');
  
  try {
    const lessonsRef = collection(db, 'lessons');
    const snapshot = await getDocs(lessonsRef);
    
    const backup = {
      timestamp: new Date().toISOString(),
      lessons: {}
    };
    
    snapshot.docs.forEach(docSnapshot => {
      backup.lessons[docSnapshot.id] = docSnapshot.data();
    });
    
    const backupPath = path.join(__dirname, `backup-lessons-${Date.now()}.json`);
    fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2));
    
    console.log(`✅ Backup created: ${backupPath}`);
    
  } catch (error) {
    console.error('❌ Error creating backup:', error);
  }
}

/**
 * Main migration function
 */
async function runMigration() {
  console.log('🚀 Starting Unified Slide Types Migration');
  console.log('==========================================\n');
  
  // Create backup first
  await createBackup();
  
  // Migrate Firebase lessons
  await migrateFirebaseLessons();
  
  // Migrate local lessons
  migrateLocalLessons();
  
  console.log('\n🎉 Migration completed!');
  console.log('\n📝 Next steps:');
  console.log('1. Test the application with the new slide types');
  console.log('2. Update any custom lesson creation tools');
  console.log('3. Remove legacy slide components after testing');
  console.log('4. Update documentation to reflect new slide types');
}

// Run the migration if this script is executed directly
if (require.main === module) {
  runMigration().catch(console.error);
}

module.exports = {
  convertSlideType,
  convertLesson,
  migrateFirebaseLessons,
  migrateLocalLessons,
  createBackup,
  runMigration
}; 