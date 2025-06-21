export const slide14BrowserSimulator = {
  id: "slide-14",
  type: "interactive",
  title: "סימולטור דפדפן 🌐",
  content: {
    type: "browser-simulator",
    instructions: "נסה לנווט בדפדפן המדומה ולבצע משימות שונות",
    features: [
      "כתיבת כתובות",
      "פתיחת לשוניות",
      "הוספת סימניות",
      "שימוש בהיסטוריה",
      "הגדרות פרטיות"
    ],
    tasks: [
      {
        id: 1,
        description: "פתח אתר חדש",
        url: "https://www.google.com",
        points: 10
      },
      {
        id: 2,
        description: "הוסף סימניה",
        action: "add_bookmark",
        points: 15
      },
      {
        id: 3,
        description: "פתח לשונית חדשה",
        url: "https://www.wikipedia.org",
        points: 10
      },
      {
        id: 4,
        description: "מחק היסטוריה",
        action: "clear_history",
        points: 20
      },
      {
        id: 5,
        description: "שנה הגדרות פרטיות",
        action: "privacy_settings",
        points: 25
      }
    ],
    duration: 600
  }
}; 