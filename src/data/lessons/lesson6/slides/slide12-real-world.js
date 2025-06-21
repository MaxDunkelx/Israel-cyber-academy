export const slide12RealWorld = {
  id: "slide-12",
  type: "presentation",
  title: "פרוטוקולים בעולם האמיתי 🌍",
  content: {
    background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    elements: [
      {
        type: "title",
        text: "פרוטוקולים בעולם האמיתי",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "איך פרוטוקולים עובדים בחיי היומיום שלנו",
        style: { fontSize: "1.4rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "🌐 כשאנחנו גולשים באתר - HTTP/HTTPS",
          "📧 כשאנחנו שולחים אימייל - SMTP",
          "📱 כשאנחנו מתחברים ל-WiFi - WPA/WPA2",
          "💳 כשאנחנו קונים באינטרנט - SSL/TLS",
          "📞 כשאנחנו מתקשרים - SIP/VoIP",
          "🎮 כשאנחנו משחקים - TCP/UDP"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "פרוטוקולים נמצאים בכל מקום - הם השפה של האינטרנט!",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", fontWeight: "bold" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
        alt: "Real World Protocols",
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