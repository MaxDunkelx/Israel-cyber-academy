export const slide10CssGame = {
  id: "slide-10",
  type: "interactive",
  title: "משחק CSS - עיצוב אתרים 🎨",
  content: {
    type: "css-game",
    instructions: "עיצבו אתר וירטואלי! השתמשו ב-CSS כדי ליצור עיצובים מדהימים ולמדו על עיצוב רספונסיבי",
    challenges: [
      {
        id: "layout",
        name: "עיצוב דף",
        description: "צרו דף עם כותרת, תפריט ותוכן",
        html: `
          <div class="header">כותרת האתר</div>
          <nav class="menu">תפריט ניווט</nav>
          <main class="content">תוכן הדף</main>
        `,
        css_properties: [
          { property: "background-color", options: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4"] },
          { property: "color", options: ["white", "black", "#333", "#666"] },
          { property: "font-size", options: ["16px", "18px", "20px", "24px"] },
          { property: "padding", options: ["10px", "15px", "20px", "25px"] }
        ]
      },
      {
        id: "responsive",
        name: "עיצוב רספונסיבי",
        description: "התאימו את העיצוב למסכים שונים",
        html: `
          <div class="container">
            <div class="box">תיבה 1</div>
            <div class="box">תיבה 2</div>
            <div class="box">תיבה 3</div>
          </div>
        `,
        css_properties: [
          { property: "display", options: ["block", "inline", "flex", "grid"] },
          { property: "flex-direction", options: ["row", "column", "row-reverse", "column-reverse"] },
          { property: "justify-content", options: ["center", "flex-start", "flex-end", "space-between"] },
          { property: "align-items", options: ["center", "flex-start", "flex-end", "stretch"] }
        ]
      },
      {
        id: "animations",
        name: "אנימציות CSS",
        description: "הוסיפו אנימציות מדהימות",
        html: `
          <div class="animated-box">אני זז!</div>
          <button class="animated-button">לחצו עליי</button>
        `,
        css_properties: [
          { property: "transition", options: ["all 0.3s", "transform 0.5s", "color 0.2s", "background 0.4s"] },
          { property: "transform", options: ["scale(1.1)", "rotate(5deg)", "translateY(-10px)", "skew(2deg)"] },
          { property: "animation", options: ["bounce 1s infinite", "fadeIn 2s", "slideIn 1s", "pulse 0.5s infinite"] }
        ]
      }
    ],
    themes: [
      {
        name: "מודרני",
        colors: ["#667eea", "#764ba2", "#f093fb", "#f5576c"],
        fonts: ["Arial", "Helvetica", "sans-serif"]
      },
      {
        name: "טבעי",
        colors: ["#11998e", "#38ef7d", "#96ceb4", "#feca57"],
        fonts: ["Georgia", "Times", "serif"]
      },
      {
        name: "כהה",
        colors: ["#2c3e50", "#34495e", "#7f8c8d", "#95a5a6"],
        fonts: ["Courier New", "monospace"]
      }
    ],
    tips: [
      "השתמשו ב-flexbox לעיצוב גמיש",
      "הוסיפו media queries לרספונסיביות",
      "השתמשו ב-CSS Grid לעיצובים מורכבים",
      "הוסיפו transitions לאנימציות חלקות",
      "שמרו על עקביות בצבעים ופונטים"
    ],
    duration: 900,
    learningObjectives: [
      "להבין את יסודות CSS",
      "ליצור עיצובים רספונסיביים",
      "להוסיף אנימציות CSS",
      "לעבוד עם flexbox ו-grid"
    ]
  }
}; 