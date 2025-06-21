export const slide15SecurityFeatures = {
  id: "slide-15",
  type: "presentation",
  title: "תכונות אבטחה 🛡️",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "איך הדפדפן מגן עלינו?",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "subtitle",
        text: "תכונות אבטחה מובנות בדפדפן",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "🔒 HTTPS - הצפנת תעבורה",
          "🛡️ Sandbox - בידוד תהליכים",
          "🚫 Pop-up Blocker - חסימת חלונות קופצים",
          "⚠️ Security Warnings - אזהרות אבטחה",
          "🔍 Safe Browsing - גלישה בטוחה",
          "🔄 Auto-updates - עדכונים אוטומטיים"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", lineHeight: "2" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400",
        alt: "Security Features",
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