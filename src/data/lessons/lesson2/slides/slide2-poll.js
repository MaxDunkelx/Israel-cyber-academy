export const slide2Poll = {
  id: "slide-2",
  type: "poll",
  title: "מה אתה יודע על מחשבים? 🤔",
  content: {
    question: "איזה רכיב מחשב אתה מכיר?",
    options: [
      { id: 1, text: "מעבד (CPU)", emoji: "🧠" },
      { id: 2, text: "זיכרון (RAM)", emoji: "💾" },
      { id: 3, text: "כרטיס מסך", emoji: "🖥️" },
      { id: 4, text: "לוח אם", emoji: "🔌" },
      { id: 5, text: "לא יודע", emoji: "🤷‍♂️" }
    ],
    allowMultiple: true,
    showResults: true,
    duration: 120
  }
}; 