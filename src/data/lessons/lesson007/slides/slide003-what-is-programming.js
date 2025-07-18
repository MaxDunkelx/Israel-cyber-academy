export const slide3WhatIsProgramming = {
  id: "slide-3",
  type: "content",
  title: "מה זה תכנות? 🧠",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "מה זה תכנות? 🧠",
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
        type: "definition",
        term: "תכנות",
        definition: "תכנות הוא תהליך של כתיבת הוראות למחשב כדי לבצע משימות שונות",
        style: { 
          fontSize: "1.5rem",
          marginBottom: "2rem",
          padding: "1.5rem",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.1)",
          border: "2px solid rgba(255,255,255,0.3)"
        }
      },
      {
        type: "comparison",
        items: [
          {
            icon: "📝",
            title: "הוראות",
            description: "כותבים הוראות ברורות"
          },
          {
            icon: "🤖",
            title: "מחשב",
            description: "המחשב מבצע את ההוראות"
          },
          {
            icon: "🎯",
            title: "תוצאה",
            description: "מקבלים את התוצאה הרצויה"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "מה אפשר לעשות עם תכנות:",
        items: [
          "בנות אתרים",
          "ליצור משחקים",
          "לפתח אפליקציות",
          "לפתור בעיות",
          "לאפשר למחשבים לחשוב"
        ],
        style: { 
          fontSize: "1.3rem",
          marginTop: "2rem",
          padding: "1rem",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.1)"
        }
      },
      {
        type: "tip",
        text: "💡 טיפ: תכנות הוא כמו ללמד מחשב שפה חדשה!",
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