export const slide19WebHosting = {
  id: "slide-19",
  type: "content",
  title: "אירוח אתרים - איך מעלים אתר לאינטרנט? 🌐",
  content: {
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    elements: [
      {
        type: "title",
        text: "אירוח אתרים - איך מעלים אתר לאינטרנט? 🌐",
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
        term: "אירוח אתרים",
        definition: "שירות שמאפשר לשים את האתר על שרת כדי שיהיה נגיש באינטרנט",
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
        title: "סוגי אירוח:",
        items: [
          {
            name: "Shared Hosting",
            description: "אירוח משותף - זול למתחילים",
            icon: "🏠"
          },
          {
            name: "VPS",
            description: "שרת פרטי וירטואלי",
            icon: "🖥️"
          },
          {
            name: "Dedicated Server",
            description: "שרת ייעודי - יקר וחזק",
            icon: "💪"
          },
          {
            name: "Cloud Hosting",
            description: "אירוח בענן - גמיש ומודרני",
            icon: "☁️"
          },
          {
            name: "Free Hosting",
            description: "אירוח חינמי - מוגבל",
            icon: "🆓"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        title: "שירותי אירוח פופולריים:",
        items: [
          {
            icon: "🌐",
            title: "Netlify",
            description: "חינמי לאתרים סטטיים"
          },
          {
            icon: "🚀",
            title: "Vercel",
            description: "מעולה לאפליקציות React"
          },
          {
            icon: "☁️",
            title: "GitHub Pages",
            description: "חינמי עם GitHub"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "שלבים להעלאת אתר:",
        items: [
          "בחרו שירות אירוח",
          "רשמו דומיין (שם האתר)",
          "הכינו את קבצי האתר",
          "העלו את הקבצים לשרת",
          "בדקו שהאתר עובד",
          "הגדירו SSL (HTTPS)"
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
        text: "💡 טיפ: התחילו עם שירותים חינמיים כמו Netlify או GitHub Pages!",
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