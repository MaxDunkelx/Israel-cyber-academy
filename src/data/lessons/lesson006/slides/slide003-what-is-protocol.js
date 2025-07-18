export const slide3WhatIsProtocol = {
  id: "slide-3",
  type: "content",
  title: "מה זה פרוטוקול? 📋",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "מה זה פרוטוקול? 📋",
        style: { 
          fontSize: "4rem", 
          color: "white", 
          textAlign: "center", 
          marginBottom: "2rem", 
          fontWeight: "bold", 
          textShadow: "0 8px 16px rgba(0,0,0,0.4)",
          animation: "fadeInUp 1s ease-out"
        }
      },
      {
        type: "definition",
        term: "פרוטוקול",
        definition: "פרוטוקול הוא מערכת של כללים וסטנדרטים שמגדירים איך מכשירים מתקשרים ביניהם ברשת",
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
        type: "comparison",
        items: [
          {
            icon: "🌐",
            title: "תקשורת",
            description: "איך מכשירים מדברים"
          },
          {
            icon: "📋",
            title: "כללים",
            description: "סטנדרטים מוסכמים"
          },
          {
            icon: "🔒",
            title: "אבטחה",
            description: "הגנה על המידע"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "דוגמאות לפרוטוקולים:",
        items: [
          "HTTP - לגלישה באינטרנט",
          "HTTPS - גלישה מאובטחת",
          "SMTP - שליחת אימיילים",
          "FTP - העברת קבצים",
          "SSH - חיבור מאובטח"
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
        text: "💡 טיפ: פרוטוקולים הם כמו שפה משותפת שמכשירים משתמשים בה כדי להבין אחד את השני!",
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