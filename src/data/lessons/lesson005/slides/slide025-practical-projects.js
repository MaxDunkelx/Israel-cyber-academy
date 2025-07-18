import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide25PracticalProjects = createContentSlide({
  id: "slide025-practical-projects",
  title: "פרויקטים מעשיים",
  subtitle: "איך לתרגל את מה שלמדנו?",
  icon: "🔧",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-green-800 mb-4">🔧 פרויקטים מעשיים - איך לתרגל את מה שלמדנו?</h3>
          <p class="text-lg text-gray-700 mb-4">
            הדרך הטובה ביותר ללמוד היא לתרגל! הנה פרויקטים מעשיים שתוכלו לבצע
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">🏠 פרויקטים בבית:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">🏠</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">בית חכם</h4>
                    <p class="text-sm text-gray-600">הגדרת מכשירים חכמים</p>
                    <p class="text-xs text-gray-500">תאורה, חימום, אבטחה</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📡</span>
                  <div>
                    <h4 class="font-semibold text-green-800">הגדרת WiFi</h4>
                    <p class="text-sm text-gray-600">הגדרת רשת ביתית בטוחה</p>
                    <p class="text-xs text-gray-500">סיסמה חזקה, הצפנה</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">💾</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">שרת ביתי</h4>
                    <p class="text-sm text-gray-600">הקמת שרת קטן בבית</p>
                    <p class="text-xs text-gray-500">Raspberry Pi, NAS</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">🔒</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">אבטחה דיגיטלית</h4>
                    <p class="text-sm text-gray-600">הגנה על המחשבים</p>
                    <p class="text-xs text-gray-500">אנטי-וירוס, גיבוי</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">💻 פרויקטים דיגיטליים:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🌐</span>
                  <div>
                    <h4 class="font-semibold text-green-800">אתר אישי</h4>
                    <p class="text-sm text-gray-600">בניית אתר אינטרנט</p>
                    <p class="text-xs text-gray-500">HTML, CSS, JavaScript</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📱</span>
                  <div>
                    <h4 class="font-semibold text-green-800">אפליקציה</h4>
                    <p class="text-sm text-gray-600">פיתוח אפליקציה</p>
                    <p class="text-xs text-gray-500">App Inventor, Thunkable</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🎮</span>
                  <div>
                    <h4 class="font-semibold text-green-800">משחק מחשב</h4>
                    <p class="text-sm text-gray-600">יצירת משחק פשוט</p>
                    <p class="text-xs text-gray-500">Scratch, Python</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🤖</span>
                  <div>
                    <h4 class="font-semibold text-green-800">בוט צ'אט</h4>
                    <p class="text-sm text-gray-600">יצירת בוט חכם</p>
                    <p class="text-xs text-gray-500">Discord, Telegram</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-bold text-gray-800 mb-2">🔧 כלים מומלצים:</h3>
          <div class="grid md:grid-cols-3 gap-4 text-sm">
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-blue-800 mb-1">💻 תכנות:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• Scratch - למתחילים</li>
                <li>• Python - כללי</li>
                <li>• JavaScript - אתרים</li>
                <li>• HTML/CSS - עיצוב</li>
                <li>• Arduino - אלקטרוניקה</li>
              </ul>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-green-800 mb-1">🌐 רשתות:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• Wireshark - ניתוח תעבורה</li>
                <li>• Packet Tracer - סימולציה</li>
                <li>• Fiddler - ניתוח HTTP</li>
                <li>• nmap - סריקת רשתות</li>
                <li>• PuTTY - חיבור SSH</li>
              </ul>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-purple-800 mb-1">🔒 אבטחה:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• Kali Linux - כלי האקינג</li>
                <li>• Metasploit - בדיקות חדירה</li>
                <li>• Burp Suite - בדיקת אתרים</li>
                <li>• John the Ripper - פענוח סיסמאות</li>
                <li>• Aircrack-ng - אבטחת WiFi</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">💡 רעיונות לפרויקטים מתקדמים:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">🏠 IoT Projects:</h4>
              <ul class="space-y-1">
                <li>• מערכת השקיה חכמה</li>
                <li>• תאורה אוטומטית</li>
                <li>• מערכת אבטחה ביתית</li>
                <li>• מד חום דיגיטלי</li>
                <li>• רובוט ניקוי</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">🌐 Web Projects:</h4>
              <ul class="space-y-1">
                <li>• בלוג אישי</li>
                <li>• חנות מקוונת</li>
                <li>• רשת חברתית</li>
                <li>• מערכת ניהול</li>
                <li>• משחק מקוון</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-blue-50 p-4 rounded-lg text-center">
          <h3 class="font-bold text-blue-800 mb-2">🚀 איך להתחיל:</h3>
          <div class="grid md:grid-cols-4 gap-4 text-sm">
            <div class="bg-white p-3 rounded-lg text-center">
              <h4 class="font-semibold text-blue-800 mb-1">1️⃣ בחרו פרויקט</h4>
              <p class="text-xs text-gray-600">משהו שמעניין אתכם</p>
            </div>
            <div class="bg-white p-3 rounded-lg text-center">
              <h4 class="font-semibold text-green-800 mb-1">2️⃣ תכננו</h4>
              <p class="text-xs text-gray-600">ציירו ותכננו מראש</p>
            </div>
            <div class="bg-white p-3 rounded-lg text-center">
              <h4 class="font-semibold text-purple-800 mb-1">3️⃣ התחילו קטן</h4>
              <p class="text-xs text-gray-600">בנו גרסה פשוטה קודם</p>
            </div>
            <div class="bg-white p-3 rounded-lg text-center">
              <h4 class="font-semibold text-orange-800 mb-1">4️⃣ שיפרו</h4>
              <p class="text-xs text-gray-600">הוסיפו תכונות חדשות</p>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-lg text-blue-700 font-semibold">הכי חשוב - תהנו מהתהליך! 🎉</p>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide026-resources"
}); 