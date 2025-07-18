export const slide16FinalQuiz = {
  id: "slide-16",
  type: "assessment",
  title: "חידון סופי - פרוטוקולים 🏆",
  content: {
    assessmentType: "quiz",
    questions: [
      {
        question: "מה המשמעות של HTTPS?",
        options: ["HyperText Transfer Protocol Secure", "High Tech Transfer Protocol", "Home Transfer Protocol", "Hyper Transfer Protocol"],
        correctAnswer: 0,
        explanation: "HTTPS = HyperText Transfer Protocol Secure - פרוטוקול העברת היפר-טקסט מאובטח"
      },
      {
        question: "איזה פרוטוקול מאפשר גישה למיילים מכל מכשיר?",
        options: ["SMTP", "POP3", "IMAP", "FTP"],
        correctAnswer: 2,
        explanation: "IMAP מאפשר גישה למיילים מכל מכשיר עם סנכרון"
      },
      {
        question: "איזה שכבה במודל OSI אחראית על ניתוב?",
        options: ["שכבה 2 - Data Link", "שכבה 3 - Network", "שכבה 4 - Transport", "שכבה 5 - Session"],
        correctAnswer: 1,
        explanation: "שכבה 3 - Network אחראית על ניתוב וכתובות IP"
      },
      {
        question: "מתי כדאי להשתמש ב-VPN?",
        options: ["רק בבית", "רק ברשתות ציבוריות", "תמיד", "רק בעבודה"],
        correctAnswer: 1,
        explanation: "VPN חשוב במיוחד ברשתות WiFi ציבוריות להגנה על הפרטיות"
      },
      {
        question: "איזה פרוטוקול משמש למשחקים מקוונים?",
        options: ["HTTP", "SMTP", "TCP/UDP", "FTP"],
        correctAnswer: 2,
        explanation: "TCP/UDP משמשים למשחקים מקוונים - TCP לאמינות, UDP למהירות"
      }
    ],
    description: "חידון סופי מקיף על כל מה שלמדנו על פרוטוקולים!",
    passingScore: 3
  }
}; 