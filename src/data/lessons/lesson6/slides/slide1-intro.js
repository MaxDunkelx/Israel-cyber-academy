export const slide1Intro = {
  id: "slide-1",
  type: "presentation",
  title: "ברוכים הבאים לשיעור 6 - פרוטוקולים 📡",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "פרוטוקולי תקשורת",
        style: { fontSize: "3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "subtitle",
        text: "השפה שמחשבים מדברים בה",
        style: { fontSize: "1.5rem", color: "white", textAlign: "center", marginBottom: "3rem" }
      },
      {
        type: "list",
        items: [
          "📡 מה זה פרוטוקול?",
          "🌐 HTTP ו-HTTPS",
          "📧 SMTP, POP3, IMAP",
          "📁 FTP ו-SFTP",
          "🔒 הצפנה ופרטיות",
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
        alt: "Network Protocols",
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