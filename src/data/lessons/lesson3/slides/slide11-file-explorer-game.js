export const slide11FileExplorerGame = {
  id: "slide-11",
  type: "interactive",
  title: "משחק: ניהול קבצים 🎯",
  content: {
    type: "drag-drop",
    instructions: "גרור כל קובץ לתיקייה המתאימה לו",
    categories: [
      { id: "documents", name: "מסמכים", color: "#4CAF50", description: "קבצי טקסט ומסמכים" },
      { id: "pictures", name: "תמונות", color: "#2196F3", description: "תמונות וגרפיקה" },
      { id: "music", name: "מוזיקה", color: "#FF9800", description: "קבצי אודיו" },
      { id: "videos", name: "סרטונים", color: "#9C27B0", description: "קבצי וידאו" }
    ],
    items: [
      {
        id: 1,
        text: "מסמך Word (.docx)",
        correctCategory: "documents"
      },
      {
        id: 2,
        text: "תמונה (.jpg)",
        correctCategory: "pictures"
      },
      {
        id: 3,
        text: "שיר (.mp3)",
        correctCategory: "music"
      },
      {
        id: 4,
        text: "סרטון (.mp4)",
        correctCategory: "videos"
      },
      {
        id: 5,
        text: "מצגת PowerPoint (.pptx)",
        correctCategory: "documents"
      },
      {
        id: 6,
        text: "תמונה (.png)",
        correctCategory: "pictures"
      },
      {
        id: 7,
        text: "סרטון (.avi)",
        correctCategory: "videos"
      },
      {
        id: 8,
        text: "שיר (.wav)",
        correctCategory: "music"
      }
    ],
    duration: 300
  }
}; 