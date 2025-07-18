export const slide6CloudSecurity = {
  id: "slide-6",
  type: "content",
  title: "עקרונות אבטחת ענן - Cloud Security Principles 🔐",
  content: {
    sections: [
      {
        title: "עקרונות יסוד באבטחת ענן",
        items: [
          {
            principle: "Zero Trust",
            description: "אל תאמינו לאף אחד, בדקו הכל",
            implementation: ["אימות רב-שלבי", "הרשאות מינימליות", "ניטור מתמיד"]
          },
          {
            principle: "Defense in Depth",
            description: "שכבות הגנה מרובות",
            implementation: ["Firewall", "IDS/IPS", "הצפנה", "ניטור"]
          },
          {
            principle: "Least Privilege",
            description: "הרשאות מינימליות נדרשות",
            implementation: ["Role-Based Access Control", "Just-In-Time Access", "Privileged Access Management"]
          }
        ]
      },
      {
        title: "אבטחת זהות וגישה",
        items: [
          {
            technology: "Identity and Access Management (IAM)",
            features: ["ניהול משתמשים", "הרשאות", "אימות", "ניטור"],
            tools: ["AWS IAM", "Azure Active Directory", "Google Cloud IAM"]
          },
          {
            technology: "Multi-Factor Authentication (MFA)",
            methods: ["סיסמה", "SMS", "Authenticator App", "Hardware Token"],
            benefits: ["אבטחה משופרת", "הגנה מפני גניבת זהות"]
          },
          {
            technology: "Single Sign-On (SSO)",
            description: "התחברות אחת לכל השירותים",
            benefits: ["נוחות למשתמש", "ניהול מרכזי", "אבטחה משופרת"]
          }
        ]
      },
      {
        title: "הצפנת נתונים",
        items: [
          {
            type: "Encryption at Rest",
            description: "הצפנת נתונים באחסון",
            tools: ["AWS KMS", "Azure Key Vault", "Google Cloud KMS"]
          },
          {
            type: "Encryption in Transit",
            description: "הצפנת נתונים בתעבורה",
            protocols: ["TLS/SSL", "HTTPS", "VPN", "IPSec"]
          },
          {
            type: "Encryption in Use",
            description: "הצפנת נתונים בשימוש",
            technologies: ["Homomorphic Encryption", "Confidential Computing"]
          }
        ]
      },
      {
        title: "ניטור ואבטחה",
        items: [
          {
            tool: "Cloud Access Security Broker (CASB)",
            features: ["ניטור פעילות", "אכיפת מדיניות", "זיהוי איומים"],
            vendors: ["Netskope", "McAfee", "Symantec", "Microsoft"]
          },
          {
            tool: "Cloud Security Posture Management (CSPM)",
            features: ["זיהוי חולשות", "אכיפת מדיניות", "ניטור תצורה"],
            tools: ["AWS Config", "Azure Security Center", "Google Security Command Center"]
          },
          {
            tool: "Cloud Workload Protection Platform (CWPP)",
            features: ["הגנה על עומסי עבודה", "זיהוי איומים", "תגובה אוטומטית"],
            tools: ["Trend Micro", "CrowdStrike", "SentinelOne"]
          }
        ]
      }
    ],
    tips: [
      "התחילו עם אבטחת זהות",
      "הצפינו כל דבר",
      "ניטרו כל פעילות",
      "תכננו לתגובה לאירועים"
    ]
  }
}; 