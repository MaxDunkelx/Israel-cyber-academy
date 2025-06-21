export const slide4BrowserTypes = {
  id: "slide-4",
  type: "presentation",
  title: "סוגי דפדפנים שונים 🌐",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "כל דפדפן הוא שונה",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "subtitle",
        text: "לכל דפדפן יש יתרונות וחסרונות משלו",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "grid",
        items: [
          {
            title: "Chrome",
            description: "מהיר, יציב, הרבה הרחבות",
            icon: "🌐",
            color: "#4285F4"
          },
          {
            title: "Firefox",
            description: "פרטיות טובה, קוד פתוח",
            icon: "🦊",
            color: "#FF7139"
          },
          {
            title: "Safari",
            description: "אופטימיזציה למכשירי Apple",
            icon: "🍎",
            color: "#0066CC"
          },
          {
            title: "Edge",
            description: "אינטגרציה עם Windows",
            icon: "🌊",
            color: "#0078D4"
          }
        ],
        style: { fontSize: "1.1rem", color: "white", textAlign: "center" }
      },
      {
        type: "timer",
        duration: 90,
        text: "זמן קריאה"
      }
    ]
  }
}; 