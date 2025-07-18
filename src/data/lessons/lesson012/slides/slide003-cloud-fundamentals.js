export const slide3CloudFundamentals = {
  id: "slide-3",
  type: "content",
  title: "יסודות מחשוב הענן - Cloud Computing Fundamentals ☁️",
  content: {
    sections: [
      {
        title: "מהו מחשוב ענן?",
        content: "מחשוב ענן הוא מתן שירותי מחשוב (שרתים, אחסון, רשת, תוכנה) דרך האינטרנט במקום שימוש במחשבים מקומיים."
      },
      {
        title: "מודלי שירות ענן",
        items: [
          {
            model: "IaaS - Infrastructure as a Service",
            description: "תשתיות ענן: שרתים, אחסון, רשת",
            examples: ["AWS EC2", "Azure Virtual Machines", "Google Compute Engine"]
          },
          {
            model: "PaaS - Platform as a Service",
            description: "פלטפורמת פיתוח: סביבת פיתוח מוכנה",
            examples: ["AWS Elastic Beanstalk", "Azure App Service", "Google App Engine"]
          },
          {
            model: "SaaS - Software as a Service",
            description: "תוכנה כשירות: יישומים מוכנים לשימוש",
            examples: ["Gmail", "Salesforce", "Microsoft 365", "Dropbox"]
          }
        ]
      },
      {
        title: "מודלי פריסה",
        items: [
          {
            type: "Public Cloud",
            description: "שירותי ענן ציבוריים זמינים לכל אחד",
            examples: ["AWS", "Azure", "Google Cloud"]
          },
          {
            type: "Private Cloud",
            description: "תשתית ענן פרטית לארגון ספציפי",
            examples: ["VMware vSphere", "OpenStack", "Microsoft Azure Stack"]
          },
          {
            type: "Hybrid Cloud",
            description: "שילוב של ענן ציבורי ופרטי",
            examples: ["AWS Outposts", "Azure Arc", "Google Anthos"]
          },
          {
            type: "Multi-Cloud",
            description: "שימוש במספר ספקי ענן במקביל",
            examples: ["AWS + Azure", "Google Cloud + AWS"]
          }
        ]
      },
      {
        title: "יתרונות מחשוב ענן",
        items: [
          "גמישות וסקלביליות",
          "חיסכון בעלויות",
          "גישה מכל מקום",
          "עדכונים אוטומטיים",
          "גיבוי ואמינות"
        ]
      },
      {
        title: "אתגרי אבטחה",
        items: [
          "אחריות משותפת",
          "גישה מרחוק",
          "שיתוף משאבים",
          "תלות בספק הענן",
          "עמידה בתקנות"
        ]
      }
    ],
    tips: [
      "הבינו את המודל המתאים לצרכים שלכם",
      "חשבו על אבטחה מתחילת התכנון",
      "בדקו את הסכם רמת השירות (SLA)",
      "תכננו אסטרטגיית גיבוי"
    ]
  }
}; 