export const slide12SqlPractice = {
  id: "slide-12",
  type: "interactive",
  title: "תרגול SQL מתקדם 💻",
  content: {
    type: "multiple-choice",
    question: "איזו שאילתה תחזיר את כל הסטודנטים עם ציון מעל 80?",
    options: [
      {
        id: "a",
        text: "SELECT * FROM students WHERE grade > 80",
        emoji: "✅"
      },
      {
        id: "b", 
        text: "SELECT * FROM students HAVING grade > 80",
        emoji: "❌"
      },
      {
        id: "c",
        text: "SELECT * FROM students IF grade > 80",
        emoji: "❌"
      },
      {
        id: "d",
        text: "SELECT * FROM students WHEN grade > 80",
        emoji: "❌"
      }
    ],
    correctAnswer: "a",
    explanation: "WHERE משמש לסינון רשומות לפי תנאי, בעוד ש-HAVING משמש עם GROUP BY"
  }
}; 