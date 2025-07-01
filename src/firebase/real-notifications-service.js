import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  onSnapshot,
  serverTimestamp,
  addDoc,
  updateDoc
} from 'firebase/firestore';
import { db } from './firebase-config.js';
import { logSecurityEvent } from '../utils/security.js';

/**
 * Real Notifications Service
 * Provides real-time notifications based on actual database events - no fake data
 */

/**
 * Get real student activity notifications for a teacher
 * @param {string} teacherId - Teacher ID
 * @returns {Promise<Array>} Real notifications based on actual student activity
 */
export const getRealStudentNotifications = async (teacherId) => {
  try {
    // Get all classes for this teacher
    const classesRef = collection(db, 'classes');
    const classesQuery = query(classesRef, where('teacherId', '==', teacherId));
    const classesSnapshot = await getDocs(classesQuery);
    
    const notifications = [];
    
    for (const classDoc of classesSnapshot.docs) {
      const classData = classDoc.data();
      const classId = classDoc.id;
      
      // Get students in this class
      const usersRef = collection(db, 'users');
      const studentsQuery = query(usersRef, where('classId', '==', classId));
      const studentsSnapshot = await getDocs(studentsQuery);
      
      studentsSnapshot.forEach((studentDoc) => {
        const studentData = studentDoc.data();
        const studentId = studentDoc.id;
        
        // Check for recent activity (last 24 hours)
        if (studentData.lastActivityAt) {
          const lastActivity = studentData.lastActivityAt.toDate ? 
            studentData.lastActivityAt.toDate() : new Date(studentData.lastActivityAt);
          
          const hoursSinceActivity = (Date.now() - lastActivity.getTime()) / (1000 * 60 * 60);
          
          if (hoursSinceActivity <= 24) {
            // Student was active recently
            notifications.push({
              id: `activity_${studentId}_${Date.now()}`,
              type: 'student_activity',
              title: 'פעילות תלמיד',
              message: `${studentData.displayName || studentData.email} היה פעיל לאחרונה`,
              studentId: studentId,
              studentName: studentData.displayName || studentData.email,
              classId: classId,
              className: classData.name || classData.className,
              timestamp: lastActivity,
              priority: 'low'
            });
          }
        }
        
        // Check for lesson completions
        if (studentData.completedLessons && studentData.completedLessons.length > 0) {
          const completedLessons = studentData.completedLessons;
          const lastCompletedLesson = completedLessons[completedLessons.length - 1];
          
          notifications.push({
            id: `completion_${studentId}_${lastCompletedLesson}`,
            type: 'lesson_completion',
            title: 'שיעור הושלם',
            message: `${studentData.displayName || studentData.email} השלים שיעור ${lastCompletedLesson}`,
            studentId: studentId,
            studentName: studentData.displayName || studentData.email,
            classId: classId,
            className: classData.name || classData.className,
            lessonId: lastCompletedLesson,
            timestamp: new Date(),
            priority: 'medium'
          });
        }
        
        // Check for inactive students (no activity for 7+ days)
        if (studentData.lastActivityAt) {
          const lastActivity = studentData.lastActivityAt.toDate ? 
            studentData.lastActivityAt.toDate() : new Date(studentData.lastActivityAt);
          
          const daysSinceActivity = (Date.now() - lastActivity.getTime()) / (1000 * 60 * 60 * 24);
          
          if (daysSinceActivity >= 7) {
            notifications.push({
              id: `inactive_${studentId}_${Date.now()}`,
              type: 'student_inactive',
              title: 'תלמיד לא פעיל',
              message: `${studentData.displayName || studentData.email} לא היה פעיל במשך ${Math.floor(daysSinceActivity)} ימים`,
              studentId: studentId,
              studentName: studentData.displayName || studentData.email,
              classId: classId,
              className: classData.name || classData.className,
              daysInactive: Math.floor(daysSinceActivity),
              timestamp: lastActivity,
              priority: 'high'
            });
          }
        }
      });
    }
    
    // Sort by timestamp (newest first)
    notifications.sort((a, b) => b.timestamp - a.timestamp);
    
    return notifications.slice(0, 20); // Return last 20 notifications
  } catch (error) {
    console.error('Error getting real student notifications:', error);
    throw error;
  }
};

