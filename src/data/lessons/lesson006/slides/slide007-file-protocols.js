export const slide7FileProtocols = {
  id: "slide-7",
  type: "content",
  title: "פרוטוקולי העברת קבצים 📁",
  content: {
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    elements: [
      {
        type: "title",
        text: "פרוטוקולי העברת קבצים 📁",
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
        title: "פרוטוקולי העברת קבצים:",
        items: [
          {
            name: "FTP",
            description: "File Transfer Protocol - העברת קבצים בסיסית",
            icon: "📁"
          },
          {
            name: "SFTP",
            description: "SSH File Transfer Protocol - העברת קבצים מאובטחת",
            icon: "🔒"
          },
          {
            name: "FTPS",
            description: "FTP over SSL - FTP עם הצפנה",
            icon: "🛡️"
          },
          {
            name: "SMB",
            description: "Server Message Block - שיתוף קבצים ברשת",
            icon: "🔄"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        title: "השוואה בין פרוטוקולי קבצים:",
        items: [
          {
            icon: "📁",
            title: "FTP",
            description: "פשוט ומהיר, לא מאובטח"
          },
          {
            icon: "🔒",
            title: "SFTP",
            description: "מאובטח, איטי יותר"
          },
          {
            icon: "🛡️",
            title: "FTPS",
            description: "FTP עם הצפנה SSL"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "מתי להשתמש ב-SFTP:",
        items: [
          "העברת קבצים רגישים",
          "חיבור לשרתים מרוחקים",
          "גיבוי נתונים",
          "העברת קבצים גדולים",
          "עבודה עם מידע עסקי"
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
        text: "💡 טיפ: SFTP הוא הבחירה הבטוחה ביותר להעברת קבצים רגישים!",
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