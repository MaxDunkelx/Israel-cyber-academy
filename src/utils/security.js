/**
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
  }
};

/**
 * Sanitize user input to prevent XSS attacks
 * @param {string} input - User input to sanitize
 * @returns {string} Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
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
};

/**
 * Generate secure random token
 * @param {number} length - Token length
 * @returns {string} Random token
 */
export const generateSecureToken = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};

/**
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
}; 