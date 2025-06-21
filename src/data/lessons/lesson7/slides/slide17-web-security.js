export const slide17WebSecurity = {
  id: "slide-17",
  type: "presentation",
  title: "אבטחת אתרים - הגנה על האתר שלך 🔒",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "אבטחת אתרים",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "חשוב להגן על האתר שלך ועל המשתמשים שלך",
        style: { fontSize: "1.4rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "🔒 HTTPS - חיבור מאובטח",
          "🔑 סיסמאות חזקות - אותיות, מספרים וסימנים",
          "📝 בדיקת קלט - וידוא שהנתונים תקינים",
          "🛡️ הגנה מפני XSS - מניעת קוד זדוני",
          "📊 גיבוי נתונים - שמירת עותקים",
          "🔍 עדכונים - תיקוני אבטחה"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "אבטחה טובה מגנה עליך ועל המשתמשים שלך!",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", fontWeight: "bold" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
        alt: "Web Security",
        style: { width: "250px", borderRadius: "15px", margin: "2rem auto" }
      },
      {
        type: "timer",
        duration: 90,
        text: "זמן קריאה"
      }
    ]
  }
}; 