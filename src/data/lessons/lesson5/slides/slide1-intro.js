export const slide1Intro = {
  id: "slide-1",
  type: "presentation",
  title: "ברוכים הבאים לשיעור 5 - רשתות 🌐",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "רשתות והאינטרנט",
        style: { fontSize: "3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "subtitle",
        text: "איך האינטרנט עובד? איך מחשבים מתקשרים?",
        style: { fontSize: "1.5rem", color: "white", textAlign: "center", marginBottom: "3rem" }
      },
      {
        type: "list",
        items: [
          "🌐 מה זה רשת מחשבים?",
          "📡 איך האינטרנט עובד?",
          "🔗 פרוטוקולים ותקשורת",
          "🌍 דפדפנים ושרתים",
          "🔒 אבטחה ברשתות",
          "🎮 משחקים אינטראקטיביים"
        ],
        style: { fontSize: "1.3rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "משך השיעור: 3 שעות | רמה: בינונית | גיל: 10-13",
        style: { fontSize: "1.2rem", color: "white", textAlign: "center", opacity: 0.9 }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
        alt: "Network Connections",
        style: { width: "250px", borderRadius: "15px", margin: "2rem auto" }
      },
      {
        type: "timer",
        duration: 60,
        text: "זמן קריאה"
      }
    ]
  }
}; 