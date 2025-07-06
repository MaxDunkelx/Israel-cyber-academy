export const slide17Break = {
  id: "slide-17",
  type: "break",
  title: "הפסקה! ☕",
  content: {
    background: "linear-gradient(135deg, #ff9800 0%, #f57c00 100%)",
    elements: [
      {
        type: "title",
        text: "זמן להפסקה!",
        style: { fontSize: "3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "subtitle",
        text: "קחו הפסקה של 15 דקות. שתו מים, מתחו את הרגליים וחזרו רעננים!",
        style: { fontSize: "1.5rem", color: "white", textAlign: "center", opacity: 0.9 }
      },
      {
        type: "image",
        src: "https://cdn.pixabay.com/photo/2015/05/31/12/14/coffee-791439_1280.jpg",
        alt: "Coffee Break",
        style: { width: "250px", borderRadius: "15px", margin: "2rem auto" }
      },
      {
        type: "timer",
        duration: 900,
        text: "זמן הפסקה"
      }
    ]
  }
}; 