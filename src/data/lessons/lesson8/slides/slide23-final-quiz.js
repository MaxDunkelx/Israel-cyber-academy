export const slide23FinalQuiz = {
  id: "slide-23",
  type: "interactive",
  title: "חידון סיום - יסודות מסדי נתונים 🎯",
  content: {
    type: "quiz",
    questions: [
      {
        id: 1,
        question: "מהו מסד נתונים?",
        options: [
          "מערכת לניהול וארגון מידע",
          "תוכנה לעריכת תמונות",
          "מערכת הפעלה",
          "כלי לתכנות"
        ],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "איזה סוג מסד נתונים משתמש בטבלאות?",
        options: [
          "NoSQL",
          "SQL",
          "Graph Database",
          "Document Database"
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "מהי שאילתה SQL בסיסית לקבלת כל הנתונים מטבלה?",
        options: [
          "GET * FROM table",
          "SELECT * FROM table",
          "FETCH * FROM table",
          "RETRIEVE * FROM table"
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "מהו תפקיד האינדקס במסד נתונים?",
        options: [
          "להצפין נתונים",
          "לשפר ביצועי חיפוש",
          "למחוק נתונים",
          "לשנות מבנה טבלה"
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: "מהי צורה נורמלית ראשונה (1NF)?",
        options: [
          "טבלה ללא כפילויות",
          "טבלה עם ערכים אטומיים",
          "טבלה עם קשרים מורכבים",
          "טבלה עם הצפנה"
        ],
        correctAnswer: 1
      }
    ],
    timeLimit: 600,
    passingScore: 80,
    styles: {
      questionText: { color: "white", fontSize: "1.2rem", fontWeight: "bold" },
      optionText: { color: "white", fontSize: "1rem" },
      titleText: { color: "white", fontSize: "1.5rem", fontWeight: "bold" },
      instructionText: { color: "#e2e8f0", fontSize: "1rem" }
    }
  }
}; 