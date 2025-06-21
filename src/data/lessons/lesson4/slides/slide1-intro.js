export const slide1Intro = {
  id: "slide-1",
  type: "presentation",
  title: "ברוכים הבאים לעולם Linux! 🐧",
  content: {
    background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
    elements: [
      {
        type: "title",
        text: "שיעור 4: הכרת Linux",
        style: { fontSize: "3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "subtitle",
        text: "היום נלמד על מערכת ההפעלה Linux - הטרמינל, הפקודות והכלים החזקים",
        style: { fontSize: "1.5rem", color: "white", textAlign: "center", opacity: 0.9 }
      },
      {
        type: "image",
        src: "https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
        alt: "Linux Terminal",
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