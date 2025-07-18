export const slide6TestingTechniques = {
  id: "slide-6",
  type: "content",
  title: "טכניקות בדיקת אבטחה מתקדמות - Advanced Security Testing Techniques 🔍",
  content: {
    sections: [
      {
        title: "מהי בדיקת אבטחה מתקדמת?",
        content: "בדיקת אבטחה מתקדמת כוללת שיטות וכלים חדשניים לזיהוי חולשות באפליקציות."
      },
      {
        title: "סוגי בדיקות מתקדמות",
        items: [
          {
            type: "Static Application Security Testing (SAST)",
            description: "בדיקות קוד סטטיות",
            tools: ["SonarQube", "Checkmarx", "Veracode", "Fortify"],
            advantages: ["זיהוי מוקדם", "בקרת קוד", "אוטומציה"],
            limitations: ["False Positives", "לא מזהה לוגיקה", "תלות באיכות קוד"]
          },
          {
            type: "Dynamic Application Security Testing (DAST)",
            description: "בדיקות דינמיות",
            tools: ["OWASP ZAP", "Burp Suite", "Acunetix", "AppScan"],
            advantages: ["בדיקה בזמן ריצה", "זיהוי חולשות אמיתיות", "בדיקת תפקוד"],
            limitations: ["False Negatives", "תלות בסביבה", "איטיות"]
          },
          {
            type: "Interactive Application Security Testing (IAST)",
            description: "בדיקות אינטראקטיביות",
            tools: ["Contrast Security", "Hdiv", "Seeker", "CxSAST"],
            advantages: ["דיוק גבוה", "זיהוי בזמן אמת", "שילוב SAST ו-DAST"],
            limitations: ["עלות גבוהה", "מורכבות", "תלות בסביבה"]
          },
          {
            type: "Runtime Application Self-Protection (RASP)",
            description: "הגנה עצמית בזמן ריצה",
            tools: ["Imperva", "Signal Sciences", "Fastly", "F5"],
            advantages: ["הגנה בזמן אמת", "תגובה מיידית", "למידה מתמדת"],
            limitations: ["עלות גבוהה", "השפעה על ביצועים", "מורכבות"]
          }
        ]
      },
      {
        title: "טכניקות בדיקה מתקדמות",
        items: [
          "Fuzzing - בדיקת קלט אקראי",
          "Symbolic Execution - ביצוע סימבולי",
          "Model-Based Testing - בדיקה מבוססת מודל",
          "Mutation Testing - בדיקת מוטציות",
          "Property-Based Testing - בדיקה מבוססת תכונות"
        ]
      },
      {
        title: "אוטומציה של בדיקות",
        items: [
          "Continuous Security Testing",
          "DevSecOps Integration",
          "Automated Vulnerability Scanning",
          "Security Regression Testing",
          "Automated Compliance Checking"
        ]
      }
    ],
    tips: [
      "שלבו מספר סוגי בדיקות",
      "השתמשו באוטומציה",
      "בדקו באופן קבוע",
      "תעדו כל ממצא"
    ]
  }
}; 