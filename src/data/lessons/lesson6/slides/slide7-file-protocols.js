export const slide7FileProtocols = {
  id: "slide-7",
  type: "presentation",
  title: "פרוטוקולי העברת קבצים - FTP, SFTP 📁",
  content: {
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    elements: [
      {
        type: "title",
        text: "פרוטוקולי העברת קבצים",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "פרוטוקולים להעברת קבצים בין מחשבים ברשת",
        style: { fontSize: "1.4rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "📁 FTP - File Transfer Protocol",
          "📤 מעביר קבצים מהמחשב לשרת",
          "📥 מוריד קבצים מהשרת למחשב",
          "🔓 לא מוצפן - המידע חשוף",
          "🔒 SFTP - SSH File Transfer Protocol",
          "🛡️ מוצפן - העברה בטוחה"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "SFTP הוא כמו FTP עם מנעול - העברת קבצים בטוחה!",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", fontWeight: "bold" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
        alt: "File Transfer Protocols",
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