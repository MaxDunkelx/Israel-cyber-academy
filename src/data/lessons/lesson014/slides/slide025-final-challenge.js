export const slide25FinalChallenge = {
  id: "slide-25",
  type: "interactive",
  title: "אתגר סיום - Final Challenge 🏆",
  content: {
    gameType: "challenge",
    title: "בנו מערכת אבטחה מלאה",
    description: "בחרו את הרכיבים הנכונים לבניית מערכת אבטחה מקיפה לאפליקציה.",
    challenge: {
      scenario: "אתם צריכים לבנות מערכת אבטחה לאפליקציית בנק מקוון",
      components: [
        {
          id: "auth",
          name: "מערכת אימות",
          options: [
            { name: "סיסמה בלבד", security: 30 },
            { name: "סיסמה + SMS", security: 70 },
            { name: "סיסמה + אפליקציה", security: 85 },
            { name: "ביומטריה + סיסמה", security: 95 }
          ]
        },
        {
          id: "encryption",
          name: "הצפנה",
          options: [
            { name: "HTTP בלבד", security: 10 },
            { name: "HTTPS בסיסי", security: 60 },
            { name: "HTTPS + TLS 1.3", security: 85 },
            { name: "הצפנה כפולה", security: 95 }
          ]
        },
        {
          id: "monitoring",
          name: "ניטור",
          options: [
            { name: "ללא ניטור", security: 20 },
            { name: "ניטור בסיסי", security: 50 },
            { name: "ניטור מתקדם", security: 80 },
            { name: "AI + ניטור", security: 95 }
          ]
        }
      ],
      scoring: {
        excellent: "90-100% - מערכת אבטחה מעולה!",
        good: "70-89% - מערכת אבטחה טובה",
        fair: "50-69% - מערכת אבטחה בסיסית",
        poor: "מתחת ל-50% - צריך לשפר"
      }
    },
    successMessage: "כל הכבוד! בנית מערכת אבטחה חזקה! 🛡️"
  }
}; 