import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  query, 
  where, 
  onSnapshot,
  serverTimestamp,
  addDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { db } from './firebase-config';
import { logSecurityEvent } from '../utils/security';

/**
 * Session Management Service
 * Handles real-time synchronized lessons between teachers and students
 */

/**
 * NOTE: For very large classes, consider using a subcollection for connectedStudents
 * instead of an array field to avoid Firestore's 1MB document size limit.
 * Example: collection(db, 'sessions', sessionId, 'connectedStudents')
 */

/**
 * NOTE: For large datasets, consider adding Firestore composite indexes and using orderBy in queries
 * for better performance and scalability. See Firestore documentation for index creation.
 */

/**
 * Create a new session
 * @param {Object} sessionData - Session information
 * @param {string} sessionData.teacherId - Teacher's user ID
 * @param {string} sessionData.classId - Class ID
 * @param {number} sessionData.lessonId - Lesson ID
 * @param {string} sessionData.lessonName - Lesson name
 * @param {Array} sessionData.studentIds - Array of student IDs
 * @returns {Promise<string>} Session ID
 */
export const createSession = async (sessionData) => {
  try {
    const sessionRef = collection(db, 'sessions');
    const sessionDoc = await addDoc(sessionRef, {
      ...sessionData,
      status: 'active',
      currentSlide: 0,
      unlockedSlides: [0],
      startTime: serverTimestamp(),
      lastActivity: serverTimestamp(),
      connectedStudents: [],
      studentProgress: {},
      teacherNotes: {},
      isLocked: false
    });

    logSecurityEvent('SESSION_CREATED', {
      sessionId: sessionDoc.id,
      teacherId: sessionData.teacherId,
      lessonId: sessionData.lessonId
    });

    return sessionDoc.id;
  } catch (error) {
    console.error('Error creating session:', error);
    throw new Error('Failed to create session');
  }
};

/**
 * Get session by ID
 * @param {string} sessionId - Session ID
 * @returns {Promise<Object>} Session data
 */
export const getSession = async (sessionId) => {
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    const sessionDoc = await getDoc(sessionRef);
    
    if (!sessionDoc.exists()) {
      throw new Error('Session not found');
    }

    return {
      id: sessionDoc.id,
      ...sessionDoc.data()
    };
  } catch (error) {
    console.error('Error getting session:', error);
    throw new Error('Failed to get session');
  }
};

/**
 * Update session current slide
 * @param {string} sessionId - Session ID
 * @param {number} slideIndex - New slide index
 * @returns {Promise<void>}
 */
export const updateSessionSlide = async (sessionId, slideIndex) => {
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    await updateDoc(sessionRef, {
      currentSlide: slideIndex,
      lastActivity: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating session slide:', error);
    throw new Error('Failed to update session slide');
  }
};

/**
 * Unlock next slide for students
 * @param {string} sessionId - Session ID
 * @param {number} slideIndex - Slide index to unlock
 * @returns {Promise<void>}
 */
export const unlockSlide = async (sessionId, slideIndex) => {
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    const sessionDoc = await getDoc(sessionRef);
    
    if (!sessionDoc.exists()) {
      throw new Error('Session not found');
    }

    const sessionData = sessionDoc.data();
    const updatedUnlockedSlides = [...new Set([...sessionData.unlockedSlides, slideIndex])];

    await updateDoc(sessionRef, {
      unlockedSlides: updatedUnlockedSlides,
      lastActivity: serverTimestamp()
    });
  } catch (error) {
    console.error('Error unlocking slide:', error);
    throw new Error('Failed to unlock slide');
  }
};

/**
 * Lock session (prevent student navigation)
 * @param {string} sessionId - Session ID
 * @param {boolean} isLocked - Whether to lock the session
 * @returns {Promise<void>}
 */
