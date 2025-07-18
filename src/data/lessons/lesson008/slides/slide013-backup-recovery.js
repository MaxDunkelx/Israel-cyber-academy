export const slide13BackupRecovery = {
  id: "slide-13",
  type: "content",
  title: "גיבוי ושחזור - איך שומרים על המידע? 💾",
  content: {
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    elements: [
      {
        type: "title",
        text: "גיבוי ושחזור - איך שומרים על המידע? 💾",
        style: { 
          fontSize: "4rem", 
          color: "white", 
          textAlign: "center", 
          marginBottom: "2rem", 
          fontWeight: "bold", 
          textShadow: "0 8px 16px rgba(0,0,0,0.4)"
        }
      },
      {
        type: "specs",
        title: "סוגי גיבוי:",
        items: [
          {
            name: "Full Backup",
            description: "גיבוי מלא של כל הנתונים",
            icon: "💾"
          },
          {
            name: "Incremental Backup",
            description: "גיבוי רק השינויים",
            icon: "📈"
          },
          {
            name: "Differential Backup",
            description: "גיבוי השינויים מהגיבוי המלא האחרון",
            icon: "📊"
          },
          {
            name: "Real-time Backup",
            description: "גיבוי בזמן אמת",
            icon: "⚡"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "tip",
        text: "💡 טיפ: גיבוי קבוע הוא ביטוח למידע שלכם!",
        style: { 
          fontSize: "1.2rem",
          marginTop: "2rem",
          padding: "1rem",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.1)",
          border: "2px solid rgba(255,255,255,0.3)"
        }
      }
    ]
  }
}; 