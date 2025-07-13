/**
 * Centralized Error Handling System
 * 
 * Provides consistent error handling, logging, and user feedback across the application.
 * Integrates with security logging and toast notifications.
 * 
 * @module errorHandler
 */

import { toast } from 'react-hot-toast';
import { logSecurityEvent } from './security';

/**
 * Custom error class for application-specific errors
 */
export class AppError extends Error {
  constructor(message, code, context = {}) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.context = context;
    this.timestamp = new Date().toISOString();
  }
}

/**
 * Error type constants
 */
export const ErrorTypes = {
  NETWORK: 'NETWORK_ERROR',
  AUTHENTICATION: 'AUTH_ERROR', 
  PERMISSION: 'PERMISSION_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  FIREBASE: 'FIREBASE_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR'
};

/**
 * Error severity levels
 */
export const ErrorSeverity = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

/**
 * Central error handler function
 * 
 * @param {Error|AppError} error - The error to handle
 * @param {Object} context - Additional context about where the error occurred
 * @param {string} context.component - Component name where error occurred
 * @param {string} context.action - Action being performed when error occurred
 * @param {Object} context.data - Additional data related to the error
 * @returns {Object} Error information for debugging
 */
export const handleError = (error, context = {}) => {
  // Determine error type and severity
  const errorInfo = {
    message: error.message,
    code: error.code || ErrorTypes.UNKNOWN,
    context,
    timestamp: new Date().toISOString(),
    stack: error.stack,
    severity: determineSeverity(error, context)
  };

  // Log error for security and debugging
  logSecurityEvent('ERROR_OCCURRED', errorInfo);

  // Show user-friendly message
  const userMessage = getUserFriendlyMessage(error, context);
  
  // Show appropriate toast based on severity
  if (errorInfo.severity === ErrorSeverity.CRITICAL) {
    toast.error(userMessage, { duration: 6000 });
  } else if (errorInfo.severity === ErrorSeverity.HIGH) {
    toast.error(userMessage, { duration: 5000 });
  } else {
    toast.error(userMessage, { duration: 4000 });
  }

  // Log to console in development
  if (import.meta.env.DEV) {
    console.error('🚨 Error handled:', errorInfo);
  }

  return errorInfo;
};

/**
 * Determine error severity based on error type and context
 */
const determineSeverity = (error, context) => {
  const code = error.code || ErrorTypes.UNKNOWN;
  
  // Critical errors
  if (code === ErrorTypes.AUTHENTICATION || 
      code === ErrorTypes.PERMISSION ||
      context.component === 'AuthContext') {
    return ErrorSeverity.CRITICAL;
  }
  
  // High severity errors
  if (code === ErrorTypes.FIREBASE || 
      code === ErrorTypes.NETWORK ||
      context.component === 'InteractiveLesson') {
    return ErrorSeverity.HIGH;
  }
  
  // Medium severity errors
  if (code === ErrorTypes.VALIDATION) {
    return ErrorSeverity.MEDIUM;
  }
  
  // Low severity errors
  return ErrorSeverity.LOW;
};

/**
 * Get user-friendly error message in Hebrew
 */
const getUserFriendlyMessage = (error, context) => {
  const code = error.code || ErrorTypes.UNKNOWN;
  
  const messages = {
    [ErrorTypes.NETWORK]: 'בעיית חיבור לאינטרנט. אנא בדוק את החיבור שלך ונסה שוב.',
    [ErrorTypes.AUTHENTICATION]: 'בעיית התחברות. אנא התחבר מחדש.',
    [ErrorTypes.PERMISSION]: 'אין לך הרשאה לבצע פעולה זו.',
    [ErrorTypes.VALIDATION]: 'הנתונים שהוזנו אינם תקינים. אנא בדוק ונסה שוב.',
    [ErrorTypes.FIREBASE]: 'בעיה בחיבור למסד הנתונים. אנא נסה שוב.',
    [ErrorTypes.UNKNOWN]: 'אירעה שגיאה לא צפויה. אנא נסה שוב או פנה לתמיכה.'
  };

  // Add context-specific messages
  if (context.component === 'InteractiveLesson') {
    return 'בעיה בטעינת השיעור. אנא רענן את הדף ונסה שוב.';
  }
  
  if (context.component === 'SessionHosting') {
    return 'בעיה באירוח השיעור. אנא בדוק את החיבור ונסה שוב.';
  }

  return messages[code] || messages[ErrorTypes.UNKNOWN];
};

/**
 * Create a wrapped function that automatically handles errors
 * 
 * @param {Function} fn - Function to wrap
 * @param {Object} context - Error context
 * @returns {Function} Wrapped function with error handling
 */
export const withErrorHandling = (fn, context = {}) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      handleError(error, context);
      throw error; // Re-throw for component-level handling if needed
    }
  };
};

/**
 * Handle Firebase-specific errors
 */
export const handleFirebaseError = (error, context = {}) => {
  let errorCode = ErrorTypes.FIREBASE;
  
  // Map Firebase error codes to our error types
  if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
    errorCode = ErrorTypes.AUTHENTICATION;
  } else if (error.code === 'permission-denied') {
    errorCode = ErrorTypes.PERMISSION;
  } else if (error.code === 'unavailable' || error.code === 'deadline-exceeded') {
    errorCode = ErrorTypes.NETWORK;
  }
  
  const appError = new AppError(error.message, errorCode, context);
  return handleError(appError, context);
}; 