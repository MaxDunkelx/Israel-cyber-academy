export const slide10CssGame = {
  id: "slide-10",
  type: "interactive",
  title: "משחק CSS - התאמת סגנונות 🎮",
  content: {
    gameType: "dragdrop",
    instructions: "גררו כל סגנון CSS לאלמנט המתאים",
    items: [
      {
        id: "color",
        text: "color: red;",
        description: "צבע טקסט אדום",
        correctCategory: "text"
      },
      {
        id: "background",
        text: "background-color: blue;",
        description: "רקע כחול",
        correctCategory: "background"
      },
      {
        id: "size",
        text: "font-size: 24px;",
        description: "גודל גופן 24 פיקסלים",
        correctCategory: "text"
      },
      {
        id: "align",
        text: "text-align: center;",
        description: "יישור למרכז",
        correctCategory: "text"
      },
      {
        id: "margin",
        text: "margin: 10px;",
        description: "רווח חיצוני",
        correctCategory: "spacing"
      },
      {
        id: "padding",
        text: "padding: 5px;",
        description: "רווח פנימי",
        correctCategory: "spacing"
      }
    ],
    categories: [
      {
        id: "text",
        name: "עיצוב טקסט",
        icon: "📝"
      },
      {
        id: "background",
        name: "עיצוב רקע",
        icon: "🖼️"
      },
      {
        id: "spacing",
        name: "רווחים",
        icon: "📦"
      }
    ],
    feedback: {
      correct: "מעולה! התאמת נכונה! 🎉",
      incorrect: "נסה שוב! 💪",
      complete: "כל הכבוד! השלמת את המשחק בהצלחה! 🏆"
    }
  }
}; 