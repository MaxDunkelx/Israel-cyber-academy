import { createBreakSlide } from '../../../components/slides/BreakSlide.jsx';

export const slide10Break = createBreakSlide({
  id: "slide010-break",
  title: "הפסקה!",
  subtitle: "זמן לנוח ולאכול",
  icon: "☕",
  duration: 15,
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg text-center">
          <h3 class="text-2xl font-bold text-yellow-800 mb-4">☕ הפסקה של 15 דקות!</h3>
          <p class="text-lg text-gray-700 mb-4">
            כל הכבוד! סיימנו את החלק הראשון של השיעור על רשתות
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">✅ מה למדנו עד עכשיו:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">🔗</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">מה זה רשת</h4>
                    <p class="text-sm text-gray-600">הבנו איך מחשבים מתקשרים</p>
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
                    <h4 class="font-semibold text-blue-800">היסטוריית האינטרנט</h4>
                    <p class="text-sm text-gray-600">איך הכל התחיל</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">🔄</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">איך האינטרנט עובד</h4>
                    <p class="text-sm text-gray-600">המסע של המידע</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">📋</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">פרוטוקולים</h4>
                    <p class="text-sm text-gray-600">השפה של האינטרנט</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">📍</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">כתובות IP</h4>
                    <p class="text-sm text-gray-600">הכתובות של האינטרנט</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🚀 מה נמשיך ללמוד:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🌐</span>
                  <div>
                    <h4 class="font-semibold text-green-800">דפדפנים</h4>
                    <p class="text-sm text-gray-600">איך לגלוש באינטרנט</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🖥️</span>
                  <div>
                    <h4 class="font-semibold text-green-800">שרתים</h4>
                    <p class="text-sm text-gray-600">איפה נשמר המידע</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🔒</span>
                  <div>
                    <h4 class="font-semibold text-green-800">אבטחת רשת</h4>
                    <p class="text-sm text-gray-600">איך להישאר בטוחים</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📶</span>
                  <div>
                    <h4 class="font-semibold text-green-800">WiFi</h4>
                    <p class="text-sm text-gray-600">חיבור אלחוטי</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">☁️</span>
                  <div>
                    <h4 class="font-semibold text-green-800">ענן</h4>
                    <p class="text-sm text-gray-600">שירותים ברשת</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📱</span>
                  <div>
                    <h4 class="font-semibold text-green-800">IoT</h4>
                    <p class="text-sm text-gray-600">אינטרנט של הדברים</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg text-center">
          <h3 class="font-bold text-yellow-800 mb-2">⏰ זיכרו:</h3>
          <p class="text-lg text-yellow-700">
            ההפסקה נמשכת 15 דקות. חזרו בזמן כדי להמשיך ללמוד!
          </p>
          <div class="mt-4 text-2xl">
            <span class="text-blue-500">☕</span>
            <span class="text-green-500">🍎</span>
            <span class="text-orange-500">🍪</span>
            <span class="text-purple-500">💧</span>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide011-browsers"
}); 