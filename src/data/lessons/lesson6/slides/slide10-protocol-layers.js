export const slide10ProtocolLayers = {
  id: "slide-10",
  type: "presentation",
  title: "שכבות פרוטוקולים - OSI Model 📊",
  content: {
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    elements: [
      {
        type: "title",
        text: "שכבות פרוטוקולים",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "מודל OSI - 7 שכבות של תקשורת מחשבים",
        style: { fontSize: "1.4rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "7️⃣ שכבת האפליקציה - HTTP, FTP, SMTP",
          "6️⃣ שכבת המצגת - הצפנה ופורמט",
          "5️⃣ שכבת הסשן - ניהול חיבורים",
          "4️⃣ שכבת התחבורה - TCP, UDP",
          "3️⃣ שכבת הרשת - IP, נתיבים",
          "2️⃣ שכבת הקישור - Ethernet, WiFi",
          "1️⃣ שכבת הפיזית - כבלים, אותות"
        ],
        style: { fontSize: "1.1rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "כל שכבה עובדת עם השכבות שמעליה ומתחתיה!",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", fontWeight: "bold" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
        alt: "OSI Model",
        style: { width: "250px", borderRadius: "15px", margin: "2rem auto" }
      },
      {
        type: "timer",
        duration: 120,
        text: "זמן קריאה"
      }
    ]
  }
}; 