import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide14Wifi = createContentSlide({
  id: "slide014-wifi",
  title: "WiFi",
  subtitle: "חיבור אלחוטי לאינטרנט",
  icon: "📶",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-blue-800 mb-4">📶 WiFi - חיבור אלחוטי לאינטרנט</h3>
          <p class="text-lg text-gray-700 mb-4">
            WiFi מאפשר לנו להתחבר לאינטרנט ללא כבלים - רק באמצעות גלי רדיו
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">📡 איך WiFi עובד?</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 class="font-semibold text-blue-800">גלי רדיו</h4>
                    <p class="text-sm text-gray-600">המידע נשלח באמצעות גלי רדיו</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 class="font-semibold text-blue-800">ראוטר</h4>
                    <p class="text-sm text-gray-600">הראוטר שולח ומקבל אותות</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 class="font-semibold text-blue-800">מכשירים</h4>
                    <p class="text-sm text-gray-600">המכשירים מקבלים את האותות</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 class="font-semibold text-blue-800">חיבור</h4>
                    <p class="text-sm text-gray-600">המכשיר מתחבר לאינטרנט</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">📊 תדירויות WiFi:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">2.4</span>
                  <div>
                    <h4 class="font-semibold text-green-800">2.4 GHz</h4>
                    <p class="text-sm text-gray-600">טווח ארוך, מהירות בינונית</p>
                    <p class="text-xs text-gray-500">עובר דרך קירות</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">5</span>
                  <div>
                    <h4 class="font-semibold text-green-800">5 GHz</h4>
                    <p class="text-sm text-gray-600">מהירות גבוהה, טווח קצר</p>
                    <p class="text-xs text-gray-500">פחות הפרעות</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">6</span>
                  <div>
                    <h4 class="font-semibold text-green-800">6 GHz (WiFi 6E)</h4>
                    <p class="text-sm text-gray-600">המהירות הגבוהה ביותר</p>
                    <p class="text-xs text-gray-500">חדש ומהיר</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-bold text-gray-800 mb-2">🔧 סוגי אבטחת WiFi:</h3>
          <div class="grid md:grid-cols-3 gap-4 text-sm">
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-red-800 mb-1">❌ לא בטוח:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• WEP - ישן ולא בטוח</li>
                <li>• רשת פתוחה</li>
                <li>• סיסמה חלשה</li>
              </ul>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-yellow-800 mb-1">⚠️ בינוני:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• WPA - ישן אבל בטוח</li>
                <li>• WPA2 - טוב</li>
                <li>• סיסמה חזקה</li>
              </ul>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-green-800 mb-1">✅ בטוח:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• WPA3 - החדש והבטוח</li>
                <li>• סיסמה חזקה</li>
                <li>• הצפנה מתקדמת</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">💡 טיפים ל-WiFi טוב:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">📡 מיקום ראוטר:</h4>
              <ul class="space-y-1">
                <li>• הניחו במרכז הבית</li>
                <li>• הרחיקו ממתכות</li>
                <li>• הרחיקו ממים</li>
                <li>• הניחו בגובה</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">🔒 אבטחה:</h4>
              <ul class="space-y-1">
                <li>• השתמשו ב-WPA3</li>
                <li>• סיסמה חזקה</li>
                <li>• שנה את שם הרשת</li>
                <li>• כבה WPS</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-blue-50 p-4 rounded-lg">
          <h3 class="font-bold text-blue-800 mb-2">🚀 דורות WiFi:</h3>
          <div class="grid md:grid-cols-4 gap-4 text-sm">
            <div class="bg-white p-3 rounded-lg text-center">
              <h4 class="font-semibold text-blue-800 mb-1">WiFi 4</h4>
              <p class="text-xs text-gray-600">802.11n</p>
              <p class="text-xs text-gray-500">עד 600 Mbps</p>
            </div>
            <div class="bg-white p-3 rounded-lg text-center">
              <h4 class="font-semibold text-green-800 mb-1">WiFi 5</h4>
              <p class="text-xs text-gray-600">802.11ac</p>
              <p class="text-xs text-gray-500">עד 3.5 Gbps</p>
            </div>
            <div class="bg-white p-3 rounded-lg text-center">
              <h4 class="font-semibold text-purple-800 mb-1">WiFi 6</h4>
              <p class="text-xs text-gray-600">802.11ax</p>
              <p class="text-xs text-gray-500">עד 9.6 Gbps</p>
            </div>
            <div class="bg-white p-3 rounded-lg text-center">
              <h4 class="font-semibold text-orange-800 mb-1">WiFi 7</h4>
              <p class="text-xs text-gray-600">802.11be</p>
              <p class="text-xs text-gray-500">עד 46 Gbps</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide015-network-simulator"
}); 