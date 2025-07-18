export const slide21DatabaseQuiz = {
  id: "slide-21",
  type: "assessment",
  title: "חידון מסדי נתונים - מה זכרתם? 🧠",
  content: {
    assessmentType: "quiz",
    questions: [
      {
        question: "מה זה SQL?",
        options: [
          "שפת תכנות כללית",
          "שפת שאילתות מובנית",
          "סוג של מסד נתונים",
          "כלי עיצוב"
        ],
        correctAnswer: 1,
        explanation: "SQL היא שפת שאילתות מובנית לניהול מסדי נתונים יחסיים"
      },
      {
        question: "איזה סוג מסד נתונים מתאים לנתונים לא מובנים?",
        options: [
          "מסד נתונים יחסי",
          "מסד נתונים NoSQL",
          "מסד נתונים היררכי",
          "מסד נתונים רשתי"
        ],
        correctAnswer: 1,
        explanation: "NoSQL מתאים לנתונים לא מובנים וגמישים"
      },
      {
        question: "מה תפקיד המפתח הראשי (Primary Key)?",
        options: [
          "לחבר טבלאות",
          "לזהות שורה ייחודית",
          "למיין נתונים",
          "להגן על נתונים"
        ],
        correctAnswer: 1,
        explanation: "המפתח הראשי מזהה כל שורה בצורה ייחודית"
      },
      {
        question: "איזה סוג גיבוי שומר את כל הנתונים?",
        options: [
          "גיבוי דיפרנציאלי",
          "גיבוי אינקרמנטלי",
          "גיבוי מלא",
          "גיבוי בזמן אמת"
        ],
        correctAnswer: 2,
        explanation: "גיבוי מלא שומר את כל הנתונים במסד הנתונים"
      },
      {
        question: "מה זה נרמול נתונים?",
        options: [
          "הצפנת נתונים",
          "ארגון נתונים בצורה יעילה",
          "מחיקת נתונים",
          "העתקת נתונים"
        ],
        correctAnswer: 1,
        explanation: "נרמול הוא תהליך ארגון נתונים בצורה יעילה ומניעת כפילויות"
      }
    ],
    feedback: {
      correct: "מעולה! תשובה נכונה! 🎉",
      incorrect: "לא נכון, נסו שוב! 💪",
      complete: "כל הכבוד! השלמתם את החידון! 🏆"
    }
  }
}; 