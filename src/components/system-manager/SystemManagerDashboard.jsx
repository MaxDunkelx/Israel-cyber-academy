/**
 * SystemManagerDashboard Component - Israel Cyber Campus System Manager Console
 * 
 * Main dashboard for system managers with complete control over the platform:
 * 1. User Management - Add/edit/delete students and teachers
 * 2. Content Management - Edit lessons, slides, and exercises
 * 3. Data Import/Export - Excel import for bulk user creation
 * 4. System Settings - Platform configuration
 * 5. System Logs - Activity monitoring
 * 
 * Features:
 * - Complete administrative control
 * - Real-time data management
 * - Bulk operations
 * - System monitoring
 * - Content editing capabilities
 * 
 * @component
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  Users, 
  FileText, 
  Upload, 
  Settings, 
  Activity,
  Shield,
  Database,
  BarChart3,
  UserPlus,
  BookOpen,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { logSecurityEvent } from '../../utils/security';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import LoadingSpinner from '../common/LoadingSpinner';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ErrorBoundary from '../common/ErrorBoundary';

// Import System Manager components
import UserManagement from './UserManagement';
import ContentManagement from './ContentManagement';
import ExcelImport from './ExcelImport';
import SystemSettings from './SystemSettings';
import SystemLogs from './SystemLogs';

/**
 * Get tab color classes
 */
const getTabColorClasses = (color) => {
  const colorMap = {
    blue: 'border-blue-500 text-blue-500 hover:bg-blue-500/10',
    green: 'border-green-500 text-green-500 hover:bg-green-500/10',
    purple: 'border-purple-500 text-purple-500 hover:bg-purple-500/10',
    orange: 'border-orange-500 text-orange-500 hover:bg-orange-500/10',
    gray: 'border-gray-500 text-gray-500 hover:bg-gray-500/10',
    red: 'border-red-500 text-red-500 hover:bg-red-500/10'
  };
  return colorMap[color] || colorMap.blue;
};

/**
 * Get severity color for activities
 */
const getSeverityColor = (severity) => {
  const colorMap = {
    info: 'text-blue-400',
    warning: 'text-yellow-400',
    error: 'text-red-400',
    success: 'text-green-400'
  };
  return colorMap[severity] || colorMap.info;
};

/**
 * Overview Tab Component
 */
