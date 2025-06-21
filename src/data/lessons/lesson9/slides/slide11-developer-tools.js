export const slide11DeveloperTools = {
  id: "slide-11",
  type: "presentation",
  title: "כלי מפתח 🔧",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "כלי מפתח - F12",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "subtitle",
        text: "כלים מתקדמים למפתחים ולמתעניינים",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "🔍 Elements - בדיקת מבנה הדף",
          "📊 Console - הודעות שגיאה ובדיקות",
          "🌐 Network - מעקב אחר בקשות רשת",
          "💾 Application - ניהול אחסון מקומי",
          "⚡ Performance - בדיקת ביצועים",
          "🔒 Security - בדיקת אבטחה"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", lineHeight: "2" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400",
        alt: "Developer Tools",
        style: { width: "300px", borderRadius: "15px", margin: "2rem auto" }
      },
      {
        type: "timer",
        duration: 90,
        text: "זמן קריאה"
      }
    ]
  }
}; 