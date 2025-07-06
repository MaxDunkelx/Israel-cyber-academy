export const slide26Gpu = {
  id: "slide-26",
  type: "presentation",
  title: "6. כרטיס מסך (GPU) 🖥️",
  content: {
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    elements: [
      {
        type: "title",
        text: "כרטיס מסך - GPU",
        style: { fontSize: "2.5rem", color: "#333", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "subtitle",
        text: "מתרגם פעולות לתצוגה גרפית",
        style: { fontSize: "1.5rem", color: "#666", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "comparison",
        title: "סוגי כרטיסי מסך",
        items: [
          {
            title: "בסיסי",
            description: "מובנה בלוח אם - למשימות פשוטות",
            icon: "📺",
            color: "#4CAF50"
          },
          {
            title: "חיצוני",
            description: "חזק - למשחקים וגרפיקה מתקדמת",
            icon: "🎮",
            color: "#2196F3"
          }
        ],
        style: { fontSize: "1.2rem", color: "#333" }
      },
      {
        type: "list",
        items: [
          "🎨 מציג תמונות וסרטים",
          "🎮 מאפשר משחקים מתקדמים",
          "📊 עוזר בעיבוד גרפי",
          "🖼️ מטפל בצבעים ופרטים"
        ],
        style: { fontSize: "1.2rem", color: "#333", textAlign: "right", lineHeight: "2" }
      }
    ],
    duration: 180
  }
}; 