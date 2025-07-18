export const slide21SecurityLab = {
  id: "slide-21",
  type: "interactive",
  title: "מעבדת אבטחה מתקדמת - Advanced Security Lab 🔬",
  content: {
    gameType: "labSimulation",
    instructions: "בנו מערכת אבטחה מתקדמת עם כלים שונים",
    scenario: {
      title: "מערכת אבטחה ארגונית",
      description: "צריך לבנות מערכת אבטחה מקיפה לארגון"
    },
    components: [
      {
        id: "firewall",
        name: "Firewall",
        description: "חומת אש להגנה על הרשת",
        category: "network"
      },
      {
        id: "ids",
        name: "IDS/IPS",
        description: "זיהוי ומניעת חדירות",
        category: "monitoring"
      },
      {
        id: "siem",
        name: "SIEM",
        description: "ניהול אירועי אבטחה",
        category: "monitoring"
      },
      {
        id: "vpn",
        name: "VPN",
        description: "רשת פרטית וירטואלית",
        category: "network"
      },
      {
        id: "encryption",
        name: "Encryption",
        description: "הצפנת נתונים",
        category: "data"
      },
      {
        id: "backup",
        name: "Backup System",
        description: "מערכת גיבוי",
        category: "data"
      }
    ],
    challenges: [
      {
        title: "הגנה על רשת",
        description: "התקינו חומת אש ו-VPN",
        solution: ["firewall", "vpn"]
      },
      {
        title: "ניטור אבטחה",
        description: "התקינו מערכות ניטור",
        solution: ["ids", "siem"]
      },
      {
        title: "הגנה על נתונים",
        description: "הצפינו נתונים וגבו אותם",
        solution: ["encryption", "backup"]
      }
    ],
    features: {
      dragAndDrop: true,
      visualDesigner: true,
      validation: true,
      hints: true,
      realTimeFeedback: true
    },
    feedback: {
      correct: "מעולה! בנית מערכת אבטחה נכונה! 🎉",
      partial: "כמעט שם! חסרים עוד רכיבים",
      incorrect: "נסו שוב! השתמשו ברמזים",
      complete: "כל הכבוד! השלמתם את המעבדה בהצלחה! 🏆"
    }
  }
}; 