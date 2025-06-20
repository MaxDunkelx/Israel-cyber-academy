export const slide5WhatIsComputer = {
  id: "slide-5",
  type: "presentation",
  title: "מה זה מחשב? 🧠",
  content: {
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    elements: [
      {
        type: "title",
        text: "מה זה מחשב?",
        style: { fontSize: "2.5rem", color: "#333", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "definition",
        text: "מכונה אלקטרונית שמבצעת עיבוד נתונים (קלט) ומפיקה תוצאה (פלט)",
        style: { fontSize: "1.5rem", color: "#333", textAlign: "center", padding: "2rem", backgroundColor: "rgba(255,255,255,0.8)", borderRadius: "15px" }
      },
      {
        type: "comparison",
        title: "הבדל בין נתונים למידע",
        items: [
          {
            title: "נתונים (Data)",
            description: "עובדות גולמיות - מספרים, מילים, תמונות",
            icon: "📊"
          },
          {
            title: "מידע (Information)",
            description: "נתונים בעלי משמעות ומטרה",
            icon: "📈"
          }
        ],
        style: { fontSize: "1.2rem", color: "#333" }
      }
    ],
    duration: 180
  }
}; 