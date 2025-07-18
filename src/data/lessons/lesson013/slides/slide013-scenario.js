export const slide13Scenario = {
  id: "slide-13",
  type: "interactive",
  title: "תרחיש אבטחת רשתות מתקדמת - Advanced Network Security Scenario 🎯",
  content: {
    scenarioType: "decision",
    title: "אירוע אבטחה ברשת מתקדמת",
    description: "אתם מנהלי אבטחת רשתות בחברת טכנולוגיה. התקבלה התראה על פעילות חשודה ברשת ה-SDN.",
    scenario: {
      situation: "התקבלה התראה על שינוי חשוד ב-SDN Controller. מישהו מנסה לשנות Flow Rules ברשת.",
      context: [
        "החברה משתמשת ב-SDN מתקדם",
        "יש רשתות וירטואליות נפרדות",
        "המערכת כוללת AI לזיהוי איומים",
        "הצוות זמין 24/7"
      ]
    },
    decisions: [
      {
        id: 1,
        title: "חסימה מיידית",
        description: "לחסום את הגישה ל-SDN Controller מיד",
        consequences: [
          "יתרונות: הגנה מיידית",
          "חסרונות: עלול לעצור פעילות תקינה"
        ],
        outcome: "עוצר את האיום אבל מפריע לעבודה"
      },
      {
        id: 2,
        title: "ניטור מתקדם",
        description: "להפעיל ניטור מתקדם ולעקוב אחר הפעילות",
        consequences: [
          "יתרונות: מידע מלא על האיום",
          "חסרונות: עלול לאפשר נזק"
        ],
        outcome: "מזהה איום מתקדם ומגיב בהתאם"
      },
      {
        id: 3,
        title: "הפעלת AI Response",
        description: "להפעיל תגובה אוטומטית של מערכת ה-AI",
        consequences: [
          "יתרונות: תגובה מהירה ואוטומטית",
          "חסרונות: עלול לפעול לא נכון"
        ],
        outcome: "מערכת ה-AI מגיבה ומנטרלת את האיום"
      },
      {
        id: 4,
        title: "חקירה ידנית",
        description: "לחקור את הפעילות באופן ידני",
        consequences: [
          "יתרונות: שליטה מלאה",
          "חסרונות: איטי מדי"
        ],
        outcome: "מזהה שזו פעילות לגיטימית של מנהל"
      }
    ],
    analysis: {
      logs: [
        "User: admin@company.com",
        "Action: Modify Flow Rules",
        "Time: 14:30 PM",
        "IP: 192.168.1.100",
        "AI Confidence: 85% Suspicious"
      ],
      indicators: [
        "שינוי בשעת עבודה לא שגרתית",
        "פעילות מנהל מערכת",
        "IP פנימי של החברה",
        "AI מזהה פעילות חשודה"
      ]
    },
    learning: [
      "חשיבות שילוב AI עם מומחיות אנושית",
      "איזון בין אבטחה לזמינות",
      "תפקיד SDN באבטחה",
      "ניהול אירועים מורכבים"
    ],
    bestPractices: [
      "תמיד לחקור לפני פעולה",
      "להשתמש במידע מ-AI",
      "לתקשר עם הצוות",
      "לתעד כל החלטה"
    ]
  }
}; 