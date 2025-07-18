export const slide14SecuritySimulation = {
  id: "slide-14",
  type: "interactive",
  title: "סימולציית אבטחת אפליקציות - Application Security Simulation 🎯",
  content: {
    gameType: "simulation",
    title: "הגנו על האפליקציה מפני התקפות",
    description: "בחרו את הכלים והטכניקות הנכונות להגנה על אפליקציה מפני התקפות שונות.",
    scenarios: [
      {
        id: "scenario1",
        title: "התקפת SQL Injection",
        description: "האקר מנסה להזריק קוד SQL לטופס התחברות",
        options: [
          "השתמשו ב-Prepared Statements",
          "הוסיפו Captcha",
          "הגבילו ניסיונות התחברות",
          "הצפינו סיסמאות"
        ],
        correct: 0,
        explanation: "Prepared Statements מונעים SQL Injection על ידי הפרדת הקוד מהנתונים."
      },
      {
        id: "scenario2", 
        title: "התקפת XSS",
        description: "האקר מנסה להזריק JavaScript לדף ווב",
        options: [
          "השתמשו ב-Content Security Policy",
          "הצפינו נתונים",
          "הוסיפו Firewall",
          "שיניתם פורטים"
        ],
        correct: 0,
        explanation: "Content Security Policy מונע הרצת JavaScript זדוני."
      },
      {
        id: "scenario3",
        title: "התקפת Brute Force",
        description: "האקר מנסה לנחש סיסמאות",
        options: [
          "הגבילו ניסיונות התחברות",
          "השתמשו ב-HTTPS",
          "הוסיפו Two-Factor Authentication",
          "שיניתם שמות משתמש"
        ],
        correct: 0,
        explanation: "הגבלת ניסיונות התחברות מונעת התקפות Brute Force."
      }
    ],
    scoring: {
      correct: "+15 נקודות",
      incorrect: "-5 נקודות",
      bonus: "+10 נקודות לכל תרחיש נכון"
    },
    successMessage: "כל הכבוד! הצלחת להגן על האפליקציה! 🛡️"
  }
}; 