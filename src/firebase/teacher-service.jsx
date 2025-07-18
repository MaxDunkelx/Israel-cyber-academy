/**
 * Teacher Service - Israel Cyber Campus
 * 
 * Comprehensive service for teacher-specific operations including:
 * - Class management
 * - Student assignment
 * - Teacher notes and comments
 * - Analytics and reporting
 * - Activity logging
 * 
 * Features:
 * - Real-time Firestore operations
 * - Role-based access control
 * - Error handling and validation
 * - Security event logging
 * - Data consistency checks
 * 
 * @module teacher-service
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
  writeBatch,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { db } from './firebase-config';
import { logSecurityEvent } from '../utils/security';

/**
 * Student Management Operations
 */

/**
 * Get all available students (excluding teachers and admins)
 * Fetches student profiles with role validation
 * 
 * @returns {Promise<Array>} Array of student objects
 * @throws {Error} If database operation fails
 */
export const getAllAvailableStudents = async () => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef,
      where('role', 'in', ['student'])
    );
    
    const querySnapshot = await getDocs(q);
    const students = [];
    
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      students.push({
        uid: doc.id,
        displayName: userData.displayName || userData.email,
        email: userData.email,
        role: userData.role,
        createdAt: userData.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        lastLoginAt: userData.lastLoginAt?.toDate?.()?.toISOString() || null,
        completedLessons: userData.completedLessons || [],
        totalTimeSpent: userData.totalTimeSpent || 0,
        profileComplete: userData.profileComplete || false
      });
    });
    
    // Sort in JavaScript instead of Firestore to avoid composite index requirement
    students.sort((a, b) => {
      const nameA = (a.displayName || '').toLowerCase();
      const nameB = (b.displayName || '').toLowerCase();
      return nameA.localeCompare(nameB);
    });
    
    logSecurityEvent('AVAILABLE_STUDENTS_FETCHED', {
      count: students.length,
      timestamp: new Date().toISOString()
    });
    
    return students;
  } catch (error) {
    logSecurityEvent('AVAILABLE_STUDENTS_FETCH_ERROR', {
      error: error.message,
      timestamp: new Date().toISOString()
    });
    throw new Error('Failed to fetch available students');
  }
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
    const classesRef = collection(db, 'classes');
    const newClassRef = doc(classesRef);
    
    const classDoc = {
      id: newClassRef.id,
      name: classData.name,
      description: classData.description,
      teacherId: teacherId,
      studentIds: [],
      maxStudents: classData.maxStudents || 30,
      isActive: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    // Add initial lesson assignment if provided
    if (classData.initialLesson) {
      const currentDate = new Date().toISOString();
      classDoc.currentLesson = parseInt(classData.initialLesson);
      classDoc.lessonStartDate = currentDate;
      classDoc.unlockedLessons = [{
        lessonId: parseInt(classData.initialLesson),
        unlockedAt: currentDate,
        unlockedBy: teacherId,
        unlockedByTeacher: 'System (Class Creation)'
      }];
    }
    
    await setDoc(newClassRef, classDoc);
    
    // Update teacher's class list
    const teacherRef = doc(db, 'users', teacherId);
    const teacherDoc = await getDoc(teacherRef);
    
    if (teacherDoc.exists()) {
      const teacherData = teacherDoc.data();
      const updatedClasses = [...(teacherData.teacherClasses || []), newClassRef.id];
      
      await updateDoc(teacherRef, {
        teacherClasses: updatedClasses,
        updatedAt: serverTimestamp()
      });
    }
    
    // Log activity
    await logTeacherActivity(teacherId, {
      type: 'class_created',
      title: 'כיתה חדשה נוצרה',
      description: `הכיתה "${classData.name}" נוצרה בהצלחה`,
      metadata: {
        classId: newClassRef.id,
        className: classData.name,
        maxStudents: classData.maxStudents || 30
      }
    });
    
    return classDoc;
  } catch (error) {
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
    const classesRef = collection(db, 'classes');
    const q = query(
      classesRef, 
      where('teacherId', '==', teacherId)
    );
    
    const querySnapshot = await getDocs(q);
    const classes = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      classes.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate()
      });
    });
    
    // Sort in JavaScript instead of Firestore (newest first)
    classes.sort((a, b) => {
      const dateA = a.createdAt || new Date(0);
      const dateB = b.createdAt || new Date(0);
      return dateB - dateA; // Descending order (newest first)
    });
    
    return classes;
  } catch (error) {
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
    throw error;
  }
};

