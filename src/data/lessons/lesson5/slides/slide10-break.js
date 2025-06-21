export const slide10Break = {
  id: "slide-10",
  type: "break",
  title: "הפסקה! ☕",
  content: {
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    elements: [
      {
        type: "title",
        text: "זמן הפסקה!",
        style: { fontSize: "3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "עד כה למדנו על רשתות מחשבים, היסטוריית האינטרנט ופרוטוקולים",
        style: { fontSize: "1.4rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "🌐 מה זה רשת מחשבים",
          "📚 היסטוריית האינטרנט",
          "📡 איך האינטרנט עובד",
          "🔗 פרוטוקולי תקשורת",
          "🌍 כתובות IP"
        ],
        style: { fontSize: "1.3rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "בהמשך נלמד על דפדפנים, שרתים ואבטחה ברשתות",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", fontWeight: "bold" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
        alt: "Break Time",
        style: { width: "200px", borderRadius: "15px", margin: "2rem auto" }
      },
      {
        type: "timer",
        duration: 900,
        text: "זמן הפסקה - 15 דקות"
      }
    ]
  }
}; 