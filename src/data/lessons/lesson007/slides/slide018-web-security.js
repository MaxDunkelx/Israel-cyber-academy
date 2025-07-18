export const slide18WebSecurity = {
  id: "slide-18",
  type: "content",
  title: "אבטחת אתרים - איך מגנים על האתר? 🔒",
  content: {
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    elements: [
      {
        type: "title",
        text: "אבטחת אתרים - איך מגנים על האתר? 🔒",
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
        title: "איומים נפוצים על אתרים:",
        items: [
          {
            name: "XSS",
            description: "Cross-Site Scripting - הזרקת קוד זדוני",
            icon: "🕷️"
          },
          {
            name: "SQL Injection",
            description: "הזרקת קוד SQL למסד נתונים",
            icon: "💉"
          },
          {
            name: "CSRF",
            description: "Cross-Site Request Forgery",
            icon: "🎭"
          },
          {
            name: "DDoS",
            description: "התקפת מניעת שירות",
            icon: "🌊"
          },
          {
            name: "Phishing",
            description: "דפים מזויפים לגניבת מידע",
            icon: "🎣"
          },
          {
            name: "Malware",
            description: "תוכנות זדוניות",
            icon: "🦠"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        title: "אמצעי הגנה:",
        items: [
          {
            icon: "🔐",
            title: "HTTPS",
            description: "הצפנת התקשורת"
          },
          {
            icon: "🛡️",
            title: "Firewall",
            description: "חומת אש להגנה"
          },
          {
            icon: "🔑",
            title: "Authentication",
            description: "אימות משתמשים"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "טיפים לאבטחה:",
        items: [
          "השתמשו תמיד ב-HTTPS",
          "עדכנו את האתר והתוספים",
          "השתמשו בסיסמאות חזקות",
          "גבו את האתר באופן קבוע",
          "בדקו הרשאות קבצים",
          "השתמשו ב-CAPTCHA בטופסים"
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