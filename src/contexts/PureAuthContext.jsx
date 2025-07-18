/**
 * PureAuthContext - Pure Firestore Database Authentication
 * 
 * This context replaces Firebase Auth with direct Firestore database authentication.
 * Users are authenticated by checking email/password directly in the users collection.
 */

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { 
  authenticateUser, 
  logoutUser, 
  validateSession,
  getUserById 
} from '../firebase/pure-firestore-auth';
import { 
  initializeRobustPresence, 
  cleanupRobustPresence 
} from '../firebase/robust-presence-service';

// Create React context for authentication
const PureAuthContext = createContext();

/**
 * Custom hook to access pure authentication context
 */
export const usePureAuth = () => {
  const context = useContext(PureAuthContext);
  if (!context) {
    throw new Error('usePureAuth must be used within a PureAuthProvider');
  }
  return context;
};

/**
 * Pure Authentication Provider - Firestore Database System
 */
export const PureAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log('🔧 PureAuthProvider initialized');

  /**
   * PURE LOGIN - Authenticate with Firestore database
   */
  const login = async (email, password) => {
    console.log('🔑 PURE LOGIN STEP 1: Starting pure login process for:', email);
    
    try {
      console.log('🔑 PURE LOGIN STEP 2: Calling pure authentication service...');
      
      // Authenticate with Firestore database
      const userSession = await authenticateUser(email, password);
      
      console.log('🔑 PURE LOGIN STEP 3: ✅ Pure authentication successful!', {
        userId: userSession.id,
        email: userSession.email,
        role: userSession.role
      });
      
      // Set current user and profile
      setCurrentUser(userSession);
      setUserProfile(userSession);
      
      // Store session in localStorage for persistence
      localStorage.setItem('pureAuthSession', JSON.stringify(userSession));
      
      // Initialize robust presence tracking
      console.log('🔑 PURE LOGIN STEP 4: 🟢 Initializing robust presence tracking...');
      try {
        await initializeRobustPresence(userSession.id, userSession);
        console.log('🔑 PURE LOGIN STEP 4: ✅ Robust presence tracking initialized');
      } catch (presenceError) {
        console.error('🔑 PURE LOGIN STEP 4: ⚠️ Failed to initialize presence tracking:', presenceError);
        // Don't fail the login process if presence fails
      }
      
      return userSession;
      
    } catch (error) {
      console.error('🔑 PURE LOGIN STEP 3: ❌ Pure authentication failed:', {
        code: error?.code,
        message: error?.message
      });
      throw error;
    }
  };

  /**
   * PURE LOGOUT
   */
  const logout = async () => {
    console.log('🚪 PURE LOGOUT STEP 1: Starting pure logout process...');
    
    try {
      // Clean up robust presence tracking before logout
      console.log('🚪 PURE LOGOUT STEP 1.5: 🔴 Cleaning up robust presence tracking...');
      try {
        await cleanupRobustPresence();
        console.log('🚪 PURE LOGOUT STEP 1.5: ✅ Robust presence tracking cleaned up');
      } catch (presenceError) {
        console.error('🚪 PURE LOGOUT STEP 1.5: ⚠️ Failed to cleanup presence tracking:', presenceError);
        // Don't fail the logout process if presence cleanup fails
      }

      // Update last activity in database
      if (currentUser?.id) {
        await logoutUser(currentUser.id);
      }

      // Clear local state
      setCurrentUser(null);
      setUserProfile(null);
      
      // Clear localStorage
      localStorage.removeItem('pureAuthSession');
      
      console.log('🚪 PURE LOGOUT STEP 2: ✅ Logged out successfully');
    } catch (error) {
      console.error('🚪 PURE LOGOUT STEP 2: ❌ Logout failed:', error);
      // Still clear local state even if database update fails
      setCurrentUser(null);
      setUserProfile(null);
      localStorage.removeItem('pureAuthSession');
      throw error;
    }
  };

  /**
   * VALIDATE EXISTING SESSION - Check if user is still authenticated
   */
  const validateExistingSession = async (sessionData) => {
    console.log('🔍 SESSION VALIDATION STEP 1: Validating existing session...');
    
    try {
      if (!sessionData || !sessionData.id) {
        console.log('🔍 SESSION VALIDATION STEP 2: ❌ No session data found');
        return false;
      }

      // Check if session is still valid (not too old)
      const sessionAge = Date.now() - new Date(sessionData.authenticatedAt).getTime();
      const maxSessionAge = 24 * 60 * 60 * 1000; // 24 hours
      
      if (sessionAge > maxSessionAge) {
        console.log('🔍 SESSION VALIDATION STEP 2: ❌ Session expired');
        return false;
      }

      // Validate with database
      const isValid = await validateSession(sessionData);
      
      if (isValid) {
        console.log('🔍 SESSION VALIDATION STEP 2: ✅ Session is valid');
        
        // Get fresh user data from database
        const freshUserData = await getUserById(sessionData.id);
        if (freshUserData) {
          const updatedSession = {
            ...sessionData,
            ...freshUserData,
            isAuthenticated: true
          };
          
          setCurrentUser(updatedSession);
          setUserProfile(updatedSession);
          
          // Initialize presence tracking
          try {
            await initializeRobustPresence(updatedSession.id, updatedSession);
            console.log('🔍 SESSION VALIDATION STEP 3: ✅ Presence tracking initialized');
          } catch (presenceError) {
            console.error('🔍 SESSION VALIDATION STEP 3: ⚠️ Failed to initialize presence:', presenceError);
          }
          
          return true;
        }
      }
      
      console.log('🔍 SESSION VALIDATION STEP 2: ❌ Session validation failed');
      return false;
      
    } catch (error) {
      console.error('🔍 SESSION VALIDATION STEP ERROR: ❌ Session validation error:', error);
      return false;
    }
  };

  /**
   * CHECK FOR EXISTING SESSION - On app startup
   */
  useEffect(() => {
    console.log('🔄 SESSION CHECK STEP 1: Checking for existing session on startup...');
    
    const checkExistingSession = async () => {
      try {
        // Check localStorage for existing session
        const storedSession = localStorage.getItem('pureAuthSession');
        
        if (storedSession) {
          console.log('🔄 SESSION CHECK STEP 2: Found stored session, validating...');
          
          const sessionData = JSON.parse(storedSession);
          const isValid = await validateExistingSession(sessionData);
          
          if (!isValid) {
            console.log('🔄 SESSION CHECK STEP 3: ❌ Stored session is invalid, clearing...');
            localStorage.removeItem('pureAuthSession');
            setCurrentUser(null);
            setUserProfile(null);
          } else {
            console.log('🔄 SESSION CHECK STEP 3: ✅ Stored session is valid, user is logged in');
          }
        } else {
          console.log('🔄 SESSION CHECK STEP 2: No stored session found');
        }
        
      } catch (error) {
        console.error('🔄 SESSION CHECK STEP ERROR: ❌ Session check failed:', error);
        // Clear any invalid session data
        localStorage.removeItem('pureAuthSession');
        setCurrentUser(null);
        setUserProfile(null);
      } finally {
        setLoading(false);
        console.log('🔄 SESSION CHECK STEP 4: ✅ Session check complete');
      }
    };

    checkExistingSession();
  }, []);

  /**
   * PLACEHOLDER FUNCTIONS FOR COMPATIBILITY
   * These functions are stubs to prevent errors while the pure auth system is being used
   */
  const updateUserProgress = async (lessonNumber, completed, timeSpent, isQuiz = false, score = 0, answers = null, slideIds = [], user = null) => {
    console.log('📊 PLACEHOLDER: updateUserProgress called', { lessonNumber, completed, timeSpent });
    // This is a placeholder - in a real implementation, this would update Firestore
    return { success: true, message: 'Progress update placeholder' };
  };

  const trackSlideEngagement = (lessonId, slideId) => {
    console.log('📊 PLACEHOLDER: trackSlideEngagement called', { lessonId, slideId });
    // This is a placeholder - in a real implementation, this would track engagement
  };

  const setLastLessonSlide = (lessonId, slideIndex) => {
    console.log('📊 PLACEHOLDER: setLastLessonSlide called', { lessonId, slideIndex });
    // This is a placeholder - in a real implementation, this would save to localStorage or Firestore
  };

  const getLastLessonSlide = (lessonId) => {
    console.log('📊 PLACEHOLDER: getLastLessonSlide called', { lessonId });
    // This is a placeholder - in a real implementation, this would get from localStorage or Firestore
    return 0; // Return 0 to start from the beginning
  };

  /**
   * MEMOIZED CONTEXT VALUE
   */
  const contextValue = useMemo(() => ({
    currentUser,
    userProfile,
    loading,
    login,
    logout,
    updateUserProgress,
    trackSlideEngagement,
    setLastLessonSlide,
    getLastLessonSlide,
    isAuthenticated: !!currentUser,
    userRole: currentUser?.role || null
  }), [currentUser, userProfile, loading]);

  console.log('🔧 PureAuthProvider state:', {
    hasCurrentUser: !!currentUser,
    currentUserEmail: currentUser?.email,
    userRole: currentUser?.role,
    loading: loading
  });

  return (
    <PureAuthContext.Provider value={contextValue}>
      {children}
    </PureAuthContext.Provider>
  );
};

// Add default export for compatibility
export default PureAuthProvider; 