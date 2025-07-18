export const slide1Intro = {
  id: "slide-1",
  type: "content",
  title: "ברוכים הבאים לעולם החומרה! 💻",
  content: {
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    elements: [
      {
        type: "title",
        text: "ברוכים הבאים לעולם החומרה! 💻",
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
        text: "היום נכיר את הרכיבים שמרכיבים את המחשב ונלמד איך הם עובדים יחד",
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
        src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop",
        alt: "Computer Hardware",
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
            icon: "🔧",
            title: "חומרה",
            description: "החלקים הפיזיים של המחשב"
          },
          {
            icon: "💾",
            title: "תוכנה",
            description: "ההוראות שמפעילות את המחשב"
          }
        ],
        style: { marginTop: "3rem" }
      },
      {
        type: "list",
        items: [
          "🖥️ נכיר את הרכיבים העיקריים",
          "⚡ נבין איך הם עובדים יחד",
          "🔧 נשחק בסימולטור בניית מחשב",
          "📊 נבדוק מפרטים מומלצים",
          "🎮 נבחן את הידע שלנו"
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
        text: "💡 טיפ: דמיינו את המחשב כמו גוף האדם - כל חלק יש לו תפקיד חשוב!",
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