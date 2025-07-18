const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, getDoc } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');

// Firebase config (development)
const firebaseConfig = {
  projectId: 'israel-cyber-academy',
  authDomain: 'israel-cyber-academy.firebaseapp.com',
  storageBucket: 'israel-cyber-academy.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abcdef'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function analyzeDataSources() {
  console.log('🔍 ANALYZING DATA SOURCES...\n');
  
  // 1. Check Database Lessons
  console.log('📊 1. DATABASE LESSONS:');
  try {
    const lessonsRef = collection(db, 'lessons');
    const snapshot = await getDocs(lessonsRef);
    const dbLessons = [];
    
    snapshot.forEach(doc => {
      const data = doc.data();
      dbLessons.push({
        id: doc.id,
        originalId: data.originalId,
        title: data.title,
        totalSlides: data.totalSlides,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        source: 'database'
      });
    });
    
    console.log(`   Found ${dbLessons.length} lessons in database:`);
    dbLessons.forEach(lesson => {
      console.log(`   - ${lesson.id} (originalId: ${lesson.originalId}) - "${lesson.title}" - ${lesson.totalSlides} slides`);
    });
    
    // Check for old vs new format
    const oldFormat = dbLessons.filter(l => l.id.match(/^lesson\d{1,2}$/));
    const newFormat = dbLessons.filter(l => l.id.match(/^lesson\d{3}$/));
    console.log(`   📋 Old format (lesson1-9): ${oldFormat.length}`);
    console.log(`   📋 New format (lesson001-016): ${newFormat.length}`);
    
  } catch (error) {
    console.log(`   ❌ Database error: ${error.message}`);
  }
  
  // 2. Check Local Lessons
  console.log('\n📁 2. LOCAL LESSONS:');
  try {
    const localLessonsPath = path.join(__dirname, '../src/data/lessons/index.js');
    const localLessonsContent = fs.readFileSync(localLessonsPath, 'utf8');
    
    // Extract lesson imports
    const lessonImports = localLessonsContent.match(/import.*from.*/g) || [];
    console.log(`   Found ${lessonImports.length} lesson imports in index.js:`);
    lessonImports.forEach(importLine => {
      console.log(`   - ${importLine.trim()}`);
    });
    
    // Check actual lesson folders
    const lessonsDir = path.join(__dirname, '../src/data/lessons');
    const lessonFolders = fs.readdirSync(lessonsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('lesson'))
      .map(dirent => dirent.name)
      .sort();
    
    console.log(`   📁 Actual lesson folders (${lessonFolders.length}):`);
    lessonFolders.forEach(folder => {
      console.log(`   - ${folder}`);
    });
    
    // Check for mismatches
    const importFolders = lessonImports.map(imp => {
      const match = imp.match(/from '\.\/([^']+)'/);
      return match ? match[1] : null;
    }).filter(Boolean);
    
    const missingFolders = importFolders.filter(imp => !lessonFolders.includes(imp));
    const extraFolders = lessonFolders.filter(folder => !importFolders.includes(folder));
    
    if (missingFolders.length > 0) {
      console.log(`   ⚠️ Missing folders: ${missingFolders.join(', ')}`);
    }
    if (extraFolders.length > 0) {
      console.log(`   ⚠️ Extra folders: ${extraFolders.join(', ')}`);
    }
    
  } catch (error) {
    console.log(`   ❌ Local lessons error: ${error.message}`);
  }
  
  // 3. Check User Data
  console.log('\n👤 3. USER DATA:');
  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    const users = [];
    
    snapshot.forEach(doc => {
      const data = doc.data();
      users.push({
        id: doc.id,
        email: data.email,
        role: data.role,
        currentLesson: data.currentLesson,
        completedLessons: data.completedLessons?.length || 0,
        classId: data.classId
      });
    });
    
    console.log(`   Found ${users.length} users:`);
    users.forEach(user => {
      console.log(`   - ${user.id} (${user.email}) - ${user.role} - currentLesson: ${user.currentLesson} - completed: ${user.completedLessons}`);
    });
    
    // Check for student001 specifically
    const student001 = users.find(u => u.id === 'student001');
    if (student001) {
      console.log(`   📋 student001 details:`);
      console.log(`   - currentLesson: ${student001.currentLesson}`);
      console.log(`   - completedLessons: ${student001.completedLessons}`);
      console.log(`   - classId: ${student001.classId}`);
    }
    
  } catch (error) {
    console.log(`   ❌ User data error: ${error.message}`);
  }
  
  // 4. Check Classes
  console.log('\n🏫 4. CLASSES:');
  try {
    const classesRef = collection(db, 'classes');
    const snapshot = await getDocs(classesRef);
    const classes = [];
    
    snapshot.forEach(doc => {
      const data = doc.data();
      classes.push({
        id: doc.id,
        name: data.name,
        teacherId: data.teacherId,
        students: data.students?.length || 0,
        assignedLessons: data.assignedLessons?.length || 0
      });
    });
    
    console.log(`   Found ${classes.length} classes:`);
    classes.forEach(cls => {
      console.log(`   - ${cls.id} (${cls.name}) - teacher: ${cls.teacherId} - students: ${cls.students} - lessons: ${cls.assignedLessons}`);
    });
    
  } catch (error) {
    console.log(`   ❌ Classes error: ${error.message}`);
  }
  
  // 5. Check Content Service Fallback
  console.log('\n🔄 5. CONTENT SERVICE FALLBACK:');
  try {
    // Simulate the fallback logic
    const { lessons } = require('../src/data/lessons/index.js');
    console.log(`   Local lessons index has ${lessons.length} lessons:`);
    lessons.forEach((lesson, index) => {
      console.log(`   - ${lesson.id} - "${lesson.title}" - ${lesson.content?.slides?.length || 0} slides`);
    });
    
  } catch (error) {
    console.log(`   ❌ Content service fallback error: ${error.message}`);
  }
  
  // 6. Summary and Issues
  console.log('\n📋 6. SUMMARY AND ISSUES:');
  console.log('   Based on the analysis, here are the potential issues:');
  console.log('   1. Database has both old format (lesson1-9) and new format (lesson001-016) lessons');
  console.log('   2. Content service filters out old format, but database still contains them');
  console.log('   3. Local lessons index imports from old folder names (lesson1-9) but folders are new format (lesson001-016)');
  console.log('   4. User currentLesson field might not match lesson IDs');
  console.log('   5. Lesson completion tracking might use different ID formats');
  
  console.log('\n🔧 RECOMMENDED FIXES:');
  console.log('   1. Clean up database to remove old format lessons');
  console.log('   2. Fix local lessons index imports to match actual folder names');
  console.log('   3. Ensure consistent lesson ID format throughout the system');
  console.log('   4. Update user progress tracking to use consistent lesson IDs');
}

// Run the analysis
analyzeDataSources().catch(console.error); 