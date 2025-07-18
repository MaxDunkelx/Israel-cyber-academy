export const slide5WhatIsComputer = {
  id: "slide-5",
  type: "content",
  title: "מה זה מחשב? - המכונה המדהימה 🖥️",
  content: {
    background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
    elements: [
      {
        type: "title",
        text: "מה זה מחשב? 🖥️",
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
        text: "המכונה המדהימה שמשנה את העולם שלנו",
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
        alt: "What is a Computer",
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
        title: "מחשב",
        text: "מכונה אלקטרונית שמקבלת מידע, מעבדת אותו ומפיקה תוצאות שימושיות",
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
            icon: "🧠",
            title: "מוח אנושי",
            description: "חושב, זוכר, לומד, יוצר"
          },
          {
            icon: "💻",
            title: "מחשב",
            description: "מעבד, שומר, מבצע, מציג"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "מה המחשב עושה:",
        items: [
          "📥 מקבל מידע (קלט) - מהמקלדת, העכבר, המצלמה",
          "🧠 מעבד את המידע - חושב ומחשב",
          "💾 שומר מידע - בזיכרון ובדיסק",
          "📤 מציג תוצאות (פלט) - על המסך, ברמקול",
          "🔄 חוזר על התהליך - מיליוני פעמים בשנייה",
          "🌐 מתקשר עם מחשבים אחרים - דרך האינטרנט"
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
        title: "סוגי מחשבים:",
        items: [
          "🖥️ מחשב שולחני - יושב על השולחן",
          "💻 מחשב נייד - אפשר לקחת איתנו",
          "📱 סמארטפון - מחשב בכיס",
          "📱 טאבלט - מחשב שטוח",
          "🎮 קונסולת משחקים - למשחקים",
          "🏢 שרת - מחשב חזק למשרדים"
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
        title: "איפה אנחנו רואים מחשבים:",
        items: [
          "🏠 בבית - מחשב אישי, טלוויזיה חכמה",
          "🏫 בבית הספר - מחשבים בכיתה",
          "🏢 במשרד - מחשבים לעבודה",
          "🏥 בבית החולים - מכשירים רפואיים",
          "🚗 במכונית - מערכות ניווט ובקרה",
          "🛒 בקניון - מכונות אוטומטיות"
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
        text: "💡 טיפ: המחשב הוא כמו עוזר אישי - הוא עושה מה שאנחנו אומרים לו, אבל הרבה יותר מהר!",
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