export const slide9CssStyling = {
  id: "slide-9",
  type: "presentation",
  title: "דוגמאות CSS - קוד ועיצוב 🎨",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "איך כותבים CSS?",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "CSS משתמש בסלקטורים וסגנונות",
        style: { fontSize: "1.4rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "code-block",
        code: `h1 {
    color: blue;
    font-size: 24px;
    text-align: center;
}

p {
    color: black;
    font-size: 16px;
    margin: 10px;
}

.button {
    background-color: green;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
}`,
        language: "css",
        style: { 
          backgroundColor: "rgba(0,0,0,0.3)", 
          padding: "1rem", 
          borderRadius: "10px", 
          fontFamily: "monospace",
          fontSize: "1rem",
          color: "white",
          textAlign: "left",
          marginBottom: "2rem"
        }
      },
      {
        type: "list",
        items: [
          "🎯 סלקטור - איזה אלמנט לעיצוב",
          "📝 סגנונות - איך הוא ייראה",
          "🎨 צבעים - color, background-color",
          "📐 מיקום - margin, padding, text-align"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "כל סגנון מתחיל ב-{ ומסתיים ב-}",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", fontWeight: "bold" }
      },
      {
        type: "timer",
        duration: 120,
        text: "זמן קריאה"
      }
    ]
  }
}; 