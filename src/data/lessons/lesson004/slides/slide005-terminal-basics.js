import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide5TerminalBasics = createContentSlide({
  id: "slide005-terminal-basics",
  title: "מבוא לטרמינל",
  subtitle: "הממשק החזק של Linux",
  icon: "💻",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-purple-800 mb-4">🖥️ מה זה טרמינל?</h3>
          <p class="text-lg text-gray-700 mb-4">
            הטרמינל הוא ממשק טקסטואלי שמאפשר לנו לשלוט במחשב באמצעות פקודות
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">✅ יתרונות הטרמינל:</h3>
            
            <div class="space-y-3">
              <div class="flex items-start space-x-3">
                <div class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">✓</div>
                <div>
                  <h4 class="font-semibold text-green-800">מהיר יותר</h4>
                  <p class="text-sm text-gray-600">פקודות מהירות יותר מממשק גרפי</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">✓</div>
                <div>
                  <h4 class="font-semibold text-green-800">חסכוני במשאבים</h4>
                  <p class="text-sm text-gray-600">לא צריך גרפיקה מורכבת</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">✓</div>
                <div>
                  <h4 class="font-semibold text-green-800">אוטומציה</h4>
                  <p class="text-sm text-gray-600">אפשר לכתוב סקריפטים</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">✓</div>
                <div>
                  <h4 class="font-semibold text-green-800">שליטה מלאה</h4>
                  <p class="text-sm text-gray-600">גישה לכל הפונקציות של המערכת</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-orange-800 text-lg">🎯 איך נראה טרמינל?</h3>
            
            <div class="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
              <div class="flex items-center space-x-2 mb-2">
                <span class="text-red-400">user@computer</span>
                <span class="text-blue-400">:</span>
                <span class="text-yellow-400">~</span>
                <span class="text-blue-400">$</span>
                <span class="text-white">_</span>
              </div>
              <div class="text-gray-400 text-xs">
                <div>user@computer:~$ ls -la</div>
                <div>total 40</div>
                <div>drwxr-xr-x 2 user user 4096 Jan 1 12:00 .</div>
                <div>drwxr-xr-x 3 user user 4096 Jan 1 12:00 ..</div>
                <div>-rw-r--r-- 1 user user 1234 Jan 1 12:00 file.txt</div>
                <div>user@computer:~$ _</div>
              </div>
            </div>
            
            <div class="bg-blue-50 p-3 rounded-lg">
              <h4 class="font-bold text-blue-800 mb-1">💡 הסבר:</h4>
              <p class="text-sm text-blue-700">
                <strong>user@computer</strong> - שם המשתמש והמחשב<br>
                <strong>~</strong> - התיקייה הנוכחית (בית)<br>
                <strong>$</strong> - סימן שהמערכת מוכנה לפקודה
              </p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide006-terminal-game"
}); 