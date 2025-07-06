export const slide6FirstMachines = {
  id: "slide-6",
  type: "presentation",
  title: "מכונת החישוב הראשונה",
  content: {
    background: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
    elements: [
      {
        type: "title",
        text: "איך נראו מכונות חישוב לפני עידן המחשב?",
        style: { fontSize: "2.5rem", color: "white", textAlign: "center", marginBottom: "1rem" }
      },
      {
        type: "subtitle",
        text: "ב-1642 נבנתה מכונה עם גלגלי שיניים לחיבור וחיסור. היא נחשבת לאב הקדמון של המחשבים של היום.",
        style: { fontSize: "1.2rem", color: "white", textAlign: "center" }
      },
      {
        type: "image",
          src: "https://davidson.org.il/wp-content/DrupalImages_RE/drupal_image_67daf35270bdc7.74389882.png",
          alt: "first machine",
          style: { width: "300px", borderRadius: "15px", margin: "2rem auto" }
        },
      {
        type: "timer",
        duration: 30,
        text: "זמן קריאה"
      }
    ]
    
  }
}; 