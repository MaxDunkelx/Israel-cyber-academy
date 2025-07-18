export const slide21Cpu = {
  id: "slide-21",
  type: "content",
  title: "המעבד (CPU) - המוח של המחשב 🧠",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "המעבד (CPU) - המוח של המחשב 🧠",
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
        type: "subtitle",
        text: "הרכיב החשוב ביותר במחשב - אחראי על כל החישובים והפעולות",
        style: { 
          fontSize: "1.5rem", 
          color: "white", 
          textAlign: "center", 
          opacity: 0.95, 
          marginBottom: "3rem",
          textShadow: "0 4px 8px rgba(0,0,0,0.3)"
        }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop",
        alt: "CPU Processor",
        style: { 
          width: "350px", 
          borderRadius: "20px", 
          margin: "2rem auto",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          border: "4px solid rgba(255,255,255,0.2)"
        }
      },
      {
        type: "specs",
        items: [
          { icon: "⚡", component: "מהירות", spec: "נמדדת בגיגה-הרץ (GHz) - כמה חישובים בשנייה" },
          { icon: "🔄", component: "ליבות", spec: "מספר המעבדים הקטנים שבתוך המעבד הראשי" },
          { icon: "🔥", component: "חום", spec: "מעבדים מתחממים וצריכים מאוורר לקירור" },
          { icon: "💾", component: "Cache", spec: "זיכרון מהיר מאוד בתוך המעבד עצמו" },
          { icon: "🔌", component: "Socket", spec: "החיבור ללוח האם - חייב להתאים" },
          { icon: "💰", component: "מחיר", spec: "המעבד הוא הרכיב היקר ביותר במחשב" }
        ],
        style: { marginBottom: "3rem" }
      },
      {
        type: "comparison",
        items: [
          {
            icon: "🚀",
            title: "מעבד חזק",
            description: "מהיר יותר, יותר ליבות, עובד טוב עם משחקים ותוכנות כבדות"
          },
          {
            icon: "🐌",
            title: "מעבד חלש",
            description: "איטי יותר, פחות ליבות, מתאים לעבודה בסיסית בלבד"
          }
        ],
        style: { marginBottom: "3rem" }
      },
      {
        type: "list",
        items: [
          "🧠 המעבד הוא כמו המוח של המחשב",
          "⚡ הוא מבצע מיליארדי חישובים בשנייה",
          "🔄 כל פעולה במחשב עוברת דרך המעבד",
          "🔥 הוא מתחמם מאוד וצריך קירור",
          "💡 ככל שיש יותר ליבות, המחשב יכול לעשות יותר דברים במקביל",
          "📊 מהירות המעבד משפיעה על ביצועי המחשב"
        ],
        style: { 
          fontSize: "1.3rem",
          textAlign: "right",
          maxWidth: "600px",
          margin: "0 auto"
        }
      },
      {
        type: "definition",
        text: "CPU = Central Processing Unit - היחידה המרכזית לעיבוד נתונים. זה הרכיב שמחליט מה המחשב יעשה בכל רגע.",
        style: { 
          marginTop: "3rem",
          background: "rgba(255,255,255,0.15)",
          border: "3px solid rgba(255,255,255,0.3)",
          padding: "2rem"
        }
      },
      {
        type: "tip",
        text: "💡 טיפ: כשאתם קונים מחשב, המעבד הוא הרכיב החשוב ביותר - השקיעו בו!",
        style: { 
          fontSize: "1.3rem",
          marginTop: "2rem",
          padding: "1.5rem",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.1)",
          border: "2px solid rgba(255,255,255,0.3)"
        }
      }
    ]
  }
}; 