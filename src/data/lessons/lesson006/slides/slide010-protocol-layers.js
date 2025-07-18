export const slide10ProtocolLayers = {
  id: "slide-10",
  type: "content",
  title: "שכבות הפרוטוקול (OSI) 📊",
  content: {
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    elements: [
      {
        type: "title",
        text: "שכבות הפרוטוקול (OSI) 📊",
        style: { 
          fontSize: "4rem", 
          color: "white", 
          textAlign: "center", 
          marginBottom: "2rem", 
          fontWeight: "bold", 
          textShadow: "0 8px 16px rgba(0,0,0,0.4)"
        }
      },
      {
        type: "definition",
        term: "OSI Model",
        definition: "Open Systems Interconnection - מודל של 7 שכבות שמתאר איך מכשירים מתקשרים ברשת",
        style: { 
          fontSize: "1.5rem",
          marginBottom: "2rem",
          padding: "1.5rem",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.1)",
          border: "2px solid rgba(255,255,255,0.3)"
        }
      },
      {
        type: "specs",
        title: "7 שכבות OSI:",
        items: [
          {
            name: "שכבה 7 - Application",
            description: "יישומים כמו דפדפן, מייל",
            icon: "💻"
          },
          {
            name: "שכבה 6 - Presentation",
            description: "הצגת נתונים, הצפנה",
            icon: "🎨"
          },
          {
            name: "שכבה 5 - Session",
            description: "ניהול חיבורים",
            icon: "🤝"
          },
          {
            name: "שכבה 4 - Transport",
            description: "TCP, UDP - אמינות",
            icon: "📦"
          },
          {
            name: "שכבה 3 - Network",
            description: "IP - ניתוב",
            icon: "🌐"
          },
          {
            name: "שכבה 2 - Data Link",
            description: "Ethernet - מסגרות",
            icon: "🔗"
          },
          {
            name: "שכבה 1 - Physical",
            description: "כבלים, אותות",
            icon: "🔌"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "tip",
        text: "💡 טיפ: כל שכבה מתקשרת רק עם השכבות שמעליה ומתחתיה!",
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