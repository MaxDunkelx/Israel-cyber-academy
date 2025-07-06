export const slide22Storage = {
  id: "slide-22",
  type: "presentation",
  title: "2. זיכרון ארוך טווח 💾",
  content: {
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    elements: [
      {
        type: "title",
        text: "זיכרון ארוך טווח",
        style: { fontSize: "2.5rem", color: "#333", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "subtitle",
        text: "Hard Disk / SSD - לאחסון קבוע",
        style: { fontSize: "1.5rem", color: "#666", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "comparison",
        title: "סוגי אחסון",
        items: [
          {
            title: "SSD",
            description: "מהיר ויקר - כמו זיכרון פלאש",
            icon: "⚡",
            color: "#4CAF50"
          },
          {
            title: "הארד דיסק",
            description: "מגנטי וזול יותר - כמו תקליט",
            icon: "💿",
            color: "#2196F3"
          }
        ],
        style: { fontSize: "1.2rem", color: "#333" }
      },
      {
        type: "list",
        items: [
          "📁 קבצים, תמונות, סרטים",
          "💻 מערכת הפעלה",
          "🎮 תוכנות ומשחקים",
          "📚 מסמכים ועבודות"
        ],
        style: { fontSize: "1.2rem", color: "#333", textAlign: "right", lineHeight: "2" }
      }
    ],
    duration: 180
  }
}; 