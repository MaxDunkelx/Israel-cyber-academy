/**
 * TeacherDashboard Component - Israel Cyber Academy Teacher Console
 * 
 * Main dashboard for teachers with essential tabs:
 * 1. StudentPool - Manage student assignments to classes
 * 2. Analytics - View analytics and progress for assigned students
 * 3. Notes - Preview lessons and add teaching notes
 * 
 * Features:
 * - Clean, spacious dark theme UI
 * - Role-based access control
 * - Real-time data from Firebase
 * - Responsive design
 * - Security logging
 * 
 * @component
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  Users, 
  BarChart3, 
  BookOpen, 
  Shield,
  AlertCircle,
  CheckCircle,
  Settings,
  Calendar,
  MessageSquare,
  FileText,
  Monitor,
  Play,
  Clock,
  Star,
  Trophy,
  Target,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { logSecurityEvent } from '../../utils/security';
import { getTeacherClasses, getTeacherStudents, getTeacherRecentActivities } from '../../firebase/teacher-service';
import { formatTimestamp } from '../../utils/helpers';
import StudentPool from './StudentPool';
import LoadingSpinner from '../common/LoadingSpinner';
import { Card } from '../ui/Card';
import { ErrorBoundary } from '../common/ErrorBoundary';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, loading: authLoading, role } = useAuth();
  
  // UI State Management
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeClasses: 0,
    completedLessons: 0,
    averageProgress: 0
  });
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [error, setError] = useState(null);

  /**
   * Available dashboard tabs with their configurations
   */
  const tabs = [
    {
      id: 'overview',
      label: 'סקירה כללית',
      icon: Activity,
      description: 'סקירה כללית של הפעילות והסטטיסטיקות',
      color: 'blue'
    },
    {
      id: 'studentPool',
      label: 'בריכת תלמידים',
      icon: Users,
      description: 'ניהול הקצאת תלמידים לכיתות',
      color: 'green'
    },
    {
      id: 'analytics',
      label: 'אנליטיקה',
      icon: BarChart3,
      description: 'ניתוח התקדמות וסטטיסטיקות',
      color: 'yellow'
    },
    {
      id: 'lessons',
      label: 'שיעורים',
      icon: BookOpen,
      description: 'ניהול שיעורים ותכנים',
      color: 'purple'
    },
    {
      id: 'classes',
      label: 'כיתות',
      icon: Target,
      description: 'ניהול כיתות ופעילויות',
      color: 'indigo'
    },
    {
      id: 'communications',
      label: 'תקשורת',
      icon: MessageSquare,
      description: 'הודעות ותקשורת עם תלמידים',
      color: 'pink'
    }
  ];

  /**
   * Access control and security logging
   */
  useEffect(() => {
    const checkAccessAndLoadStats = async () => {
      try {
        console.log('🔍 Checking teacher access...', { 
          currentUser: !!currentUser, 
          authLoading, 
          role
        });
        
        if (authLoading) {
          console.log('⏳ Auth still loading...');
          return;
        }

        if (!currentUser) {
          console.log('❌ No user found, redirecting to login');
          toast.error('יש להתחבר כדי לגשת לאזור המורה');
          navigate('/login');
          return;
        }

        if (role !== 'teacher') {
          console.log('❌ User is not a teacher, role:', role);
          toast.error('אין לך הרשאות לגשת לאזור המורה');
          navigate('/login');
          return;
        }

        // Access granted - log security event
        console.log('✅ Teacher access granted!');
        await logSecurityEvent('teacher_dashboard_access', {
          userId: currentUser.uid,
          role: role,
          timestamp: new Date().toISOString()
        });

        // Load real stats
        setIsLoading(true);
        const [classesData, studentsData, activitiesData] = await Promise.all([
          getTeacherClasses(currentUser.uid),
          getTeacherStudents(currentUser.uid),
          getTeacherRecentActivities(currentUser.uid, 5)
        ]);
        setClasses(classesData);
        setStudents(studentsData);
        setRecentActivities(activitiesData);
        
        // Calculate real stats from the data
        const totalStudents = studentsData.length;
        const activeClasses = classesData.filter(c => c.isActive).length;
        const totalClasses = classesData.length;
        const unassignedStudents = studentsData.filter(s => !s.classId).length;
        
        setStats({
          totalStudents: totalStudents,
          activeClasses: activeClasses,
          completedLessons: totalClasses, // Using total classes as placeholder
          averageProgress: unassignedStudents // Using unassigned students as placeholder
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error('❌ Access check or stats load error:', error);
        toast.error('אירעה שגיאה בבדיקת הרשאות או בטעינת נתונים');
        navigate('/login');
      }
    };

    if (!authLoading) {
      checkAccessAndLoadStats();
    }
  }, [currentUser, role, authLoading, navigate]);

  /**
   * Handle tab switching with animation
   */
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    
    // Log tab change for analytics
    logSecurityEvent('teacher_tab_change', {
      userId: currentUser?.uid,
      fromTab: activeTab,
      toTab: tabId,
      timestamp: new Date().toISOString()
    });
  };

  /**
   * Render the active tab content
   */
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-blue-50 border-blue-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{stats.totalStudents}</div>
                  <div className="text-sm text-blue-700">סה"כ תלמידים</div>
                </div>
              </Card>
              
              <Card className="bg-green-50 border-green-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{stats.activeClasses}</div>
                  <div className="text-sm text-green-700">כיתות פעילות</div>
                </div>
              </Card>
              
              <Card className="bg-purple-50 border-purple-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{stats.completedLessons}</div>
                  <div className="text-sm text-purple-700">שיעורים שהושלמו</div>
                </div>
              </Card>
              
              <Card className="bg-orange-50 border-orange-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">{stats.averageProgress}%</div>
                  <div className="text-sm text-orange-700">התקדמות ממוצעת</div>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">פעולות מהירות</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => handleTabChange('studentPool')}
                  className="flex items-center space-x-3 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <Users className="w-6 h-6 text-blue-400" />
                  <span className="text-white">ניהול תלמידים</span>
                </button>
                
                <button 
                  onClick={() => handleTabChange('lessons')}
                  className="flex items-center space-x-3 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <BookOpen className="w-6 h-6 text-purple-400" />
                  <span className="text-white">ניהול שיעורים</span>
                </button>
                
                <button 
                  onClick={() => handleTabChange('analytics')}
                  className="flex items-center space-x-3 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <BarChart3 className="w-6 h-6 text-yellow-400" />
                  <span className="text-white">צפייה באנליטיקה</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">פעילות אחרונה</h3>
              {recentActivities.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  <p>אין פעילות להצגה</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'class_created' ? 'bg-green-400' :
                        activity.type === 'class_deleted' ? 'bg-red-400' :
                        activity.type === 'student_added' ? 'bg-blue-400' :
                        activity.type === 'student_removed' ? 'bg-orange-400' :
                        activity.type === 'class_edited' ? 'bg-yellow-400' :
                        'bg-gray-400'
                      }`}></div>
                      <span className="text-gray-300 flex-1 text-right">{activity.description}</span>
                      <span className="text-gray-500 text-sm">
                        {activity.timestamp ? formatTimestamp(activity.timestamp) : 'לא ידוע'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case 'studentPool':
        return <StudentPool />;
      case 'analytics':
        return (
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">אנליטיקת תלמידים</h3>
            <p className="text-gray-400">תכונה זו תהיה זמינה בקרוב</p>
          </div>
        );
      case 'lessons':
        return (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">ניהול שיעורים</h3>
            <p className="text-gray-400">תכונה זו תהיה זמינה בקרוב</p>
          </div>
        );
      case 'classes':
        return (
          <div className="text-center py-12">
            <Target className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">ניהול כיתות</h3>
            <p className="text-gray-400">תכונה זו תהיה זמינה בקרוב</p>
          </div>
        );
      case 'communications':
        return (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">תקשורת</h3>
            <p className="text-gray-400">תכונה זו תהיה זמינה בקרוב</p>
          </div>
        );
      default:
        return (
          <div className="text-center py-12">
            <Activity className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">סקירה כללית</h3>
            <p className="text-gray-400">ברוכים הבאים ללוח הבקרה</p>
          </div>
        );
    }
  };

  /**
   * Get tab color classes
   */
  const getTabColorClasses = (color) => {
    const colorMap = {
      blue: 'border-blue-500 bg-blue-500/10 text-blue-400',
      green: 'border-green-500 bg-green-500/10 text-green-400',
      yellow: 'border-yellow-500 bg-yellow-500/10 text-yellow-400',
      purple: 'border-purple-500 bg-purple-500/10 text-purple-400',
      indigo: 'border-indigo-500 bg-indigo-500/10 text-indigo-400',
      pink: 'border-pink-500 bg-pink-500/10 text-pink-400'
    };
    return colorMap[color] || colorMap.blue;
  };

  // Show loading spinner while checking access
  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Shield className="h-8 w-8 text-blue-400" />
                <div>
                  <h1 className="text-2xl font-bold text-white">ישראל אקדמיה לסייבר</h1>
                  <p className="text-gray-400">לוח בקרה למורה</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">מחובר</span>
                </div>
                
                <button
                  onClick={() => navigate('/')}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  יציאה
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 bg-gray-800 p-2 rounded-lg">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-md transition-all duration-200 ${
                      isActive 
                        ? `${getTabColorClasses(tab.color)} border-2` 
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Tab Description */}
            <div className="mt-4 text-center">
              <p className="text-gray-400">
                {tabs.find(tab => tab.id === activeTab)?.description}
              </p>
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-lg p-6"
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default TeacherDashboard; 