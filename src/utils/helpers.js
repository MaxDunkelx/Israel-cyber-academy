/**
 * Helper Utilities - Common utility functions for data manipulation, formatting, and operations
 * 
 * @module helpers
 */

/**
 * Formats a date to a readable string
 * 
 * @param {Date|string} date - Date to format
 * @param {string} locale - Locale for formatting (default: 'he-IL')
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 * 
 * @example
 * formatDate(new Date()) // "1 בינואר 2024"
 * formatDate(new Date(), 'en-US') // "January 1, 2024"
 */
export const formatDate = (date, locale = 'he-IL', options = {}) => {
  if (!date) return '';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };
  
  try {
    const dateObj = new Date(date);
    return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj);
  } catch (error) {
    return '';
  }
};

/**
 * Formats a number with thousands separators
 * 
 * @param {number} number - Number to format
 * @param {string} locale - Locale for formatting (default: 'he-IL')
 * @returns {string} Formatted number string
 * 
 * @example
 * formatNumber(1234567) // "1,234,567"
 */
export const formatNumber = (number, locale = 'he-IL') => {
  if (number === null || number === undefined) return '0';
  
  try {
    return new Intl.NumberFormat(locale).format(number);
  } catch (error) {
    return number.toString();
  }
};

/**
 * Formats duration in seconds to a readable string
 * 
 * @param {number} seconds - Duration in seconds
 * @param {boolean} showSeconds - Whether to show seconds (default: true)
 * @returns {string} Formatted duration string
 * 
 * @example
 * formatDuration(3661) // "1 שעה 1 דקה 1 שנייה"
 * formatDuration(3661, false) // "1 שעה 1 דקה"
 */
export const formatDuration = (seconds, showSeconds = true) => {
  if (!seconds || seconds < 0) return '0 דקות';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  const parts = [];
  
  if (hours > 0) {
    parts.push(`${hours} שעה${hours > 1 ? 'ות' : ''}`);
  }
  
  if (minutes > 0) {
    parts.push(`${minutes} דקה${minutes > 1 ? 'ות' : ''}`);
  }
  
  if (showSeconds && remainingSeconds > 0) {
    parts.push(`${remainingSeconds} שנייה${remainingSeconds > 1 ? 'ות' : ''}`);
  }
  
  return parts.length > 0 ? parts.join(' ') : '0 דקות';
};

/**
 * Capitalizes the first letter of a string
 * 
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 * 
 * @example
 * capitalize('hello world') // "Hello world"
 */
export const capitalize = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Truncates a string to a specified length
 * 
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} Truncated string
 * 
 * @example
 * truncate('This is a very long string', 20) // "This is a very long..."
 */
export const truncate = (str, maxLength, suffix = '...') => {
  if (!str || typeof str !== 'string') return '';
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Generates a random string of specified length
 * 
 * @param {number} length - Length of the string
 * @param {string} charset - Character set to use (default: alphanumeric)
 * @returns {string} Random string
 * 
 * @example
 * generateRandomString(8) // "aB3k9mN2"
 */
export const generateRandomString = (length = 8, charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
};

/**
 * Debounces a function call
 * 
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 * 
 * @example
 * const debouncedSearch = debounce(searchFunction, 300);
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

/**
 * Throttles a function call
 * 
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 * 
 * @example
 * const throttledScroll = throttle(scrollHandler, 100);
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Deep clones an object
 * 
 * @param {*} obj - Object to clone
 * @returns {*} Cloned object
 * 
 * @example
 * const cloned = deepClone(originalObject);
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  return obj;
};

/**
 * Merges multiple objects deeply
 * 
 * @param {...Object} objects - Objects to merge
 * @returns {Object} Merged object
 * 
 * @example
 * const merged = deepMerge(obj1, obj2, obj3);
 */
export const deepMerge = (...objects) => {
  return objects.reduce((result, obj) => {
    if (!obj) return result;
    
    Object.keys(obj).forEach(key => {
      if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        result[key] = deepMerge(result[key] || {}, obj[key]);
      } else {
        result[key] = obj[key];
      }
    });
    
    return result;
  }, {});
};

