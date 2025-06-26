import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  updateDoc, 
  doc,
  query,
  where 
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxQqQqQqQqQqQqQqQqQqQqQqQqQqQqQqQ",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Fix slide order fields for all lessons
 */
async function fixSlideOrders() {
  try {
    console.log('🔧 Starting slide order fix...');
    
    // Get all lessons first
    const lessonsRef = collection(db, 'lessons');
    const lessonsSnapshot = await getDocs(lessonsRef);
    
    const lessons = [];
    lessonsSnapshot.forEach(doc => {
      lessons.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log(`📚 Found ${lessons.length} lessons`);
    
    // Process each lesson
    for (const lesson of lessons) {
      console.log(`\n📖 Processing lesson: ${lesson.title} (${lesson.id})`);
      
      // Get all slides for this lesson
      const slidesRef = collection(db, 'slides');
      const slidesQuery = query(slidesRef, where('lessonId', '==', lesson.id));
      const slidesSnapshot = await getDocs(slidesQuery);
      
      const slides = [];
      slidesSnapshot.forEach(doc => {
        slides.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      console.log(`  📄 Found ${slides.length} slides`);
      
      // Sort slides by their ID number (extract number from slide ID)
      slides.sort((a, b) => {
        const aNum = parseInt(a.id?.match(/\d+/)?.[0] || '0');
        const bNum = parseInt(b.id?.match(/\d+/)?.[0] || '0');
        return aNum - bNum;
      });
      
      // Update each slide with proper order
      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        const order = i + 1; // Start from 1
        
        // Only update if order is missing or different
        if (slide.order !== order) {
          console.log(`    🔄 Updating slide ${slide.id} with order ${order}`);
          
          const slideRef = doc(db, 'slides', slide.id);
          await updateDoc(slideRef, {
            order: order,
            updatedAt: new Date()
          });
        } else {
          console.log(`    ✅ Slide ${slide.id} already has correct order ${order}`);
        }
      }
    }
    
    console.log('\n🎉 Slide order fix completed successfully!');
    
  } catch (error) {
    console.error('❌ Error fixing slide orders:', error);
    throw error;
  }
}

/**
 * Verify slide orders
 */
async function verifySlideOrders() {
  try {
    console.log('\n🔍 Verifying slide orders...');
    
    const lessonsRef = collection(db, 'lessons');
    const lessonsSnapshot = await getDocs(lessonsRef);
    
    let totalSlides = 0;
    let slidesWithOrder = 0;
    
    for (const lessonDoc of lessonsSnapshot.docs) {
      const lesson = { id: lessonDoc.id, ...lessonDoc.data() };
      
      const slidesRef = collection(db, 'slides');
      const slidesQuery = query(slidesRef, where('lessonId', '==', lesson.id));
      const slidesSnapshot = await getDocs(slidesQuery);
      
      const slides = [];
      slidesSnapshot.forEach(doc => {
        slides.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      totalSlides += slides.length;
      
      // Check if slides have order field
      const orderedSlides = slides.filter(slide => slide.order !== undefined);
      slidesWithOrder += orderedSlides.length;
      
      console.log(`📖 ${lesson.title}: ${slides.length} slides, ${orderedSlides.length} with order field`);
      
      // Show first few slides with their orders
      if (orderedSlides.length > 0) {
        orderedSlides.slice(0, 3).forEach(slide => {
          console.log(`    📄 ${slide.id}: order ${slide.order}`);
        });
      }
    }
    
    console.log(`\n📊 Summary:`);
    console.log(`   Total slides: ${totalSlides}`);
    console.log(`   Slides with order field: ${slidesWithOrder}`);
    console.log(`   Coverage: ${((slidesWithOrder / totalSlides) * 100).toFixed(1)}%`);
    
  } catch (error) {
    console.error('❌ Error verifying slide orders:', error);
    throw error;
  }
}

// Run the fix
async function main() {
  try {
    await fixSlideOrders();
    await verifySlideOrders();
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

main(); 