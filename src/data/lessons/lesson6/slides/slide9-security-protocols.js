export const slide9SecurityProtocols = {
  id: "slide-9",
  type: "presentation",
  title: "פרוטוקולי אבטחה - SSL, TLS, SSH 🔒",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "פרוטוקולי אבטחה",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "פרוטוקולים שמגנים על המידע שלנו ברשת",
        style: { fontSize: "1.4rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "🔐 SSL - Secure Sockets Layer",
          "🛡️ מגן על מידע שנשלח באינטרנט",
          "🔒 TLS - Transport Layer Security",
          "📡 הגרסה החדשה והבטוחה יותר של SSL",
          "🔑 SSH - Secure Shell",
          "💻 חיבור בטוח למחשבים מרוחקים"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "פרוטוקולי אבטחה הם כמו שומרים שמגנים על המידע שלנו!",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", fontWeight: "bold" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
        alt: "Security Protocols",
        style: { width: "250px", borderRadius: "15px", margin: "2rem auto" }
      },
      {
        type: "timer",
        duration: 90,
        text: "זמן קריאה"
      }
    ]
  }
}; 