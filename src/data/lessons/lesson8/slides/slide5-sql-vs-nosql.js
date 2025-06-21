export const slide5SqlVsNosql = {
  id: "slide-5",
  type: "presentation",
  title: "SQL vs NoSQL 🔄",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "SQL vs NoSQL",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "השוואה בין שני סוגי מסדי הנתונים העיקריים",
        style: { fontSize: "1.4rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "🗄️ SQL - מבנה קבוע, יחסי",
          "📄 NoSQL - מבנה גמיש, לא יחסי",
          "⚡ SQL - מהיר לשאילתות מורכבות",
          "📈 NoSQL - מתאים לנתונים גדולים",
          "🔒 SQL - אבטחה חזקה יותר"
        ],
        style: { fontSize: "1.3rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "הבחירה תלויה בסוג הפרויקט והדרישות",
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