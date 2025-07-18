export const slide16PasswordGenerator = {
  id: "slide-16",
  type: "interactive",
  title: "יוצר סיסמאות חזקות 🔐",
  content: {
    type: "password-generator",
    instructions: "צרו סיסמה חזקה ומאובטחת! השתמשו בכל הכלים הזמינים כדי ליצור סיסמה שקשה לפרוץ",
    options: {
      length: { min: 8, max: 32, default: 16 },
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
      excludeSimilar: true,
      excludeAmbiguous: false
    },
    requirements: [
      "לפחות 12 תווים",
      "אותיות גדולות וקטנות",
      "מספרים",
      "סימנים מיוחדים",
      "לא מילים מהמילון"
    ],
    tips: [
      "השתמשו בסיסמה שונה לכל חשבון",
      "שמרו סיסמאות במקום בטוח",
      "החליפו סיסמאות באופן קבוע",
      "אל תשתפו סיסמאות עם אף אחד"
    ],
    duration: 240,
    learningObjectives: [
      "להבין מה הופך סיסמה לחזקה",
      "ליצור סיסמאות מאובטחות",
      "לשמור על סיסמאות בצורה בטוחה"
    ]
  }
}; 