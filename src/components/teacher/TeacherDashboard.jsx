<<<<<<< HEAD
=======
/**
 * TeacherDashboard Component - Israel Cyber Academy
 * 
 * Main dashboard for teachers with three essential tabs:
 * 1. StudentPool - Manage student assignments to classes
 * 2. Students - View analytics and progress for assigned students
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

>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
<<<<<<< HEAD
  Shield, 
  Users, 
  Calendar, 
  Monitor, 
  BarChart3, 
  FileText, 
  BookOpen, 
  MessageSquare,
  Home,
  Settings,
  LogOut
} from 'lucide-react';

// Import teacher components
import StudentPool from './StudentPool';
import ClassManagement from './ClassManagement';
import StudentManagement from './StudentManagement';
import StudentAnalytics from './StudentAnalytics';
import LessonPreview from './LessonPreview';
import TeacherNotes from './TeacherNotes';
import TeacherComments from './TeacherComments';
import LoadingSpinner from '../common/LoadingSpinner';

// Import auth context
import { useAuth } from '../../contexts/AuthContext';
import { useUserProfile } from '../../hooks/useAuth';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logout, loading: authLoading } = useAuth();
  const { userProfile } = useAuth();
  
  const [activeTab, setActiveTab] = useState('studentPool');
  const [isLoading, setIsLoading] = useState(true);

  // Simple access check - no infinite loops
  useEffect(() => {
    const checkAccess = async () => {
      try {
        console.log('🔍 Checking teacher access...', { 
          currentUser: !!currentUser, 
          authLoading, 
          userProfile: !!userProfile,
          role: userProfile?.role 
        });
        
        // Wait for auth to complete
        if (authLoading) {
          console.log('⏳ Auth still loading...');
          return;
        }

        // Check if user is authenticated
        if (!currentUser) {
          console.log('❌ No current user found, redirecting to login');
          toast.error('יש להתחבר כדי לגשת לאזור המורה');
          navigate('/');
          return;
        }

        // Check if user profile exists and has teacher role
        if (!userProfile || userProfile.role !== 'teacher') {
          console.log('❌ User is not a teacher, role:', userProfile?.role);
          toast.error('אין לך הרשאות לגשת לאזור המורה');
          navigate('/');
          return;
        }

        // Access granted
        console.log('✅ Teacher access granted!');
        setIsLoading(false);
        
      } catch (error) {
        console.error('❌ Access check error:', error);
        toast.error('אירעה שגיאה בבדיקת הרשאות');
        navigate('/');
      }
    };

    // Only run the check if we have authentication data
    if (!authLoading) {
      checkAccess();
    }
  }, [currentUser, userProfile, authLoading, navigate]);

  // Handle tab switching
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      toast.success('התנתקת בהצלחה');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('אירעה שגיאה בהתנתקות');
    }
  };

  // Available dashboard tabs
=======
  Users, 
  BarChart3, 
  BookOpen, 
  Shield,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useUserProfile } from '../../hooks/useAuth';
import { logSecurityEvent } from '../../utils/security';
import TeacherNavigation from './TeacherNavigation';
import StudentPool from './StudentPool';
import StudentAnalytics from './StudentAnalytics';
import TeacherNotes from './TeacherNotes';
import LoadingSpinner from '../common/LoadingSpinner';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { role, loading: profileLoading } = useUserProfile();
  
  // UI State Management
  const [activeTab, setActiveTab] = useState('studentPool');
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Available dashboard tabs with their configurations
   */
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
  const tabs = [
    {
      id: 'studentPool',
      label: 'בריכת תלמידים',
      icon: Users,
      description: 'ניהול הקצאת תלמידים לכיתות',
      color: 'blue'
    },
    {
<<<<<<< HEAD
      id: 'classes',
      label: 'ניהול כיתות',
      icon: Calendar,
      description: 'יצירה ועריכת כיתות ושיעורים',
      color: 'purple'
    },
    {
      id: 'students',
      label: 'ניהול תלמידים',
      icon: Monitor,
      description: 'צפייה וניהול פרטי תלמידים',
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
      label: 'תצוגת שיעורים',
      icon: FileText,
      description: 'תצוגה מקדימה של שיעורים',
      color: 'indigo'
    },
    {
      id: 'notes',
      label: 'הערות הוראה',
      icon: BookOpen,
      description: 'הוספת הערות ושינויים לשיעורים',
      color: 'pink'
    },
    {
      id: 'comments',
      label: 'הערות תלמידים',
      icon: MessageSquare,
      description: 'צפייה בהערות ומשוב תלמידים',
      color: 'orange'
    }
  ];

  // Render the active tab content
  const renderActiveTab = () => {
=======
      id: 'students',
      label: 'תלמידים',
      icon: BarChart3,
      description: 'ניתוח התקדמות וסטטיסטיקות',
      color: 'green'
    },
    {
      id: 'notes',
      label: 'הערות',
      icon: BookOpen,
      description: 'תצוגה מקדימה של שיעורים והוספת הערות',
      color: 'purple'
    }
  ];

  /**
   * Authentication and authorization check
   * Redirects non-teachers and handles loading states
   */
  useEffect(() => {
    const checkAccess = async () => {
      try {
        // Wait for authentication to complete
        if (authLoading || profileLoading) {
          return;
        }

        // Check if user is authenticated
        if (!user) {
          logSecurityEvent('UNAUTHORIZED_ACCESS_ATTEMPT', { 
            path: '/teacher/dashboard',
            timestamp: new Date().toISOString()
          });
          toast.error('יש להתחבר כדי לגשת לאזור המורה');
          navigate('/login');
          return;
        }

        // Check if user has teacher role
        if (role !== 'teacher') {
          logSecurityEvent('INSUFFICIENT_PERMISSIONS', { 
            uid: user.uid,
            role,
            requiredRole: 'teacher',
            path: '/teacher/dashboard'
          });
          toast.error('אין לך הרשאות לגשת לאזור המורה');
          navigate('/');
          return;
        }

        // Log successful access
        logSecurityEvent('TEACHER_DASHBOARD_ACCESS', { 
          uid: user.uid,
          role,
          timestamp: new Date().toISOString()
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Access check error:', error);
        toast.error('אירעה שגיאה בבדיקת הרשאות');
        navigate('/login');
      }
    };

    checkAccess();
  }, [user, role, authLoading, profileLoading, navigate]);

  /**
   * Handle tab switching with smooth transitions
   * @param {string} tabId - The ID of the tab to switch to
   */
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    
    // Log tab switch for analytics
    logSecurityEvent('TEACHER_TAB_SWITCH', {
      uid: user?.uid,
      fromTab: activeTab,
      toTab: tabId,
      timestamp: new Date().toISOString()
    });
  };

  /**
   * Render the active tab content with smooth animations
   */
  const renderActiveTab = () => {
    const tabVariants = {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 }
    };

>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
<<<<<<< HEAD
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
=======
          variants={tabVariants}
          initial="initial"
          animate="animate"
          exit="exit"
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex-1"
        >
          {activeTab === 'studentPool' && <StudentPool />}
<<<<<<< HEAD
          {activeTab === 'classes' && <ClassManagement />}
          {activeTab === 'students' && <StudentManagement />}
          {activeTab === 'analytics' && <StudentAnalytics />}
          {activeTab === 'lessons' && <LessonPreview />}
          {activeTab === 'notes' && <TeacherNotes />}
          {activeTab === 'comments' && <TeacherComments />}
=======
          {activeTab === 'students' && <StudentAnalytics />}
          {activeTab === 'notes' && <TeacherNotes />}
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
        </motion.div>
      </AnimatePresence>
    );
  };

  // Show loading spinner while checking access
