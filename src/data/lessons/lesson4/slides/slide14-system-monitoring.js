export const slide14SystemMonitoring = {
  id: "slide-14",
  type: "presentation",
  title: "ניטור מערכת 📊",
  content: {
    background: "linear-gradient(135deg, #795548 0%, #5D4037 100%)",
    elements: [
      {
        type: "title",
        text: "איך בודקים את המערכת?",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "למדו פקודות לבדיקת מצב המערכת - זיכרון, דיסק, רשת ועוד",
        style: { fontSize: "1.2rem", color: "white", textAlign: "center", marginBottom: "1rem" }
      },
      {
        type: "list",
        items: [
          "📊 top/htop - מעקב תהליכים",
          "💾 free -h - זיכרון פנוי",
          "💿 df -h - מקום דיסק",
          "🌐 ifconfig/ip - רשת",
          "🌡️ sensors - טמפרטורה",
          "⚡ uptime - זמן פעילות",
          "👥 who - משתמשים מחוברים",
          "📈 sar - סטטיסטיקות מערכת"
        ],
        style: { fontSize: "1.1rem", color: "white", textAlign: "right" }
      },
      {
        type: "image",
        src: "https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
        alt: "System Monitoring",
        style: { width: "250px", borderRadius: "10px", margin: "1rem auto" }
      },
      {
        type: "timer",
        duration: 120,
        text: "זמן קריאה"
      }
    ]
  }
}; 