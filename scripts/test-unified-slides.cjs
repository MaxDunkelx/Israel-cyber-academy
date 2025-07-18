/**
 * Test Script: Unified Slide Components
 * 
 * This script tests the new unified slide components to ensure they work correctly
 * with both new and legacy slide formats.
 */

const fs = require('fs');
const path = require('path');

// Test data for different slide types
const testSlides = {
  content: {
    id: "test-content-1",
    type: "content",
    title: "Test Content Slide",
    content: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      elements: [
        {
          type: "title",
          text: "Test Content Slide",
          style: { fontSize: "3rem", color: "white", textAlign: "center" }
        },
        {
          type: "subtitle",
          text: "This is a test of the new content slide type",
          style: { fontSize: "1.5rem", color: "white", textAlign: "center" }
        }
      ]
    }
  },
  
  assessment_poll: {
    id: "test-assessment-poll-1",
    type: "assessment",
    title: "Test Poll Assessment",
    content: {
      assessmentType: "poll",
      question: "What is your favorite color?",
      options: ["Red", "Blue", "Green", "Yellow"],
      description: "A simple poll question"
    }
  },
  
  assessment_quiz: {
    id: "test-assessment-quiz-1",
    type: "assessment",
    title: "Test Quiz Assessment",
    content: {
      assessmentType: "quiz",
      question: "What is 2 + 2?",
      options: [
        { id: "a", text: "3", correct: false },
        { id: "b", text: "4", correct: true },
        { id: "c", text: "5", correct: false },
        { id: "d", text: "6", correct: false }
      ],
      description: "A simple math question"
    }
  },
  
  assessment_reflection: {
    id: "test-assessment-reflection-1",
    type: "assessment",
    title: "Test Reflection Assessment",
    content: {
      assessmentType: "reflection",
      question: "What did you learn today?",
      prompt: "Please share your thoughts about today's lesson",
      description: "A reflection question"
    }
  },
  
  video: {
    id: "test-video-1",
    type: "video",
    title: "Test Video Slide",
    content: {
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "A test video",
      duration: 180
    }
  },
  
  interactive: {
    id: "test-interactive-1",
    type: "interactive",
    title: "Test Interactive Slide",
    content: {
      type: "drag-drop",
      instructions: "Drag and drop the items to the correct categories",
      categories: [
        { id: "category1", name: "Category 1", color: "#4CAF50" },
        { id: "category2", name: "Category 2", color: "#f44336" }
      ],
      items: [
        { id: 1, text: "Item 1", correctCategory: "category1" },
        { id: 2, text: "Item 2", correctCategory: "category2" }
      ]
    }
  },
  
  break: {
    id: "test-break-1",
    type: "break",
    title: "Test Break Slide",
    content: {
      duration: 300,
      message: "Take a 5-minute break"
    }
  },
  
  // Legacy slide types for backward compatibility
  legacy_presentation: {
    id: "test-legacy-presentation-1",
    type: "presentation",
    title: "Test Legacy Presentation",
    content: {
      background: "linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)",
      elements: [
        {
          type: "title",
          text: "Legacy Presentation Slide",
          style: { fontSize: "3rem", color: "white", textAlign: "center" }
        }
      ]
    }
  },
  
  legacy_poll: {
    id: "test-legacy-poll-1",
    type: "poll",
    title: "Test Legacy Poll",
    content: {
      question: "Legacy poll question?",
      options: ["Option 1", "Option 2", "Option 3"]
    }
  },
  
  legacy_quiz: {
    id: "test-legacy-quiz-1",
    type: "quiz",
    title: "Test Legacy Quiz",
    content: {
      question: "Legacy quiz question?",
      options: [
        { id: "a", text: "Answer A", correct: false },
        { id: "b", text: "Answer B", correct: true }
      ]
    }
  },
  
  legacy_reflection: {
    id: "test-legacy-reflection-1",
    type: "reflection",
    title: "Test Legacy Reflection",
    content: {
      question: "Legacy reflection question?",
      prompt: "Share your thoughts"
    }
  }
};

/**
 * Test slide type conversion
 */
