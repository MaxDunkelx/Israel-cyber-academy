export const slide9CyberTriangleQuiz = {
  id: "slide-9",
  type: "assessment",
  title: "חידון משולש הסייבר - CIA 🎯",
  content: {
    assessmentType: "quiz",
    question: "איזה עיקרון של משולש ה-CIA מתאר שהמידע נגיש רק למי שמורשה?",
    options: [
      { id: "a", text: "Integrity - שלמות", correct: false },
      { id: "b", text: "Confidentiality - סודיות", correct: true },
      { id: "c", text: "Availability - זמינות", correct: false },
      { id: "d", text: "Authentication - אימות", correct: false }
    ],
    description: "בואו נבדוק אם הבנתם את עקרונות משולש הסייבר!",
    feedback: {
      correct: "מעולה! Confidentiality (סודיות) אומר שהמידע נגיש רק למי שמורשה לגשת אליו.",
      incorrect: "לא נכון. Confidentiality (סודיות) אומר שהמידע נגיש רק למי שמורשה לגשת אליו."
    },
    learningObjectives: [
      "להבין את עקרונות משולש ה-CIA",
      "לזהות את המשמעות של כל עיקרון",
      "ליישם את העקרונות במצבים מעשיים"
    ]
  }
}; 