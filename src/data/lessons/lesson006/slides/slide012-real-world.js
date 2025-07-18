export const slide12RealWorld = {
  id: "slide-12",
  type: "content",
  title: "פרוטוקולים בעולם האמיתי 🌍",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "פרוטוקולים בעולם האמיתי 🌍",
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
        title: "דוגמאות יומיומיות:",
        items: [
          {
            name: "גלישה באינטרנט",
            description: "HTTP/HTTPS - כל פעם שאתם גולשים",
            icon: "🌐"
          },
          {
            name: "שליחת מיילים",
            description: "SMTP/IMAP - Gmail, Outlook",
            icon: "📧"
          },
          {
            name: "העברת קבצים",
            description: "FTP/SFTP - Dropbox, Google Drive",
            icon: "📁"
          },
          {
            name: "שיחות וידאו",
            description: "WebRTC - Zoom, Teams",
            icon: "📞"
          },
          {
            name: "בנקאות מקוונת",
            description: "HTTPS - העברות כספים",
            icon: "🏦"
          },
          {
            name: "משחקים מקוונים",
            description: "TCP/UDP - משחקי רשת",
            icon: "🎮"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        title: "פרוטוקולים בחיי היומיום:",
        items: [
          {
            icon: "📱",
            title: "סמארטפון",
            description: "HTTP, HTTPS, SMTP, IMAP"
          },
          {
            icon: "💻",
            title: "מחשב",
            description: "FTP, SSH, VPN, TCP"
          },
          {
            icon: "🏠",
            title: "בית חכם",
            description: "MQTT, CoAP, HTTP"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "tip",
        text: "💡 טיפ: פרוטוקולים נמצאים בכל מקום - אפילו כשאתם לא שמים לב!",
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