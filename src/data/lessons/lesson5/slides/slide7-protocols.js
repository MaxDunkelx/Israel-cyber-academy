export const slide7Protocols = {
  id: "slide-7",
  type: "presentation",
  title: "פרוטוקולים - שפת התקשורת 📡",
  content: {
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    elements: [
      {
        type: "title",
        text: "פרוטוקולים",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "פרוטוקולים הם כמו שפה שמחשבים מדברים בה",
        style: { fontSize: "1.4rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "🌐 HTTP - לגלישה באתרים",
          "📧 SMTP - לשליחת אימיילים",
          "📁 FTP - להעברת קבצים",
          "🔒 HTTPS - גלישה מאובטחת",
          "📱 TCP/IP - השפה הבסיסית",
          "🎮 WebSocket - למשחקים בזמן אמת"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "בלי פרוטוקולים, מחשבים לא היו יכולים להבין אחד את השני!",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", fontWeight: "bold" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
        alt: "Network Protocols",
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