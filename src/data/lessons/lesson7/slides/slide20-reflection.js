export const slide20Reflection = {
  id: "slide-20",
  type: "reflection",
  title: "הרהור - מה למדתי? 🤔",
  content: {
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    elements: [
      {
        type: "title",
        text: "הרהור על השיעור",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "קח רגע לחשוב על מה שלמדת היום",
        style: { fontSize: "1.4rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "💻 מה היה הכי מעניין בתכנות?",
          "🌐 איזה חלק של בניית אתרים אהבת?",
          "🎨 מה היה הכי קשה ב-CSS?",
          "⚡ מה היה הכי מרתק ב-JavaScript?",
          "🏗️ איך הרגשת כשבנית אתר משלך?",
          "🚀 מה תרצה ללמוד בהמשך?"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "כל אחד לומד בדרך שלו - זה בסדר!",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", fontWeight: "bold" }
      },
      {
        type: "message-box",
        placeholder: "כתוב כאן את המחשבות שלך על השיעור...",
        style: { 
          width: "100%", 
          minHeight: "120px", 
          padding: "1rem", 
          borderRadius: "10px", 
          border: "2px solid white",
          backgroundColor: "rgba(255,255,255,0.1)",
          color: "white",
          fontSize: "1rem"
        }
      },
      {
        type: "timer",
        duration: 180,
        text: "זמן הרהור"
      }
    ]
  }
}; 