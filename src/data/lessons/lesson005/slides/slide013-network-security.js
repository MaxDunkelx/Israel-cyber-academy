import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide13NetworkSecurity = createContentSlide({
  id: "slide013-network-security",
  title: "אבטחת רשת",
  subtitle: "איך להישאר בטוחים באינטרנט",
  icon: "🔒",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-red-800 mb-4">🔒 אבטחת רשת - איך להישאר בטוחים באינטרנט</h3>
          <p class="text-lg text-gray-700 mb-4">
            האינטרנט הוא מקום נפלא, אבל יש בו גם סכנות. חשוב לדעת איך להגן על עצמנו
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-red-800 text-lg">⚠️ סכנות ברשת:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-red-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-red-500 text-xl">🦠</span>
                  <div>
                    <h4 class="font-semibold text-red-800">וירוסים ותוכנות זדוניות</h4>
                    <p class="text-sm text-gray-600">תוכנות שמזיקות למחשב</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-red-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-red-500 text-xl">🎣</span>
                  <div>
                    <h4 class="font-semibold text-red-800">דיוג (Phishing)</h4>
                    <p class="text-sm text-gray-600">אתרים מזויפים שגונבים מידע</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-red-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-red-500 text-xl">👤</span>
                  <div>
                    <h4 class="font-semibold text-red-800">גניבת זהות</h4>
                    <p class="text-sm text-gray-600">מישהו מתחזה אליכם</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-red-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-red-500 text-xl">💰</span>
                  <div>
                    <h4 class="font-semibold text-red-800">הונאות כספיות</h4>
                    <p class="text-sm text-gray-600">ניסיונות לגנוב כסף</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-red-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-red-500 text-xl">📱</span>
                  <div>
                    <h4 class="font-semibold text-red-800">בריונות ברשת</h4>
                    <p class="text-sm text-gray-600">הטרדה ופגיעה באחרים</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🛡️ איך להגן על עצמנו:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 class="font-semibold text-green-800">סיסמאות חזקות</h4>
                    <p class="text-sm text-gray-600">השתמשו בסיסמאות מורכבות</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 class="font-semibold text-green-800">אנטי-וירוס</h4>
                    <p class="text-sm text-gray-600">התקינו תוכנת הגנה</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 class="font-semibold text-green-800">עדכונים</h4>
                    <p class="text-sm text-gray-600">עדכנו את התוכנות</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 class="font-semibold text-green-800">חשדנות</h4>
                    <p class="text-sm text-gray-600">אל תאמינו לכל דבר</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</div>
                  <div>
                    <h4 class="font-semibold text-green-800">גיבוי</h4>
                    <p class="text-sm text-gray-600">גבו את המידע החשוב</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-bold text-gray-800 mb-2">🔍 איך לזהות סכנות:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm">
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-red-800 mb-1">❌ סימני אזהרה:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• כתובת לא מוכרת</li>
                <li>• הודעות דחופות</li>
                <li>• בקשות למידע אישי</li>
                <li>• הצעות טובות מדי</li>
                <li>• שגיאות כתיב</li>
              </ul>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-green-800 mb-1">✅ סימני אמינות:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• כתובת HTTPS</li>
                <li>• שם חברה מוכרת</li>
                <li>• עיצוב מקצועי</li>
                <li>• מידע מדויק</li>
                <li>• אפשרות יצירת קשר</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">💡 כללי זהב לאבטחה:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">🔐 סיסמאות:</h4>
              <ul class="space-y-1">
                <li>• לפחות 8 תווים</li>
                <li>• אותיות גדולות וקטנות</li>
                <li>• מספרים וסימנים</li>
                <li>• סיסמה שונה לכל אתר</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">🌐 גלישה:</h4>
              <ul class="space-y-1">
                <li>• בדקו את הכתובת</li>
                <li>• אל תפתחו קישורים חשודים</li>
                <li>• אל תכניסו מידע רגיש</li>
                <li>• השתמשו במצב פרטי</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide014-wifi"
}); 