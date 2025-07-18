export const slide18Scenario = {
  id: "slide-18",
  type: "interactive",
  title: "תרחיש - התמודדות עם תוכנה זדונית מתקדמת 🎯",
  content: {
    component: "scenario",
    scenario: {
      title: "מתקפת APT על חברה",
      description: "חברת טכנולוגיה גדולה נתקפה על ידי תוכנה זדונית מתקדמת. עליכם לנתח ולנטרל את האיום.",
      situation: {
        background: "החברה גילתה פעילות חשודה במערכות שלה. יש חשד למתקפת APT מתקדמת.",
        initialFindings: [
          "קבצים חשודים בשרתים",
          "פעילות רשת חריגה",
          "תהליכים חשודים בזיכרון",
          "ניסיונות גישה לא מורשים"
        ]
      },
      decisions: [
        {
          id: 1,
          question: "מה השלב הראשון שתבצעו?",
          options: [
            "לנתק את כל המערכות מהרשת",
            "להתחיל ניתוח סטטי של הקבצים החשודים",
            "להזעיק את צוות האבטחה",
            "להפעיל גיבוי מלא"
          ],
          correctAnswer: 1,
          explanation: "ניתוח סטטי הוא השלב הראשון - בדיקת הקבצים ללא הרצתם"
        },
        {
          id: 2,
          question: "איזה כלי תשתמשו לניתוח דינמי?",
          options: [
            "IDA Pro לניתוח קוד",
            "Cuckoo Sandbox להרצה מבודדת",
            "Volatility לניתוח זיכרון",
            "Wireshark לניתוח רשת"
          ],
          correctAnswer: 1,
          explanation: "Cuckoo Sandbox מאפשר הרצה בטוחה של הקבצים החשודים"
        },
        {
          id: 3,
          question: "איך תזהו את סוג התוכנה הזדונית?",
          options: [
            "לפי שם הקובץ",
            "לפי גודל הקובץ",
            "לפי ניתוח התנהגותי וקוד",
            "לפי זמן היצירה"
          ],
          correctAnswer: 2,
          explanation: "ניתוח התנהגותי וקוד מאפשר זיהוי מדויק של סוג התוכנה הזדונית"
        },
        {
          id: 4,
          question: "מה תעשו אחרי זיהוי התוכנה הזדונית?",
          options: [
            "למחוק את כל הקבצים החשודים",
            "לפתח פתרון נטרול ספציפי",
            "להתעלם מהבעיה",
            "להחליף את כל המערכות"
          ],
          correctAnswer: 1,
          explanation: "פיתוח פתרון נטרול ספציפי הוא הדרך הנכונה לטפל בתוכנה זדונית"
        },
        {
          id: 5,
          question: "איך תמנעו מתקיפות עתידיות?",
          options: [
            "להתקין אנטי-וירוס",
            "לשפר את אמצעי האבטחה והניטור",
            "להחליף את כל הצוות",
            "לסגור את החברה"
          ],
          correctAnswer: 1,
          explanation: "שיפור אמצעי האבטחה והניטור הוא הדרך למניעת תקיפות עתידיות"
        }
      ],
      outcomes: {
        success: "הצלחתם לזהות ולנטרל את התוכנה הזדונית בהצלחה!",
        partial: "זיהיתם חלק מהאיומים, אבל יש עוד עבודה לעשות.",
        failure: "התוכנה הזדונית התפשטה במערכת. צריך גישה אחרת."
      }
    },
    tips: [
      "תמיד התחילו בניתוח סטטי",
      "השתמשו בסביבה מבודדת",
      "תעדו כל שלב בתהליך",
      "חפשו דפוסים חוזרים"
    ]
  }
}; 