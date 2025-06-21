export const slide4WindowsVersions = {
  id: "slide-4",
  type: "interactive",
  title: "התאמת גרסאות Windows 🎯",
  content: {
    type: "drag-drop",
    instructions: "גרור כל תכונה לגרסת Windows המתאימה",
    categories: [
      { id: "win10", name: "Windows 10", color: "#0078d4", description: "יציבה ופופולרית" },
      { id: "win11", name: "Windows 11", color: "#106ebe", description: "חדשה ומודרנית" },
      { id: "win7", name: "Windows 7", color: "#666666", description: "ישנה אבל אמינה" }
    ],
    items: [
      {
        id: 1,
        text: "מרכז פעילות",
        correctCategory: "win10"
      },
      {
        id: 2,
        text: "עיצוב חדש עם פינות מעוגלות",
        correctCategory: "win11"
      },
      {
        id: 3,
        text: "תפריט התחלה קלאסי",
        correctCategory: "win7"
      },
      {
        id: 4,
        text: "Widgets",
        correctCategory: "win11"
      },
      {
        id: 5,
        text: "Cortana",
        correctCategory: "win10"
      },
      {
        id: 6,
        text: "Aero Glass",
        correctCategory: "win7"
      }
    ],
    duration: 300
  }
}; 