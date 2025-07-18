import { createInteractiveSlide } from '../../../components/slides/InteractiveSlide.jsx';

export const slide8ProtocolGame = createInteractiveSlide({
  id: "slide008-protocol-game",
  title: "משחק פרוטוקולים",
  subtitle: "בואו נתרגל את הפרוטוקולים שלמדנו!",
  icon: "🎮",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-green-800 mb-4">🎮 משחק פרוטוקולים</h3>
          <p class="text-lg text-gray-700">
            עכשיו נתרגל את הפרוטוקולים שלמדנו עם משחק אינטראקטיבי!
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
                  <p class="text-sm text-gray-600">מה צריך לעשות ברשת?</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">2</div>
                <div>
                  <h4 class="font-semibold text-blue-800">בחרו את הפרוטוקול הנכון</h4>
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
                <h4 class="font-semibold text-green-800 mb-1">🌐 גלישה באינטרנט</h4>
                <p class="text-sm text-gray-600">איזה פרוטוקול לגלישה באתרים?</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <h4 class="font-semibold text-green-800 mb-1">📧 שליחת דוא"ל</h4>
                <p class="text-sm text-gray-600">איזה פרוטוקול לשליחת הודעות?</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <h4 class="font-semibold text-green-800 mb-1">📁 העברת קבצים</h4>
                <p class="text-sm text-gray-600">איזה פרוטוקול להעברת קבצים?</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <h4 class="font-semibold text-green-800 mb-1">🔒 חיבור בטוח</h4>
                <p class="text-sm text-gray-600">איזה פרוטוקול לחיבור מוצפן?</p>
              </div>
              
              <div class="bg-white border border-green-200 rounded-lg p-3">
                <h4 class="font-semibold text-green-800 mb-1">🎮 משחקים</h4>
                <p class="text-sm text-gray-600">איזה פרוטוקול למשחקים?</p>
              </div>
            </div>
            
            <div class="bg-yellow-50 p-3 rounded-lg">
              <h4 class="font-bold text-yellow-800 mb-1">💡 טיפ:</h4>
              <p class="text-sm text-yellow-700">
                זכרו: HTTP לגלישה, SMTP לדוא"ל, FTP לקבצים, HTTPS לבטוח!
              </p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  interactive: {
    type: "multiple-choice",
    title: "בחרו את הפרוטוקול הנכון",
    description: "לכל משימה, בחרו את הפרוטוקול המתאים",
    questions: [
      {
        question: "איזה פרוטוקול משתמשים לגלישה באתרי אינטרנט?",
        options: [
          "SMTP",
          "HTTP/HTTPS",
          "FTP",
          "SSH"
        ],
        correctAnswer: 1,
        explanation: "HTTP/HTTPS משמש לגלישה באתרי אינטרנט"
      },
      {
        question: "איזה פרוטוקול משתמשים לשליחת דוא"ל?",
        options: [
          "HTTP",
          "FTP",
          "SMTP",
          "SSH"
        ],
        correctAnswer: 2,
        explanation: "SMTP משמש לשליחת דוא"ל"
      },
      {
        question: "איזה פרוטוקול בטוח יותר לגלישה באתרים?",
        options: [
          "HTTP",
          "HTTPS",
          "FTP",
          "SMTP"
        ],
        correctAnswer: 1,
        explanation: "HTTPS הוא הגרסה המוצפנת של HTTP"
      },
      {
        question: "איזה פרוטוקול משתמשים להעברת קבצים?",
        options: [
          "HTTP",
          "SMTP",
          "FTP",
          "SSH"
        ],
        correctAnswer: 2,
        explanation: "FTP (File Transfer Protocol) משמש להעברת קבצים"
      },
      {
        question: "איזה פרוטוקול משתמשים לחיבור בטוח למחשב מרוחק?",
        options: [
          "HTTP",
          "FTP",
          "SMTP",
          "SSH"
        ],
        correctAnswer: 3,
        explanation: "SSH (Secure Shell) משמש לחיבור בטוח למחשבים מרוחקים"
      }
    ]
  },
  nextSlide: "slide009-ip-addresses"
}); 