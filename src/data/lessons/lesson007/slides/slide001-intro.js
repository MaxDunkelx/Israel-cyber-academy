export const slide1Intro = {
  id: "slide-1",
  type: "content",
  title: "ברוכים הבאים לעולם מסדי הנתונים! 🗄️",
  content: {
    background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    elements: [
      {
        type: "title",
        text: "ברוכים הבאים לעולם מסדי הנתונים! 🗄️",
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
        text: "היום נלמד איך לאחסן, לארגן ולשלוף מידע בצורה יעילה",
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
        src: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&h=300&fit=crop",
        alt: "Database Structure",
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
            icon: "📁",
            title: "קבצים רגילים",
            description: "מידע מפוזר ולא מאורגן"
          },
          {
            icon: "🗄️",
            title: "מסד נתונים",
            description: "מידע מאורגן ונגיש"
          }
        ],
        style: { marginTop: "3rem" }
      },
      {
        type: "list",
        items: [
          "🗄️ נכיר סוגי מסדי נתונים",
          "📊 נלמד על טבלאות ורשומות",
          "🔍 נבין שאילתות SQL",
          "🔧 נבנה מסד נתונים",
          "📈 נלמד על אינדקסים",
          "🛡️ נכיר אבטחת נתונים"
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
        text: "💡 טיפ: מסד נתונים הוא כמו ספרייה מאורגנת - כל המידע במקום הנכון וקל למצוא!",
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