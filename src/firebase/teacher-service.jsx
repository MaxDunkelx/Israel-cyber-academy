/**
 * Teacher Service - Firebase operations for teacher functionality
 * 
 * This service handles all teacher-specific Firebase operations:
 * - Class management (CRUD operations)
 * - Student assignment to classes
 * - Teacher comments on lessons and slides
 * - Teacher lesson access management
 * - Teacher analytics and reporting
 * 
 * Collections:
 * - classes: Class information and metadata
 * - classStudents: Student-class relationships
 * - teacherComments: Comments added by teachers to lessons/slides
 * - teacherLessonAccess: Teacher access to lessons
 */

import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from './firebase-config';

/**
 * Student Management Operations
 */

/**
 * Get all available students (non-teacher users) from the database
 * @returns {Promise<Array>} Array of available student objects
 */
export const getAllAvailableStudents = async () => {
  try {
    const usersRef = collection(db, 'users');
    
    // Get all users first
    const querySnapshot = await getDocs(usersRef);
    const allUsers = [];
    
    querySnapshot.forEach((doc) => {
      allUsers.push({
        uid: doc.id,
        ...doc.data()
      });
    });
    
    // Filter out teachers and return all other users as available students
    const availableStudents = allUsers.filter(user => 
      user.role !== 'teacher' && user.role !== 'instructor' && user.role !== 'admin'
    );
    
    // Sort by display name
    availableStudents.sort((a, b) => {
      const nameA = (a.displayName || a.email || '').toLowerCase();
      const nameB = (b.displayName || b.email || '').toLowerCase();
      return nameA.localeCompare(nameB);
    });
    
    console.log('✅ Available students fetched successfully:', availableStudents.length);
    console.log('📊 Total users:', allUsers.length, 'Teachers:', allUsers.filter(u => u.role === 'teacher').length, 'Available students:', availableStudents.length);
    
    return availableStudents;
  } catch (error) {
    console.error('❌ Error fetching available students:', error);
    throw error;
  }
};

/**
 * Get all students from the database (legacy function - now uses getAllAvailableStudents)
 * @returns {Promise<Array>} Array of student objects
 */
export const getStudents = async () => {
  return getAllAvailableStudents();
};

/**
 * Class Management Operations
 */

/**
 * Create a new class
 * @param {Object} classData - Class information
 * @param {string} classData.name - Class name
 * @param {string} classData.description - Class description
 * @param {number} classData.maxStudents - Maximum number of students
 * @param {string} classData.schedule - Class schedule
 * @param {string} teacherId - Teacher's user ID
 * @returns {Promise<string>} Class ID
 */
export const createClass = async (classData, teacherId) => {
  try {
    const classDoc = {
      ...classData,
      teacherId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      studentCount: 0,
      isActive: true
    };

    const docRef = await addDoc(collection(db, 'classes'), classDoc);
    console.log('✅ Class created successfully:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error creating class:', error);
    throw error;
  }
};

/**
 * Get all classes for a teacher
 * @param {string} teacherId - Teacher's user ID
 * @returns {Promise<Array>} Array of classes
 */
export const getTeacherClasses = async (teacherId) => {
  try {
    const q = query(
      collection(db, 'classes'),
      where('teacherId', '==', teacherId),
      where('isActive', '==', true)
    );
    
    const querySnapshot = await getDocs(q);
    const classes = [];
    
    querySnapshot.forEach((doc) => {
      classes.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // Sort in JavaScript instead of Firestore
    classes.sort((a, b) => {
      const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt) || new Date(0);
      const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt) || new Date(0);
      return dateB - dateA; // Descending order
    });
    
    return classes;
  } catch (error) {
    console.error('❌ Error fetching teacher classes:', error);
    throw error;
  }
};

/**
 * Get a specific class by ID
 * @param {string} classId - Class ID
 * @returns {Promise<Object>} Class data
 */
export const getClassById = async (classId) => {
  try {
    const docRef = doc(db, 'classes', classId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error('Class not found');
    }
  } catch (error) {
    console.error('❌ Error fetching class:', error);
    throw error;
  }
};

/**
 * Update a class
 * @param {string} classId - Class ID
 * @param {Object} updates - Updated class data
 * @returns {Promise<void>}
 */
