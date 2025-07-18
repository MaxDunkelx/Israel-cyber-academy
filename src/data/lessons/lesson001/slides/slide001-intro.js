export const slide1Intro = {
  id: "slide-1",
  type: "content",
  title: "ברוכים הבאים לעולם הסייבר! 🚀",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "ברוכים הבאים לעולם הסייבר! 🚀",
        style: { 
          fontSize: "4rem", 
          color: "white", 
          textAlign: "center", 
          marginBottom: "2rem", 
          fontWeight: "bold", 
          textShadow: "0 8px 16px rgba(0,0,0,0.4)",
          animation: "fadeInUp 1s ease-out"
        }
      },
      {
        type: "subtitle",
        text: "היום נלמד על האקרים, איומים דיגיטליים ואיך להישאר בטוחים באינטרנט",
        style: { 
          fontSize: "1.8rem", 
          color: "white", 
          textAlign: "center", 
          opacity: 0.95, 
          marginBottom: "3rem",
          textShadow: "0 4px 8px rgba(0,0,0,0.3)"
        }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=300&fit=crop",
        alt: "Cybersecurity Concept",
        style: { 
          width: "400px", 
          borderRadius: "20px", 
          margin: "2rem auto",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          border: "4px solid rgba(255,255,255,0.2)"
        }
      },
      {
        type: "comparison",
        items: [
          {
            icon: "🛡️",
            title: "אבטחה",
            description: "למדו להגן על עצמכם"
          },
          {
            icon: "🎯",
            title: "אינטראקטיבי",
            description: "משחקים וסימולציות"
          },
          {
            icon: "🚀",
            title: "חדשנות",
            description: "טכנולוגיות מתקדמות"
          }
        ],
        style: { marginTop: "3rem" }
      },
      {
        type: "tip",
        text: "💡 טיפ: השתתפו בכל הפעילויות האינטראקטיביות כדי ללמוד בצורה הטובה ביותר!",
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