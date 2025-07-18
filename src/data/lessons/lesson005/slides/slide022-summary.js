import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide22Summary = createContentSlide({
  id: "slide022-summary",
  title: "סיכום השיעור",
  subtitle: "מה למדנו על רשתות והאינטרנט",
  icon: "📋",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-green-800 mb-4">📋 סיכום השיעור - רשתות והאינטרנט</h3>
          <p class="text-lg text-gray-700 mb-4">
            כל הכבוד! סיימנו שיעור מקיף על עולם הרשתות והאינטרנט. הנה סיכום של מה שלמדנו
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">🔗 יסודות הרשתות:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">🔗</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">רשת מחשבים</h4>
                    <p class="text-sm text-gray-600">חיבור בין מחשבים לתקשורת ושיתוף</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">📊</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">סוגי רשתות</h4>
                    <p class="text-sm text-gray-600">LAN, WAN, MAN, Internet</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">📚</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">היסטוריה</h4>
                    <p class="text-sm text-gray-600">ARPANET → WWW → האינטרנט המודרני</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">🔄</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">איך זה עובד</h4>
                    <p class="text-sm text-gray-600">חבילות, ראוטרים, שרתים</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🌐 טכנולוגיות מפתח:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📋</span>
                  <div>
                    <h4 class="font-semibold text-green-800">פרוטוקולים</h4>
                    <p class="text-sm text-gray-600">HTTP, HTTPS, SMTP, FTP, TCP/IP</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📍</span>
                  <div>
                    <h4 class="font-semibold text-green-800">כתובות IP</h4>
                    <p class="text-sm text-gray-600">IPv4, IPv6 - כתובות ייחודיות</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🌐</span>
                  <div>
                    <h4 class="font-semibold text-green-800">דפדפנים</h4>
                    <p class="text-sm text-gray-600">Chrome, Firefox, Edge, Safari</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🖥️</span>
                  <div>
                    <h4 class="font-semibold text-green-800">שרתים</h4>
                    <p class="text-sm text-gray-600">Web, Mail, File, Game servers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-bold text-gray-800 mb-2">🔒 אבטחה ובטיחות:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm">
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-red-800 mb-1">⚠️ סכנות:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• וירוסים ותוכנות זדוניות</li>
                <li>• דיוג (Phishing)</li>
                <li>• גניבת זהות</li>
                <li>• הונאות כספיות</li>
                <li>• בריונות ברשת</li>
              </ul>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-green-800 mb-1">🛡️ הגנה:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• סיסמאות חזקות</li>
                <li>• תוכנת אנטי-וירוס</li>
                <li>• עדכונים קבועים</li>
                <li>• חשדנות בריאה</li>
                <li>• גיבוי מידע</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">🚀 טכנולוגיות מתקדמות:</h3>
          <div class="grid md:grid-cols-3 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">📶 WiFi:</h4>
              <ul class="space-y-1">
                <li>• 2.4GHz, 5GHz, 6GHz</li>
                <li>• WPA3 לאבטחה</li>
                <li>• WiFi 6/7</li>
                <li>• חיבור אלחוטי</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">☁️ ענן:</h4>
              <ul class="space-y-1">
                <li>• Google Drive, iCloud</li>
                <li>• Spotify, Netflix</li>
                <li>• שירותים מרחוק</li>
                <li>• אחסון בענן</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">📱 IoT & 5G:</h4>
              <ul class="space-y-1">
                <li>• מכשירים חכמים</li>
                <li>• בית חכם</li>
                <li>• מהירות עצומה</li>
                <li>• עיכוב נמוך</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-blue-50 p-4 rounded-lg text-center">
          <h3 class="font-bold text-blue-800 mb-2">🎯 מה הלאה?</h3>
          <div class="grid md:grid-cols-3 gap-4 text-sm">
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-blue-800 mb-1">🏠 בבית</h4>
              <p class="text-xs text-gray-600">השתמשו בידע להגדרת רשת בטוחה</p>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-green-800 mb-1">🎓 בלימודים</h4>
              <p class="text-xs text-gray-600">המשיכו לחקור ולגלות</p>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-purple-800 mb-1">🚀 בעתיד</h4>
              <p class="text-xs text-gray-600">הטכנולוגיה ממשיכה להתפתח</p>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-lg text-blue-700 font-semibold">כל הכבוד! אתם מומחי רשתות! 🌟</p>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide023-advanced-topics"
}); 