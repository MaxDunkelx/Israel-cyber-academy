import { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase-config';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, displayName, role = 'student') => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      
      // Create user profile in Firestore
      const userProfile = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName,
        role,
        progress: {},
        completedLessons: [],
        currentLesson: 1,
        createdAt: new Date(),
        lastLogin: new Date()
      };
      
      await setDoc(doc(db, 'users', userCredential.user.uid), userProfile);
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Update last login
      if (userCredential.user) {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          lastLogin: new Date()
        }, { merge: true });
      }
      
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  const updateUserProgress = async (lessonId, completed, score = 0, temporary = false, lastSlide = null, slideId = null) => {
    if (!currentUser) return;
    
    try {
      // Handle guest mode with localStorage
      if (currentUser.isGuest) {
        const guestProgress = JSON.parse(localStorage.getItem('guestProgress') || '{}');
        
        // Initialize lesson progress if it doesn't exist
        if (!guestProgress[lessonId]) {
          guestProgress[lessonId] = {
            completed: false,
            score: 0,
            completedAt: null,
            temporary: false,
            lastSlide: 0,
            pagesEngaged: [],
            lastActivity: new Date()
          };
        }
        
        // Update lesson progress
        guestProgress[lessonId] = {
          ...guestProgress[lessonId],
          completed,
          score,
          completedAt: completed ? new Date() : guestProgress[lessonId].completedAt,
          temporary: temporary && !completed ? true : false,
          lastActivity: new Date(),
          ...(lastSlide !== null ? { lastSlide } : {})
        };
        
        // Track page engagement if slideId is provided
        if (slideId && guestProgress[lessonId].pagesEngaged) {
          if (!guestProgress[lessonId].pagesEngaged.includes(slideId)) {
            guestProgress[lessonId].pagesEngaged = [...guestProgress[lessonId].pagesEngaged, slideId];
          }
        }
        
        localStorage.setItem('guestProgress', JSON.stringify(guestProgress));
        
        // Update local state
        setUserProfile(prev => ({
          ...prev,
          progress: guestProgress
        }));
        
        return;
      }
      
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
        
        // Update lesson progress
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
        
        const completedLessons = completed 
          ? [...new Set([...userData.completedLessons || [], lessonId])]
          : userData.completedLessons || [];
        
        await setDoc(userRef, {
          progress,
          completedLessons,
          currentLesson: Math.max(userData.currentLesson || 1, lessonId + 1)
        }, { merge: true });
        
        // Update local state
        setUserProfile(prev => ({
          ...prev,
          progress,
          completedLessons,
          currentLesson: Math.max(prev.currentLesson || 1, lessonId + 1)
        }));
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  // Track individual slide engagement
  const trackSlideEngagement = async (lessonId, slideId) => {
    if (!currentUser) return;
    
    try {
      // Handle guest mode with localStorage
      if (currentUser.isGuest) {
        const guestProgress = JSON.parse(localStorage.getItem('guestProgress') || '{}');
        
        // Initialize lesson progress if it doesn't exist
        if (!guestProgress[lessonId]) {
          guestProgress[lessonId] = {
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
        if (!guestProgress[lessonId].pagesEngaged) {
          guestProgress[lessonId].pagesEngaged = [];
        }
        
        // Add slide to pagesEngaged if not already present (ensures uniqueness)
        if (!guestProgress[lessonId].pagesEngaged.includes(slideId)) {
          guestProgress[lessonId].pagesEngaged = [...guestProgress[lessonId].pagesEngaged, slideId];
          guestProgress[lessonId].lastActivity = new Date();
          
          localStorage.setItem('guestProgress', JSON.stringify(guestProgress));
          
          // Update local state
          setUserProfile(prev => ({
            ...prev,
            progress: {
              ...prev.progress,
              [lessonId]: {
                ...prev.progress?.[lessonId],
                pagesEngaged: guestProgress[lessonId].pagesEngaged,
                lastActivity: guestProgress[lessonId].lastActivity
              }
            }
          }));
        }
        return;
      }
      
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
          
          await setDoc(userRef, { progress }, { merge: true });
          
          // Update local state
          setUserProfile(prev => ({
            ...prev,
            progress: {
              ...prev.progress,
              [lessonId]: {
                ...prev.progress?.[lessonId],
                pagesEngaged: progress[lessonId].pagesEngaged,
                lastActivity: progress[lessonId].lastActivity
              }
            }
          }));
        }
      }
    } catch (error) {
      console.error('Error tracking slide engagement:', error);
    }
  };

  // Remove all temporary progress from Firestore and local state
  const removeTemporaryProgress = async () => {
    if (!currentUser || localStorage.getItem('isGuest')) return;
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const progress = userData.progress || {};
        let changed = false;
        Object.keys(progress).forEach(key => {
          if (progress[key].temporary) {
            delete progress[key];
            changed = true;
          }
        });
        if (changed) {
          await setDoc(userRef, { progress }, { merge: true });
          setUserProfile(prev => ({ ...prev, progress }));
        }
      }
    } catch (error) {
      console.error('Error removing temporary progress:', error);
    }
  };

  // Remove temporary progress on logout
  const logout = async () => {
    localStorage.removeItem('isGuest');
    await removeTemporaryProgress();
    return signOut(auth);
  };

  // Add setLastLessonSlide to context
  const setLastLessonSlide = async (lessonId, slideIndex) => {
    if (!currentUser || localStorage.getItem('isGuest')) return;
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const progress = userData.progress || {};
        if (!progress[lessonId]) progress[lessonId] = {};
        progress[lessonId].lastSlide = slideIndex;
        await setDoc(userRef, { progress }, { merge: true });
        setUserProfile(prev => ({
          ...prev,
          progress: {
            ...prev.progress,
            [lessonId]: {
              ...prev.progress?.[lessonId],
              lastSlide: slideIndex
            }
          }
        }));
      }
    } catch (error) {
      console.error('Error updating last slide:', error);
    }
  };

  useEffect(() => {
    // Guest mode support
    if (localStorage.getItem('isGuest')) {
      const guestRole = localStorage.getItem('guestRole') || 'student';
      // Generate a random email for guest
      const randomId = Math.random().toString(36).substring(2, 8);
      const guestEmail = `guest_${guestRole}_${randomId}@demo.com`;
      setCurrentUser({ uid: 'guest', isGuest: true });
      setUserProfile({
        uid: 'guest',
        displayName: guestRole === 'teacher' ? 'מורה אורח' : 'תלמיד אורח',
        role: guestRole,
        email: guestEmail,
        password: 'none',
        progress: {},
        completedLessons: [],
        currentLesson: 1,
        isGuest: true
      });
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    logout,
    updateUserProgress,
    setLastLessonSlide,
    loading,
    removeTemporaryProgress,
    trackSlideEngagement
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 