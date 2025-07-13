/**
 * Recovery Strategies System
 * 
 * Provides automatic recovery mechanisms for different types of errors.
 * Implements retry logic, exponential backoff, and user feedback.
 * 
 * @module recoveryStrategies
 */

import { toast } from 'react-hot-toast';

/**
 * Recovery strategy configurations
 */
export const RecoveryStrategies = {
  // Network recovery with exponential backoff
  NETWORK: {
    maxRetries: 3,
    baseDelay: 1000,
    maxDelay: 10000,
    onRetry: (attempt, maxRetries) => {
      toast.loading(`מנסה להתחבר מחדש... (${attempt}/${maxRetries})`);
    },
    onSuccess: () => {
      toast.success('החיבור שוחזר בהצלחה!');
    },
    onFailure: () => {
      toast.error('לא ניתן להתחבר. אנא בדוק את החיבור שלך.');
    }
  },

  // Authentication recovery
  AUTH: {
    maxRetries: 1,
    baseDelay: 2000,
    onRetry: () => {
      toast.loading('מתחבר מחדש...');
    },
    onSuccess: () => {
      toast.success('התחברת מחדש בהצלחה!');
    },
    onFailure: () => {
      toast.error('בעיית התחברות. אנא התחבר מחדש.');
      // Redirect to login after a delay
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }
  },

  // Firebase recovery
  FIREBASE: {
    maxRetries: 2,
    baseDelay: 2000,
    maxDelay: 8000,
    onRetry: (attempt, maxRetries) => {
      toast.loading(`מנסה להתחבר למסד הנתונים... (${attempt}/${maxRetries})`);
    },
    onSuccess: () => {
      toast.success('החיבור למסד הנתונים שוחזר!');
    },
    onFailure: () => {
      toast.error('בעיה בחיבור למסד הנתונים. אנא נסה שוב מאוחר יותר.');
    }
  },

  // Session recovery
  SESSION: {
    maxRetries: 2,
    baseDelay: 1500,
    onRetry: (attempt, maxRetries) => {
      toast.loading(`מנסה להתחבר לשיעור... (${attempt}/${maxRetries})`);
    },
    onSuccess: () => {
      toast.success('השיעור התחבר בהצלחה!');
    },
    onFailure: () => {
      toast.error('לא ניתן להתחבר לשיעור. אנא נסה שוב.');
    }
  }
};

/**
 * Calculate delay with exponential backoff
 */
const calculateDelay = (attempt, baseDelay, maxDelay) => {
  const delay = Math.min(baseDelay * Math.pow(2, attempt - 1), maxDelay);
  return delay + Math.random() * 1000; // Add jitter
};

/**
 * Recovery hook for automatic error recovery
 * 
 * @param {string} strategyType - Type of recovery strategy to use
 * @returns {Object} Recovery functions
 */
export const useRecovery = (strategyType) => {
  const strategy = RecoveryStrategies[strategyType];

  if (!strategy) {
    throw new Error(`Unknown recovery strategy: ${strategyType}`);
  }

  const attemptRecovery = async (operation, context = {}) => {
    let lastError = null;

    for (let attempt = 1; attempt <= strategy.maxRetries; attempt++) {
      try {
        // Call retry callback
        strategy.onRetry?.(attempt, strategy.maxRetries);

        // Attempt the operation
        const result = await operation();
        
        // Call success callback
        strategy.onSuccess?.();
        
        return result;
      } catch (error) {
        lastError = error;
        
        // Log the attempt
        console.warn(`Recovery attempt ${attempt}/${strategy.maxRetries} failed:`, error);
        
        // If this is the last attempt, call failure callback
        if (attempt === strategy.maxRetries) {
          strategy.onFailure?.();
          throw error;
        }

        // Wait before next attempt
        const delay = calculateDelay(attempt, strategy.baseDelay, strategy.maxDelay);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError;
  };

  const retryWithBackoff = async (operation, context = {}) => {
    return attemptRecovery(operation, context);
  };

  return { 
    attemptRecovery, 
    retryWithBackoff,
    strategy 
  };
};

/**
 * Quick recovery functions for common scenarios
 */
export const quickRecovery = {
  // Network operation recovery
  network: async (operation) => {
    const { attemptRecovery } = useRecovery('NETWORK');
    return attemptRecovery(operation);
  },

  // Authentication recovery
  auth: async (operation) => {
    const { attemptRecovery } = useRecovery('AUTH');
    return attemptRecovery(operation);
  },

  // Firebase operation recovery
  firebase: async (operation) => {
    const { attemptRecovery } = useRecovery('FIREBASE');
    return attemptRecovery(operation);
  },

  // Session recovery
  session: async (operation) => {
    const { attemptRecovery } = useRecovery('SESSION');
    return attemptRecovery(operation);
  }
}; 