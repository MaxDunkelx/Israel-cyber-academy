export const slide4ProtocolTypes = {
  id: "slide-4",
  type: "content",
  title: "סוגי פרוטוקולים שונים 📊",
  content: {
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    elements: [
      {
        type: "title",
        text: "סוגי פרוטוקולים שונים 📊",
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
        title: "קטגוריות פרוטוקולים:",
        items: [
          {
            name: "פרוטוקולי אינטרנט",
            description: "HTTP, HTTPS, FTP, SMTP",
            icon: "🌐"
          },
          {
            name: "פרוטוקולי אבטחה",
            description: "SSL, TLS, SSH, VPN",
            icon: "🔒"
          },
          {
            name: "פרוטוקולי רשת",
            description: "TCP, UDP, IP, ICMP",
            icon: "📡"
          },
          {
            name: "פרוטוקולי מייל",
            description: "SMTP, POP3, IMAP",
            icon: "📧"
          },
          {
            name: "פרוטוקולי קבצים",
            description: "FTP, SFTP, SMB",
            icon: "📁"
          },
          {
            name: "פרוטוקולי תקשורת",
            description: "WebRTC, SIP, RTP",
            icon: "📞"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        title: "השוואה בין פרוטוקולים:",
        items: [
          {
            icon: "⚡",
            title: "מהיר",
            description: "UDP - מהיר אבל לא אמין"
          },
          {
            icon: "🛡️",
            title: "מאובטח",
            description: "HTTPS - איטי יותר אבל מאובטח"
          },
          {
            icon: "📊",
            title: "אמין",
            description: "TCP - אמין אבל איטי יותר"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "tip",
        text: "💡 טיפ: כל פרוטוקול מתאים למטרה ספציפית - מהירות, אבטחה או אמינות!",
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