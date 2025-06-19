import { useAuth as useAuthContext } from '../contexts/AuthContext';

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
export const useAuth = useAuthContext;

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
    isAuthenticated: !!currentUser && !currentUser.isGuest,
    isGuest: currentUser?.isGuest || userProfile?.isGuest,
    isLoading: loading,
    hasProfile: !!userProfile,
    role: userProfile?.role || 'guest'
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
  const { userProfile, currentUser } = useAuth();
  
  return {
    displayName: userProfile?.displayName || currentUser?.displayName || 'Unknown User',
    email: userProfile?.email || currentUser?.email || '',
    role: userProfile?.role || 'guest',
    progress: userProfile?.progress || {},
    completedLessons: userProfile?.completedLessons || [],
    currentLesson: userProfile?.currentLesson || 1,
    isGuest: userProfile?.isGuest || currentUser?.isGuest
  };
}; 