export const slide1Intro = {
  id: "slide-1",
  type: "presentation",
  title: "ברוכים הבאים לעולם הסייבר! 🚀",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "שיעור 1: מבוא לעולם הסייבר",
        style: { fontSize: "3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "subtitle",
        text: "היום נלמד על האקרים, איומים דיגיטליים ואיך להישאר בטוחים באינטרנט",
        style: { fontSize: "1.5rem", color: "white", textAlign: "center", opacity: 0.9 }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400",
        alt: "Cybersecurity",
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