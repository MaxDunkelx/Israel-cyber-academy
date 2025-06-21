export const slide20Networking = {
  id: "slide-20",
  type: "presentation",
  title: "רשתות ב-Linux 🌐",
  content: {
    background: "linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)",
    elements: [
      {
        type: "title",
        text: "איך מתחברים לרשת?",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "Linux מצוינת לניהול רשתות. למדו פקודות לחיבור ובדיקת רשת",
        style: { fontSize: "1.2rem", color: "white", textAlign: "center", marginBottom: "1rem" }
      },
      {
        type: "list",
        items: [
          "🌐 ifconfig/ip - הגדרות רשת",
          "🔍 ping - בדיקת חיבור",
          "📡 netstat - מצב רשת",
          "🔗 ssh - חיבור מרחוק",
          "📥 wget/curl - הורדת קבצים",
          "🌍 nslookup - בדיקת DNS",
          "🔒 iptables - חומת אש",
          "📊 nmap - סריקת רשת"
        ],
        style: { fontSize: "1.1rem", color: "white", textAlign: "right" }
      },
      {
        type: "image",
        src: "https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
        alt: "Linux Networking",
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