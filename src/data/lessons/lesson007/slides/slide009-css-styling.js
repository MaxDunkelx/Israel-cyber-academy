export const slide9CssStyling = {
  id: "slide-9",
  type: "content",
  title: "עיצוב עם CSS - איך מעצבים? 🎨",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "עיצוב עם CSS - איך מעצבים? 🎨",
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
        title: "סגנונות CSS בסיסיים:",
        items: [
          {
            name: "color",
            description: "צבע הטקסט",
            icon: "🎨"
          },
          {
            name: "background-color",
            description: "צבע הרקע",
            icon: "🖼️"
          },
          {
            name: "font-size",
            description: "גודל הגופן",
            icon: "📏"
          },
          {
            name: "font-family",
            description: "סוג הגופן",
            icon: "📝"
          },
          {
            name: "text-align",
            description: "יישור הטקסט",
            icon: "📍"
          },
          {
            name: "margin/padding",
            description: "רווחים",
            icon: "📦"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        title: "דוגמאות לסגנונות:",
        items: [
          {
            icon: "🎨",
            title: "צבעים",
            description: "color: blue; background-color: yellow;"
          },
          {
            icon: "📏",
            title: "גדלים",
            description: "font-size: 20px; width: 300px;"
          },
          {
            icon: "📍",
            title: "מיקום",
            description: "text-align: center; margin: 10px;"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "טיפים לעיצוב:",
        items: [
          "השתמשו בצבעים שמתאימים אחד לשני",
          "שמרו על עקביות בעיצוב",
          "השתמשו בגופנים קריאים",
          "הוסיפו רווחים מתאימים",
          "בדקו איך זה נראה במסכים שונים"
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
        text: "💡 טיפ: עיצוב טוב הוא כמו איפור - צריך להיות עדין ומתאים!",
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