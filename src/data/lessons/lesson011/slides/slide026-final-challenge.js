export const slide26FinalChallenge = {
  id: "slide-26",
  type: "interactive",
  title: "אתגר סופי - מבחן מקיף בניתוח תוכנות זדוניות 🎯",
  content: {
    component: "challenge",
    title: "מבחן מקיף - ניתוח תוכנה זדונית מתקדמת",
    description: "עליכם לנתח קובץ חשוד ולזהות את כל המאפיינים שלו.",
    challenge: {
      scenario: "קיבלתם קובץ חשוד לניתוח. עליכם לזהות את סוג התוכנה הזדונית, מנגנון הפעולה, ולפתח פתרון נטרול.",
      steps: [
        {
          step: 1,
          title: "ניתוח ראשוני",
          task: "בדקו את הקובץ וזהו את סוגו",
          tools: ["PE Explorer", "FileAlyzer"],
          expected: "זיהוי סוג הקובץ ומאפיינים בסיסיים"
        },
        {
          step: 2,
          title: "ניתוח מחרוזות",
          task: "חלצו מחרוזות וזהו דפוסים חשודים",
          tools: ["Strings", "PE Explorer"],
          expected: "זיהוי כתובות URL, אימיילים, פונקציות חשודות"
        },
        {
          step: 3,
          title: "ניתוח דינמי",
          task: "הריצו את הקובץ ועקבו אחר התנהגותו",
          tools: ["Cuckoo Sandbox", "Process Monitor"],
          expected: "ניתוח פעילות רשת, קבצים, רישום"
        },
        {
          step: 4,
          title: "הנדסה הפוכה",
          task: "נתחו את הקוד המקור",
          tools: ["IDA Pro", "Ghidra"],
          expected: "הבנת מנגנון הפעולה והפונקציות"
        },
        {
          step: 5,
          title: "פיתוח פתרון",
          task: "פתחו פתרון נטרול",
          tools: ["Custom Scripts", "Removal Tools"],
          expected: "סקריפט או כלי לנטרול התוכנה הזדונית"
        }
      ],
      questions: [
        {
          question: "מהו סוג התוכנה הזדונית?",
          options: ["Rootkit", "Ransomware", "Banking Trojan", "Mobile Malware"],
          correctAnswer: 1
        },
        {
          question: "איזה פורט רשת התוכנה הזדונית משתמשת?",
          options: ["80", "443", "8080", "כל הפורטים הנ\"ל"],
          correctAnswer: 3
        },
        {
          question: "איך התוכנה הזדונית מתחמקת מזיהוי?",
          options: ["הצפנה", "פולימורפיזם", "הסתרה", "כל התשובות נכונות"],
          correctAnswer: 3
        },
        {
          question: "מהו הפתרון הטוב ביותר לנטרול?",
          options: ["מחיקת הקובץ", "פיתוח אנטי-וירוס", "שינוי הרשאות", "כל התשובות נכונות"],
          correctAnswer: 1
        }
      ]
    },
    scoring: {
      perfect: "מעולה! אתם מומחי ניתוח תוכנות זדוניות!",
      good: "טוב מאוד! יש לכם הבנה טובה של התחום.",
      average: "בסדר, אבל יש מקום לשיפור.",
      needsWork: "צריך לתרגל יותר את הנושאים."
    },
    tips: [
      "השתמשו בכל הטכניקות שלמדתם",
      "תעדו כל שלב בתהליך",
      "חשבו על כל האפשרויות",
      "אל תמהרו - דיוק חשוב"
    ]
  }
}; 