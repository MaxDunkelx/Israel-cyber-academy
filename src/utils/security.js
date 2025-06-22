/**
 * Security Utilities - Israel Cyber Academy
 * 
 * Centralized security functions for authentication, authorization,
 * and security event logging. Provides role-based access control
 * and comprehensive security monitoring.
 * 
 * Features:
 * - Role validation and access control
 * - Security event logging
 * - Input validation and sanitization
 * - Permission checking
 * - Audit trail management
 * 
 * @module security
 */

import { doc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

/**
 * Available user roles in the system
 * Defines the hierarchy and permissions for each role
 */
export const USER_ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  ADMIN: 'admin'
};

/**
 * Role hierarchy for permission checking
 * Higher roles inherit permissions from lower roles
 */
export const ROLE_HIERARCHY = {
  [USER_ROLES.STUDENT]: 1,
  [USER_ROLES.TEACHER]: 2,
  [USER_ROLES.ADMIN]: 3
};

/**
 * Permission matrix for different operations
 * Maps operations to required roles and additional conditions
 */
export const PERMISSIONS = {
  // Student permissions
  'student_lesson_access': {
    roles: [USER_ROLES.STUDENT, USER_ROLES.TEACHER, USER_ROLES.ADMIN],
    description: 'Access to lesson content'
  },
  'student_profile_update': {
    roles: [USER_ROLES.STUDENT, USER_ROLES.ADMIN],
    description: 'Update student profile'
  },
  
  // Teacher permissions
  'teacher_dashboard_access': {
    roles: [USER_ROLES.TEACHER, USER_ROLES.ADMIN],
    description: 'Access to teacher dashboard'
  },
  'teacher_notes_access': {
    roles: [USER_ROLES.TEACHER, USER_ROLES.ADMIN],
    description: 'Access to teacher notes'
  },
  'class_management': {
    roles: [USER_ROLES.TEACHER, USER_ROLES.ADMIN],
    description: 'Create and manage classes'
  },
  'student_assignment': {
    roles: [USER_ROLES.TEACHER, USER_ROLES.ADMIN],
    description: 'Assign students to classes'
  },
  'analytics_access': {
    roles: [USER_ROLES.TEACHER, USER_ROLES.ADMIN],
    description: 'Access to student analytics'
  },
  
  // Admin permissions
  'user_management': {
    roles: [USER_ROLES.ADMIN],
    description: 'Manage all users'
  },
  'system_configuration': {
    roles: [USER_ROLES.ADMIN],
    description: 'Configure system settings'
  },
  'security_logs_access': {
    roles: [USER_ROLES.ADMIN],
    description: 'Access to security logs'
  }
};

/**
 * Check if user has a specific role
 * Validates role against available roles
 * 
 * @param {Object} user - User object with role property
 * @param {string} user.role - User's role
 * @param {string} requiredRole - Role to check against
 * @returns {boolean} True if user has the required role
 */
export const hasRole = (user, requiredRole) => {
  if (!user || !user.role) {
    return false;
  }
  
  const userRoleLevel = ROLE_HIERARCHY[user.role];
  const requiredRoleLevel = ROLE_HIERARCHY[requiredRole];
  
  return userRoleLevel >= requiredRoleLevel;
};

/**
 * Check if user is a teacher
 * Convenience function for teacher role validation
 * 
 * @param {Object} user - User object with role property
 * @returns {boolean} True if user is a teacher or higher
 */
export const isTeacher = (user) => {
  return hasRole(user, USER_ROLES.TEACHER);
};

/**
 * Check if user is an admin
 * Convenience function for admin role validation
 * 
 * @param {Object} user - User object with role property
 * @returns {boolean} True if user is an admin
 */
export const isAdmin = (user) => {
  return hasRole(user, USER_ROLES.ADMIN);
};

/**
 * Validate teacher access for specific operations
 * Comprehensive validation for teacher permissions
 * 
 * @param {Object} user - User object with role and other properties
 * @param {string} operation - Operation to validate
 * @returns {Object} Validation result with success status and message
 */
