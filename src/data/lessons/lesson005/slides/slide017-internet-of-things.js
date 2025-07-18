import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide17InternetOfThings = createContentSlide({
  id: "slide017-internet-of-things",
  title: "אינטרנט של הדברים",
  subtitle: "כשכל דבר מחובר לאינטרנט",
  icon: "📱",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-purple-800 mb-4">📱 אינטרנט של הדברים - כשכל דבר מחובר לאינטרנט</h3>
          <p class="text-lg text-gray-700 mb-4">
            IoT הוא הרעיון שכל מכשיר יכול להתחבר לאינטרנט ולשתף מידע
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">🏠 מכשירים חכמים בבית:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">🏠</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">בית חכם</h4>
                    <p class="text-sm text-gray-600">תאורה, חימום, מיזוג</p>
                    <p class="text-xs text-gray-500">נשלט מהטלפון</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📺</span>
                  <div>
                    <h4 class="font-semibold text-green-800">טלוויזיה חכמה</h4>
                    <p class="text-sm text-gray-600">גלישה, אפליקציות</p>
                    <p class="text-xs text-gray-500">חיבור לאינטרנט</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">🔊</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">רמקולים חכמים</h4>
                    <p class="text-sm text-gray-600">Alexa, Google Home</p>
                    <p class="text-xs text-gray-500">מגיבים לקול</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">📱</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">שעונים חכמים</h4>
                    <p class="text-sm text-gray-600">Apple Watch, Fitbit</p>
                    <p class="text-xs text-gray-500">מעקב בריאות</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🌍 IoT בעולם:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🚗</span>
                  <div>
                    <h4 class="font-semibold text-green-800">מכוניות חכמות</h4>
                    <p class="text-sm text-gray-600">ניווט, בטיחות</p>
                    <p class="text-xs text-gray-500">חיבור לאינטרנט</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🏥</span>
                  <div>
                    <h4 class="font-semibold text-green-800">רפואה דיגיטלית</h4>
                    <p class="text-sm text-gray-600">מכשירים רפואיים</p>
                    <p class="text-xs text-gray-500">מעקב מרחוק</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🏭</span>
                  <div>
                    <h4 class="font-semibold text-green-800">תעשייה 4.0</h4>
                    <p class="text-sm text-gray-600">מכונות חכמות</p>
                    <p class="text-xs text-gray-500">ייצור אוטומטי</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🌱</span>
                  <div>
                    <h4 class="font-semibold text-green-800">חקלאות חכמה</h4>
                    <p class="text-sm text-gray-600">חיישנים בשדות</p>
                    <p class="text-xs text-gray-500">השקיה אוטומטית</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-bold text-gray-800 mb-2">🔧 איך IoT עובד?</h3>
          <div class="grid md:grid-cols-3 gap-4 text-sm">
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-blue-800 mb-1">📡 חיישנים:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• אוספים מידע</li>
                <li>• חום, לחות, תנועה</li>
                <li>• מיקום, מהירות</li>
                <li>• תמונות, קול</li>
              </ul>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-green-800 mb-1">🌐 חיבור:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• WiFi, Bluetooth</li>
                <li>• סלולרי (4G/5G)</li>
                <li>• LoRa, Zigbee</li>
                <li>• שליחה לשרת</li>
              </ul>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-purple-800 mb-1">🧠 עיבוד:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• ניתוח המידע</li>
                <li>• קבלת החלטות</li>
                <li>• שליחת פקודות</li>
                <li>• התראות</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">💡 יתרונות וחסרונות:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">✅ יתרונות:</h4>
              <ul class="space-y-1">
                <li>• נוחות ואוטומציה</li>
                <li>• חיסכון באנרגיה</li>
                <li>• מעקב ובקרה</li>
                <li>• שיפור הבטיחות</li>
                <li>• איכות חיים טובה יותר</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">⚠️ חסרונות:</h4>
              <ul class="space-y-1">
                <li>• סיכוני אבטחה</li>
                <li>• תלות בטכנולוגיה</li>
                <li>• עלויות גבוהות</li>
                <li>• בעיות פרטיות</li>
                <li>• זיהום אלקטרומגנטי</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-blue-50 p-4 rounded-lg">
          <h3 class="font-bold text-blue-800 mb-2">🚀 עתיד ה-IoT:</h3>
          <div class="grid md:grid-cols-3 gap-4 text-sm">
            <div class="bg-white p-3 rounded-lg text-center">
              <h4 class="font-semibold text-blue-800 mb-1">🏙️ ערים חכמות</h4>
              <p class="text-xs text-gray-600">תאורה, תחבורה, אבטחה</p>
            </div>
            <div class="bg-white p-3 rounded-lg text-center">
              <h4 class="font-semibold text-green-800 mb-1">🏥 בריאות דיגיטלית</h4>
              <p class="text-xs text-gray-600">מעקב בריאות מתקדם</p>
            </div>
            <div class="bg-white p-3 rounded-lg text-center">
              <h4 class="font-semibold text-purple-800 mb-1">🤖 רובוטיקה</h4>
              <p class="text-xs text-gray-600">רובוטים מחוברים</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide018-5g"
}); 