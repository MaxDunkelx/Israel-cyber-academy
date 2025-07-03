export const slide16PasswordGenerator = {
  id: "slide-16",
  type: "interactive",
  title: "יוצר סיסמאות חזקות 🔐",
  content: {
    type: "password-generator",
    instructions: "לחץ על הכפתור ליצירת סיסמה חזקה",
    options: {
      length: 12,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true
    },
    examples: [
      "MySecurePass123!",
      "Cyber@cademy2024",
      "Strong#Password$",
      "IsraelCyber!2024"
    ],
    tips: [
      "השתמש באותיות גדולות וקטנות",
      "הוסף מספרים וסימנים",
      "אל תשתמש במילים מהמילון",
      "שנה סיסמאות באופן קבוע"
    ],
    duration: 180
  }
}; 