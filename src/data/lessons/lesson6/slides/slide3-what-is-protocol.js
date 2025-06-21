export const slide3WhatIsProtocol = {
  id: "slide-3",
  type: "presentation",
  title: "מה זה פרוטוקול? 📡",
  content: {
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    elements: [
      {
        type: "title",
        text: "פרוטוקול תקשורת",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "פרוטוקול הוא מערכת של כללים שמגדירה איך מחשבים מתקשרים ביניהם",
        style: { fontSize: "1.4rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "📋 כללים ברורים - כמו חוקים במשחק",
          "🌍 שפה משותפת - כל המחשבים מבינים אותה",
          "🔧 תקן בינלאומי - עובד בכל העולם",
          "⚡ מהירות - תקשורת מהירה ויעילה",
          "🛡️ אבטחה - הגנה על המידע",
          "📊 ארגון - מידע מסודר ומאורגן"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "דמיינו פרוטוקול כמו שפה שמחשבים מדברים בה - בלי שפה משותפת, הם לא היו יכולים להבין אחד את השני!",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", fontStyle: "italic" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
        alt: "Communication Protocol",
        style: { width: "300px", borderRadius: "15px", margin: "2rem auto" }
      },
      {
        type: "timer",
        duration: 90,
        text: "זמן קריאה"
      }
    ]
  }
}; 