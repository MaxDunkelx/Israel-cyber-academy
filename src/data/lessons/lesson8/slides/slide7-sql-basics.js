export const slide7SqlBasics = {
  id: "slide-7",
  type: "presentation",
  title: "יסודות SQL 💬",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "יסודות SQL",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "שפת SQL היא השפה הסטנדרטית לעבודה עם מסדי נתונים",
        style: { fontSize: "1.4rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "📖 SELECT - קריאת נתונים",
          "➕ INSERT - הוספת נתונים",
          "✏️ UPDATE - עדכון נתונים",
          "🗑️ DELETE - מחיקת נתונים",
          "🏗️ CREATE - יצירת טבלאות"
        ],
        style: { fontSize: "1.3rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "SQL מאפשר לנו לתקשר עם מסד הנתונים",
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