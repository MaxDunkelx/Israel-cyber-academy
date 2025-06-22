import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Eye, 
  Clock, 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  ChevronLeft,
  BarChart3,
  MessageSquare,
  RefreshCw,
  Filter,
  Search
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { useUserProfile } from '../../hooks/useAuth';
import { isTeacher, validateTeacherAccess, logSecurityEvent } from '../../utils/security';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const StudentMonitor = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { role } = useUserProfile();
  const [session, setSession] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    // Security check - ensure only teachers can access this component
    if (!currentUser) {
      logSecurityEvent('UNAUTHORIZED_ACCESS_ATTEMPT', { role: 'none' }, { component: 'StudentMonitor' });
      return;
    }

    const validation = validateTeacherAccess({ role }, 'monitor_students');
    if (!validation.success) {
      logSecurityEvent('INSUFFICIENT_PERMISSIONS', { role, uid: currentUser.uid }, { 
        component: 'StudentMonitor',
        reason: validation.message 
      });
      toast.error('אין לך הרשאות למעקב אחר תלמידים');
      navigate('/teacher/dashboard');
      return;
    }

    // Load session and student data
    loadData();

    // Auto-refresh every 30 seconds if enabled
    let refreshInterval;
    if (autoRefresh) {
      refreshInterval = setInterval(() => {
        loadData();
      }, 30000);
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [currentUser, role, sessionId, navigate, autoRefresh]);

  // Security check - if not a teacher, show access denied
  if (!isTeacher({ role })) {
    logSecurityEvent('STUDENT_ACCESS_ATTEMPT', { role, uid: currentUser?.uid }, { component: 'StudentMonitor' });
    return (
      <div className="text-center py-8">
        <p className="text-red-400">אין לך הרשאות למעקב אחר תלמידים</p>
      </div>
    );
  }

  const loadData = () => {
    // Mock session data - in real app, this would come from Firebase
    const mockSession = {
      id: sessionId,
      lessonId: 1,
      lessonName: 'מבוא לאבטחת סייבר',
      teacher: 'שרה כהן',
      startTime: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      status: 'active',
      currentSlide: 5,
      totalSlides: 18,
      students: 15,
      activeStudents: 12
    };

    const mockStudents = [
      { 
        id: 1, 
        name: 'יוסי כהן', 
        status: 'active', 
        currentSlide: 5, 
        progress: 75,
        lastActivity: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
        timeSpent: 35,
        questionsAnswered: 8,
        correctAnswers: 7,
        engagement: 'high'
      },
      { 
        id: 2, 
        name: 'שרה לוי', 
        status: 'active', 
        currentSlide: 5, 
        progress: 80,
        lastActivity: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
        timeSpent: 38,
        questionsAnswered: 10,
        correctAnswers: 9,
        engagement: 'high'
      },
      { 
        id: 3, 
        name: 'דוד אברהם', 
        status: 'active', 
        currentSlide: 4, 
        progress: 60,
        lastActivity: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        timeSpent: 30,
        questionsAnswered: 6,
        correctAnswers: 5,
        engagement: 'medium'
      },
      { 
        id: 4, 
        name: 'מיכל רוזן', 
        status: 'inactive', 
        currentSlide: 3, 
        progress: 45,
        lastActivity: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        timeSpent: 20,
        questionsAnswered: 3,
        correctAnswers: 2,
        engagement: 'low'
      },
      { 
        id: 5, 
        name: 'עמית שפירא', 
        status: 'active', 
        currentSlide: 5, 
        progress: 85,
        lastActivity: new Date(Date.now() - 30 * 1000), // 30 seconds ago
        timeSpent: 40,
        questionsAnswered: 12,
        correctAnswers: 11,
        engagement: 'high'
      },
      { 
        id: 6, 
        name: 'נועה כהן', 
        status: 'active', 
        currentSlide: 5, 
        progress: 70,
        lastActivity: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
        timeSpent: 32,
        questionsAnswered: 7,
        correctAnswers: 6,
        engagement: 'medium'
      },
      { 
        id: 7, 
        name: 'אלון לוי', 
        status: 'active', 
        currentSlide: 4, 
        progress: 65,
        lastActivity: new Date(Date.now() - 4 * 60 * 1000), // 4 minutes ago
        timeSpent: 28,
        questionsAnswered: 5,
        correctAnswers: 4,
        engagement: 'medium'
      },
      { 
        id: 8, 
        name: 'יעל אברהם', 
        status: 'inactive', 
        currentSlide: 2, 
        progress: 30,
        lastActivity: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
        timeSpent: 15,
        questionsAnswered: 2,
        correctAnswers: 1,
        engagement: 'low'
      },
      { 
        id: 9, 
        name: 'דן רוזן', 
        status: 'active', 
        currentSlide: 5, 
        progress: 90,
        lastActivity: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
        timeSpent: 42,
        questionsAnswered: 15,
        correctAnswers: 14,
        engagement: 'high'
      },
      { 
        id: 10, 
        name: 'מיכל שפירא', 
        status: 'active', 
        currentSlide: 5, 
        progress: 75,
        lastActivity: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
        timeSpent: 35,
        questionsAnswered: 8,
        correctAnswers: 7,
        engagement: 'high'
      }
    ];

    setSession(mockSession);
    setStudents(mockStudents);
    setLoading(false);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getEngagementColor = (engagement) => {
    switch (engagement) {
      case 'high': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getEngagementIcon = (engagement) => {
    switch (engagement) {
      case 'high': return <Activity className="w-4 h-4 text-green-400" />;
      case 'medium': return <Activity className="w-4 h-4 text-yellow-400" />;
      case 'low': return <Activity className="w-4 h-4 text-red-400" />;
      default: return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'inactive': return <XCircle className="w-4 h-4 text-red-400" />;
      default: return <AlertCircle className="w-4 h-4 text-yellow-400" />;
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return 'עכשיו';
    if (minutes < 60) return `לפני ${minutes} דקות`;
    
    const hours = Math.floor(minutes / 60);
    return `לפני ${hours} שעות`;
  };

  const handleRefresh = () => {
    loadData();
    toast.success('הנתונים עודכנו');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!session) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">השיעור לא נמצא</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate(`/teacher/session/${sessionId}`)}
              variant="secondary"
              size="sm"
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>חזור לשיעור</span>
            </Button>
            <div>
              <h1 className="text-xl font-bold text-white">מעקב אחר תלמידים</h1>
              <p className="text-gray-300 text-sm">
                {session.lessonName} • {session.activeStudents}/{session.students} תלמידים פעילים
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleRefresh}
              variant="secondary"
              size="sm"
              className="flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>רענן</span>
            </Button>
            
            <label className="flex items-center space-x-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <span>רענון אוטומטי</span>
            </label>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-green-600">
            <div className="flex items-center space-x-4">
              <Users className="w-8 h-8 text-white" />
              <div>
                <p className="text-green-100 text-sm">תלמידים פעילים</p>
                <p className="text-white text-2xl font-bold">{session.activeStudents}</p>
                <p className="text-green-100 text-xs">מתוך {session.students}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600">
            <div className="flex items-center space-x-4">
              <BarChart3 className="w-8 h-8 text-white" />
              <div>
                <p className="text-blue-100 text-sm">ממוצע התקדמות</p>
                <p className="text-white text-2xl font-bold">
                  {Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length)}%
                </p>
                <p className="text-blue-100 text-xs">ממוצע כללי</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600">
            <div className="flex items-center space-x-4">
              <Clock className="w-8 h-8 text-white" />
              <div>
                <p className="text-purple-100 text-sm">זמן ממוצע</p>
                <p className="text-white text-2xl font-bold">
                  {Math.round(students.reduce((sum, s) => sum + s.timeSpent, 0) / students.length)} דקות
                </p>
                <p className="text-purple-100 text-xs">זמן למידה</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600">
            <div className="flex items-center space-x-4">
              <MessageSquare className="w-8 h-8 text-white" />
              <div>
                <p className="text-orange-100 text-sm">תשובות נכונות</p>
                <p className="text-white text-2xl font-bold">
                  {Math.round(students.reduce((sum, s) => sum + (s.correctAnswers / s.questionsAnswered * 100), 0) / students.length)}%
                </p>
                <p className="text-orange-100 text-xs">אחוז הצלחה</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="חיפוש תלמידים..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">כל התלמידים</option>
                <option value="active">פעילים</option>
                <option value="inactive">לא פעילים</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Students List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="hover:bg-gray-700/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    student.status === 'active' ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    {getStatusIcon(student.status)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{student.name}</h3>
                    <p className="text-sm text-gray-400">
                      {student.status === 'active' ? 'פעיל' : 'לא פעיל'} • 
                      {formatTimeAgo(student.lastActivity)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getEngagementIcon(student.engagement)}
                  <span className={`text-sm font-medium ${getEngagementColor(student.engagement)}`}>
                    {student.engagement === 'high' ? 'גבוה' : 
                     student.engagement === 'medium' ? 'בינוני' : 'נמוך'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">התקדמות</span>
                    <span className="text-white font-semibold">{student.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Current Slide */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">שקופית נוכחית</span>
                  <span className="text-white font-semibold">
                    {student.currentSlide} / {session.totalSlides}
                  </span>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-600">
                  <div className="text-center">
                    <p className="text-white font-semibold">{student.timeSpent} דקות</p>
                    <p className="text-gray-400 text-xs">זמן למידה</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold">{student.questionsAnswered}</p>
                    <p className="text-gray-400 text-xs">תשובות</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold">
                      {student.questionsAnswered > 0 ? Math.round((student.correctAnswers / student.questionsAnswered) * 100) : 0}%
                    </p>
                    <p className="text-gray-400 text-xs">דיוק</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <Card className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">לא נמצאו תלמידים</h3>
            <p className="text-gray-300">נסה לשנות את החיפוש או הפילטרים</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StudentMonitor; 