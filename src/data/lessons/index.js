import { lesson1 } from './lesson1/index.js';
import { lesson2 } from './lesson2/index.js';
import { lesson3 } from './lesson3/index.js';
import { lesson4 } from './lesson4/index.js';
import { lesson5 } from './lesson5/index.js';
import { lesson6 } from './lesson6/index.js';
import { lesson7 } from './lesson7/index.js';
import { lesson8 } from './lesson8/index.js';

// Create placeholder lessons for 9-18 with metadata from backup
const createPlaceholderLesson = (id, title, description, icon, duration, difficulty, targetAge, breakDuration) => ({
  id,
  title,
  description,
  icon,
  duration,
  difficulty,
  targetAge,
  breakDuration,
  content: {
    slides: [
      {
        id: "slide-1",
        type: "presentation",
        title: `${title} - בקרוב`,
        content: {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          elements: [
            {
              type: "title",
              text: title,
              style: { fontSize: "3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
            },
            {
              type: "subtitle",
              text: "תוכן השיעור יהיה זמין בקרוב",
              style: { fontSize: "1.5rem", color: "white", textAlign: "center", opacity: 0.9 }
            },
            {
              type: "image",
              src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400",
              alt: "Coming Soon",
              style: { width: "300px", borderRadius: "15px", margin: "2rem auto" }
            },
            {
              type: "timer",
              duration: 30,
              text: "זמן קריאה"
            }
          ]
        }
      }
    ]
  }
});

export const lessons = [
  lesson1,
  lesson2,
  lesson3,
  lesson4,
  lesson5,
  lesson6,
  lesson7,
  lesson8,
  createPlaceholderLesson(9, "הכרת דפדפן", "עבודה מתקדמת עם דפדפן האינטרנט. כולל הפסקה של 45-55 דקות.", "🌍", "3 שעות", "קל", "10-13", 15),
  createPlaceholderLesson(10, "אנונימיות", "הגנה על פרטיות באינטרנט", "🕵️", "75 דקות", "בינוני", "10-13", 10),
  createPlaceholderLesson(11, "קריפטוגרפיה", "הצפנה ופענוח מידע", "🔐", "90 דקות", "מתקדם", "10-13", 10),
  createPlaceholderLesson(12, "סטגנוגרפיה", "הסתרת מידע בתוך מידע אחר", "📝", "60 דקות", "מתקדם", "10-13", 10),
  createPlaceholderLesson(13, "איסוף מודעין", "איסוף מידע ממקורות פתוחים", "🔍", "75 דקות", "בינוני", "10-13", 10),
  createPlaceholderLesson(14, "גוגל האקינג", "חיפוש מתקדם ואיתור מידע רגיש", "🔎", "60 דקות", "מתקדם", "10-13", 10),
  createPlaceholderLesson(15, "סניפינג", "יירוט וניתוח תעבורת רשת", "📡", "90 דקות", "מתקדם", "10-13", 10),
  createPlaceholderLesson(16, "פישינג", "הכרת מתקפות פישינג והגנה מפניהן", "🎣", "75 דקות", "בינוני", "10-13", 10),
  createPlaceholderLesson(17, "בינה מלאכותית", "AI בסייבר - הזדמנויות ואתגרים", "🤖", "90 דקות", "מתקדם", "10-13", 10),
  createPlaceholderLesson(18, "שפות תכנות", "שיעור מקיף על שפות תכנות, HTML, CSS, JavaScript - כולל תרגול מעשי ופרויקטים", "💻", "2.5 שעות", "בינוני", "10-13", 15),
  createPlaceholderLesson(19, "קבצי עוגיות ואבטחת דפדפן", "שיעור אינטראקטיבי בן 60 דקות - עוגיות, פרטיות, האקינג אתי ואמצעי הגנה", "🍪", "60 דקות", "בינוני", "10-13", 0)
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