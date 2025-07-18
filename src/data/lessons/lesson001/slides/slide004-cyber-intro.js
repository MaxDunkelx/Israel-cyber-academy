export const slide3CyberIntro = {
  id: "slide-3",
  type: "content",
  title: "מה זה בכלל 'סייבר'? 🌐",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "מה זה בכלל 'סייבר'? 🌐",
        style: { 
          fontSize: "3.5rem", 
          color: "white", 
          textAlign: "center", 
          marginBottom: "2rem", 
          fontWeight: "bold", 
          textShadow: "0 6px 12px rgba(0,0,0,0.3)"
        }
      },
      {
        type: "definition",
        text: "סייבר הוא עולם הדיגיטלי - האינטרנט, המחשבים, הטלפונים החכמים וכל הטכנולוגיה שמחברת ביניהם",
        style: { 
          marginBottom: "3rem",
          background: "rgba(255,255,255,0.15)",
          border: "3px solid rgba(255,255,255,0.3)",
          padding: "2rem"
        }
      },
      {
        type: "comparison",
        items: [
          {
            icon: "🌍",
            title: "העולם הפיזי",
            description: "העולם שאנחנו רואים, נוגעים וחיים בו"
          },
          {
            icon: "💻",
            title: "העולם הדיגיטלי",
            description: "העולם של המחשבים, האינטרנט והטכנולוגיה"
          }
        ],
        style: { marginBottom: "3rem" }
      },
      {
        type: "list",
        items: [
          "📱 הטלפון החכם שלכם",
          "💻 המחשב בבית הספר",
          "🎮 משחקי וידאו",
          "📺 הטלוויזיה החכמה",
          "🚗 המכונית המודרנית",
          "🏠 הבית החכם"
        ],
        style: { 
          fontSize: "1.3rem",
          textAlign: "right",
          maxWidth: "500px",
          margin: "0 auto"
        }
      },
      {
        type: "tip",
        text: "💡 כל דבר שמחובר לאינטרנט הוא חלק מעולם הסייבר!",
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