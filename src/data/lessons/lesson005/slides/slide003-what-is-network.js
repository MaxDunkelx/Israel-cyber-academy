import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide3WhatIsNetwork = createContentSlide({
  id: "slide003-what-is-network",
  title: "מה זה רשת?",
  subtitle: "הבסיס של כל התקשורת הדיגיטלית",
  icon: "🔗",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-blue-800 mb-4">🔗 מה זה רשת מחשבים?</h3>
          <p class="text-lg text-gray-700 mb-4">
            רשת היא חיבור בין מחשבים ומכשירים שמאפשר להם לתקשר ולשתף מידע
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">🎯 למה אנחנו צריכים רשתות?</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 class="font-semibold text-blue-800">שיתוף מידע</h4>
                    <p class="text-sm text-gray-600">שליחת קבצים, תמונות ומסמכים</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 class="font-semibold text-blue-800">תקשורת</h4>
                    <p class="text-sm text-gray-600">הודעות, שיחות וידאו, דוא"ל</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 class="font-semibold text-blue-800">גישה למשאבים</h4>
                    <p class="text-sm text-gray-600">מדפסות, דיסקים, תוכנות</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 class="font-semibold text-blue-800">בידור</h4>
                    <p class="text-sm text-gray-600">משחקים, סרטים, מוזיקה</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🌐 דוגמאות לרשתות:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🏠</span>
                  <div>
                    <h4 class="font-semibold text-green-800">רשת ביתית</h4>
                    <p class="text-sm text-gray-600">מחשבים, טלפונים, טאבלטים בבית</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🏫</span>
                  <div>
                    <h4 class="font-semibold text-green-800">רשת בית ספר</h4>
                    <p class="text-sm text-gray-600">מחשבים בכיתות ובמשרדים</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🏢</span>
                  <div>
                    <h4 class="font-semibold text-green-800">רשת עסקית</h4>
                    <p class="text-sm text-gray-600">מחשבים בחברה או ארגון</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🌍</span>
                  <div>
                    <h4 class="font-semibold text-green-800">האינטרנט</h4>
                    <p class="text-sm text-gray-600">רשת ענקית עולמית</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">💡 איך רשת עובדת?</h3>
          <p class="text-gray-700">
            דמיינו רשת כמו מערכת כבישים - יש כבישים (חיבורים), מכוניות (מידע), 
            ורמזורים (פרוטוקולים) שמסדירים את התנועה. כל מחשב הוא כמו עיר 
            שמחוברת לכבישים האלה!
          </p>
        </div>
      </div>
    `
  },
  nextSlide: "slide004-network-types"
}); 