export const slide4DatabaseTypes = {
  id: "slide-4",
  type: "content",
  title: "סוגי מסדי נתונים - איזה סוג לבחור? 🗂️",
  content: {
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    elements: [
      {
        type: "title",
        text: "סוגי מסדי נתונים - איזה סוג לבחור? 🗂️",
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
        title: "סוגי מסדי נתונים עיקריים:",
        items: [
          {
            name: "Relational Database",
            description: "מסד נתונים יחסי - MySQL, PostgreSQL",
            icon: "📊"
          },
          {
            name: "NoSQL Database",
            description: "מסד נתונים לא יחסי - MongoDB, Redis",
            icon: "📋"
          },
          {
            name: "Document Database",
            description: "מסד נתונים מבוסס מסמכים - CouchDB",
            icon: "📄"
          },
          {
            name: "Graph Database",
            description: "מסד נתונים מבוסס גרפים - Neo4j",
            icon: "🕸️"
          },
          {
            name: "Key-Value Database",
            description: "מסד נתונים מפתח-ערך - Redis, DynamoDB",
            icon: "🔑"
          },
          {
            name: "Time Series Database",
            description: "מסד נתונים לטווח זמן - InfluxDB",
            icon: "⏰"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        title: "מתי להשתמש בכל סוג:",
        items: [
          {
            icon: "📊",
            title: "Relational",
            description: "מידע מאורגן עם קשרים ברורים"
          },
          {
            icon: "📋",
            title: "NoSQL",
            description: "מידע גמיש ומשתנה"
          },
          {
            icon: "🕸️",
            title: "Graph",
            description: "קשרים מורכבים בין נתונים"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "למה ללמוד SQL קודם:",
        items: [
          "הכי נפוץ בתעשייה",
          "קל ללמידה והבנה",
          "תמיכה רחבה",
          "כלים רבים זמינים",
          "בסיס לכל מסדי הנתונים"
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
        text: "💡 טיפ: התחילו עם SQL - זה הבסיס לכל מסדי הנתונים!",
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