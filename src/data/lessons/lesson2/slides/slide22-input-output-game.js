export const slide22InputOutputGame = {
  id: "slide-22",
  type: "interactive",
  title: "משחק: זיהוי קלט ופלט 🎮",
  content: {
    type: "drag-drop",
    instructions: "גרור כל מכשיר לקטגוריה הנכונה",
    categories: [
      { id: "input", name: "קלט", color: "#4CAF50", description: "מכניס מידע למחשב" },
      { id: "output", name: "פלט", color: "#2196F3", description: "מציג תוצאות מהמחשב" },
      { id: "both", name: "קלט ופלט", color: "#FF9800", description: "גם מכניס וגם מציג" }
    ],
    items: [
      {
        id: 1,
        text: "מקלדת",
        correctCategory: "input"
      },
      {
        id: 2,
        text: "מסך",
        correctCategory: "output"
      },
      {
        id: 3,
        text: "עכבר",
        correctCategory: "input"
      },
      {
        id: 4,
        text: "רמקולים",
        correctCategory: "output"
      },
      {
        id: 5,
        text: "מסך מגע",
        correctCategory: "both"
      },
      {
        id: 6,
        text: "מיקרופון",
        correctCategory: "input"
      }
    ],
    duration: 300
  }
}; 