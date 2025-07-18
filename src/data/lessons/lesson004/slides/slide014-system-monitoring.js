import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide14SystemMonitoring = createContentSlide({
  id: "slide014-system-monitoring",
  title: "ניטור מערכת",
  subtitle: "איך לבדוק ביצועי המחשב",
  icon: "📊",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-green-800 mb-4">📈 ניטור מערכת ב-Linux</h3>
          <p class="text-lg text-gray-700 mb-4">
            נלמד איך לבדוק ביצועי המחשב, שימוש בזיכרון, מעבד ודיסק
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">🔍 מה ניטור:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">🖥️</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">שימוש במעבד (CPU)</h4>
                    <p class="text-sm text-gray-600">כמה המעבד עובד</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">💾</span>
                  <div>
                    <h4 class="font-semibold text-green-800">שימוש בזיכרון (RAM)</h4>
                    <p class="text-sm text-gray-600">כמה זיכרון בשימוש</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">💿</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">שימוש בדיסק</h4>
                    <p class="text-sm text-gray-600">כמה מקום פנוי</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">🌐</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">רשת</h4>
                    <p class="text-sm text-gray-600">תעבורת רשת</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-red-500 text-xl">🌡️</span>
                  <div>
                    <h4 class="font-semibold text-red-800">טמפרטורה</h4>
                    <p class="text-sm text-gray-600">חום המעבד</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🛠️ כלי ניטור:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">htop</span>
                  <span class="text-sm text-gray-600">ניטור מתקדם</span>
                </div>
                <p class="text-xs text-gray-500">ממשק יפה עם צבעים</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">free</span>
                  <span class="text-sm text-gray-600">זיכרון</span>
                </div>
                <p class="text-xs text-gray-500">free -h - בגיגה-בייט</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">df</span>
                  <span class="text-sm text-gray-600">דיסק</span>
                </div>
                <p class="text-xs text-gray-500">df -h - בגיגה-בייט</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">iostat</span>
                  <span class="text-sm text-gray-600">ביצועי דיסק</span>
                </div>
                <p class="text-xs text-gray-500">iostat 1 - כל שנייה</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">sensors</span>
                  <span class="text-sm text-gray-600">טמפרטורה</span>
                </div>
                <p class="text-xs text-gray-500">חום המעבד והדיסק</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-bold text-gray-800 mb-2">💻 דוגמה: ניטור מערכת</h3>
          <div class="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
            <div class="text-gray-400">$ free -h</div>
            <div class="text-white">              total        used        free      shared  buff/cache   available</div>
            <div class="text-gray-400">Mem:           15Gi       8.2Gi       2.1Gi       1.2Gi       4.7Gi       5.8Gi</div>
            <div class="text-gray-400">Swap:         2.0Gi       0.0Gi       2.0Gi</div>
            <div class="text-gray-400 mt-2">$ df -h</div>
            <div class="text-white">Filesystem      Size  Used Avail Use% Mounted on</div>
            <div class="text-gray-400">/dev/sda1      234G  156G   66G  71% /</div>
            <div class="text-gray-400">tmpfs          7.8G     0  7.8G   0% /dev/shm</div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">💡 טיפים לניטור:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">✅ טיפים:</h4>
              <ul class="space-y-1">
                <li>• השתמשו ב-htop לניטור כללי</li>
                <li>• free -h לזיכרון בגיגה-בייט</li>
                <li>• df -h לדיסק בגיגה-בייט</li>
                <li>• iostat לביצועי דיסק</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">⚠️ סימני אזהרה:</h4>
              <ul class="space-y-1">
                <li>• זיכרון > 90% - בעיה</li>
                <li>• דיסק > 95% - בעיה</li>
                <li>• CPU > 100% - עומס</li>
                <li>• טמפרטורה > 80°C - חם מדי</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide015-linux-simulator"
}); 