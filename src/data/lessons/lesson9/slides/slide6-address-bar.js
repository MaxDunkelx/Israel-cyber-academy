export const slide6AddressBar = {
  id: "slide-6",
  type: "presentation",
  title: "שורת הכתובת 🔍",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "איך כתובות אתרים עובדות?",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "subtitle",
        text: "כל כתובת אתר מספרת לנו סיפור",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "code",
        text: "https://www.example.com/page",
        style: { fontSize: "1.5rem", color: "#FFD700", textAlign: "center", fontFamily: "monospace", margin: "2rem auto", padding: "1rem", backgroundColor: "rgba(0,0,0,0.3)", borderRadius: "10px" }
      },
      {
        type: "list",
        items: [
          "🔒 https:// - פרוטוקול אבטחה",
          "🌐 www - שרת האינטרנט",
          "📝 example.com - שם הדומיין",
          "📄 /page - הדף הספציפי"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", lineHeight: "2" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400",
        alt: "Address Bar",
        style: { width: "300px", borderRadius: "15px", margin: "2rem auto" }
      },
      {
        type: "timer",
        duration: 60,
        text: "זמן קריאה"
      }
    ]
  }
}; 