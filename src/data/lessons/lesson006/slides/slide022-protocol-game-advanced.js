export const slide22ProtocolGameAdvanced = {
  id: "slide-22",
  type: "interactive",
  title: "משחק מתקדם - בניית פרוטוקול 🎮",
  content: {
    gameType: "dragdrop",
    instructions: "בנו פרוטוקול מלא על ידי גרירת הרכיבים הנכונים",
    items: [
      {
        id: "request",
        text: "בקשה",
        category: "step"
      },
      {
        id: "response",
        text: "תגובה",
        category: "step"
      },
      {
        id: "encryption",
        text: "הצפנה",
        category: "security"
      },
      {
        id: "authentication",
        text: "אימות",
        category: "security"
      },
      {
        id: "error-checking",
        text: "בדיקת שגיאות",
        category: "reliability"
      },
      {
        id: "retransmission",
        text: "שידור חוזר",
        category: "reliability"
      }
    ],
    categories: [
      {
        id: "step",
        name: "שלבי התקשורת",
        icon: "📡"
      },
      {
        id: "security",
        name: "אבטחה",
        icon: "🔒"
      },
      {
        id: "reliability",
        name: "אמינות",
        icon: "🛡️"
      }
    ],
    scenarios: [
      {
        name: "HTTP בסיסי",
        requiredItems: ["request", "response"]
      },
      {
        name: "HTTPS מאובטח",
        requiredItems: ["request", "response", "encryption", "authentication"]
      },
      {
        name: "TCP אמין",
        requiredItems: ["request", "response", "error-checking", "retransmission"]
      }
    ],
    feedback: {
      correct: "מעולה! בנית פרוטוקול נכון! 🎉",
      incorrect: "נסה שוב! חסרים רכיבים... 💪",
      complete: "כל הכבוד! יצרתם פרוטוקול מלא! 🏆"
    }
  }
}; 