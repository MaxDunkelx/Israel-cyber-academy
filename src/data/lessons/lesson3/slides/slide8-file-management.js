export const slide8FileManagement = {
  id: "slide-8",
  type: "presentation",
  title: "פעולות בסיסיות בקבצים 📋",
  content: {
    background: "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)",
    elements: [
      {
        type: "title",
        text: "איך עובדים עם קבצים?",
        style: { fontSize: "2.5rem", color: "#7b1fa2", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "למדו את הפעולות הבסיסיות לניהול קבצים ב-Windows.",
        style: { fontSize: "1.2rem", color: "#7b1fa2", textAlign: "center", marginBottom: "1rem" }
      },
      {
        type: "list",
        items: [
          "📋 העתקה (Ctrl+C) - שמירת עותק",
          "📋 הדבקה (Ctrl+V) - הכנסת העותק",
          "✂️ גזירה (Ctrl+X) - העברה למקום אחר",
          "🗑️ מחיקה (Delete) - שליחה לסל מחזור",
          "🔄 שמירה (Ctrl+S) - שמירת שינויים",
          "🔍 חיפוש (Ctrl+F) - מציאת מידע"
        ],
        style: { fontSize: "1.1rem", color: "#7b1fa2", textAlign: "right" }
      },
      {
        type: "image",
        src: "https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
        alt: "File Operations",
        style: { width: "250px", borderRadius: "10px", margin: "1rem auto" }
      },
      {
        type: "timer",
        duration: 90,
        text: "זמן קריאה"
      }
    ]
  }
}; 