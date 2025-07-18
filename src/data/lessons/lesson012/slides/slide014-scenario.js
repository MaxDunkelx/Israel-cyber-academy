export const slide14Scenario = {
  id: "slide-14",
  type: "interactive",
  title: "תרחיש - התמודדות עם איום בענן 🎯",
  content: {
    component: "scenario",
    scenario: {
      title: "דליפת נתונים בענן",
      description: "חברת טכנולוגיה גילתה דליפת נתונים בענן שלה. עליכם לטפל באירוע ולמנוע נזק נוסף.",
      situation: {
        background: "החברה משתמשת ב-AWS ומצאה פעילות חשודה בחשבון הענן שלה.",
        initialFindings: [
          "פעילות גישה חשודה לשרתים",
          "העברת נתונים לכתובת IP לא מוכרת",
          "יצירת משתמשים חדשים ללא אישור",
          "שינויים בהרשאות ללא אישור"
        ]
      },
      decisions: [
        {
          id: 1,
          question: "מה השלב הראשון שתבצעו?",
          options: [
            "לנתק את כל השרתים מהרשת",
            "לבדוק את לוגי הגישה והפעילות",
            "למחוק את כל הנתונים",
            "להתעלם מהבעיה"
          ],
          correctAnswer: 1,
          explanation: "בדיקת לוגים היא השלב הראשון להבנת מה קרה"
        },
        {
          id: 2,
          question: "איך תזהו את מקור האיום?",
          options: [
            "לפי שם המשתמש",
            "לפי כתובת IP",
            "לפי ניתוח לוגים ופעילות",
            "לפי זמן הפעילות"
          ],
          correctAnswer: 2,
          explanation: "ניתוח מקיף של לוגים ופעילות מאפשר זיהוי מקור האיום"
        },
        {
          id: 3,
          question: "מה תעשו עם הנתונים שנחשפו?",
          options: [
            "תמחקו הכל",
            "תזהו איזה נתונים נחשפו ותטפלו בהתאם",
            "תתעלמו מהבעיה",
            "תחליפו את כל הנתונים"
          ],
          correctAnswer: 1,
          explanation: "צריך לזהות איזה נתונים נחשפו ולטפל בהתאם לסוג הנתונים"
        },
        {
          id: 4,
          question: "איך תמנעו אירועים דומים?",
          options: [
            "תסגרו את הענן",
            "תשפרו את אמצעי האבטחה והניטור",
            "תחליפו את כל הצוות",
            "תעברו לענן אחר"
          ],
          correctAnswer: 1,
          explanation: "שיפור אמצעי האבטחה והניטור הוא הדרך למניעת אירועים דומים"
        },
        {
          id: 5,
          question: "איך תדווחו על האירוע?",
          options: [
            "לא תדווחו בכלל",
            "תדווחו רק למנהלים",
            "תדווחו לפי נהלי החברה והתקנות",
            "תדווחו רק ללקוחות"
          ],
          correctAnswer: 2,
          explanation: "דיווח לפי נהלי החברה והתקנות הוא הדרך הנכונה"
        }
      ],
      outcomes: {
        success: "הצלחתם לטפל באירוע ולמנוע נזק נוסף!",
        partial: "טיפלתם בחלק מהבעיות, אבל יש עוד עבודה לעשות.",
        failure: "האירוע התפשט וגרם נזק נוסף. צריך גישה אחרת."
      }
    },
    tips: [
      "תמיד התחילו בבדיקת לוגים",
      "תעדו כל פעולה",
      "עקבו אחר נהלי החברה",
      "תכננו לתגובה לאירועים"
    ]
  }
}; 