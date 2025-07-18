export const slide11Joins = {
  id: "slide-11",
  type: "content",
  title: "JOIN - איך מחברים טבלאות? 🔗",
  content: {
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    elements: [
      {
        type: "title",
        text: "JOIN - איך מחברים טבלאות? 🔗",
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
        title: "סוגי JOIN:",
        items: [
          {
            name: "INNER JOIN",
            description: "רק שורות עם התאמה בשתי הטבלאות",
            icon: "🔗"
          },
          {
            name: "LEFT JOIN",
            description: "כל השורות מהטבלה השמאלית",
            icon: "⬅️"
          },
          {
            name: "RIGHT JOIN",
            description: "כל השורות מהטבלה הימנית",
            icon: "➡️"
          },
          {
            name: "FULL JOIN",
            description: "כל השורות משתי הטבלאות",
            icon: "↔️"
          },
          {
            name: "CROSS JOIN",
            description: "כל השילובים האפשריים",
            icon: "❌"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        title: "דוגמאות JOIN:",
        items: [
          {
            icon: "🔗",
            title: "INNER JOIN",
            description: "SELECT * FROM students JOIN grades ON students.id = grades.student_id;"
          },
          {
            icon: "⬅️",
            title: "LEFT JOIN",
            description: "SELECT * FROM students LEFT JOIN grades ON students.id = grades.student_id;"
          },
          {
            icon: "➡️",
            title: "RIGHT JOIN",
            description: "SELECT * FROM students RIGHT JOIN grades ON students.id = grades.student_id;"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "tip",
        text: "💡 טיפ: INNER JOIN הוא הכי נפוץ - הוא נותן רק מידע רלוונטי!",
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