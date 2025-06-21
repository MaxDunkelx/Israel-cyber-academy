export const slide16Security = {
  id: "slide-16",
  type: "presentation",
  title: "אבטחה ב-Linux 🔒",
  content: {
    background: "linear-gradient(135deg, #F44336 0%, #D32F2F 100%)",
    elements: [
      {
        type: "title",
        text: "איך מגנים על המערכת?",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "Linux היא מערכת בטוחה, אבל חשוב לדעת איך להגן עליה",
        style: { fontSize: "1.2rem", color: "white", textAlign: "center", marginBottom: "1rem" }
      },
      {
        type: "list",
        items: [
          "🔐 Passwords - סיסמאות חזקות",
          "👤 Users - ניהול משתמשים",
          "🔑 SSH Keys - מפתחות SSH",
          "🛡️ Firewall - חומת אש",
          "🔒 Permissions - הרשאות קבצים",
          "📝 Logs - יומני מערכת",
          "🔄 Updates - עדכונים קבועים",
          "🔍 Monitoring - ניטור פעילות"
        ],
        style: { fontSize: "1.1rem", color: "white", textAlign: "right" }
      },
      {
        type: "image",
        src: "https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
        alt: "Linux Security",
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