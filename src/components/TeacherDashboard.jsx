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
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useUserProfile } from '../hooks/useAuth';
import { logSecurityEvent } from '../utils/security';
import TeacherNavigation from './teacher/TeacherNavigation';
import StudentPool from './teacher/StudentPool';
import StudentAnalytics from './teacher/StudentAnalytics';
import TeacherNotes from './teacher/TeacherNotes';
import LoadingSpinner from './common/LoadingSpinner';

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
  const tabs = [
    {
      id: 'studentPool',
      label: 'בריכת תלמידים',
      icon: Users,
      description: 'ניהול הקצאת תלמידים לכיתות',
      color: 'blue'
    },
    {
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

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={tabVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex-1"
        >
          {activeTab === 'studentPool' && <StudentPool />}
          {activeTab === 'students' && <StudentAnalytics />}
          {activeTab === 'notes' && <TeacherNotes />}
        </motion.div>
      </AnimatePresence>
    );
  };

  // Show loading spinner while checking access
  if (isLoading || authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
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
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
