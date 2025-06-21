export const slide16SecurityFeatures = {
  id: "slide-16",
  type: "presentation",
  title: "תכונות אבטחה ב-Windows 🛡️",
  content: {
    background: "linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)",
    elements: [
      {
        type: "title",
        text: "איך Windows מגן עלינו?",
        style: { fontSize: "2.5rem", color: "#f57f17", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "Windows מגיע עם כלי אבטחה מובנים שמגנים על המחשב מפני איומים.",
        style: { fontSize: "1.2rem", color: "#f57f17", textAlign: "center", marginBottom: "1rem" }
      },
      {
        type: "list",
        items: [
          "🛡️ Windows Defender - אנטי-וירוס מובנה",
          "🔥 Windows Firewall - חומת אש",
          "🔐 BitLocker - הצפנת דיסקים",
          "👤 User Account Control - בקרת הרשאות",
          "👁️ Windows Hello - כניסה ביומטרית",
          "🛡️ SmartScreen - הגנה מפני הונאות"
        ],
        style: { fontSize: "1.1rem", color: "#f57f17", textAlign: "right" }
      },
      {
        type: "image",
        src: "https://cdn.pixabay.com/photo/2017/01/31/15/33/technology-2024123_1280.jpg",
        alt: "Security Features",
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