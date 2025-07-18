export const slide8CLIVsGUI = {
  id: "slide-8",
  type: "content",
  title: "CLI מול GUI - איך מתקשרים עם המחשב? ⌨️🖱️",
  content: {
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    elements: [
      {
        type: "title",
        text: "CLI מול GUI ⌨️🖱️",
        style: { 
          fontSize: "3.5rem", 
          color: "#2c3e50", 
          textAlign: "center", 
          marginBottom: "2rem", 
          fontWeight: "bold", 
          textShadow: "0 4px 8px rgba(0,0,0,0.2)"
        }
      },
      {
        type: "subtitle",
        text: "שתי דרכים לתקשר עם המחשב - טקסט או גרפיקה",
        style: { 
          fontSize: "1.6rem", 
          color: "#34495e", 
          textAlign: "center", 
          opacity: 0.9, 
          marginBottom: "3rem",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop",
        alt: "CLI vs GUI",
        style: { 
          width: "350px", 
          borderRadius: "20px", 
          margin: "2rem auto",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          border: "4px solid rgba(255,255,255,0.5)"
        }
      },
      {
        type: "comparison",
        items: [
          {
            icon: "⌨️",
            title: "CLI - Command Line Interface",
            description: "ממשק שורת פקודה - טקסט בלבד"
          },
          {
            icon: "🖱️",
            title: "GUI - Graphical User Interface",
            description: "ממשק גרפי - חלונות, כפתורים, תמונות"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "CLI - שורת פקודה:",
        items: [
          "⌨️ כותבים פקודות בטקסט",
          "⚡ מהיר וחזק",
          "💻 דורש ידע טכני",
          "🔧 מתאים למתכנתים",
          "📱 לא יפה אבל יעיל",
          "🖥️ מסך שחור עם טקסט לבן"
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
        title: "GUI - ממשק גרפי:",
        items: [
          "🖱️ לוחצים על כפתורים ואייקונים",
          "👁️ יפה וקל להבנה",
          "👶 מתאים לכולם",
          "🎨 צבעים, תמונות, אנימציות",
          "🖥️ חלונות, תפריטים, דיאלוגים",
          "📱 אינטואיטיבי ונוח"
        ],
        style: { 
          fontSize: "1.2rem",
          textAlign: "right",
          maxWidth: "600px",
          margin: "2rem auto"
        }
      },
      {
        type: "example",
        title: "דוגמה: מחיקת קובץ",
        scenarios: [
          {
            cli: "del filename.txt",
            gui: "לחיצה ימנית → מחיקה"
          },
          {
            cli: "mkdir folder",
            gui: "לחיצה ימנית → תיקייה חדשה"
          },
          {
            cli: "copy file1.txt file2.txt",
            gui: "גרירה עם העכבר"
          },
          {
            cli: "dir",
            gui: "פתיחת תיקייה"
          }
        ],
        style: { 
          fontSize: "1.1rem",
          textAlign: "right",
          maxWidth: "700px",
          margin: "2rem auto"
        }
      },
      {
        type: "list",
        title: "איפה משתמשים בכל אחד:",
        items: [
          "🖥️ Windows - בעיקר GUI, לפעמים CLI",
          "🍎 macOS - בעיקר GUI, לפעמים CLI",
          "🐧 Linux - שניהם, CLI יותר חזק",
          "📱 טלפונים - רק GUI",
          "🎮 קונסולות - בעיקר GUI",
          "🏢 שרתים - בעיקר CLI"
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
        text: "💡 טיפ: GUI קל יותר למתחילים, CLI חזק יותר למתקדמים!",
        style: { 
          fontSize: "1.2rem",
          marginTop: "2rem",
          padding: "1rem",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.3)",
          border: "2px solid rgba(0,0,0,0.1)"
        }
      }
    ]
  }
}; 