export const slide25EncryptionBasics = {
  id: "slide-25",
  type: "content",
  title: "הצפנה - איך מסתירים מידע ברשת? 🔐",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "הצפנה - הגנה על מידע 🔐",
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
        text: "איך הטכנולוגיה מסתירה את המידע שלנו ברשת",
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
        src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop",
        alt: "Encryption",
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
        title: "הצפנה",
        text: "תהליך של הפיכת מידע רגיל לקוד סודי שאפשר לקרוא רק עם מפתח מיוחד",
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
            icon: "📝",
            title: "הודעה רגילה",
            description: "שלום חברים! איך אתם?"
          },
          {
            icon: "🔐",
            title: "הודעה מוצפנת",
            description: "X8K2M9P4Q7R1S5T3U6V0W2Y4Z8"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "איפה אנחנו רואים הצפנה:",
        items: [
          "🌐 אתרים עם HTTPS (הנעלה ירוקה)",
          "📱 הודעות WhatsApp ו-Telegram",
          "💳 קניות באינטרנט",
          "🏦 בנקאות מקוונת",
          "📧 אימיילים חשובים",
          "🔒 קבצים מוגנים"
        ],
        style: { 
          fontSize: "1.3rem",
          textAlign: "right",
          maxWidth: "600px",
          margin: "2rem auto"
        }
      },
      {
        type: "list",
        title: "איך הצפנה עובדת:",
        items: [
          "🔑 יש מפתח מיוחד להצפנה",
          "📝 המידע הופך לקוד סודי",
          "📤 המידע נשלח ברשת",
          "🔓 רק מי שיש לו מפתח יכול לקרוא",
          "🛡️ אחרים לא יכולים להבין",
          "✅ המידע נשאר בטוח"
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
        title: "סוגי הצפנה:",
        items: [
          "🔐 הצפנה סימטרית - אותו מפתח להצפנה ופענוח",
          "🔑 הצפנה אסימטרית - מפתח ציבורי ופרטי",
          "🔒 הצפנה חד-כיוונית - לא ניתן לפענח חזרה",
          "📱 הצפנה מקצה לקצה - רק השולח והמקבל רואים"
        ],
        style: { 
          fontSize: "1.1rem",
          textAlign: "right",
          maxWidth: "600px",
          margin: "2rem auto"
        }
      },
      {
        type: "tip",
        text: "💡 טיפ: תמיד חפשו את הנעלה הירוקה (HTTPS) כשאתם מזינים מידע אישי באתרים!",
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