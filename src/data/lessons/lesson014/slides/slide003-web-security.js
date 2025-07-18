export const slide3WebSecurity = {
  id: "slide-3",
  type: "content",
  title: "אבטחת אפליקציות ווב מתקדמת - Advanced Web Application Security 🌐",
  content: {
    sections: [
      {
        title: "מהי אבטחת אפליקציות ווב מתקדמת?",
        content: "אבטחת אפליקציות ווב מתקדמת כוללת טכניקות וכלים חדשניים להגנה על יישומי ווב מורכבים."
      },
      {
        title: "אתגרי אבטחה מתקדמים",
        items: [
          {
            challenge: "OWASP Top 10 2024",
            description: "10 החולשות הנפוצות ביותר באפליקציות ווב",
            examples: [
              "Broken Access Control",
              "Cryptographic Failures",
              "Injection Attacks",
              "Insecure Design",
              "Security Misconfiguration"
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
          },
          {
            challenge: "Client-Side Security",
            description: "אבטחה בצד הלקוח",
            issues: [
              "XSS (Cross-Site Scripting)",
              "CSRF (Cross-Site Request Forgery)",
              "Clickjacking",
              "DOM-based Attacks"
            ]
          }
        ]
      },
      {
        title: "טכניקות הגנה מתקדמות",
        items: [
          "Content Security Policy (CSP)",
          "Subresource Integrity (SRI)",
          "HTTP Security Headers",
          "Web Application Firewall (WAF)",
          "Runtime Application Self-Protection (RASP)",
          "Interactive Application Security Testing (IAST)"
        ]
      },
      {
        title: "כלי בדיקה מתקדמים",
        items: [
          "Burp Suite Professional",
          "OWASP ZAP",
          "Acunetix",
          "Veracode",
          "Checkmarx",
          "SonarQube"
        ]
      }
    ],
    tips: [
      "הכירו את OWASP Top 10",
      "השתמשו בכלי בדיקה מתקדמים",
      "יישמו הגנות בשכבות",
      "בצעו בדיקות קבועות"
    ]
  }
}; 