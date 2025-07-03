export const slide3CyberIntro = {
  id: "slide-3",
  type: "presentation",
  title: "מה זה סייבר? 🧭",
  content: {
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    elements: [
      {
        type: "title",
        text: "מה זה סייבר? 🧭",
        style: { fontSize: "3rem", color: "white", textAlign: "center", marginBottom: "2rem", fontWeight: "bold", textShadow: "0 4px 8px rgba(0,0,0,0.3)" }
      },
      {
        type: "list",
        items: [
          "🔹 קיצור של 'קיברנטיקה' – תקשורת בין אדם למכונה",
          "🔹 'סייבר סיקיוריטי' = הגנה על מחשבים ומידע",
          "🔹 'סייבר התקפי' = תקיפות מחשבים",
          "🔹 'האקר' = אדם שמבצע פעולות בתחום"
        ],
        style: { fontSize: "1.5rem", color: "white", textAlign: "right", lineHeight: "2.5", margin: "2rem 0" }
      },
      {
        type: "animation",
        type: "bounce",
        element: "💻",
        style: { fontSize: "4rem", textAlign: "center", margin: "2rem" }
      }
    ],
    duration: 180
  }
}; 