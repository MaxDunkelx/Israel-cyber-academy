export const slide32InputOutput = {
  id: "slide-32",
  type: "presentation",
  title: "קלט ופלט - איך המחשב עובד 🔄",
  content: {
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    elements: [
      {
        type: "title",
        text: "קלט ופלט - איך המחשב עובד",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "flow",
        steps: [
          { step: "קלט", description: "עכבר, מקלדת, מיקרופון", icon: "🖱️" },
          { step: "עיבוד", description: "המעבד מעבד את המידע", icon: "🧠" },
          { step: "זיכרון", description: "RAM מאחסן זמנית", icon: "💾" },
          { step: "פלט", description: "מסך, רמקולים, מדפסת", icon: "🖥️" }
        ],
        style: { fontSize: "1.3rem", color: "white" }
      },
      {
        type: "example",
        title: "דוגמה: כתיבת טקסט",
        description: "מקלדת → מעבד → זיכרון → מסך",
        style: { fontSize: "1.2rem", color: "white", textAlign: "center", marginTop: "2rem" }
      }
    ],
    duration: 240
  }
}; 