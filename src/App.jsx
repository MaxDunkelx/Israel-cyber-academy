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
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import { useUserProfile } from './hooks/useAuth';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';

// Import components
import EnhancedLogin from './components/EnhancedLogin';
import Roadmap from './components/Roadmap';
import InteractiveLesson from './components/InteractiveLesson';
import Profile from './components/Profile';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import Navigation from './components/Navigation';
import FirebaseDiagnostic from './components/FirebaseDiagnostic';
import DataTest from './components/DataTest';
import CheckTeacherRole from './components/CheckTeacherRole';
import FixTeacherRole from './components/FixTeacherRole';
import UpdateToTeacher from './components/UpdateToTeacher';
import StudentManagement from './components/teacher/StudentManagement';
import ClassManagement from './components/teacher/ClassManagement';
import StudentAnalytics from './components/teacher/StudentAnalytics';
import LessonPreview from './components/teacher/LessonPreview';
import TeacherNotes from './components/teacher/TeacherNotes';
import TeacherComments from './components/teacher/TeacherComments';

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
    return <Navigate to="/" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/roadmap" replace />;
  }

  return children;
};

/**
 * Teacher Route Component
 * 
 * Wraps routes that require teacher role.
 * Redirects to roadmap if user is not a teacher.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} Teacher route component
 */
const TeacherRoute = ({ children }) => {
  return <ProtectedRoute requiredRole="teacher">{children}</ProtectedRoute>;
};

/**
 * Main App Component
 * 
 * Sets up routing and authentication context.
 * Handles the main application structure.
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

  return (
    <Router basename="/Israel-cyber-academy">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Navigation - only show for students, teachers have their own navigation */}
        {currentUser && role !== 'teacher' && <Navigation />}
        
        {/* Main Routes */}
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={
              currentUser ? (
                role === 'teacher' ? 
                  <Navigate to="/instructor/dashboard" replace /> : 
                  <Navigate to="/student/roadmap" replace />
              ) : <EnhancedLogin />
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
              <ProtectedRoute>
                <Roadmap />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/student/lesson/:lessonId"
            element={
              <ProtectedRoute>
                <InteractiveLesson />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/student/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          
          {/* Instructor Routes */}
          <Route
            path="/instructor"
            element={
              <TeacherRoute>
                <Navigate to="/instructor/dashboard" replace />
              </TeacherRoute>
            }
          />
          
          <Route
            path="/instructor/dashboard"
            element={
              <TeacherRoute>
                <TeacherDashboard />
              </TeacherRoute>
            }
          />
          
          <Route
            path="/instructor/profile"
            element={
              <TeacherRoute>
                <Profile />
              </TeacherRoute>
            }
          />
          
          {/* Legacy Routes - Redirect to new structure */}
          <Route
            path="/roadmap"
            element={
              <ProtectedRoute>
                <Navigate to="/student/roadmap" replace />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/interactive-lesson/:lessonId"
            element={
              <ProtectedRoute>
                <Navigate to="/student/lesson/:lessonId" replace />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Navigate to="/student/profile" replace />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/teacher"
            element={
              <TeacherRoute>
                <Navigate to="/instructor/dashboard" replace />
              </TeacherRoute>
            }
          />
          
          <Route
            path="/teacher/dashboard"
            element={
              <TeacherRoute>
                <Navigate to="/instructor/dashboard" replace />
              </TeacherRoute>
            }
          />
          
          {/* Development Routes */}
          {process.env.NODE_ENV === 'development' && (
            <>
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
              
              <Route
                path="/check-teacher-role"
                element={
                  <ProtectedRoute>
                    <div className="container mx-auto px-4 py-8">
                      <CheckTeacherRole />
                    </div>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/fix-teacher-role"
                element={
                  <ProtectedRoute>
                    <div className="container mx-auto px-4 py-8">
                      <FixTeacherRole />
                    </div>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/update-to-teacher"
                element={
                  <ProtectedRoute>
                    <div className="container mx-auto px-4 py-8">
                      <UpdateToTeacher />
                    </div>
                  </ProtectedRoute>
                }
              />
            </>
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