/**
 * Update a class
 * @param {string} classId - Class ID
 * @param {Object} updates - Updated class data
 * @returns {Promise<void>}
 */
export const updateClass = async (classId, updates, teacherId) => {
  try {
    const classRef = doc(db, 'classes', classId);
    const classDoc = await getDoc(classRef);
    
    if (!classDoc.exists()) {
      throw new Error('Class not found');
    }
    
    const originalData = classDoc.data();
    
    // Update the class
    await updateDoc(classRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    
    // Log activity
    const changes = [];
    if (updates.name && updates.name !== originalData.name) {
      changes.push(`שם הכיתה: "${originalData.name}" → "${updates.name}"`);
    }
    if (updates.description && updates.description !== originalData.description) {
      changes.push('תיאור הכיתה עודכן');
    }
    if (updates.maxStudents && updates.maxStudents !== originalData.maxStudents) {
      changes.push(`מספר מקסימלי של תלמידים: ${originalData.maxStudents} → ${updates.maxStudents}`);
    }
    
    if (changes.length > 0) {
      await logTeacherActivity(teacherId, {
        type: 'class_edited',
        title: 'כיתה עודכנה',
        description: `הכיתה "${updates.name || originalData.name}" עודכנה: ${changes.join(', ')}`,
        metadata: {
          classId: classId,
          className: updates.name || originalData.name,
          changes: changes,
          originalData: originalData,
          updatedData: updates
        }
      });
    }
    
    return true;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a class (soft delete)
 * @param {string} classId - Class ID
 * @returns {Promise<void>}
 */
export const deleteClass = async (classId, teacherId) => {
  try {
    const batch = writeBatch(db);
    
    // Get class data
    const classRef = doc(db, 'classes', classId);
    const classDoc = await getDoc(classRef);
    
    if (!classDoc.exists()) {
      throw new Error('Class not found');
    }
    
    const classData = classDoc.data();
    
    // Unassign all students from this class
    if (classData.studentIds && classData.studentIds.length > 0) {
      for (const studentId of classData.studentIds) {
        const studentRef = doc(db, 'users', studentId);
        batch.update(studentRef, {
          classId: null,
          teacherId: null,
          updatedAt: serverTimestamp()
        });
      }
    }
    
    // Remove class from teacher's class list
    const teacherRef = doc(db, 'users', teacherId);
    const teacherDoc = await getDoc(teacherRef);
    
    if (teacherDoc.exists()) {
      const teacherData = teacherDoc.data();
      const updatedClasses = (teacherData.teacherClasses || []).filter(id => id !== classId);
      
      batch.update(teacherRef, {
        teacherClasses: updatedClasses,
        updatedAt: serverTimestamp()
      });
    }
    
    // Delete the class
    batch.delete(classRef);
    
    await batch.commit();
    
    // Log activity
    await logTeacherActivity(teacherId, {
      type: 'class_deleted',
      title: 'כיתה נמחקה',
      description: `הכיתה "${classData.name}" נמחקה. ${classData.studentIds?.length || 0} תלמידים הוסרו מהכיתה.`,
      metadata: {
        classId: classId,
        className: classData.name,
        studentsRemoved: classData.studentIds?.length || 0
      }
    });
    
    return true;
  } catch (error) {
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
      return;
    }
    
    // Add student to class
    await updateDoc(classRef, {
      students: [...currentStudents, studentId],
      updatedAt: serverTimestamp()
    });
    
    } catch (error) {
    logSecurityEvent('STUDENT_ASSIGNMENT_ERROR', {
      studentId,
      classId,
      teacherId,
      error: error.message,
      timestamp: new Date().toISOString()
    });
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
    
    } catch (error) {
    logSecurityEvent('STUDENT_REMOVAL_ERROR', {
      studentId,
      classId,
      error: error.message,
      timestamp: new Date().toISOString()
    });
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
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef, 
      where('classId', '==', classId)
    );
    
    const querySnapshot = await getDocs(q);
    const students = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      students.push({
        uid: doc.id,
        displayName: data.displayName || data.email,
        email: data.email,
        role: data.role,
        classId: data.classId,
        progress: data.progress || 0,
        completedLessons: data.completedLessons || [],
        totalTimeSpent: data.totalTimeSpent || 0,
        lastActivityAt: data.lastActivityAt?.toDate?.()?.toISOString() || null,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
      });
    });
    
    // Sort in JavaScript instead of Firestore to avoid composite index requirement
    students.sort((a, b) => {
      const nameA = (a.displayName || '').toLowerCase();
      const nameB = (b.displayName || '').toLowerCase();
      return nameA.localeCompare(nameB);
    });
    
    return students;
  } catch (error) {
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
    // Get all classes for this teacher
    const classes = await getTeacherClasses(teacherId);
    
    // Collect all unique student IDs from all classes
    const allStudentIds = new Set();
    classes.forEach(classData => {
      if (classData.studentIds && Array.isArray(classData.studentIds)) {
        classData.studentIds.forEach(studentId => allStudentIds.add(studentId));
      }
    });
    
    // Fetch student details for all unique students
    const students = [];
    for (const studentId of allStudentIds) {
      const studentRef = doc(db, 'users', studentId);
      const studentDoc = await getDoc(studentRef);
      if (studentDoc.exists()) {
        const studentData = studentDoc.data();
        students.push({
          uid: studentDoc.id,
          displayName: studentData.displayName || studentData.email,
          email: studentData.email,
          role: studentData.role,
          classId: studentData.classId,
          teacherId: studentData.teacherId,
          progress: studentData.progress || 0,
          completedLessons: studentData.completedLessons || [],
          totalTimeSpent: studentData.totalTimeSpent || 0,
          lastActivityAt: studentData.lastActivityAt?.toDate?.()?.toISOString() || null,
          createdAt: studentData.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
        });
      }
    }
    
    // Sort students by name
    students.sort((a, b) => {
      const nameA = (a.displayName || '').toLowerCase();
      const nameB = (b.displayName || '').toLowerCase();
      return nameA.localeCompare(nameB);
    });
    
    return students;
  } catch (error) {
    console.error('Error in getTeacherStudents:', error);
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
    return docRef.id;
  } catch (error) {
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
      where('isActive', '==', true)
    );
    
    if (teacherId) {
      q = query(
        collection(db, 'teacherComments'),
        where('lessonId', '==', lessonId),
        where('teacherId', '==', teacherId),
        where('isActive', '==', true)
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
    
    // Sort in JavaScript instead of Firestore to avoid composite index requirement
    comments.sort((a, b) => {
      const dateA = a.createdAt?.toDate?.() || new Date(0);
      const dateB = b.createdAt?.toDate?.() || new Date(0);
      return dateB - dateA; // Descending order (newest first)
    });
    
    return comments;
  } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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
    // This function can be expanded to grant specific lesson access
    return true;
  } catch (error) {
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
      // Get all available lessons to determine the count
      const allLessons = await getAllLessons();
      const lessonCount = allLessons.length;
      
      // Return all lesson IDs (1-16 based on current lessons)
      return Array.from({ length: lessonCount }, (_, i) => (i + 1).toString());
    }
    
    return [];
  } catch (error) {
    console.warn('Error getting teacher accessible lessons, falling back to local lessons:', error.message);
    
    // Fallback to local lessons
    try {
      const { lessons } = await import('../data/lessons/index.js');
      return Array.from({ length: lessons.length }, (_, i) => (i + 1).toString());
    } catch (fallbackError) {
      console.error('Both database and local fallback failed:', fallbackError);
    return [];
    }
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
      
      // Count active students (those with recent activity) - FIXED
      const lastActivity = student.lastActivityAt || student.lastActivityDate;
      if (lastActivity) {
        let lastActivityDate;
        if (typeof lastActivity === 'object' && lastActivity.toDate) {
          // Firestore timestamp
          lastActivityDate = lastActivity.toDate();
        } else if (typeof lastActivity === 'string') {
          // ISO string
          lastActivityDate = new Date(lastActivity);
        } else if (lastActivity instanceof Date) {
          // Date object
          lastActivityDate = lastActivity;
        } else {
          // Invalid date, skip
          return;
        }
        
        const daysSinceActivity = (new Date() - lastActivityDate) / (1000 * 60 * 60 * 24);
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
    throw error;
  }
};

