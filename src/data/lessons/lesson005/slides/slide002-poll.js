import { createPollSlide } from '../../../components/slides/PollSlide.jsx';

export const slide2Poll = createPollSlide({
  id: "slide002-poll",
  title: "מה אתם יודעים על האינטרנט?",
  subtitle: "בואו נבדוק את הידע שלכם לפני שנתחיל!",
  icon: "📊",
  poll: {
    question: "כמה זמן אתם מבלים באינטרנט ביום?",
    options: [
      { text: "פחות משעה", value: "less_than_1" },
      { text: "1-3 שעות", value: "1_to_3" },
      { text: "3-6 שעות", value: "3_to_6" },
      { text: "יותר מ-6 שעות", value: "more_than_6" }
    ],
    allowMultiple: false
  },
  content: {
    text: `
      <div class="space-y-4">
        <p class="text-lg">האינטרנט הוא אחד ההמצאות החשובות ביותר בהיסטוריה!</p>
        
        <div class="bg-blue-50 p-4 rounded-lg">
          <h3 class="font-bold text-blue-800 mb-2">🧠 עובדות מעניינות:</h3>
          <ul class="space-y-1 text-blue-700">
            <li>• 4.9 מיליארד אנשים משתמשים באינטרנט</li>
            <li>• 60% מאוכלוסיית העולם מחוברת</li>
            <li>• כל שנייה נוצרים 2.5 מיליון GB של מידע</li>
            <li>• האינטרנט הומצא בשנות ה-60</li>
          </ul>
        </div>
        
        <div class="bg-green-50 p-4 rounded-lg">
          <h3 class="font-bold text-green-800 mb-2">🎯 מה נלמד היום:</h3>
          <ul class="space-y-1 text-green-700">
            <li>• מה זה רשת ואינטרנט</li>
            <li>• סוגי רשתות שונות</li>
            <li>• היסטוריית האינטרנט</li>
            <li>• איך האינטרנט עובד</li>
            <li>• פרוטוקולים וכתובות IP</li>
            <li>• אבטחת רשת</li>
            <li>• ענן ואינטרנט של הדברים</li>
          </ul>
        </div>
      </div>
    `
  },
  nextSlide: "slide003-what-is-network"
}); 