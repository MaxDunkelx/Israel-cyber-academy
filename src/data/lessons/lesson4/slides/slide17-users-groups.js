export const slide17UsersGroups = {
  id: "slide-17",
  type: "presentation",
  title: "משתמשים וקבוצות 👥",
  content: {
    background: "linear-gradient(135deg, #3F51B5 0%, #303F9F 100%)",
    elements: [
      {
        type: "title",
        text: "איך מנהלים משתמשים?",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "ב-Linux כל משתמש יש לו הרשאות משלו. קבוצות עוזרות לארגן משתמשים",
        style: { fontSize: "1.2rem", color: "white", textAlign: "center", marginBottom: "1rem" }
      },
      {
        type: "list",
        items: [
          "👤 useradd - הוספת משתמש",
          "🔑 passwd - שינוי סיסמה",
          "👥 groupadd - יצירת קבוצה",
          "➕ usermod - שינוי משתמש",
          "👤 who - משתמשים מחוברים",
          "🔍 id - פרטי משתמש",
          "👥 groups - קבוצות משתמש",
          "🗑️ userdel - מחיקת משתמש"
        ],
        style: { fontSize: "1.1rem", color: "white", textAlign: "right" }
      },
      {
        type: "image",
        src: "https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
        alt: "Users and Groups",
        style: { width: "250px", borderRadius: "10px", margin: "1rem auto" }
      },
      {
        type: "timer",
        duration: 120,
        text: "זמן קריאה"
      }
    ]
  }
}; 