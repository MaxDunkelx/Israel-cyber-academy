export const slide12LabSimulation = {
  id: "slide-12",
  type: "interactive",
  title: "סימולציית מעבדה - הגדרת אבטחת רשתות מתקדמת 🔧",
  content: {
    simulationType: "lab",
    title: "הגדרת רשת מאובטחת מתקדמת",
    description: "בסימולציה זו תגדירו רשת מאובטחת מתקדמת עם SDN, NFV, ו-AI.",
    steps: [
      {
        step: 1,
        title: "הגדרת SDN Controller",
        description: "הגדירו Software-Defined Networking Controller",
        tasks: [
          "התקנת OpenDaylight Controller",
          "הגדרת Network Policies",
          "הגדרת Flow Rules",
          "הפעלת Security Policies"
        ],
        expectedResult: "SDN Controller פעיל עם מדיניות אבטחה"
      },
      {
        step: 2,
        title: "הגדרת NFV Infrastructure",
        description: "הגדירו Network Function Virtualization",
        tasks: [
          "התקנת OpenStack",
          "הגדרת Virtual Network Functions",
          "הגדרת Security Functions",
          "הפעלת Load Balancing"
        ],
        expectedResult: "תשתית NFV פעילה עם פונקציות אבטחה"
      },
      {
        step: 3,
        title: "הגדרת Zero Trust Architecture",
        description: "הגדירו ארכיטקטורה ללא אמון",
        tasks: [
          "הגדרת Identity Management",
          "הגדרת Access Control",
          "הגדרת Micro-segmentation",
          "הפעלת Continuous Monitoring"
        ],
        expectedResult: "ארכיטקטורת Zero Trust פעילה"
      },
      {
        step: 4,
        title: "הגדרת AI-Powered Security",
        description: "הגדירו אבטחה מבוססת AI",
        tasks: [
          "התקנת AI Security Platform",
          "הגדרת Behavioral Analysis",
          "הגדרת Threat Detection",
          "הפעלת Automated Response"
        ],
        expectedResult: "מערכת אבטחה מבוססת AI פעילה"
      },
      {
        step: 5,
        title: "בדיקת אבטחה",
        description: "בצעו בדיקת אבטחה מלאה",
        tasks: [
          "סריקת חולשות",
          "בדיקת חדירות",
          "בדיקת ביצועים",
          "בדיקת עמידה בתקנות"
        ],
        expectedResult: "רשת מאובטחת עם ביצועים טובים"
      }
    ],
    challenges: [
      "אינטגרציה בין מערכות",
      "ניהול מורכבות",
      "אופטימיזציה של ביצועים",
      "עמידה בתקנות"
    ],
    successCriteria: [
      "כל המערכות פועלות יחד",
      "אבטחה מקסימלית",
      "ביצועים טובים",
      "תיעוד מלא"
    ],
    tips: [
      "תכננו היטב לפני ביצוע",
      "בדקו כל שלב",
      "תעדו כל הגדרה",
      "בצעו בדיקות קבועות"
    ]
  }
}; 