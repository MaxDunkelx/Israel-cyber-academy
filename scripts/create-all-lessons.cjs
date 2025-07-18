const fs = require('fs');
const path = require('path');

// Lesson definitions based on the curriculum
const lessons = [
  {
    id: 'lesson010',
    title: 'דפדפנים ואבטחה',
    description: 'שיעור מקיף על דפדפנים, אבטחת מידע, והגנה מפני איומים דיגיטליים',
    icon: '🔒',
    duration: '2 שעות',
    difficulty: 'בינוני',
    slides: 20
  },
  {
    id: 'lesson011',
    title: 'תותחים',
    description: 'כלים מתקדמים בסייבר ואבטחת מידע',
    icon: '🛠️',
    duration: '2 שעות',
    difficulty: 'בינוני',
    slides: 18
  },
  {
    id: 'lesson012',
    title: 'פרוטוקולים מתקדמים',
    description: 'פרוטוקולי תקשורת מתקדמים ואבטחה',
    icon: '📡',
    duration: '2 שעות',
    difficulty: 'מתקדם',
    slides: 22
  },
  {
    id: 'lesson013',
    title: 'אינטרנט מתקדם',
    description: 'טכנולוגיות אינטרנט מתקדמות ורשתות',
    icon: '🌐',
    duration: '2 שעות',
    difficulty: 'מתקדם',
    slides: 20
  },
  {
    id: 'lesson014',
    title: 'אבטחת מידע',
    description: 'עקרונות אבטחת מידע והגנה על נתונים',
    icon: '🛡️',
    duration: '2.5 שעות',
    difficulty: 'מתקדם',
    slides: 24
  },
  {
    id: 'lesson015',
    title: 'כריית מידע',
    description: 'כריית נתונים וניתוח מידע דיגיטלי',
    icon: '⛏️',
    duration: '2 שעות',
    difficulty: 'מתקדם',
    slides: 20
  },
  {
    id: 'lesson016',
    title: 'בינה מלאכותית',
    description: 'בינה מלאכותית ולמידת מכונה בסייבר',
    icon: '🤖',
    duration: '2.5 שעות',
    difficulty: 'מתקדם',
    slides: 22
  }
];

function createSlideFile(slideNumber, lessonId) {
  const slideId = `slide${String(slideNumber).padStart(3, '0')}`;
  const slideContent = `export const ${slideId} = {
  id: "${slideId}",
  title: "שקף ${slideNumber}",
  type: "presentation",
  content: {
    text: "תוכן שקף ${slideNumber} עבור ${lessonId}",
    instructions: "הוראות לשקף ${slideNumber}"
  },
  order: ${slideNumber}
};`;

  return { slideId, content: slideContent };
}

function createLessonIndex(lesson) {
  const slideImports = [];
  const slideArray = [];
  
  for (let i = 1; i <= lesson.slides; i++) {
    const { slideId } = createSlideFile(i, lesson.id);
    slideImports.push(`import { ${slideId} } from './slides/${slideId}.js';`);
    slideArray.push(slideId);
  }

  const indexContent = `${slideImports.join('\n')}

export const ${lesson.id} = {
  id: "${lesson.id}",
  originalId: "${lesson.id}",
  title: "${lesson.title}",
  description: "${lesson.description}",
  icon: "${lesson.icon}",
  duration: "${lesson.duration}",
  difficulty: "${lesson.difficulty}",
  targetAge: "10-13",
  breakDuration: 15,
  content: {
    slides: [
      ${slideArray.join(',\n      ')}
    ]
  }
};`;

  return indexContent;
}

function createAllLessons() {
  const lessonsDir = path.join(__dirname, '..', 'src', 'data', 'lessons');
  
  lessons.forEach(lesson => {
    const lessonDir = path.join(lessonsDir, lesson.id);
    const slidesDir = path.join(lessonDir, 'slides');
    
    // Create lesson directory
    if (!fs.existsSync(lessonDir)) {
      fs.mkdirSync(lessonDir, { recursive: true });
      console.log(`✅ Created directory: ${lesson.id}`);
    }
    
    // Create slides directory
    if (!fs.existsSync(slidesDir)) {
      fs.mkdirSync(slidesDir, { recursive: true });
      console.log(`✅ Created slides directory: ${lesson.id}/slides`);
    }
    
    // Create index.js file
    const indexPath = path.join(lessonDir, 'index.js');
    const indexContent = createLessonIndex(lesson);
    fs.writeFileSync(indexPath, indexContent);
    console.log(`✅ Created index.js: ${lesson.id}/index.js`);
    
    // Create slide files
    for (let i = 1; i <= lesson.slides; i++) {
      const { slideId, content } = createSlideFile(i, lesson.id);
      const slidePath = path.join(slidesDir, `${slideId}.js`);
      fs.writeFileSync(slidePath, content);
    }
    console.log(`✅ Created ${lesson.slides} slide files for ${lesson.id}`);
  });
  
  console.log('\n🎉 All lessons created successfully!');
  console.log('📚 Total lessons available: 16');
  console.log('📋 Lessons created:');
  lessons.forEach(lesson => {
    console.log(`   - ${lesson.id}: ${lesson.title} (${lesson.slides} slides)`);
  });
}

// Run the script
createAllLessons(); 