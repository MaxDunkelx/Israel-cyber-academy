export const slide12Break = {
  id: "slide-12",
  type: "break",
  title: "הפסקה! ☕",
  content: {
    background: "linear-gradient(135deg, #FFC107 0%, #FF9800 100%)",
    elements: [
      {
        type: "title",
        text: "זמן הפסקה!",
        style: { fontSize: "3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "עד כה למדנו על היסטוריית Linux, טרמינל, פקודות קבצים והרשאות",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", marginBottom: "1rem" }
      },
      {
        type: "text",
        text: "בהמשך נלמד על תהליכים, אבטחה, סקריפטים ורשתות",
        style: { fontSize: "1.3rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "image",
        src: "https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
        alt: "Break Time",
        style: { width: "200px", borderRadius: "15px", margin: "1rem auto" }
      },
      {
        type: "timer",
        duration: 900,
        text: "הפסקה של 15 דקות"
      }
    ]
  }
}; 