export const slide2Welcome = {
  id: "slide-2",
  type: "content",
  title: "ברוכים הבאים לעולם החומרה! 🖥️",
  content: {
    background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    elements: [
      {
        type: "title",
        text: "ברוכים הבאים לעולם החומרה! 🖥️",
        style: { 
          fontSize: "3.5rem", 
          color: "white", 
          textAlign: "center", 
          marginBottom: "2rem", 
          fontWeight: "bold", 
          textShadow: "0 8px 16px rgba(0,0,0,0.4)"
        }
      },
      {
        type: "subtitle",
        text: "היום נלמד על כל החלקים שמרכיבים את המחשב ואיך הם עובדים יחד",
        style: { 
          fontSize: "1.6rem", 
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
          width: "350px", 
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
            icon: "🏗️",
            title: "חומרה",
            description: "החלקים הפיזיים של המחשב"
          },
          {
            icon: "💻",
            title: "תוכנה",
            description: "ההוראות שמפעילות את המחשב"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "מה נלמד היום:",
        items: [
          "🧠 המעבד (CPU) - המוח של המחשב",
          "💾 הזיכרון (RAM) - הזיכרון הקצר",
          "💿 הדיסק הקשיח - הזיכרון הארוך",
          "🖥️ המסך - איך רואים את המידע",
          "⌨️ המקלדת והעכבר - איך מתקשרים",
          "🔌 כרטיס המסך - איך רואים תמונות"
        ],
        style: { 
          fontSize: "1.3rem",
          textAlign: "right",
          maxWidth: "600px",
          margin: "2rem auto"
        }
      },
      {
        type: "tip",
        text: "💡 טיפ: המחשב הוא כמו גוף האדם - יש לו מוח, זיכרון, עיניים וידיים!",
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