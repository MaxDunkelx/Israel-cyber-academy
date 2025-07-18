import { createInteractiveSlide } from '../../../components/slides/InteractiveSlide.jsx';

export const slide4NetworkTypes = createInteractiveSlide({
  id: "slide004-network-types",
  title: "סוגי רשתות",
  subtitle: "איך מסווגים רשתות לפי גודל ומיקום",
  icon: "📊",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-green-800 mb-4">📊 סוגי רשתות מחשבים</h3>
          <p class="text-lg text-gray-700 mb-4">
            רשתות מסווגות לפי גודל, מיקום ואופן החיבור שלהן
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">🏠 רשתות מקומיות:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">🏠</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">LAN - רשת מקומית</h4>
                    <p class="text-sm text-gray-600">רשת בבית או במשרד</p>
                    <p class="text-xs text-gray-500">טווח: עד 100 מטר</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">🏫</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">CAN - רשת קמפוס</h4>
                    <p class="text-sm text-gray-600">רשת בבית ספר או אוניברסיטה</p>
                    <p class="text-xs text-gray-500">טווח: עד קילומטר</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">🏢</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">MAN - רשת מטרופולין</h4>
                    <p class="text-sm text-gray-600">רשת בעיר או אזור</p>
                    <p class="text-xs text-gray-500">טווח: עד 50 ק"מ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🌍 רשתות רחבות:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🌍</span>
                  <div>
                    <h4 class="font-semibold text-green-800">WAN - רשת רחבה</h4>
                    <p class="text-sm text-gray-600">רשת בין ערים ומדינות</p>
                    <p class="text-xs text-gray-500">טווח: מאות ק"מ</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🌐</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Internet - האינטרנט</h4>
                    <p class="text-sm text-gray-600">רשת ענקית עולמית</p>
                    <p class="text-xs text-gray-500">טווח: כל העולם</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">☁️</span>
                  <div>
                    <h4 class="font-semibold text-green-800">Cloud - ענן</h4>
                    <p class="text-sm text-gray-600">שירותים ברשת</p>
                    <p class="text-xs text-gray-500">גישה מכל מקום</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-bold text-gray-800 mb-2">🔗 סוגי חיבורים:</h3>
          <div class="grid md:grid-cols-3 gap-4 text-sm">
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-blue-800 mb-1">📡 אלחוטי:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• WiFi</li>
                <li>• Bluetooth</li>
                <li>• סלולרי (4G/5G)</li>
              </ul>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-green-800 mb-1">🔌 כבלים:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• Ethernet</li>
                <li>• כבל טלפון</li>
                <li>• כבל סיב אופטי</li>
              </ul>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <h4 class="font-semibold text-purple-800 mb-1">🛰️ לוויין:</h4>
              <ul class="text-gray-600 space-y-1">
                <li>• GPS</li>
                <li>• אינטרנט לוויין</li>
                <li>• תקשורת לוויין</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  interactive: {
    type: "matching",
    title: "בואו נבדוק מה אתם זוכרים!",
    description: "חברו כל רשת לגודל המתאים",
    items: [
      { id: "lan", text: "LAN", category: "small" },
      { id: "wan", text: "WAN", category: "large" },
      { id: "man", text: "MAN", category: "medium" },
      { id: "internet", text: "Internet", category: "global" }
    ],
    categories: [
      { id: "small", text: "קטנה (בית/משרד)", color: "blue" },
      { id: "medium", text: "בינונית (עיר)", color: "green" },
      { id: "large", text: "גדולה (מדינה)", color: "orange" },
      { id: "global", text: "עולמית", color: "purple" }
    ]
  },
  nextSlide: "slide005-internet-history"
}); 