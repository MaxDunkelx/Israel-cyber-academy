// Import lessons from modular structure
import { lessons as modularLessons, getLessonById as getModularLessonById, getNextLesson as getModularNextLesson, getPreviousLesson as getModularPreviousLesson } from './lessons/index.js';

// Re-export the modular lessons and functions
export const lessons = modularLessons;
export const getLessonById = getModularLessonById;
export const getNextLesson = getModularNextLesson;
export const getPreviousLesson = getModularPreviousLesson; 