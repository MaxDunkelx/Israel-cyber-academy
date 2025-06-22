/**
<<<<<<< HEAD
 * Security Utility - Israel Cyber Academy
 * 
 * Provides security logging and validation functions for the application.
 * Handles security event logging, input validation, and access control.
 * 
 * Features:
 * - Security event logging
 * - Input sanitization
 * - Access control validation
 * - Rate limiting utilities
 * - Security audit trail
 */

/**
 * Log security events for audit and monitoring
 * @param {string} eventType - Type of security event
 * @param {Object} eventData - Event data and metadata
 */
export const logSecurityEvent = (eventType, eventData = {}) => {
  try {
    const securityEvent = {
      type: eventType,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      ...eventData
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🔒 Security Event:', securityEvent);
    }

    // In production, this would be sent to a security monitoring service
    // For now, we'll store in localStorage for demo purposes
    const existingLogs = JSON.parse(localStorage.getItem('security_logs') || '[]');
    existingLogs.push(securityEvent);
    
    // Keep only last 1000 events
    if (existingLogs.length > 1000) {
      existingLogs.splice(0, existingLogs.length - 1000);
    }
    
    localStorage.setItem('security_logs', JSON.stringify(existingLogs));

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
=======
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
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
  }
};

/**
 * Sanitize user input to prevent XSS attacks
<<<<<<< HEAD
=======
 * Removes potentially dangerous HTML and script tags
 * 
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
 * @param {string} input - User input to sanitize
 * @returns {string} Sanitized input
 */
export const sanitizeInput = (input) => {
<<<<<<< HEAD
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
=======
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
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
};

/**
 * Validate email format
<<<<<<< HEAD
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export const validateEmail = (email) => {
=======
 * Checks if email follows proper format
 * 
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
<<<<<<< HEAD
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with score and feedback
 */
export const validatePasswordStrength = (password) => {
  const result = {
    score: 0,
    feedback: [],
    isValid: false
  };

  if (!password) {
    result.feedback.push('סיסמה נדרשת');
    return result;
  }

  // Length check
  if (password.length >= 8) {
    result.score += 1;
  } else {
    result.feedback.push('סיסמה חייבת להכיל לפחות 8 תווים');
  }

  // Uppercase check
  if (/[A-Z]/.test(password)) {
    result.score += 1;
  } else {
    result.feedback.push('סיסמה חייבת להכיל אות גדולה');
  }

  // Lowercase check
  if (/[a-z]/.test(password)) {
    result.score += 1;
  } else {
    result.feedback.push('סיסמה חייבת להכיל אות קטנה');
  }

  // Number check
  if (/\d/.test(password)) {
    result.score += 1;
  } else {
    result.feedback.push('סיסמה חייבת להכיל מספר');
  }

  // Special character check
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    result.score += 1;
  } else {
    result.feedback.push('סיסמה חייבת להכיל תו מיוחד');
  }

  result.isValid = result.score >= 4;
  return result;
};

/**
 * Check if user has required permissions
 * @param {string} userRole - User's role
 * @param {Array} requiredRoles - Required roles for access
 * @returns {boolean} True if user has access
 */
export const hasPermission = (userRole, requiredRoles) => {
  if (!userRole || !requiredRoles) return false;
  
  if (Array.isArray(requiredRoles)) {
    return requiredRoles.includes(userRole);
  }
  
  return userRole === requiredRoles;
};

/**
 * Rate limiting utility
 * @param {string} key - Rate limit key
 * @param {number} maxAttempts - Maximum attempts allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {boolean} True if request is allowed
 */
