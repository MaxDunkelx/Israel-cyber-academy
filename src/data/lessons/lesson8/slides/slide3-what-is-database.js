export const slide3WhatIsDatabase = {
  id: "slide-3",
  type: "presentation",
  title: "מה זה מסד נתונים? 🗄️",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "מה זה מסד נתונים?",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "מסד נתונים הוא אוסף מאורגן של מידע שנשמר במחשב בצורה מסודרת",
        style: { fontSize: "1.4rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "📁 אוסף של טבלאות מידע",
          "🔍 חיפוש מהיר וקל",
          "📊 ארגון יעיל של נתונים",
          "🔄 עדכון ושינוי קל",
          "👥 גישה מרובה משתמשים"
        ],
        style: { fontSize: "1.3rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "דוגמה: רשימת תלמידים, ספרייה, חנות מקוונת",
        style: { fontSize: "1.2rem", color: "white", textAlign: "center", opacity: 0.9 }
      },
      {
        type: "timer",
        duration: 45,
        text: "זמן קריאה"
      }
    ]
  }
}; 