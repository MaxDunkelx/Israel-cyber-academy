export const slide6WindowsHistory = {
  id: "slide-6",
  type: "content",
  title: "היסטוריה של Windows - איך הכל התחיל? 🪟",
  content: {
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    elements: [
      {
        type: "title",
        text: "היסטוריה של Windows 🪟",
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
        text: "איך Windows הפכה למערכת ההפעלה הפופולרית ביותר בעולם",
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
        alt: "Windows History",
        style: { 
          width: "350px", 
          borderRadius: "20px", 
          margin: "2rem auto",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          border: "4px solid rgba(255,255,255,0.2)"
        }
      },
      {
        type: "timeline",
        title: "ציר זמן של Windows:",
        events: [
          {
            year: "1985",
            title: "Windows 1.0",
            description: "הגרסה הראשונה עם חלונות",
            icon: "🪟"
          },
          {
            year: "1990",
            title: "Windows 3.0",
            description: "הגרסה הראשונה שהצליחה",
            icon: "🪟"
          },
          {
            year: "1995",
            title: "Windows 95",
            description: "המהפכה - כפתור התחל",
            icon: "🪟"
          },
          {
            year: "2001",
            title: "Windows XP",
            description: "הגרסה הכי פופולרית",
            icon: "🪟"
          },
          {
            year: "2009",
            title: "Windows 7",
            description: "יציבה ומהירה",
            icon: "🪟"
          },
          {
            year: "2015",
            title: "Windows 10",
            description: "מודרנית ומתקדמת",
            icon: "🪟"
          },
          {
            year: "2021",
            title: "Windows 11",
            description: "הגרסה החדשה ביותר",
            icon: "🪟"
          }
        ],
        style: { 
          fontSize: "1.2rem",
          textAlign: "right",
          maxWidth: "700px",
          margin: "2rem auto"
        }
      },
      {
        type: "list",
        title: "השינויים הגדולים:",
        items: [
          "🖥️ מממשק טקסט לחלונות גרפיים",
          "🖱️ מעכבר פשוט לעכבר מתקדם",
          "🌐 מחיבור לאינטרנט לגלישה מהירה",
          "🎮 ממשחקים פשוטים למשחקים מתקדמים",
          "📱 ממחשב שולחני למובייל",
          "☁️ משמירה מקומית לענן"
        ],
        style: { 
          fontSize: "1.2rem",
          textAlign: "right",
          maxWidth: "600px",
          margin: "2rem auto"
        }
      },
      {
        type: "comparison",
        items: [
          {
            icon: "🪟",
            title: "Windows ישן",
            description: "פשוט, בסיסי, איטי"
          },
          {
            icon: "🪟",
            title: "Windows חדש",
            description: "מתקדם, מהיר, יפה"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "tip",
        text: "💡 טיפ: Windows 95 הייתה המהפכה האמיתית - היא הכניסה את כפתור התחל!",
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