export const slide3WhatIsProgramming = {
  id: "slide-3",
  type: "presentation",
  title: "מה זה תכנות? 💻",
  content: {
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    elements: [
      {
        type: "title",
        text: "תכנות - שפת המחשבים",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "תכנות הוא תהליך של כתיבת הוראות למחשב כדי שיבצע משימות",
        style: { fontSize: "1.4rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "📝 כתיבת הוראות - כמו מתכון למחשב",
          "🔧 פתרון בעיות - חושבים כמו מתכנת",
          "🎯 לוגיקה - סדר נכון של פעולות",
          "🔄 חזרות - אותו דבר שוב ושוב",
          "⚡ אוטומציה - המחשב עושה הכל לבד",
          "🌍 יצירתיות - בונים עולמות חדשים"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "תכנות הוא כמו ללמד מחשב לדבר בשפה שלנו!",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", fontStyle: "italic" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
        alt: "Programming Concepts",
        style: { width: "300px", borderRadius: "15px", margin: "2rem auto" }
      },
      {
        type: "timer",
        duration: 90,
        text: "זמן קריאה"
      }
    ]
  }
}; 