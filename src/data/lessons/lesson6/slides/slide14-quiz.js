export const slide14Quiz = {
  id: "slide-14",
  type: "interactive",
  title: "חידון פרוטוקולים - בדוק את הידע שלך! 🧠",
  content: {
    type: "multiple-choice",
    instructions: "ענה על השאלות הבאות כדי לבדוק מה למדת על פרוטוקולים:",
    questions: [
      {
        id: 1,
        question: "איזה פרוטוקול משמש לגלישה באתרי אינטרנט?",
        options: [
          { id: "a", text: "HTTP", correct: true },
          { id: "b", text: "SMTP", correct: false },
          { id: "c", text: "FTP", correct: false },
          { id: "d", text: "SSH", correct: false }
        ],
        explanation: "HTTP הוא הפרוטוקול הבסיסי לגלישה באתרי אינטרנט"
      },
      {
        id: 2,
        question: "מה ההבדל בין HTTP ל-HTTPS?",
        options: [
          { id: "a", text: "אין הבדל", correct: false },
          { id: "b", text: "HTTPS מהיר יותר", correct: false },
          { id: "c", text: "HTTPS מוצפן", correct: true },
          { id: "d", text: "HTTP חדש יותר", correct: false }
        ],
        explanation: "HTTPS הוא HTTP עם הצפנה - S מייצג Secure"
      },
      {
        id: 3,
        question: "איזה פרוטוקול משמש לשליחת אימיילים?",
        options: [
          { id: "a", text: "POP3", correct: false },
          { id: "b", text: "SMTP", correct: true },
          { id: "c", text: "FTP", correct: false },
          { id: "d", text: "HTTP", correct: false }
        ],
        explanation: "SMTP - Simple Mail Transfer Protocol משמש לשליחת אימיילים"
      },
      {
        id: 4,
        question: "כמה שכבות יש במודל OSI?",
        options: [
          { id: "a", text: "5 שכבות", correct: false },
          { id: "b", text: "6 שכבות", correct: false },
          { id: "c", text: "7 שכבות", correct: true },
          { id: "d", text: "8 שכבות", correct: false }
        ],
        explanation: "מודל OSI מכיל 7 שכבות, מהפיזית ועד שכבת האפליקציה"
      },
      {
        id: 5,
        question: "איזה פרוטוקול בטוח יותר להעברת קבצים?",
        options: [
          { id: "a", text: "FTP", correct: false },
          { id: "b", text: "SFTP", correct: true },
          { id: "c", text: "HTTP", correct: false },
          { id: "d", text: "SMTP", correct: false }
        ],
        explanation: "SFTP הוא FTP מוצפן - S מייצג Secure"
      }
    ],
    duration: 300
  }
}; 