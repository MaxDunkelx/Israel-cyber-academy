export const slide18StorageGame = {
    id: "slide-18",
    type: "interactive",
    title: "משחקון: ניהול אחסון 🗂️",
    content: {
      background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      elements: [
        {
          type: "title",
          text: "מה הייתם מוחקים?",
          style: { fontSize: "2rem", color: "#333", textAlign: "center" }
        },
        {
          type: "game",
          gameType: "deleteFiles",
          description: "גררו קבצים לא דרושים לפח כדי לפנות מקום במחשב!",
          assets: [
            { name: "old_movie.mp4", size: "2GB", icon: "🎬" },
            { name: "document.docx", size: "200KB", icon: "📄" },
            { name: "holiday_photo.jpg", size: "3MB", icon: "🖼️" },
            { name: "app_installer.exe", size: "350MB", icon: "💾" }
          ]
        }
      ]
    }
  };
  