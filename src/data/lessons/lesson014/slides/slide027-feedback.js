export const slide27Feedback = {
  id: "slide-27",
  type: "poll",
  title: "משוב על השיעור - Lesson Feedback 📝",
  content: {
    pollType: "feedback",
    title: "איך היה השיעור?",
    description: "עזרו לנו לשפר את השיעורים הבאים!",
    questions: [
      {
        question: "כמה נהניתם מהשיעור?",
        type: "rating",
        options: ["1 - לא נהניתי", "2", "3", "4", "5 - מאוד נהניתי"]
      },
      {
        question: "כמה למדתם מהשיעור?",
        type: "rating",
        options: ["1 - לא למדתי", "2", "3", "4", "5 - למדתי הרבה"]
      },
      {
        question: "איזה חלק היה הכי מעניין?",
        type: "multipleChoice",
        options: [
          "אבטחת אפליקציות ווב",
          "אבטחת אפליקציות מובייל",
          "AI באבטחה",
          "DevSecOps",
          "בדיקות חדירה",
          "פורנזיקה דיגיטלית"
        ]
      },
      {
        question: "מה תרצו לשפר בשיעור?",
        type: "text",
        placeholder: "ספרו לנו איך אפשר לשפר..."
      }
    ],
    thankYouMessage: "תודה על המשוב! זה עוזר לנו לשפר את השיעורים הבאים.",
    tips: [
      "המשוב שלכם חשוב לנו",
      "אנחנו רוצים לשפר את השיעורים",
      "כל דעה חשובה",
      "תודה על ההשתתפות"
    ]
  }
}; 