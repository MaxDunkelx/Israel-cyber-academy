export const slide20SecurityQuiz = {
  id: "slide-20",
  type: "assessment",
  title: "חידון אבטחה מתקדם - מה זכרתם? 🧠",
  content: {
    assessmentType: "quiz",
    questions: [
      {
        question: "מה זה APT?",
        options: [
          "Advanced Programming Tool",
          "Advanced Persistent Threat",
          "Automated Protection Technology",
          "Application Performance Test"
        ],
        correctAnswer: 1,
        explanation: "APT הוא Advanced Persistent Threat - תקיפה מתקדמת ומתמשכת"
      },
      {
        question: "איזה פרוטוקול הצפנה מתקדם פותח על ידי Signal?",
        options: [
          "Signal Protocol",
          "TLS 1.3",
          "WireGuard",
          "PGP"
        ],
        correctAnswer: 0,
        explanation: "Signal Protocol פותח על ידי Signal להצפנת מסרים"
      },
      {
        question: "מה זה Zero Trust Architecture?",
        options: [
          "ארכיטקטורה ללא הצפנה",
          "ארכיטקטורה ללא אמון",
          "ארכיטקטורה ללא רשת",
          "ארכיטקטורה ללא שרת"
        ],
        correctAnswer: 1,
        explanation: "Zero Trust Architecture היא ארכיטקטורה שלא סומכת על אף אחד"
      },
      {
        question: "איזה כלי משמש לניתוח תוכנות זדוניות?",
        options: [
          "Wireshark",
          "IDA Pro",
          "Nmap",
          "Metasploit"
        ],
        correctAnswer: 1,
        explanation: "IDA Pro הוא כלי מקצועי לניתוח תוכנות זדוניות"
      },
      {
        question: "מה זה Post-Quantum Cryptography?",
        options: [
          "הצפנה קוונטית",
          "הצפנה פוסט-קוונטית",
          "הצפנה קלאסית",
          "הצפנה היברידית"
        ],
        correctAnswer: 1,
        explanation: "Post-Quantum Cryptography היא הצפנה עמידה למחשבים קוונטיים"
      }
    ],
    feedback: {
      correct: "מעולה! תשובה נכונה! 🎉",
      incorrect: "לא נכון, נסו שוב! 💪",
      complete: "כל הכבוד! השלמתם את החידון! 🏆"
    }
  }
}; 