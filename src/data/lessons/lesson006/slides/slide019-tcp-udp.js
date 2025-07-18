export const slide19TcpUdp = {
  id: "slide-19",
  type: "content",
  title: "TCP vs UDP - מה ההבדל? ⚡",
  content: {
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    elements: [
      {
        type: "title",
        text: "TCP vs UDP - מה ההבדל? ⚡",
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
        type: "comparison",
        title: "השוואה בין TCP ו-UDP:",
        items: [
          {
            icon: "🛡️",
            title: "TCP",
            description: "Transmission Control Protocol",
            details: [
              "אמין - מבטיח שהנתונים יגיעו",
              "איטי יותר",
              "מתאים לקבצים ומיילים",
              "בודק שגיאות"
            ]
          },
          {
            icon: "⚡",
            title: "UDP",
            description: "User Datagram Protocol",
            details: [
              "מהיר - לא מבטיח אמינות",
              "מהיר יותר",
              "מתאים למשחקים ווידאו",
              "לא בודק שגיאות"
            ]
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "מתי משתמשים ב-TCP:",
        items: [
          "העברת קבצים",
          "שליחת מיילים",
          "גלישה באינטרנט",
          "הורדת תוכנות",
          "כל דבר שדורש אמינות"
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
        type: "list",
        title: "מתי משתמשים ב-UDP:",
        items: [
          "משחקים מקוונים",
          "שיחות וידאו",
          "סטרימינג",
          "סקרים מהירים",
          "כל דבר שדורש מהירות"
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
        text: "💡 טיפ: TCP הוא כמו דואר רשום (אמין), UDP הוא כמו הודעה מהירה (מהיר)!",
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