import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide13Processes = createContentSlide({
  id: "slide013-processes",
  title: "ניהול תהליכים",
  subtitle: "איך Linux מנהל תוכנות רצות",
  icon: "⚙️",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-purple-800 mb-4">🔄 תהליכים ב-Linux</h3>
          <p class="text-lg text-gray-700 mb-4">
            כל תוכנה שרצה ב-Linux היא תהליך. בואו נלמד איך לנהל אותם!
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">🎯 מה זה תהליך?</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-blue-500 text-xl">🖥️</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">תוכנה רצה</h4>
                    <p class="text-sm text-gray-600">כל תוכנה שרצה במחשב</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-green-500 text-xl">🆔</span>
                  <div>
                    <h4 class="font-semibold text-green-800">מספר תהליך (PID)</h4>
                    <p class="text-sm text-gray-600">מספר ייחודי לכל תהליך</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-purple-500 text-xl">👤</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">בעלים</h4>
                    <p class="text-sm text-gray-600">המשתמש שהריץ את התהליך</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-orange-500 text-xl">💾</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">שימוש בזיכרון</h4>
                    <p class="text-sm text-gray-600">כמה זיכרון התהליך צורך</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">📋 פקודות לניהול תהליכים:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">ps</span>
                  <span class="text-sm text-gray-600">הצגת תהליכים</span>
                </div>
                <p class="text-xs text-gray-500">ps aux - כל התהליכים</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">top</span>
                  <span class="text-sm text-gray-600">ניטור בזמן אמת</span>
                </div>
                <p class="text-xs text-gray-500">ממשק אינטראקטיבי</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">kill PID</span>
                  <span class="text-sm text-gray-600">עצירת תהליך</span>
                </div>
                <p class="text-xs text-gray-500">kill -9 PID - עצירה כפויה</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">nice</span>
                  <span class="text-sm text-gray-600">שינוי עדיפות</span>
                </div>
                <p class="text-xs text-gray-500">nice -n 10 command</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">bg/fg</span>
                  <span class="text-sm text-gray-600">ניהול עבודות</span>
                </div>
                <p class="text-xs text-gray-500">הרצה ברקע/קדמה</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-bold text-gray-800 mb-2">💻 דוגמה: הצגת תהליכים</h3>
          <div class="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
            <div class="text-gray-400">$ ps aux | head -10</div>
            <div class="text-white">USER PID %CPU %MEM VSZ RSS TTY STAT START TIME COMMAND</div>
            <div class="text-gray-400">root 1 0.0 0.1 225940 9428 ? Ss 09:00 0:01 /sbin/init</div>
            <div class="text-gray-400">root 2 0.0 0.0 0 0 ? S 09:00 0:00 [kthreadd]</div>
            <div class="text-gray-400">root 3 0.0 0.0 0 0 ? I< 09:00 0:00 [rcu_gp]</div>
            <div class="text-gray-400">user 1234 2.1 1.5 1234567 89012 ? S 10:30 0:15 firefox</div>
            <div class="text-gray-400">user 5678 0.5 0.8 987654 45678 ? S 10:35 0:08 chrome</div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">💡 טיפים לניהול תהליכים:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">✅ טיפים:</h4>
              <ul class="space-y-1">
                <li>• השתמשו ב-top לניטור בזמן אמת</li>
                <li>• בדקו PID לפני kill</li>
                <li>• השתמשו ב-htop לממשק יפה יותר</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">⚠️ זהירות:</h4>
              <ul class="space-y-1">
                <li>• אל תעצרו תהליכי מערכת</li>
                <li>• השתמשו ב-kill -9 רק כמוצא אחרון</li>
                <li>• בדקו מה התהליך עושה לפני עצירה</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide014-system-monitoring"
}); 