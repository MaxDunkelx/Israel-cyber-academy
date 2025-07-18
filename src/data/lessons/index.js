import { lesson001 } from './lesson001/index.js';
import { lesson002 } from './lesson002/index.js';
import { lesson003 } from './lesson003/index.js';
import { lesson004 } from './lesson004/index.js';
import { lesson005 } from './lesson005/index.js';
import { lesson006 } from './lesson006/index.js';
import { lesson007 } from './lesson007/index.js';
import { lesson008 } from './lesson008/index.js';
import { lesson009 } from './lesson009/index.js';
import { lesson010 } from './lesson010/index.js';
import { lesson011 } from './lesson011/index.js';
import { lesson012 } from './lesson012/index.js';
import { lesson013 } from './lesson013/index.js';
import { lesson014 } from './lesson014/index.js';
import { lesson015 } from './lesson015/index.js';
import { lesson016 } from './lesson016/index.js';

export const lessons = [
  lesson001,
  lesson002,
  lesson003,
  lesson004,
  lesson005,
  lesson006,
  lesson007,
  lesson008,
  lesson009,
  lesson010,
  lesson011,
  lesson012,
  lesson013,
  lesson014,
  lesson015,
  lesson016
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