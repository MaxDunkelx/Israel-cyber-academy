import { createInteractiveSlide } from '../../../components/slides/InteractiveSlide.jsx';

export const slide6TerminalGame = createInteractiveSlide({
  id: "slide006-terminal-game",
  title: "משחק הטרמינל",
  subtitle: "בואו נתרגל פקודות בסיסיות!",
  icon: "🎮",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-green-800 mb-4">🎯 בואו נתחיל עם פקודות בסיסיות!</h3>
          <p class="text-lg text-gray-700">
            נשחק משחק שבו תצטרכו להקליד פקודות נכונות כדי להתקדם
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">📋 פקודות בסיסיות:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center justify-between">
                  <span class="font-mono text-blue-600">ls</span>
                  <span class="text-sm text-gray-600">הצגת קבצים</span>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center justify-between">
                  <span class="font-mono text-blue-600">pwd</span>
                  <span class="text-sm text-gray-600">הצגת נתיב נוכחי</span>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center justify-between">
                  <span class="font-mono text-blue-600">cd</span>
                  <span class="text-sm text-gray-600">שינוי תיקייה</span>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center justify-between">
                  <span class="font-mono text-blue-600">mkdir</span>
                  <span class="text-sm text-gray-600">יצירת תיקייה</span>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center justify-between">
                  <span class="font-mono text-blue-600">touch</span>
                  <span class="text-sm text-gray-600">יצירת קובץ</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🎮 איך המשחק עובד:</h3>
            
            <div class="space-y-3">
              <div class="flex items-start space-x-3">
                <div class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">1</div>
                <div>
                  <h4 class="font-semibold text-green-800">קראו את המשימה</h4>
                  <p class="text-sm text-gray-600">מה צריך לעשות?</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">2</div>
                <div>
                  <h4 class="font-semibold text-green-800">הקלידו את הפקודה</h4>
                  <p class="text-sm text-gray-600">בשדה הטקסט למטה</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">3</div>
                <div>
                  <h4 class="font-semibold text-green-800">קבלו משוב</h4>
                  <p class="text-sm text-gray-600">נכון או לא נכון?</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">4</div>
                <div>
                  <h4 class="font-semibold text-green-800">המשיכו הלאה</h4>
                  <p class="text-sm text-gray-600">למשימה הבאה!</p>
                </div>
              </div>
            </div>
            
            <div class="bg-yellow-50 p-3 rounded-lg">
              <h4 class="font-bold text-yellow-800 mb-1">💡 טיפ:</h4>
              <p class="text-sm text-yellow-700">
                אל תפחדו לטעות! זה חלק מהלמידה. אם לא יודעים, נסו לנחש!
              </p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  interactive: {
    type: "terminal-simulator",
    title: "סימולטור טרמינל",
    description: "הקלידו פקודות וקבלו משוב מיידי",
    commands: [
      {
        task: "הצגו את הקבצים בתיקייה הנוכחית",
        correctCommand: "ls",
        hint: "הפקודה מתחילה ב-l"
      },
      {
        task: "הצגו את הנתיב הנוכחי",
        correctCommand: "pwd",
        hint: "הפקודה מתחילה ב-p"
      },
      {
        task: "עברו לתיקיית הבית",
        correctCommand: "cd ~",
        hint: "הפקודה היא cd עם סימן מיוחד"
      },
      {
        task: "צרו תיקייה חדשה בשם 'test'",
        correctCommand: "mkdir test",
        hint: "הפקודה היא mkdir ואז שם התיקייה"
      },
      {
        task: "צרו קובץ חדש בשם 'file.txt'",
        correctCommand: "touch file.txt",
        hint: "הפקודה היא touch ואז שם הקובץ"
      }
    ]
  },
  nextSlide: "slide007-file-system"
}); 