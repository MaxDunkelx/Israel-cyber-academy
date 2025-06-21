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
        id: "smtp",
        text: "SMTP - שליחת אימיילים",
        correctCategory: "email",
        icon: "📧"
      },
      {
        id: "ftp",
        text: "FTP - העברת קבצים",
        correctCategory: "files",
        icon: "📁"
      },
      {
        id: "https",
        text: "HTTPS - גלישה מאובטחת",
        correctCategory: "secure",
        icon: "🔒"
      }
    ],
    categories: [
      {
        id: "web",
        name: "גלישה באתרים",
        description: "פרוטוקול לגלישה באתרי אינטרנט רגילים",
        color: "#4facfe"
      },
      {
        id: "email",
        name: "שליחת אימיילים",
        description: "פרוטוקול לשליחה וקבלה של הודעות אימייל",
        color: "#fa709a"
      },
      {
        id: "files",
        name: "העברת קבצים",
        description: "פרוטוקול להעברת קבצים בין מחשבים",
        color: "#a8edea"
      },
      {
        id: "secure",
        name: "גלישה מאובטחת",
        description: "פרוטוקול מוצפן לגלישה בטוחה באתרים",
        color: "#ffecd2"
      }
    ],
    duration: 300
  }
}; 