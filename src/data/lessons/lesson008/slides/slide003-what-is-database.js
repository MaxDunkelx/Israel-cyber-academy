export const slide3WhatIsDatabase = {
  id: "slide-3",
  type: "content",
  title: "מה זה מסד נתונים? 📊",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "מה זה מסד נתונים? 📊",
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
        term: "מסד נתונים",
        definition: "מסד נתונים הוא אוסף מאורגן של מידע שמאוחסן במחשב וניתן לגישה מהירה",
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
            icon: "📁",
            title: "קובץ רגיל",
            description: "מידע פשוט ללא מבנה"
          },
          {
            icon: "📊",
            title: "מסד נתונים",
            description: "מידע מאורגן עם מבנה"
          },
          {
            icon: "🔍",
            title: "חיפוש מהיר",
            description: "מציאת מידע בקלות"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "מה אפשר לעשות עם מסד נתונים:",
        items: [
          "לשמור מידע בצורה מאורגנת",
          "לחפש מידע במהירות",
          "לעדכן מידע בקלות",
          "למחוק מידע לא נחוץ",
          "להגן על המידע",
          "לשתף מידע בין משתמשים"
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
        text: "💡 טיפ: מסד נתונים הוא כמו ספרייה מאורגנת - כל המידע במקום הנכון!",
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