const OverviewTab = ({ stats, recentActivities, onRefresh, isRefreshing = false }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">סקירה כללית</h2>
        <div className="flex space-x-2">
          <Button 
            variant="secondary" 
            size="sm"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center space-x-2"
          >
            {isRefreshing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>מעדכן...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>רענן</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card variant="dark">
          <div className="text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <div className="text-3xl font-bold text-white">{stats.totalUsers}</div>
            <div className="text-sm text-gray-300">סה"כ משתמשים</div>
          </div>
        </Card>
        
        <Card variant="dark">
          <div className="text-center">
            <UserPlus className="w-8 h-8 mx-auto mb-2 text-green-400" />
            <div className="text-3xl font-bold text-white">{stats.totalStudents}</div>
            <div className="text-sm text-gray-300">תלמידים</div>
          </div>
        </Card>
        
        <Card variant="dark">
          <div className="text-center">
            <Shield className="w-8 h-8 mx-auto mb-2 text-purple-400" />
            <div className="text-3xl font-bold text-white">{stats.totalTeachers}</div>
            <div className="text-sm text-gray-300">מורים</div>
          </div>
        </Card>
        
        <Card variant="dark">
          <div className="text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-orange-400" />
            <div className="text-3xl font-bold text-white">{stats.totalLessons}</div>
            <div className="text-sm text-gray-300">שיעורים</div>
          </div>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card variant="dark">
        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>פעילות אחרונה</span>
          </h3>
          
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.severity === 'warning' ? 'bg-yellow-400' :
                    activity.severity === 'error' ? 'bg-red-400' :
                    activity.severity === 'success' ? 'bg-green-400' :
                    'bg-blue-400'
                  }`} />
                  <span className={`text-sm ${getSeverityColor(activity.severity)}`}>
                    {activity.message}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(activity.timestamp).toLocaleTimeString('he-IL')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

const SystemManagerDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, loading: authLoading, role } = useAuth();
  
  // UI State Management
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalTeachers: 0,
    totalLessons: 0
  });
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
      description: 'סקירה כללית של המערכת והסטטיסטיקות',
      color: 'blue'
    },
    {
      id: 'users',
      label: 'ניהול משתמשים',
      icon: Users,
      description: 'הוספה, עריכה ומחיקה של תלמידים ומורים',
      color: 'green'
    },
    {
      id: 'content',
      label: 'ניהול תוכן',
      icon: FileText,
      description: 'עריכת שיעורים, שקופיות ותרגילים',
      color: 'purple'
    },
    {
      id: 'imports',
      label: 'ייבוא נתונים',
      icon: Upload,
      description: 'ייבוא תלמידים מקובץ Excel',
      color: 'orange'
    },
    {
      id: 'settings',
      label: 'הגדרות מערכת',
      icon: Settings,
      description: 'הגדרות כלליות של המערכת',
      color: 'gray'
    },
    {
      id: 'logs',
      label: 'לוגים',
      icon: Database,
      description: 'ניטור פעילות המערכת',
      color: 'red'
    }
  ];

  /**
   * Access control and security logging
   */
  useEffect(() => {
    const checkAccessAndLoadStats = async () => {
      try {
        console.log('🔍 Checking system manager access...', { 
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
          toast.error('יש להתחבר כדי לגשת לאזור מנהל המערכת');
          navigate('/login');
          return;
        }

        if (role !== 'system_manager') {
          console.log('❌ User is not a system manager, role:', role);
          toast.error('אין לך הרשאות לגשת לאזור מנהל המערכת');
          navigate('/login');
          return;
        }

        // Access granted - log security event
        console.log('✅ System manager access granted!');
        await logSecurityEvent('system_manager_dashboard_access', {
          userId: currentUser.uid,
          role: role,
          timestamp: new Date().toISOString()
        });

        // Load system stats
        setIsLoading(true);
        await loadSystemStats();
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
   * Load system statistics from Firebase
   */
  const loadSystemStats = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
      }
      
      console.log('📊 Loading real system statistics from Firebase...');
      
      // Get all users from Firebase
      const usersRef = collection(db, 'users');
      const usersSnapshot = await getDocs(usersRef);
      
      let totalUsers = 0;
      let totalStudents = 0;
      let totalTeachers = 0;
      let totalSystemManagers = 0;
      
      usersSnapshot.forEach((doc) => {
        const userData = doc.data();
        totalUsers++;
        
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
            // Count unknown roles as students for now
            totalStudents++;
            break;
        }
      });
      
      // Get total lessons from the lessons data
      // We'll count the lessons in the data/lessons directory structure
      const totalLessons = 9; // This is the current number of lessons in the system
      
      console.log('📊 Real stats loaded:', {
        totalUsers,
        totalStudents,
        totalTeachers,
        totalSystemManagers,
        totalLessons
      });
      
      setStats({
        totalUsers,
        totalStudents,
        totalTeachers,
        totalLessons
      });

      // Generate recent activities based on real data
      const activities = [];
      
      // Add user creation activities (last 3 users)
      const recentUsers = usersSnapshot.docs
        .sort((a, b) => b.data().createdAt?.toDate?.() - a.data().createdAt?.toDate?.())
        .slice(0, 3);
      
      recentUsers.forEach((userDoc, index) => {
        const userData = userDoc.data();
        activities.push({
          id: `user_${userDoc.id}`,
          type: 'user_created',
          message: `נוצר משתמש חדש: ${userData.displayName || userData.email}`,
          timestamp: userData.createdAt?.toDate?.() || new Date(Date.now() - 1000 * 60 * 60 * (index + 1)),
          severity: 'info'
        });
      });
      
      // Add system manager access activity
      activities.push({
        id: 'system_access',
        type: 'system_access',
        message: 'מנהל מערכת התחבר למערכת',
        timestamp: new Date(),
        severity: 'success'
      });
      
      // Sort activities by timestamp (newest first)
      activities.sort((a, b) => b.timestamp - a.timestamp);
      
      setRecentActivities(activities.slice(0, 5)); // Keep only 5 most recent
      
      console.log('✅ System statistics loaded successfully');
      
      if (isRefresh) {
        toast.success('הנתונים עודכנו בהצלחה');
      }
      
    } catch (error) {
      console.error('❌ Error loading system stats:', error);
      toast.error('אירעה שגיאה בטעינת סטטיסטיקות המערכת');
      
      // Set fallback stats
      setStats({
        totalUsers: 0,
        totalStudents: 0,
        totalTeachers: 0,
        totalLessons: 9
      });
    } finally {
      if (isRefresh) {
        setIsRefreshing(false);
      }
    }
  };

  /**
   * Refresh system statistics
   */
  const handleRefresh = () => {
    loadSystemStats(true);
  };

  /**
   * Handle tab change
   */
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  /**
   * Render tab content based on active tab
   */
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab stats={stats} recentActivities={recentActivities} onRefresh={handleRefresh} isRefreshing={isRefreshing} />;
      case 'users':
        return <UserManagement />;
      case 'content':
        return <ContentManagement />;
      case 'imports':
        return <ExcelImport />;
      case 'settings':
        return <SystemSettings />;
      case 'logs':
        return <SystemLogs />;
      default:
        return <OverviewTab stats={stats} recentActivities={recentActivities} onRefresh={handleRefresh} isRefreshing={isRefreshing} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Header */}
        <div className="bg-gray-800/50 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8 text-blue-400" />
                <div>
                  <h1 className="text-2xl font-bold text-white">מנהל המערכת</h1>
                  <p className="text-gray-300 text-sm">
                    ברוכים הבאים, {currentUser?.displayName || currentUser?.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => navigate('/')}
                variant="secondary"
                size="sm"
              >
                חזור למערכת
              </Button>
            </div>
          </div>
        </div>

        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-64 bg-gray-800/50 border-r border-gray-700 p-4">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : `border border-transparent ${getTabColorClasses(tab.color)}`
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <div className="text-right">
                    <div className="font-medium">{tab.label}</div>
                    <div className="text-xs opacity-75">{tab.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default SystemManagerDashboard; 