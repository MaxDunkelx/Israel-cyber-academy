export const slide14PasswordStrength = {
  id: "slide-14",
  type: "content",
  title: "מה הופך סיסמה לחזקה? 🔐",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "מה הופך סיסמה לחזקה? 🔐",
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
        text: "למדו את העקרונות החשובים ליצירת סיסמאות מאובטחות",
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
            icon: "✅",
            title: "סיסמה חזקה",
            description: "לפחות 12 תווים, אותיות גדולות וקטנות, מספרים וסימנים"
          },
          {
            icon: "❌",
            title: "סיסמה חלשה",
            description: "קצרה, רק אותיות, מילים מהמילון, תאריכים אישיים"
          }
        ],
        style: { marginBottom: "3rem" }
      },
      {
        type: "specs",
        items: [
          { icon: "📏", component: "אורך", spec: "לפחות 12 תווים (רצוי 16 או יותר)" },
          { icon: "🔤", component: "אותיות", spec: "אותיות גדולות וקטנות יחד" },
          { icon: "🔢", component: "מספרים", spec: "לפחות 2-3 מספרים" },
          { icon: "🔣", component: "סימנים", spec: "סימנים מיוחדים כמו !@#$%^&*" },
          { icon: "🚫", component: "לא כולל", spec: "מילים מהמילון או פרטים אישיים" },
          { icon: "🔄", component: "ייחודיות", spec: "סיסמה שונה לכל חשבון" }
        ],
        style: { marginBottom: "3rem" }
      },
      {
        type: "list",
        items: [
          "🔐 השתמשו בסיסמה שונה לכל חשבון",
          "📝 שמרו סיסמאות במקום בטוח (לא על המחשב)",
          "🔄 החליפו סיסמאות כל 3-6 חודשים",
          "👥 אל תשתפו סיסמאות עם אף אחד",
          "📱 השתמשו במנהל סיסמאות אם אפשר",
          "🔍 בדקו אם הסיסמה שלכם נחשפה"
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
        text: "סיסמה חזקה היא הקו הראשון של ההגנה על החשבונות שלכם באינטרנט",
        style: { 
          marginTop: "3rem",
          background: "rgba(255,255,255,0.15)",
          border: "3px solid rgba(255,255,255,0.3)",
          padding: "2rem"
        }
      },
      {
        type: "tip",
        text: "💡 טיפ: השתמשו במשפט שאתם זוכרים והחליפו אותיות במספרים וסימנים!",
        style: { 
          fontSize: "1.3rem",
          marginTop: "2rem",
          padding: "1.5rem",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.1)",
          border: "2px solid rgba(255,255,255,0.3)"
        }
      }
    ]
  }
}; 