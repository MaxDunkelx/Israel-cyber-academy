/**
 * Test Script for Advanced Editor Features
 * 
 * This script tests that all new features are properly integrated:
 * - AdvancedSlideEditor component
 * - LessonGenerator component
 * - Editor toggle functionality
 * - Firebase integration
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 Testing Advanced Editor Features...\n');

// Test 1: Check if AdvancedSlideEditor exists
console.log('📋 Test 1: AdvancedSlideEditor Component');
const advancedEditorPath = path.join(__dirname, '../src/components/system-manager/AdvancedSlideEditor.jsx');
if (fs.existsSync(advancedEditorPath)) {
  const content = fs.readFileSync(advancedEditorPath, 'utf8');
  const hasImageLibrary = content.includes('IMAGE_LIBRARY');
  const hasTemplates = content.includes('INTERACTIVE_TEMPLATES');
  const hasDragDrop = content.includes('handleElementDrag');
  
  console.log('✅ AdvancedSlideEditor file exists');
  console.log(`   - Image Library: ${hasImageLibrary ? '✅' : '❌'}`);
  console.log(`   - Interactive Templates: ${hasTemplates ? '✅' : '❌'}`);
  console.log(`   - Drag & Drop: ${hasDragDrop ? '✅' : '❌'}`);
} else {
  console.log('❌ AdvancedSlideEditor file not found');
}

// Test 2: Check if LessonGenerator exists
console.log('\n📋 Test 2: LessonGenerator Component');
const lessonGeneratorPath = path.join(__dirname, '../src/components/system-manager/LessonGenerator.jsx');
if (fs.existsSync(lessonGeneratorPath)) {
  const content = fs.readFileSync(lessonGeneratorPath, 'utf8');
  const hasTemplates = content.includes('LESSON_TEMPLATES');
  const hasSlideTypes = content.includes('SLIDE_TYPES');
  const hasGenerateFunction = content.includes('handleGenerate');
  
  console.log('✅ LessonGenerator file exists');
  console.log(`   - Lesson Templates: ${hasTemplates ? '✅' : '❌'}`);
  console.log(`   - Slide Types: ${hasSlideTypes ? '✅' : '❌'}`);
  console.log(`   - Generate Function: ${hasGenerateFunction ? '✅' : '❌'}`);
} else {
  console.log('❌ LessonGenerator file not found');
}

// Test 3: Check ContentManagement integration
console.log('\n📋 Test 3: ContentManagement Integration');
const contentManagementPath = path.join(__dirname, '../src/components/system-manager/ContentManagement.jsx');
if (fs.existsSync(contentManagementPath)) {
  const content = fs.readFileSync(contentManagementPath, 'utf8');
  const hasAdvancedEditorImport = content.includes('import AdvancedSlideEditor');
  const hasLessonGeneratorImport = content.includes('import LessonGenerator');
  const hasEditorToggle = content.includes('useAdvancedEditor');
  const hasGeneratorButton = content.includes('Generate Lesson');
  
  console.log('✅ ContentManagement file exists');
  console.log(`   - AdvancedSlideEditor Import: ${hasAdvancedEditorImport ? '✅' : '❌'}`);
  console.log(`   - LessonGenerator Import: ${hasLessonGeneratorImport ? '✅' : '❌'}`);
  console.log(`   - Editor Toggle: ${hasEditorToggle ? '✅' : '❌'}`);
  console.log(`   - Generator Button: ${hasGeneratorButton ? '✅' : '❌'}`);
} else {
  console.log('❌ ContentManagement file not found');
}

// Test 4: Check Firebase configuration
console.log('\n📋 Test 4: Firebase Configuration');
const firebaseConfigPath = path.join(__dirname, '../src/firebase/firebase-config.js');
if (fs.existsSync(firebaseConfigPath)) {
  const content = fs.readFileSync(firebaseConfigPath, 'utf8');
  const hasProjectId = content.includes('israel-cyber-academy');
  const hasAuthDomain = content.includes('firebaseapp.com');
  const hasApiKey = content.includes('apiKey');
  
  console.log('✅ Firebase config file exists');
  console.log(`   - Project ID: ${hasProjectId ? '✅' : '❌'}`);
  console.log(`   - Auth Domain: ${hasAuthDomain ? '✅' : '❌'}`);
  console.log(`   - API Key: ${hasApiKey ? '✅' : '❌'}`);
} else {
  console.log('❌ Firebase config file not found');
}

// Test 5: Check package.json dependencies
console.log('\n📋 Test 5: Dependencies');
const packageJsonPath = path.join(__dirname, '../package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const dependencies = packageJson.dependencies || {};
  const devDependencies = packageJson.devDependencies || {};
  
  const requiredDeps = [
    'firebase',
    'framer-motion',
    'lucide-react',
    'react',
    'react-dom'
  ];
  
  console.log('✅ package.json exists');
  requiredDeps.forEach(dep => {
    const hasDep = dependencies[dep] || devDependencies[dep];
    console.log(`   - ${dep}: ${hasDep ? '✅' : '❌'}`);
  });
} else {
  console.log('❌ package.json not found');
}

// Test 6: Check build configuration
console.log('\n📋 Test 6: Build Configuration');
const viteConfigPath = path.join(__dirname, '../vite.config.js');
if (fs.existsSync(viteConfigPath)) {
  const content = fs.readFileSync(viteConfigPath, 'utf8');
  const hasBasePath = content.includes('base');
  const hasReactPlugin = content.includes('@vitejs/plugin-react');
  
  console.log('✅ Vite config exists');
  console.log(`   - Base Path: ${hasBasePath ? '✅' : '❌'}`);
  console.log(`   - React Plugin: ${hasReactPlugin ? '✅' : '❌'}`);
} else {
  console.log('❌ Vite config not found');
}

// Test 7: Check deployment scripts
console.log('\n📋 Test 7: Deployment Scripts');
const packageJsonPath2 = path.join(__dirname, '../package.json');
if (fs.existsSync(packageJsonPath2)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath2, 'utf8'));
  const scripts = packageJson.scripts || {};
  
  const requiredScripts = ['build', 'deploy', 'predeploy'];
  
  console.log('✅ Deployment scripts check');
  requiredScripts.forEach(script => {
    const hasScript = scripts[script];
    console.log(`   - ${script}: ${hasScript ? '✅' : '❌'}`);
  });
} else {
  console.log('❌ package.json not found');
}

console.log('\n🎯 Summary:');
console.log('All tests completed. If you see any ❌ marks, those features may not work properly.');
console.log('\n📝 Next Steps:');
console.log('1. Run: npm run build');
console.log('2. Run: npm run preview (to test locally)');
console.log('3. Run: npm run deploy (to deploy to GitHub Pages)');
console.log('4. Test the deployed site for all features');
console.log('\n📚 See DEPLOYMENT_GUIDE.md for detailed instructions.'); 