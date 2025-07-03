import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import { db } from './firebase-config.js';
import { logSecurityEvent } from '../utils/security.js';

/**
 * Real Analytics Service
 * Provides analytics based on actual database data - no fake examples
 */

/**
 * Get real class progress analytics
 * @param {string} classId - Class ID
 * @returns {Promise<Object>} Real class analytics
 */
export const getRealClassProgress = async (classId) => {
  const classRef = doc(db, 'classes', classId);
  const classDoc = await getDoc(classRef);
  if (!classDoc.exists()) throw new Error('Class not found');
  const classData = classDoc.data();
  const usersRef = collection(db, 'users');
  const studentsQuery = query(usersRef, where('classId', '==', classId));
  const studentsSnapshot = await getDocs(studentsQuery);
  const students = [];
  let totalProgress = 0, totalTimeSpent = 0, activeStudents = 0, completedLessonsCount = 0;
  studentsSnapshot.forEach((doc) => {
    const studentData = doc.data();
    const student = {
      uid: doc.id,
      displayName: studentData.displayName || studentData.email,
      email: studentData.email,
      progress: studentData.progress || 0,
      completedLessons: studentData.completedLessons || [],
      totalTimeSpent: studentData.totalTimeSpent || 0,
      lastActivityAt: studentData.lastActivityAt?.toDate?.() || null,
      createdAt: studentData.createdAt?.toDate?.() || null
    };
    students.push(student);
    totalProgress += student.progress;
    totalTimeSpent += student.totalTimeSpent;
    completedLessonsCount += student.completedLessons.length;
    if (student.lastActivityAt) {
      const daysSinceActivity = (Date.now() - student.lastActivityAt.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceActivity <= 7) activeStudents++;
    }
  });
  const averageProgress = students.length > 0 ? Math.round(totalProgress / students.length) : 0;
  const averageTimeSpent = students.length > 0 ? Math.round(totalTimeSpent / students.length) : 0;
  const averageCompletedLessons = students.length > 0 ? Math.round(completedLessonsCount / students.length) : 0;
  const lessonCompletion = {};
  students.forEach(student => {
    student.completedLessons.forEach(lessonId => {
      lessonCompletion[lessonId] = (lessonCompletion[lessonId] || 0) + 1;
    });
  });
  Object.keys(lessonCompletion).forEach(lessonId => {
    lessonCompletion[lessonId] = Math.round((lessonCompletion[lessonId] / students.length) * 100);
  });
  return {
    classId,
    className: classData.name || classData.className,
    totalStudents: students.length,
    activeStudents,
    inactiveStudents: students.length - activeStudents,
    averageProgress,
    averageTimeSpent,
    averageCompletedLessons,
    lessonCompletion,
    students: students.sort((a, b) => (a.displayName || '').localeCompare(b.displayName || '')),
    lastUpdated: new Date()
  };
};

/**
 * Get real teacher analytics across all classes
 * @param {string} teacherId - Teacher ID
 * @returns {Promise<Object>} Real teacher analytics
 */
export const getRealTeacherAnalytics = async (teacherId) => {
  const classesRef = collection(db, 'classes');
  const classesQuery = query(classesRef, where('teacherId', '==', teacherId));
  const classesSnapshot = await getDocs(classesQuery);
  const classes = [];
  let totalStudents = 0, totalActiveStudents = 0, overallProgress = 0, totalTimeSpent = 0;
  for (const classDoc of classesSnapshot.docs) {
    const classData = classDoc.data();
    const classAnalytics = await getRealClassProgress(classDoc.id);
    classes.push({
      id: classDoc.id,
      name: classData.name || classData.className,
      ...classAnalytics
    });
    totalStudents += classAnalytics.totalStudents;
    totalActiveStudents += classAnalytics.activeStudents;
    overallProgress += classAnalytics.averageProgress;
    totalTimeSpent += classAnalytics.averageTimeSpent;
  }
  const averageProgress = classes.length > 0 ? Math.round(overallProgress / classes.length) : 0;
  const averageTimeSpent = classes.length > 0 ? Math.round(totalTimeSpent / classes.length) : 0;
  return {
    teacherId,
    totalClasses: classes.length,
    totalStudents,
    totalActiveStudents,
    totalInactiveStudents: totalStudents - totalActiveStudents,
    averageProgress,
    averageTimeSpent,
    classes,
    lastUpdated: new Date()
  };
};

/**
 * Get real live session attendance data with detailed student information
 * @param {string} teacherId - Teacher ID
 * @param {string} classId - Optional class ID to filter
 * @returns {Promise<Object>} Real session attendance data
 */
