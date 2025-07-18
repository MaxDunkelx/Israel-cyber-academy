export const slide21ProtocolHistory = {
  id: "slide-21",
  type: "content",
  title: "היסטוריה של פרוטוקולים 📜",
  content: {
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    elements: [
      {
        type: "title",
        text: "היסטוריה של פרוטוקולים 📜",
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
        type: "timeline",
        title: "ציר זמן של פרוטוקולים:",
        items: [
          {
            step: "1969",
            title: "ARPANET",
            description: "הרשת הראשונה - אבי האינטרנט"
          },
          {
            step: "1974",
            title: "TCP/IP",
            description: "פרוטוקול התקשורת הבסיסי"
          },
          {
            step: "1983",
            title: "HTTP",
            description: "פרוטוקול העברת היפר-טקסט"
          },
          {
            step: "1994",
            title: "HTTPS",
            description: "HTTP מאובטח עם SSL"
          },
          {
            step: "1995",
            title: "SSH",
            description: "Secure Shell - חיבור מאובטח"
          },
          {
            step: "2000+",
            title: "פרוטוקולים מודרניים",
            description: "WebRTC, MQTT, CoAP"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        title: "התפתחות הפרוטוקולים:",
        items: [
          {
            icon: "📞",
            title: "שנות ה-70",
            description: "פרוטוקולים בסיסיים לתקשורת"
          },
          {
            icon: "💻",
            title: "שנות ה-80-90",
            description: "פרוטוקולי אינטרנט ורשתות"
          },
          {
            icon: "🔒",
            title: "שנות ה-2000",
            description: "פרוטוקולי אבטחה מתקדמים"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "tip",
        text: "💡 טיפ: הפרוטוקולים התפתחו יחד עם הטכנולוגיה - מטקסט פשוט ועד הצפנה מתקדמת!",
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