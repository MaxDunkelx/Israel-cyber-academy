import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide7Protocols = createContentSlide({
  id: "slide007-protocols",
  title: "פרוטוקולים",
  subtitle: "השפה של האינטרנט",
  icon: "📋",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-purple-800 mb-4">📋 פרוטוקולים - השפה של האינטרנט</h3>
          <p class="text-lg text-gray-700 mb-4">
            פרוטוקולים הם כללי התקשורת שמאפשרים למחשבים לדבר אחד עם השני
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">🌐 פרוטוקולים חשובים:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">🌐</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">HTTP/HTTPS</h4>
                    <p class="text-sm text-gray-600">לגלישה באתרי אינטרנט</p>
                    <p class="text-xs text-gray-500">HTTP = לא מוצפן, HTTPS = מוצפן</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📧</span>
                  <div>
                    <h4 class="font-semibold text-green-800">SMTP/POP3/IMAP</h4>
                    <p class="text-sm text-gray-600">לשליחה וקבלה של דוא"ל</p>
                    <p class="text-xs text-gray-500">SMTP = שליחה, POP3/IMAP = קבלה</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">📁</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">FTP</h4>
                    <p class="text-sm text-gray-600">להעברת קבצים</p>
                    <p class="text-xs text-gray-500">File Transfer Protocol</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">🎮</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">TCP/UDP</h4>
                    <p class="text-sm text-gray-600">למשחקים ותקשורת בזמן אמת</p>
                    <p class="text-xs text-gray-500">TCP = אמין, UDP = מהיר</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🔒 פרוטוקולי אבטחה:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🔐</span>
                  <div>
                    <h4 class="font-semibold text-green-800">SSL/TLS</h4>
                    <p class="text-sm text-gray-600">הצפנת מידע ברשת</p>
                    <p class="text-xs text-gray-500">מגן על סיסמאות ומידע אישי</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🛡️</span>
                  <div>
                    <h4 class="font-semibold text-green-800">SSH</h4>
                    <p class="text-sm text-gray-600">חיבור בטוח למחשבים מרוחקים</p>
                    <p class="text-xs text-gray-500">Secure Shell</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🔒</span>
                  <div>
                    <h4 class="font-semibold text-green-800">VPN</h4>
                    <p class="text-sm text-gray-600">רשת פרטית וירטואלית</p>
                    <p class="text-xs text-gray-500">מסתירה את המיקום שלכם</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🔑</span>
                  <div>
                    <h4 class="font-semibold text-green-800">WPA/WPA2</h4>
                    <p class="text-sm text-gray-600">אבטחה לרשתות WiFi</p>
                    <p class="text-xs text-gray-500">Wi-Fi Protected Access</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-bold text-gray-800 mb-2">💻 דוגמה: גלישה באתר</h3>
          <div class="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
            <div class="text-gray-400">1. אתם מקלידים כתובת בדפדפן</div>
            <div class="text-white">2. הדפדפן שולח בקשת HTTP</div>
            <div class="text-gray-400">3. השרת מקבל את הבקשה</div>
            <div class="text-white">4. השרת שולח את הדף בחזרה</div>
            <div class="text-gray-400">5. הדפדפן מציג את הדף</div>
            <div class="text-white">6. אם זה HTTPS, המידע מוצפן</div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">💡 למה פרוטוקולים חשובים?</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">✅ יתרונות:</h4>
              <ul class="space-y-1">
                <li>• כל המחשבים מדברים באותה שפה</li>
                <li>• אפשר לחבר מחשבים שונים</li>
                <li>• המידע עובר בצורה מסודרת</li>
                <li>• יש אבטחה מובנית</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">⚠️ חשוב לזכור:</h4>
              <ul class="space-y-1">
                <li>• HTTPS בטוח יותר מ-HTTP</li>
                <li>• תמיד בדקו את הפרוטוקול</li>
                <li>• אל תפתחו קישורים חשודים</li>
                <li>• השתמשו ב-VPN לחיבור בטוח</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide008-protocol-game"
}); 