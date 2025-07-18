export const slide1Intro = {
  id: "slide-1",
  type: "content",
  title: "ברוכים הבאים לעולם פיתוח האינטרנט! 🌐",
  content: {
    background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
    elements: [
      {
        type: "title",
        text: "ברוכים הבאים לעולם פיתוח האינטרנט! 🌐",
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
        text: "היום נלמד איך לבנות אתרים ואפליקציות אינטרנט מדהימות",
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
        src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop",
        alt: "Web Development",
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
            icon: "🎨",
            title: "Frontend",
            description: "מה שהמשתמש רואה"
          },
          {
            icon: "⚙️",
            title: "Backend",
            description: "הלוגיקה שמאחורי הקלעים"
          }
        ],
        style: { marginTop: "3rem" }
      },
      {
        type: "list",
        items: [
          "🌐 נכיר את שפות האינטרנט",
          "🎨 נלמד HTML ו-CSS",
          "⚡ נבין JavaScript",
          "🔧 נבנה אתר ראשון",
          "📱 נלמד על רספונסיביות",
          "🚀 נפרסם את האתר"
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
        text: "💡 טיפ: פיתוח אינטרנט הוא כמו לבנות בית - מתחילים ביסודות ובונים קומה אחרי קומה!",
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