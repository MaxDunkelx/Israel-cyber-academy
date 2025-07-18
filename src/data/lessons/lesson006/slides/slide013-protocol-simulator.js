export const slide13ProtocolSimulator = {
  id: "slide-13",
  type: "interactive",
  title: "סימולטור פרוטוקולים 🎮",
  content: {
    gameType: "simulator",
    instructions: "בחרו פרוטוקול וצפו איך הוא עובד",
    scenarios: [
      {
        id: "web-browsing",
        name: "גלישה באינטרנט",
        description: "HTTP vs HTTPS",
        steps: [
          "המחשב שולח בקשה לשרת",
          "השרת מקבל את הבקשה",
          "השרת שולח תגובה",
          "המחשב מציג את הדף"
        ],
        protocols: ["HTTP", "HTTPS"],
        icon: "🌐"
      },
      {
        id: "email-sending",
        name: "שליחת מייל",
        description: "SMTP Process",
        steps: [
          "המשתמש כותב מייל",
          "המייל נשלח לשרת SMTP",
          "השרת מעביר לשרת היעד",
          "המייל נמסר לתיבת הדואר"
        ],
        protocols: ["SMTP"],
        icon: "📧"
      },
      {
        id: "file-transfer",
        name: "העברת קבצים",
        description: "FTP vs SFTP",
        steps: [
          "יצירת חיבור לשרת",
          "אימות זהות המשתמש",
          "העברת הקובץ",
          "סגירת החיבור"
        ],
        protocols: ["FTP", "SFTP"],
        icon: "📁"
      }
    ],
    feedback: {
      start: "בחרו תרחיש כדי להתחיל! 🚀",
      running: "הסימולציה רצה... ⏳",
      complete: "הסימולציה הושלמה! ✅"
    }
  }
}; 