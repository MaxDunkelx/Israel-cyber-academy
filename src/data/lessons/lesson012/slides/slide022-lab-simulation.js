export const slide22LabSimulation = {
  id: "slide-22",
  type: "interactive",
  title: "סימולציית מעבדה - הגדרת אבטחת ענן מתקדמת 🔧",
  content: {
    simulationType: "lab",
    title: "הגדרת אבטחת ענן מלאה",
    description: "בסימולציה זו תגדירו מערכת אבטחת ענן מלאה עבור חברה חדשה.",
    steps: [
      {
        step: 1,
        title: "יצירת VPC מאובטח",
        description: "צרו Virtual Private Cloud עם הגדרות אבטחה מתקדמות",
        tasks: [
          "הגדרת CIDR blocks",
          "יצירת Subnets נפרדים",
          "הגדרת Route Tables",
          "הפעלת Flow Logs"
        ],
        expectedResult: "VPC מאובטח עם ניטור מלא"
      },
      {
        step: 2,
        title: "הגדרת Security Groups",
        description: "צרו Security Groups עם הרשאות מינימליות",
        tasks: [
          "הגדרת Inbound Rules",
          "הגדרת Outbound Rules",
          "הגבלת גישה לפי IP",
          "הגדרת Port Security"
        ],
        expectedResult: "Security Groups מאובטחים עם הרשאות מינימליות"
      },
      {
        step: 3,
        title: "הגדרת IAM מתקדם",
        description: "צרו משתמשים וקבוצות עם הרשאות מדויקות",
        tasks: [
          "יצירת Users",
          "הגדרת Groups",
          "הקצאת Policies",
          "הפעלת MFA"
        ],
        expectedResult: "מערכת IAM מאובטחת עם הרשאות מדויקות"
      },
      {
        step: 4,
        title: "הגדרת ניטור ואזהרות",
        description: "הגדירו מערכת ניטור מתקדמת",
        tasks: [
          "הגדרת CloudWatch",
          "יצירת Alarms",
          "הגדרת SNS Notifications",
          "הגדרת Log Aggregation"
        ],
        expectedResult: "מערכת ניטור מלאה עם התראות"
      },
      {
        step: 5,
        title: "הגדרת הצפנה",
        description: "הגדירו הצפנה לכל הנתונים",
        tasks: [
          "הגדרת KMS",
          "הצפנת EBS Volumes",
          "הצפנת S3 Buckets",
          "הגדרת TLS/SSL"
        ],
        expectedResult: "כל הנתונים מוצפנים"
      }
    ],
    challenges: [
      "זיהוי חולשות אבטחה",
      "תיקון הגדרות לא נכונות",
      "בדיקת עמידה בתקנות",
      "אופטימיזציה של ביצועים"
    ],
    successCriteria: [
      "כל השירותים מאובטחים",
      "ניטור פעיל",
      "הרשאות מינימליות",
      "הצפנה מלאה",
      "תיעוד מלא"
    ],
    tips: [
      "בדקו כל הגדרה פעמיים",
      "השתמשו בעקרון הרשאות מינימליות",
      "תעדו כל שינוי",
      "בדקו את האבטחה באופן קבוע"
    ]
  }
}; 