export const slide8HardwareVsSoftware = {
  id: "slide-8",
  type: "content",
  title: "חומרה מול תוכנה - ההבדלים החשובים ⚖️",
  content: {
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    elements: [
      {
        type: "title",
        text: "חומרה מול תוכנה ⚖️",
        style: { 
          fontSize: "3.5rem", 
          color: "#2c3e50", 
          textAlign: "center", 
          marginBottom: "2rem", 
          fontWeight: "bold", 
          textShadow: "0 4px 8px rgba(0,0,0,0.2)"
        }
      },
      {
        type: "subtitle",
        text: "ההבדלים החשובים בין החלקים הפיזיים לתוכניות הדיגיטליות",
        style: { 
          fontSize: "1.6rem", 
          color: "#34495e", 
          textAlign: "center", 
          opacity: 0.9, 
          marginBottom: "3rem",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop",
        alt: "Hardware vs Software",
        style: { 
          width: "350px", 
          borderRadius: "20px", 
          margin: "2rem auto",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          border: "4px solid rgba(255,255,255,0.5)"
        }
      },
      {
        type: "detailed-comparison",
        title: "השוואה מפורטת:",
        comparison: {
          hardware: {
            title: "🏗️ חומרה (Hardware)",
            characteristics: [
              "📦 פיזי - אפשר לגעת, לראות, להריח",
              "💰 יקר - עולה כסף לקנות ולשדרג",
              "🔧 מתקלקל - יכול להישבר או להישחק",
              "📏 גודל קבוע - לא משתנה בקלות",
              "⚡ מהירות קבועה - לא משתנה",
              "🔄 איטי לשדרג - צריך לקנות חלקים חדשים"
            ]
          },
          software: {
            title: "💻 תוכנה (Software)",
            characteristics: [
              "🌐 דיגיטלי - לא אפשר לגעת, רק לראות על המסך",
              "🆓 חינמי - הרבה תוכנות חינמיות",
              "♾️ לא מתקלקל - לא נשבר פיזית",
              "📱 גודל משתנה - אפשר להוריד או למחוק",
              "⚡ מהירות משתנה - תלוי בחומרה",
              "🔄 מהיר לשדרג - רק להוריד גרסה חדשה"
            ]
          }
        },
        style: { 
          fontSize: "1.1rem",
          textAlign: "right",
          maxWidth: "900px",
          margin: "2rem auto"
        }
      },
      {
        type: "list",
        title: "דוגמאות לחומרה:",
        items: [
          "🖥️ המסך - LCD, LED, OLED",
          "⌨️ המקלדת - מכנית, אלחוטית, גמישה",
          "🖱️ העכבר - אופטי, לייזר, אלחוטי",
          "🔊 רמקולים - סטריאו, סראונד, בלוטות'",
          "📷 מצלמה - רזולוציה, זום, אוטופוקוס",
          "💾 דיסק קשיח - SSD, HDD, NVMe"
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
        title: "דוגמאות לתוכנה:",
        items: [
          "🖼️ מערכות הפעלה - Windows 11, macOS, Linux",
          "📝 תוכנות משרד - Microsoft Office, Google Workspace",
          "🎮 משחקים - Minecraft, Fortnite, Roblox",
          "🌐 דפדפנים - Chrome, Firefox, Safari, Edge",
          "📱 אפליקציות - WhatsApp, Instagram, TikTok",
          "🎵 מדיה - Spotify, Netflix, YouTube"
        ],
        style: { 
          fontSize: "1.2rem",
          textAlign: "right",
          maxWidth: "600px",
          margin: "2rem auto"
        }
      },
      {
        type: "scenario",
        title: "תרחיש: המחשב לא עובד",
        scenarios: [
          {
            problem: "המסך לא נדלק",
            hardware: "🔧 בעיה בחומרה - צריך לתקן או להחליף",
            software: "❌ לא קשור לתוכנה"
          },
          {
            problem: "המחשב איטי מאוד",
            hardware: "🔧 יכול להיות חומרה ישנה",
            software: "💻 יכול להיות תוכנה כבדה או וירוס"
          },
          {
            problem: "המשחק נתקע",
            hardware: "🔧 יכול להיות כרטיס מסך חלש",
            software: "💻 יכול להיות באג בתוכנה"
          },
          {
            problem: "האינטרנט לא עובד",
            hardware: "🔧 יכול להיות בעיה בכרטיס הרשת",
            software: "💻 יכול להיות בעיה בהגדרות"
          }
        ],
        style: { 
          fontSize: "1.1rem",
          textAlign: "right",
          maxWidth: "800px",
          margin: "2rem auto"
        }
      },
      {
        type: "tip",
        text: "💡 טיפ: כשהמחשב לא עובד - תמיד בדקו קודם את התוכנה, ורק אז את החומרה!",
        style: { 
          fontSize: "1.2rem",
          marginTop: "2rem",
          padding: "1rem",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.3)",
          border: "2px solid rgba(0,0,0,0.1)"
        }
      }
    ]
  }
}; 