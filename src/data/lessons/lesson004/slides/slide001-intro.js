export const slide1Intro = {
  id: "slide-1",
  type: "content",
  title: "ברוכים הבאים לעולם Linux! 🐧",
  content: {
    background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    elements: [
      {
        type: "title",
        text: "ברוכים הבאים לעולם Linux! 🐧",
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
        text: "היום נלמד על מערכת ההפעלה הפתוחה והחזקה ביותר בעולם",
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
        src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop",
        alt: "Linux Terminal",
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
            icon: "🐧",
            title: "Linux",
            description: "מערכת הפעלה פתוחה וחופשית"
          },
          {
            icon: "🪟",
            title: "Windows",
            description: "מערכת הפעלה מסחרית"
          }
        ],
        style: { marginTop: "3rem" }
      },
      {
        type: "list",
        items: [
          "🐧 נכיר את עולם Linux",
          "💻 נלמד על הטרמינל",
          "📁 נבין מערכת הקבצים",
          "🔧 נשתמש בפקודות בסיסיות",
          "🛡️ נכיר כלי אבטחה",
          "📦 נלמד על מנהל החבילות"
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
        text: "💡 טיפ: Linux הוא כמו מכונית עם מנוע פתוח - אפשר לראות איך הכל עובד ולשנות!",
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