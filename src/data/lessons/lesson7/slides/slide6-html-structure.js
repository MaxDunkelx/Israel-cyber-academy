export const slide6HtmlStructure = {
  id: "slide-6",
  type: "presentation",
  title: "מבנה מסמך HTML 📄",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "מבנה בסיסי של מסמך HTML",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "כל מסמך HTML צריך מבנה בסיסי מסוים",
        style: { fontSize: "1.4rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "code-block",
        code: `<!DOCTYPE html>
<html>
<head>
    <title>האתר שלי</title>
</head>
<body>
    <h1>כותרת ראשית</h1>
    <p>פסקה ראשונה</p>
    <p>פסקה שנייה</p>
</body>
</html>`,
        language: "html",
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
          "📄 DOCTYPE - הגדרת סוג המסמך",
          "🌐 html - תגית השורש",
          "📝 head - מידע על האתר",
          "📄 body - התוכן שמוצג"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "זה המבנה הבסיסי של כל אתר אינטרנט!",
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