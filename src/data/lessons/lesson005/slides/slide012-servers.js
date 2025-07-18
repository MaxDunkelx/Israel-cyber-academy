import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide12Servers = createContentSlide({
  id: "slide012-servers",
  title: "שרתים",
  subtitle: "המחשבים שמשרתים אותנו",
  icon: "🖥️",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-purple-800 mb-4">🖥️ שרתים - המחשבים שמשרתים אותנו</h3>
          <p class="text-lg text-gray-700 mb-4">
            שרתים הם מחשבים חזקים שמאחסנים ומעבירים מידע לכל העולם
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">🖥️ מה זה שרת?</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-blue-500 text-xl">🖥️</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">מחשב חזק</h4>
                    <p class="text-sm text-gray-600">מחשב עם הרבה כוח עיבוד</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-green-500 text-xl">💾</span>
                  <div>
                    <h4 class="font-semibold text-green-800">אחסון מידע</h4>
                    <p class="text-sm text-gray-600">מאחסן אתרים, קבצים ומידע</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-purple-500 text-xl">🌐</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">זמינות 24/7</h4>
                    <p class="text-sm text-gray-600">עובד כל הזמן ללא הפסקה</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-orange-500 text-xl">🔗</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">חיבור לאינטרנט</h4>
                    <p class="text-sm text-gray-600">מחובר לאינטרנט במהירות גבוהה</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">📊 סוגי שרתים:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🌐</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Web Server</h4>
                    <p class="text-sm text-gray-600">משרת אתרי אינטרנט</p>
                    <p class="text-xs text-gray-500">Apache, Nginx</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📧</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Mail Server</h4>
                    <p class="text-sm text-gray-600">מטפל בדוא"ל</p>
                    <p class="text-xs text-gray-500">Gmail, Outlook</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">💾</span>
                  <div>
                    <h4 class="font-semibold text-green-800">File Server</h4>
                    <p class="text-sm text-gray-600">מאחסן קבצים</p>
                    <p class="text-xs text-gray-500">Google Drive, Dropbox</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🎮</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Game Server</h4>
                    <p class="text-sm text-gray-600">משרת משחקים</p>
                    <p class="text-xs text-gray-500">Minecraft, Fortnite</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🎵</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Media Server</h4>
                    <p class="text-sm text-gray-600">משרת מוזיקה וסרטים</p>
                    <p class="text-xs text-gray-500">Spotify, Netflix</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-bold text-gray-800 mb-2">🏢 איפה נמצאים שרתים?</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm">
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-blue-800 mb-1">🏢 מרכזי נתונים:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• בניינים גדולים עם הרבה שרתים</li>
                <li>• מערכות קירור מתקדמות</li>
                <li>• גיבוי חשמל ואינטרנט</li>
                <li>• אבטחה גבוהה</li>
              </ul>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-green-800 mb-1">☁️ ענן:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• שרתים וירטואליים</li>
                <li>• גישה מכל מקום</li>
                <li>• תשלום לפי שימוש</li>
                <li>• גמישות גבוהה</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">💡 עובדות מעניינות:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">🔢 מספרים:</h4>
              <ul class="space-y-1">
                <li>• Google מפעיל מיליוני שרתים</li>
                <li>• מרכז נתונים יכול להיות בגודל של 10 מגרשי כדורגל</li>
                <li>• שרתים צורכים הרבה חשמל</li>
                <li>• יש שרתים מתחת למים</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">🌍 מיקום:</h4>
              <ul class="space-y-1">
                <li>• שרתים נמצאים בכל העולם</li>
                <li>• יש שרתים בקוטב הצפוני</li>
                <li>• חלק מהשרתים מתחת לאדמה</li>
                <li>• יש שרתים בחלל</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide013-network-security"
}); 