export const slide6DataVsInformation = {
  id: "slide-6",
  type: "content",
  title: "נתונים לעומת מידע - מה ההבדל? 📊",
  content: {
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    elements: [
      {
        type: "title",
        text: "נתונים לעומת מידע 📊",
        style: { 
          fontSize: "3.5rem", 
          color: "white", 
          textAlign: "center", 
          marginBottom: "2rem", 
          fontWeight: "bold", 
          textShadow: "0 8px 16px rgba(0,0,0,0.4)"
        }
      },
      {
        type: "subtitle",
        text: "איך המחשב הופך מספרים וטקסט למידע שימושי",
        style: { 
          fontSize: "1.6rem", 
          color: "white", 
          textAlign: "center", 
          opacity: 0.95, 
          marginBottom: "3rem",
          textShadow: "0 4px 8px rgba(0,0,0,0.3)"
        }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
        alt: "Data vs Information",
        style: { 
          width: "350px", 
          borderRadius: "20px", 
          margin: "2rem auto",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          border: "4px solid rgba(255,255,255,0.2)"
        }
      },
      {
        type: "comparison",
        items: [
          {
            icon: "📊",
            title: "נתונים (Data)",
            description: "עובדות גולמיות - מספרים, אותיות, סמלים"
          },
          {
            icon: "💡",
            title: "מידע (Information)",
            description: "נתונים שעובדו והפכו לשימושיים"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "example",
        title: "דוגמה: ציונים בכיתה",
        data: {
          raw: "85, 92, 78, 95, 88, 91, 76, 89, 94, 82",
          processed: "ממוצע: 87, הציון הגבוה: 95, הציון הנמוך: 76"
        },
        style: { 
          fontSize: "1.2rem",
          marginTop: "2rem",
          padding: "1.5rem",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.1)",
          border: "2px solid rgba(255,255,255,0.3)"
        }
      },
      {
        type: "list",
        title: "דוגמאות לנתונים:",
        items: [
          "🔢 מספרים - 25, 100, 3.14",
          "📝 טקסט - 'שלום', 'מחשב', 'ישראל'",
          "📅 תאריכים - 15.12.2024",
          "📍 כתובות - 'רחוב הרצל 15, תל אביב'",
          "📞 טלפונים - 03-1234567",
          "📧 אימיילים - student@school.co.il"
        ],
        style: { 
          fontSize: "1.2rem",
          textAlign: "right",
          maxWidth: "600px",
          margin: "2rem auto"
        }
      },
      {
        type: "list",
        title: "דוגמאות למידע:",
        items: [
          "📈 גרף ציונים - איך הכיתה הצליחה",
          "📊 דוח מכירות - איזה מוצרים נמכרו הכי טוב",
          "🗺️ מפה - איך להגיע ממקום למקום",
          "📱 רשימת אנשי קשר - עם מי אפשר לדבר",
          "📅 לוח זמנים - מתי יש שיעורים",
          "💳 חשבון בנק - כמה כסף יש לנו"
        ],
        style: { 
          fontSize: "1.2rem",
          textAlign: "right",
          maxWidth: "600px",
          margin: "2rem auto"
        }
      },
      {
        type: "process",
        title: "איך המחשב עובד עם נתונים:",
        steps: [
          {
            step: "1",
            title: "קולט נתונים",
            description: "מקבל מידע מהמקלדת, העכבר, המצלמה"
          },
          {
            step: "2",
            title: "מעבד נתונים",
            description: "מחשב, ממיין, משווה, מנתח"
          },
          {
            step: "3",
            title: "יוצר מידע",
            description: "מציג תוצאות בצורה שימושית"
          },
          {
            step: "4",
            title: "שומר מידע",
            description: "מאחסן לשימוש עתידי"
          }
        ],
        style: { 
          fontSize: "1.1rem",
          textAlign: "right",
          maxWidth: "700px",
          margin: "2rem auto"
        }
      },
      {
        type: "tip",
        text: "💡 טיפ: נתונים הם כמו חומרי גלם, ומידע הוא כמו המוצר המוגמר!",
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