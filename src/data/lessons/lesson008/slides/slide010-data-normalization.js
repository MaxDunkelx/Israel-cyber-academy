export const slide10DataNormalization = {
  id: "slide-10",
  type: "content",
  title: "נרמול נתונים - איך מארגנים מידע נכון? 📐",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "נרמול נתונים - איך מארגנים מידע נכון? 📐",
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
        term: "נרמול נתונים",
        definition: "תהליך ארגון הנתונים במסד נתונים כדי להפחית כפילות ולשפר יעילות",
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
        title: "צורות נרמול:",
        items: [
          {
            name: "1NF - First Normal Form",
            description: "כל ערך הוא אטומי (לא ניתן לחלוקה)",
            icon: "1️⃣"
          },
          {
            name: "2NF - Second Normal Form",
            description: "1NF + אין תלויות חלקיות",
            icon: "2️⃣"
          },
          {
            name: "3NF - Third Normal Form",
            description: "2NF + אין תלויות מעבר",
            icon: "3️⃣"
          },
          {
            name: "BCNF - Boyce-Codd Normal Form",
            description: "גרסה חזקה יותר של 3NF",
            icon: "🔷"
          },
          {
            name: "4NF - Fourth Normal Form",
            description: "מטפל בתלויות רב-ערכיות",
            icon: "4️⃣"
          },
          {
            name: "5NF - Fifth Normal Form",
            description: "מטפל בתלויות הצטלבות",
            icon: "5️⃣"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        title: "יתרונות נרמול:",
        items: [
          {
            icon: "📦",
            title: "פחות כפילות",
            description: "חיסכון במקום אחסון"
          },
          {
            icon: "⚡",
            title: "ביצועים טובים יותר",
            description: "שאילתות מהירות יותר"
          },
          {
            icon: "🔒",
            title: "עקביות נתונים",
            description: "פחות שגיאות"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "עקרונות נרמול:",
        items: [
          "כל טבלה צריכה מטרה אחת",
          "הימנעו מכפילות מידע",
          "השתמשו במפתחות זרים לקשרים",
          "שמרו על עקביות",
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
        text: "💡 טיפ: נרמול טוב הוא המפתח למסד נתונים יעיל!",
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