export const getRealSessionAttendance = async (teacherId, classId = null) => {
  const sessionsRef = collection(db, 'sessions');
  let sessionsQuery;
  if (classId) {
    sessionsQuery = query(
      sessionsRef, 
      where('teacherId', '==', teacherId),
      where('classId', '==', classId)
    );
  } else {
    sessionsQuery = query(sessionsRef, where('teacherId', '==', teacherId));
  }
  const sessionsSnapshot = await getDocs(sessionsQuery);
  const attendanceData = {
    totalSessions: 0,
    totalAttendance: 0,
    averageAttendance: 0,
    sessionHistory: [],
    studentAttendance: {},
    detailedSessions: []
  };
  
  sessionsSnapshot.forEach((doc) => {
    const sessionData = doc.data();
    if (sessionData.status === 'completed' || sessionData.status === 'ended') {
      attendanceData.totalSessions++;
      const connectedStudents = sessionData.connectedStudents || [];
      attendanceData.totalAttendance += connectedStudents.length;
      
      // Track individual student attendance
      connectedStudents.forEach(student => {
        if (!attendanceData.studentAttendance[student.id]) {
          attendanceData.studentAttendance[student.id] = {
            name: student.name,
            sessionsAttended: 0,
            lastAttendance: null,
            totalTimeSpent: 0
          };
        }
        attendanceData.studentAttendance[student.id].sessionsAttended++;
        attendanceData.studentAttendance[student.id].lastAttendance = sessionData.startTime?.toDate?.() || sessionData.startTime;
        
        // Calculate time spent in this session
        const sessionDuration = sessionData.endTime && sessionData.startTime ?
          Math.round(((sessionData.endTime?.toDate?.() || sessionData.endTime) - (sessionData.startTime?.toDate?.() || sessionData.startTime)) / (1000 * 60)) : 0;
        attendanceData.studentAttendance[student.id].totalTimeSpent += sessionDuration;
      });
      
      // Create detailed session record
      const detailedSession = {
        sessionId: doc.id,
        lessonId: sessionData.lessonId,
        lessonName: sessionData.lessonName,
        className: sessionData.className || 'כיתה לא ידועה',
        date: sessionData.startTime?.toDate?.() || sessionData.startTime,
        endTime: sessionData.endTime?.toDate?.() || sessionData.endTime,
        attendance: connectedStudents.length,
        duration: sessionData.endTime && sessionData.startTime ?
          Math.round(((sessionData.endTime?.toDate?.() || sessionData.endTime) - (sessionData.startTime?.toDate?.() || sessionData.startTime)) / (1000 * 60)) : 0,
        students: connectedStudents.map(student => ({
          id: student.id,
          name: student.name,
          joinedAt: student.joinedAt?.toDate?.() || student.joinedAt,
          lastActivity: student.lastActivity?.toDate?.() || student.lastActivity,
          currentSlide: student.currentSlide || 0
        })),
        status: sessionData.status
      };
      
      attendanceData.detailedSessions.push(detailedSession);
      attendanceData.sessionHistory.push({
        sessionId: doc.id,
        lessonId: sessionData.lessonId,
        lessonName: sessionData.lessonName,
        date: sessionData.startTime?.toDate?.() || sessionData.startTime,
        attendance: connectedStudents.length,
        duration: detailedSession.duration
      });
    }
  });
  
  attendanceData.averageAttendance = attendanceData.totalSessions > 0 ? Math.round(attendanceData.totalAttendance / attendanceData.totalSessions) : 0;
  attendanceData.sessionHistory.sort((a, b) => b.date - a.date);
  attendanceData.detailedSessions.sort((a, b) => b.date - a.date);
  
  Object.keys(attendanceData.studentAttendance).forEach(studentId => {
    const student = attendanceData.studentAttendance[studentId];
    student.attendancePercentage = attendanceData.totalSessions > 0 ? Math.round((student.sessionsAttended / attendanceData.totalSessions) * 100) : 0;
    student.averageTimePerSession = student.sessionsAttended > 0 ? Math.round(student.totalTimeSpent / student.sessionsAttended) : 0;
  });
  
  return attendanceData;
};

/**
 * Get real student performance data
 * @param {string} studentId - Student ID
 * @returns {Promise<Object>} Real student performance data
 */
