export const slide8SqlGame = {
  id: "slide-8",
  type: "interactive",
  title: "משחק SQL - תרגול בסיסי 🎮",
  content: {
    type: "multiple-choice",
    question: "איזו פקודה SQL משמשת לבחירת כל הנתונים מטבלה?",
    options: [
      {
        id: "a",
        text: "SELECT * FROM table_name",
        emoji: "✅"
      },
      {
        id: "b",
        text: "GET * FROM table_name",
        emoji: "❌"
      },
      {
        id: "c",
        text: "FIND * FROM table_name",
        emoji: "❌"
      },
      {
        id: "d",
        text: "READ * FROM table_name",
        emoji: "❌"
      }
    ],
    correctAnswer: "a",
    explanation: "SELECT היא הפקודה הנכונה לבחירת נתונים ב-SQL"
  }
}; 