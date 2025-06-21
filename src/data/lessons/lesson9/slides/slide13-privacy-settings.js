export const slide13PrivacySettings = {
  id: "slide-13",
  type: "presentation",
  title: "הגדרות פרטיות 🔒",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "איך להגן על הפרטיות?",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "subtitle",
        text: "הגדרות חשובות להגנה על המידע שלך",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "🍪 Cookies - ניהול עוגיות",
          "📊 Tracking - חסימת מעקב",
          "🔍 Search - חיפוש פרטי",
          "📱 Location - מיקום",
          "📷 Camera - מצלמה ומיקרופון",
          "🔔 Notifications - התראות"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", lineHeight: "2" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400",
        alt: "Privacy Settings",
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