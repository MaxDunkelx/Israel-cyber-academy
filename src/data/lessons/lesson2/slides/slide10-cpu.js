export const slide10Cpu = {
  id: "slide-10",
  type: "presentation",
  title: "1. מעבד (CPU) - המוח של המחשב 🧠",
  content: {
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    elements: [
      {
        type: "title",
        text: "המעבד - המוח של המחשב",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "subtitle",
        text: "מבצע את כל ההוראות בתוכנה",
        style: { fontSize: "1.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "🔹 זיכרון מטמון - זיכרון מהיר מאוד",
          "🔹 אוגרים - זיכרון זמני קטן",
          "🔹 ליבות - כמה 'מוחות' במקביל",
          "🔹 שעון (Clock) - קובע מהירות הפעולה"
        ],
        style: { fontSize: "1.3rem", color: "white", textAlign: "right", lineHeight: "2" }
      },
      {
        type: "animation",
        type: "pulse",
        element: "🧠",
        style: { fontSize: "4rem", textAlign: "center", margin: "2rem" }
      }
    ],
    duration: 180
  }
}; 