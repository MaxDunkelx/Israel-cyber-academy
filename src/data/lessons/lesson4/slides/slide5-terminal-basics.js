export const slide5TerminalBasics = {
  id: "slide-5",
  type: "presentation",
  title: "יסודות הטרמינל 💻",
  content: {
    background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
    elements: [
      {
        type: "title",
        text: "מה זה טרמינל?",
        style: { fontSize: "2.5rem", color: "#00ff00", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "הטרמינל הוא הממשק הטקסטואלי של Linux. כאן אפשר להריץ פקודות חזקות!",
        style: { fontSize: "1.2rem", color: "#00ff00", textAlign: "center", marginBottom: "1rem" }
      },
      {
        type: "list",
        items: [
          "💻 Terminal - חלון פקודות",
          "⌨️ Command Line - שורת פקודה",
          "📁 Shell - מעטפת הפקודות",
          "🔍 Prompt - סימן הזמנה",
          "📝 Commands - פקודות לביצוע",
          "⚡ Fast - מהיר וחזק"
        ],
        style: { fontSize: "1.1rem", color: "#00ff00", textAlign: "right" }
      },
      {
        type: "image",
        src: "https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
        alt: "Terminal Interface",
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