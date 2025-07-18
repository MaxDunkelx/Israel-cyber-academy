import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide18FiveG = createContentSlide({
  id: "slide018-5g",
  title: "5G",
  subtitle: "הדור הבא של התקשורת הסלולרית",
  icon: "📶",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-green-800 mb-4">📶 5G - הדור הבא של התקשורת הסלולרית</h3>
          <p class="text-lg text-gray-700 mb-4">
            5G הוא הדור החמישי של טכנולוגיית הסלולר - מהיר יותר, חכם יותר ועוצמתי יותר
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">📊 השוואה בין דורות:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">1</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">1G - אנלוגי</h4>
                    <p class="text-sm text-gray-600">שיחות קול בלבד</p>
                    <p class="text-xs text-gray-500">1980s</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">2</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">2G - דיגיטלי</h4>
                    <p class="text-sm text-gray-600">קול + SMS</p>
                    <p class="text-xs text-gray-500">1990s</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">3</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">3G - אינטרנט</h4>
                    <p class="text-sm text-gray-600">גלישה באינטרנט</p>
                    <p class="text-xs text-gray-500">2000s</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">4</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">4G - מהיר</h4>
                    <p class="text-sm text-gray-600">מהירות גבוהה</p>
                    <p class="text-xs text-gray-500">2010s</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">5</span>
                  <div>
                    <h4 class="font-semibold text-green-800">5G - מהפכני</h4>
                    <p class="text-sm text-gray-600">מהירות עצומה</p>
                    <p class="text-xs text-gray-500">2020s</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🚀 יתרונות 5G:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">⚡</span>
                  <div>
                    <h4 class="font-semibold text-green-800">מהירות עצומה</h4>
                    <p class="text-sm text-gray-600">עד 10 Gbps</p>
                    <p class="text-xs text-gray-500">100x יותר מ-4G</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">⏱️</span>
                  <div>
                    <h4 class="font-semibold text-green-800">עיכוב נמוך</h4>
                    <p class="text-sm text-gray-600">פחות מ-1 מילישנייה</p>
                    <p class="text-xs text-gray-500">משחקים בזמן אמת</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📱</span>
                  <div>
                    <h4 class="font-semibold text-green-800">יותר מכשירים</h4>
                    <p class="text-sm text-gray-600">מיליון מכשירים לקמ"ר</p>
                    <p class="text-xs text-gray-500">IoT מתקדם</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🔋</span>
                  <div>
                    <h4 class="font-semibold text-green-800">חיסכון בסוללה</h4>
                    <p class="text-sm text-gray-600">יעילות אנרגטית</p>
                    <p class="text-xs text-gray-500">סוללה נמשכת יותר</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-bold text-gray-800 mb-2">🎯 שימושים ב-5G:</h3>
          <div class="grid md:grid-cols-3 gap-4 text-sm">
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-blue-800 mb-1">🎮 משחקים:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• משחקים בענן</li>
                <li>• מציאות מדומה</li>
                <li>• משחקים בזמן אמת</li>
                <li>• סטרימינג איכותי</li>
              </ul>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-green-800 mb-1">🏥 רפואה:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• ניתוחים מרחוק</li>
                <li>• מעקב בריאות</li>
                <li>• אבחון מהיר</li>
                <li>• טיפול מרחוק</li>
              </ul>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-purple-800 mb-1">🚗 תחבורה:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• מכוניות אוטונומיות</li>
                <li>• ניהול תנועה</li>
                <li>• תחבורה חכמה</li>
                <li>• בטיחות מתקדמת</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">⚠️ אתגרים של 5G:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">🏗️ תשתית:</h4>
              <ul class="space-y-1">
                <li>• צורך באנטנות רבות</li>
                <li>• עלויות גבוהות</li>
                <li>• זמן פריסה ארוך</li>
                <li>• צורך בכיסוי מלא</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">🔒 אבטחה:</h4>
              <ul class="space-y-1">
                <li>• סיכוני אבטחה חדשים</li>
                <li>• יותר נקודות תורפה</li>
                <li>• צורך בהצפנה מתקדמת</li>
                <li>• הגנה על פרטיות</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-blue-50 p-4 rounded-lg">
          <h3 class="font-bold text-blue-800 mb-2">🚀 עתיד 5G:</h3>
          <div class="grid md:grid-cols-4 gap-4 text-sm">
            <div class="bg-white p-3 rounded-lg text-center">
              <h4 class="font-semibold text-blue-800 mb-1">🏙️ ערים חכמות</h4>
              <p class="text-xs text-gray-600">תחבורה, אבטחה, תאורה</p>
            </div>
            <div class="bg-white p-3 rounded-lg text-center">
              <h4 class="font-semibold text-green-800 mb-1">🏭 תעשייה 4.0</h4>
              <p class="text-xs text-gray-600">ייצור חכם</p>
            </div>
            <div class="bg-white p-3 rounded-lg text-center">
              <h4 class="font-semibold text-purple-800 mb-1">🎓 חינוך</h4>
              <p class="text-xs text-gray-600">למידה מרחוק מתקדמת</p>
            </div>
            <div class="bg-white p-3 rounded-lg text-center">
              <h4 class="font-semibold text-orange-800 mb-1">🎬 בידור</h4>
              <p class="text-xs text-gray-600">VR, AR, סטרימינג</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide019-final-quiz-intro"
}); 