import { useAuth as useAuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';

/**
 * Custom hook for authentication functionality
 * Provides a simplified interface to the AuthContext
 * 
 * @returns {Object} Authentication state and methods
 * @throws {Error} If used outside of AuthProvider
 * 
 * @example
 * const { currentUser, login, logout, isAuthenticated } = useAuth();
 */
export const useAuth = () => {
  const authContext = useAuthContext();
  
  return {
    ...authContext,
    isAuthenticated: !!authContext.currentUser,
    displayName: authContext.userProfile?.displayName || authContext.currentUser?.displayName,
    email: authContext.userProfile?.email || authContext.currentUser?.email,
    role: authContext.userProfile?.role || 'student',
    progress: authContext.userProfile?.progress || {},
    completedLessons: authContext.userProfile?.completedLessons || [],
    currentLesson: authContext.userProfile?.currentLesson || 1,
    totalTimeSpent: authContext.userProfile?.totalTimeSpent || 0,
    totalPagesEngaged: authContext.userProfile?.totalPagesEngaged || 0,
    achievements: authContext.userProfile?.achievements || []
  };
};

/**
 * Custom hook for checking authentication status
 * 
 * @returns {Object} Authentication status information
 * 
 * @example
 * const { isAuthenticated, isGuest, isLoading } = useAuthStatus();
 */
export const useAuthStatus = () => {
  const { currentUser, userProfile, loading } = useAuth();
  
  return {
    isAuthenticated: !!currentUser,
    isGuest: false,
    isLoading: loading,
    hasProfile: !!userProfile,
    role: userProfile?.role || 'student'
  };
};

/**
 * Custom hook for user profile information
 * 
 * @returns {Object} User profile information
 * 
 * @example
 * const { displayName, email, role, progress } = useUserProfile();
 */
export const useUserProfile = () => {
  const { currentUser, userProfile } = useAuthContext();
  
  return {
    displayName: userProfile?.displayName || currentUser?.displayName || 'משתמש',
    email: userProfile?.email || currentUser?.email || '',
    role: userProfile?.role || 'student',
    progress: userProfile?.progress || {},
    completedLessons: userProfile?.completedLessons || [],
    currentLesson: userProfile?.currentLesson || 1,
    totalTimeSpent: userProfile?.totalTimeSpent || 0,
    totalPagesEngaged: userProfile?.totalPagesEngaged || 0,
    achievements: userProfile?.achievements || []
  };
}; 