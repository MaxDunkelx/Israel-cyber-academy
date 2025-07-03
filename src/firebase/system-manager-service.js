/**
 * System Manager Service
 * 
 * Provides comprehensive system management functionality including:
 * - Real-time analytics and statistics
 * - System monitoring and health checks
 * - Administrative operations
 * - Security event tracking
 * - User activity monitoring
 */

import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  serverTimestamp,
  onSnapshot,
  writeBatch,
  startAfter,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase-config.js';
import { logSecurityEvent } from '../utils/security';

// Cache for system statistics
let statsCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes

/**
 * Get comprehensive system statistics
 */
export const getSystemStats = async (forceRefresh = false) => {
  try {
    // Check cache first
    if (!forceRefresh && statsCache && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
      return statsCache;
    }

    // Get all collections in parallel
    const [usersSnapshot, lessonsSnapshot, sessionsSnapshot, activitiesSnapshot] = await Promise.all([
      getDocs(collection(db, 'users')),
      getDocs(collection(db, 'lessons')),
      getDocs(collection(db, 'sessions')),
      getDocs(query(collection(db, 'userActivities'), orderBy('timestamp', 'desc'), limit(100)))
    ]);

    // Process user statistics
    let totalUsers = 0;
    let totalStudents = 0;
    let totalTeachers = 0;
    let totalSystemManagers = 0;
    let activeUsers = 0;
    let newUsersThisWeek = 0;
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    usersSnapshot.forEach((doc) => {
      const userData = doc.data();
      totalUsers++;
      
      // Count by role
      switch (userData.role) {
        case 'student':
          totalStudents++;
          break;
        case 'teacher':
          totalTeachers++;
          break;
        case 'system_manager':
          totalSystemManagers++;
          break;
        default:
          totalStudents++;
          break;
      }

      // Count active users (logged in within last 24 hours)
      if (userData.lastLogin?.toDate?.() > new Date(Date.now() - 24 * 60 * 60 * 1000)) {
        activeUsers++;
      }

      // Count new users this week
      if (userData.createdAt?.toDate?.() > weekAgo) {
        newUsersThisWeek++;
      }
    });

    // Process lesson statistics
    const totalLessons = lessonsSnapshot.size;
    let totalSlides = 0;
    const lessonStats = [];

    for (const lessonDoc of lessonsSnapshot.docs) {
      const lessonData = lessonDoc.data();
      const slidesSnapshot = await getDocs(collection(db, 'slides'));
      const lessonSlides = slidesSnapshot.docs.filter(doc => doc.data().lessonId === lessonDoc.id);
      totalSlides += lessonSlides.length;
      
      lessonStats.push({
        id: lessonDoc.id,
        title: lessonData.title,
        slideCount: lessonSlides.length,
        difficulty: lessonData.difficulty,
        targetAge: lessonData.targetAge
      });
    }

    // Process session statistics
    const totalSessions = sessionsSnapshot.size;
    let activeSessions = 0;
    let completedSessions = 0;

    sessionsSnapshot.forEach((doc) => {
      const sessionData = doc.data();
      if (sessionData.status === 'active') {
        activeSessions++;
      } else if (sessionData.status === 'completed') {
        completedSessions++;
      }
    });

    // Process activity statistics
    const recentActivities = activitiesSnapshot.docs.slice(0, 10).map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        type: data.type || 'info',
        message: data.description || data.action,
        timestamp: data.timestamp?.toDate?.() || new Date(),
        userId: data.userId || data.userEmail,
        action: data.action || 'user_activity'
      };
    });

    // Calculate system health metrics
    const systemHealth = await getSystemHealth();

    const stats = {
      users: {
        total: totalUsers,
        students: totalStudents,
        teachers: totalTeachers,
        systemManagers: totalSystemManagers,
        active: activeUsers,
        newThisWeek: newUsersThisWeek,
        growthRate: totalUsers > 0 ? ((newUsersThisWeek / totalUsers) * 100).toFixed(1) : 0
      },
      content: {
        totalLessons,
        totalSlides,
        lessonStats,
        averageSlidesPerLesson: totalLessons > 0 ? (totalSlides / totalLessons).toFixed(1) : 0
      },
      sessions: {
        total: totalSessions,
        active: activeSessions,
        completed: completedSessions,
        completionRate: totalSessions > 0 ? ((completedSessions / totalSessions) * 100).toFixed(1) : 0
      },
      activities: {
        recent: recentActivities,
        totalToday: recentActivities.filter(a => 
          a.timestamp > new Date(Date.now() - 24 * 60 * 60 * 1000)
        ).length
      },
      system: systemHealth,
      lastUpdated: new Date()
    };

    // Cache the results
    statsCache = stats;
    cacheTimestamp = Date.now();

    return stats;

  } catch (error) {
    throw new Error('Failed to load system statistics');
  }
};

