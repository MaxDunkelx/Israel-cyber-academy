export const slide8WebHacking = {
  id: "slide-8",
  type: "content",
  title: "האקינג אתרי אינטרנט - Web Hacking Techniques 🌐",
  content: {
    sections: [
      {
        title: "מה זה האקינג אתרים?",
        content: "האקינג אתרים הוא זיהוי וניצול חולשות באתרי אינטרנט ואפליקציות web."
      },
      {
        title: "סוגי חולשות web",
        items: [
          {
            icon: "💉",
            title: "SQL Injection",
            description: "הזרקת קוד SQL למסד נתונים"
          },
          {
            icon: "📝",
            title: "XSS - Cross-Site Scripting",
            description: "הזרקת קוד JavaScript"
          },
          {
            icon: "🌐",
            title: "CSRF - Cross-Site Request Forgery",
            description: "זיוף בקשות בין אתרים"
          },
          {
            icon: "📁",
            title: "File Upload Vulnerabilities",
            description: "חולשות בהעלאת קבצים"
          }
        ]
      },
      {
        title: "כלי האקינג web",
        items: [
          "Burp Suite - פלטפורמת האקינג web",
          "OWASP ZAP - כלי אבטחה חינמי",
          "Nikto - סריקת חולשות web",
          "SQLMap - כלי SQL Injection",
          "Dirb - סריקת תיקיות",
          "WPScan - האקינג WordPress"
        ]
      },
      {
        title: "טכניקות האקינג web",
        items: [
          "Information Gathering - איסוף מידע",
          "Vulnerability Scanning - סריקת חולשות",
          "Manual Testing - בדיקה ידנית",
          "Exploitation - ניצול חולשות",
          "Post Exploitation - פעולות לאחר ניצול",
          "Reporting - דיווח ממצאים"
        ]
      },
      {
        title: "חולשות נפוצות",
        items: [
          "Broken Authentication - אימות שבור",
          "Sensitive Data Exposure - חשיפת נתונים רגישים",
          "Security Misconfiguration - הגדרות אבטחה שגויות",
          "Insufficient Logging - תיעוד לא מספק",
          "Insecure Deserialization - סריאליזציה לא בטוחה",
          "Using Components with Known Vulnerabilities - שימוש ברכיבים פגיעים"
        ]
      }
    ],
    tips: [
      "השתמשו בסביבות בדיקה מבודדות",
      "תעדו כל חולשה שנמצאה",
      "היו זהירים לא לפגוע באתרים אמיתיים",
      "למדו על OWASP Top 10"
    ]
  }
}; 