export const slide7HtmlGame = {
  id: "slide-7",
  type: "interactive",
  title: "משחק HTML - התאמת תגיות 🎮",
  content: {
    gameType: "matching",
    instructions: "גררו כל תגית HTML למיקום הנכון שלה",
    items: [
      {
        id: "html",
        text: "<html>",
        description: "תגית הבסיס",
        correctCategory: "structure"
      },
      {
        id: "head",
        text: "<head>",
        description: "מידע על הדף",
        correctCategory: "structure"
      },
      {
        id: "body",
        text: "<body>",
        description: "תוכן הדף",
        correctCategory: "structure"
      },
      {
        id: "h1",
        text: "<h1>",
        description: "כותרת ראשית",
        correctCategory: "content"
      },
      {
        id: "p",
        text: "<p>",
        description: "פסקה",
        correctCategory: "content"
      },
      {
        id: "img",
        text: "<img>",
        description: "תמונה",
        correctCategory: "content"
      }
    ],
    categories: [
      {
        id: "structure",
        name: "מבנה הדף",
        icon: "🏗️"
      },
      {
        id: "content",
        name: "תוכן הדף",
        icon: "📝"
      }
    ],
    feedback: {
      correct: "מעולה! התאמת נכונה! 🎉",
      incorrect: "נסה שוב! 💪",
      complete: "כל הכבוד! השלמת את המשחק בהצלחה! 🏆"
    }
  }
}; 