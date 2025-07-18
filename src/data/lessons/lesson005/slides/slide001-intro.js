export const slide1Intro = {
  id: "slide-1",
  type: "content",
  title: "ברוכים הבאים לעולם הרשתות! 🌐",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "ברוכים הבאים לעולם הרשתות! 🌐",
        style: { 
          fontSize: "4rem", 
          color: "white", 
          textAlign: "center", 
          marginBottom: "2rem", 
          fontWeight: "bold", 
          textShadow: "0 8px 16px rgba(0,0,0,0.4)",
          animation: "fadeInUp 1s ease-out"
        }
      },
      {
        type: "subtitle",
        text: "היום נלמד איך המחשבים מתקשרים ביניהם ואיך האינטרנט עובד",
        style: { 
          fontSize: "1.8rem", 
          color: "white", 
          textAlign: "center", 
          opacity: 0.95, 
          marginBottom: "3rem",
          textShadow: "0 4px 8px rgba(0,0,0,0.3)"
        }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop",
        alt: "Network Connections",
        style: { 
          width: "400px", 
          borderRadius: "20px", 
          margin: "2rem auto",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          border: "4px solid rgba(255,255,255,0.2)"
        }
      },
      {
        type: "comparison",
        items: [
          {
            icon: "🏠",
            title: "רשת מקומית",
            description: "מחשבים בבית או במשרד"
          },
          {
            icon: "🌍",
            title: "האינטרנט",
            description: "רשת עולמית של מחשבים"
          }
        ],
        style: { marginTop: "3rem" }
      },
      {
        type: "list",
        items: [
          "🌐 נבין איך רשתות עובדות",
          "📡 נלמד על פרוטוקולים",
          "🔌 נכיר סוגי חיבורים",
          "🛡️ נבין אבטחת רשת",
          "📶 נלמד על Wi-Fi",
          "☁️ נכיר מחשוב ענן"
        ],
        style: { 
          fontSize: "1.4rem",
          textAlign: "right",
          maxWidth: "600px",
          margin: "2rem auto"
        }
      },
      {
        type: "tip",
        text: "💡 טיפ: רשתות הן כמו כבישים דיגיטליים - צריך להבין איך התנועה זורמת!",
        style: { 
          fontSize: "1.2rem",
          marginTop: "2rem",
          padding: "1rem",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.1)",
          border: "2px solid rgba(255,255,255,0.3)"
        }
      }
    ]
  }
}; 