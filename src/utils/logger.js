/**
 * Centralized Logger for Student UI
 * Provides consistent logging across all student components
 */

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
};

class StudentLogger {
  constructor() {
    this.logLevel = process.env.NODE_ENV === 'development' ? LOG_LEVELS.DEBUG : LOG_LEVELS.INFO;
    this.prefix = '[Student UI]';
  }

  debug(message, data = null) {
    if (this.logLevel <= LOG_LEVELS.DEBUG) {
      console.log(`${this.prefix} [DEBUG] ${message}`, data || '');
    }
  }

  info(message, data = null) {
    if (this.logLevel <= LOG_LEVELS.INFO) {
      console.info(`${this.prefix} [INFO] ${message}`, data || '');
    }
  }

  warn(message, data = null) {
    if (this.logLevel <= LOG_LEVELS.WARN) {
      console.warn(`${this.prefix} [WARN] ${message}`, data || '');
    }
  }

  error(message, error = null) {
    if (this.logLevel <= LOG_LEVELS.ERROR) {
      console.error(`${this.prefix} [ERROR] ${message}`, error || '');
    }
  }

  // Session-specific logging
  session(sessionId, action, data = null) {
    this.info(`Session ${sessionId}: ${action}`, data);
  }

  // Slide-specific logging
  slide(slideId, action, data = null) {
    this.debug(`Slide ${slideId}: ${action}`, data);
  }

  // User interaction logging
  interaction(type, details = null) {
    this.debug(`User Interaction: ${type}`, details);
  }
}

export const logger = new StudentLogger(); 