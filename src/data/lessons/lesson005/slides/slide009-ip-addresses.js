import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide9IpAddresses = createContentSlide({
  id: "slide009-ip-addresses",
  title: "כתובות IP",
  subtitle: "הכתובות של האינטרנט",
  icon: "📍",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-orange-800 mb-4">📍 כתובות IP - הכתובות של האינטרנט</h3>
          <p class="text-lg text-gray-700 mb-4">
            כל מחשב ברשת האינטרנט צריך כתובת ייחודית כדי שנוכל למצוא אותו
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">🔢 מה זה כתובת IP?</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-blue-500 text-xl">📍</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">כתובת ייחודית</h4>
                    <p class="text-sm text-gray-600">כל מחשב מקבל כתובת ייחודית</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-green-500 text-xl">🔍</span>
                  <div>
                    <h4 class="font-semibold text-green-800">מציאת מיקום</h4>
                    <p class="text-sm text-gray-600">הכתובת עוזרת למצוא את המחשב</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-purple-500 text-xl">📦</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">משלוח חבילות</h4>
                    <p class="text-sm text-gray-600">המידע נשלח לכתובת הנכונה</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-orange-500 text-xl">🌍</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">עולמי</h4>
                    <p class="text-sm text-gray-600">כל העולם משתמש באותו פורמט</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">📋 סוגי כתובות IP:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🔢</span>
                  <div>
                    <h4 class="font-semibold text-green-800">IPv4</h4>
                    <p class="text-sm text-gray-600">4 מספרים מופרדים בנקודות</p>
                    <p class="text-xs text-gray-500">דוגמה: 192.168.1.1</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🔢</span>
                  <div>
                    <h4 class="font-semibold text-green-800">IPv6</h4>
                    <p class="text-sm text-gray-600">8 קבוצות של 4 תווים</p>
                    <p class="text-xs text-gray-500">דוגמה: 2001:0db8:85a3:0000:0000:8a2e:0370:7334</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🏠</span>
                  <div>
                    <h4 class="font-semibold text-green-800">כתובת פרטית</h4>
                    <p class="text-sm text-gray-600">לשימוש ברשתות מקומיות</p>
                    <p class="text-xs text-gray-500">192.168.x.x או 10.x.x.x</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🌐</span>
                  <div>
                    <h4 class="font-semibold text-green-800">כתובת ציבורית</h4>
                    <p class="text-sm text-gray-600">לשימוש באינטרנט</p>
                    <p class="text-xs text-gray-500">ניתנת על ידי ספק האינטרנט</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-bold text-gray-800 mb-2">💻 דוגמאות לכתובות IP:</h3>
          <div class="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
            <div class="text-gray-400"># כתובות IPv4:</div>
            <div class="text-white">192.168.1.1 - ראוטר ביתי</div>
            <div class="text-white">8.8.8.8 - Google DNS</div>
            <div class="text-white">127.0.0.1 - localhost (המחשב שלכם)</div>
            <div class="text-gray-400 mt-2"># כתובות IPv6:</div>
            <div class="text-white">2001:4860:4860::8888 - Google DNS</div>
            <div class="text-white">::1 - localhost (המחשב שלכם)</div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">💡 עובדות מעניינות:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">🔢 IPv4:</h4>
              <ul class="space-y-1">
                <li>• 4.3 מיליארד כתובות אפשריות</li>
                <li>• כמעט נגמרו הכתובות</li>
                <li>• פורמט: xxx.xxx.xxx.xxx</li>
                <li>• כל מספר: 0-255</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">🔢 IPv6:</h4>
              <ul class="space-y-1">
                <li>• 340 טריליון טריליון כתובות</li>
                <li>• מספיק לכל המכשירים</li>
                <li>• פורמט: xxxx:xxxx:xxxx:xxxx</li>
                <li>• יותר בטוח ומהיר</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide010-break"
}); 