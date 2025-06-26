import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, writeBatch, serverTimestamp, doc } from 'firebase/firestore';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvOkT3v1EQqMVIupBA-BmOoOqXjKJQJQw",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function isLessonFolder(name) {
  return /^lesson\d+$/.test(name);
}

async function getLessonExport(module, folderName) {
  // Try to find the named export (lesson1, lesson2, ...)
  const exportName = folderName;
  if (module[exportName]) return module[exportName];
  // Fallback: try to find the first export that looks like a lesson object
  for (const key of Object.keys(module)) {
    if (key.startsWith('lesson') && typeof module[key] === 'object') {
      return module[key];
    }
  }
  return null;
}

async function populateDatabase() {
  try {
    console.log('🚀 Starting robust database population...');
    const lessonsDir = join(process.cwd(), 'src', 'data', 'lessons');
    const lessonFolders = await readdir(lessonsDir);
    let totalLessons = 0;
    let totalSlides = 0;
    let skipped = [];
    for (const folderName of lessonFolders) {
      if (!isLessonFolder(folderName)) continue;
      const folderPath = join(lessonsDir, folderName);
      const stats = await stat(folderPath);
      if (!stats.isDirectory()) continue;
      try {
        const lessonPath = `file://${join(folderPath, 'index.js').replace(/\\/g, '/')}`;
        const lessonModule = await import(lessonPath);
        const lessonObj = await getLessonExport(lessonModule, folderName);
        if (!lessonObj) {
          console.error(`❌ No lesson export found in ${folderName}`);
          skipped.push(folderName);
          continue;
        }
        if (!lessonObj.content || !Array.isArray(lessonObj.content.slides)) {
          console.error(`❌ No slides found in lesson ${folderName}`);
          skipped.push(folderName);
          continue;
        }
        // Create lesson in Firestore
        const { content, ...lessonMeta } = lessonObj;
        const lessonDoc = await addDoc(collection(db, 'lessons'), {
          ...lessonMeta,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          version: 1,
          totalSlides: lessonObj.content.slides.length
        });
        console.log(`✅ Created lesson: ${lessonObj.title} (ID: ${lessonDoc.id})`);
        totalLessons++;
        // Process slides
        const batch = writeBatch(db);
        for (let i = 0; i < lessonObj.content.slides.length; i++) {
          const slide = lessonObj.content.slides[i];
          if (!slide || typeof slide !== 'object') {
            console.warn(`⚠️ Skipping invalid slide at index ${i} in ${folderName}`);
            continue;
          }
          const slideRef = doc(collection(db, 'slides'));
          batch.set(slideRef, {
            ...slide,
            lessonId: lessonDoc.id,
            order: i + 1,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            version: 1
          });
          totalSlides++;
        }
        await batch.commit();
        console.log(`   📄 Created ${lessonObj.content.slides.length} slides`);
      } catch (error) {
        console.error(`❌ Error processing ${folderName}:`, error.message);
        skipped.push(folderName);
        continue;
      }
    }
    console.log(`\n🎉 Population completed successfully!`);
    console.log(`📊 Summary:`);
    console.log(`   - ${totalLessons} lessons created`);
    console.log(`   - ${totalSlides} slides created`);
    if (skipped.length > 0) {
      console.log(`   - Skipped/errored lessons: ${skipped.join(', ')}`);
    }
    console.log(`   - All data properly linked with correct lessonId references`);
  } catch (error) {
    console.error('❌ Population failed:', error);
    throw error;
  }
}

populateDatabase()
  .then(() => {
    console.log('✅ Database population completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Population failed:', error);
    process.exit(1);
  }); 