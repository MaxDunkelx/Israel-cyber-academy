export const slide11PackageManager = {
  id: "slide-11",
  type: "presentation",
  title: "מנהל החבילות 📦",
  content: {
    background: "linear-gradient(135deg, #FF5722 0%, #E64A19 100%)",
    elements: [
      {
        type: "title",
        text: "איך מתקינים תוכנות?",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "מנהל החבילות הוא הכלי להתקנת תוכנות ב-Linux. זה כמו חנות אפליקציות!",
        style: { fontSize: "1.2rem", color: "white", textAlign: "center", marginBottom: "1rem" }
      },
      {
        type: "list",
        items: [
          "📦 apt - מנהל חבילות Ubuntu/Debian",
          "🔧 yum/dnf - מנהל חבילות Red Hat",
          "📋 pacman - מנהל חבילות Arch",
          "🔍 apt search - חיפוש חבילות",
          "⬇️ apt install - התקנת חבילה",
          "🔄 apt update - עדכון רשימת חבילות",
          "⬆️ apt upgrade - עדכון חבילות",
          "🗑️ apt remove - הסרת חבילה"
        ],
        style: { fontSize: "1.1rem", color: "white", textAlign: "right" }
      },
      {
        type: "image",
        src: "https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg",
        alt: "Package Manager",
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