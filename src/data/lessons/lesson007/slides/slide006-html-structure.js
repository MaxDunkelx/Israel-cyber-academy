export const slide6HtmlStructure = {
  id: "slide-6",
  type: "content",
  title: "מבנה דף HTML - איך בונים דף? 🏗️",
  content: {
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    elements: [
      {
        type: "title",
        text: "מבנה דף HTML - איך בונים דף? 🏗️",
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
        title: "מבנה בסיסי של דף HTML:",
        items: [
          {
            name: "<!DOCTYPE html>",
            description: "הצהרה על סוג המסמך",
            icon: "📋"
          },
          {
            name: "<html lang=\"he\">",
            description: "תגית הבסיס עם שפה",
            icon: "🌐"
          },
          {
            name: "<head>",
            description: "מידע על הדף",
            icon: "📋"
          },
          {
            name: "<title>",
            description: "כותרת הדף",
            icon: "📝"
          },
          {
            name: "<body>",
            description: "תוכן הדף",
            icon: "👤"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        title: "דוגמה למבנה:",
        items: [
          {
            icon: "📋",
            title: "DOCTYPE + HTML",
            description: "המעטפת החיצונית"
          },
          {
            icon: "📋",
            title: "HEAD",
            description: "כותרת, מטא-דאטה"
          },
          {
            icon: "👤",
            title: "BODY",
            description: "כותרות, פסקאות, תמונות"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "מה צריך להיות ב-HEAD:",
        items: [
          "כותרת הדף (<title>)",
          "קידוד תווים (charset)",
          "תיאור הדף (meta description)",
          "קישור לקובץ CSS",
          "קישור לקובץ JavaScript"
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
        text: "💡 טיפ: תמיד התחילו עם המבנה הבסיסי - זה כמו יסודות הבית!",
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