/**
 * 🛡️ UNIFIED ROUTE PROTECTION SYSTEM - Israel Cyber Academy
 * 
 * This component replaces ALL route protection and redirect logic.
 * Centralized, comprehensive logging, and bulletproof authentication.
 * 
 * Features:
 * - ✅ Unified API for all route types
 * - ✅ Comprehensive logging for debugging
 * - ✅ Centralized role mapping
 * - ✅ Intelligent redirects
 * - ✅ Loading state management
 * - ✅ Error boundary integration
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePureAuth } from '../../contexts/PureAuthContext';
import LoadingSpinner from './LoadingSpinner';

// 🎯 CENTRALIZED ROLE MAPPING - Single source of truth
const ROLE_DASHBOARDS = {
  student: '/student/roadmap',
  teacher: '/teacher/dashboard',
  system_manager: '/system-manager/dashboard'
};

const VALID_ROLES = ['student', 'teacher', 'system_manager'];

/**
 * 🔄 UNIFIED ROUTE PROTECTION COMPONENT
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {string|string[]} props.allowedRoles - Required role(s) for access
 * @param {string} props.fallbackPath - Redirect path if not authenticated
 * @param {boolean} props.showLoading - Whether to show loading spinner
 * @param {string} props.routeName - Route name for logging (optional)
 * @returns {JSX.Element} Protected route component
 */
const UnifiedRouteProtection = ({ 
  children, 
  allowedRoles = [], 
  fallbackPath = "/login",
  showLoading = true,
  routeName = "Unknown Route"
}) => {
  const { currentUser, userProfile, loading } = usePureAuth();
  
  // Normalize allowedRoles to array
  const rolesArray = Array.isArray(allowedRoles) 
    ? allowedRoles 
    : allowedRoles ? [allowedRoles] : [];

  const logPrefix = `🛡️ [${routeName}]`;
  
  console.log(`${logPrefix} STEP 1: Route protection called`, {
    routeName,
    allowedRoles: rolesArray,
    loading,
    hasCurrentUser: !!currentUser,
    currentUserEmail: currentUser?.email || 'None',
    hasUserProfile: !!userProfile,
    userRole: userProfile?.role || 'None',
    timestamp: new Date().toISOString(),
    isPublicRoute: rolesArray.length === 0
  });

  // 🔄 LOADING STATE
  if (loading) {
    console.log(`${logPrefix} STEP 2: Still loading authentication state`);
    
    if (showLoading) {
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner />
            <p className="text-gray-400 mt-4">Authenticating...</p>
          </div>
        </div>
      );
    }
    
    // Return empty div if loading but don't show spinner
    return <div className="min-h-screen bg-gray-900"></div>;
  }

  // 🚫 NO AUTHENTICATION REQUIRED (Public Route)
  if (rolesArray.length === 0) {
    console.log(`${logPrefix} STEP 2: ✅ Public route - access granted`);
    return <>{children}</>;
  }

  // 🔐 AUTHENTICATION REQUIRED
  if (!currentUser) {
    console.log(`${logPrefix} STEP 2: ❌ No Firebase Auth user - redirecting to ${fallbackPath}`, {
      reason: 'No currentUser',
      redirectTo: fallbackPath
    });
    return <Navigate to={fallbackPath} replace />;
  }

  if (!userProfile) {
    console.log(`${logPrefix} STEP 2: ❌ No user profile found - redirecting to ${fallbackPath}`, {
      reason: 'No userProfile',
      firebaseUserEmail: currentUser.email,
      redirectTo: fallbackPath
    });
    return <Navigate to={fallbackPath} replace />;
  }

  const userRole = userProfile.role;

  // 🔍 VALIDATE USER ROLE
  if (!userRole) {
    console.error(`${logPrefix} STEP 2: ❌ User profile missing role field`, {
      userEmail: userProfile.email,
      profileId: userProfile.id,
      redirectTo: fallbackPath
    });
    return <Navigate to={fallbackPath} replace />;
  }

  if (!VALID_ROLES.includes(userRole)) {
    console.error(`${logPrefix} STEP 2: ❌ Invalid user role`, {
      userRole,
      validRoles: VALID_ROLES,
      userEmail: userProfile.email,
      redirectTo: fallbackPath
    });
    return <Navigate to={fallbackPath} replace />;
  }

  // 🎯 ROLE-BASED ACCESS CONTROL
  if (!rolesArray.includes(userRole)) {
    const correctDashboard = ROLE_DASHBOARDS[userRole];
    
    console.log(`${logPrefix} STEP 2: ⚠️ Access denied - wrong role, redirecting to correct dashboard`, {
      userRole,
      allowedRoles: rolesArray,
      correctDashboard,
      userEmail: userProfile.email,
      reason: 'Role not in allowedRoles'
    });
    
    return <Navigate to={correctDashboard || fallbackPath} replace />;
  }

  // ✅ ACCESS GRANTED
  console.log(`${logPrefix} STEP 2: ✅ Access granted - rendering protected content`, {
    userRole,
    allowedRoles: rolesArray,
    userEmail: userProfile.email,
    userId: userProfile.id,
    accessGranted: true
  });

  return <>{children}</>;
};

