/**
 * Unified Route Protection Component
 * 
 * Replaces all duplicate route protection components with a single, flexible solution.
 * Handles authentication, role-based access, and smart redirects.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {string} props.requiredRole - Required role for access (optional)
 * @param {string} props.fallbackPath - Redirect path if not authenticated (default: "/login")
 * @param {boolean} props.showLoading - Whether to show loading spinner (default: true)
 * @returns {JSX.Element} Protected route component
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const RouteProtection = ({ 
  children, 
  requiredRole = null, 
  fallbackPath = "/login",
  showLoading = true 
}) => {
  const { currentUser, loading, role } = useAuth();

  // Show loading spinner while authentication is being checked
  if (loading && showLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to={fallbackPath} replace />;
  }

  // Check role-based access if required
  if (requiredRole && role !== requiredRole) {
    // Smart redirect based on user's actual role
    const roleRedirects = {
      student: '/student/roadmap',
      teacher: '/teacher/dashboard', 
      system_manager: '/system-manager/dashboard'
    };
    
    const redirectPath = roleRedirects[role] || "/";
    return <Navigate to={redirectPath} replace />;
  }

  // Access granted - render children
  return <>{children}</>;
};

// Convenience components for specific roles
export const StudentRoute = ({ children }) => (
  <RouteProtection requiredRole="student" fallbackPath="/login">
    {children}
  </RouteProtection>
);

export const TeacherRoute = ({ children }) => (
  <RouteProtection requiredRole="teacher" fallbackPath="/login">
    {children}
  </RouteProtection>
);

export const SystemManagerRoute = ({ children }) => (
  <RouteProtection requiredRole="system_manager" fallbackPath="/login">
    {children}
  </RouteProtection>
);

export default RouteProtection; 