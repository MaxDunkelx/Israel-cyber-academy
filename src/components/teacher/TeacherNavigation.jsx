/**
 * TeacherNavigation Component - Israel Cyber Academy
 * 
 * Clean, streamlined navigation header for the teacher console.
 * Provides essential navigation elements without duplication of dashboard tabs.
 * 
 * Features:
 * - Brand logo and teacher badge
 * - Active session indicator
 * - User profile menu
 * - Mobile responsive design
 * - Security event logging
 * 
 * @component
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  LogOut, 
  User, 
  Menu, 
  X,
  Home,
  Clock,
  Activity,
  Play,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { useUserProfile } from '../../hooks/useAuth';
import { logSecurityEvent } from '../../utils/security';

const TeacherNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { displayName, role } = useUserProfile();
  
  // UI State Management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeSession, setActiveSession] = useState(null);
  const userMenuRef = useRef(null);

  /**
   * Handle click outside to close dropdown menu
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  /**
   * Mock active session data - in production this would come from Firebase
   * Tracks current teaching session for quick access
   */
  useEffect(() => {
    // Simulate checking for active session
    const mockActiveSession = {
      id: 'session-123',
      lessonId: 1,
      lessonName: 'מבוא לאבטחת סייבר',
      students: 15,
      activeStudents: 12,
      currentSlide: 5,
      totalSlides: 18,
      startTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      status: 'active'
    };
    setActiveSession(mockActiveSession);
  }, []);

  /**
   * Handle teacher logout with security logging
   */
  const handleLogout = async () => {
    try {
      await logout();
      logSecurityEvent('TEACHER_LOGOUT', { role, uid: displayName });
      toast.success('התנתקת בהצלחה');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('אירעה שגיאה בהתנתקות');
    }
  };

  /**
   * Format session duration for display
   * @param {Date} startTime - Session start time
   * @returns {string} Formatted duration string
   */
  const formatSessionDuration = (startTime) => {
    const duration = Date.now() - startTime.getTime();
    const minutes = Math.floor(duration / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours > 0) {
      return `${hours}ש ${remainingMinutes}ד`;
    }
    return `${minutes} דקות`;
  };

  return (
    <nav className="bg-gray-900/95 backdrop-blur-xl border-b border-gray-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Brand Logo and Teacher Badge */}
          <div className="flex items-center">
            <Link to="/teacher/dashboard" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-gray-100" />
              </div>
              <span className="text-xl font-bold text-gray-200">Israel Cyber Campus</span>
              <span className="text-sm text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full">
                אזור מורה
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Clean and minimal */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Navigation buttons removed - handled by dashboard tabs */}
          </div>

          {/* Active Session Indicator - Only show when there's an active session */}
          {activeSession && (
            <div className="hidden md:flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">פעיל</span>
                <span className="text-gray-300 text-sm">
                  {activeSession.lessonName}
                </span>
              </div>
              
              <Link
                to={`/teacher/session/${activeSession.id}`}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-gray-100 text-sm font-medium transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>המשך שיעור</span>
              </Link>
            </div>
          )}

          {/* User Menu and Mobile Controls */}
          <div className="flex items-center space-x-4">
            
            {/* User Profile Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 bg-gray-800/50 hover:bg-gray-700/50 px-4 py-2 rounded-lg text-gray-200 transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-gray-100" />
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium block">{displayName}</span>
                  <span className="text-xs text-gray-400">מורה</span>
                </div>
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-xl border border-gray-600 py-2 z-50"
                >
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-600">
                    <p className="text-sm text-gray-200">{displayName}</p>
                    <p className="text-xs text-gray-400">מורה מורשה</p>
                  </div>
                  
                  {/* Active Session Info */}
                  {activeSession && (
                    <div className="px-4 py-3 border-b border-gray-600">
                      <div className="flex items-center space-x-2 mb-2">
                        <Activity className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-green-400 font-medium">שיעור פעיל</span>
                      </div>
                      <p className="text-xs text-gray-300 mb-1">{activeSession.lessonName}</p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>שקופית {activeSession.currentSlide}/{activeSession.totalSlides}</span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatSessionDuration(activeSession.startTime)}</span>
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Navigation Links */}
                  <Link
                    to="/teacher/dashboard"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors w-full text-right"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Home className="w-4 h-4" />
                    <span>דף הבית</span>
                  </Link>
                  
                  <Link
                    to="/teacher/slides"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors w-full text-right"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <FileText className="w-4 h-4" />
                    <span>מנהל שקופיות</span>
                  </Link>
                  
                  <div className="border-t border-gray-600 my-1"></div>
                  
                  {/* Logout Button */}
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors w-full text-right"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>התנתק</span>
                  </button>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-4 border-t border-gray-600"
          >
            <div className="space-y-2">
              {/* Navigation buttons removed - they're already in the dashboard tabs */}
              
              {/* Active Session for Mobile */}
              {activeSession && (
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-medium">שיעור פעיל</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{activeSession.lessonName}</p>
                  <Link
                    to={`/teacher/session/${activeSession.id}`}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-gray-100 text-sm font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Play className="w-4 h-4" />
                    <span>המשך שיעור</span>
                  </Link>
                </div>
              )}
              
              {/* Mobile Logout Button */}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors w-full text-right"
              >
                <LogOut className="w-4 h-4" />
                <span>התנתק</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default TeacherNavigation; 