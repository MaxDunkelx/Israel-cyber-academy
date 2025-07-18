export const slide7HardwareSoftwareWorld = {
  id: "slide-7",
  type: "content",
  title: "עולם החומרה והתוכנה - שני עולמות נפגשים 🌍",
  content: {
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    elements: [
      {
        type: "title",
        text: "עולם החומרה והתוכנה 🌍",
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
        text: "איך החומרה והתוכנה עובדות יחד כדי ליצור את המחשב המושלם",
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
        alt: "Hardware and Software",
        style: { 
          width: "350px", 
          borderRadius: "20px", 
          margin: "2rem auto",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          border: "4px solid rgba(255,255,255,0.5)"
        }
      },
      {
        type: "comparison",
        items: [
          {
            icon: "🏗️",
            title: "חומרה (Hardware)",
            description: "החלקים הפיזיים שאפשר לגעת בהם"
          },
          {
            icon: "💻",
            title: "תוכנה (Software)",
            description: "ההוראות והתוכניות שמפעילות את המחשב"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "דוגמאות לחומרה:",
        items: [
          "🖥️ המסך - איפה רואים את המידע",
          "⌨️ המקלדת - איך כותבים טקסט",
          "🖱️ העכבר - איך מנווטים במסך",
          "🔊 הרמקולים - איך שומעים צלילים",
          "📷 המצלמה - איך מצלמים תמונות",
          "🔌 הכבלים - איך מחברים הכל יחד"
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
          "🖼️ מערכת ההפעלה - Windows, Mac, Linux",
          "📝 תוכנות עיבוד תמלילים - Word, Google Docs",
          "🎮 משחקים - Minecraft, Roblox",
          "🌐 דפדפנים - Chrome, Firefox, Safari",
          "📱 אפליקציות - WhatsApp, Instagram, TikTok",
          "🎵 נגני מוזיקה - Spotify, YouTube Music"
        ],
        style: { 
          fontSize: "1.2rem",
          textAlign: "right",
          maxWidth: "600px",
          margin: "2rem auto"
        }
      },
      {
        type: "analogy",
        title: "המחשב הוא כמו גוף האדם:",
        comparison: {
          hardware: {
            title: "הגוף (חומרה)",
            items: [
              "🧠 המוח - המעבד (CPU)",
              "💪 השרירים - הזיכרון (RAM)",
              "🫁 הריאות - המאוורר",
              "🫀 הלב - ספק הכוח",
              "👁️ העיניים - המסך",
              "👂 האוזניים - הרמקולים"
            ]
          },
          software: {
            title: "המחשבות (תוכנה)",
            items: [
              "💭 המחשבות - התוכניות",
              "📚 הידע - המידע השמור",
              "🎯 המטרות - המשימות",
              "🔄 התגובות - התגובות למשתמש",
              "📖 הזיכרון - הקבצים השמורים",
              "🎨 היצירתיות - התוכנות היצירתיות"
            ]
          }
        },
        style: { 
          fontSize: "1.1rem",
          textAlign: "right",
          maxWidth: "800px",
          margin: "2rem auto"
        }
      },
      {
        type: "list",
        title: "איך הם עובדים יחד:",
        items: [
          "🤝 החומרה מספקת את הפלטפורמה הפיזית",
          "💻 התוכנה מספקת את ההוראות והפקודות",
          "🔄 החומרה מבצעת את הפקודות של התוכנה",
          "📤 התוכנה מקבלת תוצאות מהחומרה",
          "🔄 התהליך חוזר על עצמו מיליוני פעמים",
          "⚡ התוצאה - מחשב שעובד בצורה מושלמת"
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
        text: "💡 טיפ: בלי חומרה - אין מחשב, בלי תוכנה - יש מחשב אבל הוא לא עושה כלום!",
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