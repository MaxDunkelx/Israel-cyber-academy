export const slide4LinuxDistros = {
  id: "slide-4",
  type: "interactive",
  title: "התאמת הפצות Linux 🎯",
  content: {
    type: "drag-drop",
    instructions: "גרור כל הפצה לתיאור המתאים",
    categories: [
      { id: "ubuntu", name: "Ubuntu", color: "#e95420", description: "ידידותית למשתמש" },
      { id: "centos", name: "CentOS", color: "#932279", description: "לשרתים" },
      { id: "arch", name: "Arch Linux", color: "#1793d1", description: "למתקדמים" },
      { id: "kali", name: "Kali Linux", color: "#000000", description: "לאבטחה" }
    ],
    items: [
      {
        id: 1,
        text: "הפצה עם ממשק גרפי יפה",
        correctCategory: "ubuntu"
      },
      {
        id: 2,
        text: "הפצה עם כלי האקינג",
        correctCategory: "kali"
      },
      {
        id: 3,
        text: "הפצה יציבה לשרתים",
        correctCategory: "centos"
      },
      {
        id: 4,
        text: "הפצה מותאמת אישית",
        correctCategory: "arch"
      },
      {
        id: 5,
        text: "הפצה עם התקנה קלה",
        correctCategory: "ubuntu"
      },
      {
        id: 6,
        text: "הפצה למומחי מחשבים",
        correctCategory: "arch"
      }
    ],
    duration: 300
  }
}; 