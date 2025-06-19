import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyber-blue to-cyber-purple">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>טוען...</p>
        </div>
      </div>
    );
  }

  // Guest users can access only roadmap and lessons
  if (currentUser?.isGuest || userProfile?.isGuest) {
    return children;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (userProfile && !allowedRoles.includes(userProfile.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Main App Layout
const AppLayout = () => {
  const { currentUser, userProfile } = useAuth();

  if (!currentUser) {
    return <Login />;
  }

  // Guest mode: block profile and teacher dashboard
  const isGuest = currentUser?.isGuest || userProfile?.isGuest;

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
    <Router>
      <AuthProvider>
        <AppLayout />
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
              direction: 'rtl',
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
  );
}

export default App;
