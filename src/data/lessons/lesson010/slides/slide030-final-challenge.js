export const slide30FinalChallenge = {
  id: "slide-30",
  type: "interactive",
  title: "אתגר סיום - בדיקת אבטחה מלאה 🏆",
  content: {
    gameType: "final-challenge",
    description: "בדיקת אבטחה מקיפה של מערכת וירטואלית",
    challenge: {
      title: "בדיקת אבטחה של שרת Web",
      scenario: "אתם האקרים אתיים שצריכים לבצע בדיקת אבטחה מקיפה של שרת Web של חברת e-commerce",
      objectives: [
        "🔍 איסוף מידע על המערכת",
        "📡 סריקת רשתות ופורטים",
        "🔐 בדיקת חולשות בסיסמאות",
        "🌐 זיהוי חולשות באפליקציית Web",
        "📱 בדיקת אבטחת מכשירים ניידים",
        "📊 הכנת דוח מקצועי"
      ]
    },
    phases: [
      {
        phase: 1,
        title: "איסוף מידע",
        tasks: [
          "Google Dorks לחיפוש מידע",
          "Whois למידע על הדומיין",
          "DNS enumeration",
          "Social media reconnaissance"
        ],
        tools: ["Google", "Whois", "nslookup", "theHarvester"]
      },
      {
        phase: 2,
        title: "סריקת רשת",
        tasks: [
          "Port scanning",
          "Service enumeration",
          "OS fingerprinting",
          "Vulnerability scanning"
        ],
        tools: ["Nmap", "Nessus", "OpenVAS", "Masscan"]
      },
      {
        phase: 3,
        title: "בדיקת Web",
        tasks: [
          "Directory enumeration",
          "SQL injection testing",
          "XSS testing",
          "CSRF testing"
        ],
        tools: ["Dirb", "SQLMap", "Burp Suite", "OWASP ZAP"]
      },
      {
        phase: 4,
        title: "פריצת סיסמאות",
        tasks: [
          "Hash extraction",
          "Dictionary attack",
          "Brute force attack",
          "Rainbow table attack"
        ],
        tools: ["John the Ripper", "Hashcat", "Hydra", "Medusa"]
      },
      {
        phase: 5,
        title: "דיווח",
        tasks: [
          "תיעוד ממצאים",
          "הערכת סיכונים",
          "הכנת המלצות",
          "כתיבת דוח סופי"
        ],
        tools: ["Word", "PowerPoint", "Excel", "Custom templates"]
      }
    ],
    scoring: {
      points: [
        { task: "איסוף מידע מלא", points: 20 },
        { task: "זיהוי חולשות קריטיות", points: 30 },
        { task: "פריצת סיסמה", points: 25 },
        { task: "דוח מקצועי", points: 25 }
      ],
      total: 100
    },
    instructions: [
      "עברו על כל השלבים בסדר",
      "תעדו כל ממצא",
      "השתמשו בכלים המתאימים",
      "הכינו דוח מקצועי",
      "שמרו על אתיקה מקצועית"
    ],
    rewards: [
      "🏆 תעודת האקר אתי מתחיל",
      "📚 גישה לקורסים מתקדמים",
      "🤝 הצטרפות לקהילת אבטחה",
      "💼 אפשרויות קריירה"
    ]
  }
}; 