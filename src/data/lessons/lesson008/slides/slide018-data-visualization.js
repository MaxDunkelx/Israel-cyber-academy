export const slide18DataVisualization = {
  id: "slide-18",
  type: "content",
  title: "הצגת נתונים - Data Visualization 📊",
  content: {
    sections: [
      {
        title: "מה זה הצגת נתונים?",
        content: "הצגת נתונים היא תהליך של המרת מידע מספרי לתצוגה ויזואלית כדי להבין טוב יותר את הנתונים ולזהות דפוסים."
      },
      {
        title: "סוגי גרפים נפוצים",
        items: [
          {
            icon: "📈",
            title: "גרף עמודות",
            description: "להשוואה בין קטגוריות שונות"
          },
          {
            icon: "📊",
            title: "גרף עוגה",
            description: "להצגת פרופורציות וחלקים"
          },
          {
            icon: "📉",
            title: "גרף קווי",
            description: "לעקוב אחר שינויים לאורך זמן"
          },
          {
            icon: "🔍",
            title: "גרף פיזור",
            description: "לזהות קשרים בין משתנים"
          }
        ]
      },
      {
        title: "כלים להצגת נתונים",
        items: [
          "Tableau - כלי מקצועי להצגת נתונים",
          "Power BI - כלי של מיקרוסופט",
          "Google Charts - כלי חינמי",
          "D3.js - ספריית JavaScript",
          "Python (Matplotlib, Seaborn) - לניתוח נתונים"
        ]
      },
      {
        title: "עקרונות עיצוב טובים",
        items: [
          "בחרו את סוג הגרף המתאים לנתונים",
          "השתמשו בצבעים בצורה חכמה",
          "הוסיפו כותרות ותוויות ברורות",
          "הסירו מידע מיותר",
          "הבטיחו שהגרף קל להבנה"
        ]
      }
    ],
    examples: [
      {
        type: "chart",
        title: "דוגמה: מכירות חודשיות",
        data: {
          labels: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי"],
          values: [120, 150, 180, 200, 220]
        }
      }
    ]
  }
}; 