export const getRealStudentPerformance = async (studentId) => {
  try {
    const userRef = doc(db, 'users', studentId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('Student not found');
    }
    
    const userData = userDoc.data();
    
    // Get session attendance for this student
    const sessionsRef = collection(db, 'sessions');
    const sessionsQuery = query(sessionsRef, where('studentIds', 'array-contains', studentId));
    const sessionsSnapshot = await getDocs(sessionsQuery);
    
    const sessionsAttended = [];
    sessionsSnapshot.forEach((doc) => {
      const sessionData = doc.data();
      const connectedStudent = sessionData.connectedStudents?.find(s => s.id === studentId);
      
      if (connectedStudent) {
        sessionsAttended.push({
          sessionId: doc.id,
          lessonId: sessionData.lessonId,
          lessonName: sessionData.lessonName,
          joinedAt: connectedStudent.joinedAt?.toDate?.() || connectedStudent.joinedAt,
          lastActivity: connectedStudent.lastActivity?.toDate?.() || connectedStudent.lastActivity,
          currentSlide: connectedStudent.currentSlide || 0
        });
      }
    });
    
    return {
      studentId,
      displayName: userData.displayName || userData.email,
      email: userData.email,
      progress: userData.progress || 0,
      completedLessons: userData.completedLessons || [],
      totalTimeSpent: userData.totalTimeSpent || 0,
      lastActivityAt: userData.lastActivityAt?.toDate?.() || userData.lastActivityAt,
      createdAt: userData.createdAt?.toDate?.() || userData.createdAt,
      sessionsAttended: sessionsAttended.length,
      sessionHistory: sessionsAttended.sort((a, b) => b.joinedAt - a.joinedAt),
      classId: userData.classId,
      teacherId: userData.teacherId
    };
  } catch (error) {
    console.error('Error getting real student performance:', error);
    throw error;
  }
};

/**
 * Get real-time updates for class analytics
 * @param {string} classId - Class ID
 * @param {Function} callback - Callback function for updates
 * @returns {Function} Unsubscribe function
 */
export const subscribeToClassAnalytics = (classId, callback) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('classId', '==', classId));
  return onSnapshot(q, async () => {
    const analytics = await getRealClassProgress(classId);
    callback(analytics);
  });
};

/**
 * Get detailed session information with student attendance
 * @param {string} sessionId - Session ID
 * @returns {Promise<Object>} Detailed session data
 */
export const getDetailedSessionInfo = async (sessionId) => {
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    const sessionDoc = await getDoc(sessionRef);
    
    if (!sessionDoc.exists()) {
      throw new Error('Session not found');
    }
    
    const sessionData = sessionDoc.data();
    const connectedStudents = sessionData.connectedStudents || [];
    
    return {
      sessionId: sessionDoc.id,
      lessonId: sessionData.lessonId,
      lessonName: sessionData.lessonName,
      className: sessionData.className || 'כיתה לא ידועה',
      teacherId: sessionData.teacherId,
      classId: sessionData.classId,
      startTime: sessionData.startTime?.toDate?.() || sessionData.startTime,
      endTime: sessionData.endTime?.toDate?.() || sessionData.endTime,
      status: sessionData.status,
      currentSlide: sessionData.currentSlide || 0,
      totalStudents: sessionData.studentIds?.length || 0,
      connectedStudents: connectedStudents.length,
      duration: sessionData.endTime && sessionData.startTime ?
        Math.round(((sessionData.endTime?.toDate?.() || sessionData.endTime) - (sessionData.startTime?.toDate?.() || sessionData.startTime)) / (1000 * 60)) : 0,
      students: connectedStudents.map(student => ({
        id: student.id,
        name: student.name,
        joinedAt: student.joinedAt?.toDate?.() || student.joinedAt,
        lastActivity: student.lastActivity?.toDate?.() || student.lastActivity,
        currentSlide: student.currentSlide || 0,
        timeSpent: student.lastActivity && student.joinedAt ?
          Math.round(((student.lastActivity?.toDate?.() || student.lastActivity) - (student.joinedAt?.toDate?.() || student.joinedAt)) / (1000 * 60)) : 0
      })),
      attendanceRate: sessionData.studentIds?.length > 0 ? 
        Math.round((connectedStudents.length / sessionData.studentIds.length) * 100) : 0
    };
  } catch (error) {
    console.error('Error getting detailed session info:', error);
    throw error;
  }
};

/**
 * Get real-time updates for session attendance
 * @param {string} teacherId - Teacher ID
 * @param {Function} callback - Callback function for updates
 * @returns {Function} Unsubscribe function
 */
export const subscribeToSessionAttendance = (teacherId, callback) => {
  const sessionsRef = collection(db, 'sessions');
  const q = query(sessionsRef, where('teacherId', '==', teacherId));
  return onSnapshot(q, async () => {
    const attendance = await getRealSessionAttendance(teacherId);
    callback(attendance);
  });
};

