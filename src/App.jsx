/**
 * App Component - Main Application Router
 * 
 * Handles routing and authentication state management.
 * Provides protected routes and role-based access control.
 * 
 * Key Features:
 * - Authentication-based routing
 * - Role-based access control (student/teacher)
 * - Protected route handling
 * - Loading state management
 * - Error boundary integration
 * 
 * Component Flow:
 * 1. Check authentication state
 * 2. Route to appropriate component based on auth and role
 * 3. Handle loading and error states
 * 4. Provide navigation context
 */

import React, { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';

// Student Components
import EnhancedLogin from './components/EnhancedLogin';
import Navigation from './components/Navigation';
import Roadmap from './components/Roadmap';
import InteractiveLesson from './components/InteractiveLesson';
import Profile from './components/Profile';
import StudentDashboard from './components/student/StudentDashboard';
import LiveSessionNotification from './components/student/LiveSessionNotification';
import LiveSessionIndicator from './components/common/LiveSessionIndicator';

// Teacher Components
import TeacherNavigation from './components/teacher/TeacherNavigation';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import SessionHosting from './components/teacher/SessionHosting';
import SessionCreation from './components/teacher/SessionCreation';
import LessonController from './components/teacher/LessonController';
import SlidePreviewManager from './components/teacher/SlidePreviewManager';
import RealAnalytics from './components/teacher/RealAnalytics';
import ClassroomInterface from './components/teacher/ClassroomInterface';
import StudentPool from './components/teacher/StudentPool';
import StudentSession from './components/student/StudentSession';

// System Manager Components
import SystemManagerDashboard from './components/system-manager/SystemManagerDashboard';
import SystemManagerNavigation from './components/system-manager/SystemManagerNavigation';
import UserManagement from './components/system-manager/UserManagement';
import SystemSettings from './components/system-manager/SystemSettings';
import SystemLogs from './components/system-manager/SystemLogs';
import ExcelImport from './components/system-manager/ExcelImport';

// import './App.css';

/**
 * Protected Route Component
 * 
 * Wraps routes that require authentication and optionally specific roles.
 * Redirects to login if not authenticated or to appropriate dashboard if wrong role.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {string} props.requiredRole - Required role for access (optional)
 * @returns {JSX.Element} Protected route component
 */
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { currentUser, loading, role } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

/**
 * Teacher Route Component
 * 
 * Wraps routes that require teacher role authentication.
 * Redirects to login if not authenticated or to appropriate dashboard if wrong role.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} Teacher route component
 */
const TeacherRoute = ({ children }) => {
  const { currentUser, loading, role } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'teacher') {
    // Redirect to appropriate dashboard based on role
    if (role === 'system_manager') {
      return <Navigate to="/system-manager/dashboard" replace />;
    } else {
      return <Navigate to="/student/roadmap" replace />;
    }
  }

  return <>{children}</>;
};

/**
 * Student Route Component
 * 
 * Wraps routes that require student role authentication.
 * Redirects to login if not authenticated or to appropriate dashboard if wrong role.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} Student route component
 */
const StudentRoute = ({ children }) => {
  const { currentUser, loading, role } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'student') {
    // Redirect to appropriate dashboard based on role
    if (role === 'system_manager') {
      return <Navigate to="/system-manager/dashboard" replace />;
    } else if (role === 'teacher') {
      return <Navigate to="/teacher/dashboard" replace />;
    } else {
      return <Navigate to="/student/roadmap" replace />;
    }
  }

  return <>{children}</>;
};

/**
 * System Manager Route Component
 * 
 * Wraps routes that require system manager role authentication.
 * Redirects to login if not authenticated or to appropriate dashboard if wrong role.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} System manager route component
 */
const SystemManagerRoute = ({ children }) => {
  const { currentUser, loading, role } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'system_manager') {
    // Redirect to appropriate dashboard based on role
    if (role === 'teacher') {
      return <Navigate to="/teacher/dashboard" replace />;
    } else {
      return <Navigate to="/student/roadmap" replace />;
    }
  }

  return <>{children}</>;
};

/**
 * Main App Component
 * 
 * Sets up routing and authentication context.
 * Handles the main application structure with separate student and teacher platforms.
 * 
 * @returns {JSX.Element} Main app component
 */
