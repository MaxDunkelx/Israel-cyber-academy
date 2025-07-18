export const slide4WhatIsOS = {
  id: "slide-4",
  type: "content",
  title: "מה זה מערכת הפעלה? - המנהל של המחשב 🎯",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "מה זה מערכת הפעלה? 🎯",
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
        text: "התוכנה החשובה ביותר במחשב - המנהל שמפעיל הכל",
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
        src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop",
        alt: "Operating System",
        style: { 
          width: "350px", 
          borderRadius: "20px", 
          margin: "2rem auto",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          border: "4px solid rgba(255,255,255,0.2)"
        }
      },
      {
        type: "definition",
        title: "מערכת הפעלה",
        text: "תוכנה שמנהלת את כל החומרה והתוכנות במחשב ומאפשרת למשתמשים להשתמש במחשב",
        style: { 
          fontSize: "1.1rem",
          marginTop: "2rem",
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
            icon: "🏗️",
            title: "בלי מערכת הפעלה",
            description: "מחשב כבוי - לא עושה כלום"
          },
          {
            icon: "🖥️",
            title: "עם מערכת הפעלה",
            description: "מחשב עובד - הכל פועל"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "מה מערכת ההפעלה עושה:",
        items: [
          "🎯 מנהלת את החומרה - מפעילה את המעבד, הזיכרון, הדיסק",
          "📱 מנהלת את התוכנות - מריץ, עוצר, מחליף בין תוכנות",
          "👤 מנהלת משתמשים - שומרת הגדרות לכל משתמש",
          "📁 מנהלת קבצים - שומרת ומארגנת קבצים ותיקיות",
          "🔒 שומרת על אבטחה - מגנה מפני וירוסים ופריצות",
          "🌐 מתחברת לאינטרנט - מאפשרת גלישה ותקשורת"
        ],
        style: { 
          fontSize: "1.3rem",
          textAlign: "right",
          maxWidth: "600px",
          margin: "2rem auto"
        }
      },
      {
        type: "analogy",
        title: "מערכת ההפעלה היא כמו מנהל בית:",
        comparison: {
          manager: {
            title: "מנהל בית",
            items: [
              "🏠 מנהל את כל החדרים",
              "👥 מקבל אורחים",
              "🔑 נותן מפתחות",
              "⚡ מפעיל חשמל ומים",
              "🛡️ שומר על הבטיחות",
              "📞 מתקשר עם ספקים"
            ]
          },
          os: {
            title: "מערכת הפעלה",
            items: [
              "💻 מנהלת את כל התוכנות",
              "👤 מקבלת משתמשים",
              "🔐 נותנת הרשאות",
              "⚡ מפעילה חומרה",
              "🛡️ שומרת על אבטחה",
              "🌐 מתחברת לאינטרנט"
            ]
          }
        },
        style: { 
          fontSize: "1.1rem",
          textAlign: "right",
          maxWidth: "800px",
          margin: "2rem auto"
        }
      },
      {
        type: "tip",
        text: "💡 טיפ: בלי מערכת הפעלה - המחשב הוא כמו מכונית בלי מפתח!",
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