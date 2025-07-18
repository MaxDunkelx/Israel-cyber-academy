import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide10Permissions = createContentSlide({
  id: "slide010-permissions",
  title: "הרשאות קבצים",
  subtitle: "איך Linux מגן על קבצים ותיקיות",
  icon: "🔒",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-red-800 mb-4">🔐 הרשאות קבצים ב-Linux</h3>
          <p class="text-lg text-gray-700 mb-4">
            Linux משתמש במערכת הרשאות מתוחכמת כדי להגן על קבצים ותיקיות
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">👥 סוגי הרשאות:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3 mb-2">
                  <span class="text-blue-500 text-xl">👤</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">בעלים (Owner)</h4>
                    <p class="text-sm text-gray-600">המשתמש שיצר את הקובץ</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3 mb-2">
                  <span class="text-green-500 text-xl">👥</span>
                  <div>
                    <h4 class="font-semibold text-green-800">קבוצה (Group)</h4>
                    <p class="text-sm text-gray-600">קבוצת משתמשים עם הרשאות מיוחדות</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3 mb-2">
                  <span class="text-purple-500 text-xl">🌍</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">כל השאר (Others)</h4>
                    <p class="text-sm text-gray-600">כל שאר המשתמשים במערכת</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">📋 סוגי פעולות:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">r (Read)</span>
                  <span class="text-sm text-gray-600">קריאה</span>
                </div>
                <p class="text-xs text-gray-500">אפשר לקרוא את הקובץ</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">w (Write)</span>
                  <span class="text-sm text-gray-600">כתיבה</span>
                </div>
                <p class="text-xs text-gray-500">אפשר לשנות את הקובץ</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">x (Execute)</span>
                  <span class="text-sm text-gray-600">הרצה</span>
                </div>
                <p class="text-xs text-gray-500">אפשר להריץ את הקובץ</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-bold text-gray-800 mb-2">🔍 דוגמה להרשאות:</h3>
          <div class="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
            <div class="text-gray-400">$ ls -la file.txt</div>
            <div class="text-white">-rw-r--r-- 1 user group 1234 Jan 1 12:00 file.txt</div>
            <div class="text-gray-400 mt-2">הסבר:</div>
            <div class="text-blue-400">-rw-r--r--</div>
            <div class="text-xs text-gray-400 ml-4">
              <div>👤 rw- (בעלים: קריאה + כתיבה)</div>
              <div>👥 r-- (קבוצה: קריאה בלבד)</div>
              <div>🌍 r-- (כל השאר: קריאה בלבד)</div>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">🛠️ פקודות להרשאות:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">chmod - שינוי הרשאות:</h4>
              <ul class="space-y-1">
                <li>• chmod 755 file.txt</li>
                <li>• chmod +x script.sh</li>
                <li>• chmod -w file.txt</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">chown - שינוי בעלות:</h4>
              <ul class="space-y-1">
                <li>• chown user file.txt</li>
                <li>• chown user:group file.txt</li>
                <li>• chown -R user folder/</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide011-package-manager"
}); 