export const slide12CloudQuiz = {
  id: "slide-12",
  type: "assessment",
  title: "בוחן - אבטחת ענן ווירטואליזציה 🧠",
  content: {
    assessmentType: "quiz",
    questions: [
      {
        question: "מהו מודל האחריות המשותפת בענן?",
        options: [
          "רק הלקוח אחראי על אבטחה",
          "רק ספק הענן אחראי על אבטחה",
          "חלוקת אחריות בין לקוח לספק",
          "אין אחריות לאבטחה בענן"
        ],
        correctAnswer: 2,
        explanation: "מודל האחריות המשותפת מגדיר מי אחראי על אבטחת איזה חלק במערכת הענן"
      },
      {
        question: "מהו Zero Trust?",
        options: [
          "אמון מלא במשתמשים",
          "אל תאמינו לאף אחד, בדקו הכל",
          "אמון רק במנהלי מערכת",
          "אמון רק במשתמשים מורשים"
        ],
        correctAnswer: 1,
        explanation: "Zero Trust הוא עיקרון אבטחה שמניח שאין אמון אוטומטי באף גורם"
      },
      {
        question: "מהו IaaS?",
        options: [
          "Infrastructure as a Service",
          "Internet as a Service",
          "Identity as a Service",
          "Integration as a Service"
        ],
        correctAnswer: 0,
        explanation: "IaaS = Infrastructure as a Service - שירותי תשתית ענן"
      },
      {
        question: "איזה כלי משמש לניטור ענן?",
        options: [
          "AWS CloudWatch",
          "Microsoft Word",
          "Adobe Photoshop",
          "Google Chrome"
        ],
        correctAnswer: 0,
        explanation: "AWS CloudWatch הוא כלי ניטור ענן של Amazon"
      },
      {
        question: "מהו MFA?",
        options: [
          "Multi-Factor Authentication",
          "Multiple File Access",
          "Main Frame Application",
          "Mobile File Archive"
        ],
        correctAnswer: 0,
        explanation: "MFA = Multi-Factor Authentication - אימות רב-שלבי"
      }
    ],
    description: "בואו נבדוק מה למדנו על אבטחת ענן ווירטואליזציה!"
  }
}; 