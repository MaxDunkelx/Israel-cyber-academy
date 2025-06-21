export const slide10Permissions = {
  id: "slide-10",
  type: "presentation",
  title: "הרשאות קבצים 🔐",
  content: {
    background: "linear-gradient(135deg, #9C27B0 0%, #673AB7 100%)",
    elements: [
      {
        type: "title",
        text: "איך עובדות הרשאות?",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "ב-Linux כל קובץ ותיקייה יש להם הרשאות שמגדירות מי יכול לקרוא, לכתוב או להריץ",
        style: { fontSize: "1.2rem", color: "white", textAlign: "center", marginBottom: "1rem" }
      },
      {
        type: "list",
        items: [
          "👤 Owner - בעל הקובץ",
          "👥 Group - קבוצת משתמשים",
          "🌍 Others - כל השאר",
          "📖 Read (r) - הרשאה לקריאה",
          "✏️ Write (w) - הרשאה לכתיבה",
          "⚡ Execute (x) - הרשאה להרצה",
          "🔢 755 - הרשאות מספריות",
          "🔧 chmod - שינוי הרשאות"
        ],
        style: { fontSize: "1.1rem", color: "white", textAlign: "right" }
      },
      {
        type: "image",
        src: "https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
        alt: "File Permissions",
        style: { width: "250px", borderRadius: "10px", margin: "1rem auto" }
      },
      {
        type: "timer",
        duration: 120,
        text: "זמן קריאה"
      }
    ]
  }
}; 