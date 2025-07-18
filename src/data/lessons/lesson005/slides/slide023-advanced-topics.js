import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide23AdvancedTopics = createContentSlide({
  id: "slide023-advanced-topics",
  title: "נושאים מתקדמים",
  subtitle: "מה הלאה בעולם הרשתות?",
  icon: "🚀",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-purple-800 mb-4">🚀 נושאים מתקדמים - מה הלאה בעולם הרשתות?</h3>
          <p class="text-lg text-gray-700 mb-4">
            עכשיו שאתם יודעים את הבסיס, הנה נושאים מתקדמים שתוכלו לחקור
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">🔧 טכנולוגיות מתקדמות:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">🔗</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">Blockchain</h4>
                    <p class="text-sm text-gray-600">טכנולוגיית הבלוקצ'יין</p>
                    <p class="text-xs text-gray-500">ביטקוין, NFT, חוזים חכמים</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🤖</span>
                  <div>
                    <h4 class="font-semibold text-green-800">AI & Machine Learning</h4>
                    <p class="text-sm text-gray-600">בינה מלאכותית</p>
                    <p class="text-xs text-gray-500">ChatGPT, רכבים אוטונומיים</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">🎮</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">Virtual Reality (VR)</h4>
                    <p class="text-sm text-gray-600">מציאות מדומה</p>
                    <p class="text-xs text-gray-500">Oculus, משחקים, הדרכה</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">🔍</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">Augmented Reality (AR)</h4>
                    <p class="text-sm text-gray-600">מציאות רבודה</p>
                    <p class="text-xs text-gray-500">Pokemon Go, משקפיים חכמים</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🌐 רשתות מתקדמות:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🌍</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Starlink</h4>
                    <p class="text-sm text-gray-600">אינטרנט לוויין</p>
                    <p class="text-xs text-gray-500">לווינים בחלל</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🔒</span>
                  <div>
                    <h4 class="font-semibold text-green-800">VPN & Tor</h4>
                    <p class="text-sm text-gray-600">אנונימיות ברשת</p>
                    <p class="text-xs text-gray-500">פרטיות ואבטחה</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">⚡</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Edge Computing</h4>
                    <p class="text-sm text-gray-600">עיבוד בשוליים</p>
                    <p class="text-xs text-gray-500">מהירות גבוהה</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🔗</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Mesh Networks</h4>
                    <p class="text-sm text-gray-600">רשתות רשת</p>
                    <p class="text-xs text-gray-500">חיבור ישיר בין מכשירים</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-bold text-gray-800 mb-2">🎓 תחומי לימוד מתקדמים:</h3>
          <div class="grid md:grid-cols-3 gap-4 text-sm">
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-blue-800 mb-1">💻 תכנות:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• Python</li>
                <li>• JavaScript</li>
                <li>• Java</li>
                <li>• C++</li>
                <li>• Web Development</li>
              </ul>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-green-800 mb-1">🔒 אבטחה:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• Ethical Hacking</li>
                <li>• Cybersecurity</li>
                <li>• Cryptography</li>
                <li>• Network Security</li>
                <li>• Penetration Testing</li>
              </ul>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-purple-800 mb-1">🌐 רשתות:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• Network Administration</li>
                <li>• CCNA</li>
                <li>• Network Design</li>
                <li>• Cloud Computing</li>
                <li>• DevOps</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">💡 איך להמשיך ללמוד:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">🎓 קורסים:</h4>
              <ul class="space-y-1">
                <li>• קורסים מקוונים</li>
                <li>• YouTube tutorials</li>
                <li>• ספרים טכניים</li>
                <li>• פודקאסטים</li>
                <li>• בלוגים טכנולוגיים</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">🔧 תרגול:</h4>
              <ul class="space-y-1">
                <li>• פרויקטים אישיים</li>
                <li>• משחקי תכנות</li>
                <li>• האקתונים</li>
                <li>• קהילות מקוונות</li>
                <li>• מנטורים</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-blue-50 p-4 rounded-lg text-center">
          <h3 class="font-bold text-blue-800 mb-2">🚀 העתיד שלכם:</h3>
          <p class="text-lg text-blue-700">
            העולם הדיגיטלי מחכה לכם! התחילו לחקור, ללמוד ולגלות את הפלאים של הטכנולוגיה.
          </p>
          <div class="mt-4 text-2xl">
            <span class="text-blue-500">💻</span>
            <span class="text-green-500">🌐</span>
            <span class="text-purple-500">🚀</span>
            <span class="text-orange-500">🎯</span>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide024-career-paths"
}); 