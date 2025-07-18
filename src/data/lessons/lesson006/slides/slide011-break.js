export const slide11Break = {
  id: "slide-11",
  type: "break",
  title: "הפסקה קצרה! ☕",
  content: {
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    elements: [
      {
        type: "title",
        text: "הפסקה קצרה! ☕",
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
        type: "subtitle",
        text: "למדנו הרבה על פרוטוקולים! עכשיו בואו ננוח קצת",
        style: { 
          fontSize: "2rem", 
          color: "white", 
          textAlign: "center", 
          marginBottom: "3rem",
          textShadow: "0 4px 8px rgba(0,0,0,0.3)"
        }
      },
      {
        type: "list",
        title: "מה למדנו עד כה:",
        items: [
          "מה זה פרוטוקול",
          "סוגי פרוטוקולים שונים",
          "HTTP vs HTTPS",
          "פרוטוקולי אימייל",
          "פרוטוקולי העברת קבצים",
          "פרוטוקולי אבטחה",
          "שכבות OSI"
        ],
        style: { 
          fontSize: "1.5rem",
          marginTop: "2rem",
          padding: "1.5rem",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.1)"
        }
      },
      {
        type: "tip",
        text: "💡 טיפ: השתמשו בהפסקה כדי לסכם את מה שלמדתם עד כה!",
        style: { 
          fontSize: "1.3rem",
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