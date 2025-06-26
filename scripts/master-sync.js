#!/usr/bin/env node

import { spawn } from 'child_process';
import { readdir } from 'fs/promises';
import { join } from 'path';

const scripts = {
  clean: 'scripts/clean-firestore.js',
  populate: 'scripts/populate-database-robust.js',
  sync: 'scripts/sync-to-firestore.js',
  test: 'scripts/test-lesson-loading.js'
};

function runScript(scriptPath) {
  return new Promise((resolve, reject) => {
    console.log(`🚀 Running: ${scriptPath}`);
    
    const child = spawn('node', [scriptPath], {
      stdio: 'inherit',
      shell: true
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ ${scriptPath} completed successfully`);
        resolve();
      } else {
        console.error(`❌ ${scriptPath} failed with code ${code}`);
        reject(new Error(`Script failed with code ${code}`));
      }
    });
    
    child.on('error', (error) => {
      console.error(`💥 Error running ${scriptPath}:`, error);
      reject(error);
    });
  });
}

async function main() {
  const command = process.argv[2];
  
  console.log('🎯 Israel Cyber Academy - Database Management');
  console.log('=============================================');
  
  switch (command) {
    case 'clean':
      console.log('🧹 Cleaning Firestore database...');
      await runScript(scripts.clean);
      break;
      
    case 'populate':
      console.log('📚 Populating database from local files...');
      await runScript(scripts.populate);
      break;
      
    case 'sync':
      console.log('🔄 Syncing local files to Firestore...');
      await runScript(scripts.sync);
      break;
      
    case 'test':
      console.log('🧪 Testing database connection...');
      await runScript(scripts.test);
      break;
      
    case 'full-sync':
      console.log('🔄 Full sync: Clean + Populate...');
      await runScript(scripts.clean);
      await runScript(scripts.populate);
      break;
      
    case 'status':
      console.log('📊 Checking database status...');
      await runScript(scripts.test);
      break;
      
    default:
      console.log(`
Usage: node scripts/master-sync.js <command>

Commands:
  clean       - Remove all lessons and slides from Firestore
  populate    - Populate Firestore from local lesson files
  sync        - Clean and repopulate (same as full-sync)
  test        - Test database connection and show current data
  full-sync   - Clean database then populate from local files
  status      - Show current database status

Examples:
  node scripts/master-sync.js clean
  node scripts/master-sync.js populate
  node scripts/master-sync.js full-sync
  node scripts/master-sync.js status

Workflow:
  1. Edit your lesson files in src/data/lessons/
  2. Run: node scripts/master-sync.js sync
  3. Your changes are now live in Firestore!
      `);
      break;
  }
}

main().catch((error) => {
  console.error('💥 Master script failed:', error);
  process.exit(1);
}); 