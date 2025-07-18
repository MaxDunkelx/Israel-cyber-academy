export const slide24Feedback = {
  id: "slide-24",
  type: "assessment",
  title: "משוב - איך היה השיעור? 📝",
  content: {
    assessmentType: "feedback",
    questions: [
      {
        question: "איך דירגתם את השיעור?",
        type: "rating",
        options: ["1 - לא טוב", "2 - בסדר", "3 - טוב", "4 - מאוד טוב", "5 - מעולה"]
      },
      {
        question: "מה היה החלק הכי מעניין בשיעור?",
        type: "text",
        placeholder: "כתבו את התשובה שלכם..."
      },
      {
        question: "מה היה החלק הכי קשה להבנה?",
        type: "text",
        placeholder: "כתבו את התשובה שלכם..."
      },
      {
        question: "האם הפעילויות האינטראקטיביות עזרו?",
        type: "multipleChoice",
        options: [
          "כן, מאוד עזרו",
          "כן, קצת עזרו",
          "לא ממש",
          "לא עזרו בכלל"
        ]
      },
      {
        question: "איזה נושא הייתם רוצים ללמוד יותר?",
        type: "multipleChoice",
        options: [
          "הנדסה הפוכה מתקדמת",
          "ניתוח זיכרון",
          "כלי ניתוח נוספים",
          "טכניקות הגנה מתקדמות",
          "ניתוח תוכנות זדוניות למובייל"
        ]
      },
      {
        question: "האם הייתם ממליצים על השיעור לחברים?",
        type: "multipleChoice",
        options: [
          "כן, בהחלט!",
          "כן, אבל עם הסתייגויות",
          "לא ממש",
          "לא"
        ]
      },
      {
        question: "הערות נוספות או הצעות לשיפור:",
        type: "text",
        placeholder: "כתבו את ההערות שלכם..."
      }
    ],
    description: "המשוב שלכם חשוב לנו! הוא יעזור לנו לשפר את השיעורים הבאים.",
    thankYouMessage: "תודה על המשוב! הוא יעזור לנו לשפר את השיעורים הבאים.",
    tips: [
      "היו כנים עם המשוב שלכם",
      "חשבו על החוויה הכוללת",
      "הציעו רעיונות לשיפור",
      "שתפו מה עבד טוב"
    ]
  }
}; 