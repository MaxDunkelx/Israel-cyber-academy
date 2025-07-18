export const slide24ProtocolSecurity = {
  id: "slide-24",
  type: "content",
  title: "אבטחת פרוטוקולים - איך להגן על עצמנו? 🛡️",
  content: {
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    elements: [
      {
        type: "title",
        text: "אבטחת פרוטוקולים - איך להגן על עצמנו? 🛡️",
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
        title: "איומים על פרוטוקולים:",
        items: [
          {
            name: "Man-in-the-Middle",
            description: "תקיפה באמצע התקשורת",
            icon: "👤"
          },
          {
            name: "Packet Sniffing",
            description: "יירוט חבילות נתונים",
            icon: "📦"
          },
          {
            name: "DNS Spoofing",
            description: "זיוף כתובות DNS",
            icon: "🌐"
          },
          {
            name: "Port Scanning",
            description: "סריקת פורטים פתוחים",
            icon: "🔍"
          },
          {
            name: "DDoS",
            description: "התקפת מניעת שירות",
            icon: "💥"
          },
          {
            name: "Session Hijacking",
            description: "גניבת סשן משתמש",
            icon: "🎭"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        title: "אמצעי הגנה:",
        items: [
          {
            icon: "🔒",
            title: "הצפנה",
            description: "SSL/TLS, VPN, הצפנה מקצה לקצה"
          },
          {
            icon: "🛡️",
            title: "Firewall",
            description: "חומת אש, סינון תעבורה"
          },
          {
            icon: "🔐",
            title: "אימות",
            description: "סיסמאות חזקות, אימות דו-שלבי"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "טיפים לאבטחה יומיומית:",
        items: [
          "השתמשו ב-HTTPS במקום HTTP",
          "התחברו ל-VPN ברשתות ציבוריות",
          "עדכנו את התוכנות שלכם",
          "השתמשו בסיסמאות חזקות",
          "היזהרו מלינקים חשודים"
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
        text: "💡 טיפ: אבטחה היא כמו מנעול על הדלת - חשובה בכל מקום!",
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