export const validateTeacherAccess = (user, operation) => {
  // Check if user exists
  if (!user) {
    return {
      success: false,
      message: 'User not authenticated',
      code: 'UNAUTHENTICATED'
    };
  }
  
  // Check if user has a role
  if (!user.role) {
    return {
      success: false,
      message: 'User role not defined',
      code: 'NO_ROLE'
    };
  }
  
  // Check if operation exists in permissions
  if (!PERMISSIONS[operation]) {
    return {
      success: false,
      message: 'Invalid operation',
      code: 'INVALID_OPERATION'
    };
  }
  
  // Check if user has permission for operation
  const permission = PERMISSIONS[operation];
  if (!permission.roles.includes(user.role)) {
    return {
      success: false,
      message: `Insufficient permissions for ${operation}`,
      code: 'INSUFFICIENT_PERMISSIONS'
    };
  }
  
  // Additional validation for specific operations
  switch (operation) {
    case 'teacher_dashboard_access':
      if (!user.uid) {
        return {
          success: false,
          message: 'Teacher ID not found',
          code: 'NO_TEACHER_ID'
        };
      }
      break;
      
    case 'class_management':
      if (!user.uid) {
        return {
          success: false,
          message: 'Teacher ID required for class management',
          code: 'NO_TEACHER_ID'
        };
      }
      break;
      
    default:
      break;
  }
  
  return {
    success: true,
    message: 'Access granted',
    code: 'ACCESS_GRANTED'
  };
};

/**
 * Log security events to Firestore
 * Creates audit trail for security monitoring
 * 
 * @param {string} eventType - Type of security event
 * @param {Object} eventData - Additional event data
 * @param {Object} metadata - Optional metadata for the event
 * @returns {Promise<void>}
 */
export const logSecurityEvent = async (eventType, eventData = {}, metadata = {}) => {
  try {
    const securityEvent = {
      eventType,
      eventData,
      metadata,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      referrer: document.referrer
    };
    
    // Add to security logs collection
    await addDoc(collection(db, 'securityLogs'), securityEvent);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🔒 Security Event:', {
        type: eventType,
        data: eventData,
        timestamp: new Date().toISOString()
      });
    }
    
  } catch (error) {
    console.error('Error logging security event:', error);
    
    // Fallback to console logging if Firestore fails
    console.error('🔒 Security Event (Fallback):', {
      type: eventType,
      data: eventData,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
};

/**
 * Sanitize user input to prevent XSS attacks
 * Removes potentially dangerous HTML and script tags
 * 
 * @param {string} input - User input to sanitize
 * @returns {string} Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    return input;
  }
  
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
};

/**
 * Validate email format
 * Checks if email follows proper format
 * 
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * Checks password against security requirements
 * 
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with score and feedback
 */
export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return {
      isValid: false,
      score: 0,
      feedback: 'Password is required'
    };
  }
  
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  let score = 0;
  const feedback = [];
  
  if (password.length >= minLength) {
    score += 1;
  } else {
    feedback.push(`Password must be at least ${minLength} characters long`);
  }
  
  if (hasUpperCase) score += 1;
  else feedback.push('Password must contain at least one uppercase letter');
  
  if (hasLowerCase) score += 1;
  else feedback.push('Password must contain at least one lowercase letter');
  
  if (hasNumbers) score += 1;
  else feedback.push('Password must contain at least one number');
  
  if (hasSpecialChar) score += 1;
  else feedback.push('Password must contain at least one special character');
  
  const isValid = score >= 4;
  
  return {
    isValid,
    score,
    feedback: feedback.length > 0 ? feedback : ['Password meets all requirements']
  };
};

/**
 * Generate secure random token
 * Creates cryptographically secure random string
 * 
 * @param {number} length - Length of token to generate
 * @returns {string} Secure random token
 */
export const generateSecureToken = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    // Use crypto API if available
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
  } else {
    // Fallback to Math.random (less secure)
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
  }
  
  return result;
};

/**
 * Rate limiting utility
 * Prevents abuse by limiting request frequency
 * 
 * @param {string} key - Unique key for rate limiting
 * @param {number} maxRequests - Maximum requests allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {boolean} True if request is allowed
 */
const rateLimitStore = new Map();

export const checkRateLimit = (key, maxRequests = 10, windowMs = 60000) => {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!rateLimitStore.has(key)) {
    rateLimitStore.set(key, []);
  }
  
  const requests = rateLimitStore.get(key);
  
  // Remove old requests outside the window
  const validRequests = requests.filter(timestamp => timestamp > windowStart);
  
  if (validRequests.length >= maxRequests) {
    return false;
  }
  
  // Add current request
  validRequests.push(now);
  rateLimitStore.set(key, validRequests);
  
  return true;
};

/**
 * Clear rate limiting data
 * Removes stored rate limiting information
 * 
 * @param {string} key - Key to clear (optional, clears all if not provided)
 */
export const clearRateLimit = (key = null) => {
  if (key) {
    rateLimitStore.delete(key);
  } else {
    rateLimitStore.clear();
  }
}; 