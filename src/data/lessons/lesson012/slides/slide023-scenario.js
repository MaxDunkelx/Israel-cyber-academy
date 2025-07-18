export const slide23Scenario = {
  id: "slide-23",
  type: "interactive",
  title: "תרחיש אבטחת ענן - Cloud Security Scenario 🎯",
  content: {
    scenarioType: "decision",
    title: "אירוע אבטחה בענן",
    description: "אתם מנהלי אבטחת ענן בחברת טכנולוגיה. התקבלה התראה על פעילות חשודה בענן.",
    scenario: {
      situation: "התקבלה התראה על כניסה חשודה לחשבון מנהל בענן AWS. הפעילות מתרחשת בשעה 3:00 לפנות בוקר.",
      context: [
        "החברה משתמשת ב-AWS לעסקים",
        "יש נתונים רגישים של לקוחות",
        "הצוות לא זמין בשעות הלילה",
        "יש מערכת ניטור פעילה"
      ]
    },
    decisions: [
      {
        id: 1,
        title: "חקירה מיידית",
        description: "לחקור את הפעילות החשודה מיד",
        consequences: [
          "יתרונות: זיהוי מהיר של האיום",
          "חסרונות: עלול להפריע לפעילות תקינה"
        ],
        outcome: "מזהה שזו כניסה לגיטימית של מנהל מערכת"
      },
      {
        id: 2,
        title: "בלימה אוטומטית",
        description: "לחסום את החשבון באופן אוטומטי",
        consequences: [
          "יתרונות: הגנה מיידית",
          "חסרונות: עלול לחסום גישה לגיטימית"
        ],
        outcome: "חוסם גישה לגיטימית ומפריע לעבודה"
      },
      {
        id: 3,
        title: "ניטור מתקדם",
        description: "להפעיל ניטור מתקדם ולעקוב אחר הפעילות",
        consequences: [
          "יתרונות: מידע מלא ללא הפרעה",
          "חסרונות: עלול לאפשר נזק אם זה אכן איום"
        ],
        outcome: "מזהה איום אמיתי ומגיב בזמן"
      },
      {
        id: 4,
        title: "התייעצות עם הצוות",
        description: "ליצור קשר עם מנהל המערכת",
        consequences: [
          "יתרונות: מידע מדויק",
          "חסרונות: עלול להיות איטי מדי"
        ],
        outcome: "מאשר שזו כניסה לגיטימית"
      }
    ],
    analysis: {
      logs: [
        "IP: 192.168.1.100",
        "User: admin@company.com",
        "Action: DescribeInstances",
        "Time: 03:15 AM",
        "Location: Tel Aviv, Israel"
      ],
      indicators: [
        "שעת כניסה לא שגרתית",
        "פעילות מנהל מערכת",
        "IP פנימי של החברה",
        "פעילות תקינה"
      ]
    },
    learning: [
      "חשיבות ניתוח לוגים",
      "איזון בין אבטחה לזמינות",
      "תהליכי תגובה לאירועים",
      "תקשורת עם צוותים"
    ],
    bestPractices: [
      "תמיד לחקור לפני פעולה",
      "להשתמש במידע מהלוגים",
      "לתקשר עם הצוות הרלוונטי",
      "לתעד כל החלטה ופעולה"
    ]
  }
}; 