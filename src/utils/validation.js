/**
 * Validation Utilities - Comprehensive validation functions for forms and data
 * 
 * @module validation
 */

/**
 * Email validation regex pattern
 * @constant
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Password strength requirements
 * @constant
 */
const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true
};

/**
 * Validates email format
 * 
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 * 
 * @example
 * isValidEmail('user@example.com') // true
 * isValidEmail('invalid-email') // false
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  return EMAIL_REGEX.test(email.trim());
};

/**
 * Validates password strength
 * 
 * @param {string} password - Password to validate
 * @param {Object} requirements - Password requirements (optional)
 * @returns {Object} Validation result with isValid and errors
 * 
 * @example
 * validatePassword('MyPass123!') 
 * // { isValid: true, errors: [] }
 */
export const validatePassword = (password, requirements = PASSWORD_REQUIREMENTS) => {
  const errors = [];
  
  if (!password || typeof password !== 'string') {
    errors.push('Password is required');
    return { isValid: false, errors };
  }
  
  // Check minimum length
  if (password.length < requirements.minLength) {
    errors.push(`Password must be at least ${requirements.minLength} characters long`);
  }
  
  // Check for uppercase letters
  if (requirements.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  // Check for lowercase letters
  if (requirements.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  // Check for numbers
  if (requirements.requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  // Check for special characters
  if (requirements.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validates required fields
 * 
 * @param {Object} data - Object containing field values
 * @param {string[]} requiredFields - Array of required field names
 * @returns {Object} Validation result with isValid and errors
 * 
 * @example
 * validateRequired({ name: 'John', email: '' }, ['name', 'email'])
 * // { isValid: false, errors: ['Email is required'] }
 */
export const validateRequired = (data, requiredFields) => {
  const errors = [];
  
  requiredFields.forEach(field => {
    const value = data[field];
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validates string length
 * 
 * @param {string} value - String to validate
 * @param {number} minLength - Minimum length
 * @param {number} maxLength - Maximum length
 * @returns {boolean} True if length is valid
 */
export const validateStringLength = (value, minLength = 0, maxLength = Infinity) => {
  if (!value || typeof value !== 'string') return false;
  const length = value.trim().length;
  return length >= minLength && length <= maxLength;
};

/**
 * Sanitizes HTML input to prevent XSS
 * 
 * @param {string} input - Input string to sanitize
 * @returns {string} Sanitized string
 */
export const sanitizeInput = (input) => {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

/**
 * Validates URL format
 * 
 * @param {string} url - URL to validate
 * @returns {boolean} True if URL is valid
 */
export const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validates phone number format (Israeli format)
 * 
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if phone number is valid
 */
export const isValidPhoneNumber = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Israeli phone number validation (10 digits starting with 05 or 02-09)
  return /^(05|02|03|04|08|09)\d{8}$/.test(digits);
};

/**
 * Validates Hebrew text (contains Hebrew characters)
 * 
 * @param {string} text - Text to validate
 * @returns {boolean} True if text contains Hebrew characters
 */
export const containsHebrew = (text) => {
  if (!text || typeof text !== 'string') return false;
  return /[\u0590-\u05FF]/.test(text);
};

/**
 * Validates lesson ID format
 * 
 * @param {string|number} lessonId - Lesson ID to validate
 * @returns {boolean} True if lesson ID is valid
 */
export const isValidLessonId = (lessonId) => {
  if (!lessonId) return false;
  
  // Convert to number and check if it's a positive integer
  const num = parseInt(lessonId, 10);
  return !isNaN(num) && num > 0 && Number.isInteger(num);
};

/**
 * Validates slide ID format
 * 
 * @param {string} slideId - Slide ID to validate
 * @returns {boolean} True if slide ID is valid
 */
export const isValidSlideId = (slideId) => {
  if (!slideId || typeof slideId !== 'string') return false;
  
  // Slide ID should match pattern: slide-{number}
  return /^slide-\d+$/.test(slideId);
};

/**
 * Comprehensive form validation
 * 
 * @param {Object} formData - Form data object
 * @param {Object} validationRules - Validation rules for each field
 * @returns {Object} Validation result with isValid and fieldErrors
 * 
 * @example
 * const rules = {
 *   email: { required: true, type: 'email' },
 *   password: { required: true, type: 'password' },
 *   name: { required: true, minLength: 2, maxLength: 50 }
 * };
 * 
 * validateForm(formData, rules)
 */
export const validateForm = (formData, validationRules) => {
  const fieldErrors = {};
  let isValid = true;
  
  Object.keys(validationRules).forEach(field => {
    const value = formData[field];
    const rules = validationRules[field];
    const errors = [];
    
    // Required validation
    if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
    }
    
    // Type validation
    if (value && rules.type) {
      switch (rules.type) {
        case 'email':
          if (!isValidEmail(value)) {
            errors.push('Invalid email format');
          }
          break;
        case 'password':
          const passwordValidation = validatePassword(value, rules.passwordRequirements);
          errors.push(...passwordValidation.errors);
          break;
        case 'url':
          if (!isValidUrl(value)) {
            errors.push('Invalid URL format');
          }
          break;
        case 'phone':
          if (!isValidPhoneNumber(value)) {
            errors.push('Invalid phone number format');
          }
          break;
      }
    }
    
    // Length validation
    if (value && typeof value === 'string') {
      if (rules.minLength && value.length < rules.minLength) {
        errors.push(`Minimum length is ${rules.minLength} characters`);
      }
      if (rules.maxLength && value.length > rules.maxLength) {
        errors.push(`Maximum length is ${rules.maxLength} characters`);
      }
    }
    
    // Custom validation
    if (value && rules.custom) {
      const customResult = rules.custom(value, formData);
      if (customResult && !customResult.isValid) {
        errors.push(customResult.message);
      }
    }
    
    if (errors.length > 0) {
      fieldErrors[field] = errors;
      isValid = false;
    }
  });
  
  return { isValid, fieldErrors };
}; 