export const slide8FileCommands = {
  id: "slide-8",
  type: "presentation",
  title: "פקודות קבצים מתקדמות 📝",
  content: {
    background: "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
    elements: [
      {
        type: "title",
        text: "פקודות חזקות לקבצים",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "למדו פקודות מתקדמות לניהול קבצים ב-Linux",
        style: { fontSize: "1.2rem", color: "white", textAlign: "center", marginBottom: "1rem" }
      },
      {
        type: "list",
        items: [
          "📋 cp file1 file2 - העתק קובץ",
          "🔄 mv file1 file2 - העבר/שנה שם",
          "📁 mkdir folder - צור תיקייה",
          "🗑️ rm -rf folder - מחק תיקייה",
          "🔍 find . -name '*.txt' - חפש קבצים",
          "📊 du -sh folder - גודל תיקייה",
          "🔗 ln -s file link - צור קיצור דרך",
          "📖 head/tail file - ראש/סוף קובץ"
        ],
        style: { fontSize: "1.1rem", color: "white", textAlign: "right" }
      },
      {
        type: "image",
        src: "https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
        alt: "File Commands",
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