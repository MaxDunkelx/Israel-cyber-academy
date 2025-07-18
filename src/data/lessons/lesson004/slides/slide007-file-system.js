import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide7FileSystem = createContentSlide({
  id: "slide007-file-system",
  title: "מבנה מערכת הקבצים",
  subtitle: "איך Linux מארגן קבצים ותיקיות",
  icon: "📁",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-blue-800 mb-4">🌳 מערכת הקבצים של Linux</h3>
          <p class="text-lg text-gray-700 mb-4">
            Linux מארגן את כל הקבצים במבנה עץ היררכי, כמו עץ אמיתי עם ענפים ועלים
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">📂 תיקיות חשובות:</h3>
            
            <div class="space-y-3">
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-blue-500 text-xl">/</span>
                  <div>
                    <h4 class="font-semibold text-blue-800">Root (שורש)</h4>
                    <p class="text-sm text-gray-600">התיקייה הראשית של כל המערכת</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-green-500 text-xl">/home</span>
                  <div>
                    <h4 class="font-semibold text-green-800">תיקיות משתמשים</h4>
                    <p class="text-sm text-gray-600">כל משתמש יש לו תיקייה משלו</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-purple-500 text-xl">/bin</span>
                  <div>
                    <h4 class="font-semibold text-purple-800">פקודות בסיסיות</h4>
                    <p class="text-sm text-gray-600">פקודות כמו ls, cd, mkdir</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-orange-500 text-xl">/etc</span>
                  <div>
                    <h4 class="font-semibold text-orange-800">קבצי הגדרות</h4>
                    <p class="text-sm text-gray-600">הגדרות המערכת והתוכנות</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white border border-blue-200 rounded-lg p-3">
                <div class="flex items-center space-x-3">
                  <span class="text-red-500 text-xl">/var</span>
                  <div>
                    <h4 class="font-semibold text-red-800">נתונים משתנים</h4>
                    <p class="text-sm text-gray-600">לוגים, קבצים זמניים</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-green-800 text-lg">🌳 מבנה עץ לדוגמה:</h3>
            
            <div class="bg-gray-50 p-4 rounded-lg font-mono text-sm">
              <div class="text-blue-600">/</div>
              <div class="ml-4 text-green-600">├── home/</div>
              <div class="ml-8 text-purple-600">├── user1/</div>
              <div class="ml-12 text-gray-600">├── Documents/</div>
              <div class="ml-12 text-gray-600">├── Pictures/</div>
              <div class="ml-12 text-gray-600">└── Downloads/</div>
              <div class="ml-4 text-green-600">├── bin/</div>
              <div class="ml-8 text-gray-600">├── ls</div>
              <div class="ml-8 text-gray-600">├── cd</div>
              <div class="ml-8 text-gray-600">└── mkdir</div>
              <div class="ml-4 text-green-600">├── etc/</div>
              <div class="ml-8 text-gray-600">├── passwd</div>
              <div class="ml-8 text-gray-600">└── hosts</div>
              <div class="ml-4 text-green-600">└── var/</div>
              <div class="ml-8 text-gray-600">├── log/</div>
              <div class="ml-8 text-gray-600">└── tmp/</div>
            </div>
            
            <div class="bg-yellow-50 p-3 rounded-lg">
              <h4 class="font-bold text-yellow-800 mb-1">💡 חשוב לזכור:</h4>
              <ul class="text-sm text-yellow-700 space-y-1">
                <li>• / הוא השורש של הכל</li>
                <li>• כל תיקייה יכולה להכיל תיקיות נוספות</li>
                <li>• הנתיב המלא מתחיל מ-/</li>
                <li>• ~ מייצג את תיקיית הבית של המשתמש</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bg-blue-50 p-4 rounded-lg">
          <h3 class="font-bold text-blue-800 mb-2">🎯 מה נלמד בהמשך:</h3>
          <p class="text-gray-700">
            עכשיו שנראה איך המערכת מאורגנת, נלמד פקודות לניווט וניהול קבצים!
          </p>
        </div>
      </div>
    `
  },
  nextSlide: "slide008-file-commands"
}); 