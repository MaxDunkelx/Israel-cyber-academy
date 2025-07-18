import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide26Resources = createContentSlide({
  id: "slide026-resources",
  title: "מקורות ללמידה",
  subtitle: "איפה להמשיך ללמוד?",
  icon: "📚",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-purple-800 mb-4">📚 מקורות ללמידה - איפה להמשיך ללמוד?</h3>
          <p class="text-lg text-gray-700 mb-4">
            הנה רשימה של מקורות מעולים להמשיך ולפתח את הידע שלכם
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">🎓 פלטפורמות לימוד:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">🎓</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">Coursera</h4>
                    <p class="text-sm text-gray-600">קורסים מאוניברסיטאות</p>
                    <p class="text-xs text-gray-500">חינמי בתשלום</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🎓</span>
                  <div>
                    <h4 class="font-semibold text-green-800">edX</h4>
                    <p class="text-sm text-gray-600">קורסים אקדמיים</p>
                    <p class="text-xs text-gray-500">MIT, Harvard</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">🎓</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">Udemy</h4>
                    <p class="text-sm text-gray-600">קורסים מעשיים</p>
                    <p class="text-xs text-gray-500">מחירים נמוכים</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">🎓</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">Khan Academy</h4>
                    <p class="text-sm text-gray-600">לימוד חינמי</p>
                    <p class="text-xs text-gray-500">מתמטיקה, מדעים</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">📺 YouTube Channels:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📺</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Computerphile</h4>
                    <p class="text-sm text-gray-600">מדעי המחשב</p>
                    <p class="text-xs text-gray-500">אוניברסיטת נוטינגהאם</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📺</span>
                  <div>
                    <h4 class="font-semibold text-green-800">NetworkChuck</h4>
                    <p class="text-sm text-gray-600">רשתות ואבטחה</p>
                    <p class="text-xs text-gray-500">טכנולוגיה מעשית</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📺</span>
                  <div>
                    <h4 class="font-semibold text-green-800">The Coding Train</h4>
                    <p class="text-sm text-gray-600">תכנות יצירתי</p>
                    <p class="text-xs text-gray-500">Processing, p5.js</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📺</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Crash Course</h4>
                    <p class="text-sm text-gray-600">מדעי המחשב</p>
                    <p class="text-xs text-gray-500">סדרה מקיפה</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-bold text-gray-800 mb-2">📖 ספרים מומלצים:</h3>
          <div class="grid md:grid-cols-3 gap-4 text-sm">
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-blue-800 mb-1">🔗 רשתות:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• "Computer Networks" - Tanenbaum</li>
                <li>• "TCP/IP Illustrated" - Stevens</li>
                <li>• "Network Security" - Kaufman</li>
                <li>• "The Internet" - Abbate</li>
                <li>• "Where Wizards Stay Up Late"</li>
              </ul>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-green-800 mb-1">💻 תכנות:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• "Python Crash Course"</li>
                <li>• "JavaScript: The Good Parts"</li>
                <li>• "Clean Code" - Martin</li>
                <li>• "The Pragmatic Programmer"</li>
                <li>• "Code Complete" - McConnell</li>
              </ul>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-purple-800 mb-1">🔒 אבטחה:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• "The Art of Deception"</li>
                <li>• "Hacking: The Art of Exploitation"</li>
                <li>• "Applied Cryptography"</li>
                <li>• "The Web Application Hacker's Handbook"</li>
                <li>• "Network Security Essentials"</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">🌐 אתרים וכלים:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">💻 פיתוח:</h4>
              <ul class="space-y-1">
                <li>• GitHub - קוד פתוח</li>
                <li>• Stack Overflow - שאלות ותשובות</li>
                <li>• MDN Web Docs - תיעוד</li>
                <li>• W3Schools - מדריכים</li>
                <li>• CodePen - דוגמאות קוד</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">🔧 כלים:</h4>
              <ul class="space-y-1">
                <li>• Visual Studio Code - עורך קוד</li>
                <li>• Postman - בדיקת APIs</li>
                <li>• Docker - מכולות</li>
                <li>• Git - ניהול גרסאות</li>
                <li>• Notion - ארגון מידע</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-blue-50 p-4 rounded-lg text-center">
          <h3 class="font-bold text-blue-800 mb-2">🎯 קהילות למידה:</h3>
          <div class="grid md:grid-cols-4 gap-4 text-sm">
            <div class="bg-white p-3 rounded-lg text-center">
              <h4 class="font-semibold text-blue-800 mb-1">💬 Discord</h4>
              <p class="text-xs text-gray-600">שרתי למידה</p>
            </div>
            <div class="bg-white p-3 rounded-lg text-center">
              <h4 class="font-semibold text-green-800 mb-1">📱 Telegram</h4>
              <p class="text-xs text-gray-600">קבוצות למידה</p>
            </div>
            <div class="bg-white p-3 rounded-lg text-center">
              <h4 class="font-semibold text-purple-800 mb-1">🌐 Reddit</h4>
              <p class="text-xs text-gray-600">r/learnprogramming</p>
            </div>
            <div class="bg-white p-3 rounded-lg text-center">
              <h4 class="font-semibold text-orange-800 mb-1">👥 Meetup</h4>
              <p class="text-xs text-gray-600">מפגשים מקומיים</p>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-lg text-blue-700 font-semibold">הלמידה לעולם לא נגמרת! 📚</p>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide027-final-thoughts"
}); 