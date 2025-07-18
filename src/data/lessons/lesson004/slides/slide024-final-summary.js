import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide24FinalSummary = createContentSlide({
  id: "slide024-final-summary",
  title: "סיכום סופי - Linux",
  subtitle: "כל מה שלמדנו בשיעור אחד",
  icon: "🏆",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-purple-800 mb-4">🏆 סיכום סופי - Linux</h3>
          <p class="text-lg text-gray-700">
            כל הכבוד! סיימתם שיעור מקיף על Linux. הנה סיכום קצר של הכל
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">📚 נושאים עיקריים:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">🐧</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">Linux - מערכת הפעלה</h4>
                    <p class="text-sm text-gray-600">קוד פתוח, חינמי, חזק ובטוח</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">💻</span>
                  <div>
                    <h4 class="font-semibold text-green-800">טרמינל</h4>
                    <p class="text-sm text-gray-600">ממשק טקסטואלי חזק</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">📁</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">מערכת קבצים</h4>
                    <p class="text-sm text-gray-600">מבנה היררכי מאורגן</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">🔒</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">אבטחה</h4>
                    <p class="text-sm text-gray-600">הרשאות, משתמשים, firewall</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-red-500 text-xl">📦</span>
                  <div>
                    <h4 class="font-semibold text-red-800">חבילות</h4>
                    <p class="text-sm text-gray-600">התקנה וניהול תוכנות</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🛠️ פקודות חשובות:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">ls, cd, pwd</span>
                  <span class="text-sm text-gray-600">ניווט</span>
                </div>
                <p class="text-xs text-gray-500">הצגת קבצים, שינוי תיקייה, נתיב נוכחי</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">cp, mv, rm</span>
                  <span class="text-sm text-gray-600">ניהול קבצים</span>
                </div>
                <p class="text-xs text-gray-500">העתקה, העברה, מחיקה</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">chmod, chown</span>
                  <span class="text-sm text-gray-600">הרשאות</span>
                </div>
                <p class="text-xs text-gray-500">שינוי הרשאות ובעלות</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">apt install</span>
                  <span class="text-sm text-gray-600">התקנה</span>
                </div>
                <p class="text-xs text-gray-500">התקנת חבילות</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">ps, top</span>
                  <span class="text-sm text-gray-600">תהליכים</span>
                </div>
                <p class="text-xs text-gray-500">ניהול וניטור תהליכים</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">🎯 מה למדתם:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">✅ ידע תיאורטי:</h4>
              <ul class="space-y-1">
                <li>• היסטוריה של Linux</li>
                <li>• גרסאות שונות</li>
                <li>• מבנה מערכת קבצים</li>
                <li>• עקרונות אבטחה</li>
                <li>• ניהול משתמשים</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">🛠️ כישורים מעשיים:</h4>
              <ul class="space-y-1">
                <li>• שימוש בטרמינל</li>
                <li>• ניהול קבצים</li>
                <li>• התקנת תוכנות</li>
                <li>• כתיבת סקריפטים</li>
                <li>• ניטור מערכת</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-green-50 p-4 rounded-lg">
          <h3 class="font-bold text-green-800 mb-2">🌟 מה הלאה?</h3>
          <div class="grid md:grid-cols-3 gap-4 text-sm text-green-700">
            <div>
              <h4 class="font-semibold mb-1">🖥️ מעשי:</h4>
              <ul class="space-y-1">
                <li>• התקינו Linux</li>
                <li>• תרגלו פקודות</li>
                <li>• כתבו סקריפטים</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">📚 לימוד:</h4>
              <ul class="space-y-1">
                <li>• רשתות מתקדמות</li>
                <li>• אבטחה מתקדמת</li>
                <li>• פיתוח תוכנות</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">🚀 קריירה:</h4>
              <ul class="space-y-1">
                <li>• מנהל מערכות</li>
                <li>• מפתח תוכנות</li>
                <li>• מומחה אבטחה</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-purple-50 p-4 rounded-lg text-center">
          <h3 class="font-bold text-purple-800 mb-2">🎉 כל הכבוד!</h3>
          <p class="text-gray-700">
            סיימתם שיעור מקיף על Linux! עכשיו יש לכם בסיס מצוין להמשיך ולחקור 
            את העולם המרתק של מערכות הפעלה קוד פתוח. זכרו - הלמידה לעולם לא נגמרת!
          </p>
        </div>
      </div>
    `
  },
  nextSlide: "slide025-advanced-topics"
}); 