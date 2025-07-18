export const slide10DataProtection = {
  id: "slide-10",
  type: "content",
  title: "הגנה על נתונים בענן - Cloud Data Protection 🛡️",
  content: {
    sections: [
      {
        title: "עקרונות הגנה על נתונים",
        items: [
          {
            principle: "Data Classification",
            description: "סיווג נתונים לפי רגישות",
            levels: ["Public", "Internal", "Confidential", "Restricted"],
            implementation: ["תגיות אוטומטיות", "סיווג ידני", "ניטור תנועה"]
          },
          {
            principle: "Data Loss Prevention (DLP)",
            description: "מניעת אובדן נתונים",
            features: ["זיהוי נתונים רגישים", "ניטור תנועה", "חסימת העברה", "דיווח"],
            tools: ["Microsoft DLP", "Symantec DLP", "Forcepoint DLP"]
          },
          {
            principle: "Data Residency",
            description: "מיקום גיאוגרפי של נתונים",
            considerations: ["חוקים מקומיים", "תקנות", "ביצועים", "עלויות"]
          }
        ]
      },
      {
        title: "הצפנת נתונים",
        items: [
          {
            encryption: "Encryption at Rest",
            description: "הצפנת נתונים באחסון",
            methods: ["AES-256", "RSA", "Key Rotation", "Hardware Security Modules"],
            providers: ["AWS KMS", "Azure Key Vault", "Google Cloud KMS"]
          },
          {
            encryption: "Encryption in Transit",
            description: "הצפנת נתונים בתעבורה",
            protocols: ["TLS 1.3", "HTTPS", "SFTP", "VPN"],
            certificates: ["SSL Certificates", "Wildcard Certificates", "Multi-Domain"]
          },
          {
            encryption: "Client-Side Encryption",
            description: "הצפנה בצד הלקוח",
            benefits: ["אבטחה מקסימלית", "שליטה מלאה", "עמידה בתקנות"],
            tools: ["AWS S3 Client-Side Encryption", "Azure Storage Client Library"]
          }
        ]
      },
      {
        title: "גיבוי ושחזור",
        items: [
          {
            backup: "Backup Strategies",
            types: ["Full Backup", "Incremental Backup", "Differential Backup"],
            locations: ["Same Region", "Cross Region", "Offline Storage"],
            retention: ["Short-term", "Long-term", "Compliance"]
          },
          {
            backup: "Disaster Recovery",
            strategies: ["Backup and Restore", "Pilot Light", "Warm Standby", "Multi-Site"],
            metrics: ["RTO (Recovery Time Objective)", "RPO (Recovery Point Objective)"]
          },
          {
            backup: "Business Continuity",
            planning: ["Risk Assessment", "Impact Analysis", "Recovery Procedures", "Testing"]
          }
        ]
      },
      {
        title: "תאימות ותקנות",
        items: [
          {
            regulation: "GDPR",
            description: "הגנה על נתונים אישיים באיחוד האירופי",
            requirements: ["Consent", "Right to be Forgotten", "Data Portability", "Breach Notification"]
          },
          {
            regulation: "HIPAA",
            description: "אבטחת מידע רפואי בארה\"ב",
            requirements: ["Administrative Safeguards", "Physical Safeguards", "Technical Safeguards"]
          },
          {
            regulation: "SOX",
            description: "דיווח פיננסי שקוף",
            requirements: ["Financial Controls", "IT Controls", "Audit Trails", "Documentation"]
          }
        ]
      }
    ],
    tips: [
      "סווגו נתונים מתחילת התכנון",
      "הצפינו כל נתון רגיש",
      "תכננו אסטרטגיית גיבוי מקיפה",
      "עמדו בתקנות הרלוונטיות"
    ]
  }
}; 