const AppContent = () => {
  const { currentUser, role } = useAuth();

  // Memoize login route element to prevent infinite re-renders
  const loginRouteElement = useMemo(() => {
    if (currentUser) {
      if (role === 'system_manager') {
        return <Navigate to="/system-manager/dashboard" replace />;
      } else if (role === 'teacher') {
        return <Navigate to="/teacher/dashboard" replace />;
      } else {
        return <Navigate to="/student/roadmap" replace />;
      }
    } else {
      return <EnhancedLogin />;
    }
  }, [currentUser, role]);

  // Memoize main route redirect to prevent infinite re-renders
  const mainRouteRedirect = useMemo(() => {
    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }
    
    if (role === 'system_manager') {
      return <Navigate to="/system-manager/dashboard" replace />;
    }
    
    if (role === 'teacher') {
      return <Navigate to="/teacher/dashboard" replace />;
    }
    
    return <Navigate to="/student/roadmap" replace />;
  }, [currentUser, role]);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Live Session Notification - only for students */}
        {currentUser && role === 'student' && <LiveSessionNotification />}
        
        {/* Global Live Session Indicator */}
        {currentUser && (role === 'teacher' || role === 'student') && (
          <LiveSessionIndicator position="top-right" />
        )}
        
        {/* Navigation - only show when authenticated */}
        {currentUser && role === 'student' && <Navigation />}
        {currentUser && role === 'teacher' && <TeacherNavigation />}
        {currentUser && role === 'system_manager' && <SystemManagerNavigation />}
        
        {/* Main Routes */}
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={mainRouteRedirect}
          />
          
          <Route
            path="/login"
            element={loginRouteElement}
          />
          
          {/* Student Routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoute>
                <Navigate to="/student/roadmap" replace />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/student/roadmap"
            element={
              <StudentRoute>
                <Roadmap />
              </StudentRoute>
            }
          />
          
          <Route
            path="/student/lesson/:lessonId"
            element={
              <StudentRoute>
                <InteractiveLesson />
              </StudentRoute>
            }
          />
          
          <Route
            path="/student/session/:sessionId"
            element={
              <StudentRoute>
                <StudentSession />
              </StudentRoute>
            }
          />
          
          <Route
            path="/student/profile"
            element={
              <StudentRoute>
                <Profile />
              </StudentRoute>
            }
          />
          
          <Route
            path="/student/dashboard"
            element={
              <StudentRoute>
                <StudentDashboard />
              </StudentRoute>
            }
          />
          
          {/* Teacher Routes */}
          <Route
            path="/teacher/dashboard"
            element={
              <TeacherRoute>
                <TeacherDashboard />
              </TeacherRoute>
            }
          />
          
          <Route
            path="/teacher/session/create"
            element={
              <TeacherRoute>
                <SessionCreation />
              </TeacherRoute>
            }
          />
          
          <Route
            path="/teacher/session/:sessionId"
            element={
              <TeacherRoute>
                <SessionHosting />
              </TeacherRoute>
            }
          />
          
          <Route
            path="/teacher/controller/:sessionId"
            element={
              <TeacherRoute>
                <LessonController />
              </TeacherRoute>
            }
          />
          
          <Route
            path="/teacher/slides"
            element={
              <TeacherRoute>
                <SlidePreviewManager />
              </TeacherRoute>
            }
          />
          
          <Route
            path="/teacher/profile"
            element={
              <TeacherRoute>
                <Profile />
              </TeacherRoute>
            }
          />
          
          <Route
            path="/teacher/real-analytics"
            element={
              <TeacherRoute>
                <RealAnalytics />
              </TeacherRoute>
            }
          />
          
          <Route
            path="/teacher/classroom-interface"
            element={
              <TeacherRoute>
                <ClassroomInterface />
              </TeacherRoute>
            }
          />
          
          <Route
            path="/teacher/student-pool"
            element={
              <TeacherRoute>
                <StudentPool />
              </TeacherRoute>
            }
          />
          
          {/* System Manager Routes */}
          <Route
            path="/system-manager"
            element={
              <SystemManagerRoute>
                <Navigate to="/system-manager/dashboard" replace />
              </SystemManagerRoute>
            }
          />
          
          <Route
            path="/system-manager/dashboard"
            element={
              <SystemManagerRoute>
                <SystemManagerDashboard />
              </SystemManagerRoute>
            }
          />
          
          <Route
            path="/system-manager/users"
            element={
              <SystemManagerRoute>
                <UserManagement />
              </SystemManagerRoute>
            }
          />
          
          <Route
            path="/system-manager/imports"
            element={
              <SystemManagerRoute>
                <ExcelImport />
              </SystemManagerRoute>
            }
          />
          
          <Route
            path="/system-manager/settings"
            element={
              <SystemManagerRoute>
                <SystemSettings />
              </SystemManagerRoute>
            }
          />
          
          <Route
            path="/system-manager/logs"
            element={
              <SystemManagerRoute>
                <SystemLogs />
              </SystemManagerRoute>
            }
          />
          
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        {/* Toast Notifications */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: '',
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
};

/**
 * App Component with Error Boundary
 * 
 * Wraps the entire application with error boundary and authentication context.
 * 
 * @returns {JSX.Element} App component with error handling
 */
const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
