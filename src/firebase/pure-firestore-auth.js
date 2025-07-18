/**
 * Pure Firestore Authentication Service
 * 
 * This service replaces Firebase Auth with direct Firestore database authentication.
 * Users are authenticated by checking email/password directly in the users collection.
 */

import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  updateDoc, 
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import { db } from './firebase-config.js';

/**
 * Simple password hashing function (for browser compatibility)
 * In production, you should use a proper hashing library
 */
const simpleHash = (password) => {
  let hash = 0;
  if (password.length === 0) return hash.toString();
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
};

/**
 * Authenticate user with email and password from Firestore
 */
export const authenticateUser = async (email, password) => {
  try {
    console.log('🔐 PURE AUTH: Starting authentication for:', email);
    
    // Query users collection by email
    const usersRef = collection(db, 'users');
    const emailQuery = query(usersRef, where('email', '==', email.toLowerCase().trim()));
    const querySnapshot = await getDocs(emailQuery);
    
    if (querySnapshot.empty) {
      console.log('❌ PURE AUTH: No user found with email:', email);
      throw new Error('Invalid email or password');
    }
    
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    
    console.log('🔍 PURE AUTH: User found, checking password...');
    
    // Check if user has password field
    if (!userData.password) {
      console.log('❌ PURE AUTH: User has no password field');
      throw new Error('Invalid email or password');
    }
    
    // For now, we'll check if the password matches directly
    // In a real implementation, you'd want to use proper password hashing
    const isPasswordValid = userData.password === password || userData.password === simpleHash(password);
    
    if (!isPasswordValid) {
      console.log('❌ PURE AUTH: Invalid password for user:', email);
      throw new Error('Invalid email or password');
    }
    
    // Check if user is active
    if (userData.status === 'inactive' || userData.isDisabled) {
      console.log('❌ PURE AUTH: User account is disabled:', email);
      throw new Error('Account is disabled. Please contact administrator.');
    }
    
    // Update last login timestamp
    try {
      await updateDoc(doc(db, 'users', userDoc.id), {
        lastLogin: serverTimestamp(),
        lastActivityDate: serverTimestamp(),
        loginAttempts: 0 // Reset login attempts on successful login
      });
    } catch (updateError) {
      console.warn('⚠️ PURE AUTH: Failed to update last login timestamp:', updateError);
      // Don't fail authentication if timestamp update fails
    }
    
    // Create user session object
    const userSession = {
      id: userDoc.id,
      email: userData.email,
      displayName: userData.displayName || `${userData.firstName || ''} ${userData.lastName || ''}`.trim(),
      role: userData.role,
      firstName: userData.firstName,
      lastName: userData.lastName,
      school: userData.school,
      grade: userData.grade,
      classId: userData.classId,
      teacherId: userData.teacherId,
      isAuthenticated: true,
      authenticatedAt: new Date().toISOString(),
      sessionId: `session_${Date.now()}_${userDoc.id}`
    };
    
    console.log('✅ PURE AUTH: Authentication successful for:', email);
    console.log('👤 User role:', userData.role);
    
    return userSession;
    
  } catch (error) {
    console.error('❌ PURE AUTH: Authentication failed:', error.message);
    throw error;
  }
};

/**
 * Hash password using simple hash (for browser compatibility)
 */
export const hashPassword = async (password) => {
  return simpleHash(password);
};

/**
 * Create a new user in Firestore
 */
export const createUser = async (userData) => {
  try {
    console.log('👤 PURE AUTH: Creating new user:', userData.email);
    
    // Hash the password
    const hashedPassword = await hashPassword(userData.password);
    
    // Create user document
    const userRef = doc(collection(db, 'users'));
    const newUser = {
      ...userData,
      id: userRef.id,
      email: userData.email.toLowerCase().trim(),
      password: hashedPassword,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLogin: null,
      lastActivityDate: null,
      loginAttempts: 0,
      status: 'active',
      isDisabled: false,
      isSlot: true,
      hasFirebaseAuth: false // Mark as pure Firestore user
    };
    
    await setDoc(userRef, newUser);
    
    console.log('✅ PURE AUTH: User created successfully:', userRef.id);
    return userRef.id;
    
  } catch (error) {
    console.error('❌ PURE AUTH: Failed to create user:', error);
    throw error;
  }
};

/**
 * Update user password
 */
export const updateUserPassword = async (userId, newPassword) => {
  try {
    const hashedPassword = await hashPassword(newPassword);
    
    await updateDoc(doc(db, 'users', userId), {
      password: hashedPassword,
      updatedAt: serverTimestamp()
    });
    
    console.log('✅ PURE AUTH: Password updated for user:', userId);
    
  } catch (error) {
    console.error('❌ PURE AUTH: Failed to update password:', error);
    throw error;
  }
};

/**
 * Validate user session
 */
export const validateSession = async (sessionData) => {
  try {
    if (!sessionData || !sessionData.id) {
      return false;
    }
    
    // Check if user still exists and is active
    const userDoc = await getDocs(query(
      collection(db, 'users'), 
      where('id', '==', sessionData.id)
    ));
    
    if (userDoc.empty) {
      return false;
    }
    
    const userData = userDoc.docs[0].data();
    
    // Check if user is still active
    if (userData.status === 'inactive' || userData.isDisabled) {
      return false;
    }
    
    return true;
    
  } catch (error) {
    console.error('❌ PURE AUTH: Session validation failed:', error);
    return false;
  }
};

/**
 * Logout user (update last activity)
 */
export const logoutUser = async (userId) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      lastActivityDate: serverTimestamp()
    });
    
    console.log('✅ PURE AUTH: User logged out:', userId);
    
  } catch (error) {
    console.error('❌ PURE AUTH: Logout failed:', error);
    // Don't throw error for logout
  }
};

/**
 * Get user by ID
 */
export const getUserById = async (userId) => {
  try {
    const userDoc = await getDocs(query(
      collection(db, 'users'), 
      where('id', '==', userId)
    ));
    
    if (userDoc.empty) {
      return null;
    }
    
    return {
      id: userDoc.docs[0].id,
      ...userDoc.docs[0].data()
    };
    
  } catch (error) {
    console.error('❌ PURE AUTH: Failed to get user by ID:', error);
    return null;
  }
};

/**
 * Get user by email
 */
export const getUserByEmail = async (email) => {
  try {
    const userDoc = await getDocs(query(
      collection(db, 'users'), 
      where('email', '==', email.toLowerCase().trim())
    ));
    
    if (userDoc.empty) {
      return null;
    }
    
    return {
      id: userDoc.docs[0].id,
      ...userDoc.docs[0].data()
    };
    
  } catch (error) {
    console.error('❌ PURE AUTH: Failed to get user by email:', error);
    return null;
  }
}; 