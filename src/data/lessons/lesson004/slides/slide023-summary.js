import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide23Summary = createContentSlide({
  id: "slide023-summary",
  title: "סיכום השיעור",
  subtitle: "מה למדנו על Linux",
  icon: "📋",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-green-800 mb-4">📋 סיכום השיעור - Linux</h3>
          <p class="text-lg text-gray-700">
            כל הכבוד! סיימתם שיעור מקיף על Linux. הנה סיכום של מה שלמדנו
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">📚 מה למדנו:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">📚</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">היסטוריה וגרסאות</h4>
                    <ul class="text-sm text-gray-600 mt-1">
                      <li>• לינוס טורבאלדס יצר Linux ב-1991</li>
                      <li>• Ubuntu, Arch, Mint - גרסאות פופולריות</li>
                      <li>• Linux הוא קוד פתוח וחינמי</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">💻</span>
                  <div>
                    <h4 class="font-semibold text-green-800">טרמינל ופקודות</h4>
                    <ul class="text-sm text-gray-600 mt-1">
                      <li>• ls, cd, pwd - ניווט בסיסי</li>
                      <li>• mkdir, touch - יצירת קבצים</li>
                      <li>• cp, mv, rm - ניהול קבצים</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">🔒</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">הרשאות ואבטחה</h4>
                    <ul class="text-sm text-gray-600 mt-1">
                      <li>• r, w, x - סוגי הרשאות</li>
                      <li>• chmod, chown - שינוי הרשאות</li>
                      <li>• ניהול משתמשים וקבוצות</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🛠️ כלים שלמדנו:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📦</span>
                  <div>
                    <h4 class="font-semibold text-green-800">מנהלי חבילות</h4>
                    <ul class="text-sm text-gray-600 mt-1">
                      <li>• apt (Ubuntu/Debian)</li>
                      <li>• yum/dnf (Red Hat)</li>
                      <li>• pacman (Arch)</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">⚙️</span>
                  <div>
                    <h4 class="font-semibold text-green-800">ניהול מערכת</h4>
                    <ul class="text-sm text-gray-600 mt-1">
                      <li>• ps, top - ניהול תהליכים</li>
                      <li>• htop, free - ניטור מערכת</li>
                      <li>• ufw, fail2ban - אבטחה</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📜</span>
                  <div>
                    <h4 class="font-semibold text-green-800">תכנות Shell</h4>
                    <ul class="text-sm text-gray-600 mt-1">
                      <li>• כתיבת סקריפטים</li>
                      <li>• משתנים ותנאים</li>
                      <li>• לולאות ופונקציות</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">🎯 הישגים שלכם:</h3>
          <div class="grid md:grid-cols-3 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">✅ הבנתם:</h4>
              <ul class="space-y-1">
                <li>• איך Linux עובד</li>
                <li>• פקודות בסיסיות</li>
                <li>• ניהול קבצים</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">🛠️ למדתם:</h4>
              <ul class="space-y-1">
                <li>• התקנת תוכנות</li>
                <li>• ניהול הרשאות</li>
                <li>• כתיבת סקריפטים</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">🚀 יכולים:</h4>
              <ul class="space-y-1">
                <li>• להשתמש בטרמינל</li>
                <li>• לנהל מערכת</li>
                <li>• לכתוב אוטומציה</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-blue-50 p-4 rounded-lg">
          <h3 class="font-bold text-blue-800 mb-2">🌟 מה הלאה?</h3>
          <p class="text-gray-700">
            עכשיו יש לכם בסיס מצוין ב-Linux! תוכלו להמשיך ללמוד על רשתות מתקדמות, 
            אבטחה, פיתוח תוכנות, או אפילו להקים שרתים משלכם. העולם של Linux הוא עצום!
          </p>
        </div>
      </div>
    `
  },
  nextSlide: "slide024-final-summary"
}); 