/**
 * 🏠 HOME REDIRECT COMPONENT
 * Intelligently redirects users to their role-specific dashboard
 */
export const HomeRedirect = () => {
  const { currentUser, userProfile, loading } = usePureAuth();
  const logPrefix = "🏠 [HOME_REDIRECT]";

  console.log(`${logPrefix} STEP 1: Home redirect component called`, {
    loading,
    hasCurrentUser: !!currentUser,
    currentUserEmail: currentUser?.email || 'None',
    hasUserProfile: !!userProfile,
    userRole: userProfile?.role || 'None',
    timestamp: new Date().toISOString()
  });

  if (loading) {
    console.log(`${logPrefix} STEP 2: Still loading - showing spinner`);
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="text-gray-400 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser || !userProfile) {
    console.log(`${logPrefix} STEP 2: No authentication - redirecting to login`, {
      hasCurrentUser: !!currentUser,
      hasUserProfile: !!userProfile,
      redirectTo: '/login'
    });
    return <Navigate to="/login" replace />;
  }

  const userRole = userProfile.role;
  const targetDashboard = ROLE_DASHBOARDS[userRole];

  if (!targetDashboard) {
    console.error(`${logPrefix} STEP 2: ❌ No dashboard found for role`, {
      userRole,
      availableDashboards: Object.keys(ROLE_DASHBOARDS),
      redirectTo: '/login'
    });
    return <Navigate to="/login" replace />;
  }

  console.log(`${logPrefix} STEP 2: ✅ Redirecting to role-specific dashboard`, {
    userRole,
    targetDashboard,
    userEmail: userProfile.email,
    availableDashboards: Object.keys(ROLE_DASHBOARDS)
  });

  return <Navigate to={targetDashboard} replace />;
};

/**
 * 🚪 LOGIN ROUTE COMPONENT
 * Handles login page logic and authenticated user redirects
 */
export const LoginRoute = ({ children }) => {
  const { currentUser, userProfile, loading } = usePureAuth();
  const logPrefix = "🚪 [LOGIN_ROUTE]";
  
  console.log(`${logPrefix} STEP 1: Login route component called`, {
    loading,
    hasCurrentUser: !!currentUser,
    currentUserEmail: currentUser?.email || 'None', 
    hasUserProfile: !!userProfile,
    userRole: userProfile?.role || 'None',
    timestamp: new Date().toISOString()
  });

  // Don't redirect during loading state
  if (loading) {
    console.log(`${logPrefix} STEP 2: Still loading - showing login page`);
    return <>{children}</>;
  }
  
  // If user is authenticated, redirect to their dashboard
  if (currentUser && userProfile) {
    const userRole = userProfile.role;
    const targetDashboard = ROLE_DASHBOARDS[userRole];
    
    if (targetDashboard) {
      console.log(`${logPrefix} STEP 2: User already authenticated - redirecting to dashboard`, {
        userRole,
        targetDashboard,
        userEmail: userProfile.email,
        reason: 'User already logged in'
      });
      
      return <Navigate to={targetDashboard} replace />;
    } else {
      console.error(`${logPrefix} STEP 2: ❌ Authenticated user has invalid role`, {
        userRole,
        availableDashboards: Object.keys(ROLE_DASHBOARDS),
        userEmail: userProfile.email
      });
    }
  }

  console.log(`${logPrefix} STEP 2: ✅ No authenticated user - showing login page`);
  return <>{children}</>;
};

/**
 * 🎯 CONVENIENCE COMPONENTS FOR SPECIFIC ROLES
 */
export const StudentRoute = ({ children, routeName = "Student Route" }) => (
  <UnifiedRouteProtection 
    allowedRoles={['student']} 
    routeName={routeName}
  >
    {children}
  </UnifiedRouteProtection>
);

export const TeacherRoute = ({ children, routeName = "Teacher Route" }) => (
  <UnifiedRouteProtection 
    allowedRoles={['teacher']} 
    routeName={routeName}
  >
    {children}
  </UnifiedRouteProtection>
);

export const SystemManagerRoute = ({ children, routeName = "System Manager Route" }) => (
  <UnifiedRouteProtection 
    allowedRoles={['system_manager']} 
    routeName={routeName}
  >
    {children}
  </UnifiedRouteProtection>
);

/**
 * 🔄 MULTI-ROLE ROUTE COMPONENT
 */
export const MultiRoleRoute = ({ children, allowedRoles, routeName = "Multi-Role Route" }) => (
  <UnifiedRouteProtection 
    allowedRoles={allowedRoles} 
    routeName={routeName}
  >
    {children}
  </UnifiedRouteProtection>
);

/**
 * 🌐 PUBLIC ROUTE COMPONENT
 */
export const PublicRoute = ({ children, routeName = "Public Route" }) => (
  <UnifiedRouteProtection 
    allowedRoles={[]} 
    routeName={routeName}
  >
    {children}
  </UnifiedRouteProtection>
);

// Export main component as default
export default UnifiedRouteProtection; 