export const slide13InputOutput = {
  id: "slide-13",
  type: "content",
  title: "מכשירי קלט ופלט - איך מתקשרים עם המחשב 📥📤",
  content: {
    background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
    elements: [
      {
        type: "title",
        text: "מכשירי קלט ופלט 📥📤",
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
        text: "איך אנחנו מתקשרים עם המחשב ואיך הוא מתקשר איתנו",
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
        alt: "Input Output Devices",
        style: { 
          width: "350px", 
          borderRadius: "20px", 
          margin: "2rem auto",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          border: "4px solid rgba(255,255,255,0.2)"
        }
      },
      {
        type: "comparison",
        items: [
          {
            icon: "📥",
            title: "מכשירי קלט (Input)",
            description: "מכשירים ששולחים מידע למחשב"
          },
          {
            icon: "📤",
            title: "מכשירי פלט (Output)",
            description: "מכשירים שמקבלים מידע מהמחשב"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "מכשירי קלט - איך שולחים מידע למחשב:",
        items: [
          "⌨️ מקלדת - כותבים טקסט ומספרים",
          "🖱️ עכבר - מנווטים במסך ובוחרים",
          "📷 מצלמה - מצלמים תמונות וסרטונים",
          "🎤 מיקרופון - מקליטים קול וצלילים",
          "👆 מסך מגע - לוחצים ישירות על המסך",
          "🎮 ג'ויסטיק - משחקים משחקים"
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
        title: "מכשירי פלט - איך המחשב מציג מידע:",
        items: [
          "🖥️ מסך - רואים תמונות, טקסט וסרטונים",
          "🔊 רמקולים - שומעים צלילים ומוזיקה",
          "🖨️ מדפסת - מדפיסים מסמכים ותמונות",
          "📱 רטט - מרגישים התראות בטלפון",
          "💡 נורות - רואים התראות ויזואליות",
          "🎮 רטט בג'ויסטיק - מרגישים במשחקים"
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
        title: "מכשירים משולבים - קלט ופלט:",
        items: [
          "📱 סמארטפון - מקבל ומציג מידע",
          "🖥️ מסך מגע - מקבל ומציג בו זמנית",
          "🎧 אוזניות עם מיקרופון - שומעים ומדברים",
          "📹 מצלמה עם מסך - מצלמים ורואים",
          "🎮 קונסולת משחקים - מקבלת ומציגה",
          "💻 מחשב נייד - הכל ביחד"
        ],
        style: { 
          fontSize: "1.2rem",
          textAlign: "right",
          maxWidth: "600px",
          margin: "2rem auto"
        }
      },
      {
        type: "example",
        title: "דוגמה: כתיבת הודעה",
        process: [
          {
            step: "1",
            action: "לוחצים על מקש",
            device: "מקלדת (קלט)"
          },
          {
            step: "2",
            action: "האות מופיעה על המסך",
            device: "מסך (פלט)"
          },
          {
            step: "3",
            action: "לוחצים על שלח",
            device: "עכבר (קלט)"
          },
          {
            step: "4",
            action: "ההודעה נשלחת",
            device: "אינטרנט (קלט ופלט)"
          }
        ],
        style: { 
          fontSize: "1.1rem",
          textAlign: "right",
          maxWidth: "700px",
          margin: "2rem auto"
        }
      },
      {
        type: "list",
        title: "סוגי קלט שונים:",
        items: [
          "📝 טקסט - אותיות ומספרים",
          "🖱️ עכבר - לחיצות ותנועות",
          "🎤 קול - צלילים ודיבור",
          "📷 תמונה - צילומים וסריקות",
          "👆 מגע - לחיצות וסיבובים",
          "🎮 תנועה - זיהוי תנועה במרחב"
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
        title: "סוגי פלט שונים:",
        items: [
          "🖥️ ויזואלי - תמונות, טקסט, סרטונים",
          "🔊 קולי - צלילים, מוזיקה, דיבור",
          "🖨️ פיזי - הדפסות, חפצים תלת מימדיים",
          "📱 דיגיטלי - קבצים, הודעות, נתונים",
          "💡 אור - נורות, מסכים, התראות",
          "🎮 תחושתי - רטט, חום, לחץ"
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
        text: "💡 טיפ: בלי מכשירי קלט ופלט - המחשב לא יכול לתקשר איתנו!",
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