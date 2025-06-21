export const slide13JavaScriptFunctions = {
  id: "slide-13",
  type: "presentation",
  title: "פונקציות JavaScript - קוד לדוגמה ⚡",
  content: {
    background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    elements: [
      {
        type: "title",
        text: "איך כותבים JavaScript?",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "JavaScript משתמש בפונקציות לביצוע פעולות",
        style: { fontSize: "1.4rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "code-block",
        code: `// פונקציה פשוטה
function sayHello() {
    alert("שלום עולם!");
}

// פונקציה עם פרמטרים
function addNumbers(a, b) {
    return a + b;
}

// אירוע לחיצה
document.getElementById("button").onclick = function() {
    document.body.style.backgroundColor = "blue";
}

// שינוי תוכן
function changeText() {
    document.getElementById("title").innerHTML = "טקסט חדש!";
}`,
        language: "javascript",
        style: { 
          backgroundColor: "rgba(0,0,0,0.3)", 
          padding: "1rem", 
          borderRadius: "10px", 
          fontFamily: "monospace",
          fontSize: "1rem",
          color: "white",
          textAlign: "left",
          marginBottom: "2rem"
        }
      },
      {
        type: "list",
        items: [
          "📝 function - הגדרת פונקציה",
          "🔄 return - החזרת ערך",
          "🖱️ onclick - אירוע לחיצה",
          "📄 innerHTML - שינוי תוכן"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "JavaScript מאפשר לנו לשלוט באתר בצורה דינמית!",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", fontWeight: "bold" }
      },
      {
        type: "timer",
        duration: 120,
        text: "זמן קריאה"
      }
    ]
  }
}; 