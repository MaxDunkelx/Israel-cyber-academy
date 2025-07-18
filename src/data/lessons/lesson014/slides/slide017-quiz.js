export const slide17Quiz = {
  id: "slide-17",
  type: "quiz",
  title: "חידון אבטחת אפליקציות - Application Security Quiz ❓",
  content: {
    questions: [
      {
        question: "מה זה SQL Injection?",
        options: [
          "הזרקת קוד SQL לתוך אפליקציה",
          "הצפנת נתונים",
          "בדיקת אבטחה",
          "ניהול משתמשים"
        ],
        correct: 0,
        explanation: "SQL Injection הוא ניסיון להזריק קוד SQL לתוך אפליקציה כדי לגשת לנתונים."
      },
      {
        question: "איזה כלי משמש לבדיקת אבטחת אפליקציות ווב?",
        options: [
          "Nmap",
          "OWASP ZAP",
          "Wireshark",
          "Metasploit"
        ],
        correct: 1,
        explanation: "OWASP ZAP הוא כלי חינמי לבדיקת אבטחת אפליקציות ווב."
      },
      {
        question: "מה זה DevSecOps?",
        options: [
          "שילוב אבטחה בפיתוח תוכנה",
          "בדיקת אבטחה",
          "ניהול משתמשים",
          "הצפנת נתונים"
        ],
        correct: 0,
        explanation: "DevSecOps הוא שילוב אבטחה בתהליך הפיתוח והפריסה של תוכנה."
      },
      {
        question: "איך AI עוזר באבטחה?",
        options: [
          "מחליף מומחי אבטחה",
          "זיהוי איומים בזמן אמת",
          "כותב קוד אוטומטית",
          "מנהל משתמשים"
        ],
        correct: 1,
        explanation: "AI עוזר בזיהוי איומים בזמן אמת ובניתוח התנהגות חריגה."
      }
    ],
    scoring: {
      correct: "+10 נקודות",
      incorrect: "0 נקודות",
      passingScore: 70
    },
    successMessage: "כל הכבוד! הצלחת בחידון אבטחת אפליקציות! 🏆"
  }
}; 