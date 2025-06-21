export const slide5HtmlBasics = {
  id: "slide-5",
  type: "presentation",
  title: "HTML - יסודות השפה 🌐",
  content: {
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    elements: [
      {
        type: "title",
        text: "HTML - מבנה האתר",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "HTML משתמש בתגיות (tags) כדי להגדיר את מבנה האתר",
        style: { fontSize: "1.4rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "📄 <html> - התחלה וסוף של האתר",
          "📝 <head> - מידע על האתר",
          "📄 <body> - התוכן שמוצג למשתמש",
          "📋 <h1> עד <h6> - כותרות",
          "📝 <p> - פסקאות טקסט",
          "🖼️ <img> - תמונות",
          "🔗 <a> - קישורים"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "כל תגית מתחילה ב-< ומסתיימת ב->",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", fontWeight: "bold" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
        alt: "HTML Structure",
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