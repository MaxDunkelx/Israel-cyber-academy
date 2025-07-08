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
 * - Demo mode for development
 * 
 * Data Flow:
 * 1. User authentication → Firebase Auth
 * 2. Progress updates → Firestore
 * 3. Profile management → Firestore
 * 4. Real-time sync → Local state + Firestore
 */

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, onSnapshot, collection, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { auth, db, diagnoseFirestoreConnection } from '../firebase/firebase-config';
import { grantTeacherLessonAccess } from '../firebase/teacher-service.jsx';

// Create React context for authentication
const AuthContext = createContext();

// Add system manager email constant at the top
const SYSTEM_MANAGER_EMAIL = 'maxibunnyshow@gmail.com';

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
   * Helper to always get Firestore lesson ID
   * 
   * @param {number|string} lessonNumberOrId - Lesson number or ID
   * @returns {string} Firestore lesson ID
   */
  const getLessonFirestoreId = (lessonNumberOrId) => {
    if (typeof lessonNumberOrId === 'string' && lessonNumberOrId.startsWith('lesson-')) return lessonNumberOrId;
    if (typeof lessonNumberOrId === 'number' || !isNaN(parseInt(lessonNumberOrId))) return `lesson-${parseInt(lessonNumberOrId)}`;
    return lessonNumberOrId;
  };

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
      // Check if this is the system manager
      if (email === SYSTEM_MANAGER_EMAIL) {
        role = 'system_manager';
      }
      
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Set default display name based on sex if not provided
      let finalDisplayName = displayName;
      if (!finalDisplayName || finalDisplayName === 'משתמש חדש') {
        if (role === 'system_manager') {
          finalDisplayName = 'מנהל המערכת';
        } else {
          const sex = credentials.sex || 'male';
          finalDisplayName = sex === 'female' ? 'לוחמת סייבר' : 'לוחם סייבר';
        }
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
        // System manager specific fields
        ...(role === 'system_manager' && {
          systemManagerPermissions: [
            'manage_users', 
            'manage_content', 
            'manage_system', 
            'view_logs',
            'import_data',
            'export_data'
          ],
          systemManagerSettings: {
            defaultLanguage: 'he',
            notificationPreferences: {
              emailNotifications: true,
              systemAlerts: true,
              userActivityReports: true
            }
          }
        }),
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
      // First, try to find user in Firestore (for users created by system manager)
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email.toLowerCase()));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        
        // Check if this is a user created by system manager (has password field)
        if (userData.password && userData.password === password && !userData.hasFirebaseAuth) {
          console.log('🆕 Creating Firebase Auth account for system-created user:', email);
          
          try {
            // Create Firebase Auth account
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Update display name
            await updateProfile(userCredential.user, { 
              displayName: userData.displayName 
            });
            
            // Update Firestore document to mark as having Firebase Auth
            await updateDoc(doc(db, 'users', userDoc.id), {
              hasFirebaseAuth: true,
              firebaseUid: userCredential.user.uid,
              lastLogin: serverTimestamp(),
              updatedAt: serverTimestamp()
            });
            
            console.log('✅ Firebase Auth account created for system-created user');
            
            // Set user profile
            setUserProfile({
              ...userData,
              uid: userCredential.user.uid,
              hasFirebaseAuth: true,
              firebaseUid: userCredential.user.uid
            });
            
            return userCredential;
          } catch (firebaseError) {
            console.error('❌ Error creating Firebase Auth account:', firebaseError);
            throw new Error('שגיאה ביצירת חשבון המשתמש');
          }
        }
      }
      
      // Fallback to normal Firebase Auth login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Check if this is the system manager and update role if needed
      if (email === SYSTEM_MANAGER_EMAIL) {
        const userRef = doc(db, 'users', userCredential.user.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.role !== 'system_manager') {
            // Update role to system manager
            await updateDoc(userRef, {
              role: 'system_manager',
              systemManagerPermissions: [
                'manage_users', 
                'manage_content', 
                'manage_system', 
                'view_logs',
                'import_data',
                'export_data'
              ],
              systemManagerSettings: {
                defaultLanguage: 'he',
                notificationPreferences: {
                  emailNotifications: true,
                  systemAlerts: true,
                  userActivityReports: true
                }
              },
              updatedAt: new Date()
            });
          }
        }
      }
      
      // Update last login timestamp in Firestore
      if (userCredential.user) {
        const userRef = doc(db, 'users', userCredential.user.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          
          // Defensive fix: ensure progress is an object
          let fixed = false;
          let fixedUserData = { ...userData };
          if (typeof userData.progress !== 'object' || Array.isArray(userData.progress) || userData.progress === null) {
            fixedUserData.progress = {
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
            fixed = true;
          }
          if (!Array.isArray(userData.completedLessons)) {
            fixedUserData.completedLessons = [];
            fixed = true;
          }
          if (fixed) {
            // Save the fixed profile back to Firestore
            await setDoc(userRef, fixedUserData, { merge: true });
            console.log('🛠️ Fixed user profile structure in Firestore');
          }
          const userProfileWithDefaults = {
            ...fixedUserData,
            firstName: fixedUserData.firstName || '',
            lastName: fixedUserData.lastName || '',
            age: fixedUserData.age || null,
            sex: fixedUserData.sex || 'male',
            displayName: fixedUserData.displayName || (fixedUserData.sex === 'female' ? 'לוחמת סייבר' : 'לוחם סייבר')
          };
          setUserProfile(userProfileWithDefaults);
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
   * @param {number|string} lessonId - Lesson number (originalId) or Firestore ID
   * @param {boolean} completed - Whether the lesson is completed
   * @param {number} score - User's score (0-100)
   * @param {boolean} temporary - Whether this is temporary progress (for auto-save)
   * @param {number} lastSlide - Last slide viewed (for resume functionality)
   * @param {string} slideId - Specific slide ID for engagement tracking
   * @param {Array} allSlideIds - Array of all slide IDs to ensure complete tracking
   */
  const updateUserProgress = async (lessonId, completed, score = 0, temporary = false, lastSlide = null, slideId = null, allSlideIds = null, userOverride = null) => {
    const userToUse = userOverride || currentUser;
    
    // 🔒 ROLE-BASED CHECK: Only students should have progress tracked
    if (!userToUse) {
      console.error('❌ No current user available for progress update');
      console.error('❌ currentUser:', currentUser);
      console.error('❌ userOverride:', userOverride);
      return { success: false, error: "No current user available" };
    }
    
    if (!userToUse.uid) {
      console.error('❌ User object has no UID');
      console.error('❌ userToUse:', userToUse);
      return { success: false, error: "User object has no UID" };
    }
    
    // Get user role to determine if progress should be saved
    let userRole = 'student'; // default
    try {
      const userRef = doc(db, 'users', userToUse.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        userRole = userDoc.data().role || 'student';
      }
    } catch (error) {
      console.error('❌ Error getting user role:', error);
    }
    
    // 🚫 BLOCK PROGRESS SAVING FOR NON-STUDENTS
    if (userRole !== 'student') {
      console.log(`🚫 Progress tracking blocked for ${userRole} role (UID: ${userToUse.uid})`);
      return { success: true, data: { blocked: true, reason: `Progress tracking not allowed for ${userRole} role` } };
    }
    
    console.log('🚀 updateUserProgress called with:', {
      lessonId,
      completed,
      score,
      temporary,
      lastSlide,
      slideId,
      allSlideIds,
      currentUser: currentUser?.uid,
      userOverride: userOverride?.uid,
      userToUse: userToUse?.uid,
      userRole
    });
    
    try {
      // Handle regular users with Firestore
      const userRef = doc(db, 'users', userToUse.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const progress = userData.progress || {};
        
        // Determine the correct lesson ID to use for progress tracking
        const progressLessonId = getLessonFirestoreId(lessonId);
        
        // Initialize lesson progress if it doesn't exist
        if (!progress[progressLessonId]) {
          progress[progressLessonId] = {
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
        // If lesson is completed, reset lastSlide to 0, otherwise use provided lastSlide
        const finalLastSlide = completed ? 0 : (lastSlide !== null ? lastSlide : progress[progressLessonId].lastSlide);
        
        progress[progressLessonId] = {
          ...progress[progressLessonId],
          completed,
          score,
          completedAt: completed ? new Date() : progress[progressLessonId].completedAt,
          temporary: temporary && !completed ? true : false,
          lastActivity: new Date(),
          lastSlide: finalLastSlide
        };
        
        // Track page engagement if slideId is provided
        if (slideId && progress[progressLessonId].pagesEngaged) {
          if (!progress[progressLessonId].pagesEngaged.includes(slideId)) {
            progress[progressLessonId].pagesEngaged = [...progress[progressLessonId].pagesEngaged, slideId];
          }
        }
        
        // If lesson is completed, ensure all slides are marked as engaged
        if (completed && allSlideIds && Array.isArray(allSlideIds)) {
          const currentEngaged = progress[progressLessonId].pagesEngaged || [];
          const allEngaged = [...new Set([...currentEngaged, ...allSlideIds])];
          progress[progressLessonId].pagesEngaged = allEngaged;
          console.log(`📊 All slides marked as engaged for lesson ${progressLessonId}: ${allEngaged.length} slides`);
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
        
        // Teacher-controlled lesson system - no automatic unlocking
        const currentCompletedLessons = userData.completedLessons || [];
        const currentLesson = userData.currentLesson || 1;
        
        let newCompletedLessons = currentCompletedLessons;
        let newCurrentLesson = currentLesson;
        
        if (completed) {
          // Add to completed lessons if not already there (using progress lesson ID)
          if (!currentCompletedLessons.includes(progressLessonId)) {
            newCompletedLessons = [...currentCompletedLessons, progressLessonId];
            console.log(`✅ Lesson ${progressLessonId} completed and added to completedLessons`);
          }
          // Note: No automatic lesson unlocking - teachers control lesson access
          console.log(`📚 Lesson ${progressLessonId} completed - waiting for teacher to unlock next lesson`);
        }
        
        // Calculate achievements based on progress
        const achievements = userData.achievements || [];
        const newAchievements = [...achievements];
        
        // First lesson completion achievement (check by progress lesson ID or lesson number)
        if (completed && (progressLessonId === 'lesson1' || lessonId === 1) && !achievements.includes('first_lesson')) {
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
          userId: userToUse.uid,
          lessonId: progressLessonId,
          originalLessonId: lessonId,
          action: completed ? 'LESSON_COMPLETED' : 'PROGRESS_UPDATED',
          timestamp: new Date().toISOString(),
          progress: {
            lessonId: progressLessonId,
            completed,
            score,
            lastSlide: finalLastSlide,
            pagesEngaged: progress[progressLessonId].pagesEngaged?.length || 0,
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
        console.log('✅ Progress update completed successfully');
        console.log('📊 Final user state:', {
          userId: userToUse.uid,
          lessonId: progressLessonId,
          completed,
          score,
          totalTimeSpent,
          totalPagesEngaged,
          completedLessons: newCompletedLessons.length,
          achievements: newAchievements.length
        });
        
        return { success: true, data: { progress, completedLessons: newCompletedLessons } };
      } else {
        console.error('❌ User document does not exist in Firestore');
        return { success: false, error: "User document not found" };
      }
    } catch (error) {
      console.error('❌ Error updating user progress:', error);
      return { success: false, error: error.message };
    }
  };

  /**
   * Track Slide Engagement Function
   * 
   * Records which specific slides/pages a user has engaged with.
   * Used for analytics and to ensure users don't skip content.
   * 
   * @param {number|string} lessonId - Lesson number (originalId) or Firestore ID
   * @param {string} slideId - ID of the specific slide
   */
  const trackSlideEngagement = async (lessonId, slideId) => {
    if (!currentUser) return;
    
    // 🔒 ROLE-BASED CHECK: Only students should have engagement tracked
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData.role || 'student';
        
        // 🚫 BLOCK ENGAGEMENT TRACKING FOR NON-STUDENTS
        if (userRole !== 'student') {
          console.log(`🚫 Slide engagement tracking blocked for ${userRole} role (UID: ${currentUser.uid})`);
          return;
        }
        
        const progress = userData.progress || {};
        
        // Determine the correct lesson ID to use for progress tracking
        const progressLessonId = getLessonFirestoreId(lessonId);
        
        // Initialize lesson progress if it doesn't exist
        if (!progress[progressLessonId]) {
          progress[progressLessonId] = {
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
        if (!progress[progressLessonId].pagesEngaged) {
          progress[progressLessonId].pagesEngaged = [];
        }
        
        // Add slide to pagesEngaged if not already present (ensures uniqueness)
        if (!progress[progressLessonId].pagesEngaged.includes(slideId)) {
          progress[progressLessonId].pagesEngaged = [...progress[progressLessonId].pagesEngaged, slideId];
          progress[progressLessonId].lastActivity = new Date();
          
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
            progressLessonId,
            slideId,
            timestamp: new Date().toISOString(),
            engagement: {
              lessonId,
              progressLessonId,
              slideId,
              totalSlidesInLesson: progress[progressLessonId].pagesEngaged.length,
              isNewEngagement: true
            },
            statistics: {
              totalTimeSpent,
              totalPagesEngaged,
              lessonProgress: Math.round((progress[progressLessonId].pagesEngaged.length / 10) * 100) // Estimate total slides
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
            progressLessonId,
            slideId,
            totalPagesEngaged,
            totalTimeSpent,
            lessonProgress: `${progress[progressLessonId].pagesEngaged.length} slides engaged`
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
    
    // 🔒 ROLE-BASED CHECK: Only students should have temporary progress cleaned up
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData.role || 'student';
        
        // 🚫 BLOCK TEMPORARY PROGRESS CLEANUP FOR NON-STUDENTS
        if (userRole !== 'student') {
          console.log(`🚫 Temporary progress cleanup blocked for ${userRole} role (UID: ${currentUser.uid})`);
          return;
        }
        
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
   * Change user password
   * 
   * @param {string} currentPassword - Current password for verification
   * @param {string} newPassword - New password to set
   * @returns {Promise<void>}
   * @throws {Error} If password change fails
   */
  const changePassword = async (currentPassword, newPassword) => {
    if (!currentUser) {
      throw new Error('No user is currently logged in');
    }

    try {
      // Re-authenticate user with current password
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, credential);
      
      // Update password
      await updatePassword(currentUser, newPassword);
      
      console.log('✅ Password changed successfully');
    } catch (error) {
      console.error('❌ Error changing password:', error);
      
      // Provide specific error messages
      if (error.code === 'auth/wrong-password') {
        throw new Error('הסיסמה הנוכחית שגויה');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('הסיסמה החדשה חייבת להיות חזקה יותר (לפחות 6 תווים)');
      } else if (error.code === 'auth/requires-recent-login') {
        throw new Error('נדרשת התחברות מחדש לשינוי הסיסמה');
      } else {
        throw new Error('אירעה שגיאה בשינוי הסיסמה');
      }
    }
  };

  /**
   * Get last slide for resume functionality
   * 
   * @param {number|string} lessonId - Lesson number (originalId) or Firestore ID
   * @returns {number} Last slide index
   */
  const getLastLessonSlide = (lessonId) => {
    // Try to find the lesson in the database to get the correct ID
    const progressLessonId = getLessonFirestoreId(lessonId);
    
    const lastSlide = userProfile?.progress?.[progressLessonId]?.lastSlide ?? 0;
    console.log(`📖 GET LAST SLIDE: Lesson ${lessonId} -> Slide ${lastSlide + 1} (using ID: ${progressLessonId})`);
    return lastSlide;
  };

  /**
   * Set last slide for resume functionality
   * 
   * @param {number|string} lessonId - Lesson number (originalId) or Firestore ID
   * @param {number} slideIndex - Slide index to save (0-based)
   */
  const setLastLessonSlide = async (lessonId, slideIndex) => {
    if (!currentUser) return;
    
    // 🔒 ROLE-BASED CHECK: Only students should have slide positions saved
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData.role || 'student';
        
        // 🚫 BLOCK SLIDE POSITION SAVING FOR NON-STUDENTS
        if (userRole !== 'student') {
          console.log(`🚫 Slide position saving blocked for ${userRole} role (UID: ${currentUser.uid})`);
          return;
        }
        
        const progress = userData.progress || {};
        
        // Determine the correct lesson ID to use for progress tracking
        const progressLessonId = getLessonFirestoreId(lessonId);
        
        // Initialize lesson progress if it doesn't exist
        if (!progress[progressLessonId]) {
          progress[progressLessonId] = {
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
        progress[progressLessonId].lastSlide = slideIndex;
        progress[progressLessonId].lastActivity = new Date();
        
        // Console logging for slide position tracking
        console.log('💾 SLIDE POSITION SAVED:', {
          userId: currentUser.uid,
          lessonId: progressLessonId,
          originalLessonId: lessonId,
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

  // Single consolidated useEffect for authentication and real-time updates
  useEffect(() => {
    console.log('🔄 Setting up authentication listener...');
    
    // Set up Firebase Auth state listener
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      console.log('🔄 Auth state changed:', user ? `User logged in: ${user.email} (${user.uid})` : 'User logged out');
      console.log('🔄 Previous currentUser:', currentUser?.uid);
      
      setCurrentUser(user);
      
      if (user) {
        console.log('📥 Fetching user profile for:', user.email);
        console.log('🔍 User UID:', user.uid);
        
        try {
          const userRef = doc(db, 'users', user.uid);
          console.log('📄 Firestore document reference created');
          
          const userDoc = await getDoc(userRef);
          console.log('📋 Firestore document fetch completed');
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            
            // Fix corrupted user profile structure
            let fixed = false;
            let fixedUserData = { ...userData };
            
            if (typeof userData.progress !== 'object' || Array.isArray(userData.progress) || userData.progress === null) {
              fixedUserData.progress = {
                "lesson1": {
                  completed: false,
                  score: 0,
                  completedAt: null,
                  temporary: false,
                  lastSlide: 0,
                  pagesEngaged: [],
                  lastActivity: new Date()
                },
                "lesson2": {
                  completed: false,
                  score: 0,
                  completedAt: null,
                  temporary: false,
                  lastSlide: 0,
                  pagesEngaged: [],
                  lastActivity: new Date()
                }
              };
              fixed = true;
            }
            
            if (!Array.isArray(userData.completedLessons)) {
              fixedUserData.completedLessons = [];
              fixed = true;
            }
            
            // Save fixed data back to Firestore if needed
            if (fixed) {
              try {
                await updateDoc(userRef, fixedUserData);
                console.log('🔧 Fixed corrupted user profile structure');
              } catch (fixError) {
                console.error('❌ Error fixing user profile:', fixError);
              }
            }
            
            console.log('✅ User profile loaded:', fixedUserData.displayName);
            console.log('📊 User data:', {
              role: fixedUserData.role,
              currentLesson: fixedUserData.currentLesson,
              completedLessons: fixedUserData.completedLessons?.length || 0,
              progress: Object.keys(fixedUserData.progress || {}).length
            });
            
            // Ensure default values for user credentials
            const userProfileWithDefaults = {
              ...fixedUserData,
              firstName: fixedUserData.firstName || '',
              lastName: fixedUserData.lastName || '',
              age: fixedUserData.age || null,
              sex: fixedUserData.sex || 'male',
              displayName: fixedUserData.displayName || (fixedUserData.sex === 'female' ? 'לוחמת סייבר' : 'לוחם סייבר')
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

    // Set up real-time listener for user profile updates (only if user exists)
    let unsubscribeProfile = null;
    if (currentUser) {
      console.log('🔄 Setting up real-time listener for user:', currentUser.uid);
      const userDocRef = doc(db, 'users', currentUser.uid);
      unsubscribeProfile = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          console.log('🔄 Real-time profile update received for:', currentUser.uid);
          setUserProfile(docSnap.data());
        } else {
          console.log('⚠️ Real-time listener: User document not found');
        }
      }, (error) => {
        console.error('❌ Real-time listener error:', error);
      });
    }

    // Cleanup function
    return () => {
      console.log('🔄 Cleaning up authentication listeners');
      unsubscribeAuth();
      if (unsubscribeProfile) {
        console.log('🔄 Cleaning up real-time profile listener');
        unsubscribeProfile();
      }
    };
  }, []); // Only run once on mount

  // Memoize functions to prevent infinite re-renders
  const memoizedSignup = useCallback(signup, []);
  const memoizedLogin = useCallback(login, []);
  const memoizedLogout = useCallback(logout, []);
  const memoizedUpdateUserProgress = useCallback(updateUserProgress, []);
  const memoizedTrackSlideEngagement = useCallback(trackSlideEngagement, []);
  const memoizedSetLastLessonSlide = useCallback(setLastLessonSlide, []);
  const memoizedGetLastLessonSlide = useCallback(getLastLessonSlide, [userProfile]);
  const memoizedUpdateDisplayName = useCallback(updateDisplayName, []);
  const memoizedRemoveTemporaryProgress = useCallback(removeTemporaryProgress, []);
  const memoizedChangePassword = useCallback(changePassword, []);

  // Context value containing all authentication state and methods - MEMOIZED to prevent infinite re-renders
  const value = useMemo(() => ({
    currentUser,
    userProfile,
    role: userProfile?.role || null,
    signup: memoizedSignup,
    login: memoizedLogin,
    logout: memoizedLogout,
    updateUserProgress: memoizedUpdateUserProgress,
    setLastLessonSlide: memoizedSetLastLessonSlide,
    loading,
    removeTemporaryProgress: memoizedRemoveTemporaryProgress,
    trackSlideEngagement: memoizedTrackSlideEngagement,
    updateDisplayName: memoizedUpdateDisplayName,
    getLastLessonSlide: memoizedGetLastLessonSlide,
    changePassword: memoizedChangePassword
  }), [
    currentUser,
    userProfile,
    loading,
    memoizedSignup,
    memoizedLogin,
    memoizedLogout,
    memoizedUpdateUserProgress,
    memoizedSetLastLessonSlide,
    memoizedRemoveTemporaryProgress,
    memoizedTrackSlideEngagement,
    memoizedUpdateDisplayName,
    memoizedGetLastLessonSlide,
    memoizedChangePassword
  ]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 