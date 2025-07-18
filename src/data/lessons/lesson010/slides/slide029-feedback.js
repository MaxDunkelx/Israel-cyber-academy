export const slide29Feedback = {
  id: "slide-29",
  type: "assessment",
  title: "משוב על השיעור - Lesson Feedback 📝",
  content: {
    assessmentType: "feedback",
    questions: [
      {
        question: "איך דירגתם את השיעור?",
        type: "rating",
        options: [
          "⭐ מאוד גרוע",
          "⭐⭐ גרוע",
          "⭐⭐⭐ בסדר",
          "⭐⭐⭐⭐ טוב",
          "⭐⭐⭐⭐⭐ מעולה"
        ]
      },
      {
        question: "איזה נושא היה הכי מעניין?",
        type: "multiple-choice",
        options: [
          "עקרונות האקינג אתי",
          "טכניקות סריקה",
          "כלי האקינג",
          "חוקים ואתיקה",
          "אפשרויות קריירה"
        ]
      },
      {
        question: "איזה נושא היה הכי קשה להבנה?",
        type: "text",
        placeholder: "כתבו את הנושא שהיה הכי קשה..."
      },
      {
        question: "האם הפעילויות האינטראקטיביות עזרו?",
        type: "yes-no",
        options: ["כן", "לא"]
      },
      {
        question: "מה תרצו לשפר בשיעור?",
        type: "text",
        placeholder: "כתבו הצעות לשיפור..."
      },
      {
        question: "האם תרצו ללמוד יותר על נושא מסוים?",
        type: "text",
        placeholder: "כתבו על מה תרצו ללמוד יותר..."
      }
    ],
    instructions: [
      "ענו בכנות על השאלות",
      "המשוב שלכם יעזור לנו לשפר",
      "כל תשובה חשובה לנו",
      "תודה על הזמן שלכם!"
    ],
    thankYouMessage: "תודה על המשוב! הוא יעזור לנו לשפר את השיעורים הבאים. 🎯"
  }
}; 