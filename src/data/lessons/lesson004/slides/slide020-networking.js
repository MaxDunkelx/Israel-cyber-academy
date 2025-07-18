import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide20Networking = createContentSlide({
  id: "slide020-networking",
  title: "רשתות ב-Linux",
  subtitle: "איך Linux מתחבר לרשת",
  icon: "🌐",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-blue-800 mb-4">🌐 רשתות ב-Linux</h3>
          <p class="text-lg text-gray-700 mb-4">
            Linux מצוין לניהול רשתות. בואו נלמד איך להתחבר ולנהל רשתות!
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">🔗 סוגי חיבורים:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">📡</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">WiFi</h4>
                    <p class="text-sm text-gray-600">חיבור אלחוטי</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🔌</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Ethernet</h4>
                    <p class="text-sm text-gray-600">חיבור כבל</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">📱</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">Mobile</h4>
                    <p class="text-sm text-gray-600">חיבור סלולרי</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">🔄</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">VPN</h4>
                    <p class="text-sm text-gray-600">רשת פרטית וירטואלית</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🛠️ פקודות רשת:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">ip addr</span>
                  <span class="text-sm text-gray-600">כתובות IP</span>
                </div>
                <p class="text-xs text-gray-500">הצגת כתובות רשת</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">ping</span>
                  <span class="text-sm text-gray-600">בדיקת חיבור</span>
                </div>
                <p class="text-xs text-gray-500">ping google.com</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">netstat</span>
                  <span class="text-sm text-gray-600">חיבורים פעילים</span>
                </div>
                <p class="text-xs text-gray-500">netstat -tuln</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">ssh</span>
                  <span class="text-sm text-gray-600">חיבור מרחוק</span>
                </div>
                <p class="text-xs text-gray-500">ssh user@server.com</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">wget/curl</span>
                  <span class="text-sm text-gray-600">הורדת קבצים</span>
                </div>
                <p class="text-xs text-gray-500">wget http://example.com</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-bold text-gray-800 mb-2">💻 דוגמה: בדיקת רשת</h3>
          <div class="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
            <div class="text-gray-400"># בדיקת כתובות IP</div>
            <div class="text-white">ip addr show</div>
            <div class="text-gray-400"># בדיקת חיבור לאינטרנט</div>
            <div class="text-white">ping -c 4 google.com</div>
            <div class="text-gray-400"># בדיקת חיבורים פעילים</div>
            <div class="text-white">netstat -tuln | grep :80</div>
            <div class="text-gray-400"># בדיקת DNS</div>
            <div class="text-white">nslookup google.com</div>
            <div class="text-gray-400"># בדיקת נתיב</div>
            <div class="text-white">traceroute google.com</div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">💡 טיפים לרשתות:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">✅ טיפים:</h4>
              <ul class="space-y-1">
                <li>• השתמשו ב-ping לבדיקת חיבור</li>
                <li>• בדקו כתובות IP עם ip addr</li>
                <li>• השתמשו ב-ssh לחיבורים בטוחים</li>
                <li>• בדקו פורטים עם netstat</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">⚠️ זהירות:</h4>
              <ul class="space-y-1">
                <li>• אל תפתחו פורטים מיותרים</li>
                <li>• השתמשו ב-firewall</li>
                <li>• בדקו חיבורים לא מוכרים</li>
                <li>• גיבוי לפני שינויים ברשת</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide021-final-quiz"
}); 