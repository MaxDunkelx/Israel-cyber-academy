/**
 * Check Lesson 2 Slides for Duplicates
 * 
 * This script checks for duplicate slide IDs in lesson2 that might be causing React key warnings.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC35sH38k9co_R0zBsbDT0S6RE1Cp-ksHE",
  authDomain: "israel-cyber-academy.firebaseapp.com",
  projectId: "israel-cyber-academy",
  storageBucket: "israel-cyber-academy.appspot.com",
  messagingSenderId: "750693821908",
  appId: "1:750693821908:web:6518d1facad1d8095cfa41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkLesson2Slides() {
  console.log('🔍 Checking lesson2 slides for duplicates...\n');

  try {
    const lessonId = 'lesson2';
    
    // Get all slides for lesson2
    const slidesQuery = query(
      collection(db, 'lessons', lessonId, 'slides'),
      orderBy('order', 'asc')
    );
    
    const snapshot = await getDocs(slidesQuery);
    console.log(`📄 Found ${snapshot.size} slides for lesson2\n`);
    
    const slides = [];
    const slideIds = new Set();
    const duplicateIds = new Set();
    
    snapshot.forEach((doc) => {
      const slide = doc.data();
      const slideId = doc.id;
      
      slides.push({
        id: slideId,
        title: slide.title,
        type: slide.type,
        order: slide.order
      });
      
      // Check for duplicate IDs
      if (slideIds.has(slideId)) {
        duplicateIds.add(slideId);
      } else {
        slideIds.add(slideId);
      }
    });
    
    // Display all slides
    console.log('📋 ALL SLIDES IN LESSON 2:');
    console.log('==========================');
    
    slides.forEach((slide, index) => {
      const duplicateMarker = duplicateIds.has(slide.id) ? ' 🔴 DUPLICATE' : '';
      console.log(`${index + 1}. ID: "${slide.id}" - ${slide.title} (order: ${slide.order})${duplicateMarker}`);
    });
    
    // Check for duplicates
    if (duplicateIds.size > 0) {
      console.log('\n❌ DUPLICATE SLIDE IDs FOUND:');
      console.log('=============================');
      duplicateIds.forEach(id => {
        const duplicates = slides.filter(slide => slide.id === id);
        console.log(`\n🔴 Duplicate ID: ${id}`);
        duplicates.forEach((slide, index) => {
          console.log(`   ${index + 1}. Title: ${slide.title}, Order: ${slide.order}`);
        });
      });
    } else {
      console.log('\n✅ No duplicate slide IDs found');
    }
    
    // Check for duplicate orders
    const orders = slides.map(slide => slide.order).filter(order => order !== undefined);
    const duplicateOrders = orders.filter((order, index) => orders.indexOf(order) !== index);
    
    if (duplicateOrders.length > 0) {
      console.log('\n⚠️ DUPLICATE ORDERS FOUND:');
      console.log('==========================');
      duplicateOrders.forEach(order => {
        const slidesWithOrder = slides.filter(slide => slide.order === order);
        console.log(`\nOrder ${order}:`);
        slidesWithOrder.forEach(slide => {
          console.log(`   - ${slide.id}: ${slide.title}`);
        });
      });
    } else {
      console.log('\n✅ No duplicate orders found');
    }
    
    // Summary
    console.log('\n📊 SUMMARY:');
    console.log('===========');
    console.log(`Total slides: ${slides.length}`);
    console.log(`Unique slide IDs: ${slideIds.size}`);
    console.log(`Duplicate slide IDs: ${duplicateIds.size}`);
    console.log(`Duplicate orders: ${duplicateOrders.length}`);
    
    if (duplicateIds.size > 0) {
      console.log('\n🚨 ACTION REQUIRED:');
      console.log('==================');
      console.log('Duplicate slide IDs found! This is causing React key warnings.');
      console.log('You need to clean up the database to remove duplicate slides.');
    } else {
      console.log('\n✅ No duplicate slide IDs found. The issue might be elsewhere.');
    }
    
  } catch (error) {
    console.error('❌ Error checking lesson2 slides:', error);
  }
}

// Run the check
checkLesson2Slides(); 