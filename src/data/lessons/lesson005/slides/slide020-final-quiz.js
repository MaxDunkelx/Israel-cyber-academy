import { createInteractiveSlide } from '../../../components/slides/InteractiveSlide.jsx';

export const slide20FinalQuiz = createInteractiveSlide({
  id: "slide020-final-quiz",
  title: "קוויז סופי - רשתות",
  subtitle: "בואו נבדוק מה למדנו!",
  icon: "🎯",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg text-center">
          <h3 class="text-2xl font-bold text-purple-800 mb-4">🎯 קוויז סופי - רשתות והאינטרנט</h3>
          <p class="text-lg text-gray-700">
            עכשיו נבדוק מה זכרתם מהשיעור! הקוויז כולל שאלות על כל הנושאים שלמדנו.
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">📋 הוראות הקוויז:</h3>
            
            <div class="space-y-3">
              <div class="flex items-start space-x-3">
                <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">1</div>
                <div>
                  <h4 class="font-semibold text-blue-800">קראו כל שאלה בעיון</h4>
                  <p class="text-sm text-gray-600">וודאו שהבנתם מה נשאל</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">2</div>
                <div>
                  <h4 class="font-semibold text-blue-800">בחרו את התשובה הטובה ביותר</h4>
                  <p class="text-sm text-gray-600">לפעמים יש יותר מתשובה נכונה אחת</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">3</div>
                <div>
                  <h4 class="font-semibold text-blue-800">אל תמהרו לענות</h4>
                  <p class="text-sm text-gray-600">קחו זמן לחשוב</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">4</div>
                <div>
                  <h4 class="font-semibold text-blue-800">בדקו את התשובות</h4>
                  <p class="text-sm text-gray-600">לפני שסוגרים את הקוויז</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🎯 סוגי שאלות:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <h4 class="font-semibold text-green-800 mb-1">❓ שאלות רב-ברירה</h4>
                <p class="text-sm text-gray-600">בחרו את התשובה הנכונה מבין 4 אפשרויות</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <h4 class="font-semibold text-green-800 mb-1">🔗 התאמה</h4>
                <p class="text-sm text-gray-600">חברו מושגים למושגים מתאימים</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <h4 class="font-semibold text-green-800 mb-1">✅ נכון/לא נכון</h4>
                <p class="text-sm text-gray-600">החליטו אם המשפט נכון או לא</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <h4 class="font-semibold text-green-800 mb-1">🎯 סדר נכון</h4>
                <p class="text-sm text-gray-600">סדרו פריטים בסדר הנכון</p>
              </div>
            </div>
            
            <div class="bg-yellow-50 p-3 rounded-lg">
              <h4 class="font-bold text-yellow-800 mb-1">💡 טיפ:</h4>
              <p class="text-sm text-yellow-700">
                אל תדאגו אם לא יודעים הכל - זה חלק מהלמידה! הקוויז עוזר לכם לזכור.
              </p>
            </div>
          </div>
        </div>
        
        <div class="bg-blue-50 p-4 rounded-lg text-center">
          <h3 class="font-bold text-blue-800 mb-2">🚀 מוכנים להתחיל?</h3>
          <p class="text-lg text-blue-700">
            הקוויז מתחיל עכשיו! זכרו - זה רק לבדיקה ולמידה. בהצלחה! 🎯
          </p>
        </div>
      </div>
    `
  },
  interactive: {
    type: "quiz",
    title: "קוויז סופי - רשתות והאינטרנט",
    description: "ענו על השאלות ובדקו מה למדתם!",
    questions: [
      {
        question: "מה זה רשת מחשבים?",
        options: [
          "חיבור בין מחשבים לתקשורת",
          "תוכנה למשחקים",
          "סוג של מדפסת",
          "מערכת הפעלה"
        ],
        correctAnswer: 0,
        explanation: "רשת מחשבים היא חיבור בין מחשבים שמאפשר להם לתקשר ולשתף מידע"
      },
      {
        question: "איזה פרוטוקול משתמשים לגלישה באתרי אינטרנט?",
        options: [
          "SMTP",
          "HTTP/HTTPS",
          "FTP",
          "SSH"
        ],
        correctAnswer: 1,
        explanation: "HTTP/HTTPS משמש לגלישה באתרי אינטרנט"
      },
      {
        question: "מה זה כתובת IP?",
        options: [
          "שם של אתר אינטרנט",
          "כתובת ייחודית למחשב ברשת",
          "סוג של תוכנה",
          "כתובת פיזית"
        ],
        correctAnswer: 1,
        explanation: "כתובת IP היא כתובת ייחודית שכל מחשב מקבל ברשת"
      },
      {
        question: "איזה דור של סלולר הוא הכי חדש?",
        options: [
          "3G",
          "4G",
          "5G",
          "6G"
        ],
        correctAnswer: 2,
        explanation: "5G הוא הדור החמישי והכי חדש של טכנולוגיית הסלולר"
      },
      {
        question: "מה זה IoT?",
        options: [
          "סוג של מחשב",
          "אינטרנט של הדברים",
          "תוכנה לאבטחה",
          "סוג של רשת"
        ],
        correctAnswer: 1,
        explanation: "IoT = Internet of Things = אינטרנט של הדברים"
      },
      {
        question: "איזה סוג רשת נמצא בבית?",
        options: [
          "WAN",
          "MAN",
          "LAN",
          "Internet"
        ],
        correctAnswer: 2,
        explanation: "LAN (Local Area Network) היא רשת מקומית כמו בבית"
      },
      {
        question: "מה זה שרת?",
        options: [
          "סוג של מחשב חזק שמשרת אחרים",
          "תוכנה למשחקים",
          "סוג של כבל",
          "מערכת הפעלה"
        ],
        correctAnswer: 0,
        explanation: "שרת הוא מחשב חזק שמספק שירותים למחשבים אחרים"
      },
      {
        question: "איזה פרוטוקול בטוח יותר?",
        options: [
          "HTTP",
          "HTTPS",
          "FTP",
          "SMTP"
        ],
        correctAnswer: 1,
        explanation: "HTTPS הוא הגרסה המוצפנת של HTTP ולכן בטוח יותר"
      },
      {
        question: "מה זה WiFi?",
        options: [
          "סוג של כבל",
          "חיבור אלחוטי לאינטרנט",
          "תוכנה לאבטחה",
          "סוג של מחשב"
        ],
        correctAnswer: 1,
        explanation: "WiFi הוא חיבור אלחוטי לאינטרנט באמצעות גלי רדיו"
      },
      {
        question: "מה זה ענן (Cloud)?",
        options: [
          "שירותים ברשת האינטרנט",
          "סוג של מחשב",
          "תוכנה לאבטחה",
          "סוג של כבל"
        ],
        correctAnswer: 0,
        explanation: "ענן הוא שירותים ותוכנות שפועלים ברשת האינטרנט"
      }
    ]
  },
  nextSlide: "slide021-reflection"
}); 