/**
 * Get teacher profile data
 * Fetches teacher information from users collection
 * 
 * @param {string} teacherId - Teacher's user ID
 * @returns {Promise<Object>} Teacher profile object
 * @throws {Error} If operation fails
 */
export const getTeacherProfile = async (teacherId) => {
  try {
    if (!teacherId) {
      throw new Error('Teacher ID is required');
    }
    
    const teacherRef = doc(db, 'users', teacherId);
    const teacherDoc = await getDoc(teacherRef);
    
    if (!teacherDoc.exists()) {
      throw new Error('Teacher not found');
    }
    
    const teacherData = teacherDoc.data();
    
    if (teacherData.role !== 'teacher') {
      throw new Error('User is not a teacher');
    }
    
    logSecurityEvent('TEACHER_PROFILE_FETCHED', {
      teacherId,
      timestamp: new Date().toISOString()
    });
    
    return {
      uid: teacherDoc.id,
      ...teacherData
    };
    
  } catch (error) {
    logSecurityEvent('TEACHER_PROFILE_FETCH_ERROR', {
      teacherId,
      error: error.message,
      timestamp: new Date().toISOString()
    });
    throw error;
  }
};

/**
 * Update teacher profile data
 * Updates teacher information in users collection
 * 
 * @param {string} teacherId - Teacher's user ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<void>}
 * @throws {Error} If operation fails
 */
