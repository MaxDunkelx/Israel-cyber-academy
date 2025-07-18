import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide5InternetHistory = createContentSlide({
  id: "slide005-internet-history",
  title: "היסטוריית האינטרנט",
  subtitle: "איך הכל התחיל?",
  icon: "📚",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-purple-800 mb-4">📚 היסטוריית האינטרנט</h3>
          <p class="text-lg text-gray-700 mb-4">
            האינטרנט התחיל כפרויקט צבאי והפך למהפכה עולמית
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">🕰️ ציר זמן היסטורי:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1969</div>
                  <div>
                    <h4 class="font-semibold text-blue-800">ARPANET נולד</h4>
                    <p class="text-sm text-gray-600">הרשת הראשונה של משרד ההגנה האמריקאי</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1973</div>
                  <div>
                    <h4 class="font-semibold text-blue-800">TCP/IP נוצר</h4>
                    <p class="text-sm text-gray-600">הפרוטוקול שמאפשר תקשורת בין רשתות</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1989</div>
                  <div>
                    <h4 class="font-semibold text-blue-800">World Wide Web</h4>
                    <p class="text-sm text-gray-600">טים ברנרס-לי ממציא את ה-WWW</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1995</div>
                  <div>
                    <h4 class="font-semibold text-blue-800">האינטרנט הציבורי</h4>
                    <p class="text-sm text-gray-600">האינטרנט נפתח לציבור הרחב</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2007</div>
                  <div>
                    <h4 class="font-semibold text-blue-800">הטלפון החכם</h4>
                    <p class="text-sm text-gray-600">iPhone מביא אינטרנט לכיס</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">👥 אנשים חשובים:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">👨‍💻</span>
                  <div>
                    <h4 class="font-semibold text-green-800">טים ברנרס-לי</h4>
                    <p class="text-sm text-gray-600">ממציא ה-World Wide Web</p>
                    <p class="text-xs text-gray-500">1989 - CERN</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">👨‍💻</span>
                  <div>
                    <h4 class="font-semibold text-green-800">וינט סרף</h4>
                    <p class="text-sm text-gray-600">מפתח TCP/IP</p>
                    <p class="text-xs text-gray-500">1973 - ARPA</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">👨‍💻</span>
                  <div>
                    <h4 class="font-semibold text-green-800">בוב קאהן</h4>
                    <p class="text-sm text-gray-600">מפתח TCP/IP</p>
                    <p class="text-xs text-gray-500">1973 - ARPA</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">👨‍💻</span>
                  <div>
                    <h4 class="font-semibold text-green-800">מארק אנדריסן</h4>
                    <p class="text-sm text-gray-600">מפתח הדפדפן הראשון</p>
                    <p class="text-xs text-gray-500">1993 - Mosaic</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">💡 עובדות מעניינות:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">🎯 התחלה:</h4>
              <ul class="space-y-1">
                <li>• האינטרנט התחיל כפרויקט צבאי</li>
                <li>• המטרה הייתה תקשורת עמידה</li>
                <li>• רק 4 מחשבים היו מחוברים בהתחלה</li>
                <li>• השם "אינטרנט" הומצא ב-1974</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">🚀 התפתחות:</h4>
              <ul class="space-y-1">
                <li>• 1991 - האתר הראשון</li>
                <li>• 1994 - Amazon נוסד</li>
                <li>• 1998 - Google נוסד</li>
                <li>• 2004 - Facebook נוסד</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide006-how-internet-works"
}); 