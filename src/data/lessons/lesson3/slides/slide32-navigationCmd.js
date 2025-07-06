export const slide32NavigationCmd = {
    id: "slide-32",
    type: "presentation",
    title: "ניווט בין תיקיות ב־CMD 🗂️",
    content: {
      background: "linear-gradient(135deg, #b6cee8 0%, #f578dc 100%)",
      elements: [
        {
          type: "title",
          text: "פקודות ניווט בסיסיות",
          style: { fontSize: "2rem", color: "#333", textAlign: "center" }
        },
        {
          type: "list",
          items: [
            "📁 cd – כניסה לתיקיה",
            "↩️ cd.. – תיקיה אחת אחורה",
            "🏠 cd\\ – חזרה לתחילת הנתיב"
          ],
          style: { fontSize: "1.1rem", color: "#1976d2", textAlign: "right" }
        }
      ]
    }
  };
  