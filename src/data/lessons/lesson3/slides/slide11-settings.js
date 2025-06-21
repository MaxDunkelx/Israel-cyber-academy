export const slide11Settings = {
  id: "slide-11",
  type: "presentation",
  title: "הגדרות Windows (Settings) ⚙️",
  content: {
    background: "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)",
    elements: [
      {
        type: "title",
        text: "הגדרות מודרניות",
        style: { fontSize: "2.5rem", color: "#388e3c", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "בגרסאות החדשות של Windows, ההגדרות מאורגנות בצורה נוחה יותר.",
        style: { fontSize: "1.2rem", color: "#388e3c", textAlign: "center", marginBottom: "1rem" }
      },
      {
        type: "list",
        items: [
          "💻 מערכת - תצוגה, אחסון, חשמל",
          "📱 מכשירים - מדפסות, עכבר, מקלדת",
          "🌐 רשת ואינטרנט - Wi-Fi, Bluetooth",
          "👤 חשבונות - משתמשים ופרטיות",
          "🎨 התאמה אישית - רקע, צבעים, נושא",
          "🔒 פרטיות ואבטחה - הרשאות ואבטחה"
        ],
        style: { fontSize: "1.1rem", color: "#388e3c", textAlign: "right" }
      },
      {
        type: "image",
        src: "https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
        alt: "Windows Settings",
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