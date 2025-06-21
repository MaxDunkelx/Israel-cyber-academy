export const slide12Extensions = {
  id: "slide-12",
  type: "presentation",
  title: "הרחבות דפדפן 🔌",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "הרחבות - הוספת יכולות",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "subtitle",
        text: "הרחבות מוסיפות פונקציונליות לדפדפן",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "🛡️ AdBlock - חסימת פרסומות",
          "🔒 Password Manager - מנהל סיסמאות",
          "🌐 Translator - תרגום דפים",
          "📝 Note Taking - רישום הערות",
          "🎨 Dark Mode - מצב כהה",
          "📊 Productivity - כלי פרודוקטיביות"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", lineHeight: "2" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400",
        alt: "Browser Extensions",
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