export const setSessionLock = async (sessionId, isLocked) => {
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    await updateDoc(sessionRef, {
      isLocked,
      lastActivity: serverTimestamp()
    });

    logSecurityEvent('SESSION_LOCK_UPDATED', {
      sessionId,
      isLocked,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error setting session lock:', error);
    throw new Error('Failed to set session lock');
  }
};

/**
 * Student joins session (atomic array update)
 * @param {string} sessionId - Session ID
 * @param {string} studentId - Student ID
 * @param {string} studentName - Student name
 * @returns {Promise<void>}
 */
export const joinSession = async (sessionId, studentId, studentName) => {
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    // Use arrayUnion for atomic update
    await updateDoc(sessionRef, {
      connectedStudents: arrayUnion({ id: studentId, name: studentName, joinedAt: serverTimestamp(), lastActivity: serverTimestamp(), currentSlide: 0 }),
      lastActivity: serverTimestamp()
    });
    logSecurityEvent('STUDENT_JOINED_SESSION', {
      sessionId,
      studentId,
      studentName,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error joining session:', error);
    throw new Error('Failed to join session');
  }
};

/**
 * Student leaves session (atomic array update)
 * @param {string} sessionId - Session ID
 * @param {string} studentId - Student ID
 * @param {string} studentName - Student name
 * @returns {Promise<void>}
 */
export const leaveSession = async (sessionId, studentId, studentName) => {
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    // Use arrayRemove for atomic update
    await updateDoc(sessionRef, {
      connectedStudents: arrayRemove({ id: studentId, name: studentName }),
      lastActivity: serverTimestamp()
    });
    logSecurityEvent('STUDENT_LEFT_SESSION', {
      sessionId,
      studentId,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error leaving session:', error);
    throw new Error('Failed to leave session');
  }
};

/**
 * Update student progress
 * @param {string} sessionId - Session ID
 * @param {string} studentId - Student ID
 * @param {number} slideIndex - Current slide index
 * @param {Object} progress - Progress data
 * @returns {Promise<void>}
 */
export const updateStudentProgress = async (sessionId, studentId, slideIndex, progress = {}) => {
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    const sessionDoc = await getDoc(sessionRef);
    
    if (!sessionDoc.exists()) {
      throw new Error('Session not found');
    }

    const sessionData = sessionDoc.data();
    const studentProgress = sessionData.studentProgress || {};
    
    studentProgress[studentId] = {
      ...studentProgress[studentId],
      currentSlide: slideIndex,
      lastActivity: serverTimestamp(),
      ...progress
    };

    await updateDoc(sessionRef, {
      studentProgress,
      lastActivity: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating student progress:', error);
    throw new Error('Failed to update student progress');
  }
};

/**
 * End session
 * @param {string} sessionId - Session ID
 * @returns {Promise<void>}
 */
export const endSession = async (sessionId) => {
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    await updateDoc(sessionRef, {
      status: 'ended',
      endTime: serverTimestamp(),
      lastActivity: serverTimestamp()
    });

    logSecurityEvent('SESSION_ENDED', {
      sessionId,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error ending session:', error);
    throw new Error('Failed to end session');
  }
};

/**
 * Get active sessions for a teacher
 * @param {string} teacherId - Teacher ID
 * @returns {Promise<Array>} Array of active sessions
 */
export const getTeacherActiveSessions = async (teacherId) => {
  try {
    const sessionsRef = collection(db, 'sessions');
    // Remove orderBy to avoid index requirement - we'll sort in memory
    const q = query(
      sessionsRef,
      where('teacherId', '==', teacherId),
      where('status', '==', 'active')
    );
    
    const querySnapshot = await getDocs(q);
    const sessions = [];
    
    querySnapshot.forEach((doc) => {
      sessions.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // Sort by startTime in memory
    sessions.sort((a, b) => {
      const timeA = a.startTime?.toDate?.() || a.startTime || new Date(0);
      const timeB = b.startTime?.toDate?.() || b.startTime || new Date(0);
      return timeB - timeA;
    });
    
    return sessions;
  } catch (error) {
    console.error('Error getting teacher active sessions:', error);
    throw new Error('Failed to get active sessions');
  }
};

/**
 * Get available sessions for a student
 * @param {string} studentId - Student ID
 * @returns {Promise<Array>} Array of available sessions
 */
export const getStudentAvailableSessions = async (studentId) => {
  try {
    const sessionsRef = collection(db, 'sessions');
    // Remove orderBy to avoid index requirement - we'll sort in memory
    const q = query(
      sessionsRef,
      where('status', '==', 'active')
    );
    
    const querySnapshot = await getDocs(q);
    const sessions = [];
    
    querySnapshot.forEach((doc) => {
      const sessionData = doc.data();
      // Check if student is enrolled in this session
      if (sessionData.studentIds && sessionData.studentIds.includes(studentId)) {
        sessions.push({
          id: doc.id,
          ...sessionData
        });
      }
    });
    
    // Sort by startTime in memory
    sessions.sort((a, b) => {
      const timeA = a.startTime?.toDate?.() || a.startTime || new Date(0);
      const timeB = b.startTime?.toDate?.() || b.startTime || new Date(0);
      return timeB - timeA;
    });
    
    return sessions;
  } catch (error) {
    console.error('Error getting student available sessions:', error);
    throw new Error('Failed to get available sessions');
  }
};

/**
 * Listen to session changes in real-time
 * @param {string} sessionId - Session ID
 * @param {Function} callback - Callback function for updates
 * @returns {Function} Unsubscribe function
 */
export const listenToSession = (sessionId, callback) => {
  const sessionRef = doc(db, 'sessions', sessionId);
  
  return onSnapshot(sessionRef, (doc) => {
    if (doc.exists()) {
      callback({
        id: doc.id,
        ...doc.data()
      });
    } else {
      callback(null);
    }
  }, (error) => {
    console.error('Error listening to session:', error);
  });
};

/**
 * Add teacher note to session
 * @param {string} sessionId - Session ID
 * @param {number} slideIndex - Slide index
 * @param {string} note - Note content
 * @returns {Promise<void>}
 */
export const addTeacherNote = async (sessionId, slideIndex, note) => {
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    const sessionDoc = await getDoc(sessionRef);
    
    if (!sessionDoc.exists()) {
      throw new Error('Session not found');
    }

    const sessionData = sessionDoc.data();
    const teacherNotes = sessionData.teacherNotes || {};
    
    teacherNotes[slideIndex] = {
      content: note,
      timestamp: serverTimestamp()
    };

    await updateDoc(sessionRef, {
      teacherNotes,
      lastActivity: serverTimestamp()
    });
  } catch (error) {
    console.error('Error adding teacher note:', error);
    throw new Error('Failed to add teacher note');
  }
};

/**
 * Check and end stale sessions automatically
 * @param {string} sessionId - Session ID
 * @returns {Promise<boolean>} True if session was ended, false if still active
 */
export const checkAndEndStaleSession = async (sessionId) => {
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    const sessionDoc = await getDoc(sessionRef);
    
    if (!sessionDoc.exists()) {
      return false;
    }

    const sessionData = sessionDoc.data();
    
    // Check if session has been inactive for more than 5 minutes (reduced from 15)
    const lastActivity = sessionData.lastActivity?.toDate?.() || new Date(sessionData.lastActivity);
    const now = new Date();
    const timeDiff = now.getTime() - lastActivity.getTime();
    const maxInactiveTime = 5 * 60 * 1000; // 5 minutes in milliseconds

    // Also check if session has been running for more than 4 hours
    const startTime = sessionData.startTime?.toDate?.() || new Date(sessionData.startTime);
    const sessionDuration = now.getTime() - startTime.getTime();
    const maxSessionDuration = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

    if ((timeDiff > maxInactiveTime || sessionDuration > maxSessionDuration) && sessionData.status === 'active') {
      console.log(`Auto-ending stale session ${sessionId}, inactive for ${timeDiff / 1000} seconds, duration: ${sessionDuration / 1000 / 60} minutes`);
      await endSession(sessionId);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error checking stale session:', error);
    return false;
  }
};

/**
 * Clean up all stale sessions for a teacher
 * @param {string} teacherId - Teacher ID
 * @returns {Promise<number>} Number of sessions cleaned up
 */
export const cleanupStaleSessions = async (teacherId) => {
  try {
    const sessionsRef = collection(db, 'sessions');
    const q = query(
      sessionsRef,
      where('teacherId', '==', teacherId),
      where('status', '==', 'active')
    );
    
    const querySnapshot = await getDocs(q);
    let cleanedCount = 0;
    
    for (const doc of querySnapshot.docs) {
      const wasEnded = await checkAndEndStaleSession(doc.id);
      if (wasEnded) {
        cleanedCount++;
      }
    }
    
    console.log(`Cleaned up ${cleanedCount} stale sessions for teacher ${teacherId}`);
    return cleanedCount;
  } catch (error) {
    console.error('Error cleaning up stale sessions:', error);
    return 0;
  }
};

/**
 * Get current active session for a student's class
 * @param {string} studentId - Student ID
 * @returns {Promise<Object|null>} Current active session or null
 */
export const getCurrentActiveSessionForStudent = async (studentId) => {
  try {
    const sessionsRef = collection(db, 'sessions');
    // Remove orderBy to avoid index requirement - we'll sort in memory
    const q = query(
      sessionsRef,
      where('status', '==', 'active')
    );
    
    const querySnapshot = await getDocs(q);
    const sessions = [];
    
    // Collect all active sessions first
    querySnapshot.forEach((doc) => {
      const sessionData = doc.data();
      if (sessionData.studentIds && sessionData.studentIds.includes(studentId)) {
        sessions.push({
          id: doc.id,
          ...sessionData
        });
      }
    });
    
    // Sort by startTime in memory and take the most recent
    if (sessions.length > 0) {
      sessions.sort((a, b) => {
        const timeA = a.startTime?.toDate?.() || a.startTime || new Date(0);
        const timeB = b.startTime?.toDate?.() || b.startTime || new Date(0);
        return timeB - timeA;
      });
      
      // Check if the most recent session is stale
      const mostRecentSession = sessions[0];
      const lastActivity = mostRecentSession.lastActivity?.toDate?.() || new Date(mostRecentSession.lastActivity);
      const now = new Date();
      const timeDiff = now.getTime() - lastActivity.getTime();
      const maxInactiveTime = 10 * 60 * 1000; // 10 minutes in milliseconds

      if (timeDiff > maxInactiveTime) {
        console.log('Most recent session is stale, returning null');
        return null;
      }
      
      return mostRecentSession;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting current active session for student:', error);
    throw new Error('Failed to get current active session');
  }
};

/**
 * Listen to current active session for a student
 * @param {string} studentId - Student ID
 * @param {Function} callback - Callback function for updates
 * @returns {Function} Unsubscribe function
 */
export const listenToCurrentActiveSession = (studentId, callback) => {
  const sessionsRef = collection(db, 'sessions');
  // Remove orderBy to avoid index requirement - we'll sort in memory
  const q = query(
    sessionsRef,
    where('status', '==', 'active')
  );
  
  return onSnapshot(q, (querySnapshot) => {
    let currentSession = null;
    const sessions = [];
    
    // Collect all active sessions first
    querySnapshot.forEach((doc) => {
      const sessionData = doc.data();
      if (sessionData.studentIds && sessionData.studentIds.includes(studentId)) {
        sessions.push({
          id: doc.id,
          ...sessionData
        });
      }
    });
    
    // Sort by startTime in memory and take the most recent
    if (sessions.length > 0) {
      sessions.sort((a, b) => {
        const timeA = a.startTime?.toDate?.() || a.startTime || new Date(0);
        const timeB = b.startTime?.toDate?.() || b.startTime || new Date(0);
        return timeB - timeA;
      });
      
      // Check if the most recent session is stale
      const mostRecentSession = sessions[0];
      const lastActivity = mostRecentSession.lastActivity?.toDate?.() || new Date(mostRecentSession.lastActivity);
      const now = new Date();
      const timeDiff = now.getTime() - lastActivity.getTime();
      const maxInactiveTime = 10 * 60 * 1000; // 10 minutes in milliseconds

      if (timeDiff <= maxInactiveTime) {
        currentSession = mostRecentSession;
      } else {
        console.log('Most recent session is stale, not showing notification');
      }
    }
    
    callback(currentSession);
  }, (error) => {
    console.error('Error listening to current active session:', error);
  });
}; 