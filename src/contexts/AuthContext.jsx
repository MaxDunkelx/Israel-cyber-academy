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

  const updateUserProgress = async (lessonId, completed, score = 0, temporary = false, lastSlide = null) => {
    if (!currentUser || localStorage.getItem('isGuest')) return;
    
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const progress = userData.progress || {};
        
        progress[lessonId] = {
          completed,
          score,
          completedAt: completed ? new Date() : null,
          temporary: temporary && !completed ? true : false,
          ...(lastSlide !== null ? { lastSlide } : {})
        };
        
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
    removeTemporaryProgress
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 