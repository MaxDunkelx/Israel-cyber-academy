export const slide5InternetHistory = {
  id: "slide-5",
  type: "presentation",
  title: "היסטוריית האינטרנט 📚",
  content: {
    background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    elements: [
      {
        type: "title",
        text: "איך הכל התחיל?",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "1969 - ARPANET נוצר על ידי הצבא האמריקאי",
          "1983 - TCP/IP הופך לסטנדרט",
          "1989 - טים ברנרס-לי ממציא את ה-World Wide Web",
          "1995 - האינטרנט נפתח לציבור הרחב",
          "2000 - עידן הדוט-קום מתחיל",
          "2007 - iPhone מוצג - עידן הניידים"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "האינטרנט התחיל כפרויקט צבאי והפך לכלי הכי חשוב בעולם!",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", fontWeight: "bold" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
        alt: "Internet History",
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