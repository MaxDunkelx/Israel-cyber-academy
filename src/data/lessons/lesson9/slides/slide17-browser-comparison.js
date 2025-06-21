export const slide17BrowserComparison = {
  id: "slide-17",
  type: "presentation",
  title: "השוואת דפדפנים 📊",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "איזה דפדפן הכי טוב?",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "subtitle",
        text: "השוואה בין הדפדפנים הפופולריים",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "comparison",
        items: [
          {
            name: "Chrome",
            speed: 9,
            privacy: 6,
            extensions: 10,
            security: 8
          },
          {
            name: "Firefox",
            speed: 7,
            privacy: 9,
            extensions: 8,
            security: 9
          },
          {
            name: "Safari",
            speed: 8,
            privacy: 8,
            extensions: 6,
            security: 9
          },
          {
            name: "Edge",
            speed: 8,
            privacy: 7,
            extensions: 7,
            security: 8
          }
        ],
        style: { fontSize: "1.1rem", color: "white", textAlign: "center" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400",
        alt: "Browser Comparison",
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