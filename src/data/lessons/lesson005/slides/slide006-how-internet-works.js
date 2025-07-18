import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide6HowInternetWorks = createContentSlide({
  id: "slide006-how-internet-works",
  title: "איך האינטרנט עובד?",
  subtitle: "המסע של המידע ברשת",
  icon: "🔄",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-blue-800 mb-4">🔄 איך האינטרנט עובד?</h3>
          <p class="text-lg text-gray-700 mb-4">
            בואו נבין איך המידע עובר ממחשב אחד לאחר ברשת האינטרנט
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">📦 איך מידע עובר?</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 class="font-semibold text-blue-800">חלוקה לחבילות</h4>
                    <p class="text-sm text-gray-600">המידע נחתך לחבילות קטנות</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 class="font-semibold text-blue-800">מציאת נתיב</h4>
                    <p class="text-sm text-gray-600">הראוטר מוצא את הדרך הטובה ביותר</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 class="font-semibold text-blue-800">שליחה ברשת</h4>
                    <p class="text-sm text-gray-600">החבילות נשלחות דרך כבלים או אלחוט</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 class="font-semibold text-blue-800">הרכבה מחדש</h4>
                    <p class="text-sm text-gray-600">המחשב המקבל מרכיב את המידע</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🛠️ רכיבי הרשת:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🖥️</span>
                  <div>
                    <h4 class="font-semibold text-green-800">מחשבים</h4>
                    <p class="text-sm text-gray-600">שולחים ומקבלים מידע</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📡</span>
                  <div>
                    <h4 class="font-semibold text-green-800">ראוטרים</h4>
                    <p class="text-sm text-gray-600">מכוונים את המידע לכתובת הנכונה</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🔌</span>
                  <div>
                    <h4 class="font-semibold text-green-800">כבלים</h4>
                    <p class="text-sm text-gray-600">מובילים את המידע</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🌐</span>
                  <div>
                    <h4 class="font-semibold text-green-800">שרתים</h4>
                    <p class="text-sm text-gray-600">מאחסנים ומעבירים מידע</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-bold text-gray-800 mb-2">🎬 דוגמה: שליחת הודעה</h3>
          <div class="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
            <div class="text-gray-400">1. אתם כותבים הודעה בטלפון</div>
            <div class="text-white">2. ההודעה נחתכת לחבילות קטנות</div>
            <div class="text-gray-400">3. כל חבילה מקבלת כתובת יעד</div>
            <div class="text-white">4. הראוטר מוצא את הדרך הטובה ביותר</div>
            <div class="text-gray-400">5. החבילות נשלחות דרך הרשת</div>
            <div class="text-white">6. הטלפון של החבר מקבל את החבילות</div>
            <div class="text-gray-400">7. ההודעה מורכבת מחדש ומוצגת</div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">💡 עובדות מעניינות:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">⚡ מהירות:</h4>
              <ul class="space-y-1">
                <li>• מידע עובר במהירות האור</li>
                <li>• חבילה יכולה לעבור דרך 20 ראוטרים</li>
                <li>• המידע מוצא את הדרך הטובה ביותר</li>
                <li>• אם דרך אחת נכשלת, נמצא דרך אחרת</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">🔒 אבטחה:</h4>
              <ul class="space-y-1">
                <li>• המידע יכול להיות מוצפן</li>
                <li>• כל חבילה נבדקת לאבטחה</li>
                <li>• יש מערכות הגנה מפני תקיפות</li>
                <li>• המידע נשמר בגיבויים</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide007-protocols"
}); 