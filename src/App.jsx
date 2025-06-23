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

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import { useUserProfile } from './hooks/useAuth';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';

// Student Components
import EnhancedLogin from './components/EnhancedLogin';
import Navigation from './components/Navigation';
import Roadmap from './components/Roadmap';
import InteractiveLesson from './components/InteractiveLesson';
import Profile from './components/Profile';

// Teacher Components
import TeacherNavigation from './components/teacher/TeacherNavigation';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import ClassManagement from './components/teacher/ClassManagement';
import StudentManagement from './components/teacher/StudentManagement';
import TeacherAnalytics from './components/teacher/TeacherAnalytics';
import TeacherComments from './components/teacher/TeacherComments';
import SessionHosting from './components/teacher/SessionHosting';
import StudentMonitor from './components/teacher/StudentMonitor';
import LessonController from './components/teacher/LessonController';

/**
 * Protected Route Component
 * 
 * Wraps routes that require authentication.
 * Redirects to login if user is not authenticated.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {string} props.requiredRole - Required user role (optional)
 * @returns {JSX.Element} Protected route component
 */
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { currentUser, loading } = useAuth();
  const { role } = useUserProfile();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

/**
 * Teacher Route Component
 * 
 * Wraps routes that require teacher role.
 * Redirects to login if user is not a teacher.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} Teacher route component
 */
const TeacherRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const { role } = useUserProfile();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'teacher') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

/**
 * Student Route Component
 * 
 * Wraps routes that require student role.
 * Redirects to login if user is not a student.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} Student route component
 */
const StudentRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const { role } = useUserProfile();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'student') {
    return <Navigate to="/login" replace />;
  }

  return children;
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
  const { currentUser, loading } = useAuth();
  const { role } = useUserProfile();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Determine the correct redirect based on user state and role
  const getMainRouteRedirect = () => {
    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }
    
    if (role === 'teacher') {
      return <Navigate to="/teacher/dashboard" replace />;
    }
    
    if (role === 'student') {
      return <Navigate to="/student/roadmap" replace />;
    }
    
    return <Navigate to="/login" replace />;
  };

  return (
    <Router basename="/Israel-cyber-academy">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Navigation - only show when authenticated */}
        {currentUser && role === 'student' && <Navigation />}
        {currentUser && role === 'teacher' && <TeacherNavigation />}
        
        {/* Main Routes */}
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={getMainRouteRedirect()}
          />
          
          <Route
            path="/login"
            element={
              currentUser ? 
                (role === 'teacher' ? 
                  <Navigate to="/teacher/dashboard" replace /> : 
                  <Navigate to="/student/roadmap" replace />
                ) : 
                <EnhancedLogin />
            }
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
            path="/student/profile"
            element={
              <StudentRoute>
                <Profile />
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
