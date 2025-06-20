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
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import TeacherDashboard from './components/TeacherDashboard';
import Navigation from './components/Navigation';
import FirebaseDiagnostic from './components/FirebaseDiagnostic';
import DataTest from './components/DataTest';

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
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Navigation - only show when authenticated */}
        {currentUser && <Navigation />}
        
        {/* Main Routes */}
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={
              currentUser ? <Navigate to="/roadmap" replace /> : <EnhancedLogin />
            } 
          />
          
          {/* Protected Routes */}
          <Route
            path="/roadmap"
            element={
              <ProtectedRoute>
                <Roadmap />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/interactive-lesson/:lessonId"
            element={
              <ProtectedRoute>
                <InteractiveLesson />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
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
          
          {/* Teacher Routes */}
          <Route
            path="/teacher"
            element={
              <TeacherRoute>
                <TeacherDashboard />
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
