/**
 * TeacherNavigation Component - Israel Cyber Academy
 * 
 * Clean, streamlined navigation header for the teacher console.
 * Provides essential navigation elements without duplication of dashboard tabs.
 * 
 * Features:
 * - Brand logo and teacher badge
 * - Active session indicator with real-time data
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
  FileText,
  Users,
  BarChart3,
  Monitor,
  Settings,
  Bell,
  BellOff,
  X as CloseIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { useUserProfile } from '../../hooks/useAuth';
import { logSecurityEvent } from '../../utils/security';
import { getTeacherActiveSessions, listenToSession, cleanupStaleSessions } from '../../firebase/session-service';
import { endSession } from '../../firebase/session-service';
import LiveSessionIndicator from '../common/LiveSessionIndicator';

const TeacherNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();
  const { displayName, role } = useUserProfile();
  
  // UI State Management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeSession, setActiveSession] = useState(null);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [isEndingSession, setIsEndingSession] = useState(false);
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
   * Load and track active sessions for the teacher
   */
  useEffect(() => {
    if (!currentUser?.uid) return;

    let unsubscribe = null;

    const loadActiveSessions = async () => {
      try {
        // First, clean up any stale sessions
        await cleanupStaleSessions(currentUser.uid);
        
        const sessions = await getTeacherActiveSessions(currentUser.uid);
        
        if (sessions.length > 0) {
          const mostRecentSession = sessions[0]; // Already sorted by startTime desc
          setActiveSession(mostRecentSession);
          
          // Listen to real-time updates for this session
          unsubscribe = listenToSession(mostRecentSession.id, (updatedSession) => {
            if (updatedSession && updatedSession.status === 'active') {
              setActiveSession(updatedSession);
            } else {
              // Session ended or no longer active
              setActiveSession(null);
              setSessionDuration(0);
            }
          });
        } else {
          setActiveSession(null);
          setSessionDuration(0);
        }
      } catch (error) {
        console.error('Error loading active sessions:', error);
        setActiveSession(null);
      }
    };

    loadActiveSessions();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [currentUser?.uid]);

  /**
   * Calculate session duration in real-time
   */
  useEffect(() => {
    if (!activeSession?.startTime) {
      setSessionDuration(0);
      return;
    }

    const interval = setInterval(() => {
      const startTime = activeSession.startTime?.toDate?.() || new Date(activeSession.startTime);
      const duration = Math.floor((Date.now() - startTime.getTime()) / 1000);
      setSessionDuration(duration);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSession?.startTime]);

  /**
   * Handle teacher logout with security logging
   */
  const handleLogout = async () => {
    try {
      // End any active session before logout
      if (activeSession) {
        await endSession(activeSession.id);
        toast.success('השיעור הסתיים והתנתקת בהצלחה');
      } else {
        toast.success('התנתקת בהצלחה');
      }
      
      await logout();
      logSecurityEvent('TEACHER_LOGOUT', { role, uid: displayName });
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('אירעה שגיאה בהתנתקות');
    }
  };

  /**
   * Handle ending the active session
   */
  const handleEndSession = async () => {
    if (!activeSession || isEndingSession) return;

    try {
      setIsEndingSession(true);
      await endSession(activeSession.id);
      setActiveSession(null);
      setSessionDuration(0);
      toast.success('השיעור הסתיים בהצלחה');
      
      logSecurityEvent('SESSION_ENDED_BY_TEACHER', {
        sessionId: activeSession.id,
        teacherId: currentUser.uid,
        lessonId: activeSession.lessonId,
        duration: sessionDuration
      });
    } catch (error) {
      console.error('Error ending session:', error);
      toast.error('אירעה שגיאה בסיום השיעור');
    } finally {
      setIsEndingSession(false);
    }
  };

  /**
   * Format session duration for display
   * @param {number} seconds - Duration in seconds
   * @returns {string} Formatted duration string
   */
  const formatSessionDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
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
            {/* Live Session Indicator */}
            <LiveSessionIndicator position="inline" />
            {/* Navigation buttons removed - handled by dashboard tabs */}
          </div>

          {/* Active Session Indicator - Only show when there's an active session */}
          {activeSession && (
            <div className="hidden md:flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">פעיל</span>
                <span className="text-gray-300 text-sm">
                  {activeSession.lessonName || `שיעור ${activeSession.lessonId}`}
                </span>
                <span className="text-gray-400 text-xs">
                  {formatSessionDuration(sessionDuration)}
                </span>
              </div>
              
              <Link
                to={`/teacher/session/${activeSession.id}`}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-gray-100 text-sm font-medium transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>המשך שיעור</span>
              </Link>

              <button
                onClick={handleEndSession}
                disabled={isEndingSession}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 disabled:bg-red-800 px-3 py-2 rounded-lg text-gray-100 text-sm font-medium transition-colors"
              >
                <CloseIcon className="w-4 h-4" />
                <span>{isEndingSession ? 'מסיים...' : 'סיים שיעור'}</span>
              </button>
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
                    <p className="text-xs text-gray-400">מורה</p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <Link
                      to="/teacher/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4 mr-3" />
                      פרופיל
                    </Link>
                    
                    <Link
                      to="/teacher/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      הגדרות
                    </Link>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-600 pt-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      התנתק
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-700 py-4"
          >
            {/* Active Session Mobile View */}
            {activeSession && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-medium">שיעור פעיל</span>
                  </div>
                  <span className="text-gray-300 text-sm">
                    {formatSessionDuration(sessionDuration)}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mt-1">
                  {activeSession.lessonName || `שיעור ${activeSession.lessonId}`}
                </p>
                <div className="flex space-x-2 mt-2">
                  <Link
                    to={`/teacher/session/${activeSession.id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-center text-gray-100 text-sm font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    המשך שיעור
                  </Link>
                  <button
                    onClick={handleEndSession}
                    disabled={isEndingSession}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-800 px-3 py-2 rounded text-center text-gray-100 text-sm font-medium transition-colors"
                  >
                    {isEndingSession ? 'מסיים...' : 'סיים'}
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              <Link
                to="/teacher/dashboard"
                className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="w-5 h-5 mr-3" />
                דשבורד
              </Link>
              
              <Link
                to="/teacher/profile"
                className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5 mr-3" />
                פרופיל
              </Link>
              
              <Link
                to="/teacher/settings"
                className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings className="w-5 h-5 mr-3" />
                הגדרות
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default TeacherNavigation; 