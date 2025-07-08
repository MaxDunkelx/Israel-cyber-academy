export const slide18InputOutput = {
  id: "slide-18",
  type: "presentation", // הכי מתאים כאן, אלא אם אתה רוצה וידאו/אינטראקטיבי
  title: "קלט ופלט במחשב",
  content: {
    background: "linear-gradient(135deg, #d53369 0%, #daae51 100%)",
    elements: [
      {
        type: "title",
        text: "איך המחשב מקבל מידע ומחזיר תשובה?",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "1rem" }
      },
      {
        type: "list",
        items: [
          "קלט: עכבר, מקלדת, מסך מגע, מיקרופון 🎤",
          "עיבוד: המעבד במחשב מעבד את הנתונים 🧠",
          "פלט: מסך, רמקולים, מדפסת 🖨️"
        ],
        style: { fontSize: "1.2rem", color: "white", textAlign: "right" }
      },
      {
        type: "subtitle",
        text: "דוגמה:",
        style: { fontSize: "1.2rem", color: "white", textAlign: "center", marginTop: "2rem" }
      },
      {
        type: "tip",
        text: "כשאתם כותבים במקלדת (קלט), המחשב מעבד את המידע, ומציג את הטקסט על המסך (פלט).",
        style: { fontSize: "1.1rem", color: "white", textAlign: "center" }
      }
    ]
  }
};
