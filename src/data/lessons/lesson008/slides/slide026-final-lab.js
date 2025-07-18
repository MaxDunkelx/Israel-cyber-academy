export const slide26FinalLab = {
  id: "slide-26",
  type: "interactive",
  title: "מעבדה מסכמת - ניהול מסד נתונים אמיתי! 🧪",
  content: {
    gameType: "finalLab",
    instructions: "בנו מסד נתונים קטן, הוסיפו נתונים, בצעו שאילתות והציגו תוצאות.",
    scenario: {
      title: "ניהול מסד נתונים של חנות צעצועים",
      description: "צרו טבלאות למוצרים, לקוחות והזמנות. הוסיפו נתונים ובצעו שאילתות להצגת מידע."
    },
    steps: [
      "צרו טבלת מוצרים עם שם, מחיר וכמות במלאי",
      "צרו טבלת לקוחות עם שם, טלפון ועיר",
      "צרו טבלת הזמנות עם מזהה מוצר, מזהה לקוח ותאריך הזמנה",
      "הוסיפו לפחות 3 מוצרים ו-2 לקוחות",
      "בצעו שאילתה להצגת כל ההזמנות"
    ],
    features: {
      codeEditor: true,
      liveResults: true,
      hints: true,
      validation: true
    },
    feedback: {
      correct: "מעולה! השלמתם את המעבדה! 🎉",
      partial: "בדקו את מבנה הטבלאות והשאילתות",
      incorrect: "נסו שוב! השתמשו ברמזים"
    }
  }
}; 