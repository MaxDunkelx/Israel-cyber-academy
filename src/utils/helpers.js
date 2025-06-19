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
    console.error('Error formatting date:', error);
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
    console.error('Error formatting number:', error);
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