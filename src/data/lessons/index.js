import { lesson1 } from './lesson1/index.js';
import { lesson2 } from './lesson2/index.js';

// Create placeholder lessons for 3-18 with metadata from backup
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
  createPlaceholderLesson(3, "הכרת Windows", "עבודה עם מערכת ההפעלה Windows. כולל הפסקה של 45-55 דקות.", "🪟", "3 שעות", "בינוני", "10-13", 15),
  createPlaceholderLesson(4, "הכרת Linux", "עבודה עם מערכת ההפעלה Linux. כולל הפסקה של 45-55 דקות.", "🐧", "3 שעות", "בינוני", "10-13", 15),
  createPlaceholderLesson(5, "רשתות", "הכרת עולם הרשתות והאינטרנט. כולל הפסקה של 45-55 דקות.", "🌐", "3 שעות", "בינוני", "10-13", 15),
  createPlaceholderLesson(6, "פרוטוקולים", "הכרת פרוטוקולי תקשורת. כולל הפסקה של 45-55 דקות.", "📡", "3 שעות", "בינוני", "10-13", 15),
  createPlaceholderLesson(7, "תכנות והקמת אתר", "בניית אתר אינטרנט בסיסי. כולל הפסקה של 45-55 דקות.", "💻", "3 שעות", "בינוני", "10-13", 15),
  createPlaceholderLesson(8, "הכרת דפדפן", "עבודה מתקדמת עם דפדפן האינטרנט. כולל הפסקה של 45-55 דקות.", "🌍", "3 שעות", "קל", "10-13", 15),
  createPlaceholderLesson(9, "אנונימיות", "הגנה על פרטיות באינטרנט", "🕵️", "75 דקות", "בינוני", "10-13", 10),
  createPlaceholderLesson(10, "קריפטוגרפיה", "הצפנה ופענוח מידע", "🔐", "90 דקות", "מתקדם", "10-13", 10),
  createPlaceholderLesson(11, "סטגנוגרפיה", "הסתרת מידע בתוך מידע אחר", "📝", "60 דקות", "מתקדם", "10-13", 10),
  createPlaceholderLesson(12, "איסוף מודעין", "איסוף מידע ממקורות פתוחים", "🔍", "75 דקות", "בינוני", "10-13", 10),
  createPlaceholderLesson(13, "גוגל האקינג", "חיפוש מתקדם ואיתור מידע רגיש", "🔎", "60 דקות", "מתקדם", "10-13", 10),
  createPlaceholderLesson(14, "סניפינג", "יירוט וניתוח תעבורת רשת", "📡", "90 דקות", "מתקדם", "10-13", 10),
  createPlaceholderLesson(15, "פישינג", "הכרת מתקפות פישינג והגנה מפניהן", "🎣", "75 דקות", "בינוני", "10-13", 10),
  createPlaceholderLesson(16, "בינה מלאכותית", "AI בסייבר - הזדמנויות ואתגרים", "🤖", "90 דקות", "מתקדם", "10-13", 10),
  createPlaceholderLesson(17, "שפות תכנות", "שיעור מקיף על שפות תכנות, HTML, CSS, JavaScript - כולל תרגול מעשי ופרויקטים", "💻", "2.5 שעות", "בינוני", "10-13", 15),
  createPlaceholderLesson(18, "קבצי עוגיות ואבטחת דפדפן", "שיעור אינטראקטיבי בן 60 דקות - עוגיות, פרטיות, האקינג אתי ואמצעי הגנה", "🍪", "60 דקות", "בינוני", "10-13", 0)
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