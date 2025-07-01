import React, { useState, useEffect, useCallback } from 'react';
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
  VolumeX
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { isTeacher, validateTeacherAccess, logSecurityEvent } from '../../utils/security';
import { 
  getTeacherClasses, 
  getClassStudents, 
  getTeacherAnalytics,
  getTeacherRecentActivities,
  logTeacherActivity
} from '../../firebase/teacher-service';
import { listenToSession } from '../../firebase/session-service';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const ClassroomInterface = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState({});
  const [analytics, setAnalytics] = useState({});
  const [recentActivities, setRecentActivities] = useState([]);
  const [activeSessions, setActiveSessions] = useState({});
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

      // Load teacher's classes
      const teacherClasses = await getTeacherClasses(currentUser.uid);
      setClasses(teacherClasses);

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
    
    return () => {
      if (unsubscribeSessions) unsubscribeSessions();
    };
  };

  const listenToActiveSessions = () => {
    // TODO: Implement real session listening
    // For now, we'll use empty sessions until real session data is available
    setActiveSessions({});
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
    const session = activeSessions[classId];
    if (!session) return 'offline';
    
    const isConnected = session.connectedStudents.includes(student.uid);
    const lastActivity = student.lastActivityAt;
    const isActive = lastActivity && (Date.now() - new Date(lastActivity).getTime()) < 300000; // 5 minutes
    
    if (isConnected && isActive) return 'online';
    if (isConnected && !isActive) return 'idle';
    return 'offline';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />;
      case 'idle':
        return <div className="w-3 h-3 bg-yellow-500 rounded-full" />;
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
      case 'idle':
        return 'לא פעיל';
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
      case 'idle':
        return 'text-yellow-400';
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
    
    const idleCount = classStudents.filter(student => 
      getStudentStatus(student, classData.id) === 'idle'
    ).length;
    
    const offlineCount = classStudents.filter(student => 
      getStudentStatus(student, classData.id) === 'offline'
    ).length;

    return {
      total: classStudents.length,
      online: onlineCount,
      idle: idleCount,
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
                    getStudentStatus(student, classId) === 'online'
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
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <span className="text-yellow-400 text-sm">{stats.idle} לא פעילים</span>
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
                  {activity.timestamp?.toDate?.()?.toLocaleTimeString('he-IL') || 'לא ידוע'}
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