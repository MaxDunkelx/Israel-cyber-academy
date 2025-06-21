export const slide5DesktopInterface = {
  id: "slide-5",
  type: "presentation",
  title: "ממשק שולחן העבודה 🖥️",
  content: {
    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
    elements: [
      {
        type: "title",
        text: "איך נראה שולחן העבודה?",
        style: { fontSize: "2.5rem", color: "#333", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "שולחן העבודה הוא המסך הראשי של Windows. כאן נמצאים כל הקבצים והתיקיות החשובות שלך.",
        style: { fontSize: "1.2rem", color: "#333", textAlign: "center", marginBottom: "1rem" }
      },
      {
        type: "list",
        items: [
          "🖼️ סמלים (Icons) - קיצורי דרך לתוכנות",
          "📁 תיקיות - לארגון קבצים",
          "🗑️ סל מחזור - למחיקת קבצים",
          "📱 סרגל משימות - בתחתית המסך",
          "🪟 כפתור התחלה - גישה לכל התוכנות",
          "⏰ אזור ההודעות - הודעות ועדכונים"
        ],
        style: { fontSize: "1.1rem", color: "#333", textAlign: "right" }
      },
      {
        type: "image",
        src: "https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
        alt: "Desktop Interface",
        style: { width: "300px", borderRadius: "10px", margin: "1rem auto" }
      },
      {
        type: "timer",
        duration: 120,
        text: "זמן קריאה"
      }
    ]
  }
}; 