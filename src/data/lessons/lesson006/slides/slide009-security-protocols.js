export const slide9SecurityProtocols = {
  id: "slide-9",
  type: "content",
  title: "פרוטוקולי אבטחה 🔐",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "פרוטוקולי אבטחה 🔐",
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
        title: "פרוטוקולי אבטחה עיקריים:",
        items: [
          {
            name: "SSL/TLS",
            description: "Secure Sockets Layer / Transport Layer Security",
            icon: "🔒"
          },
          {
            name: "SSH",
            description: "Secure Shell - חיבור מאובטח לשרתים",
            icon: "🖥️"
          },
          {
            name: "VPN",
            description: "Virtual Private Network - רשת פרטית וירטואלית",
            icon: "🌐"
          },
          {
            name: "IPSec",
            description: "Internet Protocol Security - אבטחת פרוטוקול IP",
            icon: "🛡️"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        title: "רמות אבטחה:",
        items: [
          {
            icon: "🔒",
            title: "SSL/TLS",
            description: "הצפנה בסיסית לגלישה"
          },
          {
            icon: "🛡️",
            title: "SSH",
            description: "חיבור מאובטח לשרתים"
          },
          {
            icon: "🌐",
            title: "VPN",
            description: "רשת פרטית מאובטחת"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "מתי להשתמש ב-VPN:",
        items: [
          "גלישה ברשתות ציבוריות",
          "גישה לתוכן מוגבל גיאוגרפית",
          "הגנה על פרטיות",
          "עבודה מרחוק",
          "גלישה מאובטחת"
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
        text: "💡 טיפ: תמיד השתמשו ב-VPN כשאתם מתחברים לרשתות WiFi ציבוריות!",
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