export const updateTeacherProfile = async (teacherId, updateData) => {
  try {
    if (!teacherId) {
      throw new Error('Teacher ID is required');
    }
    
    const teacherRef = doc(db, 'users', teacherId);
    const teacherDoc = await getDoc(teacherRef);
    
    if (!teacherDoc.exists()) {
      throw new Error('Teacher not found');
    }
    
    const teacherData = teacherDoc.data();
    if (teacherData.role !== 'teacher') {
      throw new Error('User is not a teacher');
    }
    
    // Remove sensitive fields that shouldn't be updated
    const { uid, role, email, createdAt, ...safeUpdateData } = updateData;
    
    await updateDoc(teacherRef, {
      ...safeUpdateData,
      updatedAt: serverTimestamp()
    });
    
    logSecurityEvent('TEACHER_PROFILE_UPDATED', {
      teacherId,
      updatedFields: Object.keys(safeUpdateData),
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    logSecurityEvent('TEACHER_PROFILE_UPDATE_ERROR', {
      teacherId,
      error: error.message,
      timestamp: new Date().toISOString()
    });
    throw error;
  }
};

/**
 * Get all students from the database
 */
export const getAllStudents = async () => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef, 
      where('role', '==', 'student')
    );
    
    const querySnapshot = await getDocs(q);
    const students = [];
    
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      students.push({
        id: doc.id,
        uid: doc.id,
        displayName: userData.displayName || userData.email,
        email: userData.email,
        role: userData.role,
        classId: userData.classId || null,
        teacherId: userData.teacherId || null,
        assignedToClass: !!userData.classId,
        assignedToTeacher: !!userData.teacherId,
        createdAt: userData.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        lastLoginAt: userData.lastLoginAt?.toDate?.()?.toISOString() || null,
        completedLessons: userData.completedLessons || [],
        totalTimeSpent: userData.totalTimeSpent || 0,
        profileComplete: userData.profileComplete || false
      });
    });
    
    // Sort in JavaScript instead of Firestore to avoid composite index requirement
    students.sort((a, b) => {
      const nameA = (a.displayName || '').toLowerCase();
      const nameB = (b.displayName || '').toLowerCase();
      return nameA.localeCompare(nameB);
    });
    
    return students;
  } catch (error) {
    throw new Error('Failed to fetch students');
  }
};

