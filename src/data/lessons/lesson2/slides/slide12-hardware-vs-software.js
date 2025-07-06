export const slide12HardwareVsSoftware = {
  id: "slide-12-hardware-vs-software",
  type: "presentation",
  title: "חומרה לעומת תוכנה",
  content: {
    background: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
    elements: [
      {
        type: "title",
        text: "תוכנה לעומת חומרה",
        style: { fontSize: "2.2rem", color: "#222", textAlign: "center", marginBottom: "1.5rem" }
      },
      {
        type: "columns",
        columns: [
          {
            title: "חומרה – החלקים שאפשר לגעת בהם",
            items: [
              "מסך, מקלדת, עכבר, מעבד, לוח אם ועוד.",
              "כל החלקים האלה עובדים יחד כדי שהמחשב יפעל כמו שצריך."
            ]
          },
          {
            title: "תוכנה – מה שמפעיל את המחשב",
            items: [
              "התוכנה היא ההוראות שהמחשב מקבל כדי לדעת מה לעשות.",
              "יש כל מיני סוגים של תוכנות: מערכת הפעלה (כמו Windows או Android), משחקים, תוכנות כתיבה (כמו Word)"
            ]
          }
        ],
        style: { fontSize: "1.1rem", color: "#222" }
      }
    ],
    duration: 180
  }
}; 