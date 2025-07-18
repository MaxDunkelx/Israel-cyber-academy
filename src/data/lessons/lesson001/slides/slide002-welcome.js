export const slide1aWelcome = {
  id: "slide-1a",
  type: "content",
  title: "מה נלמד היום? 📚",
  content: {
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    elements: [
      {
        type: "title",
        text: "מה נלמד היום? 📚",
        style: { 
          fontSize: "3.5rem", 
          color: "white", 
          textAlign: "center", 
          marginBottom: "2rem", 
          fontWeight: "bold", 
          textShadow: "0 6px 12px rgba(0,0,0,0.3)"
        }
      },
      {
        type: "list",
        items: [
          "🔍 הכרת סוגי האקרים השונים",
          "🎬 צפייה בסרטונים מרתקים",
          "🎮 משחקים אינטראקטיביים",
          "🛡️ כלי אבטחה דיגיטלית",
          "🔐 יצירת סיסמאות חזקות",
          "⚡ זיהוי איומים דיגיטליים",
          "🏆 חידון מסכם"
        ],
        style: { 
          fontSize: "1.4rem",
          textAlign: "right",
          maxWidth: "600px",
          margin: "0 auto"
        }
      },
      {
        type: "definition",
        text: "סייבר אבטחה היא הגנה על מערכות מחשב, רשתות ותוכנות מפני התקפות דיגיטליות",
        style: { 
          marginTop: "3rem",
          background: "rgba(255,255,255,0.15)",
          border: "3px solid rgba(255,255,255,0.3)"
        }
      },
      {
        type: "animation",
        element: "🔄",
        style: { 
          fontSize: "4rem",
          marginTop: "2rem",
          animation: "spin 3s linear infinite"
        }
      }
    ]
  }
}; 