/**
 * Get system health status
 */
export const getSystemHealth = async () => {
  try {
    const healthChecks = await Promise.allSettled([
      // Database connectivity
      getDoc(doc(db, 'system', 'health')),
      // Auth service check
      getDocs(query(collection(db, 'users'), limit(1))),
      // Storage check (simplified)
      Promise.resolve(true),
      // Realtime check
      setDoc(doc(db, 'system', 'health-check'), { timestamp: serverTimestamp() })
    ]);

    const status = {
      database: healthChecks[0].status === 'fulfilled' ? 'online' : 'offline',
      auth: healthChecks[1].status === 'fulfilled' ? 'online' : 'offline',
      storage: healthChecks[2].status === 'fulfilled' ? 'online' : 'offline',
      realtime: healthChecks[3].status === 'fulfilled' ? 'online' : 'offline'
    };

    const allOnline = Object.values(status).every(s => s === 'online');
    
    return {
      status,
      overall: allOnline ? 'healthy' : 'degraded',
      lastChecked: new Date()
    };

  } catch (error) {
    return {
      status: {
        database: 'unknown',
        auth: 'unknown',
        storage: 'unknown',
        realtime: 'unknown'
      },
      overall: 'unknown',
      lastChecked: new Date()
    };
  }
};

/**
 * Get real-time system monitoring data
 */
export const getSystemMonitoring = async () => {
  try {
    // Get recent security events
    const securityEventsRef = collection(db, 'securityEvents');
    const securityQuery = query(securityEventsRef, orderBy('timestamp', 'desc'), limit(50));
    const securitySnapshot = await getDocs(securityQuery);

    // Get recent user activities
    const activitiesRef = collection(db, 'userActivities');
    const activitiesQuery = query(activitiesRef, orderBy('timestamp', 'desc'), limit(50));
    const activitiesSnapshot = await getDocs(activitiesQuery);

    // Get active sessions
    const sessionsRef = collection(db, 'sessions');
    const activeSessionsQuery = query(sessionsRef, where('status', '==', 'active'));
    const activeSessionsSnapshot = await getDocs(activeSessionsQuery);

    // Process monitoring data
    const monitoring = {
      security: {
        events: securitySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate?.() || new Date()
        })),
        criticalCount: securitySnapshot.docs.filter(doc => 
          doc.data().severity === 'critical'
        ).length,
        warningCount: securitySnapshot.docs.filter(doc => 
          doc.data().severity === 'warning'
        ).length
      },
      activities: {
        recent: activitiesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate?.() || new Date()
        })),
        totalToday: activitiesSnapshot.docs.filter(doc => 
          doc.data().timestamp?.toDate?.() > new Date(Date.now() - 24 * 60 * 60 * 1000)
        ).length
      },
      sessions: {
        active: activeSessionsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate?.() || new Date()
        })),
        count: activeSessionsSnapshot.size
      },
      lastUpdated: new Date()
    };

    return monitoring;

  } catch (error) {
    throw new Error('Failed to load system monitoring data');
  }
};

/**
 * Set up real-time system monitoring listener
 */
export const subscribeToSystemMonitoring = (callback) => {
  try {
    const unsubscribe = onSnapshot(
      collection(db, 'securityEvents'),
      (snapshot) => {
        const events = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate?.() || new Date()
        }));

        callback({
          type: 'security_events',
          data: events,
          timestamp: new Date()
        });
      },
      (error) => {
        }
    );

    return unsubscribe;
  } catch (error) {
    return () => {};
  }
};

/**
 * Get user analytics
 */
