export const slide9HackingGame = {
  id: "slide-9",
  type: "interactive",
  title: "משחק האקינג אתי - התאמת כלים לשלבים 🎮",
  content: {
    gameType: "matching",
    instructions: "גררו כל כלי האקינג לשלב המתאים בתהליך ההאקינג",
    items: [
      {
        id: "nmap",
        text: "Nmap",
        description: "סריקת רשתות ופורטים",
        correctCategory: "scanning"
      },
      {
        id: "metasploit",
        text: "Metasploit",
        description: "פלטפורמת האקינג",
        correctCategory: "exploitation"
      },
      {
        id: "burp",
        text: "Burp Suite",
        description: "האקינג אתרי web",
        correctCategory: "web"
      },
      {
        id: "john",
        text: "John the Ripper",
        description: "שבירת סיסמאות",
        correctCategory: "password"
      },
      {
        id: "wireshark",
        text: "Wireshark",
        description: "ניתוח תעבורת רשת",
        correctCategory: "monitoring"
      },
      {
        id: "hashcat",
        text: "Hashcat",
        description: "שבירת גיבובים",
        correctCategory: "password"
      }
    ],
    categories: [
      {
        id: "scanning",
        name: "סריקה ואיסוף מידע",
        icon: "🔍"
      },
      {
        id: "exploitation",
        name: "ניצול חולשות",
        icon: "💻"
      },
      {
        id: "web",
        name: "האקינג אתרים",
        icon: "🌐"
      },
      {
        id: "password",
        name: "שבירת סיסמאות",
        icon: "🔑"
      },
      {
        id: "monitoring",
        name: "ניטור וניתוח",
        icon: "📊"
      }
    ],
    feedback: {
      correct: "מעולה! התאמה נכונה! 🎉",
      incorrect: "נסה שוב! 💪",
      complete: "כל הכבוד! השלמת את המשחק בהצלחה! 🏆"
    }
  }
}; 