export const slide7WindowsVersions = {
  id: "slide-7",
  type: "content",
  title: "גרסאות Windows - איזה גרסה יש לכם? 📋",
  content: {
    background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    elements: [
      {
        type: "title",
        text: "גרסאות Windows 📋",
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
        text: "הכרת הגרסאות השונות של Windows וההבדלים ביניהן",
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
        alt: "Windows Versions",
        style: { 
          width: "350px", 
          borderRadius: "20px", 
          margin: "2rem auto",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          border: "4px solid rgba(255,255,255,0.2)"
        }
      },
      {
        type: "list",
        title: "גרסאות Windows המודרניות:",
        items: [
          "🪟 Windows 11 - הגרסה החדשה ביותר (2021)",
          "🪟 Windows 10 - הגרסה הנפוצה ביותר (2015)",
          "🪟 Windows 8.1 - גרסה קצרה (2013)",
          "🪟 Windows 8 - גרסה עם בעיות (2012)",
          "🪟 Windows 7 - גרסה יציבה (2009)",
          "🪟 Windows Vista - גרסה בעייתית (2006)"
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
        title: "גרסאות Windows הישנות:",
        items: [
          "🪟 Windows XP - הגרסה הכי פופולרית (2001)",
          "🪟 Windows 2000 - לגיבורים (2000)",
          "🪟 Windows ME - גרסה קצרה (2000)",
          "🪟 Windows 98 - גרסה יציבה (1998)",
          "🪟 Windows 95 - המהפכה (1995)",
          "🪟 Windows 3.1 - הגרסה הראשונה (1992)"
        ],
        style: { 
          fontSize: "1.2rem",
          textAlign: "right",
          maxWidth: "600px",
          margin: "2rem auto"
        }
      },
      {
        type: "comparison",
        items: [
          {
            icon: "🪟",
            title: "Windows 11",
            description: "חדשה, יפה, מתקדמת"
          },
          {
            icon: "🪟",
            title: "Windows 10",
            description: "יציבה, נפוצה, טובה"
          },
          {
            icon: "🪟",
            title: "Windows 7",
            description: "ישנה, יציבה, עדיין עובדת"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "איך לבדוק איזה גרסה יש לכם:",
        items: [
          "🖱️ לחצו על כפתור התחל",
          "⚙️ לחצו על הגדרות (Settings)",
          "💻 לחצו על מערכת (System)",
          "ℹ️ לחצו על אודות (About)",
          "📋 חפשו את 'גרסת Windows'",
          "📝 כתבו את המספר שאתם רואים"
        ],
        style: { 
          fontSize: "1.2rem",
          textAlign: "right",
          maxWidth: "600px",
          margin: "2rem auto"
        }
      },
      {
        type: "tip",
        text: "💡 טיפ: Windows 10 עדיין הגרסה הכי נפוצה - היא יציבה ועובדת טוב!",
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