export const slide5TypesOfOS = {
  id: "slide-5",
  type: "content",
  title: "סוגי מערכות הפעלה - איזה יש בעולם? 🌍",
  content: {
    background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
    elements: [
      {
        type: "title",
        text: "סוגי מערכות הפעלה 🌍",
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
        text: "הכרת מערכות ההפעלה השונות - למחשבים, לטלפונים ולמכשירים אחרים",
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
        alt: "Types of Operating Systems",
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
        title: "מערכות הפעלה למחשבים:",
        items: [
          "🪟 Windows - הנפוצה ביותר בעולם",
          "🍎 macOS - של חברת Apple",
          "🐧 Linux - חינמית ופתוחה",
          "🔵 Chrome OS - של Google",
          "🟣 Ubuntu - גרסה פופולרית של Linux",
          "🔴 Fedora - גרסה מתקדמת של Linux"
        ],
        style: { 
          fontSize: "1.2rem",
          textAlign: "right",
          maxWidth: "600px",
          margin: "2rem auto"
        }
      },
      {
        type: "list",
        title: "מערכות הפעלה למובייל:",
        items: [
          "🤖 Android - של Google, הנפוצה ביותר",
          "🍎 iOS - של Apple, לאייפון ואייפד",
          "📱 iPadOS - של Apple, לאייפד בלבד",
          "🟢 HarmonyOS - של Huawei",
          "🔵 KaiOS - לטלפונים פשוטים",
          "🟣 Tizen - של Samsung"
        ],
        style: { 
          fontSize: "1.2rem",
          textAlign: "right",
          maxWidth: "600px",
          margin: "2rem auto"
        }
      },
      {
        type: "list",
        title: "מערכות הפעלה למכשירים מיוחדים:",
        items: [
          "🎮 PlayStation OS - לקונסולות משחק",
          "🎮 Xbox OS - לקונסולות Microsoft",
          "📺 Smart TV OS - לטלוויזיות חכמות",
          "🚗 Car OS - למכוניות חכמות",
          "🏠 Home OS - לבית חכם",
          "📱 Wear OS - לשעונים חכמים"
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
            title: "Windows",
            description: "הכי נפוצה, קלה לשימוש"
          },
          {
            icon: "🍎",
            title: "macOS",
            description: "יפה ועיצובית, יקרה"
          },
          {
            icon: "🐧",
            title: "Linux",
            description: "חינמית, מתקדמת"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        items: [
          {
            icon: "🤖",
            title: "Android",
            description: "הכי נפוצה, גמישה"
          },
          {
            icon: "🍎",
            title: "iOS",
            description: "בטוחה, יקרה"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "tip",
        text: "💡 טיפ: כל מערכת הפעלה יש לה יתרונות וחסרונות - חשוב לבחור מה שמתאים לכם!",
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