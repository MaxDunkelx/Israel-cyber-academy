export const slide22DatabaseChallenge = {
  id: "slide-22",
  type: "interactive",
  title: "אתגר מסד נתונים - בנו מסד נתונים לספרייה! 📚",
  content: {
    gameType: "databaseChallenge",
    instructions: "בנו מסד נתונים לספרייה עם טבלאות מתאימות",
    scenario: {
      title: "ספריית בית ספר",
      description: "צריך לבנות מסד נתונים לספריית בית ספר שמכילה ספרים, תלמידים והשאלות"
    },
    requirements: [
      "טבלת ספרים עם פרטי הספר",
      "טבלת תלמידים עם פרטי התלמיד",
      "טבלת השאלות שמחברת בין ספרים לתלמידים",
      "מפתחות ראשיים ומפתחות זרים מתאימים"
    ],
    hints: [
      "חשבו איזה מידע צריך להיות בכל טבלה",
      "איך מחברים בין הטבלאות?",
      "איזה מפתחות ראשיים נדרשים?",
      "איך מונעים כפילויות?"
    ],
    solution: {
      tables: [
        {
          name: "books",
          columns: ["book_id (PK)", "title", "author", "isbn", "category", "copies_available"],
          description: "מידע על הספרים בספרייה"
        },
        {
          name: "students",
          columns: ["student_id (PK)", "name", "grade", "email", "phone"],
          description: "מידע על התלמידים"
        },
        {
          name: "borrowings",
          columns: ["borrowing_id (PK)", "book_id (FK)", "student_id (FK)", "borrow_date", "return_date"],
          description: "השאלות של ספרים"
        }
      ],
      relationships: [
        "books.book_id -> borrowings.book_id",
        "students.student_id -> borrowings.student_id"
      ]
    },
    features: {
      dragAndDrop: true,
      visualDesigner: true,
      validation: true,
      hints: true
    },
    feedback: {
      correct: "מעולה! עיצבתם מסד נתונים נכון! 🎉",
      partial: "כמעט שם! בדקו את הקשרים בין הטבלאות",
      incorrect: "נסו שוב! השתמשו ברמזים",
      complete: "כל הכבוד! השלמתם את האתגר בהצלחה! 🏆"
    }
  }
}; 