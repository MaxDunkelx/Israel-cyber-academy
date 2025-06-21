export const slide7TabsAndWindows = {
  id: "slide-7",
  type: "presentation",
  title: "לשוניות וחלונות 📑",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "איך לנהל דפים מרובים?",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "subtitle",
        text: "לשוניות וחלונות עוזרים לנו לעבוד ביעילות",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "➕ Ctrl+T - פתיחת לשונית חדשה",
          "❌ Ctrl+W - סגירת לשונית",
          "🔄 Ctrl+Shift+T - פתיחה מחדש של לשונית",
          "📱 Ctrl+N - פתיחת חלון חדש",
          "🔍 Ctrl+Tab - מעבר בין לשוניות",
          "📌 - נעיצת לשונית (Pin Tab)"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", lineHeight: "2" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400",
        alt: "Tabs and Windows",
        style: { width: "300px", borderRadius: "15px", margin: "2rem auto" }
      },
      {
        type: "timer",
        duration: 75,
        text: "זמן קריאה"
      }
    ]
  }
}; 