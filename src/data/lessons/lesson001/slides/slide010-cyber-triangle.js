export const slide8CyberTriangle = {
  id: "slide-8",
  type: "content",
  title: "משולש הסייבר - CIA 🎯",
  content: {
    background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
    elements: [
      {
        type: "title",
        text: "משולש הסייבר - CIA 🎯",
        style: { 
          fontSize: "3.5rem", 
          color: "white", 
          textAlign: "center", 
          marginBottom: "2rem", 
          fontWeight: "bold", 
          textShadow: "0 6px 12px rgba(0,0,0,0.3)"
        }
      },
      {
        type: "subtitle",
        text: "שלושת העקרונות הבסיסיים של אבטחת מידע",
        style: { 
          fontSize: "1.5rem", 
          color: "white", 
          textAlign: "center", 
          opacity: 0.95, 
          marginBottom: "3rem",
          textShadow: "0 4px 8px rgba(0,0,0,0.3)"
        }
      },
      {
        type: "comparison",
        items: [
          {
            icon: "🔒",
            title: "Confidentiality - סודיות",
            description: "המידע נגיש רק למי שמורשה לגשת אליו"
          },
          {
            icon: "✅",
            title: "Integrity - שלמות",
            description: "המידע נשאר מדויק ולא משתנה ללא אישור"
          },
          {
            icon: "🔄",
            title: "Availability - זמינות",
            description: "המידע זמין למי שצריך אותו בזמן הנכון"
          }
        ],
        style: { marginBottom: "3rem" }
      },
      {
        type: "list",
        items: [
          "🔐 סודיות - רק אנשים מורשים יכולים לגשת למידע",
          "✅ שלמות - המידע נשאר מדויק ולא משתנה",
          "🔄 זמינות - המידע זמין כשצריכים אותו",
          "🛡️ שלושתם יחד יוצרים אבטחה מושלמת"
        ],
        style: { 
          fontSize: "1.3rem",
          textAlign: "right",
          maxWidth: "600px",
          margin: "0 auto"
        }
      },
      {
        type: "definition",
        text: "משולש ה-CIA הוא הבסיס לכל מערכת אבטחת מידע. אם אחד מהעקרונות נפגע, כל המערכת בסכנה.",
        style: { 
          marginTop: "3rem",
          background: "rgba(255,255,255,0.15)",
          border: "3px solid rgba(255,255,255,0.3)",
          padding: "2rem"
        }
      },
      {
        type: "tip",
        text: "💡 דמיינו משולש - אם צד אחד נפגע, המשולש מתמוטט. כך גם באבטחת מידע!",
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