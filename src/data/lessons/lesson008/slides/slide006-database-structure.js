export const slide6DatabaseStructure = {
  id: "slide-6",
  type: "content",
  title: "מבנה מסד נתונים - איך מארגנים מידע? 🏗️",
  content: {
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    elements: [
      {
        type: "title",
        text: "מבנה מסד נתונים - איך מארגנים מידע? 🏗️",
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
        title: "רכיבי מסד נתונים:",
        items: [
          {
            name: "Database",
            description: "מסד הנתונים הראשי",
            icon: "📊"
          },
          {
            name: "Table",
            description: "טבלה עם מידע מסוג מסוים",
            icon: "📋"
          },
          {
            name: "Column",
            description: "עמודה עם סוג מידע ספציפי",
            icon: "📏"
          },
          {
            name: "Row",
            description: "שורה עם מידע אחד",
            icon: "➡️"
          },
          {
            name: "Primary Key",
            description: "מזהה ייחודי לכל שורה",
            icon: "🔑"
          },
          {
            name: "Foreign Key",
            description: "קשר לטבלה אחרת",
            icon: "🔗"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        title: "דוגמה לטבלת תלמידים:",
        items: [
          {
            icon: "📋",
            title: "טבלה",
            description: "students"
          },
          {
            icon: "📏",
            title: "עמודות",
            description: "id, name, age, grade"
          },
          {
            icon: "➡️",
            title: "שורות",
            description: "כל תלמיד הוא שורה"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "עקרונות עיצוב מסד נתונים:",
        items: [
          "כל טבלה צריכה מזהה ייחודי",
          "הימנעו מכפילות מידע",
          "שמרו על קשרים לוגיים",
          "השתמשו בשמות ברורים",
          "תכננו מראש את המבנה"
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
        text: "💡 טיפ: תכנון טוב של המבנה חוסך הרבה בעיות בהמשך!",
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