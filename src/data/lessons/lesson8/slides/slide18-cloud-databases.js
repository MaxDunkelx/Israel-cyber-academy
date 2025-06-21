export const slide18CloudDatabases = {
  id: "slide-18",
  type: "presentation",
  title: "מסדי נתונים בענן ☁️",
  content: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    elements: [
      {
        type: "title",
        text: "מסדי נתונים בענן",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "מסדי נתונים המאוחסנים באינטרנט במקום במחשב מקומי",
        style: { fontSize: "1.4rem", color: "white", textAlign: "center", marginBottom: "2rem" }
      },
      {
        type: "list",
        items: [
          "☁️ Amazon RDS",
          "☁️ Google Cloud SQL",
          "☁️ Microsoft Azure SQL",
          "☁️ MongoDB Atlas",
          "☁️ Firebase Firestore"
        ],
        style: { fontSize: "1.3rem", color: "white", textAlign: "right", marginBottom: "2rem" }
      },
      {
        type: "text",
        text: "יתרונות: נגישות, גיבוי אוטומטי, אבטחה",
        style: { fontSize: "1.2rem", color: "white", textAlign: "center", opacity: 0.9 }
      },
      {
        type: "timer",
        duration: 45,
        text: "זמן קריאה"
      }
    ]
  }
}; 