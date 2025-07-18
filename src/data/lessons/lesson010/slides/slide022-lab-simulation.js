export const slide22LabSimulation = {
  id: "slide-22",
  type: "interactive",
  title: "סימולציית מעבדה - בדיקת חדירות מערכת 🖥️",
  content: {
    gameType: "lab-simulation",
    description: "בדקו את אבטחת המערכת וזיהו חולשות",
    scenario: {
      title: "בדיקת אבטחת שרת Web",
      description: "אתם האקרים אתיים שצריכים לבדוק את אבטחת שרת Web של חברה",
      objectives: [
        "🔍 סרוק את השרת לגילוי שירותים",
        "🔐 בדוק חולשות בסיסמאות",
        "🌐 זהה חולשות באפליקציית Web",
        "📊 דווח על הממצאים"
      ]
    },
    tools: [
      {
        name: "Nmap Scanner",
        description: "סריקת רשתות ופורטים",
        usage: "nmap -sS -sV target_ip"
      },
      {
        name: "Password Cracker",
        description: "פריצת סיסמאות",
        usage: "john --wordlist=passwords.txt hash.txt"
      },
      {
        name: "Web Vulnerability Scanner",
        description: "סריקת חולשות Web",
        usage: "nikto -h target_url"
      },
      {
        name: "Network Sniffer",
        description: "האזנה לתעבורת רשת",
        usage: "wireshark -i eth0"
      }
    ],
    challenges: [
      {
        id: "challenge1",
        title: "סריקת רשת",
        description: "סרקו את השרת וגלו איזה שירותים פועלים",
        solution: "nmap -sS -sV 192.168.1.100",
        hints: [
          "השתמשו ב-Nmap לסריקה",
          "חפשו פורטים פתוחים",
          "זיהו שירותי Web"
        ]
      },
      {
        id: "challenge2",
        title: "פריצת סיסמה",
        description: "פריצו סיסמה חלשה של משתמש",
        solution: "john --wordlist=rockyou.txt user_hash.txt",
        hints: [
          "השתמשו במילון מילים",
          "חפשו סיסמאות נפוצות",
          "נסו שילובים פשוטים"
        ]
      },
      {
        id: "challenge3",
        title: "חולשת SQL Injection",
        description: "זיהו חולשת SQL Injection בטופס",
        solution: "' OR 1=1 --",
        hints: [
          "נסו תווים מיוחדים",
          "בדקו הודעות שגיאה",
          "חפשו דליפת מידע"
        ]
      }
    ],
    instructions: [
      "בחרו כלי מתאים לכל משימה",
      "עקבו אחר ההוראות בקפידה",
      "תעדו כל ממצא",
      "הכינו דוח מקצועי"
    ]
  }
}; 