export const slide13Processes = {
  id: "slide-13",
  type: "presentation",
  title: "תהליכים ותוכניות 🔄",
  content: {
    background: "linear-gradient(135deg, #607D8B 0%, #455A64 100%)",
    elements: [
      {
        type: "title",
        text: "מה זה תהליך?",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "תהליך הוא תוכנית שרצה במחשב. כל תוכנית שרצה היא תהליך!",
        style: { fontSize: "1.2rem", color: "white", textAlign: "center", marginBottom: "1rem" }
      },
      {
        type: "list",
        items: [
          "🔄 Process - תהליך שרץ",
          "🆔 PID - מזהה תהליך",
          "👤 User - משתמש שהריץ",
          "💾 Memory - זיכרון בשימוש",
          "⚡ CPU - שימוש במעבד",
          "📊 ps - הצג תהליכים",
          "🔍 top - מעקב בזמן אמת",
          "🛑 kill - עצירת תהליך"
        ],
        style: { fontSize: "1.1rem", color: "white", textAlign: "right" }
      },
      {
        type: "image",
        src: "https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
        alt: "Processes",
        style: { width: "250px", borderRadius: "10px", margin: "1rem auto" }
      },
      {
        type: "timer",
        duration: 120,
        text: "זמן קריאה"
      }
    ]
  }
}; 