/**
 * Get all classes from the database
 */
export const getAllClasses = async () => {
  try {
    const classesRef = collection(db, 'classes');
    const querySnapshot = await getDocs(classesRef);
    const classes = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      classes.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate()
      });
    });
    
    // Sort in JavaScript instead of Firestore (newest first)
    classes.sort((a, b) => {
      const dateA = a.createdAt || new Date(0);
      const dateB = b.createdAt || new Date(0);
      return dateB - dateA; // Descending order (newest first)
    });
    
    return classes;
  } catch (error) {
    throw error;
  }
};

/**
 * Assign students to a class
 */
export const assignStudentsToClass = async (classId, studentIds, teacherId) => {
  try {
    const batch = writeBatch(db);
    
    // Get class data
    const classRef = doc(db, 'classes', classId);
    const classDoc = await getDoc(classRef);
    
    if (!classDoc.exists()) {
      throw new Error('Class not found');
    }
    
    const classData = classDoc.data();
    
    // Update class with new student list
    batch.update(classRef, {
      studentIds: studentIds,
      updatedAt: serverTimestamp()
    });
    
    // Update all students
    for (const studentId of studentIds) {
      const studentRef = doc(db, 'users', studentId);
      batch.update(studentRef, {
        classId: classId,
        teacherId: teacherId,
        updatedAt: serverTimestamp()
      });
    }
    
    // Unassign students who are no longer in this class
    const currentStudentIds = classData.studentIds || [];
    const studentsToUnassign = currentStudentIds.filter(id => !studentIds.includes(id));
    
    for (const studentId of studentsToUnassign) {
      const studentRef = doc(db, 'users', studentId);
      batch.update(studentRef, {
        classId: null,
        teacherId: null,
        updatedAt: serverTimestamp()
      });
    }
    
    await batch.commit();
    
    // Log activity for student assignments
    if (studentIds.length > currentStudentIds.length) {
      const newlyAssigned = studentIds.filter(id => !currentStudentIds.includes(id));
      if (newlyAssigned.length > 0) {
        await logTeacherActivity(teacherId, {
          type: 'student_added',
          title: 'תלמידים נוספו לכיתה',
          description: `${newlyAssigned.length} תלמידים נוספו לכיתה "${classData.name}"`,
          metadata: {
            classId: classId,
            className: classData.name,
            studentsAdded: newlyAssigned.length,
            studentIds: newlyAssigned
          }
        });
      }
    }
    
    // Log activity for student removals
    if (studentsToUnassign.length > 0) {
      await logTeacherActivity(teacherId, {
        type: 'student_removed',
        title: 'תלמידים הוסרו מהכיתה',
        description: `${studentsToUnassign.length} תלמידים הוסרו מהכיתה "${classData.name}"`,
        metadata: {
          classId: classId,
          className: classData.name,
          studentsRemoved: studentsToUnassign.length,
          studentIds: studentsToUnassign
        }
      });
    }
    
    return true;
  } catch (error) {
    throw error;
  }
};

/**
 * Log teacher activity for dashboard display
 */
export const logTeacherActivity = async (teacherId, activityData) => {
  try {
    const activitiesRef = collection(db, 'teacherActivities');
    const activityDoc = {
      teacherId: teacherId,
      type: activityData.type, // 'class_created', 'class_deleted', 'student_added', 'student_removed', 'class_edited'
      title: activityData.title,
      description: activityData.description,
      metadata: activityData.metadata || {},
      timestamp: serverTimestamp(),
      read: false
    };
    
    await addDoc(activitiesRef, activityDoc);
  } catch (error) {
    // Don't throw error - activity logging shouldn't break main functionality
  }
};

