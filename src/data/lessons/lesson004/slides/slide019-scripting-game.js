import { createInteractiveSlide } from '../../../components/slides/InteractiveSlide.jsx';

export const slide19ScriptingGame = createInteractiveSlide({
  id: "slide019-scripting-game",
  title: "משחק תכנות Shell",
  subtitle: "בואו נתרגל כתיבת סקריפטים!",
  icon: "🎮",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-green-800 mb-4">🎮 משחק תכנות Shell</h3>
          <p class="text-lg text-gray-700">
            עכשיו נתרגל כתיבת סקריפטים עם משחק אינטראקטיבי!
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">📋 כללי המשחק:</h3>
            
            <div class="space-y-3">
              <div class="flex items-start space-x-3">
                <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">1</div>
                <div>
                  <h4 class="font-semibold text-blue-800">קראו את המשימה</h4>
                  <p class="text-sm text-gray-600">מה הסקריפט צריך לעשות?</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">2</div>
                <div>
                  <h4 class="font-semibold text-blue-800">בחרו את הקוד הנכון</h4>
                  <p class="text-sm text-gray-600">מהאפשרויות המוצגות</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">3</div>
                <div>
                  <h4 class="font-semibold text-blue-800">קבלו משוב</h4>
                  <p class="text-sm text-gray-600">נכון או לא נכון?</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">4</div>
                <div>
                  <h4 class="font-semibold text-blue-800">המשיכו הלאה</h4>
                  <p class="text-sm text-gray-600">למשימה הבאה!</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🎯 סוגי משימות:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <h4 class="font-semibold text-green-800 mb-1">📝 יצירת סקריפט</h4>
                <p class="text-sm text-gray-600">כתיבת shebang והתחלה</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <h4 class="font-semibold text-green-800 mb-1">🔍 בדיקת תנאים</h4>
                <p class="text-sm text-gray-600">if/then/else statements</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <h4 class="font-semibold text-green-800 mb-1">🔄 לולאות</h4>
                <p class="text-sm text-gray-600">for ו-while loops</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <h4 class="font-semibold text-green-800 mb-1">📊 משתנים</h4>
                <p class="text-sm text-gray-600">הגדרה ושימוש במשתנים</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <h4 class="font-semibold text-green-800 mb-1">🎯 פונקציות</h4>
                <p class="text-sm text-gray-600">יצירת פונקציות</p>
              </div>
            </div>
            
            <div class="bg-yellow-50 p-3 rounded-lg">
              <h4 class="font-bold text-yellow-800 mb-1">💡 טיפ:</h4>
              <p class="text-sm text-yellow-700">
                זכרו: shebang תמיד בשורה הראשונה, והערות מתחילות ב-#
              </p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  interactive: {
    type: "code-editor",
    title: "עורך קוד Shell",
    description: "כתבו סקריפטים וקבלו משוב מיידי",
    challenges: [
      {
        title: "סקריפט ברכה",
        description: "כתבו סקריפט שמציג ברכה ומציג את השעה",
        starterCode: `#!/bin/bash
# סקריפט ברכה
echo "שלום!"
# הוסיפו כאן קוד להצגת השעה`,
        solution: `#!/bin/bash
# סקריפט ברכה
echo "שלום!"
echo "השעה הנוכחית היא: $(date)"`,
        hints: ["השתמשו בפקודה date", "השתמשו ב-$() לביצוע פקודה"]
      },
      {
        title: "בדיקת פרמטר",
        description: "כתבו סקריפט שבודק אם הועבר פרמטר",
        starterCode: `#!/bin/bash
# בדיקת פרמטר
if [ $# -eq 0 ]; then
    echo "לא הועברו פרמטרים"
else
    # הוסיפו כאן קוד להצגת הפרמטר
fi`,
        solution: `#!/bin/bash
# בדיקת פרמטר
if [ $# -eq 0 ]; then
    echo "לא הועברו פרמטרים"
else
    echo "הפרמטר הראשון: $1"
fi`,
        hints: ["השתמשו ב-$1 לפרמטר הראשון", "השתמשו ב-echo להצגה"]
      },
      {
        title: "לולאה פשוטה",
        description: "כתבו לולאה שמדפיסה מספרים מ-1 עד 5",
        starterCode: `#!/bin/bash
# לולאה פשוטה
for i in 1 2 3 4 5; do
    # הוסיפו כאן קוד להדפסה
done`,
        solution: `#!/bin/bash
# לולאה פשוטה
for i in 1 2 3 4 5; do
    echo "מספר: $i"
done`,
        hints: ["השתמשו ב-echo", "השתמשו ב-$i למשתנה הלולאה"]
      }
    ]
  },
  nextSlide: "slide020-networking"
}); 