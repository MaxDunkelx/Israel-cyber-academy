export const slide13NetworkSecurity = {
  id: "slide-13",
  type: "presentation",
  title: "אבטחה ברשתות - הגנה על המידע 🔒",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "אבטחת רשתות",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "האינטרנט הוא מקום מסוכן - צריך להגן על המידע שלנו",
        style: { fontSize: "1.4rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "🛡️ Firewall - חומת אש שמגנה על הרשת",
          "🔐 VPN - רשת פרטית וירטואלית",
          "🔑 הצפנה - מסתירה מידע רגיש",
          "👤 אימות זהות - וידוא מי המשתמש",
          "🚫 אנטי-וירוס - מגן מפני תוכנות זדוניות",
          "📱 עדכוני אבטחה - תיקוני חורים"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "אבטחה טובה היא כמו מנעול חזק על הדלת!",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", fontWeight: "bold" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
        alt: "Network Security",
        style: { width: "250px", borderRadius: "15px", margin: "2rem auto" }
      },
      {
        type: "timer",
        duration: 90,
        text: "זמן קריאה"
      }
    ]
  }
}; 