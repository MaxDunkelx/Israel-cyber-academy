import { 
  doc, 
  setDoc, 
  getDoc,
  onSnapshot, 
  serverTimestamp,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from './firebase-config';

/**
 * User Presence Service
 * Tracks real-time online/offline status and live session participation
 */

// Store presence listeners for cleanup
const presenceListeners = new Map();

/**
 * Update user presence status
 * @param {string} userId - User ID
 * @param {string} status - 'online', 'offline', or 'in_live_session'
 * @param {Object} metadata - Additional presence data
 */
export const updateUserPresence = async (userId, status = 'online', metadata = {}) => {
  try {
    const presenceRef = doc(db, 'userPresence', userId);
    
    await setDoc(presenceRef, {
      userId,
      status,
      lastSeen: serverTimestamp(),
      metadata: {
        ...metadata,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      }
    }, { merge: true });
    
    console.log(`📡 Updated presence for user ${userId}: ${status}`);
  } catch (error) {
    console.error('Error updating user presence:', error);
  }
};

/**
 * Listen to user presence changes
 * @param {string} userId - User ID to listen to
 * @param {Function} callback - Callback function for presence updates
 * @returns {Function} Unsubscribe function
 */
export const listenToUserPresence = (userId, callback) => {
  if (presenceListeners.has(userId)) {
    // Clean up existing listener
    presenceListeners.get(userId)();
  }

  const presenceRef = doc(db, 'userPresence', userId);
  
  const unsubscribe = onSnapshot(presenceRef, (doc) => {
    if (doc.exists()) {
      const presenceData = doc.data();
      callback(presenceData);
    } else {
      // User has no presence record, assume offline
      callback({ status: 'offline', lastSeen: null });
    }
  }, (error) => {
    console.error('Error listening to user presence:', error);
  });

  presenceListeners.set(userId, unsubscribe);
  return unsubscribe;
};

/**
 * Listen to multiple users' presence
 * @param {Array} userIds - Array of user IDs
 * @param {Function} callback - Callback function for presence updates
 * @returns {Function} Unsubscribe function
 */
export const listenToMultipleUsersPresence = (userIds, callback) => {
  if (!userIds || userIds.length === 0) {
    return () => {};
  }

  const presenceRef = collection(db, 'userPresence');
  const q = query(presenceRef, where('userId', 'in', userIds));
  
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const presenceData = {};
    
    // Initialize all users as offline
    userIds.forEach(userId => {
      presenceData[userId] = { status: 'offline', lastSeen: null };
    });
    
    // Update with actual presence data
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      presenceData[data.userId] = data;
    });
    
    callback(presenceData);
  }, (error) => {
    console.error('Error listening to multiple users presence:', error);
  });

  return unsubscribe;
};

/**
 * Get current presence status for a user
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Presence data
 */
export const getUserPresence = async (userId) => {
  try {
    const presenceRef = doc(db, 'userPresence', userId);
    const presenceDoc = await getDoc(presenceRef);
    
    if (presenceDoc.exists()) {
      return presenceDoc.data();
    } else {
      return { status: 'offline', lastSeen: null };
    }
  } catch (error) {
    console.error('Error getting user presence:', error);
    return { status: 'offline', lastSeen: null };
  }
};

/**
 * Get presence status for multiple users
 * @param {Array} userIds - Array of user IDs
 * @returns {Promise<Object>} Presence data for all users
 */
export const getMultipleUsersPresence = async (userIds) => {
  try {
    const presenceRef = collection(db, 'userPresence');
    const q = query(presenceRef, where('userId', 'in', userIds));
    const querySnapshot = await getDocs(q);
    
    const presenceData = {};
    
    // Initialize all users as offline
    userIds.forEach(userId => {
      presenceData[userId] = { status: 'offline', lastSeen: null };
    });
    
    // Update with actual presence data
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      presenceData[data.userId] = data;
    });
    
    return presenceData;
  } catch (error) {
    console.error('Error getting multiple users presence:', error);
    return {};
  }
};

/**
 * Clean up presence when user goes offline
 * @param {string} userId - User ID
 */
export const setUserOffline = async (userId) => {
  await updateUserPresence(userId, 'offline');
};

/**
 * Set user as in live session
 * @param {string} userId - User ID
 * @param {string} sessionId - Session ID
 * @param {string} sessionName - Session name
 */
export const setUserInLiveSession = async (userId, sessionId, sessionName) => {
  await updateUserPresence(userId, 'in_live_session', {
    sessionId,
    sessionName,
    joinedAt: new Date().toISOString()
  });
};

/**
 * Clean up all presence listeners
 */
export const cleanupPresenceListeners = () => {
  presenceListeners.forEach((unsubscribe) => {
    unsubscribe();
  });
  presenceListeners.clear();
};

/**
 * Initialize presence tracking for current user
 * @param {string} userId - Current user ID
 * @param {string} userRole - User role (student/teacher)
 */
export const initializePresenceTracking = (userId, userRole) => {
  if (!userId) return;

  // Set user as online
  updateUserPresence(userId, 'online', { role: userRole });

  // Update presence every 30 seconds to keep user "online"
  const presenceInterval = setInterval(() => {
    updateUserPresence(userId, 'online', { role: userRole });
  }, 30000);

  // Handle page visibility changes
  const handleVisibilityChange = () => {
    if (document.hidden) {
      // User switched tabs or minimized browser
      updateUserPresence(userId, 'online', { role: userRole, tabHidden: true });
    } else {
      // User returned to tab
      updateUserPresence(userId, 'online', { role: userRole, tabHidden: false });
    }
  };

  // Handle beforeunload (user closes tab/browser)
  const handleBeforeUnload = () => {
    setUserOffline(userId);
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('beforeunload', handleBeforeUnload);

  // Return cleanup function
  return () => {
    clearInterval(presenceInterval);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('beforeunload', handleBeforeUnload);
    setUserOffline(userId);
  };
}; 