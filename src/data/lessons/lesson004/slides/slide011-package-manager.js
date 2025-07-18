import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide11PackageManager = createContentSlide({
  id: "slide011-package-manager",
  title: "מנהל החבילות",
  subtitle: "איך להתקין ולהסיר תוכנות ב-Linux",
  icon: "📦",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-blue-800 mb-4">📦 מנהל החבילות של Linux</h3>
          <p class="text-lg text-gray-700 mb-4">
            Linux משתמש במנהלי חבילות חכמים להתקנה וניהול תוכנות
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">🎯 מה זה מנהל חבילות?</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-blue-500 text-xl">📥</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">התקנה אוטומטית</h4>
                    <p class="text-sm text-gray-600">התקנת תוכנות בקלות</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-green-500 text-xl">🔄</span>
                  <div>
                    <h4 class="font-semibold text-green-800">עדכונים אוטומטיים</h4>
                    <p class="text-sm text-gray-600">עדכון כל התוכנות בבת אחת</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-purple-500 text-xl">🔗</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">ניהול תלויות</h4>
                    <p class="text-sm text-gray-600">התקנה אוטומטית של תוכנות נדרשות</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-orange-500 text-xl">🗑️</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">הסרה נקייה</h4>
                    <p class="text-sm text-gray-600">הסרת תוכנות ללא שאריות</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">📋 סוגי מנהלי חבילות:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">apt (Debian/Ubuntu)</span>
                  <span class="text-sm text-gray-600">הכי נפוץ</span>
                </div>
                <p class="text-xs text-gray-500">sudo apt install package_name</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">yum/dnf (Red Hat)</span>
                  <span class="text-sm text-gray-600">לשרתים</span>
                </div>
                <p class="text-xs text-gray-500">sudo yum install package_name</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">pacman (Arch)</span>
                  <span class="text-sm text-gray-600">מהיר ופשוט</span>
                </div>
                <p class="text-xs text-gray-500">sudo pacman -S package_name</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">zypper (openSUSE)</span>
                  <span class="text-sm text-gray-600">מתקדם</span>
                </div>
                <p class="text-xs text-gray-500">sudo zypper install package_name</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-bold text-gray-800 mb-2">💻 דוגמאות פקודות apt:</h3>
          <div class="bg-black text-green-400 p-4 rounded-lg font-mono text-sm space-y-2">
            <div class="text-gray-400"># עדכון רשימת החבילות</div>
            <div class="text-white">sudo apt update</div>
            <div class="text-gray-400"># התקנת חבילה</div>
            <div class="text-white">sudo apt install firefox</div>
            <div class="text-gray-400"># הסרת חבילה</div>
            <div class="text-white">sudo apt remove firefox</div>
            <div class="text-gray-400"># עדכון כל החבילות</div>
            <div class="text-white">sudo apt upgrade</div>
            <div class="text-gray-400"># חיפוש חבילה</div>
            <div class="text-white">apt search game</div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">💡 טיפים חשובים:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">✅ תמיד:</h4>
              <ul class="space-y-1">
                <li>• הרצו apt update לפני התקנה</li>
                <li>• בדקו מה מתקינים</li>
                <li>• השתמשו ב-sudo לפקודות התקנה</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">⚠️ זהירות:</h4>
              <ul class="space-y-1">
                <li>• אל תמחקו חבילות מערכת</li>
                <li>• גיבוי לפני שינויים גדולים</li>
                <li>• בדקו מקורות מהימנים</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide012-break"
}); 