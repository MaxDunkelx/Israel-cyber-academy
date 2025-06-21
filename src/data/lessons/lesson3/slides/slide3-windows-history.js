export const slide3WindowsHistory = {
  id: "slide-3",
  type: "presentation",
  title: "היסטוריה של Windows 📚",
  content: {
    background: "linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)",
    elements: [
      {
        type: "title",
        text: "איך הכל התחיל?",
        style: { fontSize: "2.5rem", color: "#333", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "Windows נוצרה על ידי Microsoft בשנת 1985. היא הפכה את המחשבים לנגישים לכולם!",
        style: { fontSize: "1.2rem", color: "#333", textAlign: "center", marginBottom: "1rem" }
      },
      {
        type: "list",
        items: [
          "1985 - Windows 1.0 - הגרסה הראשונה",
          "1995 - Windows 95 - המהפכה הגדולה",
          "2001 - Windows XP - היציבה ביותר",
          "2009 - Windows 7 - הפופולרית",
          "2015 - Windows 10 - המודרנית",
          "2021 - Windows 11 - החדשה ביותר"
        ],
        style: { fontSize: "1.1rem", color: "#333", textAlign: "right" }
      },
      {
        type: "image",
        src: "https://cdn.pixabay.com/photo/2017/01/31/15/33/technology-2024123_1280.jpg",
        alt: "Windows Evolution",
        style: { width: "250px", borderRadius: "10px", margin: "1rem auto" }
      },
      {
        type: "timer",
        duration: 90,
        text: "זמן קריאה"
      }
    ]
  }
}; 