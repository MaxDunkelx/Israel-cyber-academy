export const slide9BrowserGame = {
  id: "slide-9",
  type: "interactive",
  title: "משחק חלקי הדפדפן 🎯",
  content: {
    type: "drag-drop",
    instructions: "גרור כל חלק למקום הנכון בדפדפן",
    categories: [
      { id: "address", name: "שורת כתובת", color: "#4CAF50", description: "לכתיבת כתובות אתרים" },
      { id: "tabs", name: "לשוניות", color: "#2196F3", description: "לפתיחת דפים מרובים" },
      { id: "bookmarks", name: "סימניות", color: "#FF9800", description: "לשמירת אתרים מועדפים" },
      { id: "menu", name: "תפריט", color: "#9C27B0", description: "להגדרות ואפשרויות" }
    ],
    items: [
      {
        id: 1,
        text: "כתובת האתר",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=150",
        correctCategory: "address"
      },
      {
        id: 2,
        text: "פתיחת דפים חדשים",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=150",
        correctCategory: "tabs"
      },
      {
        id: 3,
        text: "שמירת אתרים",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=150",
        correctCategory: "bookmarks"
      },
      {
        id: 4,
        text: "הגדרות דפדפן",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=150",
        correctCategory: "menu"
      },
      {
        id: 5,
        text: "חיפוש באינטרנט",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=150",
        correctCategory: "address"
      },
      {
        id: 6,
        text: "ניווט בין דפים",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=150",
        correctCategory: "tabs"
      }
    ],
    duration: 300
  }
}; 