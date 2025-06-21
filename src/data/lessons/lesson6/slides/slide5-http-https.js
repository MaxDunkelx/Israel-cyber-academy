export const slide5HttpHttps = {
  id: "slide-5",
  type: "presentation",
  title: "HTTP ו-HTTPS - פרוטוקולי האינטרנט 🌐",
  content: {
    background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    elements: [
      {
        type: "title",
        text: "פרוטוקולי האינטרנט",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "HTTP ו-HTTPS הם הפרוטוקולים הכי חשובים לגלישה באינטרנט",
        style: { fontSize: "1.4rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "🌐 HTTP - HyperText Transfer Protocol",
          "📄 מעביר דפי אינטרנט מהשרת לדפדפן",
          "🔓 לא מוצפן - המידע חשוף",
          "🔒 HTTPS - HTTP Secure",
          "🛡️ מוצפן - המידע מוגן",
          "🔐 משתמש ב-SSL/TLS להצפנה"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "HTTPS הוא כמו HTTP עם מנעול - המידע מוגן מפני האקרים!",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", fontWeight: "bold" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
        alt: "HTTP HTTPS",
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