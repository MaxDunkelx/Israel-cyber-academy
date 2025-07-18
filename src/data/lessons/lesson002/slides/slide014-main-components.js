export const slide14MainComponents = {
  id: "slide-14",
  type: "content",
  title: "הרכיבים העיקריים של המחשב - מה יש בפנים? 🔧",
  content: {
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    elements: [
      {
        type: "title",
        text: "הרכיבים העיקריים של המחשב 🔧",
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
        text: "החלקים החשובים שמרכיבים את המחשב ואיך הם עובדים יחד",
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
        alt: "Computer Components",
        style: { 
          width: "350px", 
          borderRadius: "20px", 
          margin: "2rem auto",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          border: "4px solid rgba(255,255,255,0.2)"
        }
      },
      {
        type: "list",
        title: "הרכיבים העיקריים:",
        items: [
          "🧠 מעבד (CPU) - המוח של המחשב",
          "💾 זיכרון (RAM) - הזיכרון הקצר",
          "💿 דיסק קשיח (HDD/SSD) - הזיכרון הארוך",
          "🖥️ כרטיס מסך (GPU) - מציג תמונות",
          "🔌 לוח אם (Motherboard) - מחבר הכל יחד",
          "⚡ ספק כוח (PSU) - מספק חשמל"
        ],
        style: { 
          fontSize: "1.3rem",
          textAlign: "right",
          maxWidth: "600px",
          margin: "2rem auto"
        }
      },
      {
        type: "comparison",
        items: [
          {
            icon: "🧠",
            title: "מעבד (CPU)",
            description: "המוח - חושב ומחשב"
          },
          {
            icon: "💾",
            title: "זיכרון (RAM)",
            description: "הזיכרון - שומר מידע זמני"
          },
          {
            icon: "💿",
            title: "דיסק קשיח",
            description: "הארכיון - שומר מידע קבוע"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "רכיבים נוספים:",
        items: [
          "🔊 כרטיס קול - משמיע צלילים",
          "📡 כרטיס רשת - מתחבר לאינטרנט",
          "🔌 כרטיסי הרחבה - מוסיף יכולות",
          "💨 מאווררים - מקרר את המחשב",
          "🔋 סוללה - בטלפונים ולפטופים",
          "📷 מצלמה - מצלמת תמונות"
        ],
        style: { 
          fontSize: "1.2rem",
          textAlign: "right",
          maxWidth: "600px",
          margin: "2rem auto"
        }
      },
      {
        type: "tip",
        text: "💡 טיפ: כל הרכיבים עובדים יחד כמו צוות - כל אחד יש לו תפקיד חשוב!",
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