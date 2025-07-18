export const slide13WebsiteBuilder = {
  id: "slide-13",
  type: "interactive",
  title: "בונה אתרים - צרו אתר משלכם! 🏗️",
  content: {
    gameType: "websiteBuilder",
    instructions: "בנו אתר פשוט על ידי בחירת אלמנטים ועיצוב",
    elements: [
      {
        type: "header",
        options: [
          { text: "האתר שלי", color: "blue", size: "large" },
          { text: "ברוכים הבאים", color: "green", size: "medium" },
          { text: "דף הבית", color: "purple", size: "small" }
        ]
      },
      {
        type: "content",
        options: [
          { text: "זהו האתר הראשון שלי!", color: "black", size: "normal" },
          { text: "אני לומד לבנות אתרים", color: "darkblue", size: "normal" },
          { text: "תכנות זה כיף!", color: "darkgreen", size: "normal" }
        ]
      },
      {
        type: "image",
        options: [
          { src: "computer", alt: "מחשב", size: "small" },
          { src: "code", alt: "קוד", size: "medium" },
          { src: "website", alt: "אתר", size: "large" }
        ]
      },
      {
        type: "button",
        options: [
          { text: "לחץ כאן", color: "red", size: "normal" },
          { text: "אודות", color: "blue", size: "small" },
          { text: "צור קשר", color: "green", size: "large" }
        ]
      }
    ],
    styling: {
      background: ["white", "lightblue", "lightgreen", "lightyellow"],
      layout: ["centered", "left-aligned", "grid", "flexbox"],
      spacing: ["compact", "normal", "spacious"]
    },
    feedback: {
      complete: "מעולה! יצרתם אתר יפה! 🌟",
      tip: "נסו לשנות צבעים ומיקומים!"
    }
  }
}; 