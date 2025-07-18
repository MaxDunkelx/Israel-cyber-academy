import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide8FileCommands = createContentSlide({
  id: "slide008-file-commands",
  title: "פקודות לניהול קבצים",
  subtitle: "איך ליצור, להעתיק, להעביר ולמחוק קבצים",
  icon: "📝",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-purple-800 mb-4">🛠️ פקודות לניהול קבצים</h3>
          <p class="text-lg text-gray-700 mb-4">
            עכשיו נלמד איך ליצור, להעתיק, להעביר ולמחוק קבצים ותיקיות
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">📁 יצירה וניהול:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-blue-600">mkdir folder_name</span>
                  <span class="text-sm text-gray-600">יצירת תיקייה</span>
                </div>
                <p class="text-xs text-gray-500">דוגמה: mkdir my_folder</p>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-blue-600">touch file_name</span>
                  <span class="text-sm text-gray-600">יצירת קובץ ריק</span>
                </div>
                <p class="text-xs text-gray-500">דוגמה: touch my_file.txt</p>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-blue-600">rm file_name</span>
                  <span class="text-sm text-gray-600">מחיקת קובץ</span>
                </div>
                <p class="text-xs text-gray-500">דוגמה: rm old_file.txt</p>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-blue-600">rmdir folder_name</span>
                  <span class="text-sm text-gray-600">מחיקת תיקייה ריקה</span>
                </div>
                <p class="text-xs text-gray-500">דוגמה: rmdir empty_folder</p>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-blue-600">rm -rf folder_name</span>
                  <span class="text-sm text-gray-600">מחיקת תיקייה עם תוכן</span>
                </div>
                <p class="text-xs text-gray-500">⚠️ זהירות! מוחק הכל!</p>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">📋 העתקה והעברה:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">cp source destination</span>
                  <span class="text-sm text-gray-600">העתקת קובץ</span>
                </div>
                <p class="text-xs text-gray-500">דוגמה: cp file.txt backup/</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">cp -r folder destination</span>
                  <span class="text-sm text-gray-600">העתקת תיקייה</span>
                </div>
                <p class="text-xs text-gray-500">דוגמה: cp -r my_folder backup/</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">mv source destination</span>
                  <span class="text-sm text-gray-600">העברת/שינוי שם</span>
                </div>
                <p class="text-xs text-gray-500">דוגמה: mv old_name.txt new_name.txt</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">ln -s target link_name</span>
                  <span class="text-sm text-gray-600">יצירת קיצור דרך</span>
                </div>
                <p class="text-xs text-gray-500">דוגמה: ln -s /usr/bin/python3 python</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">⚠️ טיפים חשובים:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">🔒 זהירות:</h4>
              <ul class="space-y-1">
                <li>• rm -rf מוחק הכל ללא אישור</li>
                <li>• תמיד בדקו מה אתם מוחקים</li>
                <li>• השתמשו ב-Tab להשלמה אוטומטית</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">💡 טיפים:</h4>
              <ul class="space-y-1">
                <li>• השתמשו ב-ls לפני מחיקה</li>
                <li>• בדקו נתיבים עם pwd</li>
                <li>• השתמשו ב-* לקבצים רבים</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide009-file-commands-game"
}); 