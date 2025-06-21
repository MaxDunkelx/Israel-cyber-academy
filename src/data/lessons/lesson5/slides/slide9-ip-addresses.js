export const slide9IpAddresses = {
  id: "slide-9",
  type: "presentation",
  title: "כתובות IP - הכתובת של המחשב 🌐",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "כתובות IP",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "כל מחשב ברשת צריך כתובת ייחודית - כמו כתובת בית",
        style: { fontSize: "1.4rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "🏠 IPv4: 192.168.1.1 (4 מספרים)",
          "🏢 IPv6: 2001:0db8:85a3:0000:0000:8a2e:0370:7334",
          "📱 כתובת ציבורית - מה שהעולם רואה",
          "🔒 כתובת פרטית - בתוך הרשת הביתית",
          "🌍 DNS - ממיר שמות לכתובות IP"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "דוגמה: google.com = 142.250.185.78",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", fontWeight: "bold" }
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
        alt: "IP Addresses",
        style: { width: "250px", borderRadius: "15px", margin: "2rem auto" }
      },
      {
        type: "timer",
        duration: 90,
        text: "זמן קריאה"
      }
    ]
  }
}; 