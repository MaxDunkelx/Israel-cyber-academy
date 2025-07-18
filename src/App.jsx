/**
 * App Component - UNIFIED ROUTING SYSTEM
 * 
 * Now using centralized route protection with comprehensive logging
 * and unified authentication logic.
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import PureAuthProvider, { usePureAuth } from './contexts/PureAuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';

// 🛡️ UNIFIED ROUTING SYSTEM
import UnifiedRouteProtection, {
  HomeRedirect,
  LoginRoute,
  StudentRoute,
  TeacherRoute,
  SystemManagerRoute,
  PublicRoute
} from './components/common/UnifiedRouteProtection';

// Components
import EnhancedLogin from './components/EnhancedLogin';
import Navigation from './components/Navigation';
import Roadmap from './components/Roadmap';
import InteractiveLesson from './components/InteractiveLesson';
import Profile from './components/Profile';
import StudentDashboard from './components/student/StudentDashboard';
import TeacherNavigation from './components/teacher/TeacherNavigation';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import SystemManagerDashboard from './components/system-manager/SystemManagerDashboard';
import SystemManagerNavigation from './components/system-manager/SystemManagerNavigation';
import FirebaseDiagnostic from './components/FirebaseDiagnostic';
import DatabaseTest from './components/DatabaseTest';
import TestLessons from './components/TestLessons';
import TestLessonsPage from './components/TestLessonsPage';
import TestTeacherSystem from './components/TestTeacherSystem';

/**
 * 🎯 MAIN APP CONTENT WITH UNIFIED ROUTING
 */
const AppContent = () => {
  const { currentUser, userProfile } = usePureAuth();

  console.log('🚀 APP: Rendering main application', {
    hasCurrentUser: !!currentUser,
    currentUserEmail: currentUser?.email || 'None',
    hasUserProfile: !!userProfile,
    userRole: userProfile?.role || 'None',
    timestamp: new Date().toISOString()
  });

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        
        {/* 🧭 ROLE-BASED NAVIGATION */}
        {currentUser && userProfile?.role === 'student' && (
          <Navigation />
        )}
        {currentUser && userProfile?.role === 'teacher' && (
          <TeacherNavigation />
        )}
        {currentUser && userProfile?.role === 'system_manager' && (
          <SystemManagerNavigation />
        )}
        
        <Routes>
          
          {/* 🏠 PUBLIC ROUTES */}
          <Route 
            path="/" 
            element={<HomeRedirect />} 
          />
          
          <Route 
            path="/login" 
            element={
              <LoginRoute>
                <EnhancedLogin />
              </LoginRoute>
            } 
          />
          
          {/* 🔧 TEMPORARY DIAGNOSTIC ROUTES */}
          <Route 
            path="/diagnostic" 
            element={<FirebaseDiagnostic />} 
          />
          <Route 
            path="/database-test" 
            element={<DatabaseTest />} 
          />
          <Route 
            path="/test-lessons" 
            element={<TestLessons />} 
          />
          <Route 
            path="/test-lessons-page" 
            element={<TestLessonsPage />} 
          />
          <Route 
            path="/test-teacher-system" 
            element={<TestTeacherSystem />} 
          />
          
          {/* 🎓 STUDENT ROUTES */}
          <Route 
            path="/student/roadmap" 
            element={
              <StudentRoute routeName="Student Roadmap">
                <Roadmap />
              </StudentRoute>
            } 
          />
          
          <Route 
            path="/student/lesson/:lessonId" 
            element={
              <StudentRoute routeName="Student Lesson">
                <InteractiveLesson />
              </StudentRoute>
            } 
          />
          
          <Route 
            path="/student/profile" 
            element={
              <StudentRoute routeName="Student Profile">
                <Profile />
              </StudentRoute>
            } 
          />
          
          <Route 
            path="/student/dashboard" 
            element={
              <StudentRoute routeName="Student Dashboard">
                <StudentDashboard />
              </StudentRoute>
            } 
          />
          
          {/* 👨‍🏫 TEACHER ROUTES */}
          <Route 
            path="/teacher/dashboard" 
            element={
              <TeacherRoute routeName="Teacher Dashboard">
                <TeacherDashboard />
              </TeacherRoute>
            } 
          />
          
          {/* 🔧 SYSTEM MANAGER ROUTES */}
          <Route 
            path="/system-manager/dashboard" 
            element={
              <SystemManagerRoute routeName="System Manager Dashboard">
                <SystemManagerDashboard />
              </SystemManagerRoute>
            } 
          />
          
          {/* 🚫 FALLBACK ROUTE */}
          <Route 
            path="*" 
            element={
              <PublicRoute routeName="404 Fallback">
                <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">404 - Page Not Found</h1>
                    <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
                    <Navigate to="/" replace />
                  </div>
                </div>
              </PublicRoute>
            } 
          />
          
        </Routes>
        
        {/* 📢 TOAST NOTIFICATIONS */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
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
 * 🚀 APP WITH ERROR BOUNDARY AND AUTHENTICATION
 */
const App = () => {
  console.log('🎯 APP: Application starting up', {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });

  return (
    <ErrorBoundary>
      <PureAuthProvider>
        <AppContent />
      </PureAuthProvider>
    </ErrorBoundary>
  );
};

export default App;
