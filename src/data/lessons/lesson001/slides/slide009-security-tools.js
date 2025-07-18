export const slide7SecurityTools = {
  id: "slide-7",
  type: "content",
  title: "כלי אבטחה דיגיטלית 🛡️",
  content: {
    background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    elements: [
      {
        type: "title",
        text: "כלי אבטחה דיגיטלית 🛡️",
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
        text: "הכירו את הכלים החשובים ביותר להגנה על עצמכם באינטרנט",
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
        type: "specs",
        items: [
          { icon: "🔐", component: "סיסמאות חזקות", spec: "לפחות 12 תווים עם אותיות, מספרים וסימנים" },
          { icon: "🔒", component: "אימות דו-שלבי", spec: "קוד נוסף שנשלח לטלפון או אימייל" },
          { icon: "🛡️", component: "אנטי-וירוס", spec: "תוכנה שמגנה מפני תוכנות זדוניות" },
          { icon: "🌐", component: "VPN", spec: "מסתיר את המיקום שלכם באינטרנט" },
          { icon: "🔍", component: "חומת אש", spec: "בודקת תעבורת רשת ומונעת גישה לא מורשית" },
          { icon: "📱", component: "עדכוני אבטחה", spec: "תיקוני באגים וחולשות אבטחה" }
        ],
        style: { marginBottom: "3rem" }
      },
      {
        type: "comparison",
        items: [
          {
            icon: "✅",
            title: "מה לעשות",
            description: "השתמשו בסיסמאות חזקות, הפעילו אימות דו-שלבי, התקינו אנטי-וירוס"
          },
          {
            icon: "❌",
            title: "מה לא לעשות",
            description: "אל תשתפו סיסמאות, אל תפתחו קישורים חשודים, אל תספקו פרטים אישיים"
          }
        ],
        style: { marginBottom: "3rem" }
      },
      {
        type: "tip",
        text: "💡 טיפ: תמיד בדקו את כתובת האתר לפני הזנת פרטים אישיים!",
        style: { 
          fontSize: "1.3rem",
          padding: "1.5rem",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.15)",
          border: "3px solid rgba(255,255,255,0.3)"
        }
      }
    ]
  }
}; 