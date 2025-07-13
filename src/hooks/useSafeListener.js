/**
 * Safe Listener Hook
 * 
 * Provides a safe way to manage Firebase listeners and other subscriptions.
 * Automatically cleans up previous listeners when dependencies change.
 * 
 * @param {Function} setupFn - Function that returns an unsubscribe function
 * @param {Array} dependencies - Dependencies array for the effect
 */

import { useEffect, useRef } from 'react';

export const useSafeListener = (setupFn, dependencies = []) => {
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    // Cleanup previous listener
    if (unsubscribeRef.current) {
      try {
        unsubscribeRef.current();
      } catch (error) {
        console.warn('Error cleaning up previous listener:', error);
      }
      unsubscribeRef.current = null;
    }

    // Setup new listener
    try {
      const unsubscribe = setupFn();
      if (typeof unsubscribe === 'function') {
        unsubscribeRef.current = unsubscribe;
      }
    } catch (error) {
      console.error('Listener setup error:', error);
    }

    // Cleanup on unmount or dependency change
    return () => {
      if (unsubscribeRef.current) {
        try {
          unsubscribeRef.current();
        } catch (error) {
          console.warn('Error cleaning up listener:', error);
        }
        unsubscribeRef.current = null;
      }
    };
  }, dependencies);
}; 