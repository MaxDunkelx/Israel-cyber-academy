export const slide12Servers = {
  id: "slide-12",
  type: "presentation",
  title: "שרתים - המחשבים שמשרתים אותנו 🖥️",
  content: {
    background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    elements: [
      {
        type: "title",
        text: "שרתים",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "שרת הוא מחשב חזק שמספק שירותים למחשבים אחרים",
        style: { fontSize: "1.4rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "🌐 שרתי אינטרנט - מארחים אתרים",
          "📧 שרתי אימייל - שולחים ומקבלים הודעות",
          "🎮 שרתי משחקים - מאפשרים משחקים מקוונים",
          "☁️ שרתי ענן - מאחסנים קבצים",
          "🎵 שרטי מדיה - מספקים מוזיקה וסרטים",
          "🔒 שרתי אבטחה - מגנים על הרשת"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "שרתים עובדים 24/7 כדי לשרת מיליוני משתמשים!",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", fontWeight: "bold" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
        alt: "Server Room",
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