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
import { useUserProfile } from './hooks/useAuth';
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

// Teacher Components
import TeacherNavigation from './components/teacher/TeacherNavigation';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import ClassManagement from './components/teacher/ClassManagement';
import StudentManagement from './components/teacher/StudentManagement';
import TeacherAnalytics from './components/teacher/TeacherAnalytics';
import TeacherComments from './components/teacher/TeacherComments';
import SessionHosting from './components/teacher/SessionHosting';
import SessionCreation from './components/teacher/SessionCreation';
import StudentMonitor from './components/teacher/StudentMonitor';
import LessonController from './components/teacher/LessonController';
import SlidePreviewManager from './components/teacher/SlidePreviewManager';
import StudentSession from './components/student/StudentSession';
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
 * Redirects to login if not authenticated or to student dashboard if wrong role.
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
    return <Navigate to="/student/roadmap" replace />;
  }

  return <>{children}</>;
};

/**
 * Student Route Component
 * 
 * Wraps routes that require student role authentication.
 * Redirects to login if not authenticated or to teacher dashboard if wrong role.
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
    return <Navigate to="/teacher/dashboard" replace />;
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

  /**
   * Determine main route redirect based on user authentication and role
   * @returns {JSX.Element} Redirect component
   */
  const getMainRouteRedirect = useMemo(() => {
    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }
    
    if (role === 'teacher') {
      return <Navigate to="/teacher/dashboard" replace />;
    }
    
    return <Navigate to="/student/roadmap" replace />;
  }, [currentUser, role]);

  // Memoize login route element to prevent infinite re-renders
  const loginRouteElement = useMemo(() => {
    if (currentUser) {
      if (role === 'teacher') {
        return <Navigate to="/teacher/dashboard" replace />;
      } else {
        return <Navigate to="/student/roadmap" replace />;
      }
    } else {
      return <EnhancedLogin />;
    }
  }, [currentUser, role]);

  return (
    <Router basename="/Israel-cyber-academy">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Live Session Notification - only for students */}
        {currentUser && role === 'student' && <LiveSessionNotification />}
        
        {/* Navigation - only show when authenticated */}
        {currentUser && role === 'student' && <Navigation />}
        {currentUser && role === 'teacher' && <TeacherNavigation />}
        
        {/* Main Routes */}
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={getMainRouteRedirect}
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
            path="/teacher/classes"
            element={
              <TeacherRoute>
                <ClassManagement />
              </TeacherRoute>
            }
          />
          
          <Route
            path="/teacher/students"
            element={
              <TeacherRoute>
                <StudentManagement />
              </TeacherRoute>
            }
          />
          
          <Route
            path="/teacher/analytics"
            element={
              <TeacherRoute>
                <TeacherAnalytics />
              </TeacherRoute>
            }
          />
          
          <Route
            path="/teacher/comments"
            element={
              <TeacherRoute>
                <TeacherComments />
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
            path="/teacher/monitor/:sessionId"
            element={
              <TeacherRoute>
                <StudentMonitor />
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
