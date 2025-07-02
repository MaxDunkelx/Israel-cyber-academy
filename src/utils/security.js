/**
 * Security Utilities - Israel Cyber Campus
 * 
 * Provides security logging and validation functions for the platform
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
import { db } from '../firebase/firebase-config.js';

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
  if (!user) {
    return {
      success: false,
      message: 'User not authenticated',
      code: 'AUTH_REQUIRED'
    };
  }

  if (!user.role) {
    return {
      success: false,
      message: 'User role not defined',
      code: 'ROLE_MISSING'
    };
  }

  if (!isTeacher(user)) {
    return {
      success: false,
      message: 'Teacher access required',
      code: 'INSUFFICIENT_PERMISSIONS'
    };
  }

  // Check specific operation permissions
  const permission = PERMISSIONS[operation];
  if (permission && !permission.roles.includes(user.role)) {
    return {
      success: false,
      message: `Operation '${operation}' not allowed for role '${user.role}'`,
      code: 'OPERATION_NOT_ALLOWED'
    };
  }

  return {
    success: true,
    message: 'Access granted',
    code: 'ACCESS_GRANTED'
  };
};

/**
 * Log security events for audit and monitoring
 * Enhanced version with Firebase integration
 * 
 * @param {string} eventType - Type of security event
 * @param {Object} eventData - Event data and metadata
 * @param {Object} metadata - Additional metadata
 */
export const logSecurityEvent = async (eventType, eventData = {}, metadata = {}) => {
  try {
    const securityEvent = {
      type: eventType,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      ...eventData,
      ...metadata
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🔒 Security Event:', securityEvent);
    }

    // Store in Firebase for production
    try {
      await addDoc(collection(db, 'security_logs'), securityEvent);
    } catch (firebaseError) {
      console.warn('Failed to log to Firebase:', firebaseError);
      // Log to console as fallback only
      console.log('🔒 Security Event (Firebase failed):', securityEvent);
    }

    // Send to analytics service if available
    if (window.gtag) {
      window.gtag('event', 'security_event', {
        event_category: 'security',
        event_label: eventType,
        value: 1
      });
    }

  } catch (error) {
    console.error('Error logging security event:', error);
  }
};

/**
 * Sanitize user input to prevent XSS attacks
 * Basic input sanitization for security
 * 
 * @param {string} input - User input to sanitize
 * @returns {string} Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    return input;
  }

  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

/**
 * Validate password strength
 * Comprehensive password validation
 * 
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with score and feedback
 */
export const validatePasswordStrength = (password) => {
  if (!password) {
    return {
      score: 0,
      valid: false,
      feedback: 'Password is required'
    };
  }

  let score = 0;
  const feedback = [];

  // Length check
  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('At least 8 characters');
  }

  // Uppercase check
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('At least one uppercase letter');
  }

  // Lowercase check
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('At least one lowercase letter');
  }

  // Number check
  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push('At least one number');
  }

  // Special character check
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  } else {
    feedback.push('At least one special character');
  }

  return {
    score,
    valid: score >= 4,
    feedback: feedback.length > 0 ? feedback : ['Strong password']
  };
};

/**
 * Check if user has permission for specific roles
 * Role-based permission checking
 * 
 * @param {string} userRole - User's role
 * @param {Array} requiredRoles - Array of required roles
 * @returns {boolean} True if user has permission
 */
export const hasPermission = (userRole, requiredRoles) => {
  if (!userRole || !requiredRoles) {
    return false;
  }

  if (Array.isArray(requiredRoles)) {
    return requiredRoles.includes(userRole);
  }

  return userRole === requiredRoles;
};

/**
 * Validate file upload for security
 * File type and size validation
 * 
 * @param {File} file - File to validate
 * @param {Object} options - Validation options
 * @returns {Object} Validation result
 */
export const validateFileUpload = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf']
  } = options;

  if (!file) {
    return {
      valid: false,
      error: 'No file provided'
    };
  }

  // Check file size
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`
    };
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'File type not allowed'
    };
  }

  // Check file extension
  const fileName = file.name.toLowerCase();
  const hasValidExtension = allowedExtensions.some(ext => 
    fileName.endsWith(ext)
  );

  if (!hasValidExtension) {
    return {
      valid: false,
      error: 'File extension not allowed'
    };
  }

  return {
    valid: true,
    error: null
  };
};

/**
 * Simple encryption for sensitive data
 * Note: This is a basic implementation for demo purposes
 * In production, use proper encryption libraries
 * 
 * @param {string} data - Data to encrypt
 * @param {string} key - Encryption key
 * @returns {string} Encrypted data
 */
export const encryptData = (data, key) => {
  try {
    // Simple XOR encryption (for demo purposes only)
    let encrypted = '';
    for (let i = 0; i < data.length; i++) {
      encrypted += String.fromCharCode(
        data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return btoa(encrypted);
  } catch (error) {
    console.error('Encryption error:', error);
    return data;
  }
};

/**
 * Simple decryption for sensitive data
 * Note: This is a basic implementation for demo purposes
 * In production, use proper decryption libraries
 * 
 * @param {string} encryptedData - Data to decrypt
 * @param {string} key - Decryption key
 * @returns {string} Decrypted data
 */
export const decryptData = (encryptedData, key) => {
  try {
    const decoded = atob(encryptedData);
    let decrypted = '';
    for (let i = 0; i < decoded.length; i++) {
      decrypted += String.fromCharCode(
        decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    return encryptedData;
  }
};



/**
 * Validate CSRF token
 * Basic CSRF token validation
 * 
 * @param {string} token - Token to validate
 * @returns {boolean} True if token is valid
 */
export const validateCSRFToken = (token) => {
  const storedToken = localStorage.getItem('csrf_token');
  return token === storedToken;
};

/**
 * Generate CSRF token
 * Creates a new CSRF token
 * 
 * @returns {string} Generated CSRF token
 */
export const generateCSRFToken = () => {
  const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
  localStorage.setItem('csrf_token', token);
  return token;
};

/**
 * Rate limiting utility
 * Simple rate limiting for API calls
 * 
 * @param {string} key - Rate limit key
 * @param {number} maxRequests - Maximum requests allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {boolean} True if request is allowed
 */
export const checkRateLimit = (key, maxRequests = 10, windowMs = 60000) => {
  const now = Date.now();
  const requests = JSON.parse(localStorage.getItem(`rate_limit_${key}`) || '[]');
  
  // Remove old requests outside the window
  const validRequests = requests.filter(time => now - time < windowMs);
  
  if (validRequests.length >= maxRequests) {
    return false;
  }
  
  // Add current request
  validRequests.push(now);
  localStorage.setItem(`rate_limit_${key}`, JSON.stringify(validRequests));
  
  return true;
};

/**
 * Clear rate limit for a specific key
 * Resets rate limiting for the given key
 * 
 * @param {string} key - Rate limit key to clear
 */
export const clearRateLimit = (key) => {
  localStorage.removeItem(`rate_limit_${key}`);
};

/**
 * Validate email format
 * Basic email validation
 * 
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format
 * Basic phone number validation
 * 
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if phone number is valid
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

/**
 * Generate secure random string
 * Creates a cryptographically secure random string
 * 
 * @param {number} length - Length of the string
 * @returns {string} Random string
 */
export const generateSecureRandomString = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(array[i] % chars.length);
  }
  
  return result;
};

/**
 * Hash sensitive data
 * Simple hash function for sensitive data
 * 
 * @param {string} data - Data to hash
 * @returns {string} Hashed data
 */
export const hashData = async (data) => {
  try {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (error) {
    console.error('Hashing error:', error);
    return data;
  }
}; 