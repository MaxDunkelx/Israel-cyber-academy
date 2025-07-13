/**
 * Centralized Cleanup Hook
 * 
 * Provides a centralized way to manage cleanup functions and prevent memory leaks.
 * Automatically cleans up all registered functions on component unmount.
 * 
 * @returns {Object} Cleanup management functions
 */

import { useEffect, useRef } from 'react';

export const useCleanup = () => {
  const cleanupRef = useRef([]);

  const addCleanup = (cleanupFn) => {
    if (typeof cleanupFn === 'function') {
      cleanupRef.current.push(cleanupFn);
    }
  };

  const cleanup = () => {
    cleanupRef.current.forEach(fn => {
      try {
        if (typeof fn === 'function') {
          fn();
        }
      } catch (error) {
        console.warn('Cleanup error:', error);
      }
    });
    cleanupRef.current = [];
  };

  useEffect(() => {
    return cleanup;
  }, []);

  return { addCleanup, cleanup };
}; 