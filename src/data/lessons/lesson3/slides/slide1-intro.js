export const slide1Intro = {
  id: "slide-1",
  type: "presentation",
  title: "ברוכים הבאים לעולם Windows! 🪟",
  content: {
    background: "linear-gradient(135deg, #0078d4 0%, #106ebe 100%)",
    elements: [
      {
        type: "title",
        text: "שיעור 3: הכרת Windows",
        style: { fontSize: "3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "subtitle",
        text: "היום נלמד על מערכת ההפעלה Windows - הממשק, הכלים והטיפים החשובים",
        style: { fontSize: "1.5rem", color: "white", textAlign: "center", opacity: 0.9 }
      },
      {
        type: "image",
        src: "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronaut-1867615_1280.jpg",
        alt: "Windows Desktop",
        style: { width: "300px", borderRadius: "15px", margin: "2rem auto" }
      },
      {
        type: "timer",
        duration: 45,
        text: "זמן קריאה"
      }
    ]
  }
}; 