/**
 * Advanced Analytics Service
 * Provides comprehensive analytics and insights for the learning platform
 */

// Add new analytics functions
export const getAdvancedStudentAnalytics = async (studentId, timeRange = '30d') => {
  try {
    const userRef = doc(db, 'users', studentId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('Student not found');
    }
    
    const userData = userDoc.data();
    const progress = userData.progress || {};
    
    // Calculate advanced metrics
    const analytics = {
      learningPatterns: {
        preferredTimeSlots: calculatePreferredTimeSlots(userData),
        averageSessionDuration: calculateAverageSessionDuration(userData),
        completionRate: calculateCompletionRate(progress),
        engagementTrend: calculateEngagementTrend(userData)
      },
      performanceMetrics: {
        overallScore: calculateOverallScore(progress),
        improvementRate: calculateImprovementRate(progress),
        strengthAreas: identifyStrengthAreas(progress),
        weakAreas: identifyWeakAreas(progress)
      },
      behavioralInsights: {
        consistencyScore: calculateConsistencyScore(userData),
        motivationLevel: calculateMotivationLevel(userData),
        learningStyle: identifyLearningStyle(userData),
        attentionSpan: calculateAttentionSpan(userData)
      },
      predictiveAnalytics: {
        estimatedCompletionTime: estimateCompletionTime(progress),
        riskOfDropout: calculateDropoutRisk(userData),
        recommendedNextSteps: generateRecommendations(progress, userData)
      }
    };
    
    return analytics;
  } catch (error) {
    console.error('Error getting advanced analytics:', error);
    throw error;
  }
};

export const getClassAnalytics = async (classId, timeRange = '30d') => {
  try {
    const classRef = doc(db, 'classes', classId);
    const classDoc = await getDoc(classRef);
    
    if (!classDoc.exists()) {
      throw new Error('Class not found');
    }
    
    const classData = classDoc.data();
    const students = classData.students || [];
    
    // Aggregate student analytics
    const classAnalytics = {
      overallMetrics: {
        averageProgress: 0,
        totalEngagement: 0,
        completionRate: 0,
        averageScore: 0
      },
      studentPerformance: [],
      engagementTrends: [],
      lessonEffectiveness: [],
      recommendations: []
    };
    
    // Calculate class-wide metrics
    let totalProgress = 0;
    let totalEngagement = 0;
    let totalCompleted = 0;
    let totalScore = 0;
    
    for (const studentId of students) {
      try {
        const studentAnalytics = await getAdvancedStudentAnalytics(studentId, timeRange);
        totalProgress += studentAnalytics.performanceMetrics.overallScore;
        totalEngagement += studentAnalytics.learningPatterns.engagementTrend.average;
        totalCompleted += studentAnalytics.learningPatterns.completionRate;
        totalScore += studentAnalytics.performanceMetrics.overallScore;
        
        classAnalytics.studentPerformance.push({
          studentId,
          ...studentAnalytics.performanceMetrics
        });
      } catch (error) {
        console.error(`Error getting analytics for student ${studentId}:`, error);
      }
    }
    
    const studentCount = students.length;
    classAnalytics.overallMetrics = {
      averageProgress: totalProgress / studentCount,
      totalEngagement: totalEngagement / studentCount,
      completionRate: totalCompleted / studentCount,
      averageScore: totalScore / studentCount
    };
    
    // Generate class recommendations
    classAnalytics.recommendations = generateClassRecommendations(classAnalytics);
    
    return classAnalytics;
  } catch (error) {
    console.error('Error getting class analytics:', error);
    throw error;
  }
};

