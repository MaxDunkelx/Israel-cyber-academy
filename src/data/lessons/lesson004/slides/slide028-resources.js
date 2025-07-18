import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide28Resources = createContentSlide({
  id: "slide028-resources",
  title: "משאבי למידה",
  subtitle: "איפה להמשיך ללמוד על Linux",
  icon: "📚",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-purple-800 mb-4">📚 משאבי למידה ל-Linux</h3>
          <p class="text-lg text-gray-700 mb-4">
            הנה רשימה מקיפה של משאבים להמשך הלמידה שלכם
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">📖 ספרים מומלצים:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">📘</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">The Linux Command Line</h4>
                    <p class="text-sm text-gray-600">William Shotts</p>
                    <p class="text-xs text-gray-500">חינמי באינטרנט</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📗</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Linux Bible</h4>
                    <p class="text-sm text-gray-600">Christopher Negus</p>
                    <p class="text-xs text-gray-500">מדריך מקיף</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">📙</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">How Linux Works</h4>
                    <p class="text-sm text-gray-600">Brian Ward</p>
                    <p class="text-xs text-gray-500">איך Linux עובד</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">📕</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">Linux Pocket Guide</h4>
                    <p class="text-sm text-gray-600">Daniel J. Barrett</p>
                    <p class="text-xs text-gray-500">כיסוי מהיר</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🌐 אתרים מומלצים:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📚</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Linux Documentation Project</h4>
                    <p class="text-sm text-gray-600">tldp.org</p>
                    <p class="text-xs text-gray-500">תיעוד רשמי</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🐧</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Arch Wiki</h4>
                    <p class="text-sm text-gray-600">wiki.archlinux.org</p>
                    <p class="text-xs text-gray-500">מידע מפורט</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">💬</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Stack Overflow</h4>
                    <p class="text-sm text-gray-600">stackoverflow.com</p>
                    <p class="text-xs text-gray-500">שאלות ותשובות</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🔧</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Red Hat Documentation</h4>
                    <p class="text-sm text-gray-600">access.redhat.com</p>
                    <p class="text-xs text-gray-500">תיעוד מקצועי</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-purple-800 text-lg">📺 סרטונים וקורסים:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-purple-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">📺</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">YouTube Channels</h4>
                    <ul class="text-sm text-gray-600 mt-1">
                      <li>• Linux Academy</li>
                      <li>• The Linux Foundation</li>
                      <li>• DistroTube</li>
                      <li>• Chris Titus Tech</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-purple-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">🎓</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">Udemy Courses</h4>
                    <ul class="text-sm text-gray-600 mt-1">
                      <li>• Linux Administration Bootcamp</li>
                      <li>• Complete Linux Training Course</li>
                      <li>• Linux Command Line Basics</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-purple-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">🏫</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">Coursera</h4>
                    <ul class="text-sm text-gray-600 mt-1">
                      <li>• Linux for Developers</li>
                      <li>• Operating Systems</li>
                      <li>• Computer Networks</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-orange-800 text-lg">👥 קהילות:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-orange-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">💬</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">Reddit</h4>
                    <ul class="text-sm text-gray-600 mt-1">
                      <li>• r/linux</li>
                      <li>• r/linuxquestions</li>
                      <li>• r/linux4noobs</li>
                      <li>• r/linuxadmin</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-orange-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">🐦</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">Discord/Slack</h4>
                    <ul class="text-sm text-gray-600 mt-1">
                      <li>• Linux Foundation Discord</li>
                      <li>• Ubuntu Community</li>
                      <li>• Arch Linux IRC</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-orange-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">🌐</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">פורומים</h4>
                    <ul class="text-sm text-gray-600 mt-1">
                      <li>• LinuxQuestions.org</li>
                      <li>• Ubuntu Forums</li>
                      <li>• Arch Linux Forums</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">💡 טיפים ללמידה:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">📚 למידה:</h4>
              <ul class="space-y-1">
                <li>• התחילו עם הבסיס</li>
                <li>• תרגלו כל יום</li>
                <li>• בנו פרויקטים</li>
                <li>• הצטרפו לקהילות</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">🛠️ מעשי:</h4>
              <ul class="space-y-1">
                <li>• התקינו Linux</li>
                <li>• השתמשו בטרמינל</li>
                <li>• תרמו לקוד פתוח</li>
                <li>• שתפו ידע</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  nextSlide: "slide029-final-thoughts"
}); 