export const slide15WebDevelopmentTools = {
  id: "slide-15",
  type: "content",
  title: "כלים לפיתוח אתרים - איזה כלים נצטרך? 🛠️",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "כלים לפיתוח אתרים - איזה כלים נצטרך? 🛠️",
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
        type: "specs",
        title: "כלים בסיסיים:",
        items: [
          {
            name: "עורך קוד",
            description: "VS Code, Sublime Text, Atom",
            icon: "📝"
          },
          {
            name: "דפדפן",
            description: "Chrome, Firefox, Safari",
            icon: "🌐"
          },
          {
            name: "כלי פיתוח",
            description: "Developer Tools בדפדפן",
            icon: "🔧"
          },
          {
            name: "Git",
            description: "ניהול גרסאות וקוד",
            icon: "📚"
          },
          {
            name: "שרת מקומי",
            description: "Live Server, XAMPP",
            icon: "🖥️"
          },
          {
            name: "כלי עיצוב",
            description: "Figma, Adobe XD",
            icon: "🎨"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        title: "עורך קוד מומלץ למתחילים:",
        items: [
          {
            icon: "📝",
            title: "Visual Studio Code",
            description: "חינמי, קל לשימוש, הרבה תוספים"
          },
          {
            icon: "🌐",
            title: "Live Server",
            description: "מראה שינויים בזמן אמת"
          },
          {
            icon: "🔧",
            title: "Extensions",
            description: "Emmet, Prettier, Live Server"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "איך להתחיל:",
        items: [
          "הורידו Visual Studio Code",
          "התקינו את התוסף Live Server",
          "צרו תיקייה לפרויקט",
          "פתחו קובץ HTML ראשון",
          "התחילו לכתוב קוד!"
        ],
        style: { 
          fontSize: "1.3rem",
          marginTop: "2rem",
          padding: "1rem",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.1)"
        }
      },
      {
        type: "tip",
        text: "💡 טיפ: VS Code הוא הכלי הכי פופולרי למפתחי ווב!",
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