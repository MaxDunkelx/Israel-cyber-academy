export const slide21Quiz = {
  id: "slide-21",
  type: "assessment",
  title: "חידון אבטחת ענן - Cloud Security Quiz 🧠",
  content: {
    assessmentType: "quiz",
    questions: [
      {
        question: "מהו מודל האחריות המשותפת בענן?",
        options: [
          "ספק הענן אחראי על הכל",
          "הלקוח אחראי על הכל",
          "חלוקת אחריות בין ספק הענן ללקוח",
          "אין אחריות לאף אחד"
        ],
        correctAnswer: 2,
        explanation: "מודל האחריות המשותפת מחלק אחריות בין ספק הענן (תשתית) ללקוח (אפליקציות ונתונים)."
      },
      {
        question: "מהו Zero Trust בענן?",
        options: [
          "לא לסמוך על אף אחד",
          "לסמוך רק על עובדים פנימיים",
          "לסמוך על כל המשתמשים",
          "לסמוך רק על מנהלי מערכת"
        ],
        correctAnswer: 0,
        explanation: "Zero Trust פירושו לא לסמוך על אף אחד ולאמת כל בקשה לגישה."
      },
      {
        question: "מהו IAM בענן?",
        options: [
          "Internet Access Management",
          "Identity and Access Management",
          "Internal Application Monitoring",
          "Infrastructure Automation Management"
        ],
        correctAnswer: 1,
        explanation: "IAM הוא Identity and Access Management - ניהול זהויות והרשאות."
      },
      {
        question: "מהי הצפנה At Rest?",
        options: [
          "הצפנת נתונים בזמן העברה",
          "הצפנת נתונים בזמן אחסון",
          "הצפנת נתונים בזמן עיבוד",
          "הצפנת נתונים בזמן גיבוי"
        ],
        correctAnswer: 1,
        explanation: "הצפנה At Rest היא הצפנת נתונים בזמן אחסון במסד נתונים או קבצים."
      },
      {
        question: "מהו CASB?",
        options: [
          "Cloud Application Security Broker",
          "Cloud Access Security Bridge",
          "Cloud Authentication Security Base",
          "Cloud Application Service Bus"
        ],
        correctAnswer: 0,
        explanation: "CASB הוא Cloud Application Security Broker - מתווך אבטחה ליישומי ענן."
      }
    ],
    description: "בואו נבדוק מה למדתם על אבטחת ענן! ענו על השאלות ובדקו את הידע שלכם."
  }
}; 