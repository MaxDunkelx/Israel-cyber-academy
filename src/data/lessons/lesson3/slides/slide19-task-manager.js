export const slide19TaskManager = {
  id: "slide-19",
  type: "presentation",
  title: "מנהל המשימות (Task Manager) 📊",
  content: {
    background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%)",
    elements: [
      {
        type: "title",
        text: "איך המחשב עובד?",
        style: { fontSize: "2.5rem", color: "#c2185b", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "מנהל המשימות מראה לנו אילו תוכנות רצות במחשב ואיך הן משתמשות במשאבים.",
        style: { fontSize: "1.2rem", color: "#c2185b", textAlign: "center", marginBottom: "1rem" }
      },
      {
        type: "list",
        items: [
          "💻 CPU - שימוש במעבד",
          "🧠 זיכרון - שימוש ב-RAM",
          "💾 דיסק - פעילות האחסון",
          "🌐 רשת - תעבורת אינטרנט",
          "🔋 סוללה - צריכת חשמל",
          "📱 תהליכים - תוכנות רצות"
        ],
        style: { fontSize: "1.1rem", color: "#c2185b", textAlign: "right" }
      },
      {
        type: "image",
        src: "https://cdn.pixabay.com/photo/2017/01/31/15/33/technology-2024123_1280.jpg",
        alt: "Task Manager",
        style: { width: "250px", borderRadius: "10px", margin: "1rem auto" }
      },
      {
        type: "timer",
        duration: 90,
        text: "זמן קריאה"
      }
    ]
  }
}; 