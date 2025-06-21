export const slide4DatabaseTypes = {
  id: "slide-4",
  type: "presentation",
  title: "סוגי מסדי נתונים 📊",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "סוגי מסדי נתונים",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "🗄️ מסד נתונים יחסי (SQL)",
          "📄 מסד נתונים לא יחסי (NoSQL)",
          "🌐 מסד נתונים מבוזר",
          "📱 מסד נתונים למובייל",
          "☁️ מסד נתונים בענן"
        ],
        style: { fontSize: "1.3rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "כל סוג מתאים לצרכים שונים ולסוגי מידע שונים",
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