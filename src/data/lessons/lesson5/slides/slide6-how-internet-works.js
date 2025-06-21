export const slide6HowInternetWorks = {
  id: "slide-6",
  type: "presentation",
  title: "איך האינטרנט עובד? 🔧",
  content: {
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    elements: [
      {
        type: "title",
        text: "המסע של המידע",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "כשאתם גולשים באינטרנט, המידע עובר דרך הרבה תחנות",
        style: { fontSize: "1.4rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "💻 המחשב שלכם שולח בקשה",
          "📡 המידע עובר דרך המודם",
          "🏢 המידע מגיע לספק האינטרנט",
          "🌐 המידע נוסע דרך כבלי האינטרנט",
          "🖥️ המידע מגיע לשרת המארח",
          "📄 השרת שולח חזרה את התשובה"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "כל זה קורה בפחות משנייה!",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", fontWeight: "bold" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
        alt: "Internet Infrastructure",
        style: { width: "300px", borderRadius: "15px", margin: "2rem auto" }
      },
      {
        type: "timer",
        duration: 120,
        text: "זמן קריאה"
      }
    ]
  }
}; 