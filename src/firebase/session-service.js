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
import { setUserInLiveSession, updateUserPresence } from './presence-service';

/**
 * Session Management Service - OPTIMIZED FOR QUOTA REDUCTION
 * Handles real-time synchronized lessons between teachers and students
 */

// Cache for session data to reduce reads
const sessionCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

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
      connectedStudents: [], // Ensure this is always an array
      studentProgress: {}, // Ensure this is always an object
      teacherNotes: {},
      isLocked: false,
      chatMessages: [], // Initialize chat messages array
      attendanceCount: 0,
      completionRate: 0
    });

    console.log('✅ Session created successfully:', sessionDoc.id);

    logSecurityEvent('SESSION_CREATED', {
      sessionId: sessionDoc.id,
      teacherId: sessionData.teacherId,
      lessonId: sessionData.lessonId
    });

    return sessionDoc.id;
  } catch (error) {
    console.error('❌ Error creating session:', error);
    throw new Error('Failed to create session');
  }
};

/**
 * Get session by ID with caching
 * @param {string} sessionId - Session ID
 * @returns {Promise<Object>} Session data
 */
export const getSession = async (sessionId) => {
  try {
    // Check cache first
    const cached = sessionCache.get(sessionId);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log('📦 Using cached session data for:', sessionId);
      return cached.data;
    }

    const sessionRef = doc(db, 'sessions', sessionId);
    const sessionDoc = await getDoc(sessionRef);
    
    if (!sessionDoc.exists()) {
      throw new Error('Session not found');
    }

    const sessionData = {
      id: sessionDoc.id,
      ...sessionDoc.data()
    };

    // Cache the result
    sessionCache.set(sessionId, {
      data: sessionData,
      timestamp: Date.now()
    });

    return sessionData;
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

    // Update cache
    const cached = sessionCache.get(sessionId);
    if (cached) {
      cached.data.currentSlide = slideIndex;
      cached.data.lastActivity = new Date();
    }
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

    // Step 1: Add to connectedStudents (atomic, simple object only)
    await updateDoc(sessionRef, {
      connectedStudents: arrayUnion({ id: studentId, name: studentName }),
      lastActivity: serverTimestamp()
    });

    // Step 2: Set student progress (with joinedAt/lastActivity as serverTimestamp)
    const sessionDoc = await getDoc(sessionRef);
    if (sessionDoc.exists()) {
      const sessionData = sessionDoc.data();
      const studentProgress = sessionData.studentProgress || {};
      studentProgress[studentId] = {
        ...(studentProgress[studentId] || {}),
        joinedAt: serverTimestamp(),
        lastActivity: serverTimestamp(),
        currentSlide: 0
      };
      await updateDoc(sessionRef, { studentProgress });
      
      // Update user presence to show they're in a live session
      await setUserInLiveSession(studentId, sessionId, sessionData.lessonName);
    }

    logSecurityEvent('STUDENT_JOINED_SESSION', {
      sessionId,
      studentId,
      studentName,
      timestamp: new Date().toISOString()
    });
    
    console.log(`✅ Student ${studentName} (${studentId}) joined session ${sessionId}`);
  } catch (error) {
    console.error('Error in joinSession:', error);
    throw error;
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
    
    // First, get the current session data to check if student is actually connected
    const sessionDoc = await getDoc(sessionRef);
    if (!sessionDoc.exists()) {
      throw new Error('Session not found');
    }
    
    const sessionData = sessionDoc.data();
    const connectedStudents = sessionData.connectedStudents || [];
    
    // Check if student is actually in the connectedStudents array
    const isConnected = connectedStudents.some(student => 
      student.id === studentId || student === studentId
    );
    
    if (isConnected) {
      // Remove student from connectedStudents array
      await updateDoc(sessionRef, {
        connectedStudents: arrayRemove({ id: studentId, name: studentName }),
        lastActivity: serverTimestamp()
      });
    }
    
    // Update user presence back to online
    await updateUserPresence(studentId, 'online');

    logSecurityEvent('STUDENT_LEFT_SESSION', {
      sessionId,
      studentId,
      studentName,
      wasConnected: isConnected,
      timestamp: new Date().toISOString()
    });
    
    console.log(`✅ Student ${studentName} (${studentId}) left session ${sessionId}`);
  } catch (error) {
    console.error('Error in leaveSession:', error);
    throw error;
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
 * End session with comprehensive attendance tracking
 * @param {string} sessionId - Session ID
 * @returns {Promise<void>}
 */
export const endSession = async (sessionId) => {
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    
    // Get current session data before ending
    const sessionDoc = await getDoc(sessionRef);
    if (!sessionDoc.exists()) {
      throw new Error('Session not found');
    }
    
    const sessionData = sessionDoc.data();
    
    // Calculate session duration and attendance statistics
    const startTime = sessionData.startTime?.toDate?.() || new Date(sessionData.startTime);
    const endTime = new Date();
    const duration = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60)); // minutes
    
    // Process attendance data
    const connectedStudents = sessionData.connectedStudents || [];
    const attendanceRecords = connectedStudents.map(student => ({
      studentId: student.id,
      studentName: student.name,
      joinedAt: student.joinedAt || startTime,
      lastActivity: student.lastActivity || endTime,
      timeSpent: duration, // Approximate time spent
      slidesEngaged: student.slidesEngaged || 0,
      status: 'completed'
    }));
    
    // Update session with comprehensive end data
    await updateDoc(sessionRef, {
      status: 'ended',
      endTime: serverTimestamp(),
      lastActivity: serverTimestamp(),
      duration: duration,
      finalAttendance: attendanceRecords,
      attendanceCount: connectedStudents.length,
      completionRate: connectedStudents.length > 0 ? 
        (connectedStudents.filter(s => s.status === 'completed').length / connectedStudents.length) * 100 : 0
    });

    // Clear cache
    sessionCache.delete(sessionId);

    // Log comprehensive session end event
    logSecurityEvent('SESSION_ENDED_WITH_ATTENDANCE', {
      sessionId,
      teacherId: sessionData.teacherId,
      lessonId: sessionData.lessonId,
      duration: duration,
      attendanceCount: connectedStudents.length,
      attendanceRecords: attendanceRecords.map(r => ({ 
        studentId: r.studentId, 
        studentName: r.studentName,
        timeSpent: r.timeSpent 
      })),
      timestamp: new Date().toISOString()
    });
    
    console.log(`✅ Session ${sessionId} ended with ${connectedStudents.length} students in attendance`);
  } catch (error) {
    console.error('Error ending session:', error);
    throw new Error('Failed to end session');
  }
};