<<<<<<< HEAD
  if (isLoading || authLoading) {
=======
  if (isLoading || authLoading || profileLoading) {
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
<<<<<<< HEAD
      {/* Full Instructor Console Header */}
      <nav className="bg-gray-800/80 backdrop-blur-xl border-b border-gray-700 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-gray-100" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-100">Israel Cyber Academy</h1>
                <p className="text-xs text-gray-400">Instructor Console</p>
              </div>
            </div>

            {/* User Info and Actions */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-100">{userProfile?.email}</p>
                <p className="text-xs text-gray-400">מורה מורשה</p>
              </div>
              
              <button
                onClick={() => navigate('/instructor/profile')}
                className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-gray-100 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>הגדרות</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>התנתק</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Console Content */}
      <div className="flex h-screen">
        {/* Sidebar Navigation */}
        <div className="w-80 bg-gray-800/50 border-r border-gray-700 flex flex-col">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-100 mb-6">לוח בקרה למורה</h2>
            
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`w-full flex items-center space-x-3 p-4 rounded-xl text-right transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <div className="flex-1 text-right">
                    <div className="font-medium">{tab.label}</div>
                    <div className="text-xs opacity-75">{tab.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Console Footer */}
          <div className="mt-auto p-6 border-t border-gray-700">
            <div className="text-center text-gray-400 text-xs">
              <p>Israel Cyber Academy</p>
              <p>Instructor Console v2.0</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Content Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                {(() => {
                  const activeTabData = tabs.find(tab => tab.id === activeTab);
                  const IconComponent = activeTabData?.icon;
                  return IconComponent ? <IconComponent className="w-4 h-4 text-gray-100" /> : null;
                })()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-100">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </h2>
                <p className="text-gray-400">
                  {tabs.find(tab => tab.id === activeTab)?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="bg-gray-800/30 rounded-xl border border-gray-700 min-h-full">
              {renderActiveTab()}
            </div>
          </div>
=======
      {/* Navigation Header */}
      <TeacherNavigation />

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-gray-100" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-100">לוח בקרה למורה</h1>
              <p className="text-gray-400 mt-1">ניהול כיתות, תלמידים והערות הוראה</p>
            </div>
          </div>
          
          {/* Access Status Indicator */}
          <div className="flex items-center space-x-2 text-sm text-green-400">
            <CheckCircle className="w-4 h-4" />
            <span>מורה מורשה - גישה מלאה למערכת</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-800/50 p-1 rounded-xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? `bg-${tab.color}-600 text-gray-100 shadow-lg`
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
          
          {/* Tab Description */}
          <div className="mt-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
            <p className="text-gray-300 text-sm">
              {tabs.find(tab => tab.id === activeTab)?.description}
            </p>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-6 min-h-[600px]">
          {renderActiveTab()}
        </div>

        {/* Footer Information */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Israel Cyber Academy - מערכת ניהול מורים</p>
          <p className="mt-1">גרסה 1.0.0 | תמיכה טכנית: support@israelcyber.academy</p>
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard; 