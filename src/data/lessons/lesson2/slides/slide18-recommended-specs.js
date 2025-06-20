export const slide18RecommendedSpecs = {
  id: "slide-18",
  type: "presentation",
  title: "מפרט טכני מומלץ 💻",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "מפרט טכני מומלץ לדוגמה",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "specs",
        items: [
          { component: "מעבד", spec: "Intel i9 או AMD Ryzen 9", icon: "🧠" },
          { component: "זיכרון RAM", spec: "לפחות 16GB DDR5", icon: "🚀" },
          { component: "אחסון", spec: "500GB SSD + 2TB הארד דיסק", icon: "💾" },
          { component: "כרטיס מסך", spec: "RTX 4070 או דומה", icon: "🖥️" },
          { component: "ספק כוח", spec: "750W או יותר", icon: "⚡" },
          { component: "לוח אם", spec: "תואם למעבד הנבחר", icon: "🏠" }
        ],
        style: { fontSize: "1.3rem", color: "white", textAlign: "right", lineHeight: "2" }
      }
    ],
    duration: 180
  }
}; 