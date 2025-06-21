export const slide11DatabaseSimulator = {
  id: "slide-11",
  type: "interactive",
  title: "סימולטור מסדי נתונים 🖥️",
  content: {
    type: "database-simulator",
    instructions: "תרגלו עבודה עם מסד נתונים אמיתי! צרו טבלאות, הכניסו נתונים והריצו שאילתות",
    tables: [
      {
        name: "students",
        columns: ["id", "name", "email", "grade", "major"],
        sampleData: [
          { id: 1, name: "יוסי כהן", email: "yossi@example.com", grade: 85, major: "מדעי המחשב" },
          { id: 2, name: "שרה לוי", email: "sara@example.com", grade: 92, major: "הנדסה" },
          { id: 3, name: "דוד ישראלי", email: "david@example.com", grade: 78, major: "מתמטיקה" }
        ]
      },
      {
        name: "courses",
        columns: ["id", "title", "instructor", "credits", "department"],
        sampleData: [
          { id: 1, title: "יסודות מסדי נתונים", instructor: "ד\"ר כהן", credits: 3, department: "מדעי המחשב" },
          { id: 2, title: "תכנות מתקדם", instructor: "ד\"ר לוי", credits: 4, department: "הנדסה" },
          { id: 3, title: "אלגוריתמים", instructor: "ד\"ר ישראלי", credits: 3, department: "מתמטיקה" }
        ]
      }
    ],
    exercises: [
      {
        id: 1,
        title: "יצירת טבלה",
        description: "צרו טבלת 'enrollments' עם עמודות: student_id, course_id, semester",
        hint: "השתמשו ב-CREATE TABLE"
      },
      {
        id: 2,
        title: "הכנסת נתונים",
        description: "הכניסו 3 רשומות לטבלת enrollments",
        hint: "השתמשו ב-INSERT INTO"
      },
      {
        id: 3,
        title: "שאילתה מורכבת",
        description: "קבלו את שמות הסטודנטים והקורסים שלהם",
        hint: "השתמשו ב-JOIN"
      }
    ],
    duration: 600
  }
}; 