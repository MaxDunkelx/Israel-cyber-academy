export const slide5HtmlBasics = {
  id: "slide-5",
  type: "content",
  title: "HTML - השפה של האינטרנט 🌐",
  content: {
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    elements: [
      {
        type: "title",
        text: "HTML - השפה של האינטרנט 🌐",
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
        term: "HTML",
        definition: "HyperText Markup Language - שפת סימון היפר-טקסט לבניית דפי אינטרנט",
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
        title: "תגיות HTML בסיסיות:",
        items: [
          {
            name: "<html>",
            description: "תגית הבסיס של כל דף",
            icon: "📄"
          },
          {
            name: "<head>",
            description: "מידע על הדף (כותרת, מטא-דאטה)",
            icon: "📋"
          },
          {
            name: "<body>",
            description: "התוכן הנראה בדף",
            icon: "👤"
          },
          {
            name: "<h1> עד <h6>",
            description: "כותרות ברמות שונות",
            icon: "📝"
          },
          {
            name: "<p>",
            description: "פסקה של טקסט",
            icon: "📖"
          },
          {
            name: "<img>",
            description: "תמונה",
            icon: "🖼️"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        title: "מבנה דף HTML:",
        items: [
          {
            icon: "📄",
            title: "HTML",
            description: "המעטפת החיצונית"
          },
          {
            icon: "📋",
            title: "HEAD",
            description: "מידע על הדף"
          },
          {
            icon: "👤",
            title: "BODY",
            description: "התוכן הנראה"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "tip",
        text: "💡 טיפ: HTML הוא כמו השלד של הבית - הוא נותן מבנה לדף!",
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