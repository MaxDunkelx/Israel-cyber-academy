/**
 * Fallback Service for Network Issues
 * 
 * Provides polling-based alternatives when real-time listeners fail
 * due to network issues like ERR_QUIC_PROTOCOL_ERROR
 */

import { collection, doc, getDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from './firebase-config.js';

// Polling intervals (in milliseconds)
const POLLING_INTERVALS = {
  SESSION: 5000,    // 5 seconds for session updates
  USER_PROFILE: 10000, // 10 seconds for user profile
  LESSONS: 30000,   // 30 seconds for lesson content
  STUDENTS: 8000    // 8 seconds for student progress
};

// Active polling timers
const activeTimers = new Map();

/**
 * Polling-based session listener
 * @param {string} sessionId - Session ID to monitor
 * @param {Function} callback - Callback function for updates
 * @param {number} interval - Polling interval in milliseconds
 * @returns {Function} Stop function
 */
export const pollSession = (sessionId, callback, interval = POLLING_INTERVALS.SESSION) => {
  let lastData = null;
  
  const poll = async () => {
    try {
      const sessionRef = doc(db, 'sessions', sessionId);
      const sessionDoc = await getDoc(sessionRef);
      
      if (sessionDoc.exists()) {
        const data = {
          id: sessionDoc.id,
          ...sessionDoc.data()
        };
        
        // Only call callback if data has changed
        if (JSON.stringify(data) !== JSON.stringify(lastData)) {
          callback(data);
          lastData = data;
        }
      } else {
        callback(null);
      }
    } catch (error) {
      console.error('Polling session error:', error);
    }
  };
  
  // Initial poll
  poll();
  
  // Set up interval
  const timerId = setInterval(poll, interval);
  activeTimers.set(`session_${sessionId}`, timerId);
  
  // Return stop function
  return () => {
    clearInterval(timerId);
    activeTimers.delete(`session_${sessionId}`);
  };
};

/**
 * Polling-based user profile listener
 * @param {string} userId - User ID to monitor
 * @param {Function} callback - Callback function for updates
 * @param {number} interval - Polling interval in milliseconds
 * @returns {Function} Stop function
 */
export const pollUserProfile = (userId, callback, interval = POLLING_INTERVALS.USER_PROFILE) => {
  let lastData = null;
  
  const poll = async () => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        
        // Only call callback if data has changed
        if (JSON.stringify(data) !== JSON.stringify(lastData)) {
          callback(data);
          lastData = data;
        }
      } else {
        callback(null);
      }
    } catch (error) {
      console.error('Polling user profile error:', error);
    }
  };
  
  // Initial poll
  poll();
  
  // Set up interval
  const timerId = setInterval(poll, interval);
  activeTimers.set(`user_${userId}`, timerId);
  
  // Return stop function
  return () => {
    clearInterval(timerId);
    activeTimers.delete(`user_${userId}`);
  };
};

/**
 * Polling-based active sessions listener
 * @param {string} teacherId - Teacher ID to monitor
 * @param {Function} callback - Callback function for updates
 * @param {number} interval - Polling interval in milliseconds
 * @returns {Function} Stop function
 */
export const pollActiveSessions = (teacherId, callback, interval = POLLING_INTERVALS.SESSION) => {
  let lastData = null;
  
  const poll = async () => {
    try {
      const sessionsRef = collection(db, 'sessions');
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
      
      // Only call callback if data has changed
      if (JSON.stringify(sessions) !== JSON.stringify(lastData)) {
        callback(sessions);
        lastData = sessions;
      }
    } catch (error) {
      console.error('Polling active sessions error:', error);
    }
  };
  
  // Initial poll
  poll();
  
  // Set up interval
  const timerId = setInterval(poll, interval);
  activeTimers.set(`active_sessions_${teacherId}`, timerId);
  
  // Return stop function
  return () => {
    clearInterval(timerId);
    activeTimers.delete(`active_sessions_${teacherId}`);
  };
};

/**
 * Polling-based student progress listener
 * @param {string} sessionId - Session ID to monitor
 * @param {Function} callback - Callback function for updates
 * @param {number} interval - Polling interval in milliseconds
 * @returns {Function} Stop function
 */
export const pollStudentProgress = (sessionId, callback, interval = POLLING_INTERVALS.STUDENTS) => {
  let lastData = null;
  
  const poll = async () => {
    try {
      const sessionRef = doc(db, 'sessions', sessionId);
      const sessionDoc = await getDoc(sessionRef);
      
      if (sessionDoc.exists()) {
        const data = sessionDoc.data();
        const progress = data.studentProgress || {};
        
        // Only call callback if progress has changed
        if (JSON.stringify(progress) !== JSON.stringify(lastData)) {
          callback(progress);
          lastData = progress;
        }
      }
    } catch (error) {
      console.error('Polling student progress error:', error);
    }
  };
  
  // Initial poll
  poll();
  
  // Set up interval
  const timerId = setInterval(poll, interval);
  activeTimers.set(`progress_${sessionId}`, timerId);
  
  // Return stop function
  return () => {
    clearInterval(timerId);
    activeTimers.delete(`progress_${sessionId}`);
  };
};

/**
 * Stop all active polling timers
 */
export const stopAllPolling = () => {
  for (const [key, timerId] of activeTimers) {
    clearInterval(timerId);
  }
  
  activeTimers.clear();
  console.log('All polling timers stopped');
};

/**
 * Get active polling status
 */
export const getPollingStatus = () => {
  const status = {
    activeTimers: activeTimers.size,
    timerKeys: Array.from(activeTimers.keys())
  };
  
  return status;
};

/**
 * Enhanced listener with fallback
 * @param {string} sessionId - Session ID
 * @param {Function} callback - Callback function
 * @param {Function} realtimeListener - Real-time listener function
 * @returns {Function} Unsubscribe function
 */
export const createFallbackListener = (sessionId, callback, realtimeListener) => {
  let isRealtimeActive = false;
  let pollingUnsubscribe = null;
  
  // Try real-time listener first
  const realtimeUnsubscribe = realtimeListener(sessionId, (data) => {
    isRealtimeActive = true;
    callback(data);
  });
  
  // Set up polling as fallback
  setTimeout(() => {
    if (!isRealtimeActive) {
      pollingUnsubscribe = pollSession(sessionId, callback);
    }
  }, 5000); // Wait 5 seconds before falling back
  
  // Return combined unsubscribe function
  return () => {
    realtimeUnsubscribe();
    if (pollingUnsubscribe) {
      pollingUnsubscribe();
    }
  };
};