/**
 * Login Analytics Service
 * 
 * Provides analytics data specifically for the login page
 * from the 'login-analytics' collection
 */

import { 
  collection, 
  doc, 
  getDocs, 
  getDoc
} from 'firebase/firestore';
import { db } from './firebase-config.js';

/**
 * Get login analytics from the specific document in login-analytics collection
 * Uses the exact document ID and field names from your Firebase setup
 */
export const getLoginAnalytics = async () => {
  try {
    console.log('📊 Loading login analytics from cyber-campus database: login-analytics/login-analytics');
    
    // Get the specific analytics document using the correct document ID
    const docRef = doc(db, 'login-analytics', 'login-analytics');
    const docSnap = await getDoc(docRef);
    console.log('📊 Document exists?', docSnap.exists());
    
    if (!docSnap.exists()) {
      console.warn('⚠️ Document login-analytics not found in login-analytics collection');
      
      // Check what documents exist in the collection
      try {
        console.log('🔍 Checking all documents in login-analytics collection...');
        const allDocsSnapshot = await getDocs(collection(db, 'login-analytics'));
        console.log(`🔍 Found ${allDocsSnapshot.docs.length} documents:`);
        
        allDocsSnapshot.docs.forEach((doc, index) => {
          console.log(`  - Document ${index + 1}: ${doc.id}`);
        });
      } catch (collectionError) {
        console.error('❌ Error checking collection:', collectionError);
      }
      
      return {
        totalStudents: 0,
        totalTeachers: 0,
        totalLessons: 0
      };
    }
    
    const analyticsData = docSnap.data();
    console.log('📊 Raw document data:', analyticsData);
    
    // Map your exact field names to the expected format
    const result = {
      totalStudents: analyticsData.students || 0,
      totalTeachers: analyticsData.teachers || 0,
      totalLessons: analyticsData.modules || 0
    };
    
    console.log('✅ Mapped analytics:', result);
    return result;
    
  } catch (error) {
    console.error('❌ Error loading login analytics:', error.message);
    
    // Return default values on error
    return {
      totalStudents: 0,
      totalTeachers: 0,
      totalLessons: 0
    };
  }
};

/**
 * Get analytics from a specific document in login-analytics collection
 * @param {string} documentId - The ID of the document to read
 */
export const getLoginAnalyticsFromDocument = async (documentId = 'login-analytics') => {
  try {
    console.log(`📊 Loading login analytics from document: ${documentId}`);
    
    const docRef = doc(db, 'login-analytics', documentId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      console.warn(`⚠️ Document ${documentId} not found in login-analytics collection`);
      return {
        totalStudents: 0,
        totalTeachers: 0,
        totalLessons: 0
      };
    }
    
    const analyticsData = docSnap.data();
    console.log('📊 Document analytics loaded:', analyticsData);
    
    return {
      totalStudents: analyticsData.totalStudents || analyticsData.students || analyticsData.activeStudents || 0,
      totalTeachers: analyticsData.totalTeachers || analyticsData.teachers || analyticsData.professionalInstructors || 0,
      totalLessons: analyticsData.totalLessons || analyticsData.lessons || analyticsData.advancedModules || 0
    };
    
  } catch (error) {
    console.error('❌ Error loading login analytics from document:', error);
    
    // Return default values on error
    return {
      totalStudents: 0,
      totalTeachers: 0,
      totalLessons: 0
    };
  }
}; 