export const slide14Relationships = {
  id: "slide-14",
  type: "interactive",
  title: "קשרים במסדי נתונים 🔗",
  content: {
    type: "drag-drop",
    instructions: "גררו את הדוגמאות לקטגוריית הקשר המתאימה",
    categories: [
      {
        id: "one-to-one",
        name: "אחד לאחד",
        color: "#667eea"
      },
      {
        id: "one-to-many", 
        name: "אחד לרבים",
        color: "#764ba2"
      },
      {
        id: "many-to-many",
        name: "רבים לרבים", 
        color: "#f093fb"
      }
    ],
    items: [
      {
        id: "user-profile",
        text: "משתמש לפרופיל אישי",
        description: "כל משתמש יכול להיות בעל פרופיל אישי אחד בלבד",
        category: "one-to-one"
      },
      {
        id: "passport-citizen",
        text: "דרכון לאזרח",
        description: "כל אזרח יכול להיות בעל דרכון אחד בלבד",
        category: "one-to-one"
      },
      {
        id: "class-students",
        text: "כיתה לתלמידים",
        description: "כיתה אחת יכולה להכיל הרבה תלמידים",
        category: "one-to-many"
      },
      {
        id: "author-books",
        text: "סופר לספרים",
        description: "סופר אחד יכול לכתוב הרבה ספרים",
        category: "one-to-many"
      },
      {
        id: "students-courses",
        text: "תלמידים לקורסים",
        description: "תלמידים רבים יכולים להירשם לקורסים רבים",
        category: "many-to-many"
      },
      {
        id: "products-categories",
        text: "מוצרים לקטגוריות",
        description: "מוצרים רבים יכולים להיות בקטגוריות רבות",
        category: "many-to-many"
      }
    ],
    targets: [
      {
        id: "target1",
        title: "משתמש לפרופיל",
        correctItem: "user-profile"
      },
      {
        id: "target2",
        title: "כיתה לתלמידים",
        correctItem: "class-students"
      },
      {
        id: "target3",
        title: "תלמידים לקורסים",
        correctItem: "students-courses"
      }
    ]
  }
}; 