/**
 * Checks if two objects are equal (deep comparison)
 * 
 * @param {*} obj1 - First object
 * @param {*} obj2 - Second object
 * @returns {boolean} True if objects are equal
 * 
 * @example
 * isEqual(obj1, obj2) // true/false
 */
export const isEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true;
  if (obj1 == null || obj2 == null) return false;
  if (typeof obj1 !== typeof obj2) return false;
  
  if (typeof obj1 !== 'object') return obj1 === obj2;
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!isEqual(obj1[key], obj2[key])) return false;
  }
  
  return true;
};

/**
 * Removes falsy values from an object
 * 
 * @param {Object} obj - Object to clean
 * @returns {Object} Cleaned object
 * 
 * @example
 * const cleaned = removeFalsy({ a: 1, b: '', c: null, d: 0 });
 * // { a: 1, d: 0 }
 */
export const removeFalsy = (obj) => {
  const cleaned = {};
  Object.keys(obj).forEach(key => {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
      cleaned[key] = obj[key];
    }
  });
  return cleaned;
};

/**
 * Groups an array by a specified key
 * 
 * @param {Array} array - Array to group
 * @param {string|Function} key - Key or function to group by
 * @returns {Object} Grouped object
 * 
 * @example
 * const grouped = groupBy(users, 'role');
 * // { student: [...], teacher: [...] }
 */
export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const groupKey = typeof key === 'function' ? key(item) : item[key];
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {});
};

/**
 * Sorts an array by multiple criteria
 * 
 * @param {Array} array - Array to sort
 * @param {Array} criteria - Array of sorting criteria
 * @returns {Array} Sorted array
 * 
 * @example
 * const sorted = sortByMultiple(users, [
 *   { key: 'role', order: 'asc' },
 *   { key: 'name', order: 'desc' }
 * ]);
 */
export const sortByMultiple = (array, criteria) => {
  return [...array].sort((a, b) => {
    for (const criterion of criteria) {
      const { key, order = 'asc' } = criterion;
      const aVal = a[key];
      const bVal = b[key];
      
      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
};

/**
 * Calculates percentage
 * 
 * @param {number} value - Current value
 * @param {number} total - Total value
 * @param {number} decimals - Number of decimal places (default: 0)
 * @returns {number} Percentage
 * 
 * @example
 * calculatePercentage(75, 100) // 75
 * calculatePercentage(75, 100, 2) // 75.00
 */
export const calculatePercentage = (value, total, decimals = 0) => {
  if (total === 0) return 0;
  const percentage = (value / total) * 100;
  return Number(percentage.toFixed(decimals));
};

/**
 * Formats file size in bytes to human readable format
 * 
 * @param {number} bytes - Size in bytes
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted file size
 * 
 * @example
 * formatFileSize(1024) // "1 KB"
 * formatFileSize(1048576) // "1 MB"
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Generates a unique ID
 * 
 * @param {string} prefix - Prefix for the ID (default: 'id')
 * @returns {string} Unique ID
 * 
 * @example
 * generateId() // "id_1234567890"
 * generateId('lesson') // "lesson_1234567890"
 */
export const generateId = (prefix = 'id') => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}_${timestamp}_${random}`;
};

/**
 * Checks if a value is empty (null, undefined, empty string, empty array, empty object)
 * 
 * @param {*} value - Value to check
 * @returns {boolean} True if value is empty
 * 
 * @example
 * isEmpty('') // true
 * isEmpty([]) // true
 * isEmpty({}) // true
 * isEmpty(null) // true
 * isEmpty('hello') // false
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Helper Functions - Israel Cyber Campus
 * 
 * Utility functions for common operations across the platform
 */

/**
 * Format time display for various components
 * 
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Format time studied for display
 * 
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
export const formatTimeStudied = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours} שעות ${minutes} דקות`;
  }
  return `${minutes} דקות`;
};

/**
 * Session Monitoring and Analytics
 * Comprehensive logging system for user behavior tracking
 */
