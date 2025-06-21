export const slide5BrowserComponents = {
  id: "slide-5",
  type: "presentation",
  title: "חלקי הדפדפן 🔧",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "איך הדפדפן עובד?",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "subtitle",
        text: "כל חלק בדפדפן יש לו תפקיד חשוב",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "🔍 שורת כתובת - לכתיבת כתובות אתרים",
          "📑 לשוניות - לפתיחת דפים מרובים",
          "⭐ סימניות - לשמירת אתרים מועדפים",
          "⚙️ תפריט - להגדרות ואפשרויות",
          "🔄 כפתור רענון - לטעינה מחדש של הדף",
          "⬅️ כפתורי ניווט - לחזרה וקדימה"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", lineHeight: "2" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400",
        alt: "Browser Components",
        style: { width: "300px", borderRadius: "15px", margin: "2rem auto" }
      },
      {
        type: "timer",
        duration: 75,
        text: "זמן קריאה"
      }
    ]
  }
}; 