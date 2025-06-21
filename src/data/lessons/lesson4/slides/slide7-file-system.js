export const slide7FileSystem = {
  id: "slide-7",
  type: "presentation",
  title: "מבנה מערכת הקבצים 📁",
  content: {
    background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
    elements: [
      {
        type: "title",
        text: "איך מאורגנים הקבצים?",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "ב-Linux הכל הוא קובץ! מערכת הקבצים מאורגנת בצורה היררכית",
        style: { fontSize: "1.2rem", color: "white", textAlign: "center", marginBottom: "1rem" }
      },
      {
        type: "list",
        items: [
          "📂 / - שורש המערכת",
          "👤 /home - תיקיות משתמשים",
          "⚙️ /etc - הגדרות מערכת",
          "📦 /bin - תוכניות בסיסיות",
          "🔧 /usr - תוכניות משתמש",
          "💾 /var - נתונים משתנים",
          "📱 /dev - התקנים",
          "💿 /mnt - נקודות עגינה"
        ],
        style: { fontSize: "1.1rem", color: "white", textAlign: "right" }
      },
      {
        type: "image",
        src: "https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
        alt: "File System Structure",
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