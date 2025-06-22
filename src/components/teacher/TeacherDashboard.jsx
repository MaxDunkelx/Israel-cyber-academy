/**
 * TeacherDashboard Component - Israel Cyber Academy
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
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useUserProfile } from '../../hooks/useAuth';
import { logSecurityEvent } from '../../utils/security';
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
  const tabs = [
    {
      id: 'studentPool',
      label: 'בריכת תלמידים',
      icon: Users,
      description: 'ניהול הקצאת תלמידים לכיתות',
      color: 'blue'
    },
    {
      id: 'analytics',
      label: 'אנליטיקה',
      icon: BarChart3,
      description: 'ניתוח התקדמות וסטטיסטיקות',
      color: 'yellow'
    },
    {
      id: 'notes',
      label: 'הערות הוראה',
      icon: BookOpen,
      description: 'תצוגה מקדימה של שיעורים והערות',
      color: 'indigo'
    }
  ];

  /**
   * Access control and security logging
   */
  useEffect(() => {
    const checkAccess = async () => {
      try {
        console.log('🔍 Checking teacher access...', { 
          user: !!user, 
          authLoading, 
          role, 
          profileLoading 
        });
        
        // Wait for auth to complete
        if (authLoading || profileLoading) {
          console.log('⏳ Auth still loading...');
          return;
        }

        // Check if user is authenticated
        if (!user) {
          console.log('❌ No user found, redirecting to login');
          toast.error('יש להתחבר כדי לגשת לאזור המורה');
          navigate('/');
          return;
        }

        // Check if user has teacher role
        if (role !== 'teacher') {
          console.log('❌ User is not a teacher, role:', role);
          toast.error('אין לך הרשאות לגשת לאזור המורה');
          navigate('/');
          return;
        }

        // Access granted - log security event
        console.log('✅ Teacher access granted!');
        await logSecurityEvent('teacher_dashboard_access', {
          userId: user.uid,
          role: role,
          timestamp: new Date().toISOString()
        });
        
        setIsLoading(false);
        
      } catch (error) {
        console.error('❌ Access check error:', error);
        toast.error('אירעה שגיאה בבדיקת הרשאות');
        navigate('/');
      }
    };

    // Only run the check if we have authentication data
    if (!authLoading && !profileLoading) {
      checkAccess();
    }
  }, [user, role, authLoading, profileLoading, navigate]);

  /**
   * Handle tab switching with animation
   */
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    
    // Log tab change for analytics
    logSecurityEvent('teacher_tab_change', {
      userId: user?.uid,
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
      case 'studentPool':
        return <StudentPool />;
      case 'analytics':
        return <StudentAnalytics />;
      case 'notes':
        return <TeacherNotes />;
      default:
        return <StudentPool />;
    }
  };

  /**
   * Get tab color classes
   */
  const getTabColorClasses = (color) => {
    const colorMap = {
      blue: 'border-blue-500 bg-blue-500/10 text-blue-400',
      yellow: 'border-yellow-500 bg-yellow-500/10 text-yellow-400',
      indigo: 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
    };
    return colorMap[color] || colorMap.blue;
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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold text-white">ישראל אקדמיה לסייבר</h1>
                <p className="text-gray-400">אזור המורה</p>
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
          <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md transition-all duration-200 ${
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
  );
};

export default TeacherDashboard; 