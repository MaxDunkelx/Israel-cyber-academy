export const slide10ControlPanel = {
  id: "slide-10",
  type: "content",
  title: "לוח הבקרה - איך משנים הגדרות? ⚙️",
  content: {
    background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
    elements: [
      {
        type: "title",
        text: "לוח הבקרה ⚙️",
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
        text: "איך משנים הגדרות במחשב ואיך מתאימים אותו לצרכים שלכם",
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
        alt: "Control Panel",
        style: { 
          width: "350px", 
          borderRadius: "20px", 
          margin: "2rem auto",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          border: "4px solid rgba(255,255,255,0.2)"
        }
      },
      {
        type: "list",
        title: "איך לגשת להגדרות:",
        items: [
          "🪟 לחצו על כפתור התחל",
          "⚙️ לחצו על הגדרות (Settings)",
          "🔧 או לחצו על לוח בקרה (Control Panel)",
          "📱 או לחצו Win + I",
          "🔍 או חפשו 'הגדרות'",
          "👆 או לחצו ימני על כפתור התחל"
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
        title: "הגדרות חשובות:",
        items: [
          "🖥️ מערכת - רקע, מסך, צלילים",
          "👤 חשבונות - משתמשים וסיסמאות",
          "🌐 רשת - Wi-Fi ואינטרנט",
          "🔒 פרטיות - אבטחה והרשאות",
          "⚡ עדכונים - עדכוני Windows",
          "🎨 התאמה אישית - צבעים ועיצוב"
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
        title: "הגדרות מערכת:",
        items: [
          "📏 רזולוציה - גודל התצוגה",
          "🖥️ רקע שולחן - תמונה ברקע",
          "🔊 צלילים - נגינת צלילים",
          "⏰ שעה ותאריך - הגדרת זמן",
          "🌍 שפה - שפת המחשב",
          "🔋 חסכון באנרגיה - הגדרות סוללה"
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
        title: "הגדרות אבטחה:",
        items: [
          "🛡️ Windows Defender - אנטי וירוס",
          "🔒 חומת אש - הגנה מפני פריצות",
          "🔐 סיסמאות - שינוי סיסמאות",
          "👤 משתמשים - הוספת משתמשים",
          "📱 הרשאות - מה מותר לכל תוכנה",
          "🔍 פרטיות - מה Windows יודע עליכם"
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
        title: "הגדרות רשת:",
        items: [
          "📶 Wi-Fi - חיבור לאינטרנט אלחוטי",
          "🔌 Ethernet - חיבור לאינטרנט בכבל",
          "📱 בלוטות' - חיבור למכשירים",
          "🌐 שיתוף - שיתוף קבצים ברשת",
          "🔒 אבטחת רשת - הגנה על הרשת",
          "📊 שימוש בנתונים - כמה אינטרנט אתם צורכים"
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
        text: "💡 טיפ: אל תשנו הגדרות שאתם לא מבינים - זה יכול לשבור את המחשב!",
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