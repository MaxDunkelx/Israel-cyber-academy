export const slide6EmailProtocols = {
  id: "slide-6",
  type: "presentation",
  title: "פרוטוקולי אימייל - SMTP, POP3, IMAP 📧",
  content: {
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    elements: [
      {
        type: "title",
        text: "פרוטוקולי אימייל",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "שלושה פרוטוקולים עיקריים לשליחה וקבלה של אימיילים",
        style: { fontSize: "1.4rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "📤 SMTP - Simple Mail Transfer Protocol",
          "📨 שולח אימיילים מהמחשב לשרת",
          "📥 POP3 - Post Office Protocol",
          "📬 מוריד אימיילים מהשרת למחשב",
          "📋 IMAP - Internet Message Access Protocol",
          "🔄 מנהל אימיילים על השרת"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "SMTP שולח, POP3 מוריד, IMAP מנהל - שלושתם עובדים יחד!",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", fontWeight: "bold" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
        alt: "Email Protocols",
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