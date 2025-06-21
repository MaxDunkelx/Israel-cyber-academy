export const slide22Reflection = {
  id: "slide-22",
  type: "interactive",
  title: "חידון סיום - Linux 🎯",
  content: {
    type: "multiple-choice",
    instructions: "בחר את התשובה הנכונה לכל שאלה",
    questions: [
      {
        question: "מי יצר את Linux?",
        options: [
          "ביל גייטס",
          "לינוס טורבאלדס",
          "סטיב ג'ובס",
          "מארק צוקרברג"
        ],
        correctAnswer: 1,
        explanation: "לינוס טורבאלדס יצר את Linux בשנת 1991"
      },
      {
        question: "מה הפקודה להצגת קבצים בתיקייה?",
        options: [
          "cd",
          "ls",
          "pwd",
          "mkdir"
        ],
        correctAnswer: 1,
        explanation: "ls היא הפקודה להצגת קבצים ותיקיות"
      },
      {
        question: "מה זה 755 בהרשאות?",
        options: [
          "קריאה וכתיבה לכולם",
          "הרצה לכולם",
          "הרשאות מלאות לבעלים, קריאה והרצה לאחרים",
          "הרשאות מלאות לכולם"
        ],
        correctAnswer: 2,
        explanation: "755 = rwxr-xr-x - הרשאות מלאות לבעלים, קריאה והרצה לאחרים"
      },
      {
        question: "איך מתקינים חבילה ב-Ubuntu?",
        options: [
          "apt install package",
          "yum install package",
          "pacman -S package",
          "brew install package"
        ],
        correctAnswer: 0,
        explanation: "apt install היא הפקודה להתקנת חבילות ב-Ubuntu"
      },
      {
        question: "מה הפקודה לעצירת תהליך?",
        options: [
          "stop",
          "end",
          "kill",
          "terminate"
        ],
        correctAnswer: 2,
        explanation: "kill היא הפקודה לעצירת תהליכים ב-Linux"
      }
    ],
    duration: 600
  }
}; 