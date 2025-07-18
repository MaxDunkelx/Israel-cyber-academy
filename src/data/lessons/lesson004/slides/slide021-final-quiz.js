import { createInteractiveSlide } from '../../../components/slides/InteractiveSlide.jsx';

export const slide21FinalQuiz = createInteractiveSlide({
  id: "slide021-final-quiz",
  title: "חידון סיום - Linux",
  subtitle: "בואו נבדוק מה למדנו!",
  icon: "🎯",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-purple-800 mb-4">🎯 חידון סיום - Linux</h3>
          <p class="text-lg text-gray-700">
            עכשיו נבדוק מה למדנו על Linux עם חידון מקיף!
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">📚 נושאי החידון:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">📚</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">היסטוריה וגרסאות</h4>
                    <p class="text-sm text-gray-600">לינוס טורבאלדס, Ubuntu, Arch</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">💻</span>
                  <div>
                    <h4 class="font-semibold text-green-800">טרמינל ופקודות</h4>
                    <p class="text-sm text-gray-600">ls, cd, pwd, mkdir, touch</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">📁</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">ניהול קבצים</h4>
                    <p class="text-sm text-gray-600">cp, mv, rm, הרשאות</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">📦</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">מנהלי חבילות</h4>
                    <p class="text-sm text-gray-600">apt, yum, pacman</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-red-500 text-xl">⚙️</span>
                  <div>
                    <h4 class="font-semibold text-red-800">ניהול מערכת</h4>
                    <p class="text-sm text-gray-600">תהליכים, ניטור, אבטחה</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🎮 איך החידון עובד:</h3>
            
            <div class="space-y-3">
              <div class="flex items-start space-x-3">
                <div class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">1</div>
                <div>
                  <h4 class="font-semibold text-green-800">קראו את השאלה</h4>
                  <p class="text-sm text-gray-600">בקשב רב!</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">2</div>
                <div>
                  <h4 class="font-semibold text-green-800">בחרו תשובה</h4>
                  <p class="text-sm text-gray-600">מהאפשרויות המוצגות</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">3</div>
                <div>
                  <h4 class="font-semibold text-green-800">קבלו הסבר</h4>
                  <p class="text-sm text-gray-600">למה התשובה נכונה</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">4</div>
                <div>
                  <h4 class="font-semibold text-green-800">המשיכו הלאה</h4>
                  <p class="text-sm text-gray-600">לשאלה הבאה!</p>
                </div>
              </div>
            </div>
            
            <div class="bg-yellow-50 p-3 rounded-lg">
              <h4 class="font-bold text-yellow-800 mb-1">💡 טיפ:</h4>
              <p class="text-sm text-yellow-700">
                אל תפחדו לטעות! כל טעות היא הזדמנות ללמוד משהו חדש
              </p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  interactive: {
    type: "multiple-choice",
    title: "חידון Linux מקיף",
    description: "בחרו את התשובה הנכונה לכל שאלה",
    questions: [
      {
        question: "מי יצר את Linux?",
        options: [
          "ביל גייטס",
          "לינוס טורבאלדס",
          "סטיב ג'ובס",
          "מארק צוקרברג"
        ],
        correctAnswer: 1,
        explanation: "לינוס טורבאלדס, סטודנט פיני בן 21, יצר את Linux ב-1991"
      },
      {
        question: "איזו פקודה מציגה את הקבצים בתיקייה?",
        options: [
          "cd",
          "ls",
          "pwd",
          "mkdir"
        ],
        correctAnswer: 1,
        explanation: "ls היא הפקודה להצגת קבצים ותיקיות"
      },
      {
        question: "איזו גרסת Linux הכי פופולרית למתחילים?",
        options: [
          "Arch Linux",
          "Ubuntu",
          "Gentoo",
          "Slackware"
        ],
        correctAnswer: 1,
        explanation: "Ubuntu היא הגרסה הכי פופולרית למתחילים"
      },
      {
        question: "איזו פקודה מעתיקה קובץ?",
        options: [
          "mv",
          "cp",
          "rm",
          "mkdir"
        ],
        correctAnswer: 1,
        explanation: "cp היא הפקודה להעתקת קבצים"
      },
      {
        question: "מה זה shebang בסקריפט?",
        options: [
          "הערה בקוד",
          "השורה הראשונה שמגדירה איזה shell",
          "שם המשתנה",
          "סוף הסקריפט"
        ],
        correctAnswer: 1,
        explanation: "Shebang (#!/bin/bash) מגדיר איזה shell להריץ"
      },
      {
        question: "איזו פקודה בודקת חיבור לרשת?",
        options: [
          "ip addr",
          "ping",
          "netstat",
          "ssh"
        ],
        correctAnswer: 1,
        explanation: "ping בודקת חיבור לרשת"
      },
      {
        question: "מה זה root ב-Linux?",
        options: [
          "תיקייה רגילה",
          "המשתמש החזק ביותר",
          "סוג של קובץ",
          "פקודה"
        ],
        correctAnswer: 1,
        explanation: "Root הוא המשתמש החזק ביותר עם הרשאות מלאות"
      },
      {
        question: "איזו פקודה מתקינה חבילות ב-Ubuntu?",
        options: [
          "yum install",
          "apt install",
          "pacman -S",
          "zypper install"
        ],
        correctAnswer: 1,
        explanation: "apt install היא הפקודה להתקנת חבילות ב-Ubuntu"
      },
      {
        question: "מה זה PID?",
        options: [
          "סוג של קובץ",
          "מספר ייחודי של תהליך",
          "סוג של הרשאה",
          "פקודה"
        ],
        correctAnswer: 1,
        explanation: "PID הוא Process ID - מספר ייחודי לכל תהליך"
      },
      {
        question: "איזו פקודה מציגה הרשאות של קובץ?",
        options: [
          "ls -la",
          "chmod",
          "chown",
          "pwd"
        ],
        correctAnswer: 0,
        explanation: "ls -la מציגה הרשאות מפורטות של קבצים"
      }
    ]
  },
  nextSlide: "slide022-reflection"
}); 