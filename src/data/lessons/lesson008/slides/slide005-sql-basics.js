export const slide5SqlBasics = {
  id: "slide-5",
  type: "content",
  title: "SQL - שפת מסדי הנתונים 🗣️",
  content: {
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    elements: [
      {
        type: "title",
        text: "SQL - שפת מסדי הנתונים 🗣️",
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
        type: "definition",
        term: "SQL",
        definition: "Structured Query Language - שפת שאילתות מובנית לתקשורת עם מסדי נתונים",
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
        type: "specs",
        title: "פקודות SQL בסיסיות:",
        items: [
          {
            name: "SELECT",
            description: "בחירת נתונים מטבלה",
            icon: "👁️"
          },
          {
            name: "INSERT",
            description: "הוספת נתונים חדשים",
            icon: "➕"
          },
          {
            name: "UPDATE",
            description: "עדכון נתונים קיימים",
            icon: "✏️"
          },
          {
            name: "DELETE",
            description: "מחיקת נתונים",
            icon: "🗑️"
          },
          {
            name: "CREATE",
            description: "יצירת טבלאות חדשות",
            icon: "🏗️"
          },
          {
            name: "DROP",
            description: "מחיקת טבלאות",
            icon: "💥"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        title: "דוגמאות לפקודות:",
        items: [
          {
            icon: "👁️",
            title: "SELECT",
            description: "SELECT * FROM students;"
          },
          {
            icon: "➕",
            title: "INSERT",
            description: "INSERT INTO students VALUES (1, 'דני');"
          },
          {
            icon: "✏️",
            title: "UPDATE",
            description: "UPDATE students SET name='דני' WHERE id=1;"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "tip",
        text: "💡 טיפ: SQL הוא כמו שפה - צריך לתרגל כדי להתרגל!",
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