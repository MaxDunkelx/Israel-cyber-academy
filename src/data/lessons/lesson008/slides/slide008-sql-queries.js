export const slide8SqlQueries = {
  id: "slide-8",
  type: "content",
  title: "שאילתות SQL - איך מחפשים מידע? 🔍",
  content: {
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    elements: [
      {
        type: "title",
        text: "שאילתות SQL - איך מחפשים מידע? 🔍",
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
        title: "סוגי שאילתות:",
        items: [
          {
            name: "SELECT בסיסי",
            description: "SELECT * FROM table_name;",
            icon: "👁️"
          },
          {
            name: "SELECT עם תנאי",
            description: "SELECT * FROM students WHERE age > 15;",
            icon: "🔍"
          },
          {
            name: "SELECT עם מיון",
            description: "SELECT * FROM students ORDER BY name;",
            icon: "📊"
          },
          {
            name: "SELECT עם הגבלה",
            description: "SELECT * FROM students LIMIT 10;",
            icon: "📏"
          },
          {
            name: "SELECT עם חישוב",
            description: "SELECT COUNT(*) FROM students;",
            icon: "🧮"
          },
          {
            name: "SELECT עם קישור",
            description: "SELECT * FROM students JOIN grades;",
            icon: "🔗"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        title: "דוגמאות שאילתות:",
        items: [
          {
            icon: "👁️",
            title: "כל התלמידים",
            description: "SELECT * FROM students;"
          },
          {
            icon: "🔍",
            title: "תלמידים מעל גיל 15",
            description: "SELECT * FROM students WHERE age > 15;"
          },
          {
            icon: "📊",
            title: "מיון לפי שם",
            description: "SELECT * FROM students ORDER BY name;"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "טיפים לכתיבת שאילתות:",
        items: [
          "השתמשו בשמות טבלאות ברורים",
          "בדקו תחביר לפני הרצה",
          "השתמשו ב-WHERE לסינון",
          "השתמשו ב-ORDER BY למיון",
          "השתמשו ב-LIMIT להגבלה"
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
        text: "💡 טיפ: התחילו עם שאילתות פשוטות והתקדמו בהדרגה!",
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