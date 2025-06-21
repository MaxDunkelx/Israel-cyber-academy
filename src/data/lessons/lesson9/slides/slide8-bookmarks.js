export const slide8Bookmarks = {
  id: "slide-8",
  type: "presentation",
  title: "סימניות ⭐",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "איך לשמור אתרים מועדפים?",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "subtitle",
        text: "סימניות עוזרות לנו למצוא אתרים חשובים במהירות",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "⭐ Ctrl+D - הוספת סימניה",
          "📁 - יצירת תיקיות לסימניות",
          "🏷️ - הוספת תגיות לסימניות",
          "📱 - סנכרון בין מכשירים",
          "🔍 - חיפוש בסימניות",
          "📤 - ייצוא וייבוא סימניות"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", lineHeight: "2" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400",
        alt: "Bookmarks",
        style: { width: "300px", borderRadius: "15px", margin: "2rem auto" }
      },
      {
        type: "timer",
        duration: 60,
        text: "זמן קריאה"
      }
    ]
  }
}; 