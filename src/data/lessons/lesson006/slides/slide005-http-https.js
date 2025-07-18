export const slide5HttpHttps = {
  id: "slide-5",
  type: "content",
  title: "HTTP vs HTTPS 🔐",
  content: {
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    elements: [
      {
        type: "title",
        text: "HTTP vs HTTPS 🔐",
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
        type: "comparison",
        title: "השוואה בין HTTP ו-HTTPS:",
        items: [
          {
            icon: "🌐",
            title: "HTTP",
            description: "פרוטוקול בסיסי לגלישה באינטרנט",
            details: [
              "לא מאובטח",
              "נתונים נשלחים בטקסט רגיל",
              "מהיר יותר",
              "פורט 80"
            ]
          },
          {
            icon: "🔒",
            title: "HTTPS",
            description: "פרוטוקול מאובטח לגלישה באינטרנט",
            details: [
              "מאובטח עם הצפנה",
              "נתונים מוצפנים",
              "איטי יותר",
              "פורט 443"
            ]
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "מתי להשתמש ב-HTTPS:",
        items: [
          "בעת הזנת סיסמאות",
          "בעת ביצוע רכישות",
          "בעת שליחת מידע אישי",
          "באתרים פיננסיים",
          "בכל אתר מודרני"
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
        text: "💡 טיפ: תמיד בדקו שהכתובת מתחילה ב-HTTPS כשאתם מזינים מידע אישי!",
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