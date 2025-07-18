import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide26CareerPaths = createContentSlide({
  id: "slide026-career-paths",
  title: "דרכי קריירה ב-Linux",
  subtitle: "איך Linux יכול לעזור בקריירה",
  icon: "💼",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-blue-800 mb-4">💼 דרכי קריירה ב-Linux</h3>
          <p class="text-lg text-gray-700 mb-4">
            Linux הוא הבסיס למגוון רחב של קריירות מרתקות בטכנולוגיה
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">🖥️ ניהול מערכות:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">👨‍💻</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">System Administrator</h4>
                    <p class="text-sm text-gray-600">ניהול שרתים ומערכות</p>
                    <p class="text-xs text-gray-500">משכורת: ₪15,000-25,000</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">☁️</span>
                  <div>
                    <h4 class="font-semibold text-green-800">DevOps Engineer</h4>
                    <p class="text-sm text-gray-600">אוטומציה וניהול תשתיות</p>
                    <p class="text-xs text-gray-500">משכורת: ₪20,000-35,000</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">🐳</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">Container Specialist</h4>
                    <p class="text-sm text-gray-600">Docker, Kubernetes</p>
                    <p class="text-xs text-gray-500">משכורת: ₪18,000-30,000</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">🔧</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">Site Reliability Engineer</h4>
                    <p class="text-sm text-gray-600">אמינות ואבטחת מערכות</p>
                    <p class="text-xs text-gray-500">משכורת: ₪25,000-40,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🔒 אבטחת מידע:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🛡️</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Security Analyst</h4>
                    <p class="text-sm text-gray-600">ניתוח איומים ואבטחה</p>
                    <p class="text-xs text-gray-500">משכורת: ₪18,000-30,000</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🔍</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Penetration Tester</h4>
                    <p class="text-sm text-gray-600">בדיקות חדירה ואבטחה</p>
                    <p class="text-xs text-gray-500">משכורת: ₪20,000-35,000</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🔐</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Security Engineer</h4>
                    <p class="text-sm text-gray-600">בניית מערכות אבטחה</p>
                    <p class="text-xs text-gray-500">משכורת: ₪22,000-38,000</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🚨</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Incident Responder</h4>
                    <p class="text-sm text-gray-600">תגובה לאירועי אבטחה</p>
                    <p class="text-xs text-gray-500">משכורת: ₪20,000-32,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-purple-800 text-lg">💻 פיתוח תוכנה:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-purple-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">🐍</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">Python Developer</h4>
                    <p class="text-sm text-gray-600">פיתוח עם Python</p>
                    <p class="text-xs text-gray-500">משכורת: ₪18,000-35,000</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-purple-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">☕</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">Java Developer</h4>
                    <p class="text-sm text-gray-600">פיתוח עם Java</p>
                    <p class="text-xs text-gray-500">משכורת: ₪20,000-40,000</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-purple-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">⚡</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">Backend Developer</h4>
                    <p class="text-sm text-gray-600">פיתוח שרתים</p>
                    <p class="text-xs text-gray-500">משכורת: ₪22,000-45,000</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-purple-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">🔧</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">Embedded Developer</h4>
                    <p class="text-sm text-gray-600">פיתוח מערכות מוטמעות</p>
                    <p class="text-xs text-gray-500">משכורת: ₪25,000-50,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-orange-800 text-lg">🌐 רשתות ותקשורת:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-orange-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">🌐</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">Network Engineer</h4>
                    <p class="text-sm text-gray-600">תכנון וניהול רשתות</p>
                    <p class="text-xs text-gray-500">משכורת: ₪18,000-35,000</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-orange-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">☁️</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">Cloud Engineer</h4>
                    <p class="text-sm text-gray-600">AWS, Azure, GCP</p>
                    <p class="text-xs text-gray-500">משכורת: ₪25,000-45,000</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-orange-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">📡</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">Telecommunications</h4>
                    <p class="text-sm text-gray-600">תקשורת וטלקום</p>
                    <p class="text-xs text-gray-500">משכורת: ₪20,000-40,000</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-orange-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">🔧</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">Infrastructure Engineer</h4>
                    <p class="text-sm text-gray-600">תשתיות IT</p>
                    <p class="text-xs text-gray-500">משכורת: ₪22,000-42,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">💡 טיפים לקריירה:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">📚 למידה:</h4>
              <ul class="space-y-1">
                <li>• השתתפו בקורסים מקצועיים</li>
                <li>• קראו ספרים טכניים</li>
                <li>• עקבו אחר בלוגים מקצועיים</li>
                <li>• השתתפו בכנסים</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">🛠️ מעשי:</h4>
              <ul class="space-y-1">
                <li>• בנו פרויקטים אישיים</li>
                <li>• תרמו לקוד פתוח</li>
                <li>• צרו תיק עבודות</li>
                <li>• התחברו לאנשי מקצוע</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide027-practical-projects"
}); 