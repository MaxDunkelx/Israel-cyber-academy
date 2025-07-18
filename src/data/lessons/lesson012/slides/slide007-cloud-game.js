export const slide7CloudGame = {
  id: "slide-7",
  type: "interactive",
  title: "משחק התאמה - מושגי אבטחת ענן 🎮",
  content: {
    component: "MatchingExercise",
    title: "התאימו מושגי אבטחת ענן להגדרות שלהם",
    description: "עזרו למומחי האבטחה להתאים את המושגים הנכונים להגדרות שלהם!",
    pairs: [
      {
        left: "IaaS",
        right: "תשתיות ענן: שרתים, אחסון, רשת",
        explanation: "Infrastructure as a Service - שירותי תשתית ענן"
      },
      {
        left: "PaaS",
        right: "פלטפורמת פיתוח מוכנה",
        explanation: "Platform as a Service - פלטפורמה לפיתוח יישומים"
      },
      {
        left: "SaaS",
        right: "תוכנה כשירות מוכנה לשימוש",
        explanation: "Software as a Service - יישומים מוכנים"
      },
      {
        left: "Zero Trust",
        right: "אל תאמינו לאף אחד, בדקו הכל",
        explanation: "עיקרון אבטחה שמניח שאין אמון אוטומטי"
      },
      {
        left: "IAM",
        right: "ניהול זהות והרשאות",
        explanation: "Identity and Access Management - ניהול זהות וגישה"
      },
      {
        left: "MFA",
        right: "אימות רב-שלבי",
        explanation: "Multi-Factor Authentication - אימות באמצעות מספר גורמים"
      },
      {
        left: "CASB",
        right: "מתווך אבטחת גישה לענן",
        explanation: "Cloud Access Security Broker - כלי לניטור ואבטחת ענן"
      },
      {
        left: "CSPM",
        right: "ניהול תנוחת אבטחת ענן",
        explanation: "Cloud Security Posture Management - ניטור תצורת אבטחה"
      }
    ],
    hints: [
      "חשבו על המשמעות של כל ראשי התיבות",
      "זכרו את מודלי השירות השונים",
      "התמקדו בעקרונות האבטחה הבסיסיים",
      "חשבו על כלי הניטור והאבטחה"
    ],
    successMessage: "מעולה! אתם מבינים היטב את מושגי אבטחת הענן!",
    encouragement: "המשיכו ללמוד ולהתקדם בתחום אבטחת הענן!"
  }
}; 