const fs = require('fs');
const path = require('path');

// Lesson metadata (preserved from original files)
const lessonMetadata = {
  1: {
    title: "מבוא לעולם הסייבר",
    description: "שיעור מקיף בן 2.5 שעות - הכרת עולם הסייבר, האקרים, איומים דיגיטליים ופעילויות אינטראקטיביות משופרות",
    icon: "🛡️",
    duration: "2.5 שעות",
    difficulty: "קל",
    targetAge: "10-13",
    breakDuration: 15
  },
  2: {
    title: "מחשבים וחומרה",
    description: "שיעור מקיף על מחשבים, רכיבי חומרה ותפעול מערכות",
    icon: "💻",
    duration: "2 שעות",
    difficulty: "קל",
    targetAge: "10-13",
    breakDuration: 15
  },
  3: {
    title: "מערכות הפעלה",
    description: "שיעור על מערכות הפעלה, Windows, Linux וטרמינל",
    icon: "🖥️",
    duration: "2 שעות",
    difficulty: "בינוני",
    targetAge: "10-13",
    breakDuration: 15
  },
  4: {
    title: "לינוקס וטרמינל",
    description: "שיעור על לינוקס, פקודות טרמינל וניהול קבצים",
    icon: "🐧",
    duration: "2 שעות",
    difficulty: "בינוני",
    targetAge: "10-13",
    breakDuration: 15
  },
  5: {
    title: "רשתות ואינטרנט",
    description: "שיעור על רשתות מחשבים, אינטרנט ופרוטוקולים",
    icon: "🌐",
    duration: "2 שעות",
    difficulty: "בינוני",
    targetAge: "10-13",
    breakDuration: 15
  },
  6: {
    title: "פרוטוקולים ותקשורת",
    description: "שיעור על פרוטוקולי תקשורת, HTTP, HTTPS ופרוטוקולים נוספים",
    icon: "📡",
    duration: "2 שעות",
    difficulty: "בינוני",
    targetAge: "10-13",
    breakDuration: 15
  },
  7: {
    title: "תכנות ווב",
    description: "שיעור על HTML, CSS, JavaScript ופיתוח אתרים",
    icon: "💻",
    duration: "2 שעות",
    difficulty: "בינוני",
    targetAge: "10-13",
    breakDuration: 15
  },
  8: {
    title: "מסדי נתונים",
    description: "שיעור על מסדי נתונים, SQL וניהול מידע",
    icon: "🗄️",
    duration: "2 שעות",
    difficulty: "בינוני",
    targetAge: "10-13",
    breakDuration: 15
  },
  9: {
    title: "דפדפנים ואבטחה",
    description: "שיעור על דפדפנים, אבטחה באינטרנט ופרטיות",
    icon: "🔒",
    duration: "2 שעות",
    difficulty: "בינוני",
    targetAge: "10-13",
    breakDuration: 15
  }
};

function fixLessonIndex(lessonNumber) {
  const lessonPath = `src/data/lessons/lesson${lessonNumber}`;
  const indexPath = `${lessonPath}/index.js`;
  const slidesPath = `${lessonPath}/slides`;
  
  if (!fs.existsSync(indexPath)) {
    console.log(`❌ Index file not found: ${indexPath}`);
    return;
  }
  
  console.log(`\n🔄 Fixing lesson${lessonNumber} index...`);
  
  // Get all slide files
  const files = fs.readdirSync(slidesPath);
  const slideFiles = files.filter(file => file.startsWith('slide') && file.endsWith('.js'));
  slideFiles.sort();
  
  // Get lesson metadata
  const metadata = lessonMetadata[lessonNumber];
  
  // Create new content
  let content = '';
  
  // Add imports
  slideFiles.forEach((file, index) => {
    const slideNumber = String(index + 1).padStart(3, '0');
    content += `import { slide${slideNumber} } from './slides/${file}';\n`;
  });
  
  content += '\n';
  
  // Add lesson object
  const newLessonId = `lesson${String(lessonNumber).padStart(3, '0')}`;
  content += `export const ${newLessonId} = {\n`;
  content += `  id: "${newLessonId}",\n`;
  content += `  originalId: "${newLessonId}",\n`;
  content += `  title: "${metadata.title}",\n`;
  content += `  description: "${metadata.description}",\n`;
  content += `  icon: "${metadata.icon}",\n`;
  content += `  duration: "${metadata.duration}",\n`;
  content += `  difficulty: "${metadata.difficulty}",\n`;
  content += `  targetAge: "${metadata.targetAge}",\n`;
  content += `  breakDuration: ${metadata.breakDuration},\n`;
  content += `  content: {\n`;
  content += `    slides: [\n`;
  
  // Add slides array
  slideFiles.forEach((file, index) => {
    const slideNumber = String(index + 1).padStart(3, '0');
    content += `      slide${slideNumber}`;
    if (index < slideFiles.length - 1) {
      content += ',';
    }
    content += '\n';
  });
  
  content += `    ]\n`;
  content += `  }\n`;
  content += `};`;
  
  // Write the updated content
  fs.writeFileSync(indexPath, content);
  console.log(`  ✅ Fixed ${indexPath}`);
}

// Fix all lessons
console.log('🚀 Starting lesson index fixes...');

for (let i = 1; i <= 9; i++) {
  fixLessonIndex(i);
}

console.log('\n✅ Lesson index fixes completed!'); 