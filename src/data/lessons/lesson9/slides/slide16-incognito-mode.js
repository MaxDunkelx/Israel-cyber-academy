export const slide16IncognitoMode = {
  id: "slide-16",
  type: "presentation",
  title: "מצב פרטי 🕵️",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "מצב פרטי - מה זה?",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "subtitle",
        text: "גלישה ללא שמירת היסטוריה",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "🚫 לא שומר היסטוריה",
          "🍪 לא שומר עוגיות",
          "🔍 לא שומר חיפושים",
          "📝 לא שומר טפסים",
          "⚠️ לא מגן מפני האקרים",
          "📱 לא מגן מפני מעקב רשת"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", lineHeight: "2" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400",
        alt: "Incognito Mode",
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