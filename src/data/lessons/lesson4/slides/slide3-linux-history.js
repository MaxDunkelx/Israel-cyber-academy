export const slide3LinuxHistory = {
  id: "slide-3",
  type: "presentation",
  title: "היסטוריה של Linux 📚",
  content: {
    background: "linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)",
    elements: [
      {
        type: "title",
        text: "איך הכל התחיל?",
        style: { fontSize: "2.5rem", color: "#333", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "Linux נוצרה על ידי לינוס טורבאלדס בשנת 1991. היא מערכת הפעלה חופשית ופתוחה!",
        style: { fontSize: "1.2rem", color: "#333", textAlign: "center", marginBottom: "1rem" }
      },
      {
        type: "list",
        items: [
          "1991 - Linux Kernel - הגרעין הראשון",
          "1992 - GNU/Linux - שילוב עם כלי GNU",
          "1993 - Slackware - ההפצה הראשונה",
          "1994 - Red Hat - חברה מסחרית",
          "2004 - Ubuntu - הפצה ידידותית למשתמש",
          "2015 - היום - Linux בכל מקום!"
        ],
        style: { fontSize: "1.1rem", color: "#333", textAlign: "right" }
      },
      {
        type: "image",
        src: "https://cdn.pixabay.com/photo/2017/01/31/15/33/technology-2024123_1280.jpg",
        alt: "Linux Evolution",
        style: { width: "250px", borderRadius: "10px", margin: "1rem auto" }
      },
      {
        type: "timer",
        duration: 90,
        text: "זמן קריאה"
      }
    ]
  }
}; 