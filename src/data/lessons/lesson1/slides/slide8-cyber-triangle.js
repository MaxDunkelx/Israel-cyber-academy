export const slide8CyberTriangle = {
  id: "slide-8",
  type: "presentation",
  title: "שלושת תנאי הסייבר 📊",
  content: {
    background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    elements: [
      {
        type: "title",
        text: "שלושת תנאי הסייבר",
        style: { fontSize: "2.5rem", color: "#333", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "🔐 סודיות (Confidentiality) - רק אנשים מורשים יכולים לגשת למידע",
          "✅ שלמות (Integrity) - המידע נשאר מדויק ולא משתנה",
          "🔄 זמינות (Availability) - המידע זמין כשצריך אותו"
        ],
        style: { fontSize: "1.3rem", color: "#333", textAlign: "right", lineHeight: "2.5" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400",
        alt: "Security Triangle",
        style: { width: "250px", borderRadius: "15px", margin: "2rem auto" }
      }
    ],
    duration: 200
  }
}; 