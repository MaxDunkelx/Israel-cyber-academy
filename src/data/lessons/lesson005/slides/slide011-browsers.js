import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide11Browsers = createContentSlide({
  id: "slide011-browsers",
  title: "דפדפנים",
  subtitle: "החלונות שלנו לאינטרנט",
  icon: "🌐",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-blue-800 mb-4">🌐 דפדפנים - החלונות שלנו לאינטרנט</h3>
          <p class="text-lg text-gray-700 mb-4">
            דפדפן הוא התוכנה שמאפשרת לנו לגלוש באתרי אינטרנט
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">🖥️ דפדפנים פופולריים:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">🌐</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">Google Chrome</h4>
                    <p class="text-sm text-gray-600">הדפדפן הפופולרי ביותר</p>
                    <p class="text-xs text-gray-500">מהיר, בטוח, עם הרבה תוספים</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">🦊</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">Mozilla Firefox</h4>
                    <p class="text-sm text-gray-600">דפדפן קוד פתוח</p>
                    <p class="text-xs text-gray-500">מתמקד בפרטיות ובאבטחה</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">🌊</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">Microsoft Edge</h4>
                    <p class="text-sm text-gray-600">הדפדפן של מיקרוסופט</p>
                    <p class="text-xs text-gray-500">מגיע עם Windows</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">🍎</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">Safari</h4>
                    <p class="text-sm text-gray-600">הדפדפן של Apple</p>
                    <p class="text-xs text-gray-500">מגיע עם Mac ו-iOS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🔧 איך דפדפן עובד?</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 class="font-semibold text-green-800">הקלדת כתובת</h4>
                    <p class="text-sm text-gray-600">אתם מקלידים כתובת URL</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 class="font-semibold text-green-800">בקשת מידע</h4>
                    <p class="text-sm text-gray-600">הדפדפן שולח בקשה לשרת</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 class="font-semibold text-green-800">קבלת מידע</h4>
                    <p class="text-sm text-gray-600">השרת שולח את הדף</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 class="font-semibold text-green-800">הצגת הדף</h4>
                    <p class="text-sm text-gray-600">הדפדפן מציג את התוכן</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-bold text-gray-800 mb-2">🔧 כלי דפדפן:</h3>
          <div class="grid md:grid-cols-3 gap-4 text-sm">
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-blue-800 mb-1">🔍 חיפוש:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• סרגל כתובת</li>
                <li>• מנוע חיפוש</li>
                <li>• היסטוריית גלישה</li>
                <li>• סימניות</li>
              </ul>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-green-800 mb-1">🔒 אבטחה:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• HTTPS</li>
                <li>• חסימת פופאפים</li>
                <li>• חסימת תוכן</li>
                <li>• מצב פרטי</li>
              </ul>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-purple-800 mb-1">⚙️ הגדרות:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• תוספים</li>
                <li>• נושאים</li>
                <li>• הגדרות פרטיות</li>
                <li>• סנכרון</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">💡 טיפים לגלישה בטוחה:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">✅ מה לעשות:</h4>
              <ul class="space-y-1">
                <li>• בדקו שהכתובת מתחילה ב-HTTPS</li>
                <li>• השתמשו בסימניות לאתרים בטוחים</li>
                <li>• עדכנו את הדפדפן באופן קבוע</li>
                <li>• השתמשו במצב פרטי למידע רגיש</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">❌ מה לא לעשות:</h4>
              <ul class="space-y-1">
                <li>• אל תפתחו קישורים חשודים</li>
                <li>• אל תכניסו סיסמאות באתרים לא בטוחים</li>
                <li>• אל תורידו קבצים לא ידועים</li>
                <li>• אל תאמינו לכל מה שאתם רואים</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide012-servers"
}); 