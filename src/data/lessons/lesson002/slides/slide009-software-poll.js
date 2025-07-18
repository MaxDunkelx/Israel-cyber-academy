export const slide9SoftwarePoll = {
  id: "slide-9",
  type: "interactive",
  title: "סקר תוכנות - איזה תוכנות אתם מכירים? 📊",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "סקר תוכנות 📊",
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
        text: "איזה תוכנות אתם מכירים ומשתמשים בהן?",
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
        type: "poll",
        question: "איזה סוג תוכנות אתם הכי אוהבים?",
        options: [
          {
            id: "games",
            text: "🎮 משחקים",
            description: "Minecraft, Roblox, Fortnite"
          },
          {
            id: "social",
            text: "📱 רשתות חברתיות",
            description: "WhatsApp, Instagram, TikTok"
          },
          {
            id: "education",
            text: "📚 לימודים",
            description: "Google Classroom, Zoom, Kahoot"
          },
          {
            id: "creativity",
            text: "🎨 יצירתיות",
            description: "Paint, Scratch, Canva"
          },
          {
            id: "music",
            text: "🎵 מוזיקה",
            description: "Spotify, YouTube Music"
          },
          {
            id: "video",
            text: "🎬 סרטונים",
            description: "YouTube, Netflix, Disney+"
          }
        ],
        style: { 
          fontSize: "1.3rem",
          textAlign: "right",
          maxWidth: "700px",
          margin: "2rem auto"
        }
      },
      {
        type: "poll",
        question: "איזה מכשיר אתם הכי אוהבים להשתמש בו?",
        options: [
          {
            id: "computer",
            text: "🖥️ מחשב שולחני",
            description: "חזק וגדול"
          },
          {
            id: "laptop",
            text: "💻 מחשב נייד",
            description: "נוח לניידות"
          },
          {
            id: "phone",
            text: "📱 סמארטפון",
            description: "קטן ונוח"
          },
          {
            id: "tablet",
            text: "📱 טאבלט",
            description: "גדול יותר מהטלפון"
          }
        ],
        style: { 
          fontSize: "1.3rem",
          textAlign: "right",
          maxWidth: "600px",
          margin: "2rem auto"
        }
      },
      {
        type: "poll",
        question: "מה אתם הכי אוהבים לעשות במחשב?",
        options: [
          {
            id: "play",
            text: "🎮 לשחק משחקים",
            description: "משחקים מקוונים או לא מקוונים"
          },
          {
            id: "learn",
            text: "📚 ללמוד",
            description: "שיעורים מקוונים, מחקר"
          },
          {
            id: "create",
            text: "🎨 ליצור",
            description: "ציור, כתיבה, עריכת וידאו"
          },
          {
            id: "socialize",
            text: "👥 לתקשר",
            description: "צ'אט, וידאו קול"
          },
          {
            id: "watch",
            text: "📺 לצפות",
            description: "סרטים, סדרות, סרטונים"
          },
          {
            id: "browse",
            text: "🌐 לגלוש",
            description: "אינטרנט, חדשות, מידע"
          }
        ],
        style: { 
          fontSize: "1.3rem",
          textAlign: "right",
          maxWidth: "700px",
          margin: "2rem auto"
        }
      },
      {
        type: "tip",
        text: "💡 טיפ: כל התוכנות האלה הן תוכנה - הן לא קיימות פיזית, רק דיגיטלית!",
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