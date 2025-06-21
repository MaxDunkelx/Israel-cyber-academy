export const slide3WhatIsNetwork = {
  id: "slide-3",
  type: "presentation",
  title: "מה זה רשת מחשבים? 🌐",
  content: {
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    elements: [
      {
        type: "title",
        text: "רשת מחשבים",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "רשת מחשבים היא חיבור בין מחשבים שמאפשר להם לתקשר ולשתף מידע",
        style: { fontSize: "1.4rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "🏠 רשת ביתית - מחשבים בבית",
          "🏢 רשת עסקית - מחשבים בעבודה",
          "🌍 האינטרנט - רשת ענק עולמית",
          "📱 רשת סלולרית - טלפונים חכמים"
        ],
        style: { fontSize: "1.3rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "דמיינו רשת כמו כבישים שמחברים בין ערים - המידע נוסע בכבישים האלה!",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", fontStyle: "italic" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
        alt: "Computer Network",
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