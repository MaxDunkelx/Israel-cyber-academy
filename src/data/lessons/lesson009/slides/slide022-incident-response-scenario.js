export const slide22IncidentResponseScenario = {
  id: "slide-22",
  type: "interactive",
  title: "תרחיש תגובה לאירוע אבטחה - Incident Response Scenario ⚡",
  content: {
    gameType: "scenario",
    instructions: "נהלו אירוע אבטחה בצורה מקצועית",
    scenario: {
      title: "אירוע אבטחה בארגון",
      description: "זוהתה פעילות חשודה במערכת הארגונית"
    },
    timeline: [
      {
        time: "09:00",
        event: "זוהתה פעילות חשודה",
        action: "זיהוי ראשוני"
      },
      {
        time: "09:15",
        event: "הפעלת צוות תגובה",
        action: "הכלה ראשונית"
      },
      {
        time: "09:30",
        event: "ניתוח מעמיק",
        action: "חיסול האיום"
      },
      {
        time: "10:00",
        event: "שחזור מערכות",
        action: "תיעוד ולמידה"
      }
    ],
    decisions: [
      {
        question: "מה הפעולה הראשונה שצריך לבצע?",
        options: [
          "לכבות את כל המערכות",
          "להפעיל צוות תגובה",
          "להתקשר למשטרה",
          "להתעלם מהאירוע"
        ],
        correctAnswer: 1,
        explanation: "הפעלת צוות תגובה היא הפעולה הראשונה הנכונה"
      },
      {
        question: "איך להכיל את האיום?",
        options: [
          "למחוק את כל הנתונים",
          "לבודד את המערכות הנגועות",
          "להתקשר לכל העובדים",
          "לסגור את הארגון"
        ],
        correctAnswer: 1,
        explanation: "בידוד המערכות הנגועות הוא הדרך הנכונה להכלה"
      },
      {
        question: "מה חשוב לתעד?",
        options: [
          "רק את השעה",
          "רק את הפעולות שבוצעו",
          "כל פרט ופעולה",
          "רק את התוצאה"
        ],
        correctAnswer: 2,
        explanation: "תיעוד מלא של כל פרט ופעולה הוא קריטי"
      }
    ],
    feedback: {
      correct: "בחירה נכונה! המשך כך! 🎉",
      incorrect: "נסה שוב! חשב על הפרוטוקול הנכון",
      complete: "מעולה! ניהלת את האירוע בצורה מקצועית! 🏆"
    }
  }
}; 