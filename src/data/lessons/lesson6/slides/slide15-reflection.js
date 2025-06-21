export const slide15Reflection = {
  id: "slide-15",
  type: "reflection",
  title: "הרהור - מה למדת על פרוטוקולים? 🤔",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "הרהור על השיעור",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "קח רגע לחשוב על מה שלמדת היום:",
        style: { fontSize: "1.4rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "🌐 איך פרוטוקולים עובדים?",
          "📧 איזה פרוטוקולים הכרת?",
          "🔒 למה אבטחה חשובה?",
          "💡 מה היה הכי מעניין?",
          "❓ מה עוד תרצה לדעת?"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "message-box",
        placeholder: "כתוב כאן את המחשבות שלך על השיעור...",
        style: { 
          width: "100%", 
          minHeight: "150px", 
          padding: "1rem", 
          borderRadius: "10px", 
          border: "2px solid white",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          color: "white",
          fontSize: "1.1rem"
        }
      },
      {
        type: "text",
        text: "השיתוף שלך עוזר לנו לשפר את השיעורים!",
        style: { fontSize: "1.2rem", color: "white", textAlign: "center", marginTop: "2rem", fontStyle: "italic" }
      },
      {
        type: "timer",
        duration: 180,
        text: "זמן הרהור"
      }
    ]
  }
}; 