export const slide30FinalChallenge = {
  id: "slide-30",
  type: "interactive",
  title: "אתגר סופי - בחנו את הידע שלכם! 🎯",
  content: {
    gameType: "finalChallenge",
    instructions: "עברו על כל הנושאים שלמדתם ופתרו את האתגר הסופי",
    challenges: [
      {
        title: "בניית מערכת אבטחה",
        description: "בנו מערכת אבטחה מקיפה לארגון",
        requirements: [
          "התקינו חומת אש מתקדמת",
          "הגדירו מערכת ניטור",
          "הצפינו נתונים רגישים",
          "תכננו תגובה לאירועים",
          "הגדירו גיבוי מאובטח"
        ],
        points: 20
      },
      {
        title: "ניתוח אירוע אבטחה",
        description: "נתחו אירוע אבטחה מורכב",
        requirements: [
          "זיהו את סוג האיום",
          "העריכו את חומרת האירוע",
          "תכננו תגובה מתאימה",
          "תעדו את כל הפעולות",
          "תכננו מניעה עתידית"
        ],
        points: 20
      },
      {
        title: "כתיבת קוד אבטחה",
        description: "כתבו קוד אבטחה מתקדם",
        requirements: [
          "פונקציה להצפנה",
          "בדיקת חוזק סיסמה",
          "ניטור פעילות חשודה",
          "לוג אבטחה",
          "בדיקות תקינות"
        ],
        points: 20
      }
    ],
    bonus: {
      title: "בונוס - שאלה מתקדמת",
      question: "איך תכינו ארגון לעידן הקוונטי?",
      points: 10,
      hints: [
        "חשבו על הצפנה פוסט-קוונטית",
        "תכננו מעבר הדרגתי",
        "השקיעו במחקר ופיתוח",
        "הכשירו צוותים"
      ]
    },
    scoring: {
      total: 70,
      excellent: "מעולה! אתם מוכנים לעולם האבטחה המתקדם! 🏆",
      good: "טוב מאוד! יש לכם בסיס מצוין! 🎉",
      needsImprovement: "לא רע! המשיכו לתרגל ולשפר! 💪"
    },
    features: {
      interactive: true,
      scoring: true,
      hints: true,
      feedback: true,
      certificate: true
    }
  }
}; 