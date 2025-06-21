export const slide17UserAccounts = {
  id: "slide-17",
  type: "presentation",
  title: "חשבונות משתמשים 👤",
  content: {
    background: "linear-gradient(135deg, #f1f8e9 0%, #dcedc8 100%)",
    elements: [
      {
        type: "title",
        text: "איך מארגנים משתמשים?",
        style: { fontSize: "2.5rem", color: "#689f38", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "כל משתמש במחשב יכול לקבל חשבון משלו עם הגדרות אישיות.",
        style: { fontSize: "1.2rem", color: "#689f38", textAlign: "center", marginBottom: "1rem" }
      },
      {
        type: "list",
        items: [
          "👑 מנהל - הרשאות מלאות",
          "👤 משתמש רגיל - הרשאות מוגבלות",
          "👶 משתמש ילד - הגבלות אבטחה",
          "🔐 סיסמה - הגנה על החשבון",
          "🖼️ תמונת פרופיל - זיהוי אישי",
          "📁 תיקיות אישיות - קבצים פרטיים"
        ],
        style: { fontSize: "1.1rem", color: "#689f38", textAlign: "right" }
      },
      {
        type: "image",
        src: "https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
        alt: "User Accounts",
        style: { width: "250px", borderRadius: "10px", margin: "1rem auto" }
      },
      {
        type: "timer",
        duration: 90,
        text: "זמן קריאה"
      }
    ]
  }
}; 