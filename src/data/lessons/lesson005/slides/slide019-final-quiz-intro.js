import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide19FinalQuizIntro = createContentSlide({
  id: "slide019-final-quiz-intro",
  title: "הכנה לקוויז הסופי",
  subtitle: "בואו נבדוק מה למדנו!",
  icon: "📝",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg text-center">
          <h3 class="text-2xl font-bold text-purple-800 mb-4">📝 הכנה לקוויז הסופי!</h3>
          <p class="text-lg text-gray-700 mb-4">
            כל הכבוד! סיימנו ללמוד על רשתות והאינטרנט. עכשיו בואו נבדוק מה זכרתם!
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">✅ מה למדנו היום:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">🔗</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">רשתות מחשבים</h4>
                    <p class="text-sm text-gray-600">LAN, WAN, MAN, Internet</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">📚</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">היסטוריית האינטרנט</h4>
                    <p class="text-sm text-gray-600">ARPANET, WWW, התפתחות</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">🔄</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">איך האינטרנט עובד</h4>
                    <p class="text-sm text-gray-600">חבילות, ראוטרים, שרתים</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">📋</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">פרוטוקולים</h4>
                    <p class="text-sm text-gray-600">HTTP, HTTPS, SMTP, FTP</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">📍</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">כתובות IP</h4>
                    <p class="text-sm text-gray-600">IPv4, IPv6, כתובות ייחודיות</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🌐 נושאים נוספים:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🌐</span>
                  <div>
                    <h4 class="font-semibold text-green-800">דפדפנים</h4>
                    <p class="text-sm text-gray-600">Chrome, Firefox, Edge</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🖥️</span>
                  <div>
                    <h4 class="font-semibold text-green-800">שרתים</h4>
                    <p class="text-sm text-gray-600">Web, Mail, File servers</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🔒</span>
                  <div>
                    <h4 class="font-semibold text-green-800">אבטחת רשת</h4>
                    <p class="text-sm text-gray-600">וירוסים, דיוג, הגנה</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📶</span>
                  <div>
                    <h4 class="font-semibold text-green-800">WiFi</h4>
                    <p class="text-sm text-gray-600">2.4GHz, 5GHz, אבטחה</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">☁️</span>
                  <div>
                    <h4 class="font-semibold text-green-800">ענן ו-IoT</h4>
                    <p class="text-sm text-gray-600">שירותים, מכשירים חכמים</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">💡 טיפים לקוויז:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">📖 לפני הקוויז:</h4>
              <ul class="space-y-1">
                <li>• קראו את השאלה בעיון</li>
                <li>• חשבו על התשובה</li>
                <li>• אל תמהרו לענות</li>
                <li>• בדקו את כל האפשרויות</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">✅ בזמן הקוויז:</h4>
              <ul class="space-y-1">
                <li>• ענו על כל השאלות</li>
                <li>• אל תשאירו שאלות ריקות</li>
                <li>• בדקו את התשובות</li>
                <li>• אל תדאגו - זה רק לבדיקה!</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-blue-50 p-4 rounded-lg text-center">
          <h3 class="font-bold text-blue-800 mb-2">🎯 הקוויז כולל:</h3>
          <div class="grid md:grid-cols-3 gap-4 text-sm">
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-blue-800 mb-1">❓ שאלות רב-ברירה</h4>
              <p class="text-xs text-gray-600">בחרו את התשובה הנכונה</p>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-green-800 mb-1">🔗 התאמה</h4>
              <p class="text-xs text-gray-600">חברו מושגים למושגים</p>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-purple-800 mb-1">✅ נכון/לא נכון</h4>
              <p class="text-xs text-gray-600">החליטו אם נכון או לא</p>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-lg text-blue-700 font-semibold">מוכנים? בואו נתחיל! 🚀</p>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide020-final-quiz"
}); 