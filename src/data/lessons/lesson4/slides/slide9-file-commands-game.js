export const slide9FileCommandsGame = {
  id: "slide-9",
  type: "interactive",
  title: "משחק פקודות קבצים 🎯",
  content: {
    type: "drag-drop",
    instructions: "גרור כל פקודה למטרה הנכונה",
    categories: [
      { id: "copy", name: "העתקה", color: "#4CAF50", description: "פקודות העתקה" },
      { id: "delete", name: "מחיקה", color: "#f44336", description: "פקודות מחיקה" },
      { id: "search", name: "חיפוש", color: "#2196F3", description: "פקודות חיפוש" },
      { id: "info", name: "מידע", color: "#FF9800", description: "פקודות מידע" }
    ],
    items: [
      {
        id: 1,
        text: "cp file1 file2",
        correctCategory: "copy"
      },
      {
        id: 2,
        text: "rm file",
        correctCategory: "delete"
      },
      {
        id: 3,
        text: "find . -name '*.txt'",
        correctCategory: "search"
      },
      {
        id: 4,
        text: "du -sh folder",
        correctCategory: "info"
      },
      {
        id: 5,
        text: "mv file1 file2",
        correctCategory: "copy"
      },
      {
        id: 6,
        text: "rmdir folder",
        correctCategory: "delete"
      },
      {
        id: 7,
        text: "grep 'text' file",
        correctCategory: "search"
      },
      {
        id: 8,
        text: "ls -la",
        correctCategory: "info"
      }
    ],
    duration: 300
  }
}; 