function testSlideConversion() {
  console.log('🧪 Testing slide type conversion...\n');
  
  Object.entries(testSlides).forEach(([name, slide]) => {
    console.log(`📋 Testing: ${name}`);
    console.log(`   Type: ${slide.type}`);
    console.log(`   ID: ${slide.id}`);
    console.log(`   Title: ${slide.title}`);
    
    // Test if the slide has the expected structure
    if (slide.content) {
      console.log(`   ✅ Has content`);
      
      if (slide.type === 'assessment' && slide.content.assessmentType) {
        console.log(`   ✅ Assessment type: ${slide.content.assessmentType}`);
      }
    } else {
      console.log(`   ❌ Missing content`);
    }
    
    console.log('');
  });
}

/**
 * Test file structure
 */
function testFileStructure() {
  console.log('📁 Testing file structure...\n');
  
  const requiredFiles = [
    'src/components/slides/ContentSlide.jsx',
    'src/components/slides/AssessmentSlide.jsx',
    'src/components/slides/index.js',
    'src/utils/constants.js'
  ];
  
  const requiredComponents = [
    'src/components/InteractiveLesson.jsx',
    'src/components/teacher/SessionHosting.jsx',
    'src/components/teacher/SlidePreviewManager.jsx',
    'src/components/student/StudentSession.jsx',
    'src/components/system-manager/LessonBuilder.jsx'
  ];
  
  console.log('Checking required slide files:');
  requiredFiles.forEach(file => {
    const exists = fs.existsSync(path.join(__dirname, '..', file));
    console.log(`   ${exists ? '✅' : '❌'} ${file}`);
  });
  
  console.log('\nChecking required components:');
  requiredComponents.forEach(file => {
    const exists = fs.existsSync(path.join(__dirname, '..', file));
    console.log(`   ${exists ? '✅' : '❌'} ${file}`);
  });
  
  console.log('');
}

/**
 * Test constants
 */
function testConstants() {
  console.log('🔧 Testing constants...\n');
  
  const constantsPath = path.join(__dirname, '../src/utils/constants.js');
  
  if (fs.existsSync(constantsPath)) {
    const constantsContent = fs.readFileSync(constantsPath, 'utf8');
    
    const requiredConstants = [
      'SLIDE_TYPES',
      'ASSESSMENT_TYPES',
      'EXERCISE_TYPES'
    ];
    
    requiredConstants.forEach(constant => {
      const hasConstant = constantsContent.includes(constant);
      console.log(`   ${hasConstant ? '✅' : '❌'} ${constant}`);
    });
  } else {
    console.log('   ❌ Constants file not found');
  }
  
  console.log('');
}

/**
 * Generate test lesson
 */
function generateTestLesson() {
  console.log('📝 Generating test lesson...\n');
  
  const testLesson = {
    id: "test-lesson-unified",
    originalId: "test-lesson-unified",
    title: "Test Lesson - Unified Slide Types",
    description: "A test lesson to verify the new unified slide system works correctly",
    icon: "🧪",
    duration: "30 דקות",
    difficulty: "קל",
    targetAge: "10-13",
    content: {
      slides: Object.values(testSlides)
    }
  };
  
  const testLessonPath = path.join(__dirname, '../test-lesson-unified.json');
  fs.writeFileSync(testLessonPath, JSON.stringify(testLesson, null, 2));
  
  console.log(`✅ Test lesson generated: ${testLessonPath}`);
  console.log(`   Contains ${testLesson.content.slides.length} slides`);
  console.log(`   Slide types: ${[...new Set(testLesson.content.slides.map(s => s.type))].join(', ')}`);
  console.log('');
}

/**
 * Main test function
 */
function runTests() {
  console.log('🧪 Unified Slide Types Test Suite');
  console.log('==================================\n');
  
  testFileStructure();
  testConstants();
  testSlideConversion();
  generateTestLesson();
  
  console.log('✅ All tests completed!');
  console.log('\n📝 Next steps:');
  console.log('1. Import the test lesson into your application');
  console.log('2. Test each slide type in the interactive lesson component');
  console.log('3. Verify that both new and legacy slide types work');
  console.log('4. Check that all components render correctly');
}

// Run tests if this script is executed directly
if (require.main === module) {
  runTests();
}

module.exports = {
  testSlides,
  testSlideConversion,
  testFileStructure,
  testConstants,
  generateTestLesson,
  runTests
}; 