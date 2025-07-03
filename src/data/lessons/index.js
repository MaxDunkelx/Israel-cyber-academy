import { lesson1 } from './lesson1/index.js';
import { lesson2 } from './lesson2/index.js';
import { lesson3 } from './lesson3/index.js';
import { lesson4 } from './lesson4/index.js';
import { lesson5 } from './lesson5/index.js';
import { lesson6 } from './lesson6/index.js';
import { lesson7 } from './lesson7/index.js';
import { lesson8 } from './lesson8/index.js';
import { lesson9 } from './lesson9/index.js';

export const lessons = [
  lesson1,
  lesson2,
  lesson3,
  lesson4,
  lesson5,
  lesson6,
  lesson7,
  lesson8,
  lesson9
];

export const getLessonById = (id) => {
  return lessons.find(lesson => lesson.id === id);
};

export const getNextLesson = (currentId) => {
  const currentIndex = lessons.findIndex(lesson => lesson.id === currentId);
  return lessons[currentIndex + 1] || null;
};

export const getPreviousLesson = (currentId) => {
  const currentIndex = lessons.findIndex(lesson => lesson.id === currentId);
  return lessons[currentIndex - 1] || null;
}; 