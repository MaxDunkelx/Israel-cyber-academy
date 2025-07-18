export const slide7DatabaseGame = {
  id: "slide-7",
  type: "interactive",
  title: "משחק מסד נתונים - התאמת רכיבים 🎮",
  content: {
    gameType: "matching",
    instructions: "גררו כל רכיב מסד נתונים למיקום הנכון שלו",
    items: [
      {
        id: "database",
        text: "Database",
        description: "מסד הנתונים הראשי",
        correctCategory: "structure"
      },
      {
        id: "table",
        text: "Table",
        description: "טבלה עם מידע מסוג מסוים",
        correctCategory: "structure"
      },
      {
        id: "column",
        text: "Column",
        description: "עמודה עם סוג מידע ספציפי",
        correctCategory: "structure"
      },
      {
        id: "select",
        text: "SELECT",
        description: "בחירת נתונים",
        correctCategory: "sql"
      },
      {
        id: "insert",
        text: "INSERT",
        description: "הוספת נתונים",
        correctCategory: "sql"
      },
      {
        id: "update",
        text: "UPDATE",
        description: "עדכון נתונים",
        correctCategory: "sql"
      }
    ],
    categories: [
      {
        id: "structure",
        name: "מבנה מסד נתונים",
        icon: "🏗️"
      },
      {
        id: "sql",
        name: "פקודות SQL",
        icon: "🗣️"
      }
    ],
    feedback: {
      correct: "מעולה! התאמת נכונה! 🎉",
      incorrect: "נסה שוב! 💪",
      complete: "כל הכבוד! השלמת את המשחק בהצלחה! 🏆"
    }
  }
}; 