/**
 * Get recent teacher activities for dashboard
 */
export const getTeacherRecentActivities = async (teacherId, limit = 10) => {
  try {
    const activitiesRef = collection(db, 'teacherActivities');
    const q = query(
      activitiesRef,
      where('teacherId', '==', teacherId)
    );
    
    const querySnapshot = await getDocs(q);
    const activities = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      activities.push({
        id: doc.id,
        ...data,
        timestamp: data.timestamp?.toDate() || new Date()
      });
    });
    
    // Sort in JavaScript and limit
    activities.sort((a, b) => b.timestamp - a.timestamp);
    return activities.slice(0, limit);
  } catch (error) {
    return [];
  }
};

/**
 * Get all lessons with their slides
 */
export const getAllLessons = async () => {
  try {
    const lessonsRef = collection(db, 'lessons');
    const querySnapshot = await getDocs(lessonsRef);
    const lessons = [];
    
    querySnapshot.forEach((doc) => {
      lessons.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return lessons;
  } catch (error) {
    console.warn('Database unavailable, falling back to local lessons:', error.message);
    
    // Fallback to local lessons when database is unavailable
    try {
      const { lessons } = await import('../data/lessons/index.js');
      
      const localLessons = lessons.map((lesson, index) => {
        const lessonData = {
          id: lesson.id || `lesson${String(index + 1).padStart(3, '0')}`,
          originalId: lesson.id || `lesson${String(index + 1).padStart(3, '0')}`,
          title: lesson.title,
          description: lesson.description,
          difficulty: lesson.difficulty || 'beginner',
          targetAge: lesson.targetAge || 'all',
          estimatedDuration: lesson.estimatedDuration || 30,
          slides: lesson.content?.slides || [],
          totalSlides: lesson.content?.slides?.length || 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          isActive: true,
          source: 'local_fallback'
        };
        return lessonData;
      });
      
      return localLessons;
    } catch (fallbackError) {
      console.error('Both database and local fallback failed:', fallbackError);
      throw new Error('Failed to load lessons. Please check your connection and try again.');
    }
  }
};

/**
 * Get teacher notes for a specific slide
 */
export const getTeacherNotes = async (teacherId, lessonId, slideId) => {
  try {
    // Normalize lessonId to string for consistent querying
    const normalizedLessonId = String(lessonId);
    
    const notesRef = collection(db, 'teacherNotes');
    const q = query(
      notesRef,
      where('teacherId', '==', teacherId),
      where('lessonId', '==', normalizedLessonId),
      where('slideId', '==', slideId)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const noteDoc = querySnapshot.docs[0];
    const noteData = {
      id: noteDoc.id,
      ...noteDoc.data()
    };
    
    return noteData;
  } catch (error) {
    throw error;
  }
};

/**
 * Save teacher notes for a slide
 */
export const saveTeacherNotes = async (teacherId, lessonId, slideId, notesData) => {
  try {
    const notesRef = collection(db, 'teacherNotes');
    
    // Check if notes already exist
    const existingNotes = await getTeacherNotes(teacherId, lessonId, slideId);
    
    if (existingNotes) {
      // Update existing notes
      const noteRef = doc(db, 'teacherNotes', existingNotes.id);
      await updateDoc(noteRef, {
        content: notesData.content,
        slideIndex: notesData.slideIndex, // Ensure slideIndex is updated
        updatedAt: serverTimestamp()
      });
      
      // Log activity
      await logTeacherActivity(teacherId, {
        type: 'notes_updated',
        title: 'הערות עודכנו',
        description: `הערות לשיעור ${lessonId}, שקופית ${slideId} עודכנו`,
        metadata: {
          lessonId: lessonId,
          slideId: slideId,
          contentLength: notesData.content.length
        }
      });
      
      return { id: existingNotes.id, ...notesData };
    } else {
      // Create new notes
      const noteDoc = {
        teacherId: teacherId,
        lessonId: lessonId,
        slideId: slideId,
        slideIndex: notesData.slideIndex, // Ensure slideIndex is included
        content: notesData.content,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(notesRef, noteDoc);
      
      // Log activity
      await logTeacherActivity(teacherId, {
        type: 'notes_created',
        title: 'הערות נוצרו',
        description: `הערות חדשות נוצרו לשיעור ${lessonId}, שקופית ${slideId}`,
        metadata: {
          lessonId: lessonId,
          slideId: slideId,
          contentLength: notesData.content.length
        }
      });
      
      return { id: docRef.id, ...noteDoc };
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Delete teacher notes for a slide
 */
export const deleteTeacherNotes = async (teacherId, lessonId, slideId) => {
  try {
    const existingNotes = await getTeacherNotes(teacherId, lessonId, slideId);
    
    if (!existingNotes) {
      throw new Error('Notes not found');
    }
    
    const noteRef = doc(db, 'teacherNotes', existingNotes.id);
    await deleteDoc(noteRef);
    
    // Log activity
    await logTeacherActivity(teacherId, {
      type: 'notes_deleted',
      title: 'הערות נמחקו',
      description: `הערות לשיעור ${lessonId}, שקופית ${slideId} נמחקו`,
      metadata: {
        lessonId: lessonId,
        slideId: slideId
      }
    });
    
    return true;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all teacher notes for a lesson
 */
export const getTeacherNotesForLesson = async (teacherId, lessonId) => {
  try {
    // Normalize lessonId to string for consistent querying
    const normalizedLessonId = String(lessonId);
    
    const notesRef = collection(db, 'teacherNotes');
    const q = query(
      notesRef,
      where('teacherId', '==', teacherId),
      where('lessonId', '==', normalizedLessonId)
    );
    
    const querySnapshot = await getDocs(q);
    const notes = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      notes.push({
        id: doc.id,
        teacherId: data.teacherId,
        lessonId: data.lessonId,
        slideId: data.slideId,
        slideIndex: data.slideIndex || 0, // Ensure slideIndex is included
        content: data.content,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      });
    });
    
    return notes;
  } catch (error) {
    throw error;
  }
};

/**
 * Clean up teacher notes when slides are deleted or modified
 * This function removes teacher notes for slides that no longer exist
 */
export const cleanupTeacherNotesForLesson = async (lessonId, currentSlideIds) => {
  try {
    const notesRef = collection(db, 'teacherNotes');
    const q = query(
      notesRef,
      where('lessonId', '==', String(lessonId))
    );
    
    const querySnapshot = await getDocs(q);
    const notesToDelete = [];
    
    querySnapshot.forEach((doc) => {
      const noteData = doc.data();
      // If the slideId no longer exists in the current slides, mark for deletion
      if (!currentSlideIds.includes(noteData.slideId)) {
        notesToDelete.push({
          id: doc.id,
          ...noteData
        });
      }
    });
    
    if (notesToDelete.length > 0) {
      for (const note of notesToDelete) {
        await deleteDoc(doc(db, 'teacherNotes', note.id));
      }
      
      } else {
      }
    
    return notesToDelete.length;
  } catch (error) {
    throw error;
  }
};

/**
 * Migrate teacher notes when slide IDs change
 * This function helps migrate notes when slides are reorganized
 */
export const migrateTeacherNotes = async (lessonId, slideIdMapping) => {
  try {
    const notesRef = collection(db, 'teacherNotes');
    const q = query(
      notesRef,
      where('lessonId', '==', String(lessonId))
    );
    
    const querySnapshot = await getDocs(q);
    let migratedCount = 0;
    
    for (const docSnapshot of querySnapshot.docs) {
      const noteData = docSnapshot.data();
      const newSlideId = slideIdMapping[noteData.slideId];
      
      if (newSlideId && newSlideId !== noteData.slideId) {
        // Update the note with the new slideId
        await updateDoc(doc(db, 'teacherNotes', docSnapshot.id), {
          slideId: newSlideId,
          updatedAt: serverTimestamp()
        });
        
        migratedCount++;
      }
    }
    
    return migratedCount;
  } catch (error) {
    throw error;
  }
}; 
