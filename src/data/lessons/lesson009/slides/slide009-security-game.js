export const slide9SecurityGame = {
  id: "slide-9",
  type: "interactive",
  title: "משחק אבטחה מתקדם - התאמת כלים לאיומים 🎮",
  content: {
    gameType: "matching",
    instructions: "גררו כל כלי אבטחה לאיום המתאים לו",
    items: [
      {
        id: "firewall",
        text: "Firewall",
        description: "חומת אש להגנה על רשת",
        correctCategory: "network"
      },
      {
        id: "antivirus",
        text: "Antivirus",
        description: "תוכנה נגד וירוסים",
        correctCategory: "malware"
      },
      {
        id: "encryption",
        text: "Encryption",
        description: "הצפנת מידע",
        correctCategory: "data"
      },
      {
        id: "vpn",
        text: "VPN",
        description: "רשת פרטית וירטואלית",
        correctCategory: "privacy"
      },
      {
        id: "siem",
        text: "SIEM",
        description: "ניהול אירועי אבטחה",
        correctCategory: "monitoring"
      },
      {
        id: "ids",
        text: "IDS/IPS",
        description: "זיהוי ומניעת חדירות",
        correctCategory: "intrusion"
      }
    ],
    categories: [
      {
        id: "network",
        name: "הגנה על רשת",
        icon: "🌐"
      },
      {
        id: "malware",
        name: "הגנה מפני תוכנות זדוניות",
        icon: "🦠"
      },
      {
        id: "data",
        name: "הגנה על נתונים",
        icon: "💾"
      },
      {
        id: "privacy",
        name: "פרטיות ואנונימיות",
        icon: "🔒"
      },
      {
        id: "monitoring",
        name: "ניטור וזיהוי",
        icon: "📊"
      },
      {
        id: "intrusion",
        name: "מניעת חדירות",
        icon: "🚪"
      }
    ],
    feedback: {
      correct: "מעולה! התאמה נכונה! 🎉",
      incorrect: "נסה שוב! 💪",
      complete: "כל הכבוד! השלמת את המשחק בהצלחה! 🏆"
    }
  }
}; 