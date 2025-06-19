import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import Login from './components/Login';
import Roadmap from './components/Roadmap';
import Lesson from './components/Lesson';
import InteractiveLesson from './components/InteractiveLesson';
import TeacherDashboard from './components/TeacherDashboard';
import Profile from './components/Profile';
import Navigation from './components/Navigation';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = ['student', 'teacher'] }) => {
  const { currentUser, userProfile, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen text="טוען..." />;
  }

  // Guest users can access only roadmap and lessons
  if (currentUser?.isGuest || userProfile?.isGuest) {
    return children;
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (userProfile && !allowedRoles.includes(userProfile.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Main App Layout
const AppLayout = () => {
  const { currentUser, userProfile } = useAuth();

  // Check if user is guest (either from currentUser or userProfile)
  const isGuest = currentUser?.isGuest || userProfile?.isGuest;

  // If no user and not guest, show login
  if (!currentUser && !userProfile) {
    return <Login />;
  }

  // Guest mode: block profile and teacher dashboard
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <div className="flex-1">
        <Routes>
          <Route path="/roadmap" element={
            <ProtectedRoute>
              <Roadmap />
            </ProtectedRoute>
          } />
          <Route path="/lesson/:lessonId" element={
            <ProtectedRoute>
              <Lesson />
            </ProtectedRoute>
          } />
          <Route path="/interactive-lesson/:lessonId" element={
            <ProtectedRoute>
              <InteractiveLesson />
            </ProtectedRoute>
          } />
          <Route path="/teacher" element={
            isGuest ? <Navigate to="/roadmap" replace /> :
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherDashboard />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to="/roadmap" replace />} />
        </Routes>
      </div>
      <footer className="w-full text-center py-4 text-gray-500 text-xs bg-white border-t mt-8">
        © 2024 Israel Cyber Campus. All rights reserved.
      </footer>
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<AppLayout />} />
          </Routes>
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1f2937',
                color: '#fff',
                direction: 'rtl',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
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
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
