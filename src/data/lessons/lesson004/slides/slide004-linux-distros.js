import { createInteractiveSlide } from '../../../components/slides/InteractiveSlide.jsx';

export const slide4LinuxDistros = createInteractiveSlide({
  id: "slide004-linux-distros",
  title: "גרסאות Linux - Distributions",
  subtitle: "יש כל כך הרבה אפשרויות!",
  icon: "🎨",
  content: {
    text: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
          <h3 class="text-xl font-bold text-green-800 mb-4">📦 מה זה Distribution?</h3>
          <p class="text-lg text-gray-700 mb-4">
            Distribution (או Distro) היא גרסה של Linux עם תוכנות וחבילות מותקנות מראש
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-bold text-blue-800 text-lg">🟢 למתחילים:</h3>
            
            <div class="bg-white border border-green-200 rounded-lg p-4">
              <div class="flex items-center space-x-3 mb-2">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">U</div>
                <h4 class="font-semibold text-green-800">Ubuntu</h4>
              </div>
              <p class="text-sm text-gray-600">הכי פופולרי למתחילים, קל לשימוש</p>
            </div>
            
            <div class="bg-white border border-green-200 rounded-lg p-4">
              <div class="flex items-center space-x-3 mb-2">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">M</div>
                <h4 class="font-semibold text-green-800">Mint</h4>
              </div>
              <p class="text-sm text-gray-600">דומה ל-Windows, מאוד ידידותי</p>
            </div>
            
            <div class="bg-white border border-green-200 rounded-lg p-4">
              <div class="flex items-center space-x-3 mb-2">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">E</div>
                <h4 class="font-semibold text-green-800">Elementary</h4>
              </div>
              <p class="text-sm text-gray-600">עיצוב יפה, דומה ל-macOS</p>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-bold text-red-800 text-lg">🔴 למתקדמים:</h3>
            
            <div class="bg-white border border-red-200 rounded-lg p-4">
              <div class="flex items-center space-x-3 mb-2">
                <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">A</div>
                <h4 class="font-semibold text-red-800">Arch</h4>
              </div>
              <p class="text-sm text-gray-600">למשתמשים מתקדמים, גמיש מאוד</p>
            </div>
            
            <div class="bg-white border border-red-200 rounded-lg p-4">
              <div class="flex items-center space-x-3 mb-2">
                <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">G</div>
                <h4 class="font-semibold text-red-800">Gentoo</h4>
              </div>
              <p class="text-sm text-gray-600">קומפילציה מהקוד, מהיר מאוד</p>
            </div>
            
            <div class="bg-white border border-red-200 rounded-lg p-4">
              <div class="flex items-center space-x-3 mb-2">
                <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">S</div>
                <h4 class="font-semibold text-red-800">Slackware</h4>
              </div>
              <p class="text-sm text-gray-600">אחד הוותיקים, פשוט ומהיר</p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  interactive: {
    type: "matching",
    title: "בואו נבדוק מה אתם זוכרים!",
    description: "חברו כל Distribution לתכונה המתאימה",
    items: [
      { id: "ubuntu", text: "Ubuntu", category: "beginner" },
      { id: "arch", text: "Arch Linux", category: "advanced" },
      { id: "mint", text: "Linux Mint", category: "beginner" },
      { id: "gentoo", text: "Gentoo", category: "advanced" }
    ],
    categories: [
      { id: "beginner", text: "למתחילים", color: "green" },
      { id: "advanced", text: "למתקדמים", color: "red" }
    ]
  },
  nextSlide: "slide005-terminal-basics"
}); 