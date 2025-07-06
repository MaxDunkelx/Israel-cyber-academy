export const slide5History = {
  id: "slide-5",
  type: "presentation",
  title: "היסטוריה מרתקת של המחשב 🕰️",
  content: {
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    elements: [
      {
        type: "title",
        text: "מסע בזמן: היסטוריה של המחשב",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "timeline",
        events: [
          {
            year: "1642",
            title: "מכונת החישוב הראשונה",
            description: "בלז פסקל יצר מכונה לחישובים מתמטיים",
            icon: "🧮"
          },
          {
            year: "1946",
            title: "ENIAC",
            description: "המחשב האלקטרוני הראשון - בגודל חדר שלם!",
            icon: "🏢"
          },
          {
            year: "1975",
            title: "Apple II",
            description: "המחשב האישי הראשון - מהפכה!",
            icon: "🍎"
          },
          {
            year: "2024",
            title: "IoT - מחשבים בכל מקום",
            description: "מטוסים, רכבים, כספומטים, טלפונים חכמים",
            icon: "🌐"
          }
        ],
        style: { color: "white", fontSize: "1.2rem" }
      }
    ],
    duration: 240
  }
}; 