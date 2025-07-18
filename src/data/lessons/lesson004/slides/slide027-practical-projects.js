import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide27PracticalProjects = createContentSlide({
  id: "slide027-practical-projects",
  title: "פרויקטים מעשיים",
  subtitle: "רעיונות לפרויקטים עם Linux",
  icon: "🛠️",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-green-800 mb-4">🛠️ פרויקטים מעשיים עם Linux</h3>
          <p class="text-lg text-gray-700 mb-4">
            הנה רעיונות לפרויקטים מעשיים שתוכלו לבנות עם הידע שלמדתם
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">🏠 פרויקטים ביתיים:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">💾</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">NAS Server</h4>
                    <p class="text-sm text-gray-600">שרת אחסון ביתי</p>
                    <p class="text-xs text-gray-500">דרגת קושי: בינונית</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🎮</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Gaming Server</h4>
                    <p class="text-sm text-gray-600">שרת משחקים</p>
                    <p class="text-xs text-gray-500">דרגת קושי: קלה</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">📺</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">Media Center</h4>
                    <p class="text-sm text-gray-600">מרכז מדיה</p>
                    <p class="text-xs text-gray-500">דרגת קושי: בינונית</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">🔐</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">VPN Server</h4>
                    <p class="text-sm text-gray-600">שרת VPN אישי</p>
                    <p class="text-xs text-gray-500">דרגת קושי: מתקדמת</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🌐 פרויקטי רשת:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🌐</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Web Server</h4>
                    <p class="text-sm text-gray-600">שרת אינטרנט</p>
                    <p class="text-xs text-gray-500">דרגת קושי: בינונית</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📧</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Mail Server</h4>
                    <p class="text-sm text-gray-600">שרת דואר אלקטרוני</p>
                    <p class="text-xs text-gray-500">דרגת קושי: מתקדמת</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🗄️</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Database Server</h4>
                    <p class="text-sm text-gray-600">שרת מסד נתונים</p>
                    <p class="text-xs text-gray-500">דרגת קושי: בינונית</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📊</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Monitoring Server</h4>
                    <p class="text-sm text-gray-600">שרת ניטור</p>
                    <p class="text-xs text-gray-500">דרגת קושי: מתקדמת</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-purple-800 text-lg">🤖 אוטומציה:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-purple-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">📱</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">Home Automation</h4>
                    <p class="text-sm text-gray-600">אוטומציה ביתית</p>
                    <p class="text-xs text-gray-500">דרגת קושי: מתקדמת</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-purple-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">📸</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">Security Camera</h4>
                    <p class="text-sm text-gray-600">מערכת מצלמות אבטחה</p>
                    <p class="text-xs text-gray-500">דרגת קושי: בינונית</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-purple-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">🌡️</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">Weather Station</h4>
                    <p class="text-sm text-gray-600">תחנת מזג אוויר</p>
                    <p class="text-xs text-gray-500">דרגת קושי: בינונית</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-purple-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">🔋</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">Backup System</h4>
                    <p class="text-sm text-gray-600">מערכת גיבוי אוטומטית</p>
                    <p class="text-xs text-gray-500">דרגת קושי: קלה</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-orange-800 text-lg">🎓 פרויקטי למידה:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-orange-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">📚</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">Learning Management</h4>
                    <p class="text-sm text-gray-600">מערכת ניהול למידה</p>
                    <p class="text-xs text-gray-500">דרגת קושי: בינונית</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-orange-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">📊</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">Data Analysis</h4>
                    <p class="text-sm text-gray-600">ניתוח נתונים</p>
                    <p class="text-xs text-gray-500">דרגת קושי: מתקדמת</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-orange-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">🤖</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">Chatbot</h4>
                    <p class="text-sm text-gray-600">בוט שיחה</p>
                    <p class="text-xs text-gray-500">דרגת קושי: בינונית</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-orange-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">🎮</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">Game Server</h4>
                    <p class="text-sm text-gray-600">שרת משחקים מותאם</p>
                    <p class="text-xs text-gray-500">דרגת קושי: קלה</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">💡 טיפים לפרויקטים:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">🚀 התחלה:</h4>
              <ul class="space-y-1">
                <li>• התחילו בפרויקטים קטנים</li>
                <li>• תכננו מראש</li>
                <li>• השתמשו בגיבוי</li>
                <li>• תיעדו את התהליך</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">🛠️ כלים:</h4>
              <ul class="space-y-1">
                <li>• Raspberry Pi לפרויקטים קטנים</li>
                <li>• Virtual Machine לניסויים</li>
                <li>• Docker לבדיקות</li>
                <li>• Git לתיעוד קוד</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide028-resources"
}); 