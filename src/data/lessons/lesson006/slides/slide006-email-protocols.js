export const slide6EmailProtocols = {
  id: "slide-6",
  type: "content",
  title: "פרוטוקולי אימייל 📧",
  content: {
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    elements: [
      {
        type: "title",
        text: "פרוטוקולי אימייל 📧",
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
        title: "פרוטוקולי אימייל עיקריים:",
        items: [
          {
            name: "SMTP",
            description: "Simple Mail Transfer Protocol - שליחת מיילים",
            icon: "📤"
          },
          {
            name: "POP3",
            description: "Post Office Protocol - קבלת מיילים (הורדה)",
            icon: "📥"
          },
          {
            name: "IMAP",
            description: "Internet Message Access Protocol - גישה למיילים",
            icon: "📬"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        title: "SMTP vs POP3 vs IMAP:",
        items: [
          {
            icon: "📤",
            title: "SMTP",
            description: "שולח מיילים מהמחשב לשרת"
          },
          {
            icon: "📥",
            title: "POP3",
            description: "מוריד מיילים מהשרת למחשב"
          },
          {
            icon: "📬",
            title: "IMAP",
            description: "מאפשר גישה למיילים מכל מכשיר"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "יתרונות IMAP:",
        items: [
          "גישה מכל מכשיר",
          "סנכרון בין מכשירים",
          "חיסכון במקום אחסון",
          "גיבוי אוטומטי",
          "עבודה במצב לא מקוון"
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
        text: "💡 טיפ: IMAP הוא הפרוטוקול המודרני ביותר ומתאים ביותר לשימוש כיום!",
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