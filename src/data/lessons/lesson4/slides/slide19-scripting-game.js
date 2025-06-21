export const slide19ScriptingGame = {
  id: "slide-19",
  type: "interactive",
  title: "משחק סקריפטים 🎮",
  content: {
    type: "matching",
    instructions: "התאם כל חלק של סקריפט למטרה שלו",
    pairs: [
      {
        left: "#!/bin/bash",
        right: "תחילת סקריפט",
        explanation: "שורה ראשונה שמגדירה שזה סקריפט bash"
      },
      {
        left: "echo 'Hello'",
        right: "הדפסת טקסט",
        explanation: "פקודה להדפסת טקסט למסך"
      },
      {
        left: "name='John'",
        right: "הגדרת משתנה",
        explanation: "יצירת משתנה עם ערך"
      },
      {
        left: "if [ $x -eq 5 ]",
        right: "בדיקת תנאי",
        explanation: "בדיקה אם x שווה ל-5"
      },
      {
        left: "for i in 1 2 3",
        right: "לולאה",
        explanation: "לולאה שעוברת על מספרים"
      },
      {
        left: "chmod +x script.sh",
        right: "הרשאה להרצה",
        explanation: "נותן הרשאה להריץ את הסקריפט"
      }
    ],
    duration: 300
  }
}; 