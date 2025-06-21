export const slide3BrowserHistory = {
  id: "slide-3",
  type: "presentation",
  title: "היסטוריית הדפדפנים 📚",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "איך הכל התחיל?",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "subtitle",
        text: "הדפדפן הראשון נוצר בשנת 1990",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", marginBottom: "1rem" }
      },
      {
        type: "list",
        items: [
          "1990 - WorldWideWeb (הדפדפן הראשון)",
          "1994 - Netscape Navigator",
          "1995 - Internet Explorer",
          "2004 - Firefox",
          "2008 - Chrome",
          "2015 - Edge"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", lineHeight: "2" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
        alt: "Browser History",
        style: { width: "250px", borderRadius: "15px", margin: "2rem auto" }
      },
      {
        type: "timer",
        duration: 60,
        text: "זמן קריאה"
      }
    ]
  }
}; 