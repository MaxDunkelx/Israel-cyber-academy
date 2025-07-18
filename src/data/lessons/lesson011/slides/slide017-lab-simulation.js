export const slide17LabSimulation = {
  id: "slide-17",
  type: "interactive",
  title: "סימולציית מעבדה - ניתוח תוכנה זדונית 🔬",
  content: {
    component: "LabSimulation",
    scenario: {
      title: "ניתוח תוכנה זדונית חשודה",
      description: "קיבלתם קובץ חשוד לניתוח. עליכם לזהות את סוג התוכנה הזדונית ולנטרל אותה.",
      steps: [
        {
          step: 1,
          title: "ניתוח סטטי",
          description: "בדקו את הקובץ ללא הרצתו",
          tools: ["PE Explorer", "Strings", "FileAlyzer"],
          expectedResult: "זיהוי סוג הקובץ וסימנים חשודים"
        },
        {
          step: 2,
          title: "ניתוח דינמי",
          description: "הריצו את הקובץ בסביבה מבודדת",
          tools: ["Cuckoo Sandbox", "Process Monitor", "Wireshark"],
          expectedResult: "ניתוח התנהגות התוכנה הזדונית"
        },
        {
          step: 3,
          title: "הנדסה הפוכה",
          description: "נתחו את הקוד המקור",
          tools: ["IDA Pro", "Ghidra", "x64dbg"],
          expectedResult: "הבנת מנגנון הפעולה"
        },
        {
          step: 4,
          title: "ניתוח זיכרון",
          description: "בדקו את הזיכרון בזמן ריצה",
          tools: ["Volatility", "Process Hacker", "Memory Dump"],
          expectedResult: "זיהוי פעילות בזיכרון"
        },
        {
          step: 5,
          title: "נטרול האיום",
          description: "פתחו פתרון לנטרול התוכנה הזדונית",
          tools: ["Custom Scripts", "Removal Tools", "Security Updates"],
          expectedResult: "הסרת התוכנה הזדונית והגנה"
        }
      ],
      challenges: [
        "התוכנה הזדונית משתנה בכל הרצה",
        "יש הגנות נגד ניתוח",
        "הקוד מוצפן",
        "יש רשת של תוכנות זדוניות"
      ],
      successCriteria: [
        "זיהוי נכון של סוג התוכנה הזדונית",
        "הבנת מנגנון הפעולה",
        "פיתוח פתרון נטרול",
        "תיעוד מלא של התהליך"
      ]
    },
    hints: [
      "התחילו תמיד בניתוח סטטי",
      "השתמשו בסביבה מבודדת",
      "תעדו כל שלב",
      "חפשו דפוסים חוזרים"
    ]
  }
}; 