export const slide24ShortcutsGame = {
  id: "slide-24",
  type: "interactive",
  title: "משחק: קיצורי מקלדת ⚡",
  content: {
    type: "drag-drop",
    instructions: "גרור כל קיצור מקלדת לפעולה המתאימה",
    categories: [
      { id: "copy", name: "העתקה", color: "#4CAF50", description: "שמירת עותק" },
      { id: "paste", name: "הדבקה", color: "#2196F3", description: "הכנסת העותק" },
      { id: "undo", name: "ביטול", color: "#FF9800", description: "ביטול פעולה אחרונה" },
      { id: "select", name: "בחירה", color: "#9C27B0", description: "בחירת תוכן" }
    ],
    items: [
      {
        id: 1,
        text: "Ctrl+C",
        correctCategory: "copy"
      },
      {
        id: 2,
        text: "Ctrl+V",
        correctCategory: "paste"
      },
      {
        id: 3,
        text: "Ctrl+Z",
        correctCategory: "undo"
      },
      {
        id: 4,
        text: "Ctrl+A",
        correctCategory: "select"
      },
      {
        id: 5,
        text: "Ctrl+X",
        correctCategory: "copy"
      },
      {
        id: 6,
        text: "Ctrl+Y",
        correctCategory: "undo"
      }
    ],
    duration: 300
  }
}; 