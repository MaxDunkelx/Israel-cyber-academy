import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide25AdvancedTopics = createContentSlide({
  id: "slide025-advanced-topics",
  title: "נושאים מתקדמים",
  subtitle: "מה אפשר ללמוד בהמשך",
  icon: "🚀",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-red-800 mb-4">🚀 נושאים מתקדמים ב-Linux</h3>
          <p class="text-lg text-gray-700 mb-4">
            עכשיו שיש לכם בסיס, הנה נושאים מתקדמים שתוכלו ללמוד בהמשך
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">🔧 ניהול מערכת מתקדם:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">🐳</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">Docker</h4>
                    <p class="text-sm text-gray-600">מכולות וירטואליות</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">☸️</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Kubernetes</h4>
                    <p class="text-sm text-gray-600">ניהול מכולות בקנה מידה</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">🔧</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">Systemd</h4>
                    <p class="text-sm text-gray-600">ניהול שירותי מערכת</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">💾</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">LVM</h4>
                    <p class="text-sm text-gray-600">ניהול דיסקים מתקדם</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🌐 רשתות מתקדמות:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🌐</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Web Server</h4>
                    <p class="text-sm text-gray-600">Apache, Nginx</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🗄️</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Database</h4>
                    <p class="text-sm text-gray-600">MySQL, PostgreSQL</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🔐</span>
                  <div>
                    <h4 class="font-semibold text-green-800">VPN</h4>
                    <p class="text-sm text-gray-600">OpenVPN, WireGuard</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📧</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Mail Server</h4>
                    <p class="text-sm text-gray-600">Postfix, Dovecot</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-purple-800 text-lg">🔒 אבטחה מתקדמת:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-purple-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">🛡️</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">SELinux</h4>
                    <p class="text-sm text-gray-600">אבטחה ברמת המערכת</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-purple-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">🔍</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">Audit</h4>
                    <p class="text-sm text-gray-600">ניטור פעילות מערכת</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-purple-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">🔐</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">Encryption</h4>
                    <p class="text-sm text-gray-600">הצפנת דיסקים וקבצים</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-purple-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">🔑</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">PKI</h4>
                    <p class="text-sm text-gray-600">תשתית מפתחות ציבוריים</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-orange-800 text-lg">📊 ניטור וניתוח:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-orange-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">📊</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">Monitoring</h4>
                    <p class="text-sm text-gray-600">Nagios, Zabbix, Prometheus</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-orange-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">📈</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">Logging</h4>
                    <p class="text-sm text-gray-600">rsyslog, logrotate</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-orange-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">🔍</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">Analysis</h4>
                    <p class="text-sm text-gray-600">ELK Stack, Splunk</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-orange-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">📋</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">Backup</h4>
                    <p class="text-sm text-gray-600">rsync, tar, dd</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">💡 המלצות להמשך:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">📚 משאבי למידה:</h4>
              <ul class="space-y-1">
                <li>• Linux Documentation Project</li>
                <li>• Arch Wiki</li>
                <li>• Stack Overflow</li>
                <li>• YouTube tutorials</li>
                <li>• קורסים מקוונים</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">🛠️ פרויקטים מעשיים:</h4>
              <ul class="space-y-1">
                <li>• הקמת שרת ביתי</li>
                <li>• בניית NAS</li>
                <li>• הקמת VPN</li>
                <li>• בניית web server</li>
                <li>• אוטומציה של משימות</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide026-career-paths"
}); 