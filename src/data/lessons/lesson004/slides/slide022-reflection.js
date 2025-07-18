import { createInteractiveSlide } from '../../../components/slides/InteractiveSlide.jsx';

export const slide22Reflection = createInteractiveSlide({
  id: "slide022-reflection",
  title: "הרהור על הלמידה",
  subtitle: "בואו נחשוב על מה שלמדנו",
  icon: "🤔",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-blue-800 mb-4">🤔 הרהור על הלמידה</h3>
          <p class="text-lg text-gray-700">
            עכשיו נעצור לחשוב על מה שלמדנו על Linux ואיך זה יכול לעזור לנו
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">💭 שאלות להרהור:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-blue-500 text-xl">🎯</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">מה היה הכי מעניין?</h4>
                    <p class="text-sm text-gray-600">איזה חלק מהשיעור אהבתם הכי הרבה?</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-green-500 text-xl">🤔</span>
                  <div>
                    <h4 class="font-semibold text-green-800">מה היה הכי קשה?</h4>
                    <p class="text-sm text-gray-600">איזה נושא היה הכי מאתגר?</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-purple-500 text-xl">🚀</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">איך זה יכול לעזור?</h4>
                    <p class="text-sm text-gray-600">איך Linux יכול להיות שימושי בחיים?</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-start space-x-3">
                  <span class="text-orange-500 text-xl">🔮</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">מה הלאה?</h4>
                    <p class="text-sm text-gray-600">מה תרצו ללמוד בהמשך?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">💡 רעיונות לשימוש:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🖥️</span>
                  <div>
                    <h4 class="font-semibold text-green-800">שרת ביתי</h4>
                    <p class="text-sm text-gray-600">הקמת שרת קטן בבית</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🔧</span>
                  <div>
                    <h4 class="font-semibold text-green-800">תיקון מחשבים</h4>
                    <p class="text-sm text-gray-600">עזרה לחברים עם מחשבים</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🎮</span>
                  <div>
                    <h4 class="font-semibold text-green-800">משחקים</h4>
                    <p class="text-sm text-gray-600">התקנת משחקים על Linux</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">📚</span>
                  <div>
                    <h4 class="font-semibold text-green-800">לימוד תכנות</h4>
                    <p class="text-sm text-gray-600">פיתוח תוכנות על Linux</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">🌐</span>
                  <div>
                    <h4 class="font-semibold text-green-800">אינטרנט בטוח</h4>
                    <p class="text-sm text-gray-600">גלישה בטוחה יותר</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-bold text-yellow-800 mb-2">💭 שאלות נוספות להרהור:</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <div>
              <h4 class="font-semibold mb-1">🤔 על הלמידה:</h4>
              <ul class="space-y-1">
                <li>• איך הרגשתם עם הטרמינל?</li>
                <li>• האם הפקודות היו ברורות?</li>
                <li>• מה היה הכי מפתיע?</li>
                <li>• איזה נושא תרצו להעמיק?</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-1">🚀 על העתיד:</h4>
              <ul class="space-y-1">
                <li>• האם תרצו להתקין Linux?</li>
                <li>• איך זה יכול לעזור בלימודים?</li>
                <li>• האם זה יכול לעזור בקריירה?</li>
                <li>• מה השלב הבא שלכם?</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  interactive: {
    type: "reflection",
    title: "שתפו את המחשבות שלכם",
    description: "כתבו על החוויה שלכם עם Linux",
    prompts: [
      "מה היה הכי מעניין בשיעור על Linux?",
      "איזה נושא היה הכי מאתגר?",
      "איך Linux יכול להיות שימושי בחיים שלכם?",
      "מה תרצו ללמוד בהמשך?",
      "האם תרצו להתקין Linux על המחשב שלכם?"
    ]
  },
  nextSlide: "slide023-summary"
}); 