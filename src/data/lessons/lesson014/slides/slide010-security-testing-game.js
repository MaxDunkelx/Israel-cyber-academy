export const slide10SecurityTestingGame = {
  id: "slide-10",
  type: "interactive",
  title: "משחק בדיקת אבטחה - Security Testing Game 🎮",
  content: {
    gameType: "matching",
    title: "התאימו כלי בדיקה לחולשה המתאימה",
    description: "התאימו כל כלי בדיקת אבטחה לחולשה שהוא מיועד לזהות.",
    pairs: [
      {
        term: "SQLMap",
        definition: "כלי אוטומטי לבדיקת SQL Injection",
        category: "בדיקת חדירה"
      },
      {
        term: "OWASP ZAP",
        definition: "כלי לבדיקת אבטחת אפליקציות ווב",
        category: "בדיקת ווב"
      },
      {
        term: "Nmap",
        definition: "סריקת פורטים ושירותים ברשת",
        category: "סריקת רשת"
      },
      {
        term: "Burp Suite",
        definition: "כלי לבדיקת אפליקציות ווב מתקדם",
        category: "בדיקת ווב"
      },
      {
        term: "Metasploit",
        definition: "מסגרת לניצול חולשות",
        category: "בדיקת חדירה"
      },
      {
        term: "Wireshark",
        definition: "ניתוח תעבורת רשת",
        category: "ניתוח רשת"
      },
      {
        term: "Nikto",
        definition: "סריקת שרתי ווב לחולשות",
        category: "בדיקת ווב"
      },
      {
        term: "Aircrack-ng",
        definition: "בדיקת אבטחת רשתות אלחוטיות",
        category: "רשתות אלחוטיות"
      }
    ],
    categories: [
      "בדיקת חדירה",
      "בדיקת ווב",
      "סריקת רשת",
      "ניתוח רשת",
      "רשתות אלחוטיות"
    ],
    scoring: {
      correct: "+10 נקודות",
      incorrect: "-5 נקודות",
      bonus: "+5 נקודות לכל קטגוריה מלאה"
    },
    hints: [
      "חשבו על המטרה של כל כלי",
      "השתמשו בידע שלמדתם",
      "אל תמהרו - בדקו היטב"
    ],
    successMessage: "כל הכבוד! הפכת למומחה בדיקת אבטחה! 🏆"
  }
}; 