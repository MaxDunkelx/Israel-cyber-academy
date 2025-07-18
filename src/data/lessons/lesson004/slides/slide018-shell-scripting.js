import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide18ShellScripting = createContentSlide({
  id: "slide018-shell-scripting",
  title: "תכנות Shell",
  subtitle: "איך לכתוב סקריפטים אוטומטיים",
  icon: "📜",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-purple-800 mb-4">📜 תכנות Shell ב-Linux</h3>
          <p class="text-lg text-gray-700 mb-4">
            Shell Scripting מאפשר לנו לכתוב תוכניות אוטומטיות לביצוע משימות חוזרות
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">🎯 מה זה Shell Script?</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-blue-500 text-xl">📝</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">קובץ טקסט</h4>
                    <p class="text-sm text-gray-600">קובץ עם פקודות Linux</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-green-500 text-xl">🤖</span>
                  <div>
                    <h4 class="font-semibold text-green-800">אוטומציה</h4>
                    <p class="text-sm text-gray-600">ביצוע אוטומטי של משימות</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-purple-500 text-xl">🔄</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">חזרתיות</h4>
                    <p class="text-sm text-gray-600">ביצוע משימות חוזרות</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-orange-500 text-xl">⚡</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">מהירות</h4>
                    <p class="text-sm text-gray-600">ביצוע מהיר יותר מפקודות ידניות</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">📋 יסודות התכנות:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">#!/bin/bash</span>
                  <span class="text-sm text-gray-600">Shebang</span>
                </div>
                <p class="text-xs text-gray-500">שורה ראשונה - איזה shell</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">#</span>
                  <span class="text-sm text-gray-600">הערות</span>
                </div>
                <p class="text-xs text-gray-500">הסברים בקוד</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">$1, $2...</span>
                  <span class="text-sm text-gray-600">פרמטרים</span>
                </div>
                <p class="text-xs text-gray-500">ארגומנטים מהפקודה</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">if/then/else</span>
                  <span class="text-sm text-gray-600">תנאים</span>
                </div>
                <p class="text-xs text-gray-500">בדיקות לוגיות</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-green-600">for/while</span>
                  <span class="text-sm text-gray-600">לולאות</span>
                </div>
                <p class="text-xs text-gray-500">חזרה על פעולות</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-bold text-gray-800 mb-2">💻 דוגמה: סקריפט פשוט</h3>
          <div class="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
            <div class="text-gray-400">#!/bin/bash</div>
            <div class="text-gray-400"># סקריפט לברכה</div>
            <div class="text-white">echo "שלום! ברוכים הבאים ל-Linux"</div>
            <div class="text-white">echo "השעה הנוכחית היא: $(date)"</div>
            <div class="text-white">echo "המשתמש הנוכחי: $USER"</div>
            <div class="text-white">echo "התיקייה הנוכחית: $(pwd)"</div>
            <div class="text-gray-400"># בדיקה אם יש פרמטר</div>
            <div class="text-white">if [ $# -gt 0 ]; then</div>
            <div class="text-white ml-4">echo "הפרמטר שהעברת: $1"</div>
            <div class="text-white">else</div>
            <div class="text-white ml-4">echo "לא העברת פרמטרים"</div>
            <div class="text-white">fi</div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">💡 טיפים לכתיבת סקריפטים:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">✅ טיפים:</h4>
              <ul class="space-y-1">
                <li>• תמיד התחילו ב-shebang</li>
                <li>• הוסיפו הערות</li>
                <li>• בדקו פרמטרים</li>
                <li>• השתמשו בשמות משתנים ברורים</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">⚠️ זהירות:</h4>
              <ul class="space-y-1">
                <li>• בדקו הרשאות הרצה</li>
                <li>• אל תמחקו קבצים ללא אישור</li>
                <li>• בדקו קוד לפני הרצה</li>
                <li>• גיבוי לפני שינויים גדולים</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide019-scripting-game"
}); 