export const slide13ProtocolSimulator = {
  id: "slide-13",
  type: "interactive",
  title: "סימולטור פרוטוקולים - נסה בעצמך! 🎮",
  content: {
    type: "protocol-simulator",
    instructions: "בסימולטור זה תוכל לראות איך פרוטוקולים עובדים בפועל. בחר פרוטוקול וצפה בתהליך התקשורת:",
    protocols: [
      {
        id: "http",
        name: "HTTP - גלישה באתרים",
        description: "פרוטוקול בסיסי לגלישה באינטרנט",
        steps: [
          "1. שליחת בקשה לשרת",
          "2. השרת מעבד את הבקשה",
          "3. השרת שולח תשובה",
          "4. הדפדפן מציג את התוכן"
        ]
      },
      {
        id: "https",
        name: "HTTPS - גלישה מאובטחת",
        description: "HTTP עם הצפנה",
        steps: [
          "1. יצירת חיבור מוצפן",
          "2. אימות זהות השרת",
          "3. שליחת בקשה מוצפנת",
          "4. קבלת תשובה מוצפנת"
        ]
      },
      {
        id: "email",
        name: "SMTP - שליחת אימייל",
        description: "פרוטוקול לשליחת הודעות",
        steps: [
          "1. חיבור לשרת SMTP",
          "2. אימות המשתמש",
          "3. שליחת ההודעה",
          "4. אישור קבלה"
        ]
      }
    ],
    duration: 300
  }
}; 