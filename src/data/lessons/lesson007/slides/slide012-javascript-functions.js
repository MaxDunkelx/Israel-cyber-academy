export const slide12JavaScriptFunctions = {
  id: "slide-12",
  type: "content",
  title: "פונקציות ב-JavaScript - איך יוצרים? 🔧",
  content: {
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    elements: [
      {
        type: "title",
        text: "פונקציות ב-JavaScript - איך יוצרים? 🔧",
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
        type: "definition",
        term: "פונקציה",
        definition: "בלוק קוד שמבצע פעולה ספציפית וניתן לקריאה חוזרת",
        style: { 
          fontSize: "1.5rem",
          marginBottom: "2rem",
          padding: "1.5rem",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.1)",
          border: "2px solid rgba(255,255,255,0.3)"
        }
      },
      {
        type: "specs",
        title: "סוגי פונקציות:",
        items: [
          {
            name: "פונקציה רגילה",
            description: "function name() { }",
            icon: "🔧"
          },
          {
            name: "פונקציה עם פרמטרים",
            description: "function add(a, b) { }",
            icon: "📥"
          },
          {
            name: "פונקציה שמחזירה ערך",
            description: "return result;",
            icon: "📤"
          },
          {
            name: "אירועים",
            description: "onclick, onload, onsubmit",
            icon: "🖱️"
          },
          {
            name: "פונקציות חצים",
            description: "() => { }",
            icon: "➡️"
          },
          {
            name: "פונקציות אנונימיות",
            description: "function() { }",
            icon: "👤"
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "comparison",
        title: "דוגמאות לפונקציות:",
        items: [
          {
            icon: "🔧",
            title: "פונקציה פשוטה",
            description: "function sayHello() { alert('שלום!'); }"
          },
          {
            icon: "📥",
            title: "פונקציה עם פרמטרים",
            description: "function add(a, b) { return a + b; }"
          },
          {
            icon: "🖱️",
            title: "אירוע לחיצה",
            description: "onclick=\"sayHello()\""
          }
        ],
        style: { marginTop: "2rem" }
      },
      {
        type: "list",
        title: "מתי להשתמש בפונקציות:",
        items: [
          "כשצריך לחזור על אותו קוד",
          "כשצריך לארגן קוד בצורה מסודרת",
          "כשצריך לקבל קלט מהמשתמש",
          "כשצריך לבצע חישובים",
          "כשצריך להגיב לאירועים"
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
        text: "💡 טיפ: פונקציות הן כמו מתכונים - כותבים פעם אחת ומשתמשים הרבה פעמים!",
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