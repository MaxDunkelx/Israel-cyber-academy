export const slide8ProtocolGame = {
  id: "slide-8",
  type: "interactive",
  title: "משחק פרוטוקולים - גרור והתאם 🎮",
  content: {
    type: "drag-drop",
    instructions: "גרור כל פרוטוקול לקטגוריה המתאימה לו. כל פרוטוקול משמש למטרה שונה:",
    items: [
      {
        id: "http",
        text: "HTTP - גלישה באתרים",
        correctCategory: "web",
        icon: "🌐"
      },
      {
        id: "https",
        text: "HTTPS - גלישה מאובטחת",
        correctCategory: "secure",
        icon: "🔒"
      },
      {
        id: "smtp",
        text: "SMTP - שליחת אימיילים",
        correctCategory: "email",
        icon: "📧"
      },
      {
        id: "pop3",
        text: "POP3 - קבלת אימיילים",
        correctCategory: "email",
        icon: "📥"
      },
      {
        id: "ftp",
        text: "FTP - העברת קבצים",
        correctCategory: "files",
        icon: "📁"
      },
      {
        id: "sftp",
        text: "SFTP - העברת קבצים בטוחה",
        correctCategory: "secure",
        icon: "🔐"
      }
    ],
    categories: [
      {
        id: "web",
        name: "גלישה באינטרנט",
        description: "פרוטוקולים לגלישה באתרי אינטרנט",
        color: "#4facfe"
      },
      {
        id: "email",
        name: "אימייל",
        description: "פרוטוקולים לשליחה וקבלה של אימיילים",
        color: "#fa709a"
      },
      {
        id: "files",
        name: "העברת קבצים",
        description: "פרוטוקולים להעברת קבצים בין מחשבים",
        color: "#a8edea"
      },
      {
        id: "secure",
        name: "אבטחה",
        description: "פרוטוקולים מוצפנים לתקשורת בטוחה",
        color: "#ffecd2"
      }
    ],
    duration: 300
  }
}; 