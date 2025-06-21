export const slide2Poll = {
  id: "slide-2",
  type: "poll",
  title: "מה אתה יודע על Linux? 🤔",
  content: {
    question: "האם השתמשת אי פעם ב-Linux?",
    options: [
      { id: 1, text: "כן, אני משתמש ב-Linux", emoji: "🐧" },
      { id: 2, text: "ראיתי אבל לא השתמשתי", emoji: "👀" },
      { id: 3, text: "שמעתי על זה", emoji: "👂" },
      { id: 4, text: "לא יודע מה זה", emoji: "🤷‍♂️" }
    ],
    allowMultiple: false,
    showResults: true,
    duration: 120
  }
}; 