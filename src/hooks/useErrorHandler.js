/**
 * Error Handler Hook
 * 
 * Provides easy access to error handling functions in components.
 * Integrates with the centralized error handling system.
 * 
 * @returns {Object} Error handling functions
 */

import { useCallback } from 'react';
import { handleError, handleFirebaseError, withErrorHandling, AppError, ErrorTypes } from '../utils/errorHandler';

export const useErrorHandler = () => {
  const handleErrorWithContext = useCallback((error, context = {}) => {
    return handleError(error, context);
  }, []);

  const handleFirebaseErrorWithContext = useCallback((error, context = {}) => {
    return handleFirebaseError(error, context);
  }, []);

  const wrapWithErrorHandling = useCallback((fn, context = {}) => {
    return withErrorHandling(fn, context);
  }, []);

  const createAppError = useCallback((message, code, context = {}) => {
    return new AppError(message, code, context);
  }, []);

  return { 
    handleError: handleErrorWithContext,
    handleFirebaseError: handleFirebaseErrorWithContext,
    wrapWithErrorHandling,
    createAppError,
    ErrorTypes
  };
}; 