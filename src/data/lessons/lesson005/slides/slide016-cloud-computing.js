import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide16CloudComputing = createContentSlide({
  id: "slide016-cloud-computing",
  title: "ענן",
  subtitle: "שירותים ברשת האינטרנט",
  icon: "☁️",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-blue-800 mb-4">☁️ ענן - שירותים ברשת האינטרנט</h3>
          <p class="text-lg text-gray-700 mb-4">
            הענן מאפשר לנו להשתמש בשירותים ותוכנות דרך האינטרנט במקום במחשב שלנו
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">☁️ מה זה ענן?</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-blue-500 text-xl">🖥️</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">שרתים מרוחקים</h4>
                    <p class="text-sm text-gray-600">מחשבים חזקים במקום אחר</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-green-500 text-xl">🌐</span>
                  <div>
                    <h4 class="font-semibold text-green-800">גישה דרך אינטרנט</h4>
                    <p class="text-sm text-gray-600">מכל מקום ובכל זמן</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-purple-500 text-xl">💾</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">אחסון מידע</h4>
                    <p class="text-sm text-gray-600">קבצים נשמרים בשרתים</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-orange-500 text-xl">⚡</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">עיבוד מידע</h4>
                    <p class="text-sm text-gray-600">המחשבים החזקים מעבדים</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">📱 שירותי ענן פופולריים:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">💾</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Google Drive</h4>
                    <p class="text-sm text-gray-600">אחסון קבצים ושיתוף</p>
                    <p class="text-xs text-gray-500">15GB חינם</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📧</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Gmail</h4>
                    <p class="text-sm text-gray-600">דוא"ל בענן</p>
                    <p class="text-xs text-gray-500">15GB לאחסון</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🎵</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Spotify</h4>
                    <p class="text-sm text-gray-600">מוזיקה בענן</p>
                    <p class="text-xs text-gray-500">מיליוני שירים</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🎬</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Netflix</h4>
                    <p class="text-sm text-gray-600">סרטים וסדרות</p>
                    <p class="text-xs text-gray-500">סטרימינג</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📱</span>
                  <div>
                    <h4 class="font-semibold text-green-800">iCloud</h4>
                    <p class="text-sm text-gray-600">שירותי Apple</p>
                    <p class="text-xs text-gray-500">5GB חינם</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-bold text-gray-800 mb-2">✅ יתרונות הענן:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm">
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-green-800 mb-1">🚀 נוחות:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• גישה מכל מקום</li>
                <li>• אין צורך בהתקנה</li>
                <li>• עדכונים אוטומטיים</li>
                <li>• גיבוי אוטומטי</li>
              </ul>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-blue-800 mb-1">💰 חיסכון:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• אין צורך במחשב חזק</li>
                <li>• תשלום לפי שימוש</li>
                <li>• אין עלות תחזוקה</li>
                <li>• חיסכון במקום</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">⚠️ חסרונות הענן:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">🌐 תלות באינטרנט:</h4>
              <ul class="space-y-1">
                <li>• צריך חיבור לאינטרנט</li>
                <li>• מהירות תלויה בחיבור</li>
                <li>• לא עובד ללא אינטרנט</li>
                <li>• תלות בספק השירות</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">🔒 אבטחה:</h4>
              <ul class="space-y-1">
                <li>• המידע לא אצלכם</li>
                <li>• תלות באבטחה של החברה</li>
                <li>• סיכון לפריצה</li>
                <li>• אובדן שליטה</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide017-internet-of-things"
}); 