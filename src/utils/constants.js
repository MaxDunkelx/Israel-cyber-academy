// App-wide constants
export const APP_CONFIG = {
  NAME: 'Israel Cyber Campus',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@israelcybercampus.com'
};

// User roles
export const USER_ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  MANAGER: 'manager'
};

// New unified slide types
export const SLIDE_TYPES = {
  CONTENT: 'content',
  VIDEO: 'video',
  INTERACTIVE: 'interactive',
  ASSESSMENT: 'assessment'
};

// Assessment types for unified assessment slides
export const ASSESSMENT_TYPES = {
  POLL: 'poll',
  QUIZ: 'quiz',
  REFLECTION: 'reflection'
};

// Legacy lesson types (for backward compatibility during migration)
export const LESSON_TYPES = {
  PRESENTATION: 'presentation',
  INTERACTIVE: 'interactive',
  QUIZ: 'quiz',
  VIDEO: 'video',
  POLL: 'poll',
  BREAK: 'break',
  REFLECTION: 'reflection'
};

// Exercise types (keeping all for future amazing interactive lessons)
export const EXERCISE_TYPES = {
  CLICK_BASED_EXERCISE: 'drag-drop',
  MATCHING: 'matching',
  MULTIPLE_CHOICE: 'multiple-choice',
  WINDOWS_SIMULATOR: 'windows-simulator',
  LINUX_SIMULATOR: 'linux-simulator',
  NETWORK_SIMULATOR: 'network-simulator',
  PROTOCOL_SIMULATOR: 'protocol-simulator',
  CODE_EDITOR: 'code-editor',
  WEBSITE_BUILDER: 'website-builder',
  DATABASE_SIMULATOR: 'database-simulator',
  BROWSER_SIMULATOR: 'browser-simulator',
  COMPUTER_BUILD_SIMULATOR: 'computer-build-simulator',
  LAB_SIMULATION: 'lab-simulation',
  PASSWORD_GENERATOR: 'password-generator'
};

// UI Colors
export const COLORS = {
  PRIMARY: '#667eea',
  SECONDARY: '#764ba2',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#3b82f6'
};

// Animation durations
export const ANIMATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500
};

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'theme',
  LANGUAGE: 'language'
};

// Lesson status
export const LESSON_STATUS = {
  LOCKED: 'locked',
  AVAILABLE: 'available',
  COMPLETED: 'completed'
};

// Progress tracking
export const PROGRESS = {
  TEMPORARY: 'temporary',
  PERMANENT: 'permanent'
};

// Achievement types
export const ACHIEVEMENTS = {
  FIRST_LESSON: 'first_lesson',
  THREE_LESSONS: 'three_lessons',
  ONE_HOUR: 'one_hour'
}; 