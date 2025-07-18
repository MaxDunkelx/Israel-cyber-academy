export const slide4HistoryOfComputers = {
  id: "slide-4",
  type: "content",
  title: "היסטוריה של המחשבים - איך הכל התחיל? 📚",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "היסטוריה של המחשבים 📚",
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
        text: "איך המחשבים התפתחו מחדרים ענקיים למכשירים קטנים בכיס",
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
        alt: "Computer History",
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
        title: "ציר זמן של המחשבים:",
        events: [
          {
            year: "1940s",
            title: "המחשבים הראשונים",
            description: "מחשבים ענקיים שמילאו חדרים שלמים",
            icon: "🏢"
          },
          {
            year: "1960s",
            title: "מחשבים אישיים ראשונים",
            description: "מחשבים קטנים יותר לשימוש אישי",
            icon: "🖥️"
          },
          {
            year: "1980s",
            title: "מחשבי IBM",
            description: "המחשבים האישיים הפכו נפוצים",
            icon: "💻"
          },
          {
            year: "1990s",
            title: "מחשבים ניידים",
            description: "לפטופים ומחשבים ניידים",
            icon: "📱"
          },
          {
            year: "2000s",
            title: "סמארטפונים",
            description: "מחשבים בכיס - הטלפונים החכמים",
            icon: "📱"
          },
          {
            year: "היום",
            title: "מחשבים בכל מקום",
            description: "מחשבים בבתים, במשרדים, במכוניות",
            icon: "🌍"
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
        type: "comparison",
        items: [
          {
            icon: "🏢",
            title: "מחשבים ישנים",
            description: "גדולים, איטיים, יקרים"
          },
          {
            icon: "📱",
            title: "מחשבים היום",
            description: "קטנים, מהירים, זולים"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "איך המחשבים השתנו:",
        items: [
          "📏 גודל - מחדרים שלמים לכיס",
          "⚡ מהירות - מכמה פעולות לשנייה למיליארדים",
          "💰 מחיר - ממיליוני דולרים למאות",
          "🔋 צריכת חשמל - מכמויות ענק למינימום",
          "🎮 יכולות - מחישובים פשוטים למשחקים מורכבים",
          "🌐 חיבור - מבדידות לאינטרנט עולמי"
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
        text: "💡 טיפ: המחשב הראשון היה גדול כמו בית שלם! היום יש לנו מחשבים חזקים יותר בטלפון!",
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