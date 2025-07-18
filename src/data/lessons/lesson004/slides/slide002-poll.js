import { createPollSlide } from '../../../components/slides/PollSlide.jsx';

export const slide2Poll = createPollSlide({
  id: "slide002-poll",
  title: "מה אתם יודעים על Linux?",
  subtitle: "בואו נבדוק את הידע שלכם לפני שנתחיל!",
  icon: "📊",
  poll: {
    question: "האם השתמשתם אי פעם ב-Linux?",
    options: [
      { text: "מעולם לא", value: "never" },
      { text: "פעם אחת", value: "once" },
      { text: "כמה פעמים", value: "few" },
      { text: "משתמש קבוע", value: "regular" }
    ],
    allowMultiple: false
  },
  content: {
    text: `
      <div class="space-y-4">
        <p class="text-lg">Linux היא מערכת הפעלה חזקה ופופולרית בעולם הטכנולוגיה!</p>
        
        <div class="bg-blue-50 p-4 rounded-lg">
          <h3 class="font-bold text-blue-800 mb-2">🧠 עובדות מעניינות:</h3>
          <ul class="space-y-1 text-blue-700">
            <li>• 96% מהשרתים בעולם משתמשים ב-Linux</li>
            <li>• Android מבוסס על Linux</li>
            <li>• Linux הוא חינמי וקוד פתוח</li>
            <li>• יש מאות גרסאות שונות של Linux</li>
          </ul>
        </div>
        
        <div class="bg-green-50 p-4 rounded-lg">
          <h3 class="font-bold text-green-800 mb-2">🎯 מה נלמד היום:</h3>
          <ul class="space-y-1 text-green-700">
            <li>• היסטוריה של Linux</li>
            <li>• גרסאות שונות (Distributions)</li>
            <li>• עבודה עם טרמינל</li>
            <li>• פקודות בסיסיות</li>
            <li>• ניהול קבצים ותיקיות</li>
            <li>• אבטחה וניהול משתמשים</li>
          </ul>
        </div>
      </div>
    `
  },
  nextSlide: "slide003-linux-history"
}); 