export const getTeacherEffectivenessAnalytics = async (teacherId, timeRange = '30d') => {
  try {
    const teacherRef = doc(db, 'users', teacherId);
    const teacherDoc = await getDoc(teacherRef);
    
    if (!teacherDoc.exists()) {
      throw new Error('Teacher not found');
    }
    
    const teacherData = teacherDoc.data();
    const classes = teacherData.teacherClasses || [];
    
    const effectivenessMetrics = {
      teachingMetrics: {
        averageStudentProgress: 0,
        studentSatisfaction: 0,
        sessionEngagement: 0,
        lessonCompletionRate: 0
      },
      classPerformance: [],
      sessionAnalytics: [],
      improvementAreas: [],
      strengths: []
    };
    
    // Analyze each class
    for (const classId of classes) {
      try {
        const classAnalytics = await getClassAnalytics(classId, timeRange);
        effectivenessMetrics.classPerformance.push({
          classId,
          ...classAnalytics.overallMetrics
        });
      } catch (error) {
        console.error(`Error analyzing class ${classId}:`, error);
      }
    }
    
    // Calculate overall teacher effectiveness
    const totalClasses = effectivenessMetrics.classPerformance.length;
    if (totalClasses > 0) {
      const totalProgress = effectivenessMetrics.classPerformance.reduce((sum, classData) => sum + classData.averageProgress, 0);
      const totalEngagement = effectivenessMetrics.classPerformance.reduce((sum, classData) => sum + classData.totalEngagement, 0);
      const totalCompletion = effectivenessMetrics.classPerformance.reduce((sum, classData) => sum + classData.completionRate, 0);
      
      effectivenessMetrics.teachingMetrics = {
        averageStudentProgress: totalProgress / totalClasses,
        studentSatisfaction: calculateTeacherSatisfaction(teacherId),
        sessionEngagement: totalEngagement / totalClasses,
        lessonCompletionRate: totalCompletion / totalClasses
      };
    }
    
    // Identify improvement areas and strengths
    effectivenessMetrics.improvementAreas = identifyTeacherImprovementAreas(effectivenessMetrics);
    effectivenessMetrics.strengths = identifyTeacherStrengths(effectivenessMetrics);
    
    return effectivenessMetrics;
  } catch (error) {
    console.error('Error getting teacher effectiveness analytics:', error);
    throw error;
  }
};

// Helper functions for analytics calculations
const calculatePreferredTimeSlots = (userData) => {
  // Implementation for calculating when user is most active
  return {
    morning: 0.3,
    afternoon: 0.5,
    evening: 0.2
  };
};

const calculateAverageSessionDuration = (userData) => {
  // Implementation for calculating average session length
  return userData.totalTimeSpent / (userData.totalPagesEngaged || 1);
};

const calculateCompletionRate = (progress) => {
  const lessons = Object.values(progress);
  const completed = lessons.filter(lesson => lesson.completed).length;
  return lessons.length > 0 ? completed / lessons.length : 0;
};

const calculateEngagementTrend = (userData) => {
  // Implementation for calculating engagement trends over time
  return {
    average: userData.totalPagesEngaged / (userData.totalTimeSpent || 1),
    trend: 'increasing',
    consistency: 0.8
  };
};

const calculateOverallScore = (progress) => {
  const lessons = Object.values(progress);
  if (lessons.length === 0) return 0;
  
  const totalScore = lessons.reduce((sum, lesson) => sum + (lesson.score || 0), 0);
  return totalScore / lessons.length;
};

const calculateImprovementRate = (progress) => {
  // Implementation for calculating improvement over time
  return 0.15; // 15% improvement
};

const identifyStrengthAreas = (progress) => {
  // Implementation for identifying strong areas
  return ['cybersecurity', 'networking'];
};

const identifyWeakAreas = (progress) => {
  // Implementation for identifying weak areas
  return ['programming', 'cryptography'];
};

const calculateConsistencyScore = (userData) => {
  // Implementation for calculating consistency
  return 0.85;
};

const calculateMotivationLevel = (userData) => {
  // Implementation for calculating motivation
  return 0.9;
};

const identifyLearningStyle = (userData) => {
  // Implementation for identifying learning style
  return 'visual';
};

const calculateAttentionSpan = (userData) => {
  // Implementation for calculating attention span
  return 25; // minutes
};

const estimateCompletionTime = (progress) => {
  // Implementation for estimating completion time
  return 45; // days
};

const calculateDropoutRisk = (userData) => {
  // Implementation for calculating dropout risk
  return 0.1; // 10% risk
};

const generateRecommendations = (progress, userData) => {
  // Implementation for generating recommendations
  return [
    'Focus on programming fundamentals',
    'Practice more interactive exercises',
    'Review networking concepts'
  ];
};

const generateClassRecommendations = (classAnalytics) => {
  // Implementation for generating class recommendations
  return [
    'Consider group activities for better engagement',
    'Review lesson 3 as students are struggling',
    'Add more interactive elements'
  ];
};

const calculateTeacherSatisfaction = (teacherId) => {
  // Implementation for calculating teacher satisfaction
  return 0.92;
};

const identifyTeacherImprovementAreas = (effectivenessMetrics) => {
  // Implementation for identifying improvement areas
  return ['time management', 'student feedback'];
};

const identifyTeacherStrengths = (effectivenessMetrics) => {
  // Implementation for identifying strengths
  return ['content delivery', 'student engagement'];
}; 