export const slide13LabSimulation = {
  id: "slide-13",
  type: "interactive",
  title: "סימולציית מעבדה - הגדרת אבטחת ענן 🔬",
  content: {
    component: "LabSimulation",
    scenario: {
      title: "הגדרת אבטחה לענן של חברה",
      description: "עליכם להגדיר אבטחה מקיפה לענן של חברת טכנולוגיה חדשה.",
      steps: [
        {
          step: 1,
          title: "הגדרת VPC",
          description: "צרו רשת פרטית וירטואלית מאובטחת",
          tools: ["AWS VPC", "Azure VNet", "Google VPC"],
          expectedResult: "רשת מבודדת עם תת-רשתות מאובטחות"
        },
        {
          step: 2,
          title: "הגדרת Security Groups",
          description: "צרו כללי אבטחה לשרתים",
          tools: ["AWS Security Groups", "Azure NSG", "Google Firewall"],
          expectedResult: "כללי אבטחה מגבילים ומאובטחים"
        },
        {
          step: 3,
          title: "הגדרת IAM",
          description: "צרו משתמשים והרשאות",
          tools: ["AWS IAM", "Azure AD", "Google Cloud IAM"],
          expectedResult: "משתמשים עם הרשאות מינימליות"
        },
        {
          step: 4,
          title: "הגדרת MFA",
          description: "הפעילו אימות רב-שלבי",
          tools: ["AWS MFA", "Azure MFA", "Google MFA"],
          expectedResult: "אימות רב-שלבי לכל המשתמשים"
        },
        {
          step: 5,
          title: "הגדרת ניטור",
          description: "הגדירו כלי ניטור ואזהרות",
          tools: ["CloudWatch", "Azure Monitor", "Google Monitoring"],
          expectedResult: "ניטור מלא עם אזהרות אוטומטיות"
        }
      ],
      challenges: [
        "צריך לאזן בין אבטחה לנוחות",
        "יש משתמשים מרובים עם צרכים שונים",
        "צריך לעמוד בתקנות",
        "תקציב מוגבל"
      ],
      successCriteria: [
        "כל השרתים מאובטחים",
        "הרשאות מינימליות",
        "ניטור פעיל",
        "עמידה בתקנות"
      ]
    },
    hints: [
      "התחילו עם הגדרת רשת",
      "השתמשו בעקרונות Zero Trust",
      "תעדו כל הגדרה",
      "בדקו את האבטחה"
    ]
  }
}; 