export const slide6TerminalGame = {
  id: "slide-6",
  type: "interactive",
  title: "משחק פקודות טרמינל 🎮",
  content: {
    type: "matching",
    instructions: "התאם כל פקודה למטרה שלה",
    pairs: [
      {
        left: "ls",
        right: "הצג קבצים בתיקייה",
        explanation: "רשימת קבצים ותיקיות"
      },
      {
        left: "cd",
        right: "עבור לתיקייה אחרת",
        explanation: "שינוי תיקייה"
      },
      {
        left: "pwd",
        right: "הצג מיקום נוכחי",
        explanation: "נתיב תיקייה נוכחית"
      },
      {
        left: "mkdir",
        right: "צור תיקייה חדשה",
        explanation: "יצירת תיקייה"
      },
      {
        left: "rm",
        right: "מחק קובץ",
        explanation: "הסרת קבצים"
      },
      {
        left: "cat",
        right: "הצג תוכן קובץ",
        explanation: "הצגת תוכן קבצים"
      }
    ],
    duration: 300
  }
}; 