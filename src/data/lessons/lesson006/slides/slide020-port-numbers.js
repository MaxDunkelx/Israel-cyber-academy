export const slide20PortNumbers = {
  id: "slide-20",
  type: "content",
  title: "מספרי פורטים - הדלתות של האינטרנט 🚪",
  content: {
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    elements: [
      {
        type: "title",
        text: "מספרי פורטים - הדלתות של האינטרנט 🚪",
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
        term: "מספר פורט",
        definition: "מספר שמזהה שירות ספציפי במחשב או שרת ברשת",
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
        title: "פורטים חשובים:",
        items: [
          {
            name: "פורט 80",
            description: "HTTP - גלישה רגילה באינטרנט",
            icon: "🌐"
          },
          {
            name: "פורט 443",
            description: "HTTPS - גלישה מאובטחת",
            icon: "🔒"
          },
          {
            name: "פורט 21",
            description: "FTP - העברת קבצים",
            icon: "📁"
          },
          {
            name: "פורט 22",
            description: "SSH - חיבור מאובטח",
            icon: "🖥️"
          },
          {
            name: "פורט 25",
            description: "SMTP - שליחת מיילים",
            icon: "📧"
          },
          {
            name: "פורט 110",
            description: "POP3 - קבלת מיילים",
            icon: "📥"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        title: "טווחי פורטים:",
        items: [
          {
            icon: "🔒",
            title: "פורטים 1-1023",
            description: "Well-known ports - פורטים מוכרים"
          },
          {
            icon: "🔄",
            title: "פורטים 1024-49151",
            description: "Registered ports - פורטים רשומים"
          },
          {
            icon: "🎯",
            title: "פורטים 49152-65535",
            description: "Dynamic ports - פורטים דינמיים"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "tip",
        text: "💡 טיפ: פורטים הם כמו מספרי חדרים במלון - כל חדר מיועד לשירות אחר!",
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