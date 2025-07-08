export const slide12HardwareVsSoftware = {
  id: "slide-12-hardware-vs-software",
  type: "presentation",
  title: " בדיקה חומרה לעומת תוכנה",
  content: {
    background: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
    elements: [
      {
        type: "title",
        text: "תוכנה לעומת חומרה",
        style: { fontSize: "2.2rem", color: "#222", textAlign: "center", marginBottom: "1.5rem" }
      },
      {
        type: "comparison",
        items: [
          {
            icon: "💻",
            title: "חומרה",
            description: "החלקים שאפשר לגעת בהם – מסך, מקלדת, עכבר, מעבד, לוח אם ועוד. כל החלקים עובדים יחד כדי שהמחשב יפעל."
          },
          {
            icon: "💾",
            title: "תוכנה",
            description: "מה שמפעיל את המחשב – ההוראות שהמחשב מקבל כדי לדעת מה לעשות. דוג׳: מערכת הפעלה, משחקים, תוכנות כתיבה."
          }
        ],
        style: { fontSize: "1.1rem", color: "#222" }
      }
    ],
    duration: 180
  }
};