/**
 * Get real session notifications for a teacher
 * @param {string} teacherId - Teacher ID
 * @returns {Promise<Array>} Real session-based notifications
 */
export const getRealSessionNotifications = async (teacherId) => {
  try {
    // Get recent sessions for this teacher
    const sessionsRef = collection(db, 'sessions');
    const sessionsQuery = query(sessionsRef, where('teacherId', '==', teacherId));
    const sessionsSnapshot = await getDocs(sessionsQuery);
    
    const notifications = [];
    
    sessionsSnapshot.forEach((sessionDoc) => {
      const sessionData = sessionDoc.data();
      const sessionId = sessionDoc.id;
      
      // Check for active sessions
      if (sessionData.status === 'active') {
        const connectedStudents = sessionData.connectedStudents || [];
        
        notifications.push({
          id: `session_active_${sessionId}`,
          type: 'session_active',
          title: 'שיעור פעיל',
          message: `שיעור ${sessionData.lessonName || sessionData.lessonId} פעיל עם ${connectedStudents.length} תלמידים`,
          sessionId: sessionId,
          lessonId: sessionData.lessonId,
          lessonName: sessionData.lessonName,
          connectedStudents: connectedStudents.length,
          startTime: sessionData.startTime?.toDate?.() || sessionData.startTime,
          timestamp: new Date(),
          priority: 'high'
        });
      }
      
      // Check for recently ended sessions
      if (sessionData.status === 'completed' || sessionData.status === 'ended') {
        const endTime = sessionData.endTime?.toDate?.() || sessionData.endTime;
        const hoursSinceEnd = endTime ? (Date.now() - endTime.getTime()) / (1000 * 60 * 60) : 0;
        
        if (hoursSinceEnd <= 24) {
          const connectedStudents = sessionData.connectedStudents || [];
          
          notifications.push({
            id: `session_ended_${sessionId}`,
            type: 'session_ended',
            title: 'שיעור הסתיים',
            message: `שיעור ${sessionData.lessonName || sessionData.lessonId} הסתיים עם ${connectedStudents.length} תלמידים`,
            sessionId: sessionId,
            lessonId: sessionData.lessonId,
            lessonName: sessionData.lessonName,
            connectedStudents: connectedStudents.length,
            endTime: endTime,
            timestamp: endTime,
            priority: 'medium'
          });
        }
      }
    });
    
    // Sort by timestamp (newest first)
    notifications.sort((a, b) => b.timestamp - a.timestamp);
    
    return notifications.slice(0, 10); // Return last 10 session notifications
  } catch (error) {
    console.error('Error getting real session notifications:', error);
    throw error;
  }
};

/**
 * Get real class performance notifications
 * @param {string} teacherId - Teacher ID
 * @returns {Promise<Array>} Real class performance notifications
 */
export const getRealClassNotifications = async (teacherId) => {
  try {
    // Get all classes for this teacher
    const classesRef = collection(db, 'classes');
    const classesQuery = query(classesRef, where('teacherId', '==', teacherId));
    const classesSnapshot = await getDocs(classesQuery);
    
    const notifications = [];
    
    for (const classDoc of classesSnapshot.docs) {
      const classData = classDoc.data();
      const classId = classDoc.id;
      
      // Get students in this class
      const usersRef = collection(db, 'users');
      const studentsQuery = query(usersRef, where('classId', '==', classId));
      const studentsSnapshot = await getDocs(studentsQuery);
      
      const students = [];
      let totalProgress = 0;
      let activeStudents = 0;
      
      studentsSnapshot.forEach((studentDoc) => {
        const studentData = studentDoc.data();
        students.push(studentData);
        
        totalProgress += studentData.progress || 0;
        
        // Check if student is active
        if (studentData.lastActivityAt) {
          const lastActivity = studentData.lastActivityAt.toDate ? 
            studentData.lastActivityAt.toDate() : new Date(studentData.lastActivityAt);
          
          const daysSinceActivity = (Date.now() - lastActivity.getTime()) / (1000 * 60 * 60 * 24);
          if (daysSinceActivity <= 7) {
            activeStudents++;
          }
        }
      });
      
      const averageProgress = students.length > 0 ? Math.round(totalProgress / students.length) : 0;
      const activePercentage = students.length > 0 ? Math.round((activeStudents / students.length) * 100) : 0;
      
      // Notify about low class activity
      if (activePercentage < 50 && students.length > 0) {
        notifications.push({
          id: `class_low_activity_${classId}`,
          type: 'class_low_activity',
          title: 'פעילות נמוכה בכיתה',
          message: `כיתה ${classData.name || classData.className}: רק ${activePercentage}% מהתלמידים פעילים`,
          classId: classId,
          className: classData.name || classData.className,
          activeStudents: activeStudents,
          totalStudents: students.length,
          activePercentage: activePercentage,
          timestamp: new Date(),
          priority: 'high'
        });
      }
      
      // Notify about low progress
      if (averageProgress < 30 && students.length > 0) {
        notifications.push({
          id: `class_low_progress_${classId}`,
          type: 'class_low_progress',
          title: 'התקדמות נמוכה בכיתה',
          message: `כיתה ${classData.name || classData.className}: התקדמות ממוצעת ${averageProgress}%`,
          classId: classId,
          className: classData.name || classData.className,
          averageProgress: averageProgress,
          totalStudents: students.length,
          timestamp: new Date(),
          priority: 'medium'
        });
      }
    }
    
    // Sort by timestamp (newest first)
    notifications.sort((a, b) => b.timestamp - a.timestamp);
    
    return notifications.slice(0, 10); // Return last 10 class notifications
  } catch (error) {
    console.error('Error getting real class notifications:', error);
    throw error;
  }
};

