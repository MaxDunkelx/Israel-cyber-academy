export const slide28Feedback = {
  id: "slide-28",
  type: "assessment",
  title: "משוב על השיעור - איך היה השיעור? 📝",
  content: {
    assessmentType: "feedback",
    questions: [
      {
        question: "איך דירגת את השיעור באופן כללי?",
        type: "rating",
        options: ["1 - לא טוב", "2 - בסדר", "3 - טוב", "4 - מאוד טוב", "5 - מעולה"]
      },
      {
        question: "איזה נושא היה הכי מעניין?",
        type: "multipleChoice",
        options: [
          "הצפנה מתקדמת",
          "ניתוח איומים",
          "הגנה מתקדמת על רשתות",
          "תגובה לאירועי אבטחה",
          "בינה מלאכותית באבטחה",
          "אבטחת IoT ובלוקצ'יין"
        ]
      },
      {
        question: "איזה נושא היה הכי קשה להבנה?",
        type: "multipleChoice",
        options: [
          "הצפנה מתקדמת",
          "ניתוח איומים",
          "הגנה מתקדמת על רשתות",
          "תגובה לאירועי אבטחה",
          "בינה מלאכותית באבטחה",
          "אבטחת IoT ובלוקצ'יין"
        ]
      },
      {
        question: "איך דירגת את הפעילויות האינטראקטיביות?",
        type: "rating",
        options: ["1 - לא טוב", "2 - בסדר", "3 - טוב", "4 - מאוד טוב", "5 - מעולה"]
      },
      {
        question: "מה הייתם רוצים לשפר בשיעור?",
        type: "text",
        placeholder: "כתבו את ההצעות שלכם..."
      },
      {
        question: "מה הייתם רוצים ללמוד בהמשך?",
        type: "text",
        placeholder: "כתבו את הנושאים שמעניינים אתכם..."
      }
    ],
    feedback: {
      submit: "שלח משוב",
      thankYou: "תודה על המשוב שלכם! זה יעזור לנו לשפר את השיעורים הבאים! 🙏"
    }
  }
}; 