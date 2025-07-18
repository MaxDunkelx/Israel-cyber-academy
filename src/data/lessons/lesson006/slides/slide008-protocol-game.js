export const slide8ProtocolGame = {
  id: "slide-8",
  type: "interactive",
  title: "משחק התאמת פרוטוקולים 🎮",
  content: {
    gameType: "matching",
    instructions: "גררו כל פרוטוקול למיקום הנכון שלו",
    items: [
      {
        id: "http",
        text: "HTTP",
        description: "גלישה באינטרנט",
        correctCategory: "web"
      },
      {
        id: "https",
        text: "HTTPS",
        description: "גלישה מאובטחת",
        correctCategory: "security"
      },
      {
        id: "smtp",
        text: "SMTP",
        description: "שליחת מיילים",
        correctCategory: "email"
      },
      {
        id: "ftp",
        text: "FTP",
        description: "העברת קבצים",
        correctCategory: "file"
      },
      {
        id: "ssh",
        text: "SSH",
        description: "חיבור מאובטח",
        correctCategory: "security"
      },
      {
        id: "imap",
        text: "IMAP",
        description: "גישה למיילים",
        correctCategory: "email"
      }
    ],
    categories: [
      {
        id: "web",
        name: "פרוטוקולי אינטרנט",
        icon: "🌐"
      },
      {
        id: "security",
        name: "פרוטוקולי אבטחה",
        icon: "🔒"
      },
      {
        id: "email",
        name: "פרוטוקולי מייל",
        icon: "📧"
      },
      {
        id: "file",
        name: "פרוטוקולי קבצים",
        icon: "📁"
      }
    ],
    feedback: {
      correct: "מעולה! התאמת נכונה! 🎉",
      incorrect: "נסה שוב! 💪",
      complete: "כל הכבוד! השלמת את המשחק בהצלחה! 🏆"
    }
  }
}; 