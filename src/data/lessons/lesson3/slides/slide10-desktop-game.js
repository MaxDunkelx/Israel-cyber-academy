export const slide10DesktopGame = {
  id: "slide-10",
  type: "interactive",
  title: "משחק: זיהוי אלמנטי שולחן העבודה 🎮",
  content: {
    type: "drag-drop",
    instructions: "גרור כל אלמנט למיקום הנכון בשולחן העבודה",
    categories: [
      { id: "top", name: "חלק עליון", color: "#4CAF50", description: "סמלים ותיקיות" },
      { id: "bottom", name: "סרגל משימות", color: "#2196F3", description: "תפריט התחלה וכלים" },
      { id: "right", name: "צד ימין", color: "#FF9800", description: "הודעות ועדכונים" }
    ],
    items: [
      {
        id: 1,
        text: "סמל המחשב שלי",
        correctCategory: "top"
      },
      {
        id: 2,
        text: "כפתור התחלה",
        correctCategory: "bottom"
      },
      {
        id: 3,
        text: "שעון",
        correctCategory: "right"
      },
      {
        id: 4,
        text: "תיקיית מסמכים",
        correctCategory: "top"
      },
      {
        id: 5,
        text: "סל מחזור",
        correctCategory: "top"
      },
      {
        id: 6,
        text: "הודעות מערכת",
        correctCategory: "right"
      }
    ],
    duration: 300
  }
}; 