import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide16Security = createContentSlide({
  id: "slide016-security",
  title: "אבטחה ב-Linux",
  subtitle: "איך Linux מגן על המערכת",
  icon: "🔐",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-red-800 mb-4">🛡️ אבטחה ב-Linux</h3>
          <p class="text-lg text-gray-700 mb-4">
            Linux ידוע כאחד ממערכות ההפעלה הבטוחות ביותר. בואו נלמד איך!
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">🔒 שכבות אבטחה:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">👤</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">הרשאות משתמשים</h4>
                    <p class="text-sm text-gray-600">כל משתמש יכול לגשת רק לקבצים שלו</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🔐</span>
                  <div>
                    <h4 class="font-semibold text-green-800">הרשאות קבצים</h4>
                    <p class="text-sm text-gray-600">r, w, x לכל קובץ ותיקייה</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">🔥</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">Firewall</h4>
                    <p class="text-sm text-gray-600">חומת אש מובנית</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">🛡️</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">SELinux/AppArmor</h4>
                    <p class="text-sm text-gray-600">אבטחה ברמת המערכת</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-red-500 text-xl">🔑</span>
                  <div>
                    <h4 class="font-semibold text-red-800">הצפנה</h4>
                    <p class="text-sm text-gray-600">הצפנת קבצים ודיסקים</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🛠️ כלי אבטחה:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">ufw</span>
                  <span class="text-sm text-gray-600">חומת אש פשוטה</span>
                </div>
                <p class="text-xs text-gray-500">sudo ufw enable</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">fail2ban</span>
                  <span class="text-sm text-gray-600">חסימת ניסיונות פריצה</span>
                </div>
                <p class="text-xs text-gray-500">בלוק IP אחרי ניסיונות כושלים</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">chmod</span>
                  <span class="text-sm text-gray-600">שינוי הרשאות</span>
                </div>
                <p class="text-xs text-gray-500">chmod 600 file.txt - רק בעלים</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">ssh-keygen</span>
                  <span class="text-sm text-gray-600">מפתחות SSH</span>
                </div>
                <p class="text-xs text-gray-500">התחברות ללא סיסמה</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">gpg</span>
                  <span class="text-sm text-gray-600">הצפנת קבצים</span>
                </div>
                <p class="text-xs text-gray-500">gpg -e file.txt</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-bold text-gray-800 mb-2">💻 דוגמה: הגדרת חומת אש</h3>
          <div class="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
            <div class="text-gray-400"># הפעלת חומת אש</div>
            <div class="text-white">sudo ufw enable</div>
            <div class="text-gray-400"># הגדרת חוקים</div>
            <div class="text-white">sudo ufw allow ssh</div>
            <div class="text-white">sudo ufw allow 80/tcp</div>
            <div class="text-white">sudo ufw allow 443/tcp</div>
            <div class="text-gray-400"># בדיקת סטטוס</div>
            <div class="text-white">sudo ufw status</div>
            <div class="text-gray-400"># הצגת חוקים</div>
            <div class="text-white">sudo ufw status numbered</div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">💡 טיפים לאבטחה:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">✅ טיפים:</h4>
              <ul class="space-y-1">
                <li>• השתמשו בסיסמאות חזקות</li>
                <li>• הפעילו חומת אש</li>
                <li>• עדכנו את המערכת</li>
                <li>• השתמשו במפתחות SSH</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">⚠️ זהירות:</h4>
              <ul class="space-y-1">
                <li>• אל תפתחו פורטים מיותרים</li>
                <li>• אל תתנו הרשאות root</li>
                <li>• בדקו מקורות תוכנות</li>
                <li>• גיבוי קבצים חשובים</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide017-users-groups"
}); 