export const getUserAnalytics = async (timeRange = '7d') => {
  try {
    const now = new Date();
    let startDate;

    switch (timeRange) {
      case '24h':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // Get users created in time range
    const usersRef = collection(db, 'users');
    const usersQuery = query(
      usersRef,
      where('createdAt', '>=', Timestamp.fromDate(startDate)),
      orderBy('createdAt', 'desc')
    );
    const usersSnapshot = await getDocs(usersQuery);

    // Get user activities in time range
    const activitiesRef = collection(db, 'userActivities');
    const activitiesQuery = query(
      activitiesRef,
      where('timestamp', '>=', Timestamp.fromDate(startDate)),
      orderBy('timestamp', 'desc')
    );
    const activitiesSnapshot = await getDocs(activitiesQuery);

    // Process analytics
    const analytics = {
      timeRange,
      users: {
        new: usersSnapshot.size,
        byRole: {
          students: 0,
          teachers: 0,
          systemManagers: 0
        }
      },
      activities: {
        total: activitiesSnapshot.size,
        byType: {}
      },
      trends: {
        daily: [],
        weekly: []
      }
    };

    // Process user data
    usersSnapshot.forEach(doc => {
      const userData = doc.data();
      switch (userData.role) {
        case 'student':
          analytics.users.byRole.students++;
          break;
        case 'teacher':
          analytics.users.byRole.teachers++;
          break;
        case 'system_manager':
          analytics.users.byRole.systemManagers++;
          break;
      }
    });

    // Process activity data
    activitiesSnapshot.forEach(doc => {
      const activityData = doc.data();
      const type = activityData.type || activityData.action || 'unknown';
      analytics.activities.byType[type] = (analytics.activities.byType[type] || 0) + 1;
    });

    return analytics;

  } catch (error) {
    throw new Error('Failed to load user analytics');
  }
};

/**
 * Perform system maintenance operations
 */
export const performSystemMaintenance = async (operations = []) => {
  try {
    const batch = writeBatch(db);
    const results = [];

    for (const operation of operations) {
      try {
        switch (operation.type) {
          case 'cleanup_old_sessions':
            // Clean up sessions older than 30 days
            const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            const oldSessionsQuery = query(
              collection(db, 'sessions'),
              where('createdAt', '<', Timestamp.fromDate(thirtyDaysAgo))
            );
            const oldSessionsSnapshot = await getDocs(oldSessionsQuery);
            
            oldSessionsSnapshot.docs.forEach(doc => {
              batch.delete(doc.ref);
            });
            
            results.push({
              type: 'cleanup_old_sessions',
              status: 'success',
              count: oldSessionsSnapshot.size
            });
            break;

          case 'cleanup_old_logs':
            // Clean up logs older than 90 days
            const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
            const oldLogsQuery = query(
              collection(db, 'securityEvents'),
              where('timestamp', '<', Timestamp.fromDate(ninetyDaysAgo))
            );
            const oldLogsSnapshot = await getDocs(oldLogsQuery);
            
            oldLogsSnapshot.docs.forEach(doc => {
              batch.delete(doc.ref);
            });
            
            results.push({
              type: 'cleanup_old_logs',
              status: 'success',
              count: oldLogsSnapshot.size
            });
            break;

          default:
            results.push({
              type: operation.type,
              status: 'unknown_operation',
              error: 'Unknown maintenance operation'
            });
        }
      } catch (error) {
        results.push({
          type: operation.type,
          status: 'error',
          error: error.message
        });
      }
    }

    // Commit all changes
    await batch.commit();

    // Log maintenance event
    await logSecurityEvent({
      eventType: 'system_maintenance',
      description: `System maintenance performed: ${operations.map(op => op.type).join(', ')}`,
      severity: 'info',
      userId: 'system_manager'
    });

    return results;

  } catch (error) {
    throw new Error('Failed to perform system maintenance');
  }
};

/**
 * Export system data
 */
export const exportSystemData = async (dataType = 'all') => {
  try {
    const exportData = {};

    if (dataType === 'all' || dataType === 'users') {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      exportData.users = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || null,
        lastLogin: doc.data().lastLogin?.toDate?.() || null,
        updatedAt: doc.data().updatedAt?.toDate?.() || null
      }));
    }

    if (dataType === 'all' || dataType === 'lessons') {
      const lessonsSnapshot = await getDocs(collection(db, 'lessons'));
      exportData.lessons = lessonsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || null,
        updatedAt: doc.data().updatedAt?.toDate?.() || null
      }));
    }

    if (dataType === 'all' || dataType === 'sessions') {
      const sessionsSnapshot = await getDocs(collection(db, 'sessions'));
      exportData.sessions = sessionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || null,
        updatedAt: doc.data().updatedAt?.toDate?.() || null
      }));
    }

    if (dataType === 'all' || dataType === 'logs') {
      const logsSnapshot = await getDocs(collection(db, 'securityEvents'));
      exportData.logs = logsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.() || null
      }));
    }

    exportData.exportInfo = {
      timestamp: new Date(),
      dataType,
      totalRecords: Object.values(exportData).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0)
    };

    return exportData;

  } catch (error) {
    throw new Error('Failed to export system data');
  }
}; 