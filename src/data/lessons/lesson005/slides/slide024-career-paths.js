import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide24CareerPaths = createContentSlide({
  id: "slide024-career-paths",
  title: "מסלולי קריירה",
  subtitle: "איך להפוך למומחי רשתות?",
  icon: "💼",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-blue-800 mb-4">💼 מסלולי קריירה - איך להפוך למומחי רשתות?</h3>
          <p class="text-lg text-gray-700 mb-4">
            עולם הטכנולוגיה מציע המון אפשרויות קריירה מרתקות. הנה כמה מסלולים שתוכלו לשקול
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">💻 מקצועות פיתוח:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">💻</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">מפתח תוכנה</h4>
                    <p class="text-sm text-gray-600">כתיבת קוד ותוכנות</p>
                    <p class="text-xs text-gray-500">Python, Java, JavaScript</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🌐</span>
                  <div>
                    <h4 class="font-semibold text-green-800">מפתח אתרים</h4>
                    <p class="text-sm text-gray-600">בניית אתרי אינטרנט</p>
                    <p class="text-xs text-gray-500">HTML, CSS, JavaScript</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">📱</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">מפתח אפליקציות</h4>
                    <p class="text-sm text-gray-600">אפליקציות לטלפונים</p>
                    <p class="text-xs text-gray-500">iOS, Android, React Native</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">🎮</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">מפתח משחקים</h4>
                    <p class="text-sm text-gray-600">יצירת משחקי מחשב</p>
                    <p class="text-xs text-gray-500">Unity, Unreal Engine</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🔒 מקצועות אבטחה:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🛡️</span>
                  <div>
                    <h4 class="font-semibold text-green-800">מומחה אבטחת מידע</h4>
                    <p class="text-sm text-gray-600">הגנה על מערכות מחשב</p>
                    <p class="text-xs text-gray-500">Cybersecurity</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🔍</span>
                  <div>
                    <h4 class="font-semibold text-green-800">האקר אתי</h4>
                    <p class="text-sm text-gray-600">בדיקת אבטחה של מערכות</p>
                    <p class="text-xs text-gray-500">Penetration Testing</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🔐</span>
                  <div>
                    <h4 class="font-semibold text-green-800">מומחה הצפנה</h4>
                    <p class="text-sm text-gray-600">פיתוח אלגוריתמי הצפנה</p>
                    <p class="text-xs text-gray-500">Cryptography</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🕵️</span>
                  <div>
                    <h4 class="font-semibold text-green-800">חוקר דיגיטלי</h4>
                    <p class="text-sm text-gray-600">חקירת פשעים דיגיטליים</p>
                    <p class="text-xs text-gray-500">Digital Forensics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-bold text-gray-800 mb-2">🌐 מקצועות רשתות:</h3>
          <div class="grid md:grid-cols-3 gap-4 text-sm">
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-blue-800 mb-1">🔧 מנהל רשתות:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• תחזוקת רשתות</li>
                <li>• הגדרת שרתים</li>
                <li>• פתרון בעיות</li>
                <li>• ניהול אבטחה</li>
                <li>• תכנון רשתות</li>
              </ul>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-green-800 mb-1">☁️ מומחה ענן:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• AWS, Azure, Google Cloud</li>
                <li>• ניהול שרתים</li>
                <li>• ארכיטקטורת ענן</li>
                <li>• DevOps</li>
                <li>• אוטומציה</li>
              </ul>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-purple-800 mb-1">📡 מהנדס תקשורת:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• תכנון תשתיות</li>
                <li>• פרוטוקולי תקשורת</li>
                <li>• אופטיקה</li>
                <li>• תקשורת לוויין</li>
                <li>• רשתות 5G/6G</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">🎓 איך להתחיל:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">📚 לימודים:</h4>
              <ul class="space-y-1">
                <li>• קורסים מקוונים</li>
                <li>• תעודות מקצועיות</li>
                <li>• לימודים אקדמיים</li>
                <li>• סדנאות מעשיות</li>
                <li>• מנטורינג</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">💼 ניסיון:</h4>
              <ul class="space-y-1">
                <li>• פרויקטים אישיים</li>
                <li>• התמחויות</li>
                <li>• עבודה חלקית</li>
                <li>• התנדבות</li>
                <li>• בניית תיק עבודות</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-blue-50 p-4 rounded-lg text-center">
          <h3 class="font-bold text-blue-800 mb-2">🌟 תעודות מקצועיות מומלצות:</h3>
          <div class="grid md:grid-cols-4 gap-4 text-sm">
            <div class="bg-white p-3 rounded-lg text-center">
              <h4 class="font-semibold text-blue-800 mb-1">🔧 CCNA</h4>
              <p class="text-xs text-gray-600">Cisco Certified Network Associate</p>
            </div>
            <div class="bg-white p-3 rounded-lg text-center">
              <h4 class="font-semibold text-green-800 mb-1">🔒 CompTIA Security+</h4>
              <p class="text-xs text-gray-600">אבטחת מידע</p>
            </div>
            <div class="bg-white p-3 rounded-lg text-center">
              <h4 class="font-semibold text-purple-800 mb-1">☁️ AWS Certified</h4>
              <p class="text-xs text-gray-600">מומחה ענן</p>
            </div>
            <div class="bg-white p-3 rounded-lg text-center">
              <h4 class="font-semibold text-orange-800 mb-1">💻 Microsoft Certified</h4>
              <p class="text-xs text-gray-600">מומחה Microsoft</p>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-lg text-blue-700 font-semibold">העתיד שלכם מתחיל כאן! 🚀</p>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide025-practical-projects"
}); 