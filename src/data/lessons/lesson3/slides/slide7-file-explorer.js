export const slide7FileExplorer = {
  id: "slide-7",
  type: "presentation",
  title: "סייר הקבצים (File Explorer) 📂",
  content: {
    background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
    elements: [
      {
        type: "title",
        text: "איך מארגנים קבצים?",
        style: { fontSize: "2.5rem", color: "#1976d2", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "סייר הקבצים הוא הכלי החשוב ביותר לניהול קבצים ותיקיות ב-Windows.",
        style: { fontSize: "1.2rem", color: "#1976d2", textAlign: "center", marginBottom: "1rem" }
      },
      {
        type: "list",
        items: [
          "📂 תיקיות - לארגון קבצים",
          "📄 קבצים - מסמכים, תמונות, מוזיקה",
          "🔍 חיפוש - למציאת קבצים במהירות",
          "👁️ תצוגה - שינוי אופן הצגת הקבצים",
          "📋 העתקה והדבקה - העברת קבצים",
          "🗑️ מחיקה - הסרת קבצים לא רצויים"
        ],
        style: { fontSize: "1.1rem", color: "#1976d2", textAlign: "right" }
      },
      {
        type: "image",
        src: "https://cdn.pixabay.com/photo/2017/01/31/15/33/technology-2024123_1280.jpg",
        alt: "File Explorer",
        style: { width: "300px", borderRadius: "10px", margin: "1rem auto" }
      },
      {
        type: "timer",
        duration: 120,
        text: "זמן קריאה"
      }
    ]
  }
}; 