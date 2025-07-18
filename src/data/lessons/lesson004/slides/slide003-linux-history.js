import { createContentSlide } from '../../../components/slides/ContentSlide.jsx';

export const slide3LinuxHistory = createContentSlide({
  id: "slide003-linux-history",
  title: "ההיסטוריה של Linux",
  subtitle: "איך הכל התחיל?",
  icon: "📚",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-blue-800 mb-4">🌍 הסיפור מתחיל ב-1991</h3>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-3">
              <div class="flex items-start space-x-3">
                <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h4 class="font-semibold text-blue-800">לינוס טורבאלדס</h4>
                  <p class="text-sm text-gray-600">סטודנט פיני בן 21 יצר את Linux</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h4 class="font-semibold text-blue-800">המטרה</h4>
                  <p class="text-sm text-gray-600">ליצור מערכת הפעלה חינמית כמו Unix</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h4 class="font-semibold text-blue-800">השם Linux</h4>
                  <p class="text-sm text-gray-600">שילוב של "Linus" + "Unix"</p>
                </div>
              </div>
            </div>
            
            <div class="space-y-3">
              <div class="bg-yellow-50 p-4 rounded-lg">
                <h4 class="font-bold text-yellow-800 mb-2">🐧 המאסקוט</h4>
                <p class="text-sm text-yellow-700">Tux הפינגווין נבחר כמאסקוט של Linux</p>
              </div>
              
              <div class="bg-green-50 p-4 rounded-lg">
                <h4 class="font-bold text-green-800 mb-2">💡 קוד פתוח</h4>
                <p class="text-sm text-green-700">כל אחד יכול לראות ולשנות את הקוד</p>
              </div>
              
              <div class="bg-purple-50 p-4 rounded-lg">
                <h4 class="font-bold text-purple-800 mb-2">🚀 הצלחה</h4>
                <p class="text-sm text-purple-700">היום Linux נמצא בכל מקום!</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-bold text-gray-800 mb-2">🎬 סרטון קצר על ההיסטוריה</h3>
          <p class="text-sm text-gray-600">בואו נצפה בסרטון על איך Linux הפך להיות כל כך פופולרי</p>
        </div>
      </div>
    `
  },
  media: {
    type: "video",
    url: "https://www.youtube.com/embed/5ocq6_3-nEo",
    title: "ההיסטוריה של Linux"
  },
  nextSlide: "slide004-linux-distros"
}); 