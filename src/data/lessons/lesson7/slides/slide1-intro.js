export const slide1Intro = {
  id: "slide-1",
  type: "presentation",
  title: "ברוכים הבאים לשיעור 7 - תכנות והקמת אתר 💻",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "תכנות והקמת אתר",
        style: { fontSize: "3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "subtitle",
        text: "היום נלמד איך לבנות אתר אינטרנט משלנו!",
        style: { fontSize: "1.5rem", color: "white", textAlign: "center", marginBottom: "3rem" }
      },
      {
        type: "list",
        items: [
          "💻 מה זה תכנות?",
          "🌐 HTML - מבנה האתר",
          "🎨 CSS - עיצוב וצבעים",
          "⚡ JavaScript - אינטראקטיביות",
          "🔧 עורך קוד אינטראקטיבי",
          "🏗️ בניית אתר מלא"
        ],
        style: { fontSize: "1.3rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "משך השיעור: 3 שעות | רמה: בינונית | גיל: 10-13",
        style: { fontSize: "1.2rem", color: "white", textAlign: "center", opacity: 0.9 }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
        alt: "Programming and Web Development",
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