export const slide5HackerGame = {
  id: "slide-5",
  type: "interactive",
  title: "סוגי האקרים - משחק התאמה 🎯",
  content: {
    type: "drag-drop",
    instructions: "לחצו על האקר ואז על הקטגוריה המתאימה לו. למדו להבדיל בין האקרים טובים ורעים!",
    categories: [
      { id: "white", name: "כובע לבן 🛡️", color: "#4CAF50", description: "מגן על מערכות ועוזר לאבטח אותן" },
      { id: "gray", name: "כובע אפור 🤔", color: "#9E9E9E", description: "בדרך כלל טוב אך ייתכן שינצל הזדמנויות" },
      { id: "black", name: "כובע שחור ⚫", color: "#f44336", description: "משתמש בידע לפגיעה והונאה" }
    ],
    items: [
      {
        id: 1,
        text: "אדם שמוצא באגים באתרים ומדווח עליהם לחברה",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        correctCategory: "white"
      },
      {
        id: 2,
        text: "אדם שפורץ לבנק לגניבת כסף",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=150",
        correctCategory: "black"
      },
      {
        id: 3,
        text: "אדם שמוצא חולשה אבל לא בטוח אם לדווח",
        image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=150",
        correctCategory: "gray"
      },
      {
        id: 4,
        text: "אדם שעובד בחברת אבטחה ומגן על מערכות",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150",
        correctCategory: "white"
      },
      {
        id: 5,
        text: "אדם שפורץ לחשבונות של אחרים לגניבת מידע",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        correctCategory: "black"
      },
      {
        id: 6,
        text: "אדם שמוצא באג אבל מבקש כסף תמורת המידע",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        correctCategory: "gray"
      }
    ],
    duration: 300,
    hints: [
      "כובע לבן = טוב, עוזר לאבטח",
      "כובע שחור = רע, פוגע באחרים", 
      "כובע אפור = לא בטוח, יכול להיות טוב או רע"
    ]
  }
}; 