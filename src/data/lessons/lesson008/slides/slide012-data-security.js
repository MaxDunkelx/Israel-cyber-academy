export const slide12DataSecurity = {
  id: "slide-12",
  type: "content",
  title: "אבטחת מסדי נתונים - איך מגנים על המידע? 🔒",
  content: {
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    elements: [
      {
        type: "title",
        text: "אבטחת מסדי נתונים - איך מגנים על המידע? 🔒",
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
        title: "אמצעי אבטחה:",
        items: [
          {
            name: "הצפנה",
            description: "הצפנת הנתונים במנוחה ובתנועה",
            icon: "🔐"
          },
          {
            name: "אימות משתמשים",
            description: "בדיקת זהות המשתמשים",
            icon: "👤"
          },
          {
            name: "הרשאות",
            description: "הגדרת הרשאות גישה שונות",
            icon: "🔑"
          },
          {
            name: "גיבוי",
            description: "גיבוי קבוע של הנתונים",
            icon: "💾"
          },
          {
            name: "ניטור",
            description: "מעקב אחר פעילות חשודה",
            icon: "👁️"
          },
          {
            name: "חומת אש",
            description: "הגנה מפני גישה לא מורשית",
            icon: "🛡️"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        title: "סוגי איומים:",
        items: [
          {
            icon: "💉",
            title: "SQL Injection",
            description: "הזרקת קוד SQL זדוני"
          },
          {
            icon: "👤",
            title: "התחזות",
            description: "גישה עם זהות מזויפת"
          },
          {
            icon: "💥",
            title: "DDoS",
            description: "התקפת מניעת שירות"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "tip",
        text: "💡 טיפ: אבטחה היא תהליך מתמשך - תמיד בדקו ועדכנו!",
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