export const slide23WebOptimization = {
  id: "slide-23",
  type: "content",
  title: "אופטימיזציה של אתרים - איך משפרים ביצועים? ⚡",
  content: {
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    elements: [
      {
        type: "title",
        text: "אופטימיזציה של אתרים - איך משפרים ביצועים? ⚡",
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
        title: "דרכים לשפר ביצועי אתר:",
        items: [
          {
            name: "דחיסת תמונות",
            description: "הקטנת גודל קבצי תמונה",
            icon: "🖼️"
          },
          {
            name: "מיניפיקציה",
            description: "הקטנת קבצי CSS ו-JavaScript",
            icon: "📦"
          },
          {
            name: "Caching",
            description: "שמירת קבצים בזיכרון",
            icon: "💾"
          },
          {
            name: "CDN",
            description: "רשת הפצת תוכן",
            icon: "🌍"
          },
          {
            name: "Lazy Loading",
            description: "טעינה איטית של תמונות",
            icon: "🐌"
          },
          {
            name: "Code Splitting",
            description: "חלוקת קוד לחלקים קטנים",
            icon: "✂️"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        title: "כלי בדיקת ביצועים:",
        items: [
          {
            icon: "📊",
            title: "Google PageSpeed",
            description: "בדיקת מהירות טעינה"
          },
          {
            icon: "🔍",
            title: "GTmetrix",
            description: "ניתוח ביצועים מפורט"
          },
          {
            icon: "⚡",
            title: "WebPageTest",
            description: "בדיקה ממקומות שונים"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "טיפים לאופטימיזציה:",
        items: [
          "השתמשו בתמונות בפורמט WebP",
          "דחסו קבצי CSS ו-JavaScript",
          "הפעילו Gzip דחיסה",
          "השתמשו ב-CDN לתמונות",
          "מחקו קוד לא נחוץ",
          "בדקו ביצועים באופן קבוע"
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
        text: "💡 טיפ: אתר מהיר = משתמשים מרוצים + SEO טוב יותר!",
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