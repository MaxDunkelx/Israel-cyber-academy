import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide17UsersGroups = createContentSlide({
  id: "slide017-users-groups",
  title: "ניהול משתמשים וקבוצות",
  subtitle: "איך לנהל משתמשים ב-Linux",
  icon: "👥",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-blue-800 mb-4">👥 ניהול משתמשים וקבוצות</h3>
          <p class="text-lg text-gray-700 mb-4">
            Linux מאפשר ניהול מתקדם של משתמשים וקבוצות עם הרשאות שונות
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">👤 סוגי משתמשים:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-red-500 text-xl">👑</span>
                  <div>
                    <h4 class="font-semibold text-red-800">Root (מנהל)</h4>
                    <p class="text-sm text-gray-600">המשתמש החזק ביותר, יכול הכל</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">👤</span>
                  <div>
                    <h4 class="font-semibold text-green-800">משתמש רגיל</h4>
                    <p class="text-sm text-gray-600">משתמש עם הרשאות מוגבלות</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">🔧</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">משתמש שירות</h4>
                    <p class="text-sm text-gray-600">לשירותים ותוכנות</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">🚫</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">משתמש נעול</h4>
                    <p class="text-sm text-gray-600">לא יכול להתחבר</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🛠️ פקודות לניהול:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">useradd</span>
                  <span class="text-sm text-gray-600">יצירת משתמש</span>
                </div>
                <p class="text-xs text-gray-500">sudo useradd -m username</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">passwd</span>
                  <span class="text-sm text-gray-600">שינוי סיסמה</span>
                </div>
                <p class="text-xs text-gray-500">sudo passwd username</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">usermod</span>
                  <span class="text-sm text-gray-600">עריכת משתמש</span>
                </div>
                <p class="text-xs text-gray-500">sudo usermod -aG sudo username</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">userdel</span>
                  <span class="text-sm text-gray-600">מחיקת משתמש</span>
                </div>
                <p class="text-xs text-gray-500">sudo userdel -r username</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">groupadd</span>
                  <span class="text-sm text-gray-600">יצירת קבוצה</span>
                </div>
                <p class="text-xs text-gray-500">sudo groupadd developers</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-bold text-gray-800 mb-2">💻 דוגמה: יצירת משתמש חדש</h3>
          <div class="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
            <div class="text-gray-400"># יצירת משתמש חדש</div>
            <div class="text-white">sudo useradd -m -s /bin/bash john</div>
            <div class="text-gray-400"># הגדרת סיסמה</div>
            <div class="text-white">sudo passwd john</div>
            <div class="text-gray-400"># הוספה לקבוצת sudo</div>
            <div class="text-white">sudo usermod -aG sudo john</div>
            <div class="text-gray-400"># יצירת קבוצה</div>
            <div class="text-white">sudo groupadd developers</div>
            <div class="text-gray-400"># הוספת משתמש לקבוצה</div>
            <div class="text-white">sudo usermod -aG developers john</div>
            <div class="text-gray-400"># בדיקת משתמשים</div>
            <div class="text-white">cat /etc/passwd | grep john</div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">💡 טיפים לניהול משתמשים:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">✅ טיפים:</h4>
              <ul class="space-y-1">
                <li>• השתמשו בסיסמאות חזקות</li>
                <li>• צרו קבוצות לפי תפקידים</li>
                <li>• בדקו הרשאות קבוע</li>
                <li>• גיבוי רשימת משתמשים</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">⚠️ זהירות:</h4>
              <ul class="space-y-1">
                <li>• אל תמחקו משתמש root</li>
                <li>• בדקו לפני מחיקת משתמש</li>
                <li>• אל תתנו הרשאות מיותרות</li>
                <li>• שמרו על רשימת משתמשים</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide018-shell-scripting"
}); 