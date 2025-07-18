export const slide6NetworkGame = {
  id: "slide-6",
  type: "interactive",
  title: "משחק אבטחת רשתות - Network Security Game 🎮",
  content: {
    gameType: "matching",
    title: "התאימו מושגי אבטחת רשתות",
    description: "התאימו כל מושג להגדרה הנכונה שלו כדי לבנות רשת מאובטחת.",
    pairs: [
      {
        term: "SDN",
        definition: "Software-Defined Networking - רשתות מוגדרות תוכנה",
        category: "ארכיטקטורה"
      },
      {
        term: "NFV",
        definition: "Network Function Virtualization - וירטואליזציה של פונקציות רשת",
        category: "ארכיטקטורה"
      },
      {
        term: "Zero Trust",
        definition: "ארכיטקטורה ללא אמון - אימות מתמיד של כל בקשה",
        category: "אבטחה"
      },
      {
        term: "Network Slicing",
        definition: "חלוקת רשת 5G לרשתות וירטואליות נפרדות",
        category: "5G"
      },
      {
        term: "Edge Computing",
        definition: "עיבוד נתונים קרוב למקור במקום בשרת מרכזי",
        category: "טכנולוגיה"
      },
      {
        term: "AI-Powered Security",
        definition: "אבטחה מבוססת בינה מלאכותית לזיהוי איומים",
        category: "AI"
      },
      {
        term: "Micro-segmentation",
        definition: "חלוקה מיקרוסקופית של רשת לבידוד איומים",
        category: "אבטחה"
      },
      {
        term: "Threat Hunting",
        definition: "חיפוש פעיל אחר איומים ברשת",
        category: "אבטחה"
      }
    ],
    categories: [
      "ארכיטקטורה",
      "אבטחה", 
      "5G",
      "טכנולוגיה",
      "AI"
    ],
    scoring: {
      correct: "+10 נקודות",
      incorrect: "-5 נקודות",
      bonus: "+5 נקודות לכל קטגוריה מלאה"
    },
    hints: [
      "חשבו על המשמעות של כל מושג",
      "השתמשו בידע שלמדתם",
      "אל תמהרו - בדקו היטב"
    ],
    successMessage: "כל הכבוד! בנית רשת מאובטחת מתקדמת! 🏆"
  }
}; 