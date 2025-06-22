import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
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
  const tabs = [
    {
      id: 'studentPool',
      label: 'בריכת תלמידים',
      icon: Users,
      description: 'ניהול הקצאת תלמידים לכיתות',
      color: 'blue'
    },
    {
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
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex-1"
        >
          {activeTab === 'studentPool' && <StudentPool />}
          {activeTab === 'classes' && <ClassManagement />}
          {activeTab === 'students' && <StudentManagement />}
          {activeTab === 'analytics' && <StudentAnalytics />}
          {activeTab === 'lessons' && <LessonPreview />}
          {activeTab === 'notes' && <TeacherNotes />}
          {activeTab === 'comments' && <TeacherComments />}
        </motion.div>
      </AnimatePresence>
    );
  };

  // Show loading spinner while checking access
  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
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
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard; 