export const updateClass = async (classId, updates) => {
  try {
    const docRef = doc(db, 'classes', classId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    console.log('✅ Class updated successfully');
  } catch (error) {
    console.error('❌ Error updating class:', error);
    throw error;
  }
};

/**
 * Delete a class (soft delete)
 * @param {string} classId - Class ID
 * @returns {Promise<void>}
 */
export const deleteClass = async (classId) => {
  try {
    const docRef = doc(db, 'classes', classId);
    await updateDoc(docRef, {
      isActive: false,
      updatedAt: serverTimestamp()
    });
    console.log('✅ Class deleted successfully');
  } catch (error) {
    console.error('❌ Error deleting class:', error);
    throw error;
  }
};

/**
 * Student Assignment Operations
 */

/**
 * Assign a student to a class
 * @param {string} studentId - Student's user ID
 * @param {string} classId - Class ID
 * @param {string} teacherId - Teacher's user ID
 * @returns {Promise<void>}
 */
export const assignStudentToClass = async (studentId, classId, teacherId) => {
  try {
    // Get current class data
    const classRef = doc(db, 'classes', classId);
    const classDoc = await getDoc(classRef);
    
    if (!classDoc.exists()) {
      throw new Error('Class not found');
    }
    
    const classData = classDoc.data();
    const currentStudents = classData.students || [];
    
    // Check if student is already assigned
    if (currentStudents.includes(studentId)) {
      console.log('⚠️ Student already assigned to this class');
      return;
    }
    
    // Add student to class
    await updateDoc(classRef, {
      students: [...currentStudents, studentId],
      updatedAt: serverTimestamp()
    });
    
    console.log('✅ Student assigned to class successfully');
  } catch (error) {
    console.error('❌ Error assigning student to class:', error);
    throw error;
  }
};

/**
 * Remove a student from a class
 * @param {string} studentId - Student's user ID
 * @param {string} classId - Class ID
 * @returns {Promise<void>}
 */
export const removeStudentFromClass = async (studentId, classId) => {
  try {
    // Get current class data
    const classRef = doc(db, 'classes', classId);
    const classDoc = await getDoc(classRef);
    
    if (!classDoc.exists()) {
      throw new Error('Class not found');
    }
    
    const classData = classDoc.data();
    const currentStudents = classData.students || [];
    
    // Remove student from class
    const updatedStudents = currentStudents.filter(id => id !== studentId);
    
    await updateDoc(classRef, {
      students: updatedStudents,
      updatedAt: serverTimestamp()
    });
    
    console.log('✅ Student removed from class successfully');
  } catch (error) {
    console.error('❌ Error removing student from class:', error);
    throw error;
  }
};

/**
 * Get all students in a specific class
 * @param {string} classId - Class ID
 * @returns {Promise<Array>} Array of student objects
 */
export const getClassStudents = async (classId) => {
  try {
    const q = query(
      collection(db, 'classStudents'),
      where('classId', '==', classId),
      where('isActive', '==', true)
    );
    
    const querySnapshot = await getDocs(q);
    const studentIds = querySnapshot.docs.map(doc => doc.data().studentId);
    
    // Fetch student details
    const students = [];
    for (const studentId of studentIds) {
      const studentRef = doc(db, 'users', studentId);
      const studentDoc = await getDoc(studentRef);
      if (studentDoc.exists()) {
        students.push({
          uid: studentDoc.id,
          ...studentDoc.data()
        });
      }
    }
    
    return students;
  } catch (error) {
    console.error('❌ Error fetching class students:', error);
    throw error;
  }
};

/**
 * Get all students assigned to a teacher
 * @param {string} teacherId - Teacher's user ID
 * @returns {Promise<Array>} Array of student objects
 */
export const getTeacherStudents = async (teacherId) => {
  try {
    const q = query(
      collection(db, 'classStudents'),
      where('teacherId', '==', teacherId),
      where('isActive', '==', true)
    );
    
    const querySnapshot = await getDocs(q);
    const studentIds = [...new Set(querySnapshot.docs.map(doc => doc.data().studentId))];
    
    // Fetch student details
    const students = [];
    for (const studentId of studentIds) {
      const studentRef = doc(db, 'users', studentId);
      const studentDoc = await getDoc(studentRef);
      if (studentDoc.exists()) {
        students.push({
          uid: studentDoc.id,
          ...studentDoc.data()
        });
      }
    }
    
    return students;
  } catch (error) {
    console.error('❌ Error fetching teacher students:', error);
    throw error;
  }
};

/**
 * Teacher Comments Operations
 */

/**
 * Add a teacher comment to a lesson or slide
 * @param {Object} commentData - Comment information
 * @param {string} commentData.lessonId - Lesson ID
 * @param {string} commentData.slideId - Slide ID (optional)
 * @param {string} commentData.content - Comment content
 * @param {string} commentData.type - Comment type ('general', 'hint', 'warning')
 * @param {string} teacherId - Teacher's user ID
 * @returns {Promise<string>} Comment ID
 */
export const addTeacherComment = async (commentData, teacherId) => {
  try {
    const commentDoc = {
      ...commentData,
      teacherId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isActive: true
    };

    const docRef = await addDoc(collection(db, 'teacherComments'), commentDoc);
    console.log('✅ Teacher comment added successfully:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error adding teacher comment:', error);
    throw error;
  }
};

/**
 * Get comments for a lesson
 * @param {string} lessonId - Lesson ID
 * @param {string} teacherId - Teacher ID (optional, for filtering)
 * @returns {Promise<Array>} Array of comments
 */
export const getLessonComments = async (lessonId, teacherId = null) => {
  try {
    let q = query(
      collection(db, 'teacherComments'),
      where('lessonId', '==', lessonId),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    if (teacherId) {
      q = query(
        collection(db, 'teacherComments'),
        where('lessonId', '==', lessonId),
        where('teacherId', '==', teacherId),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      );
    }
    
    const querySnapshot = await getDocs(q);
    const comments = [];
    
    querySnapshot.forEach((doc) => {
      comments.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return comments;
  } catch (error) {
    console.error('❌ Error fetching lesson comments:', error);
    throw error;
  }
};

/**
 * Update a teacher comment
 * @param {string} commentId - Comment ID
 * @param {Object} updates - Updated comment data
 * @returns {Promise<void>}
 */
export const updateTeacherComment = async (commentId, updates) => {
  try {
    const docRef = doc(db, 'teacherComments', commentId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    console.log('✅ Teacher comment updated successfully');
  } catch (error) {
    console.error('❌ Error updating teacher comment:', error);
    throw error;
  }
};

/**
 * Delete a teacher comment (soft delete)
 * @param {string} commentId - Comment ID
 * @returns {Promise<void>}
 */
export const deleteTeacherComment = async (commentId) => {
  try {
    const docRef = doc(db, 'teacherComments', commentId);
    await updateDoc(docRef, {
      isActive: false,
      updatedAt: serverTimestamp()
    });
    console.log('✅ Teacher comment deleted successfully');
  } catch (error) {
    console.error('❌ Error deleting teacher comment:', error);
    throw error;
  }
};

/**
 * Teacher Lesson Access Operations
 */

/**
 * Grant a teacher access to all lessons
 * @param {string} teacherId - Teacher's user ID
 * @returns {Promise<void>}
 */
export const grantTeacherLessonAccess = async (teacherId) => {
  try {
    const accessDoc = {
      teacherId,
      accessLevel: 'full',
      grantedAt: serverTimestamp(),
      isActive: true
    };

    await setDoc(doc(db, 'teacherLessonAccess', teacherId), accessDoc);
    console.log('✅ Teacher lesson access granted successfully');
  } catch (error) {
    console.error('❌ Error granting teacher lesson access:', error);
    throw error;
  }
};

/**
 * Check if a teacher has access to a specific lesson
 * @param {string} teacherId - Teacher's user ID
 * @param {string} lessonId - Lesson ID
 * @returns {Promise<boolean>} Whether teacher has access
 */
export const checkTeacherLessonAccess = async (teacherId, lessonId) => {
  try {
    const docRef = doc(db, 'teacherLessonAccess', teacherId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.isActive && data.accessLevel === 'full';
    }
    
    return false;
  } catch (error) {
    console.error('❌ Error checking teacher lesson access:', error);
    return false;
  }
};

/**
 * Get all lessons accessible to a teacher
 * @param {string} teacherId - Teacher's user ID
 * @returns {Promise<Array>} Array of lesson IDs
 */
export const getTeacherAccessibleLessons = async (teacherId) => {
  try {
    const hasAccess = await checkTeacherLessonAccess(teacherId);
    
    if (hasAccess) {
      // Return all lesson IDs (1-9 based on current lessons)
      return Array.from({ length: 9 }, (_, i) => (i + 1).toString());
    }
    
    return [];
  } catch (error) {
    console.error('❌ Error fetching teacher accessible lessons:', error);
    return [];
  }
};

/**
 * Analytics Operations
 */

/**
 * Get analytics for a specific class
 * @param {string} classId - Class ID
 * @returns {Promise<Object>} Class analytics data
 */
export const getClassAnalytics = async (classId) => {
  try {
    const students = await getClassStudents(classId);
    
    const analytics = {
      totalStudents: students.length,
      activeStudents: 0,
      averageProgress: 0,
      lessonCompletion: {},
      averageTimeSpent: 0,
      topPerformers: [],
      strugglingStudents: []
    };
    
    let totalProgress = 0;
    let totalTimeSpent = 0;
    let activeCount = 0;
    
    students.forEach(student => {
      const progress = student.progress || {};
      const completedLessons = student.completedLessons || [];
      const timeSpent = student.totalTimeSpent || 0;
      
      // Count active students (those with recent activity)
      const lastActivity = student.lastActivityDate;
      if (lastActivity) {
        const daysSinceActivity = (new Date() - new Date(lastActivity.toDate())) / (1000 * 60 * 60 * 24);
        if (daysSinceActivity <= 7) {
          activeCount++;
        }
      }
      
      // Calculate progress
      const progressPercentage = (completedLessons.length / 9) * 100; // Assuming 9 lessons total
      totalProgress += progressPercentage;
      totalTimeSpent += timeSpent;
      
      // Track lesson completion
      completedLessons.forEach(lessonId => {
        analytics.lessonCompletion[lessonId] = (analytics.lessonCompletion[lessonId] || 0) + 1;
      });
    });
    
    if (students.length > 0) {
      analytics.activeStudents = activeCount;
      analytics.averageProgress = totalProgress / students.length;
      analytics.averageTimeSpent = totalTimeSpent / students.length;
      
      // Get top performers and struggling students
      const sortedStudents = students.sort((a, b) => {
        const aProgress = (a.completedLessons || []).length;
        const bProgress = (b.completedLessons || []).length;
        return bProgress - aProgress;
      });
      
      analytics.topPerformers = sortedStudents.slice(0, 3);
      analytics.strugglingStudents = sortedStudents.slice(-3).reverse();
    }
    
    return analytics;
  } catch (error) {
    console.error('❌ Error fetching class analytics:', error);
    throw error;
  }
};

/**
 * Get analytics for a teacher across all their classes
 * @param {string} teacherId - Teacher's user ID
 * @returns {Promise<Object>} Teacher analytics data
 */
export const getTeacherAnalytics = async (teacherId) => {
  try {
    const classes = await getTeacherClasses(teacherId);
    const students = await getTeacherStudents(teacherId);
    
    const analytics = {
      totalClasses: classes.length,
      totalStudents: students.length,
      activeClasses: 0,
      averageClassSize: 0,
      overallStudentProgress: 0,
      lessonEngagement: {},
      timeSpentDistribution: {
        low: 0,    // 0-30 minutes
        medium: 0, // 30-120 minutes
        high: 0    // 120+ minutes
      }
    };
    
    let totalProgress = 0;
    let activeClassCount = 0;
    
    // Analyze each class
    for (const classData of classes) {
      const classAnalytics = await getClassAnalytics(classData.id);
      
      if (classAnalytics.activeStudents > 0) {
        activeClassCount++;
      }
      
      totalProgress += classAnalytics.averageProgress;
      
      // Aggregate lesson engagement
      Object.entries(classAnalytics.lessonCompletion).forEach(([lessonId, count]) => {
        analytics.lessonEngagement[lessonId] = (analytics.lessonEngagement[lessonId] || 0) + count;
      });
    }
    
    // Analyze student time spent distribution
    students.forEach(student => {
      const timeSpent = student.totalTimeSpent || 0;
      if (timeSpent <= 30) {
        analytics.timeSpentDistribution.low++;
      } else if (timeSpent <= 120) {
        analytics.timeSpentDistribution.medium++;
      } else {
        analytics.timeSpentDistribution.high++;
      }
    });
    
    if (classes.length > 0) {
      analytics.activeClasses = activeClassCount;
      analytics.averageClassSize = students.length / classes.length;
      analytics.overallStudentProgress = totalProgress / classes.length;
    }
    
    return analytics;
  } catch (error) {
    console.error('❌ Error fetching teacher analytics:', error);
    throw error;
  }
}; 