export const checkRateLimit = (key, maxAttempts = 5, windowMs = 60000) => {
  try {
    const now = Date.now();
    const rateLimitKey = `rate_limit_${key}`;
    const attempts = JSON.parse(localStorage.getItem(rateLimitKey) || '[]');
    
    // Remove old attempts outside the time window
    const validAttempts = attempts.filter(timestamp => now - timestamp < windowMs);
    
    if (validAttempts.length >= maxAttempts) {
      return false;
    }
    
    // Add current attempt
    validAttempts.push(now);
    localStorage.setItem(rateLimitKey, JSON.stringify(validAttempts));
    
    return true;
  } catch (error) {
    console.error('Rate limit check error:', error);
    return true; // Allow request if rate limiting fails
  }
=======
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
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
};

/**
 * Generate secure random token
<<<<<<< HEAD
 * @param {number} length - Token length
 * @returns {string} Random token
=======
 * Creates cryptographically secure random string
 * 
 * @param {number} length - Length of token to generate
 * @returns {string} Secure random token
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
 */
export const generateSecureToken = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
<<<<<<< HEAD
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
=======
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
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
  }
  
  return result;
};

/**
<<<<<<< HEAD
 * Validate file upload
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

  const result = {
    isValid: true,
    errors: []
  };

  // Check file size
  if (file.size > maxSize) {
    result.isValid = false;
    result.errors.push(`קובץ גדול מדי. גודל מקסימלי: ${Math.round(maxSize / 1024 / 1024)}MB`);
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    result.isValid = false;
    result.errors.push('סוג קובץ לא נתמך');
  }

  // Check file extension
  const fileName = file.name.toLowerCase();
  const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
  if (!hasValidExtension) {
    result.isValid = false;
    result.errors.push('סיומת קובץ לא נתמכת');
  }

  return result;
};

/**
 * Encrypt sensitive data (basic implementation)
 * @param {string} data - Data to encrypt
 * @param {string} key - Encryption key
 * @returns {string} Encrypted data
 */
export const encryptData = (data, key) => {
  try {
    // This is a basic implementation - in production, use proper encryption
    const encoded = btoa(encodeURIComponent(data));
    return encoded;
  } catch (error) {
    console.error('Encryption error:', error);
    return data;
  }
};

/**
 * Decrypt sensitive data (basic implementation)
 * @param {string} encryptedData - Encrypted data
 * @param {string} key - Decryption key
 * @returns {string} Decrypted data
 */
export const decryptData = (encryptedData, key) => {
  try {
    // This is a basic implementation - in production, use proper decryption
    const decoded = decodeURIComponent(atob(encryptedData));
    return decoded;
  } catch (error) {
    console.error('Decryption error:', error);
    return encryptedData;
  }
};

/**
 * Get security logs (for admin purposes)
 * @returns {Array} Array of security events
 */
export const getSecurityLogs = () => {
  try {
    return JSON.parse(localStorage.getItem('security_logs') || '[]');
  } catch (error) {
    console.error('Error getting security logs:', error);
    return [];
  }
};

/**
 * Clear security logs
 */
export const clearSecurityLogs = () => {
  try {
    localStorage.removeItem('security_logs');
    console.log('Security logs cleared');
  } catch (error) {
    console.error('Error clearing security logs:', error);
  }
};

/**
 * Validate CSRF token
 * @param {string} token - Token to validate
 * @returns {boolean} True if valid
 */
export const validateCSRFToken = (token) => {
  try {
    const storedToken = localStorage.getItem('csrf_token');
    return token === storedToken;
  } catch (error) {
    console.error('CSRF validation error:', error);
    return false;
  }
};

/**
 * Generate CSRF token
 * @returns {string} CSRF token
 */
export const generateCSRFToken = () => {
  const token = generateSecureToken(32);
  localStorage.setItem('csrf_token', token);
  return token;
};

export default {
  logSecurityEvent,
  sanitizeInput,
  validateEmail,
  validatePasswordStrength,
  hasPermission,
  checkRateLimit,
  generateSecureToken,
  validateFileUpload,
  encryptData,
  decryptData,
  getSecurityLogs,
  clearSecurityLogs,
  validateCSRFToken,
  generateCSRFToken
=======
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
>>>>>>> a251aaca0ea6b5a7c1e7ab50859cc0fcdef93781
}; 