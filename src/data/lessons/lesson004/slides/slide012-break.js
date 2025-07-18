import { createBreakSlide } from '../../../components/slides/BreakSlide.jsx';

export const slide12Break = createBreakSlide({
  id: "slide012-break",
  title: "הפסקה קצרה!",
  subtitle: "בואו ננוח ונסכם מה למדנו עד כה",
  icon: "☕",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-yellow-800 mb-4">🎉 כל הכבוד! למדתם הרבה!</h3>
          <p class="text-lg text-gray-700">
            עד כה למדנו על היסטוריית Linux, גרסאות, טרמינל, פקודות קבצים, הרשאות ומנהלי חבילות
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">✅ מה למדנו:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">📚</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">היסטוריה וגרסאות</h4>
                    <p class="text-sm text-gray-600">לינוס טורבאלדס, Ubuntu, Arch ועוד</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">💻</span>
                  <div>
                    <h4 class="font-semibold text-green-800">טרמינל ופקודות</h4>
                    <p class="text-sm text-gray-600">ls, cd, pwd, mkdir, touch</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">📁</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">ניהול קבצים</h4>
                    <p class="text-sm text-gray-600">cp, mv, rm, מבנה מערכת קבצים</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">🔒</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">הרשאות</h4>
                    <p class="text-sm text-gray-600">r, w, x, chmod, chown</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-red-500 text-xl">📦</span>
                  <div>
                    <h4 class="font-semibold text-red-800">מנהלי חבילות</h4>
                    <p class="text-sm text-gray-600">apt, yum, pacman, התקנת תוכנות</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🚀 מה צפוי בהמשך:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">⚙️</span>
                  <div>
                    <h4 class="font-semibold text-green-800">ניהול תהליכים</h4>
                    <p class="text-sm text-gray-600">ps, top, kill, ניהול תהליכים</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📊</span>
                  <div>
                    <h4 class="font-semibold text-green-800">ניטור מערכת</h4>
                    <p class="text-sm text-gray-600">htop, iostat, ניטור ביצועים</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🖥️</span>
                  <div>
                    <h4 class="font-semibold text-green-800">סימולטור Linux</h4>
                    <p class="text-sm text-gray-600">תרגול מעשי בסביבה בטוחה</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🔐</span>
                  <div>
                    <h4 class="font-semibold text-green-800">אבטחה מתקדמת</h4>
                    <p class="text-sm text-gray-600">firewall, SELinux, הצפנה</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-blue-50 p-3 rounded-lg">
              <h4 class="font-bold text-blue-800 mb-1">💡 טיפ להפסקה:</h4>
              <p class="text-sm text-blue-700">
                נסו לפתוח טרמינל במחשב שלכם ולבדוק איזה פקודות עובדות!
              </p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  breakDuration: 15,
  nextSlide: "slide013-processes"
}); 