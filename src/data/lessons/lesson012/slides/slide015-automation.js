export const slide15Automation = {
  id: "slide-15",
  type: "content",
  title: "אוטומציה ותשתית כקוד - Automation & IaC 🤖",
  content: {
    sections: [
      {
        title: "מהי אוטומציה בענן?",
        content: "אוטומציה בענן מאפשרת לנהל תשתיות, אבטחה ותצורה בצורה אוטומטית, מהירה ומדויקת."
      },
      {
        title: "תשתית כקוד (IaC)",
        items: [
          {
            tool: "Terraform",
            description: "ניהול תשתיות בענן באמצעות קוד",
            benefits: ["שחזור מהיר", "בקרת גרסאות", "אוטומציה מלאה", "אבטחה משופרת"]
          },
          {
            tool: "AWS CloudFormation",
            description: "הגדרת משאבים בענן AWS באמצעות תבניות YAML/JSON",
            benefits: ["ניהול מרכזי", "אוטומציה", "בקרת שינויים"]
          },
          {
            tool: "Azure Resource Manager",
            description: "ניהול משאבים בענן Azure באמצעות קבצי תצורה",
            benefits: ["אוטומציה", "בקרת הרשאות", "שחזור מהיר"]
          }
        ]
      },
      {
        title: "יתרונות האוטומציה",
        items: [
          "הפחתת טעויות אנוש",
          "שיפור אבטחה",
          "חיסכון בזמן",
          "יכולת שיחזור מהירה",
          "בקרת שינויים"
        ]
      },
      {
        title: "אתגרי אבטחה באוטומציה",
        items: [
          "ניהול סודות והרשאות בקוד",
          "בדיקות קוד אוטומטיות",
          "בקרת גישה לכלי אוטומציה",
          "הגנה על קבצי תצורה"
        ]
      },
      {
        title: "טיפים לאוטומציה בטוחה",
        items: [
          "הצפנת קבצי תצורה וסודות",
          "בדיקות קוד קבועות",
          "ניהול הרשאות מינימליות",
          "שימוש בכלי בקרת גרסאות"
        ]
      }
    ],
    tips: [
      "שלבו אוטומציה בתהליכי אבטחה",
      "בדקו קוד אוטומטי לפני הפעלה",
      "הצפינו סודות והרשאות",
      "תעדו כל שינוי בתשתית"
    ]
  }
}; 