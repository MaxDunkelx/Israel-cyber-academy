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
import TeacherLogin from './components/teacher/TeacherLogin';
import TeacherNavigation from './components/teacher/TeacherNavigation';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import ClassManagement from './components/teacher/ClassManagement';
import StudentManagement from './components/teacher/StudentManagement';
import TeacherAnalytics from './components/teacher/TeacherAnalytics';
import TeacherComments from './components/teacher/TeacherComments';
import LessonPreview from './components/teacher/LessonPreview';
import SessionHosting from './components/teacher/SessionHosting';
import StudentMonitor from './components/teacher/StudentMonitor';
import LessonController from './components/teacher/LessonController';

// Development Components
import FirebaseDiagnostic from './components/FirebaseDiagnostic';
import DataTest from './components/DataTest';
import DebugAuth from './components/DebugAuth';

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
    console.log('🚫 ProtectedRoute: No user, redirecting to /');
    return <Navigate to="/" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    console.log(`🚫 ProtectedRoute: Role mismatch. Required: ${requiredRole}, Current: ${role}`);
    return <Navigate to="/roadmap" replace />;
  }

  return children;
};

/**
 * Teacher Route Component
 * 
 * Wraps routes that require teacher role.
 * Redirects to teacher login if user is not a teacher.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} Teacher route component
 */
const TeacherRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const { role } = useUserProfile();

  console.log('🔍 TeacherRoute - Current user:', currentUser?.email);
  console.log('🔍 TeacherRoute - User role:', role);
  console.log('🔍 TeacherRoute - Loading:', loading);

  if (loading) {
    console.log('⏳ TeacherRoute: Loading...');
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!currentUser) {
    console.log('🚫 TeacherRoute: No user, redirecting to /teacher/login');
    return <Navigate to="/teacher/login" replace />;
  }

  if (role !== 'teacher') {
    console.log('🚫 TeacherRoute: Access denied. User role is', role, 'but teacher role required');
    console.log('🚫 TeacherRoute: Redirecting to /teacher/login');
    return <Navigate to="/teacher/login" replace />;
  }

  console.log('✅ TeacherRoute: Access granted for teacher');
  return children;
};

/**
 * Student Route Component
 * 
 * Wraps routes that require student role.
 * Redirects to student login if user is not a student.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} Student route component
 */
const StudentRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const { role } = useUserProfile();

  console.log('🔍 StudentRoute - Current user:', currentUser?.email);
  console.log('🔍 StudentRoute - User role:', role);
  console.log('🔍 StudentRoute - Loading:', loading);

  if (loading) {
    console.log('⏳ StudentRoute: Loading...');
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!currentUser) {
    console.log('🚫 StudentRoute: No user, redirecting to /');
    return <Navigate to="/" replace />;
  }

  if (role !== 'student') {
    console.log('🚫 StudentRoute: Access denied. User role is', role, 'but student role required');
    console.log('🚫 StudentRoute: Redirecting to /');
    return <Navigate to="/" replace />;
  }

  console.log('✅ StudentRoute: Access granted for student');
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

  // Debug logging
  console.log('🔍 AppContent - Current user:', currentUser?.email);
  console.log('🔍 AppContent - User role:', role);
  console.log('🔍 AppContent - Loading:', loading);

  if (loading) {
    console.log('⏳ AppContent: Loading authentication state...');
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Determine the correct redirect based on user state and role
  const getMainRouteRedirect = () => {
    if (!currentUser) {
      console.log('🔀 Main route: No user, showing login');
      return <EnhancedLogin />;
    }
    
    if (role === 'teacher') {
      console.log('🔀 Main route: Teacher detected, redirecting to /teacher/dashboard');
      return <Navigate to="/teacher/dashboard" replace />;
    }
    
    if (role === 'student') {
      console.log('🔀 Main route: Student detected, redirecting to /roadmap');
      return <Navigate to="/roadmap" replace />;
    }
    
    console.log('🔀 Main route: Unknown role, defaulting to student login');
    return <EnhancedLogin />;
  };

  return (
    <Router basename="/Israel-cyber-academy">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Debug Component - Development Only */}
        {process.env.NODE_ENV === 'development' && <DebugAuth />}
        
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
          
          {/* Student Routes */}
          <Route
            path="/roadmap"
            element={
              <StudentRoute>
                <Roadmap />
              </StudentRoute>
            }
          />
          
          <Route
            path="/interactive-lesson/:lessonId"
            element={
              <StudentRoute>
                <InteractiveLesson />
              </StudentRoute>
            }
          />
          
          <Route
            path="/profile"
            element={
              <StudentRoute>
                <Profile />
              </StudentRoute>
            }
          />
          
          {/* Teacher Routes */}
          <Route
            path="/teacher/login"
            element={
              currentUser && role === 'teacher' ? 
                <Navigate to="/teacher/dashboard" replace /> : 
                <TeacherLogin />
            }
          />
          
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
            path="/teacher/lessons"
            element={
              <TeacherRoute>
                <LessonPreview />
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
          
          {/* Data Test Route - Development Only */}
          {process.env.NODE_ENV === 'development' && (
            <Route
              path="/data-test"
              element={
                <ProtectedRoute>
                  <div className="container mx-auto px-4 py-8">
                    <DataTest />
                  </div>
                </ProtectedRoute>
              }
            />
          )}
          
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
        
        {/* Firebase Diagnostic Tool - Development Only */}
        {process.env.NODE_ENV === 'development' && <FirebaseDiagnostic />}
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
