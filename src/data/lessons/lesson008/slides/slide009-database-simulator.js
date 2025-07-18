export const slide9DatabaseSimulator = {
  id: "slide-9",
  type: "interactive",
  title: "סימולטור מסד נתונים - נסו לכתוב SQL! 💻",
  content: {
    gameType: "databaseSimulator",
    instructions: "כתבו שאילתות SQL וצפו בתוצאות",
    database: {
      name: "school_db",
      tables: [
        {
          name: "students",
          columns: ["id", "name", "age", "grade", "city"],
          data: [
            [1, "דני", 15, 9, "תל אביב"],
            [2, "שרה", 16, 10, "ירושלים"],
            [3, "יוסי", 14, 8, "חיפה"],
            [4, "מיכל", 17, 11, "באר שבע"],
            [5, "עומר", 15, 9, "תל אביב"]
          ]
        },
        {
          name: "grades",
          columns: ["student_id", "subject", "score"],
          data: [
            [1, "מתמטיקה", 85],
            [1, "אנגלית", 92],
            [2, "מתמטיקה", 78],
            [2, "אנגלית", 88],
            [3, "מתמטיקה", 95],
            [3, "אנגלית", 76]
          ]
        }
      ]
    },
    challenges: [
      {
        title: "הצג את כל התלמידים",
        description: "כתבו שאילתה להצגת כל התלמידים",
        hint: "השתמשו ב-SELECT *",
        solution: "SELECT * FROM students;"
      },
      {
        title: "תלמידים מעל גיל 15",
        description: "הציגו רק תלמידים מעל גיל 15",
        hint: "השתמשו ב-WHERE",
        solution: "SELECT * FROM students WHERE age > 15;"
      },
      {
        title: "מיון לפי שם",
        description: "הציגו תלמידים ממוינים לפי שם",
        hint: "השתמשו ב-ORDER BY",
        solution: "SELECT * FROM students ORDER BY name;"
      }
    ],
    features: {
      syntaxHighlighting: true,
      autoComplete: true,
      liveResults: true,
      errorChecking: true
    },
    feedback: {
      correct: "מעולה! השאילתה עובדת! 🎉",
      error: "יש שגיאה בשאילתה, בדקו שוב! 🔍",
      hint: "השתמשו בתחביר SQL נכון"
    }
  }
}; 