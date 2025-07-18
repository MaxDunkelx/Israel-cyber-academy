export const slide20WindowsSimulator = {
  id: "slide-20",
  type: "interactive",
  title: "סימולטור Windows - תרגול מעשי 🪟",
  content: {
    type: "windows-simulator",
    instructions: "תרגלו את השימוש ב-Windows בסביבה בטוחה! נסו לבצע משימות שונות ולמדו איך להשתמש במערכת",
    tasks: [
      {
        id: "desktop",
        name: "ניהול שולחן העבודה",
        description: "סדרו את הסמלים, שנה את הרקע, צרו תיקיות חדשות",
        steps: [
          "לחצו ימני על שולחן העבודה",
          "בחרו 'סדר לפי'",
          "צרו תיקייה חדשה",
          "שנו את רקע שולחן העבודה"
        ]
      },
      {
        id: "files",
        name: "ניהול קבצים",
        description: "צרו, העתיקו, העבירו ומחקו קבצים ותיקיות",
        steps: [
          "פתחו את סייר הקבצים",
          "צרו תיקייה חדשה",
          "העתיקו קובץ",
          "מחקו קובץ לא נחוץ"
        ]
      },
      {
        id: "start-menu",
        name: "תפריט התחל",
        description: "חקרו את תפריט התחל, פתחו תוכנות, חפשו קבצים",
        steps: [
          "לחצו על כפתור התחל",
          "חפשו תוכנה",
          "פתחו תוכנה",
          "סדרו את התוכנות"
        ]
      },
      {
        id: "settings",
        name: "הגדרות המערכת",
        description: "שנו הגדרות, התאימו את המראה, ניהלו חשבונות משתמשים",
        steps: [
          "פתחו הגדרות",
          "שנו את הרקע",
          "התאימו את הצבעים",
          "בדקו עדכוני מערכת"
        ]
      },
      {
        id: "task-manager",
        name: "מנהל המשימות",
        description: "בדקו תהליכים, סגרו תוכנות, ניטרו ביצועים",
        steps: [
          "פתחו מנהל המשימות",
          "בדקו תהליכים פעילים",
          "סגרו תוכנה לא מגיבה",
          "בדקו שימוש במעבד"
        ]
      }
    ],
    scenarios: [
      {
        name: "משתמש מתחיל",
        description: "למדו את הבסיס של Windows",
        difficulty: "קל",
        focus: ["desktop", "files"]
      },
      {
        name: "משתמש מתקדם",
        description: "שליטה במערכת והגדרות",
        difficulty: "בינוני",
        focus: ["settings", "task-manager"]
      },
      {
        name: "מנהל מערכת",
        description: "ניהול מתקדם של המערכת",
        difficulty: "קשה",
        focus: ["all"]
      }
    ],
    tips: [
      "לחצו ימני על כל דבר כדי לראות אפשרויות",
      "השתמשו ב-Ctrl+C להעתקה ו-Ctrl+V להדבקה",
      "השתמשו ב-F2 כדי לשנות שמות",
      "השתמשו ב-Delete כדי למחוק",
      "השתמשו ב-Windows+R לפתיחת הרצה"
    ],
    duration: 900,
    learningObjectives: [
      "להכיר את ממשק Windows",
      "לנהל קבצים ותיקיות",
      "להשתמש בכלי הניהול",
      "להתאים הגדרות מערכת"
    ]
  }
}; 