/**
 * Get active sessions for a teacher - OPTIMIZED
 * @param {string} teacherId - Teacher ID
 * @returns {Promise<Array>} Array of active sessions
 */
export const getTeacherActiveSessions = async (teacherId) => {
  try {
    const sessionsRef = collection(db, 'sessions');
    // Use specific query to reduce reads
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
 * Get available sessions for a student - OPTIMIZED with array-contains
 * @param {string} studentId - Student ID
 * @returns {Promise<Array>} Array of available sessions
 */
export const getStudentAvailableSessions = async (studentId) => {
  try {
    const sessionsRef = collection(db, 'sessions');
    // Use array-contains query for better performance
    const q = query(
      sessionsRef,
      where('status', '==', 'active'),
      where('studentIds', 'array-contains', studentId)
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
    console.error('Error getting student available sessions:', error);
    throw new Error('Failed to get available sessions');
  }
};

/**
 * Listen to session changes in real-time - OPTIMIZED
 * @param {string} sessionId - Session ID
 * @param {Function} callback - Callback function for updates
 * @returns {Function} Unsubscribe function
 */
/**
 * Listen to session changes in real-time - OPTIMIZED
 * @param {string} sessionId - Session ID
 * @param {Function} callback - Callback function for updates
 * @returns {Function} Unsubscribe function
 */
export const listenToSession = (sessionId, callback) => {
  if (!sessionId) {
    console.warn('⚠️ listenToSession called with null/undefined sessionId');
    return () => {};
  }

  const sessionRef = doc(db, 'sessions', sessionId);
  
  return onSnapshot(sessionRef, (doc) => {
    if (doc.exists()) {
      const sessionData = {
        id: doc.id,
        ...doc.data()
      };
      
      // Ensure connectedStudents is always an array
      if (!Array.isArray(sessionData.connectedStudents)) {
        console.warn('⚠️ connectedStudents is not an array, fixing:', sessionData.connectedStudents);
        sessionData.connectedStudents = [];
      }
      
      // Ensure studentProgress is always an object
      if (typeof sessionData.studentProgress !== 'object' || sessionData.studentProgress === null) {
        console.warn('⚠️ studentProgress is not an object, fixing:', sessionData.studentProgress);
        sessionData.studentProgress = {};
      }
      
      // Update cache with new data
      sessionCache.set(sessionId, {
        data: sessionData,
        timestamp: Date.now()
      });
      
      // Call callback with session data
      try {
        console.log('📡 Session data updated:', {
          sessionId,
          connectedStudentsCount: sessionData.connectedStudents?.length || 0,
          currentSlide: sessionData.currentSlide,
          status: sessionData.status
        });
        callback(sessionData);
      } catch (error) {
        console.error('Error in session listener callback:', error);
      }
    } else {
      // Session doesn't exist or was deleted
      sessionCache.delete(sessionId);
      console.log('📡 Session not found:', sessionId);
      callback(null);
    }
  }, (error) => {
    console.error('❌ Error listening to session:', error);
    // Don't call callback on error to avoid breaking the UI
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
 * Get teacher session history with student attendance
 * @param {string} teacherId - Teacher ID
 * @param {number} limit - Number of sessions to return (default: 20)
 * @returns {Promise<Object>} Session history with attendance data
 */
export const getTeacherSessionHistory = async (teacherId, limit = 20) => {
  try {
    const sessionsRef = collection(db, 'sessions');
    const q = query(
      sessionsRef,
      where('teacherId', '==', teacherId),
      where('status', '==', 'ended')
    );
    
    const querySnapshot = await getDocs(q);
    const sessions = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      sessions.push({
        id: doc.id,
        ...data
      });
    });
    
    // Sort by end time (most recent first)
    sessions.sort((a, b) => {
      const timeA = a.endTime?.toDate?.() || new Date(a.endTime) || new Date(0);
      const timeB = b.endTime?.toDate?.() || new Date(b.endTime) || new Date(0);
      return timeB - timeA;
    });
    
    // Limit results
    const limitedSessions = sessions.slice(0, limit);
    
    // Calculate attendance statistics
    const totalSessions = limitedSessions.length;
    const totalAttendance = limitedSessions.reduce((sum, session) => {
      return sum + (session.connectedStudents?.length || 0);
    }, 0);
    const averageAttendance = totalSessions > 0 ? Math.round(totalAttendance / totalSessions) : 0;
    
    // Build detailed sessions with student info
    const detailedSessions = limitedSessions.map(session => {
      const startTime = session.startTime?.toDate?.() || new Date(session.startTime);
      const endTime = session.endTime?.toDate?.() || new Date(session.endTime);
      const duration = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60)); // minutes
      
      return {
        sessionId: session.id,
        lessonId: session.lessonId,
        lessonName: session.lessonName,
        className: session.className,
        date: startTime,
        duration: duration,
        attendance: session.connectedStudents?.length || 0,
        students: session.connectedStudents || []
      };
    });
    
    // Build student attendance summary
    const studentAttendance = {};
    limitedSessions.forEach(session => {
      if (session.connectedStudents) {
        session.connectedStudents.forEach(student => {
          if (!studentAttendance[student.id]) {
            studentAttendance[student.id] = {
              name: student.name,
              sessionsAttended: 0,
              totalTimeSpent: 0,
              lastAttendance: null
            };
          }
          studentAttendance[student.id].sessionsAttended++;
          studentAttendance[student.id].totalTimeSpent += session.duration || 0;
          
          const sessionDate = session.startTime?.toDate?.() || new Date(session.startTime);
          if (!studentAttendance[student.id].lastAttendance || 
              sessionDate > studentAttendance[student.id].lastAttendance) {
            studentAttendance[student.id].lastAttendance = sessionDate;
          }
        });
      }
    });
    
    // Calculate attendance percentages and average time
    Object.values(studentAttendance).forEach(student => {
      student.attendancePercentage = Math.round((student.sessionsAttended / totalSessions) * 100);
      student.averageTimePerSession = Math.round(student.totalTimeSpent / student.sessionsAttended);
    });
    
    return {
      totalSessions,
      averageAttendance,
      totalAttendance,
      detailedSessions,
      studentAttendance
    };
  } catch (error) {
    console.error('Error getting teacher session history:', error);
    throw new Error('Failed to get session history');
  }
};

/**
 * Get current active session for a student's class - OPTIMIZED
 * @param {string} studentId - Student ID
 * @returns {Promise<Object|null>} Current active session or null
 */
export const getCurrentActiveSessionForStudent = async (studentId) => {
  try {
    const sessionsRef = collection(db, 'sessions');
    // Use array-contains query for better performance
    const q = query(
      sessionsRef,
      where('status', '==', 'active'),
      where('studentIds', 'array-contains', studentId)
    );
    
    const querySnapshot = await getDocs(q);
    const sessions = [];
    
    // Collect all active sessions first
    querySnapshot.forEach((doc) => {
      sessions.push({
        id: doc.id,
        ...doc.data()
      });
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
 * Listen to current active session for a student - OPTIMIZED
 * @param {string} studentId - Student ID
 * @param {Function} callback - Callback function for updates
 * @returns {Function} Unsubscribe function
 */
export const listenToCurrentActiveSession = (studentId, callback) => {
  const sessionsRef = collection(db, 'sessions');
  // Use array-contains query for better performance
  const q = query(
    sessionsRef,
    where('status', '==', 'active'),
    where('studentIds', 'array-contains', studentId)
  );
  
  return onSnapshot(q, (querySnapshot) => {
    let currentSession = null;
    const sessions = [];
    
    // Collect all active sessions first
    querySnapshot.forEach((doc) => {
      sessions.push({
        id: doc.id,
        ...doc.data()
      });
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