export class SessionMonitor {
  constructor() {
    this.sessionStart = Date.now();
    this.events = [];
    this.userId = null;
    this.lessonId = null;
  }

  /**
   * Initialize session monitoring
   * 
   * @param {string} userId - User ID
   * @param {number} lessonId - Current lesson ID
   */
  init(userId, lessonId = null) {
    this.userId = userId;
    this.lessonId = lessonId;
    this.sessionStart = Date.now();
    this.events = [];
  }

  /**
   * Generate unique session ID
   * 
   * @returns {string} Session ID
   */
  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Log user event
   * 
   * @param {string} eventType - Type of event
   * @param {Object} data - Event data
   */
  logEvent(eventType, data = {}) {
    const event = {
      type: eventType,
      timestamp: new Date().toISOString(),
      sessionTime: Date.now() - this.sessionStart,
      userId: this.userId,
      lessonId: this.lessonId,
      data
    };

    this.events.push(event);
    
    // Console logging with emojis for easy identification
    const emojiMap = {
      'slide_navigation': '🔄',
      'slide_engagement': '👁️',
      'exercise_completion': '✅',
      'lesson_completion': '🎉',
      'error': '❌',
      'progress_save': '💾',
      'user_action': '👤'
    };

    const emoji = emojiMap[eventType] || '📝';
    console.log(`${emoji} [Session] ${eventType}:`, event);
  }

  /**
   * Log slide navigation
   * 
   * @param {number} fromSlide - Previous slide
   * @param {number} toSlide - New slide
   * @param {string} direction - Navigation direction
   */
  logSlideNavigation(fromSlide, toSlide, direction) {
    this.logEvent('slide_navigation', {
      fromSlide: fromSlide + 1, // Convert to 1-based
      toSlide: toSlide + 1,
      direction,
      timeSpent: Date.now() - this.sessionStart
    });
  }

  /**
   * Log slide engagement
   * 
   * @param {string} slideId - Slide ID
   * @param {string} slideType - Type of slide
   * @param {number} timeSpent - Time spent on slide
   */
  logSlideEngagement(slideId, slideType, timeSpent) {
    this.logEvent('slide_engagement', {
      slideId,
      slideType,
      timeSpent,
      engagementLevel: this.calculateEngagementLevel(timeSpent)
    });
  }

  /**
   * Calculate engagement level based on time spent
   * 
   * @param {number} timeSpent - Time spent in seconds
   * @returns {string} Engagement level
   */
  calculateEngagementLevel(timeSpent) {
    if (timeSpent < 30) return 'low';
    if (timeSpent < 120) return 'medium';
    return 'high';
  }

