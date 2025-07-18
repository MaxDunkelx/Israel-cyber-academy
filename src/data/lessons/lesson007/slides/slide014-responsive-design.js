export const slide14ResponsiveDesign = {
  id: "slide-14",
  type: "content",
  title: "עיצוב רספונסיבי - התאמה לכל המסכים 📱",
  content: {
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    elements: [
      {
        type: "title",
        text: "עיצוב רספונסיבי - התאמה לכל המסכים 📱",
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
        term: "עיצוב רספונסיבי",
        definition: "עיצוב שמתאים את עצמו אוטומטית לגודל המסך של המכשיר",
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
        title: "סוגי מסכים:",
        items: [
          {
            name: "מחשב שולחני",
            description: "מסך גדול - 1920x1080",
            icon: "🖥️"
          },
          {
            name: "טאבלט",
            description: "מסך בינוני - 768x1024",
            icon: "📱"
          },
          {
            name: "סמארטפון",
            description: "מסך קטן - 375x667",
            icon: "📱"
          },
          {
            name: "מסך גדול מאוד",
            description: "TV או מוניטור - 4K",
            icon: "📺"
          },
          {
            name: "מסך קטן מאוד",
            description: "שעון חכם - 240x240",
            icon: "⌚"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        title: "איך עושים את זה:",
        items: [
          {
            icon: "📏",
            title: "Media Queries",
            description: "@media (max-width: 768px) { }"
          },
          {
            icon: "📦",
            title: "Flexbox/Grid",
            description: "display: flex; flex-wrap: wrap;"
          },
          {
            icon: "📐",
            title: "יחידות יחסיות",
            description: "%, vw, vh, rem"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "עקרונות עיצוב רספונסיבי:",
        items: [
          "Mobile First - מתחילים ממסך קטן",
          "גמישות - אלמנטים שמשתנים בגודל",
          "ניווט מותאם - תפריט המבורגר במסך קטן",
          "תמונות מותאמות - שינוי גודל אוטומטי",
          "טקסט קריא - גודל מותאם למסך"
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
        text: "💡 טיפ: תמיד בדקו את האתר במסכים שונים!",
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