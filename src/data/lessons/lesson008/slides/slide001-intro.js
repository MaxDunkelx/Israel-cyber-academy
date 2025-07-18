export const slide1Intro = {
  id: "slide-1",
  type: "content",
  title: "ברוכים הבאים לעולם התכנות! 💻",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "ברוכים הבאים לעולם התכנות! 💻",
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
        text: "היום נלמד איך לתת הוראות למחשב ולבנות תוכנות מדהימות",
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
        src: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&h=300&fit=crop",
        alt: "Programming Code",
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
            icon: "🧠",
            title: "חשיבה לוגית",
            description: "לחשוב כמו מחשב"
          },
          {
            icon: "🔧",
            title: "פתרון בעיות",
            description: "למצוא פתרונות יצירתיים"
          }
        ],
        style: { marginTop: "3rem" }
      },
      {
        type: "list",
        items: [
          "💻 נכיר שפות תכנות",
          "🔢 נלמד על משתנים ופונקציות",
          "🔄 נבין לולאות ותנאים",
          "🎮 נבנה משחק פשוט",
          "📱 ניצור אפליקציה",
          "🚀 נפרסם את הפרויקט"
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
        text: "💡 טיפ: תכנות הוא כמו לכתוב מתכון - צריך להיות מדויק וברור!",
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