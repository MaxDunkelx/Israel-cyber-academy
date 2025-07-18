import { createInteractiveSlide } from '../../../components/slides/InteractiveSlide.jsx';

export const slide9FileCommandsGame = createInteractiveSlide({
  id: "slide009-file-commands-game",
  title: "משחק פקודות קבצים",
  subtitle: "בואו נתרגל את הפקודות החדשות!",
  icon: "🎯",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-green-800 mb-4">🎮 משחק פקודות קבצים</h3>
          <p class="text-lg text-gray-700">
            עכשיו נתרגל את כל הפקודות שלמדנו עם משחק אינטראקטיבי!
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
                  <p class="text-sm text-gray-600">מה צריך לעשות עם הקבצים?</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">2</div>
                <div>
                  <h4 class="font-semibold text-blue-800">בחרו את הפקודה הנכונה</h4>
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
                <h4 class="font-semibold text-green-800 mb-1">📁 יצירה</h4>
                <p class="text-sm text-gray-600">יצירת קבצים ותיקיות חדשות</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <h4 class="font-semibold text-green-800 mb-1">📋 העתקה</h4>
                <p class="text-sm text-gray-600">העתקת קבצים למיקום אחר</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <h4 class="font-semibold text-green-800 mb-1">🚚 העברה</h4>
                <p class="text-sm text-gray-600">העברת קבצים או שינוי שמות</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <h4 class="font-semibold text-green-800 mb-1">🗑️ מחיקה</h4>
                <p class="text-sm text-gray-600">מחיקת קבצים ותיקיות</p>
              </div>
            </div>
            
            <div class="bg-yellow-50 p-3 rounded-lg">
              <h4 class="font-bold text-yellow-800 mb-1">💡 טיפ:</h4>
              <p class="text-sm text-yellow-700">
                זכרו את ההבדל בין cp (העתקה) ו-mv (העברה)!
              </p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  interactive: {
    type: "multiple-choice",
    title: "בחרו את הפקודה הנכונה",
    description: "לכל משימה, בחרו את הפקודה המתאימה",
    questions: [
      {
        question: "איך יוצרים תיקייה חדשה בשם 'projects'?",
        options: [
          "mkdir projects",
          "touch projects",
          "cp projects",
          "mv projects"
        ],
        correctAnswer: 0,
        explanation: "mkdir משמש ליצירת תיקיות חדשות"
      },
      {
        question: "איך מעתיקים קובץ 'file.txt' לתיקייה 'backup'?",
        options: [
          "mkdir file.txt backup/",
          "cp file.txt backup/",
          "mv file.txt backup/",
          "rm file.txt backup/"
        ],
        correctAnswer: 1,
        explanation: "cp משמש להעתקת קבצים"
      },
      {
        question: "איך משנים את שם הקובץ 'old.txt' ל-'new.txt'?",
        options: [
          "cp old.txt new.txt",
          "mv old.txt new.txt",
          "mkdir old.txt new.txt",
          "rm old.txt new.txt"
        ],
        correctAnswer: 1,
        explanation: "mv משמש להעברת קבצים או שינוי שמות"
      },
      {
        question: "איך מוחקים קובץ בשם 'temp.txt'?",
        options: [
          "mkdir temp.txt",
          "cp temp.txt",
          "mv temp.txt",
          "rm temp.txt"
        ],
        correctAnswer: 3,
        explanation: "rm משמש למחיקת קבצים"
      },
      {
        question: "איך יוצרים קובץ ריק בשם 'notes.txt'?",
        options: [
          "mkdir notes.txt",
          "touch notes.txt",
          "cp notes.txt",
          "mv notes.txt"
        ],
        correctAnswer: 1,
        explanation: "touch משמש ליצירת קבצים ריקים"
      }
    ]
  },
  nextSlide: "slide010-permissions"
}); 