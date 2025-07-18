export const slide23WirelessProtocols = {
  id: "slide-23",
  type: "content",
  title: "פרוטוקולים אלחוטיים 📶",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "פרוטוקולים אלחוטיים 📶",
        style: { 
          fontSize: "4rem", 
          color: "white", 
          textAlign: "center", 
          marginBottom: "2rem", 
          fontWeight: "bold", 
          textShadow: "0 8px 16px rgba(0,0,0,0.4)"
        }
      },
      {
        type: "specs",
        title: "פרוטוקולים אלחוטיים עיקריים:",
        items: [
          {
            name: "WiFi (802.11)",
            description: "רשת אלחוטית מקומית",
            icon: "📶"
          },
          {
            name: "Bluetooth",
            description: "תקשורת קצרת טווח",
            icon: "🔵"
          },
          {
            name: "NFC",
            description: "Near Field Communication",
            icon: "📱"
          },
          {
            name: "Zigbee",
            description: "רשת חיישנים",
            icon: "🏠"
          },
          {
            name: "LoRaWAN",
            description: "רשת ארוכת טווח",
            icon: "🌍"
          },
          {
            name: "5G",
            description: "דור חמישי של רשתות סלולר",
            icon: "📡"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        title: "השוואה בין פרוטוקולים אלחוטיים:",
        items: [
          {
            icon: "📶",
            title: "WiFi",
            description: "מהיר, טווח קצר, צריכת חשמל גבוהה"
          },
          {
            icon: "🔵",
            title: "Bluetooth",
            description: "איטי, טווח קצר מאוד, חסכוני"
          },
          {
            icon: "📱",
            title: "NFC",
            description: "מהיר מאוד, טווח מינימלי, אבטחה גבוהה"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "יישומים של פרוטוקולים אלחוטיים:",
        items: [
          "WiFi - אינטרנט ביתי ועסקי",
          "Bluetooth - אוזניות, עכברים, מקלדות",
          "NFC - תשלומים, כרטיסי כניסה",
          "Zigbee - בית חכם, חיישנים",
          "5G - אינטרנט סלולרי מהיר"
        ],
        style: { 
          fontSize: "1.3rem",
          marginTop: "2rem",
          padding: "1rem",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.1)"
        }
      },
      {
        type: "tip",
        text: "💡 טיפ: כל פרוטוקול אלחוטי מתאים למטרה ספציפית - מהירות, טווח או חסכוניות!",
        style: { 
          fontSize: "1.2rem",
          marginTop: "2rem",
          padding: "1rem",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.1)",
          border: "2px solid rgba(255,255,255,0.3)"
        }
      }
    ]
  }
}; 