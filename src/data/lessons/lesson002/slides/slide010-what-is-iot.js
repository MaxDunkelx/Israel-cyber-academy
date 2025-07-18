export const slide10WhatIsIoT = {
  id: "slide-10",
  type: "content",
  title: "מה זה IoT? - האינטרנט של הדברים 🌐",
  content: {
    background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    elements: [
      {
        type: "title",
        text: "מה זה IoT? 🌐",
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
        text: "האינטרנט של הדברים - כשכל המכשירים מתחברים לאינטרנט",
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
        alt: "Internet of Things",
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
        title: "IoT - Internet of Things",
        text: "מכשירים חכמים שמחוברים לאינטרנט ויכולים לתקשר אחד עם השני",
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
        type: "list",
        title: "דוגמאות למכשירי IoT בבית:",
        items: [
          "🏠 תרמוסטט חכם - שולט בטמפרטורה בבית",
          "💡 נורות חכמות - נדלקות ונכבות אוטומטית",
          "🔒 מנעול חכם - נפתח עם הטלפון",
          "📹 מצלמת אבטחה - שולחת התראות לטלפון",
          "🧹 רובוט שואב - מנקה את הבית לבד",
          "🌱 מערכת השקיה - משקה את הצמחים אוטומטית"
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
        title: "דוגמאות למכשירי IoT בעיר:",
        items: [
          "🚦 רמזורים חכמים - מתאימים את עצמם לתנועה",
          "🚌 אוטובוסים חכמים - מראים מתי יגיעו",
          "🅿️ חניונים חכמים - מראים איפה יש מקום",
          "🗑️ פחי אשפה חכמים - מתריעים כשהם מלאים",
          "💧 מערכות מים - בודקות איכות המים",
          "🌡️ חיישני מזג אוויר - מודדים טמפרטורה ולחות"
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
        title: "יתרונות של IoT:",
        items: [
          "⚡ נוחות - הכל עובד אוטומטית",
          "💰 חיסכון - חוסך כסף וזמן",
          "🔒 בטיחות - מערכות אבטחה מתקדמות",
          "🌱 ידידותי לסביבה - חוסך אנרגיה",
          "📊 מידע - אוסף נתונים שימושיים",
          "🤖 אוטומציה - הכל עובד לבד"
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
        title: "חסרונות של IoT:",
        items: [
          "🔓 אבטחה - מכשירים יכולים להיפרוץ",
          "🔌 תלות באינטרנט - בלי אינטרנט אין עבודה",
          "💰 מחיר - מכשירים חכמים יקרים יותר",
          "🔋 סוללות - צריך לטעון כל הזמן",
          "🔄 עדכונים - צריך לעדכן תוכנה",
          "📱 תלות בטלפון - צריך אפליקציה"
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
        title: "תרחיש: בוקר חכם",
        scenarios: [
          {
            time: "7:00",
            action: "השעון המעורר מתחבר לתרמוסטט",
            result: "הטמפרטורה עולה ל-22 מעלות"
          },
          {
            time: "7:05",
            action: "התרמוסטט מדליק את הקפה",
            result: "הקפה מוכן כשאתם קמים"
          },
          {
            time: "7:10",
            action: "הנורות נדלקות אוטומטית",
            result: "הבית מואר כשאתם יוצאים מהמיטה"
          },
          {
            time: "7:15",
            action: "הרובוט שואב מתחיל לנקות",
            result: "הבית נקי כשאתם חוזרים"
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
        type: "tip",
        text: "💡 טיפ: IoT הופך את העולם שלנו לחכם יותר - אבל צריך לזכור לשמור על אבטחה!",
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