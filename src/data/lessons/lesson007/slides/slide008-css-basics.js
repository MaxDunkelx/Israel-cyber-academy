export const slide8CssBasics = {
  id: "slide-8",
  type: "content",
  title: "CSS - עיצוב הדף 🎨",
  content: {
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    elements: [
      {
        type: "title",
        text: "CSS - עיצוב הדף 🎨",
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
        term: "CSS",
        definition: "Cascading Style Sheets - גיליונות סגנון מדורגים לעיצוב דפי אינטרנט",
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
        title: "מה CSS עושה:",
        items: [
          {
            name: "צבעים",
            description: "צבע טקסט, רקע, גבולות",
            icon: "🎨"
          },
          {
            name: "גדלים",
            description: "גודל טקסט, רוחב, גובה",
            icon: "📏"
          },
          {
            name: "מיקום",
            description: "מיקום אלמנטים בדף",
            icon: "📍"
          },
          {
            name: "גופנים",
            description: "סוג גופן, גודל, משקל",
            icon: "📝"
          },
          {
            name: "אנימציות",
            description: "תנועות ואפקטים",
            icon: "✨"
          },
          {
            name: "עיצוב רספונסיבי",
            description: "התאמה למסכים שונים",
            icon: "📱"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        title: "HTML vs CSS:",
        items: [
          {
            icon: "🏗️",
            title: "HTML",
            description: "מבנה ותוכן"
          },
          {
            icon: "🎨",
            title: "CSS",
            description: "עיצוב ומראה"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "tip",
        text: "💡 טיפ: CSS הוא כמו הצבעים והרהיטים בבית - הם הופכים אותו ליפה!",
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