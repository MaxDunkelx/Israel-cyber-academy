export const slide26FirewallExplained = {
  id: "slide-26",
  type: "content",
  title: "חומת אש - השומר הדיגיטלי שלנו 🛡️",
  content: {
    background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
    elements: [
      {
        type: "title",
        text: "חומת אש - השומר הדיגיטלי 🛡️",
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
        text: "איך חומת האש מגנה על המחשב שלנו מפני איומים",
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
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop",
        alt: "Firewall Protection",
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
        title: "חומת אש",
        text: "תוכנה או מכשיר שמווסת את התעבורה ברשת ומגן על המחשב מפני איומים",
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
            icon: "🏰",
            title: "חומת אש פיזית",
            description: "חומה שמגנה על טירה מפני אויבים"
          },
          {
            icon: "💻",
            title: "חומת אש דיגיטלית",
            description: "תוכנה שמגנה על המחשב מפני איומים"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "מה חומת האש עושה:",
        items: [
          "🔍 בודקת כל חיבור שמגיע למחשב",
          "✅ מאפשרת חיבורים בטוחים",
          "❌ חוסמת חיבורים מסוכנים",
          "📊 מנהלת תעבורת רשת",
          "🛡️ מגנה מפני וירוסים",
          "🚫 מונעת גישה לא מורשית"
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
        title: "סוגי חומות אש:",
        items: [
          "🏠 חומת אש ביתית - מגנה על הרשת הביתית",
          "🏢 חומת אש עסקית - מגנה על רשתות גדולות",
          "💻 חומת אש תוכנה - מותקנת על המחשב",
          "🔧 חומת אש חומרה - מכשיר נפרד",
          "☁️ חומת אש ענן - מגנה על שירותים מקוונים"
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
        title: "איך חומת האש עובדת:",
        items: [
          "📨 מקבלת בקשה לחיבור",
          "🔍 בודקת את מקור הבקשה",
          "📋 בודקת את כללי האבטחה",
          "✅ מאפשרת או ❌ חוסמת",
          "📝 מתעדת את הפעולה",
          "🔄 חוזרת על התהליך"
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
        text: "💡 טיפ: תמיד השאירו את חומת האש פעילה! היא כמו שומר שמגן על המחשב שלכם 24/7!",
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