  /**
   * Log exercise completion
   * 
   * @param {string} exerciseId - Exercise ID
   * @param {boolean} isCorrect - Whether answer was correct
   * @param {number} score - Exercise score
   */
  logExerciseCompletion(exerciseId, isCorrect, score) {
    this.logEvent('exercise_completion', {
      exerciseId,
      isCorrect,
      score,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log lesson completion
   * 
   * @param {number} lessonId - Lesson ID
   * @param {number} totalScore - Total lesson score
   * @param {number} timeSpent - Total time spent
   */
  logLessonCompletion(lessonId, totalScore, timeSpent) {
    this.logEvent('lesson_completion', {
      lessonId,
      totalScore,
      timeSpent,
      completionRate: this.calculateCompletionRate(),
      achievements: this.getUnlockedAchievements()
    });
  }

  /**
   * Calculate completion rate for current session
   * 
   * @returns {number} Completion rate percentage
   */
  calculateCompletionRate() {
    const completedEvents = this.events.filter(e => e.type === 'exercise_completion' && e.data.isCorrect);
    const totalEvents = this.events.filter(e => e.type === 'exercise_completion');
    return totalEvents.length > 0 ? Math.round((completedEvents.length / totalEvents.length) * 100) : 0;
  }

  /**
   * Get unlocked achievements for current session
   * 
   * @returns {Array} Array of achievement IDs
   */
  getUnlockedAchievements() {
    // This would be populated from the auth context
    return [];
  }

  /**
   * Generate session summary
   * 
   * @returns {Object} Session summary
   */
  generateSessionSummary() {
    const sessionDuration = Date.now() - this.sessionStart;
    const slideEvents = this.events.filter(e => e.type === 'slide_navigation');
    const engagementEvents = this.events.filter(e => e.type === 'slide_engagement');
    const exerciseEvents = this.events.filter(e => e.type === 'exercise_completion');

    const summary = {
      sessionId: this.generateSessionId(),
      userId: this.userId,
      lessonId: this.lessonId,
      duration: sessionDuration,
      totalEvents: this.events.length,
      slideNavigations: slideEvents.length,
      slideEngagements: engagementEvents.length,
      exercisesCompleted: exerciseEvents.length,
      completionRate: this.calculateCompletionRate(),
      averageEngagementLevel: this.calculateAverageEngagementLevel(),
      events: this.events
    };

    return summary;
  }

  /**
   * Calculate average engagement level
   * 
   * @returns {string} Average engagement level
   */
  calculateAverageEngagementLevel() {
    const engagementEvents = this.events.filter(e => e.type === 'slide_engagement');
    if (engagementEvents.length === 0) return 'unknown';

    const totalTime = engagementEvents.reduce((sum, event) => sum + (event.data.timeSpent || 0), 0);
    const averageTime = totalTime / engagementEvents.length;
    
    return this.calculateEngagementLevel(averageTime);
  }

  /**
   * Export session data for analytics
   * 
   * @returns {Object} Session data for external analytics
   */
  exportSessionData() {
    const summary = this.generateSessionSummary();
    
    return {
      session: summary,
      analytics: {
        userBehavior: this.analyzeUserBehavior(),
        performance: this.analyzePerformance(),
        recommendations: this.generateRecommendations()
      }
    };
  }

  /**
   * Analyze user behavior patterns
   * 
   * @returns {Object} Behavior analysis
   */
  analyzeUserBehavior() {
    const slideEvents = this.events.filter(e => e.type === 'slide_navigation');
    const engagementEvents = this.events.filter(e => e.type === 'slide_engagement');
    
    return {
      navigationPattern: this.analyzeNavigationPattern(slideEvents),
      engagementPattern: this.analyzeEngagementPattern(engagementEvents),
      learningStyle: this.determineLearningStyle()
    };
  }

  /**
   * Analyze navigation pattern
   * 
   * @param {Array} slideEvents - Slide navigation events
   * @returns {Object} Navigation pattern analysis
   */
  analyzeNavigationPattern(slideEvents) {
    const forwardMoves = slideEvents.filter(e => e.data.direction === 'forward').length;
    const backwardMoves = slideEvents.filter(e => e.data.direction === 'backward').length;
    
    return {
      forwardMoves,
      backwardMoves,
      pattern: forwardMoves > backwardMoves ? 'progressive' : 'reviewing',
      efficiency: this.calculateNavigationEfficiency(slideEvents)
    };
  }

  /**
   * Calculate navigation efficiency
   * 
   * @param {Array} slideEvents - Slide navigation events
   * @returns {number} Efficiency score (0-100)
   */
  calculateNavigationEfficiency(slideEvents) {
    if (slideEvents.length === 0) return 100;
    
    const forwardMoves = slideEvents.filter(e => e.data.direction === 'forward').length;
    const totalMoves = slideEvents.length;
    
    return Math.round((forwardMoves / totalMoves) * 100);
  }

  /**
   * Analyze engagement pattern
   * 
   * @param {Array} engagementEvents - Engagement events
   * @returns {Object} Engagement pattern analysis
   */
  analyzeEngagementPattern(engagementEvents) {
    const engagementLevels = engagementEvents.map(e => e.data.engagementLevel);
    const highEngagement = engagementLevels.filter(level => level === 'high').length;
    const mediumEngagement = engagementLevels.filter(level => level === 'medium').length;
    const lowEngagement = engagementLevels.filter(level => level === 'low').length;
    
    return {
      highEngagement,
      mediumEngagement,
      lowEngagement,
      averageEngagement: this.calculateAverageEngagementLevel(),
      consistency: this.calculateEngagementConsistency(engagementLevels)
    };
  }

  /**
   * Calculate engagement consistency
   * 
   * @param {Array} engagementLevels - Array of engagement levels
   * @returns {string} Consistency level
   */
  calculateEngagementConsistency(engagementLevels) {
    if (engagementLevels.length === 0) return 'unknown';
    
    const uniqueLevels = new Set(engagementLevels);
    if (uniqueLevels.size === 1) return 'very_consistent';
    if (uniqueLevels.size === 2) return 'consistent';
    return 'inconsistent';
  }

  /**
   * Determine learning style based on behavior
   * 
   * @returns {string} Learning style
   */
  determineLearningStyle() {
    const slideEvents = this.events.filter(e => e.type === 'slide_navigation');
    const engagementEvents = this.events.filter(e => e.type === 'slide_engagement');
    
    const averageTimePerSlide = engagementEvents.length > 0 
      ? engagementEvents.reduce((sum, e) => sum + (e.data.timeSpent || 0), 0) / engagementEvents.length
      : 0;
    
    const backwardMoves = slideEvents.filter(e => e.data.direction === 'backward').length;
    
    if (averageTimePerSlide > 180 && backwardMoves > 2) return 'thorough_reviewer';
    if (averageTimePerSlide < 60) return 'quick_learner';
    if (backwardMoves > 5) return 'repetitive_learner';
    return 'balanced_learner';
  }

  /**
   * Analyze performance metrics
   * 
   * @returns {Object} Performance analysis
   */
  analyzePerformance() {
    const exerciseEvents = this.events.filter(e => e.type === 'exercise_completion');
    const correctAnswers = exerciseEvents.filter(e => e.data.isCorrect).length;
    const totalAnswers = exerciseEvents.length;
    
    return {
      accuracy: totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0,
      speed: this.calculateAverageResponseTime(),
      consistency: this.calculatePerformanceConsistency(),
      improvement: this.calculateImprovementTrend()
    };
  }

  /**
   * Calculate average response time
   * 
   * @returns {number} Average response time in seconds
   */
  calculateAverageResponseTime() {
    const exerciseEvents = this.events.filter(e => e.type === 'exercise_completion');
    if (exerciseEvents.length === 0) return 0;
    
    // This would need to be enhanced with actual response time tracking
    return 30; // Placeholder
  }

  /**
   * Calculate performance consistency
   * 
   * @returns {string} Consistency level
   */
  calculatePerformanceConsistency() {
    const exerciseEvents = this.events.filter(e => e.type === 'exercise_completion');
    if (exerciseEvents.length < 3) return 'insufficient_data';
    
    const scores = exerciseEvents.map(e => e.data.score || 0);
    const variance = this.calculateVariance(scores);
    
    if (variance < 10) return 'very_consistent';
    if (variance < 25) return 'consistent';
    return 'inconsistent';
  }

  /**
   * Calculate variance of scores
   * 
   * @param {Array} scores - Array of scores
   * @returns {number} Variance
   */
  calculateVariance(scores) {
    const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const squaredDifferences = scores.map(score => Math.pow(score - mean, 2));
    return squaredDifferences.reduce((sum, diff) => sum + diff, 0) / scores.length;
  }

  /**
   * Calculate improvement trend
   * 
   * @returns {string} Improvement trend
   */
  calculateImprovementTrend() {
    const exerciseEvents = this.events.filter(e => e.type === 'exercise_completion');
    if (exerciseEvents.length < 3) return 'insufficient_data';
    
    const scores = exerciseEvents.map(e => e.data.score || 0);
    const firstHalf = scores.slice(0, Math.floor(scores.length / 2));
    const secondHalf = scores.slice(Math.floor(scores.length / 2));
    
    const firstHalfAvg = firstHalf.reduce((sum, score) => sum + score, 0) / firstHalf.length;
    const secondHalfAvg = secondHalf.reduce((sum, score) => sum + score, 0) / secondHalf.length;
    
    if (secondHalfAvg > firstHalfAvg + 10) return 'improving';
    if (secondHalfAvg < firstHalfAvg - 10) return 'declining';
    return 'stable';
  }

  /**
   * Generate recommendations based on analysis
   * 
   * @returns {Array} Array of recommendations
   */
  generateRecommendations() {
    const recommendations = [];
    const behavior = this.analyzeUserBehavior();
    const performance = this.analyzePerformance();
    
    if (behavior.navigationPattern.efficiency < 70) {
      recommendations.push('Consider reducing backward navigation to improve learning efficiency');
    }
    
    if (behavior.engagementPattern.lowEngagement > behavior.engagementPattern.highEngagement) {
      recommendations.push('Try spending more time on each slide to improve understanding');
    }
    
    if (performance.accuracy < 80) {
      recommendations.push('Review previous lessons to strengthen foundational knowledge');
    }
    
    if (behavior.learningStyle === 'quick_learner' && performance.accuracy < 90) {
      recommendations.push('Slow down and review content more thoroughly');
    }
    
    return recommendations;
  }
}

// Create global session monitor instance
export const sessionMonitor = new SessionMonitor();

/**
 * Initialize session monitoring for a lesson
 * 
 * @param {string} userId - User ID
 * @param {number} lessonId - Lesson ID
 */
export const initLessonSession = (userId, lessonId) => {
  sessionMonitor.init(userId, lessonId);
  };

/**
 * Log slide navigation event
 * 
 * @param {number} fromSlide - Previous slide
 * @param {number} toSlide - New slide
 * @param {string} direction - Navigation direction
 */
export const logSlideNavigation = (fromSlide, toSlide, direction) => {
  if (!sessionMonitor.userId || !sessionMonitor.lessonId) {
    return;
  }
  sessionMonitor.logSlideNavigation(fromSlide, toSlide, direction);
};

/**
 * Log slide engagement event
 * 
 * @param {string} slideId - Slide ID
 * @param {string} slideType - Type of slide
 * @param {number} timeSpent - Time spent on slide
 */
export const logSlideEngagement = (slideId, slideType, timeSpent) => {
  if (!sessionMonitor.userId || !sessionMonitor.lessonId) {
    return;
  }
  sessionMonitor.logSlideEngagement(slideId, slideType, timeSpent);
};

/**
 * Log exercise completion event
 * 
 * @param {string} exerciseId - Exercise ID
 * @param {boolean} isCorrect - Whether answer was correct
 * @param {number} score - Exercise score
 */
export const logExerciseCompletion = (exerciseId, isCorrect, score) => {
  if (!sessionMonitor.userId || !sessionMonitor.lessonId) {
    return;
  }
  sessionMonitor.logExerciseCompletion(exerciseId, isCorrect, score);
};

/**
 * Log lesson completion event
 * 
 * @param {number} lessonId - Lesson ID
 * @param {number} totalScore - Total lesson score
 * @param {number} timeSpent - Total time spent
 */
export const logLessonCompletion = (lessonId, totalScore, timeSpent) => {
  if (!sessionMonitor.userId || !sessionMonitor.lessonId) {
    return;
  }
  sessionMonitor.logLessonCompletion(lessonId, totalScore, timeSpent);
};

/**
 * Export session data for analytics
 * 
 * @returns {Object} Session data
 */
export const exportSessionData = () => {
  return sessionMonitor.exportSessionData();
};

/**
 * Format timestamp for display in Hebrew
 * @param {Date|string} timestamp - The timestamp to format
 * @returns {string} Formatted timestamp string
 */
export const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'לא ידוע';
  
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'עכשיו';
  if (diffInMinutes < 60) return `לפני ${diffInMinutes} דקות`;
  if (diffInMinutes < 1440) return `לפני ${Math.floor(diffInMinutes / 60)} שעות`;
  return `לפני ${Math.floor(diffInMinutes / 1440)} ימים`;
}; 