/**
 * Get all real notifications for a teacher
 * @param {string} teacherId - Teacher ID
 * @returns {Promise<Object>} All real notifications
 */
export const getAllRealNotifications = async (teacherId) => {
  try {
    const [studentNotifications, sessionNotifications, classNotifications] = await Promise.all([
      getRealStudentNotifications(teacherId),
      getRealSessionNotifications(teacherId),
      getRealClassNotifications(teacherId)
    ]);
    
    // Combine all notifications
    const allNotifications = [
      ...studentNotifications,
      ...sessionNotifications,
      ...classNotifications
    ];
    
    // Sort by timestamp (newest first)
    allNotifications.sort((a, b) => b.timestamp - a.timestamp);
    
    return {
      student: studentNotifications,
      session: sessionNotifications,
      class: classNotifications,
      all: allNotifications.slice(0, 30) // Return last 30 notifications total
    };
  } catch (error) {
    console.error('Error getting all real notifications:', error);
    throw error;
  }
};

/**
 * Subscribe to real-time notifications for a teacher
 * @param {string} teacherId - Teacher ID
 * @param {Function} callback - Callback function for updates
 * @returns {Function} Unsubscribe function
 */
export const subscribeToRealNotifications = (teacherId, callback) => {
  // Subscribe to multiple collections for real-time updates
  const unsubscribers = [];
  
  // Subscribe to user changes (student activity)
  const usersRef = collection(db, 'users');
  const unsub1 = onSnapshot(usersRef, async (snapshot) => {
    try {
      const notifications = await getAllRealNotifications(teacherId);
      callback(notifications);
    } catch (error) {
      console.error('Error in notifications subscription:', error);
    }
  });
  
  // Subscribe to session changes
  const sessionsRef = collection(db, 'sessions');
  const sessionsQuery = query(sessionsRef, where('teacherId', '==', teacherId));
  const unsub2 = onSnapshot(sessionsQuery, async (snapshot) => {
    try {
      const notifications = await getAllRealNotifications(teacherId);
      callback(notifications);
    } catch (error) {
      console.error('Error in notifications subscription:', error);
    }
  });
  
  unsubscribers.push(unsub1, unsub2);
  
  // Return unsubscribe function
  return () => {
    unsubscribers.forEach(unsub => unsub());
  };
};

/**
 * Mark notification as read
 * @param {string} notificationId - Notification ID
 * @param {string} teacherId - Teacher ID
 * @returns {Promise<void>}
 */
export const markNotificationAsRead = async (notificationId, teacherId) => {
  try {
    // Store read notifications in Firestore
    const readNotificationsRef = collection(db, 'readNotifications');
    await addDoc(readNotificationsRef, {
      notificationId,
      teacherId,
      readAt: serverTimestamp()
    });
    
    logSecurityEvent('NOTIFICATION_MARKED_READ', {
      notificationId,
      teacherId,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
}; 