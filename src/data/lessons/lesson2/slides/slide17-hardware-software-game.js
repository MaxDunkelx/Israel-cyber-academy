export const slide17HardwareSoftwareGame = {
  id: "slide-17",
  type: "interactive",
  title: "משחק: חומרה או תוכנה? 🎯",
  content: {
    type: "drag-drop",
    instructions: "גרור כל פריט לקטגוריה הנכונה",
    categories: [
      { id: "hardware", name: "חומרה", color: "#2196F3", description: "חלקים פיזיים" },
      { id: "software", name: "תוכנה", color: "#4CAF50", description: "הוראות ותוכנות" }
    ],
    items: [
      {
        id: 1,
        text: "מעבד (CPU)",
        correctCategory: "hardware"
      },
      {
        id: 2,
        text: "Windows 11",
        correctCategory: "software"
      },
      {
        id: 3,
        text: "כרטיס מסך",
        correctCategory: "hardware"
      },
      {
        id: 4,
        text: "Minecraft",
        correctCategory: "software"
      },
      {
        id: 5,
        text: "זיכרון RAM",
        correctCategory: "hardware"
      },
      {
        id: 6,
        text: "Google Chrome",
        correctCategory: "software"
      }
    ],
    duration: 300
  }
}; 