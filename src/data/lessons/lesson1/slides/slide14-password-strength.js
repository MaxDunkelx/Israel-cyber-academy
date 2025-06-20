export const slide14PasswordStrength = {
  id: "slide-14",
  type: "interactive",
  title: "בניית סיסמה חזקה 🔐",
  content: {
    type: "drag-drop",
    instructions: "בנה סיסמה חזקה על ידי בחירת האלמנטים הנכונים",
    categories: [
      { id: "strong", name: "סיסמה חזקה", color: "#4CAF50", description: "מכילה את כל האלמנטים הנדרשים" },
      { id: "weak", name: "סיסמה חלשה", color: "#f44336", description: "חסרים אלמנטים חשובים" }
    ],
    items: [
      {
        id: 1,
        text: "123456",
        correctCategory: "weak"
      },
      {
        id: 2,
        text: "password",
        correctCategory: "weak"
      },
      {
        id: 3,
        text: "MyP@ssw0rd2024!",
        correctCategory: "strong"
      },
      {
        id: 4,
        text: "abc123",
        correctCategory: "weak"
      },
      {
        id: 5,
        text: "Tr0ub4dor&3",
        correctCategory: "strong"
      },
      {
        id: 6,
        text: "qwerty",
        correctCategory: "weak"
      }
    ],
    duration: 300
  }
}; 