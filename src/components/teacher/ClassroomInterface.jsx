import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import { 
  Users, 
  BookOpen, 
  Clock, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Eye,
  EyeOff,
  Filter,
  Search,
  RefreshCw,
  BarChart3,
  Calendar,
  Activity,
  Target,
  Award,
  UserCheck,
  UserX,
  Wifi,
  WifiOff,
  MessageSquare,
  Settings,
  ChevronDown,
  ChevronUp,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Bell,
  BellOff,
  Volume2,
  VolumeX,
  Play,
  Unlock
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { isTeacher, validateTeacherAccess, logSecurityEvent } from '../../utils/security';
import { formatTimestamp } from '../../utils/helpers';
import { 
  getTeacherClasses, 
  getClassStudents, 
  getTeacherAnalytics,
  getTeacherRecentActivities,
  logTeacherActivity
} from '../../firebase/teacher-service';
import { getAllLessonsWithSlideCounts } from '../../firebase/content-service';
import { listenToSession } from '../../firebase/session-service';
import { listenToMultipleUsersPresence } from '../../firebase/presence-service';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const ClassroomInterface = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [students, setStudents] = useState({});
  const [analytics, setAnalytics] = useState({});
  const [recentActivities, setRecentActivities] = useState([]);
  const [activeSessions, setActiveSessions] = useState({});
  const [userPresence, setUserPresence] = useState({});
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showOfflineStudents, setShowOfflineStudents] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [error, setError] = useState(null);
  const [expandedClasses, setExpandedClasses] = useState(new Set());

  useEffect(() => {
    if (!currentUser) {
      logSecurityEvent('UNAUTHORIZED_ACCESS_ATTEMPT', { role: 'none' }, { component: 'ClassroomInterface' });
      return;
    }

    const validation = validateTeacherAccess({ role: 'teacher' }, 'view_classrooms');
    if (!validation.success) {
      logSecurityEvent('INSUFFICIENT_PERMISSIONS', { role: 'teacher', uid: currentUser.uid }, { 
        component: 'ClassroomInterface',
        reason: validation.message 
      });
      toast.error('אין לך הרשאות לצפייה בכיתות');
      return;
    }

    loadClassroomData();
    setupRealTimeListeners();
  }, [currentUser]);

  const loadClassroomData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load teacher's classes and lessons
      const [teacherClasses, lessonsDataRaw] = await Promise.all([
        getTeacherClasses(currentUser.uid),
        getAllLessonsWithSlideCounts()
      ]);
      
      // Sort lessons by order or originalId
      const lessonsData = lessonsDataRaw.slice().sort((a, b) => {
        const orderA = a.order ?? a.originalId ?? 0;
        const orderB = b.order ?? b.originalId ?? 0;
        if (orderA !== orderB) return orderA - orderB;
        return (a.title || '').localeCompare(b.title || '');
      });
      
      setClasses(teacherClasses);
      setLessons(lessonsData);

      // Load students for each class
      const studentsData = {};
      for (const classData of teacherClasses) {
        try {
          const classStudents = await getClassStudents(classData.id);
          // Ensure each student has valid data
          const validStudents = classStudents.map(student => ({
            uid: student.uid || 'unknown',
            displayName: student.displayName || student.email || 'תלמיד ללא שם',
            email: student.email || '',
            role: student.role || 'student',
            classId: student.classId || classData.id,
            progress: typeof student.progress === 'number' ? student.progress : 0,
            completedLessons: Array.isArray(student.completedLessons) ? student.completedLessons : [],
            totalTimeSpent: typeof student.totalTimeSpent === 'number' ? student.totalTimeSpent : 0,
            lastActivityAt: student.lastActivityAt || null,
            createdAt: student.createdAt || new Date().toISOString()
          }));
          studentsData[classData.id] = validStudents;
        } catch (error) {
          console.error(`Error loading students for class ${classData.id}:`, error);
          studentsData[classData.id] = [];
        }
      }
      setStudents(studentsData);

      // Load analytics
      const analyticsData = await getTeacherAnalytics(currentUser.uid);
      setAnalytics(analyticsData);

      // Load recent activities
      const activities = await getTeacherRecentActivities(currentUser.uid, 20);
      setRecentActivities(activities);

      setLoading(false);
    } catch (error) {
      console.error('Error loading classroom data:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const setupRealTimeListeners = () => {
    // Listen to active sessions
    const unsubscribeSessions = listenToActiveSessions();
    
    // Listen to user presence for all students
    const allStudentIds = Object.values(students).flat().map(student => student.uid);
    const unsubscribePresence = listenToMultipleUsersPresence(allStudentIds, (presenceData) => {
      console.log('📡 User presence updated:', presenceData);
      setUserPresence(presenceData);
    });
    
    return () => {
      if (unsubscribeSessions) unsubscribeSessions();
      if (unsubscribePresence) unsubscribePresence();
    };
  };

  const listenToActiveSessions = () => {
    if (!currentUser?.uid) return null;

    console.log('🔍 Setting up active sessions listener for teacher:', currentUser.uid);
    
    // Get active sessions for this teacher
    const sessionsRef = collection(db, 'sessions');
    const q = query(
      sessionsRef,
      where('teacherId', '==', currentUser.uid),
      where('status', '==', 'active')
    );
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const sessions = {};
      
      querySnapshot.forEach((doc) => {
        const sessionData = doc.data();
        // Group sessions by classId
        if (sessionData.classId) {
          sessions[sessionData.classId] = {
            id: doc.id,
            ...sessionData
          };
        }
      });
      
      console.log('📡 Active sessions updated:', Object.keys(sessions).length, 'sessions');
      setActiveSessions(sessions);
    }, (error) => {
      console.error('Error listening to active sessions:', error);
    });

    return unsubscribe;
  };

  const toggleClassExpansion = (classId) => {
    const newExpanded = new Set(expandedClasses);
    if (newExpanded.has(classId)) {
      newExpanded.delete(classId);
    } else {
      newExpanded.add(classId);
    }
    setExpandedClasses(newExpanded);
  };

  const getStudentStatus = (student, classId) => {
    // First check if student is in a live session
    const session = activeSessions[classId];
    if (session) {
      const isInLiveSession = session.connectedStudents && 
        session.connectedStudents.some(connectedStudent => 
          connectedStudent.id === student.uid || connectedStudent === student.uid
        );
      
      if (isInLiveSession) {
        return 'in_live_session';
      }
    }
    
    // Check general presence status
    const presence = userPresence[student.uid];
    if (presence) {
      return presence.status; // 'online', 'offline', or 'in_live_session'
    }
    
    // Default to offline if no presence data
    return 'offline';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />;
      case 'in_live_session':
        return <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />;
      case 'offline':
        return <div className="w-3 h-3 bg-gray-500 rounded-full" />;
      default:
        return <div className="w-3 h-3 bg-gray-500 rounded-full" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online':
        return 'מחובר';
      case 'in_live_session':
        return 'בשיעור חי';
      case 'offline':
        return 'מנותק';
      default:
        return 'לא ידוע';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'text-green-400';
      case 'in_live_session':
        return 'text-blue-400';
      case 'offline':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  const filteredClasses = classes.filter(classData => {
    if (searchTerm && !classData.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (filterStatus !== 'all') {
      const hasActiveSession = activeSessions[classData.id];
      if (filterStatus === 'active' && !hasActiveSession) return false;
      if (filterStatus === 'inactive' && hasActiveSession) return false;
    }
    return true;
  });

  const getClassProgress = (classData) => {
    const classStudents = students[classData.id] || [];
    if (classStudents.length === 0) return 0;
    
    const totalProgress = classStudents.reduce((sum, student) => {
      // Handle case where progress might be an object or undefined
      let studentProgress = 0;
      if (typeof student.progress === 'number') {
        studentProgress = student.progress;
      } else if (student.progress && typeof student.progress === 'object') {
        // If progress is an object, try to calculate average or use a default
        const progressValues = Object.values(student.progress).filter(v => typeof v === 'number');
        studentProgress = progressValues.length > 0 ? progressValues.reduce((a, b) => a + b, 0) / progressValues.length : 0;
      }
      return sum + studentProgress;
    }, 0);
    
    return Math.round(totalProgress / classStudents.length);
  };

  const getClassStats = (classData) => {
    const classStudents = students[classData.id] || [];
    const session = activeSessions[classData.id];
    
    const onlineCount = classStudents.filter(student => 
      getStudentStatus(student, classData.id) === 'online'
    ).length;
    
    const inLiveSessionCount = classStudents.filter(student => 
      getStudentStatus(student, classData.id) === 'in_live_session'
    ).length;
    
    const offlineCount = classStudents.filter(student => 
      getStudentStatus(student, classData.id) === 'offline'
    ).length;

    return {
      total: classStudents.length,
      online: onlineCount,
      inLiveSession: inLiveSessionCount,
      offline: offlineCount,
      progress: getClassProgress(classData),
      hasActiveSession: !!session
    };
  };

  const handleRefresh = async () => {
    toast.loading('מעדכן נתונים...');
    await loadClassroomData();
    toast.dismiss();
    toast.success('הנתונים עודכנו בהצלחה');
  };

  const handleStudentAction = async (studentId, action) => {
    try {
      await logTeacherActivity(currentUser.uid, {
        type: `student_${action}`,
        title: `פעולת תלמיד - ${action}`,
        description: `פעולה ${action} בוצעה על תלמיד ${studentId}`,
        metadata: { studentId, action }
      });
      
      toast.success(`פעולה ${action} בוצעה בהצלחה`);
    } catch (error) {
      console.error('Error performing student action:', error);
      toast.error('אירעה שגיאה בביצוע הפעולה');
    }
  };

  const handleLessonAssignment = async (classId, lessonId) => {
    try {
      if (!lessonId) {
        toast.error('יש לבחור שיעור');
        return;
      }

      const currentDate = new Date().toISOString();
      const classData = classes.find(c => c.id === classId);
      const existingUnlockedLessons = classData?.unlockedLessons || [];

      // Create new unlocked lesson entry
      const newUnlockedLesson = {
        lessonId: lessonId,
        unlockedAt: currentDate,
        unlockedBy: currentUser.uid,
        unlockedByTeacher: currentUser.displayName || currentUser.email
      };

      // Update class with new lesson assignment and unlocked lessons history
      const classRef = doc(db, 'classes', classId);
      await updateDoc(classRef, {
        currentLesson: lessonId,
        lessonStartDate: currentDate,
        lastUpdated: currentDate,
        unlockedLessons: [...existingUnlockedLessons, newUnlockedLesson]
      });

      // Update all students in this class to have access to this lesson
      // This unlocks the lesson for all students in the class permanently
      const classStudents = students[classId] || [];
      const updatePromises = classStudents.map(async (student) => {
        const userRef = doc(db, 'users', student.uid);
        await updateDoc(userRef, {
          currentLesson: lessonId, // This unlocks all lessons up to lessonId
          lastUpdated: currentDate
        });
      });

      await Promise.all(updatePromises);

      toast.success(`שיעור ${lessonId} נפתח לכיתה בהצלחה - התלמידים יכולים לגשת לכל השיעורים עד שיעור ${lessonId}`);
      
      // Refresh data
      await loadClassroomData();
    } catch (error) {
      console.error('Error assigning lesson:', error);
      toast.error('אירעה שגיאה בפתיחת השיעור');
    }
  };

  const handleStartLessonSession = async (classId) => {
    try {
      const classData = classes.find(c => c.id === classId);
      if (!classData || !classData.currentLesson) {
        toast.error('יש להקצות שיעור לפני התחלת שיעור');
        return;
      }

      // Navigate to session creation with pre-filled lesson
      navigate(`/teacher/session-creation?classId=${classId}&lessonId=${classData.currentLesson}`);
    } catch (error) {
      console.error('Error starting lesson session:', error);
      toast.error('אירעה שגיאה בהתחלת שיעור');
    }
  };

  if (!isTeacher({ role: 'teacher' })) {
    logSecurityEvent('STUDENT_ACCESS_ATTEMPT', { role: 'student', uid: currentUser?.uid }, { component: 'ClassroomInterface' });
    return (
      <div className="text-center py-8 bg-black min-h-screen flex items-center justify-center">
        <p className="text-red-400">אין לך הרשאות לצפייה בממשק הכיתה</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 bg-black min-h-screen flex flex-col items-center justify-center">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <p className="text-red-400 mb-4">אירעה שגיאה בטעינת נתונים</p>
        <Button onClick={loadClassroomData}>נסה שוב</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-black min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">ממשק הכיתה</h1>
          <p className="text-white">ניהול כיתות ותלמידים בזמן אמת</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => setNotifications(!notifications)}
            variant={notifications ? "primary" : "secondary"}
            size="sm"
          >
            {notifications ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
            {notifications ? 'התראות פעילות' : 'התראות כבויות'}
          </Button>
          
          <Button onClick={handleRefresh} variant="secondary" size="sm">
            <RefreshCw className="w-4 h-4" />
            רענן
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white" />
              <input
                type="text"
                placeholder="חיפוש כיתות..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all" className="bg-gray-800 text-white">כל הכיתות</option>
            <option value="active" className="bg-gray-800 text-white">כיתות פעילות</option>
            <option value="inactive" className="bg-gray-800 text-white">כיתות לא פעילות</option>
          </select>
          
          <Button
            onClick={() => setShowOfflineStudents(!showOfflineStudents)}
            variant={showOfflineStudents ? "primary" : "secondary"}
            size="sm"
          >
            {showOfflineStudents ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {showOfflineStudents ? 'הסתר מנותקים' : 'הצג מנותקים'}
          </Button>
        </div>
      </Card>

      {/* Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600">
          <div className="flex items-center space-x-4">
            <Users className="w-8 h-8 text-white" />
            <div>
              <p className="text-blue-100 text-sm">סה"כ כיתות</p>
              <p className="text-white text-2xl font-bold">{classes.length}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600">
          <div className="flex items-center space-x-4">
            <Activity className="w-8 h-8 text-white" />
            <div>
              <p className="text-green-100 text-sm">כיתות פעילות</p>
              <p className="text-white text-2xl font-bold">
                {Object.keys(activeSessions).length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600">
          <div className="flex items-center space-x-4">
            <Target className="w-8 h-8 text-white" />
            <div>
              <p className="text-purple-100 text-sm">ממוצע התקדמות</p>
              <p className="text-white text-2xl font-bold">
                {classes.length > 0 
                  ? Math.round(classes.reduce((sum, c) => sum + getClassProgress(c), 0) / classes.length)
                  : 0}%
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600">
          <div className="flex items-center space-x-4">
            <Award className="w-8 h-8 text-white" />
            <div>
              <p className="text-orange-100 text-sm">תלמידים מחוברים</p>
              <p className="text-white text-2xl font-bold">
                {Object.values(students).flat().filter(student => 
                  Object.keys(activeSessions).some(classId => 
                    getStudentStatus(student, classId) === 'online' || 
                    getStudentStatus(student, classId) === 'in_live_session'
                  )
                ).length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Classes List */}
      <div className="space-y-4">
        {filteredClasses.map(classData => {
          const stats = getClassStats(classData);
          const isExpanded = expandedClasses.has(classData.id);
          const session = activeSessions[classData.id];
          
          return (
            <Card key={classData.id} className="hover:bg-gray-800 transition-colors">
              <div className="p-6">
                {/* Class Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {session ? (
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      ) : (
                        <div className="w-3 h-3 bg-gray-500 rounded-full" />
                      )}
                      <h3 className="text-xl font-semibold text-white">{classData.name || 'כיתה ללא שם'}</h3>
                    </div>
                    
                    {session && (
                      <div className="flex items-center space-x-2 text-green-400 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>שיעור פעיל</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-white font-semibold">{stats.total} תלמידים</p>
                      <p className="text-white text-sm">התקדמות {stats.progress}%</p>
                    </div>
                    
                    <Button
                      onClick={() => toggleClassExpansion(classData.id)}
                      variant="ghost"
                      size="sm"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </Button>
                  </div>
                </div>

                {/* Class Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-green-400 text-sm">{stats.online} מחוברים</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span className="text-blue-400 text-sm">{stats.inLiveSession} בשיעור חי</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-500 rounded-full" />
                    <span className="text-white text-sm">{stats.offline} מנותקים</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 text-sm">{stats.progress}% התקדמות</span>
                  </div>
                </div>

                                {/* Lesson Assignment Section */}
                <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-white flex items-center space-x-2">
                      <BookOpen className="w-5 h-5" />
                      <span>ניהול שיעורים</span>
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-300">
                        שיעור נוכחי: {classData.currentLesson || 'לא מוגדר'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4" style={{ position: 'relative', zIndex: 1 }}>
                    {/* Current Lesson Status */}
                    <div className="bg-gray-700/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-300">שיעור פעיל</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <p className="text-white font-medium">
                        {classData.currentLesson ? `שיעור ${classData.currentLesson}` : 'לא מוגדר'}
                      </p>
                      <p className="text-xs text-gray-400">
                        {classData.lessonStartDate ? 
                          `התחיל ב-${new Date(classData.lessonStartDate).toLocaleDateString('he-IL')}` : 
                          'לא התחיל'
                        }
                      </p>
                      {classData.unlockedLessons && classData.unlockedLessons.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-600">
                          <p className="text-xs text-green-400">
                            {classData.unlockedLessons.length} שיעורים נפתחו
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {classData.unlockedLessons
                              .sort((a, b) => a.lessonId - b.lessonId)
                              .map(unlockedLesson => (
                                <span 
                                  key={unlockedLesson.lessonId}
                                  className="inline-block px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/30"
                                >
                                  {unlockedLesson.lessonId}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Lesson Assignment Controls */}
                    <div className="bg-gray-700/50 rounded-lg p-3 relative overflow-hidden">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-300">פתיחת שיעורים</span>
                        <Settings className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex items-center space-x-2 lesson-assignment-select">
                        <select 
                          className="flex-1 bg-gray-600 text-white text-sm rounded px-2 py-1 border border-gray-500 max-w-full"
                          value={classData.currentLesson || ''}
                          onChange={(e) => handleLessonAssignment(classData.id, parseInt(e.target.value))}
                          style={{ 
                            maxWidth: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            position: 'relative',
                            zIndex: 10
                          }}
                        >
                          <option value="">בחר שיעור</option>
                          {lessons.map(lesson => {
                            const lessonId = lesson.originalId || lesson.order;
                            const isUnlocked = classData.unlockedLessons?.some(ul => ul.lessonId === lessonId);
                            const isCurrentMax = lessonId === classData.currentLesson;
                            
                            return (
                              <option 
                                key={lesson.id} 
                                value={lessonId}
                                className={isUnlocked ? 'text-green-400' : 'text-white'}
                                style={{ 
                                  maxWidth: '100%',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {isUnlocked ? '✅ ' : ''}פתח עד שיעור {lessonId} - {lesson.title}
                                {isUnlocked && !isCurrentMax ? ' (כבר נפתח)' : ''}
                                {isCurrentMax ? ' (נוכחי)' : ''}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        פתיחת שיעור תאפשר לתלמידים לגשת לכל השיעורים עד השיעור שנבחר
                      </p>
                    </div>

                    {/* Lesson Progress */}
                    <div className="bg-gray-700/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-300">התקדמות כיתה</span>
                        <BarChart3 className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${stats.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-400">
                        {stats.progress}% הושלמו • {classData.completedLessons?.length || 0} שיעורים
                      </p>
                      {classData.unlockedLessons && classData.unlockedLessons.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-600">
                          <p className="text-xs text-blue-400">
                            שיעורים זמינים: {classData.unlockedLessons.length}/{lessons.length}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {lessons.map(lesson => {
                              const lessonId = lesson.originalId || lesson.order;
                              const isUnlocked = classData.unlockedLessons?.some(ul => ul.lessonId === lessonId);
                              return (
                                <span 
                                  key={lesson.id}
                                  className={`inline-block w-6 h-6 text-xs rounded flex items-center justify-center border ${
                                    isUnlocked 
                                      ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                                      : 'bg-gray-600/50 text-gray-400 border-gray-500/30'
                                  }`}
                                  title={`${lesson.title} (${lesson.totalSlides || lesson.slides?.length || 0} שקופיות)`}
                                >
                                  {lessonId}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Unlocked Lessons History */}
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-md font-semibold text-white flex items-center space-x-2">
                        <Unlock className="w-4 h-4" />
                        <span>שיעורים שנפתחו</span>
                      </h5>
                      <span className="text-sm text-gray-300">
                        {classData.unlockedLessons?.length || 0} שיעורים נפתחו
                      </span>
                    </div>
                    
                    {classData.unlockedLessons && classData.unlockedLessons.length > 0 ? (
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {classData.unlockedLessons
                          .sort((a, b) => new Date(b.unlockedAt) - new Date(a.unlockedAt))
                          .map((unlockedLesson, index) => (
                            <div
                              key={`${unlockedLesson.lessonId}-${unlockedLesson.unlockedAt}`}
                              className="flex items-center justify-between p-3 bg-gray-600/50 rounded-lg border border-gray-500/30"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                                  <span className="text-blue-400 font-bold text-sm">
                                    {unlockedLesson.lessonId}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-white font-medium">
                                    שיעור {unlockedLesson.lessonId} - {lessons.find(l => (l.originalId || l.order) === unlockedLesson.lessonId)?.title || 'שיעור לא ידוע'}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    נפתח על ידי {unlockedLesson.unlockedByTeacher}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-300">
                                  {new Date(unlockedLesson.unlockedAt).toLocaleDateString('he-IL')}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {new Date(unlockedLesson.unlockedAt).toLocaleTimeString('he-IL', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <Unlock className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                        <p className="text-gray-400">אין שיעורים שנפתחו עדיין</p>
                        <p className="text-xs text-gray-500 mt-1">השתמש בכפתור למעלה כדי לפתוח שיעורים</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded Students List */}
                {isExpanded && (
                  <div className="mt-6 border-t border-gray-700 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(students[classData.id] || []).map(student => {
                        const status = getStudentStatus(student, classData.id);
                        
                        if (!showOfflineStudents && status === 'offline') {
                          return null;
                        }
                        
                        return (
                          <div
                            key={student.uid}
                            className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-2">
                                {getStatusIcon(status)}
                                <div>
                                  <p className="text-white font-medium">{student.displayName || student.email || 'תלמיד ללא שם'}</p>
                                  <p className={`text-xs ${getStatusColor(status)}`}>
                                    {getStatusText(status)}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <div className="text-right">
                                <p className="text-white text-sm">
                                  {(() => {
                                    if (typeof student.progress === 'number') {
                                      return `${student.progress}%`;
                                    } else if (student.progress && typeof student.progress === 'object') {
                                      const progressValues = Object.values(student.progress).filter(v => typeof v === 'number');
                                      const avgProgress = progressValues.length > 0 ? progressValues.reduce((a, b) => a + b, 0) / progressValues.length : 0;
                                      return `${Math.round(avgProgress)}%`;
                                    }
                                    return '0%';
                                  })()}
                                </p>
                                <p className="text-white text-xs">
                                  {student.lastActivityAt ? 
                                    new Date(student.lastActivityAt).toLocaleTimeString('he-IL') : 
                                    'לא ידוע'
                                  }
                                </p>
                              </div>
                              
                              <div className="flex items-center space-x-1">
                                <Button
                                  onClick={() => handleStudentAction(student.uid, 'message')}
                                  variant="ghost"
                                  size="sm"
                                  title="שלח הודעה"
                                >
                                  <MessageSquare className="w-4 h-4" />
                                </Button>
                                
                                <Button
                                  onClick={() => handleStudentAction(student.uid, 'monitor')}
                                  variant="ghost"
                                  size="sm"
                                  title="צפה בפעילות"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {!showOfflineStudents && (students[classData.id] || []).filter(s => getStudentStatus(s, classData.id) === 'offline').length > 0 && (
                      <div className="mt-4 text-center">
                        <p className="text-white text-sm">
                          {students[classData.id]?.filter(s => getStudentStatus(s, classData.id) === 'offline').length} תלמידים מנותקים מוסתרים
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activities */}
      <Card>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">פעילות אחרונה</h3>
          <div className="space-y-3">
            {recentActivities.slice(0, 10).map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.title || 'פעילות'}</p>
                  <p className="text-white text-xs">{activity.description || 'אין תיאור'}</p>
                </div>
                <span className="text-white text-xs">
                  {activity.timestamp ? formatTimestamp(activity.timestamp) : 'לא ידוע'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ClassroomInterface; 