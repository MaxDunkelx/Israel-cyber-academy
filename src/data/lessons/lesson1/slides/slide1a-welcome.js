export const slide1aWelcome = {
  id: "slide-1a",
  type: "presentation",
  title: "מה נלמד היום?",
  content: {
    background: "#000000",
    elements: [
      {
        type: "title",
        text: "מה נלמד היום?",
        style: { fontSize: "3rem", color: "white", textAlign: "center", marginBottom: "2rem", fontWeight: "bold", textShadow: "0 4px 8px rgba(0,0,0,0.3)" }
      },
      {
        type: "image",
        src: "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&w=600&h=400&fit=crop",
        alt: "Welcome sign",
        style: { width: "350px", borderRadius: "30px", margin: "2rem auto", transform: "rotate(-20deg)" }
      },
      {
        type: "list",
        items: [
          "היום נלמד להכיר קצת את עולם הסייבר.",
          "נבין מי הם האנשים שתוקפים מחשבים ולמה הם עושים את זה.",
          "אחר כך נלמד מה זה בכלל 'סייבר' ונכיר חלק מהדברים החשובים בו.",
          "זה שיעור עם הרבה ידע מעניין – מומלץ מאוד לרשום נקודות חשובות.",
          "יש שאלות? אפשר ורצוי לשאול תוך כדי."
        ],
        style: { fontSize: "1.5rem", color: "white", textAlign: "right", lineHeight: "2", margin: "2rem 0" }
      }
    ]
  }
}; 