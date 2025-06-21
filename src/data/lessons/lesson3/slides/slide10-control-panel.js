export const slide10ControlPanel = {
  id: "slide-10",
  type: "presentation",
  title: "לוח הבקרה (Control Panel) ⚙️",
  content: {
    background: "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
    elements: [
      {
        type: "title",
        text: "מרכז השליטה של Windows",
        style: { fontSize: "2.5rem", color: "#f57c00", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "לוח הבקרה הוא המקום שבו אפשר לשנות הגדרות חשובות במחשב.",
        style: { fontSize: "1.2rem", color: "#f57c00", textAlign: "center", marginBottom: "1rem" }
      },
      {
        type: "list",
        items: [
          "🎨 עיצוב - שינוי רקע וצבעים",
          "🔊 צלילים - הגדרת צלילי מערכת",
          "🖱️ עכבר - מהירות וגדלים",
          "⌨️ מקלדת - הגדרות הקלדה",
          "🌐 רשת - חיבור לאינטרנט",
          "🛡️ אבטחה - אנטי-וירוס ופיירוול"
        ],
        style: { fontSize: "1.1rem", color: "#f57c00", textAlign: "right" }
      },
      {
        type: "image",
        src: "https://cdn.pixabay.com/photo/2017/01/31/15/33/technology-2024123_1280.jpg",
        alt: "Control Panel",
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