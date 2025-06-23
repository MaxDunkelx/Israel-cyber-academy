/**
 * AuthContext - Authentication and User Management
 * 
 * Provides comprehensive authentication and user management functionality.
 * It handles user authentication, profile management, and progress tracking.
 * 
 * Key Features:
 * - Firebase Authentication integration
 * - User profile management with Firestore
 * - Progress tracking and lesson completion
 * - Achievement system
 * - Real-time data synchronization
 * 
 * Data Flow:
 * 1. User authentication → Firebase Auth
 * 2. Progress updates → Firestore
 * 3. Profile management → Firestore
 * 4. Real-time sync → Local state + Firestore
 */

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, diagnoseFirestoreConnection } from '../firebase/firebase-config';
import { grantTeacherLessonAccess } from '../firebase/teacher-service.jsx';

// Create React context for authentication
const AuthContext = createContext();

/**
 * Custom hook to access authentication context
 * Ensures the hook is used within an AuthProvider
 * 
 * @returns {Object} Authentication context with user data and methods
 * @throws {Error} If used outside of AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Authentication Provider Component
 * 
 * Provides authentication state and methods to the entire application.
 * Manages user registration, login, logout, and progress tracking.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const AuthProvider = ({ children }) => {
  // Core authentication state
  const [currentUser, setCurrentUser] = useState(null); // Firebase auth user
  const [userProfile, setUserProfile] = useState(null); // Extended user data
  const [loading, setLoading] = useState(true); // Loading state

  /**
   * User Registration Function
   * 
   * Creates a new user account with Firebase Auth and stores extended profile in Firestore.
   * Sets up initial user data including progress tracking and role assignment.
   * 
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @param {string} displayName - User's display name
   * @param {string} role - User role ('student' or 'teacher', default: 'student')
   * @param {Object} credentials - User credentials (firstName, lastName, age, sex)
   * @returns {Promise<Object>} Firebase user credential
   * @throws {Error} If registration fails
   */
  const signup = async (email, password, displayName, role = 'student', credentials = {}) => {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Set default display name based on sex if not provided
      let finalDisplayName = displayName;
      if (!finalDisplayName || finalDisplayName === 'משתמש חדש') {
        const sex = credentials.sex || 'male';
        finalDisplayName = sex === 'female' ? 'לוחמת סייבר' : 'לוחם סייבר';
      }
      
      // Update Firebase Auth profile with display name
      await updateProfile(userCredential.user, { displayName: finalDisplayName });
      
      // Create comprehensive user profile in Firestore with proper initial state
      const userProfile = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: finalDisplayName,
        role,
        // User credentials
        firstName: credentials.firstName || '',
        lastName: credentials.lastName || '',
        age: credentials.age ? parseInt(credentials.age) : null,
        sex: credentials.sex || 'male',
        // Student-specific fields (only for students)
        ...(role === 'student' && {
          progress: {
            // Initialize first lesson as available but not completed
            1: {
              completed: false,
              score: 0,
              completedAt: null,
              temporary: false,
              lastSlide: 0,
              pagesEngaged: [],
              lastActivity: new Date()
            }
          },
          completedLessons: [], // Empty array - no lessons completed yet
          currentLesson: 1, // First lesson is available
          totalTimeSpent: 0,
          totalPagesEngaged: 0,
          achievements: [],
          streak: 0,
          // Class assignment fields
          classId: null,
          teacherId: null
        }),
        // Teacher-specific fields (only for teachers)
        ...(role === 'teacher' && {
          teacherClasses: [], // Array of class IDs managed by this teacher
          teacherPermissions: ['manage_students', 'view_analytics', 'add_comments'],
          teacherSettings: {
            defaultClassId: null,
            notificationPreferences: {
              emailNotifications: true,
              studentProgressAlerts: true,
              classUpdates: true
            }
          },
          // Teacher doesn't need progress tracking
          progress: {},
          completedLessons: [],
          currentLesson: 1,
          totalTimeSpent: 0,
          totalPagesEngaged: 0,
          achievements: [],
          streak: 0
        }),
        createdAt: new Date(),
        lastLogin: new Date(),
        lastActivityDate: new Date(),
        updatedAt: new Date()
      };
      
      // Store profile in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), userProfile);
      
      // If user is a teacher, grant access to all lessons
      if (role === 'teacher') {
        try {
          await grantTeacherLessonAccess(userCredential.user.uid);
          console.log('✅ Teacher lesson access granted for new teacher');
        } catch (error) {
          console.warn('⚠️ Failed to grant teacher lesson access:', error);
          // Don't fail the signup if this fails
        }
      }
      
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  /**
   * User Login Function
   * 
   * Authenticates user with Firebase Auth and updates last login timestamp.
   * Ensures proper initialization of user data for new users.
   * 
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Promise<Object>} Firebase user credential
   * @throws {Error} If login fails
   */
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Update last login timestamp in Firestore
      if (userCredential.user) {
        const userRef = doc(db, 'users', userCredential.user.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          
          // Ensure proper initialization for existing users
          const updatedData = {
            lastLogin: new Date(),
            lastActivityDate: new Date()
          };
          
          // If user doesn't have proper initial data, set it up
          if (!userData.progress || Object.keys(userData.progress).length === 0) {
            updatedData.progress = {
              1: {
                completed: false,
                score: 0,
                completedAt: null,
                temporary: false,
                lastSlide: 0,
                pagesEngaged: [],
                lastActivity: new Date()
              }
            };
            updatedData.currentLesson = 1;
            updatedData.completedLessons = userData.completedLessons || [];
            updatedData.totalTimeSpent = userData.totalTimeSpent || 0;
            updatedData.totalPagesEngaged = userData.totalPagesEngaged || 0;
            updatedData.achievements = userData.achievements || [];
            updatedData.streak = userData.streak || 0;
          }
          
          await setDoc(userRef, updatedData, { merge: true });
        }
      }
      
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Update User Progress Function
   * 
   * Tracks user progress through lessons, exercises, and slide engagement.
   * Manages lesson completion, scoring, and automatic lesson unlocking.
   * 
   * @param {number} lessonId - ID of the lesson
   * @param {boolean} completed - Whether the lesson is completed
   * @param {number} score - User's score (0-100)
   * @param {boolean} temporary - Whether this is temporary progress (for auto-save)
   * @param {number} lastSlide - Last slide viewed (for resume functionality)
   * @param {string} slideId - Specific slide ID for engagement tracking
   * @param {Array} allSlideIds - Array of all slide IDs to ensure complete tracking
   */
  const updateUserProgress = async (lessonId, completed, score = 0, temporary = false, lastSlide = null, slideId = null, allSlideIds = null) => {
    if (!currentUser) return;
    
    try {
      // Handle regular users with Firestore
      const userRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const progress = userData.progress || {};
        
        // Initialize lesson progress if it doesn't exist
        if (!progress[lessonId]) {
          progress[lessonId] = {
            completed: false,
            score: 0,
            completedAt: null,
            temporary: false,
            lastSlide: 0,
            pagesEngaged: [],
            lastActivity: new Date()
          };
        }
        
        // Update lesson progress with new data
        progress[lessonId] = {
          ...progress[lessonId],
          completed,
          score,
          completedAt: completed ? new Date() : progress[lessonId].completedAt,
          temporary: temporary && !completed ? true : false,
          lastActivity: new Date(),
          ...(lastSlide !== null ? { lastSlide } : {})
        };
        
        // Track page engagement if slideId is provided
        if (slideId && progress[lessonId].pagesEngaged) {
          if (!progress[lessonId].pagesEngaged.includes(slideId)) {
            progress[lessonId].pagesEngaged = [...progress[lessonId].pagesEngaged, slideId];
          }
        }
        
        // If lesson is completed, ensure all slides are marked as engaged
        if (completed && allSlideIds && Array.isArray(allSlideIds)) {
          const currentEngaged = progress[lessonId].pagesEngaged || [];
          const allEngaged = [...new Set([...currentEngaged, ...allSlideIds])];
          progress[lessonId].pagesEngaged = allEngaged;
          console.log(`📊 All slides marked as engaged for lesson ${lessonId}: ${allEngaged.length} slides`);
        }
        
        // Calculate total time spent and pages engaged across all lessons
        let totalTimeSpent = 0;
        let totalPagesEngaged = 0;
        Object.values(progress).forEach(lessonProgress => {
          if (lessonProgress.pagesEngaged && Array.isArray(lessonProgress.pagesEngaged)) {
            totalPagesEngaged += lessonProgress.pagesEngaged.length;
            // Estimate 3 minutes per page/slide
            totalTimeSpent += lessonProgress.pagesEngaged.length * 3;
          }
        });
        
        // Calculate lesson unlocking logic
        const currentCompletedLessons = userData.completedLessons || [];
        const currentLesson = userData.currentLesson || 1;
        
        let newCompletedLessons = currentCompletedLessons;
        let newCurrentLesson = currentLesson;
        
        if (completed) {
          // Add to completed lessons if not already there
          if (!currentCompletedLessons.includes(lessonId)) {
            newCompletedLessons = [...currentCompletedLessons, lessonId];
            console.log(`✅ Lesson ${lessonId} completed and added to completedLessons`);
          }
          // Update current lesson to next available lesson
          newCurrentLesson = Math.max(currentLesson, lessonId + 1);
          if (newCurrentLesson > currentLesson) {
            console.log(`🔓 Next lesson unlocked: ${newCurrentLesson} (was ${currentLesson})`);
          }
        }
        
        // Ensure first lesson is always available for new users
        if (newCurrentLesson < 1) {
          newCurrentLesson = 1;
        }
        
        // Calculate achievements based on progress
        const achievements = userData.achievements || [];
        const newAchievements = [...achievements];
        
        // First lesson completion achievement
        if (completed && lessonId === 1 && !achievements.includes('first_lesson')) {
          newAchievements.push('first_lesson');
          console.log('🏆 Achievement unlocked: First Lesson Completed!');
        }
        
        // Multiple lessons achievement
        if (completed && newCompletedLessons.length >= 3 && !achievements.includes('three_lessons')) {
          newAchievements.push('three_lessons');
          console.log('🏆 Achievement unlocked: Three Lessons Completed!');
        }
        
        // Time spent achievement
        if (totalTimeSpent >= 60 && !achievements.includes('one_hour')) {
          newAchievements.push('one_hour');
          console.log('🏆 Achievement unlocked: One Hour of Learning!');
        }
        
        // Comprehensive console logging for session tracking
        console.log('📊 USER SESSION DATA UPDATE:', {
          userId: currentUser.uid,
          lessonId,
          action: completed ? 'LESSON_COMPLETED' : 'PROGRESS_UPDATED',
          timestamp: new Date().toISOString(),
          progress: {
            lessonId,
            completed,
            score,
            lastSlide: lastSlide || progress[lessonId].lastSlide,
            pagesEngaged: progress[lessonId].pagesEngaged?.length || 0,
            temporary
          },
          statistics: {
            totalTimeSpent,
            totalPagesEngaged,
            completedLessons: newCompletedLessons.length,
            currentLesson: newCurrentLesson,
            achievements: newAchievements.length
          },
          achievements: {
            newlyUnlocked: newAchievements.filter(a => !achievements.includes(a)),
            total: newAchievements.length
          }
        });
        
        // Update Firestore with new progress data
        await setDoc(userRef, {
          progress,
          completedLessons: newCompletedLessons,
          currentLesson: newCurrentLesson,
          lastActivityDate: new Date(),
          totalTimeSpent,
          totalPagesEngaged,
          achievements: newAchievements
        }, { merge: true });
        
        // Update local state
        setUserProfile(prev => ({
          ...prev,
          progress,
          completedLessons: newCompletedLessons,
          currentLesson: newCurrentLesson,
          lastActivityDate: new Date(),
          totalTimeSpent,
          totalPagesEngaged,
          achievements: newAchievements
        }));
        
        // Log final state for verification
        console.log('💾 PROGRESS SAVED SUCCESSFULLY:', {
          lessonId,
          completed,
          score,
          totalTimeSpent,
          totalPagesEngaged,
          completedLessons: newCompletedLessons.length,
          achievements: newAchievements.length
        });
      }
    } catch (error) {
      console.error('❌ Error updating progress:', error);
    }
  };

  /**
   * Track Slide Engagement Function
   * 
   * Records which specific slides/pages a user has engaged with.
   * Used for analytics and to ensure users don't skip content.
   * 
   * @param {number} lessonId - ID of the lesson
   * @param {string} slideId - ID of the specific slide
   */
  const trackSlideEngagement = async (lessonId, slideId) => {
    if (!currentUser) return;
    
    try {
      // Handle regular users with Firestore
      const userRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const progress = userData.progress || {};
        
        // Initialize lesson progress if it doesn't exist
        if (!progress[lessonId]) {
          progress[lessonId] = {
            completed: false,
            score: 0,
            completedAt: null,
            temporary: false,
            lastSlide: 0,
            pagesEngaged: [],
            lastActivity: new Date()
          };
        }
        
        // Initialize pagesEngaged array if it doesn't exist
        if (!progress[lessonId].pagesEngaged) {
          progress[lessonId].pagesEngaged = [];
        }
        
        // Add slide to pagesEngaged if not already present (ensures uniqueness)
        if (!progress[lessonId].pagesEngaged.includes(slideId)) {
          progress[lessonId].pagesEngaged = [...progress[lessonId].pagesEngaged, slideId];
          progress[lessonId].lastActivity = new Date();
          
          // Calculate total time spent and pages engaged across all lessons
          let totalTimeSpent = 0;
          let totalPagesEngaged = 0;
          Object.values(progress).forEach(lessonProgress => {
            if (lessonProgress.pagesEngaged && Array.isArray(lessonProgress.pagesEngaged)) {
              totalPagesEngaged += lessonProgress.pagesEngaged.length;
              // Estimate 3 minutes per page/slide
              totalTimeSpent += lessonProgress.pagesEngaged.length * 3;
            }
          });
          
          // Comprehensive console logging for slide engagement
          console.log('👁️ SLIDE ENGAGEMENT TRACKED:', {
            userId: currentUser.uid,
            lessonId,
            slideId,
            timestamp: new Date().toISOString(),
            engagement: {
              lessonId,
              slideId,
              totalSlidesInLesson: progress[lessonId].pagesEngaged.length,
              isNewEngagement: true
            },
            statistics: {
              totalTimeSpent,
              totalPagesEngaged,
              lessonProgress: Math.round((progress[lessonId].pagesEngaged.length / 10) * 100) // Estimate total slides
            }
          });
          
          await setDoc(userRef, { 
            progress,
            totalTimeSpent,
            totalPagesEngaged,
            lastActivityDate: new Date()
          }, { merge: true });
          
          // Update local state
          setUserProfile(prev => ({
            ...prev,
            progress,
            totalTimeSpent,
            totalPagesEngaged,
            lastActivityDate: new Date()
          }));
          
          // Log engagement summary
          console.log('📈 ENGAGEMENT SUMMARY:', {
            lessonId,
            slideId,
            totalPagesEngaged,
            totalTimeSpent,
            lessonProgress: `${progress[lessonId].pagesEngaged.length} slides engaged`
          });
        } else {
          // Log duplicate engagement attempt
          console.log('🔄 DUPLICATE SLIDE ENGAGEMENT:', {
            userId: currentUser.uid,
            lessonId,
            slideId,
            timestamp: new Date().toISOString(),
            message: 'Slide already engaged, skipping duplicate tracking'
          });
        }
      }
    } catch (error) {
      console.error('❌ Error tracking slide engagement:', error);
    }
  };

  /**
   * Remove Temporary Progress Function
   * 
   * Cleans up temporary progress data when user logs out or session ends.
   */
  const removeTemporaryProgress = async () => {
    if (!currentUser) return;
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const progress = userData.progress || {};
        let changed = false;
        
        // Remove all temporary progress entries
        Object.keys(progress).forEach(key => {
          if (progress[key].temporary) {
            delete progress[key];
            changed = true;
          }
        });
        
        // Update Firestore if changes were made
        if (changed) {
          await setDoc(userRef, { progress }, { merge: true });
          setUserProfile(prev => ({ ...prev, progress }));
        }
      }
    } catch (error) {
      console.error('Error removing temporary progress:', error);
    }
  };

  /**
   * User Logout Function
   * 
   * Handles user logout and redirects to login page.
   * Cleans up temporary progress and signs out from Firebase.
   */
  const logout = async () => {
    try {
      console.log('🔄 Logging out user...');
      
      // Clean up temporary progress before logout
      await removeTemporaryProgress();
      
      // Sign out from Firebase Auth
      await signOut(auth);
      
      // Clear local state
      setCurrentUser(null);
      setUserProfile(null);
      
      console.log('✅ User logged out successfully');
      
      // Force redirect to login page
      window.location.href = '/Israel-cyber-academy/login';
      
    } catch (error) {
      console.error('❌ Error during logout:', error);
      
      // Even if there's an error, clear state and redirect
      setCurrentUser(null);
      setUserProfile(null);
      
      // Force redirect to login page
      window.location.href = '/Israel-cyber-academy/login';
    }
  };

  /**
   * Update User Display Name Function
   * 
   * Updates the user's display name in both Firebase Auth and Firestore.
   * Also updates the local context state for immediate UI updates.
   * 
   * @param {string} newDisplayName - New display name for the user
   * @returns {Promise<void>}
   */
  const updateDisplayName = async (newDisplayName) => {
    if (!currentUser) return;
    
    try {
      // Update Firebase Auth profile
      await updateProfile(currentUser, { displayName: newDisplayName });
      
      // Update Firestore profile
      const userRef = doc(db, 'users', currentUser.uid);
      await setDoc(userRef, { 
        displayName: newDisplayName,
        lastActivityDate: new Date()
      }, { merge: true });
      
      // Update local context state
      setUserProfile(prev => ({
        ...prev,
        displayName: newDisplayName,
        lastActivityDate: new Date()
      }));
      
      console.log('✅ Display name updated successfully:', newDisplayName);
    } catch (error) {
      console.error('❌ Error updating display name:', error);
      throw error;
    }
  };

  /**
   * Get last slide for resume functionality
   * 
   * @param {number} lessonId - ID of the lesson
   * @returns {number} Last slide index (0-based)
   */
  const getLastLessonSlide = (lessonId) => {
    const lastSlide = userProfile?.progress?.[lessonId]?.lastSlide ?? 0;
    console.log(`📖 GET LAST SLIDE: Lesson ${lessonId} -> Slide ${lastSlide + 1}`);
    return lastSlide;
  };

  /**
   * Set last slide for resume functionality
   * 
   * @param {number} lessonId - ID of the lesson
   * @param {number} slideIndex - Slide index to save (0-based)
   */
  const setLastLessonSlide = async (lessonId, slideIndex) => {
    if (!currentUser) return;
    
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const progress = userData.progress || {};
        
        // Initialize lesson progress if it doesn't exist
        if (!progress[lessonId]) {
          progress[lessonId] = {
            completed: false,
            score: 0,
            completedAt: null,
            temporary: false,
            lastSlide: 0,
            pagesEngaged: [],
            lastActivity: new Date()
          };
        }
        
        // Update last slide
        progress[lessonId].lastSlide = slideIndex;
        progress[lessonId].lastActivity = new Date();
        
        // Console logging for slide position tracking
        console.log('💾 SLIDE POSITION SAVED:', {
          userId: currentUser.uid,
          lessonId,
          slideIndex: slideIndex + 1, // Convert to 1-based for display
          timestamp: new Date().toISOString(),
          action: 'RESUME_POSITION_SAVED'
        });
        
        await setDoc(userRef, { 
          progress,
          lastActivityDate: new Date()
        }, { merge: true });
        
        // Update local state
        setUserProfile(prev => ({
          ...prev,
          progress,
          lastActivityDate: new Date()
        }));
      }
    } catch (error) {
      console.error('❌ Error saving slide position:', error);
    }
  };

  /**
   * Test Firestore Connectivity
   * 
   * Enhanced test to check if Firestore is accessible with detailed diagnostics
   */
  const testFirestoreConnection = async () => {
    try {
      console.log('🧪 Testing Firestore connectivity...');
      
      // Use the enhanced diagnostic function
      const diagnosis = await diagnoseFirestoreConnection();
      
      if (diagnosis.success) {
        console.log('✅ Firestore connection diagnosis completed successfully');
        return true;
      } else {
        console.error('❌ Firestore connection diagnosis failed:', diagnosis.error);
        return false;
      }
    } catch (error) {
      console.error('❌ Firestore connectivity test failed:', error);
      console.error('🔍 Error details:', {
        code: error.code,
        message: error.message
      });
      return false;
    }
  };

  /**
   * Authentication State Effect
   * 
   * Listens for Firebase authentication state changes.
   * Handles user authentication and profile management.
   */
  useEffect(() => {
    console.log('🔄 Setting up authentication listener...');
    
    // Test Firestore connectivity first with enhanced diagnostics
    testFirestoreConnection().then(isConnected => {
      if (!isConnected) {
        console.error('❌ Firestore is not accessible - check the following:');
        console.error('   1. Firestore database is created in Firebase Console');
        console.error('   2. Security rules allow read/write access');
        console.error('   3. Project is properly configured');
        console.error('   4. API keys are correct');
      }
    });
    
    // Regular user authentication listener
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('🔄 Auth state changed:', user ? `User logged in: ${user.email}` : 'User logged out');
      
      setCurrentUser(user);
      
      if (user) {
        try {
          console.log('📥 Fetching user profile for:', user.email);
          console.log('🔍 User UID:', user.uid);
          
          // Fetch user profile from Firestore
          const userRef = doc(db, 'users', user.uid);
          console.log('📄 Firestore document reference created');
          
          const userDoc = await getDoc(userRef);
          console.log('📋 Firestore document fetch completed');
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log('✅ User profile loaded:', userData.displayName);
            console.log('📊 User data:', {
              role: userData.role,
              currentLesson: userData.currentLesson,
              completedLessons: userData.completedLessons?.length || 0,
              progress: Object.keys(userData.progress || {}).length
            });
            
            // Ensure default values for user credentials
            const userProfileWithDefaults = {
              ...userData,
              firstName: userData.firstName || '',
              lastName: userData.lastName || '',
              age: userData.age || null,
              sex: userData.sex || 'male',
              displayName: userData.displayName || (userData.sex === 'female' ? 'לוחמת סייבר' : 'לוחם סייבר')
            };
            
            setUserProfile(userProfileWithDefaults);
          } else {
            console.log('⚠️ User profile not found in Firestore - creating new profile');
            // Create a new user profile if it doesn't exist
            const newUserProfile = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || 'לוחם סייבר',
              role: user.email.includes('teacher') || user.displayName?.includes('מורה') ? 'teacher' : 'student',
              // Default user credentials
              firstName: '',
              lastName: '',
              age: null,
              sex: 'male',
              progress: {
                1: {
                  completed: false,
                  score: 0,
                  completedAt: null,
                  temporary: false,
                  lastSlide: 0,
                  pagesEngaged: [],
                  lastActivity: new Date()
                }
              },
              completedLessons: [],
              currentLesson: 1,
              createdAt: new Date(),
              lastLogin: new Date(),
              totalTimeSpent: 0,
              totalPagesEngaged: 0,
              achievements: [],
              streak: 0,
              lastActivityDate: new Date()
            };
            
            try {
              await setDoc(userRef, newUserProfile);
              console.log('✅ New user profile created successfully');
              setUserProfile(newUserProfile);
            } catch (createError) {
              console.error('❌ Error creating user profile:', createError);
              console.error('🔍 Create error details:', {
                code: createError.code,
                message: createError.message
              });
              setUserProfile(null);
            }
          }
        } catch (error) {
          console.error('❌ Error fetching user profile:', error);
          console.error('🔍 Error details:', {
            code: error.code,
            message: error.message,
            stack: error.stack
          });
          
          // Provide specific guidance based on error type
          if (error.code === 'permission-denied') {
            console.error('💡 This is likely a Firestore security rules issue');
            console.error('💡 Check your Firestore security rules in Firebase Console');
          } else if (error.code === 'not-found') {
            console.error('💡 Firestore database might not exist');
            console.error('💡 Create Firestore database in Firebase Console');
          }
          
          setUserProfile(null);
        }
      } else {
        console.log('👋 User signed out, clearing profile');
        // User is signed out, clear all state
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Context value containing all authentication state and methods
  const value = {
    currentUser,
    userProfile,
    role: userProfile?.role || null,
    signup,
    login,
    logout,
    updateUserProgress,
    setLastLessonSlide,
    loading,
    removeTemporaryProgress,
    trackSlideEngagement,
    updateDisplayName,
    getLastLessonSlide
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 