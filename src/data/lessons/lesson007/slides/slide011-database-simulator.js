export const slide11DatabaseSimulator = {
  id: "slide-11",
  type: "interactive",
  title: "סימולטור מסד נתונים - בניית מסד נתונים וירטואלי 🗄️",
  content: {
    type: "database-simulator",
    instructions: "בנו מסד נתונים וירטואלי! צרו טבלאות, הוסיפו נתונים וכתבו שאילתות SQL",
    tables: [
      {
        name: "students",
        description: "טבלת תלמידים",
        columns: [
          { name: "id", type: "INTEGER", primary_key: true, auto_increment: true },
          { name: "name", type: "VARCHAR(100)", nullable: false },
          { name: "age", type: "INTEGER", nullable: true },
          { name: "grade", type: "VARCHAR(10)", nullable: true },
          { name: "email", type: "VARCHAR(150)", nullable: true }
        ],
        sample_data: [
          { id: 1, name: "דוד כהן", age: 15, grade: "י'", email: "david@school.com" },
          { id: 2, name: "שרה לוי", age: 16, grade: "י\"א", email: "sarah@school.com" },
          { id: 3, name: "משה ישראלי", age: 15, grade: "י'", email: "moshe@school.com" }
        ]
      },
      {
        name: "courses",
        description: "טבלת קורסים",
        columns: [
          { name: "id", type: "INTEGER", primary_key: true, auto_increment: true },
          { name: "name", type: "VARCHAR(100)", nullable: false },
          { name: "teacher", type: "VARCHAR(100)", nullable: true },
          { name: "credits", type: "INTEGER", nullable: true }
        ],
        sample_data: [
          { id: 1, name: "מתמטיקה", teacher: "ד\"ר גולדברג", credits: 5 },
          { id: 2, name: "פיזיקה", teacher: "פרופ' כהן", credits: 4 },
          { id: 3, name: "תכנות", teacher: "מר לוי", credits: 3 }
        ]
      },
      {
        name: "enrollments",
        description: "טבלת הרשמות לקורסים",
        columns: [
          { name: "id", type: "INTEGER", primary_key: true, auto_increment: true },
          { name: "student_id", type: "INTEGER", foreign_key: "students.id" },
          { name: "course_id", type: "INTEGER", foreign_key: "courses.id" },
          { name: "grade", type: "DECIMAL(3,1)", nullable: true },
          { name: "enrollment_date", type: "DATE", nullable: false }
        ],
        sample_data: [
          { id: 1, student_id: 1, course_id: 1, grade: 85.5, enrollment_date: "2024-01-15" },
          { id: 2, student_id: 1, course_id: 3, grade: 92.0, enrollment_date: "2024-01-20" },
          { id: 3, student_id: 2, course_id: 1, grade: 88.0, enrollment_date: "2024-01-15" },
          { id: 4, student_id: 2, course_id: 2, grade: 90.5, enrollment_date: "2024-01-18" }
        ]
      }
    ],
    queries: [
      {
        name: "בחר את כל התלמידים",
        sql: "SELECT * FROM students;",
        description: "מציג את כל התלמידים במסד הנתונים"
      },
      {
        name: "מצא תלמידים מעל גיל 15",
        sql: "SELECT name, age FROM students WHERE age > 15;",
        description: "מציג רק תלמידים מעל גיל 15"
      },
      {
        name: "ספור תלמידים בכל כיתה",
        sql: "SELECT grade, COUNT(*) as count FROM students GROUP BY grade;",
        description: "סופר כמה תלמידים יש בכל כיתה"
      },
      {
        name: "מצא ציונים ממוצעים",
        sql: "SELECT s.name, AVG(e.grade) as average_grade FROM students s JOIN enrollments e ON s.id = e.student_id GROUP BY s.id, s.name;",
        description: "מחשב ציון ממוצע לכל תלמיד"
      }
    ],
    challenges: [
      {
        name: "מתחיל",
        description: "למדו פקודות SQL בסיסיות",
        tasks: [
          "בחרו את כל התלמידים",
          "מצאו תלמידים מעל גיל מסוים",
          "הוסיפו תלמיד חדש",
          "עדכנו פרטי תלמיד"
        ]
      },
      {
        name: "מתקדם",
        description: "שאילתות מורכבות",
        tasks: [
          "חברו טבלאות עם JOIN",
          "השתמשו ב-GROUP BY",
          "הוסיפו תנאים מורכבים",
          "יצרו אינדקסים"
        ]
      },
      {
        name: "מומחה",
        description: "ניהול מסד נתונים",
        tasks: [
          "יצרו טבלה חדשה",
          "הוסיפו foreign keys",
          "יצרו stored procedures",
          "ניהלו הרשאות"
        ]
      }
    ],
    tips: [
      "השתמשו ב-SELECT כדי לבחור נתונים",
      "השתמשו ב-WHERE כדי לסנן תוצאות",
      "השתמשו ב-JOIN כדי לחבר טבלאות",
      "השתמשו ב-GROUP BY כדי לקבץ נתונים",
      "השתמשו ב-ORDER BY כדי למיין תוצאות"
    ],
    duration: 900,
    learningObjectives: [
      "להבין את מבנה מסדי הנתונים",
      "לכתוב שאילתות SQL בסיסיות",
      "לחבר טבלאות עם JOIN",
      "לנהל נתונים במסד נתונים"
    ]
  }
}; 