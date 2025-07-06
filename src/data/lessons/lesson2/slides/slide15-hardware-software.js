export const slide15HardwareSoftware = {
  id: "slide-15",
  type: "presentation",
  title: "חומרה ותוכנה - ההבדל 🧱",
  content: {
    background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    elements: [
      {
        type: "title",
        text: "חומרה vs תוכנה",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "analogy",
        title: "דוגמה: אופנוע",
        description: "תוכנה = האדם שמפעיל, חומרה = האופנוע שהוא הכלי",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "comparison",
        title: "ההבדלים",
        items: [
          {
            title: "תוכנה",
            description: "הוראות שהמחשב מפעיל - מערכת הפעלה, Word, משחקים",
            icon: "💿",
            color: "#4CAF50"
          },
          {
            title: "חומרה",
            description: "כל החלקים הפיזיים - אלקטרוניים או מכניים",
            icon: "🔧",
            color: "#2196F3"
          }
        ],
        style: { fontSize: "1.2rem", color: "white" }
      }
    ],
    duration: 240
  }
}; 