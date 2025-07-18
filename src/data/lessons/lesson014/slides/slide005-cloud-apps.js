export const slide5CloudApps = {
  id: "slide-5",
  type: "content",
  title: "אבטחת אפליקציות ענן - Cloud Application Security ☁️",
  content: {
    sections: [
      {
        title: "מהי אבטחת אפליקציות ענן?",
        content: "אבטחת אפליקציות ענן כוללת הגנה על יישומים הפועלים בסביבת ענן מפני איומים ייחודיים."
      },
      {
        title: "אתגרי אבטחה בענן",
        items: [
          {
            challenge: "Shared Responsibility Model",
            description: "מודל האחריות המשותפת",
            responsibilities: {
              cloud: "תשתית, פלטפורמה, אבטחה פיזית",
              customer: "אפליקציות, נתונים, הרשאות"
            }
          },
          {
            challenge: "Multi-Tenancy",
            description: "רב-דיירות",
            risks: [
              "Data Isolation",
              "Resource Sharing",
              "Side-Channel Attacks",
              "Privilege Escalation"
            ]
          },
          {
            challenge: "API Security",
            description: "אבטחת ממשקי API",
            threats: [
              "API Abuse",
              "Broken Authentication",
              "Excessive Data Exposure",
              "Lack of Rate Limiting"
            ]
          }
        ]
      },
      {
        title: "טכניקות הגנה מתקדמות",
        items: [
          "Cloud Access Security Broker (CASB)",
          "Cloud Security Posture Management (CSPM)",
          "Cloud Workload Protection Platform (CWPP)",
          "Serverless Security",
          "Container Security",
          "Microservices Security"
        ]
      },
      {
        title: "כלי אבטחה לענן",
        items: [
          "AWS Security Hub",
          "Azure Security Center",
          "Google Cloud Security Command Center",
          "Prisma Cloud",
          "CloudGuard",
          "Aqua Security"
        ]
      }
    ],
    tips: [
      "הבינו את מודל האחריות המשותפת",
      "השתמשו בכלי אבטחה מתקדמים",
      "בדקו הגדרות אבטחה",
      "ניטרו פעילות חשודה"
    ]
  }
}; 