/**
 * Firebase Database Reader - Israel Cyber Academy
 * 
 * Comprehensive script to read and analyze all collections 
 * in the cyber-campus database for architecture documentation
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require('../service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'israel-cyber-academy'
});

// Connect to cyber-campus database
const db = admin.firestore();
db.settings({ databaseId: 'cyber-campus' });

async function analyzeDatabase() {
  console.log('🔍 Starting comprehensive analysis of cyber-campus database...');
  console.log('=' .repeat(80));
  
  const analysis = {
    metadata: {
      timestamp: new Date().toISOString(),
      database: 'cyber-campus',
      project: 'israel-cyber-academy'
    },
    collections: {},
    summary: {
      totalCollections: 0,
      totalDocuments: 0,
      userRoles: new Set(),
      userCount: 0,
      errors: [],
      authenticationIssues: []
    }
  };

  try {
    // Get all collections
    const collections = await db.listCollections();
    analysis.summary.totalCollections = collections.length;
    
    console.log(`📋 Found ${collections.length} collections:`);
    collections.forEach(col => console.log(`  ✅ ${col.id}`));
    console.log('');

    // Analyze each collection
    for (const collection of collections) {
      console.log(`🔍 Analyzing collection: ${collection.id}`);
      console.log('-'.repeat(50));
      
      try {
        const docs = await collection.get();
        const docCount = docs.docs.length;
        analysis.summary.totalDocuments += docCount;
        
        console.log(`  📄 Documents: ${docCount}`);
        
        const collectionAnalysis = {
          name: collection.id,
          documentCount: docCount,
          documents: [],
          schema: {},
          sampleDocuments: []
        };

        // Analyze each document
        docs.docs.forEach((doc, index) => {
          const data = doc.data();
          const docInfo = {
            id: doc.id,
            fields: Object.keys(data),
            fieldTypes: {}
          };

          // Analyze field types
          Object.keys(data).forEach(field => {
            const value = data[field];
            let type = typeof value;
            
            if (value === null) type = 'null';
            else if (Array.isArray(value)) type = 'array';
            else if (value && value.constructor && value.constructor.name === 'Timestamp') type = 'timestamp';
            else if (value && typeof value === 'object') type = 'object';
            
            docInfo.fieldTypes[field] = type;
            
            // Build schema
            if (!collectionAnalysis.schema[field]) {
              collectionAnalysis.schema[field] = new Set();
            }
            collectionAnalysis.schema[field].add(type);
          });

          collectionAnalysis.documents.push(docInfo);

          // Store sample documents (first 5 for analysis)
          if (index < 5) {
            collectionAnalysis.sampleDocuments.push({
              id: doc.id,
              data: data
            });
          }

          // Special handling for users collection
          if (collection.id === 'users') {
            analysis.summary.userCount++;
            
            if (data.role) {
              analysis.summary.userRoles.add(data.role);
            } else {
              analysis.summary.authenticationIssues.push(`User ${doc.id} missing role field`);
            }
            
            // Check for authentication issues
            const issues = [];
            if (!data.email) issues.push('Missing email');
            if (!data.role) issues.push('Missing role');
            if (!['student', 'teacher', 'system_manager'].includes(data.role)) {
              issues.push(`Invalid role: ${data.role}`);
            }
            if (data.hasFirebaseAuth === false) issues.push('No Firebase Auth account');
            
            const status = issues.length > 0 ? `⚠️  Issues: ${issues.join(', ')}` : '✅ OK';
            
            console.log(`    👤 User: ${doc.id}`);
            console.log(`       📧 Email: ${data.email || 'MISSING'}`);
            console.log(`       👥 Role: ${data.role || 'MISSING'}`);
            console.log(`       🔐 Firebase Auth: ${data.hasFirebaseAuth ? 'Yes' : 'No'}`);
            console.log(`       🎯 Status: ${status}`);
            console.log('');
            
            if (issues.length > 0) {
              analysis.summary.authenticationIssues.push(`User ${doc.id}: ${issues.join(', ')}`);
            }
          }
        });

        // Convert schema sets to arrays for JSON serialization
        Object.keys(collectionAnalysis.schema).forEach(field => {
          collectionAnalysis.schema[field] = Array.from(collectionAnalysis.schema[field]);
        });

        analysis.collections[collection.id] = collectionAnalysis;
        
        console.log(`  ✅ Completed analysis of ${collection.id}`);
        console.log('');
        
      } catch (error) {
        console.error(`  ❌ Error analyzing collection ${collection.id}:`, error.message);
        analysis.summary.errors.push({
          collection: collection.id,
          error: error.message
        });
      }
    }

    // Convert user roles set to array
    analysis.summary.userRoles = Array.from(analysis.summary.userRoles);

    // Write detailed analysis to JSON file
    const analysisPath = path.join(__dirname, '..', 'database-analysis.json');
    fs.writeFileSync(analysisPath, JSON.stringify(analysis, null, 2));
    
    // Generate architecture documentation
    await generateArchitectureDoc(analysis);
    
    // Print comprehensive summary
    console.log('📊 COMPREHENSIVE ANALYSIS SUMMARY');
    console.log('=' .repeat(80));
    console.log(`🗂️  Total Collections: ${analysis.summary.totalCollections}`);
    console.log(`📄 Total Documents: ${analysis.summary.totalDocuments}`);
    console.log(`👥 User Roles Found: ${analysis.summary.userRoles.join(', ') || 'NONE'}`);
    console.log(`👤 Total Users: ${analysis.summary.userCount}`);
    console.log(`❌ Collection Errors: ${analysis.summary.errors.length}`);
    console.log(`🚨 Authentication Issues: ${analysis.summary.authenticationIssues.length}`);
    
    if (analysis.summary.errors.length > 0) {
      console.log('\n❌ COLLECTION ERRORS:');
      analysis.summary.errors.forEach(err => {
        console.log(`  - ${err.collection}: ${err.error}`);
      });
    }
    
    if (analysis.summary.authenticationIssues.length > 0) {
      console.log('\n🚨 AUTHENTICATION ISSUES:');
      analysis.summary.authenticationIssues.forEach(issue => {
        console.log(`  - ${issue}`);
      });
    }
    
    // Authentication analysis
    console.log('\n🔍 AUTHENTICATION ANALYSIS:');
    if (analysis.summary.userCount === 0) {
      console.log('  ❌ CRITICAL: No users found in database!');
    } else if (analysis.summary.authenticationIssues.length > 0) {
      console.log('  ⚠️  WARNING: Users exist but have authentication issues');
    } else {
      console.log('  ✅ Users appear to be properly configured');
    }
    
    console.log(`\n✅ Analysis saved to: ${analysisPath}`);
    console.log(`📋 Architecture documentation saved to: architecture.md`);
    
  } catch (error) {
    console.error('❌ Database analysis failed:', error);
    analysis.summary.errors.push({
      collection: 'GLOBAL',
      error: error.message
    });
  }

  return analysis;
}

async function generateArchitectureDoc(analysis) {
  const doc = `# 🏗️ Israel Cyber Academy - Database Architecture

## 📊 Database Overview
- **Database**: cyber-campus
- **Project**: israel-cyber-academy  
- **Analysis Date**: ${analysis.metadata.timestamp}
- **Total Collections**: ${analysis.summary.totalCollections}
- **Total Documents**: ${analysis.summary.totalDocuments}

## 👥 User System Analysis
- **User Roles Found**: ${analysis.summary.userRoles.join(', ') || 'NONE'}
- **Total Users**: ${analysis.summary.userCount}
- **Authentication Issues**: ${analysis.summary.authenticationIssues.length}

${analysis.summary.authenticationIssues.length > 0 ? `
### 🚨 Authentication Issues Found
${analysis.summary.authenticationIssues.map(issue => `- ${issue}`).join('\n')}
` : '### ✅ No Authentication Issues Found'}

---

${Object.keys(analysis.collections).map(collectionName => {
  const collection = analysis.collections[collectionName];
  
  return `## 🗂️ Collection: \`${collectionName}\`

**Document Count**: ${collection.documentCount}

### Schema
${Object.keys(collection.schema).length > 0 ? 
  Object.keys(collection.schema).map(field => 
    `- **${field}**: ${collection.schema[field].join(' | ')}`
  ).join('\n') : 'No documents or empty schema'}

${collection.sampleDocuments.length > 0 ? `
### Sample Documents
${collection.sampleDocuments.map((doc, index) => 
  `
#### Document ${index + 1}: \`${doc.id}\`
\`\`\`json
${JSON.stringify(doc.data, null, 2)}
\`\`\`
`).join('\n')}
` : ''}

---
`}).join('\n')}

## 🔍 Analysis Results

### Collection Summary
${Object.keys(analysis.collections).map(name => {
  const col = analysis.collections[name];
  return `- **${name}**: ${col.documentCount} documents`;
}).join('\n')}

### User Analysis
${analysis.summary.userCount > 0 ? `
**Users by Role:**
${analysis.summary.userRoles.map(role => {
  return `- **${role}**: Found in database`;
}).join('\n')}
` : '❌ **No users found in database**'}

${analysis.summary.errors.length > 0 ? `
### ❌ Collection Access Errors
${analysis.summary.errors.map(err => 
  `- **${err.collection}**: ${err.error}`
).join('\n')}
` : '### ✅ No Collection Access Errors'}

## 🔧 Authentication Flow Analysis

Based on the database structure, here's how authentication should work:

1. **Firebase Auth** → User logs in with email/password
2. **Profile Lookup** → System queries \`users\` collection by email
3. **Role Assignment** → User gets redirected based on \`role\` field:
   ${analysis.summary.userRoles.map(role => {
     const routes = {
       'student': '/student/roadmap',
       'teacher': '/teacher/dashboard', 
       'system_manager': '/system-manager/dashboard'
     };
     return `   - **${role}** → \`${routes[role] || '/dashboard'}\``;
   }).join('\n')}

## 🚨 Root Cause Analysis

${analysis.summary.userCount === 0 ? '### ❌ CRITICAL ISSUE: No Users Found\n\nThe main reason for authentication failures is that **no users exist in the database**. This explains why login attempts fail after Firebase Auth succeeds - there are no user profiles to load.\n\n**Solution**: Create users in the `users` collection or run user creation scripts.\n' : ''}

${analysis.summary.userRoles.length === 0 ? '### ❌ CRITICAL ISSUE: No User Roles\n\nUsers exist but have no valid roles defined. Role-based routing will fail.\n\n**Solution**: Ensure users have valid `role` field with values: student, teacher, system_manager\n' : ''}

${!analysis.collections.users ? '### ❌ CRITICAL ISSUE: Users Collection Missing\n\nThe `users` collection does not exist in the database.\n\n**Solution**: Create the `users` collection and populate it with user data.\n' : ''}

${analysis.summary.authenticationIssues.length > 0 ? '### ⚠️  Authentication Issues Found\n\nUsers exist but have configuration problems that prevent proper authentication.\n\n**Solution**: Fix the specific issues listed above for each user.\n' : ''}

${analysis.summary.errors.length > 0 ? '### ❌ Database Access Errors\n\nSome collections could not be accessed due to permission or configuration issues.\n\n**Solution**: Check Firestore security rules and permissions.\n' : ''}

## 💡 Immediate Action Items

1. **Priority 1**: ${analysis.summary.userCount === 0 ? '🔴 Create users in the database' : '🟢 Users exist'}
2. **Priority 2**: ${analysis.summary.userRoles.length === 0 ? '🔴 Add valid roles to users' : '🟢 User roles are defined'}
3. **Priority 3**: ${analysis.summary.authenticationIssues.length > 0 ? '🟡 Fix authentication issues' : '🟢 No authentication issues'}
4. **Priority 4**: ${analysis.summary.errors.length > 0 ? '🟡 Fix database access errors' : '🟢 No access errors'}

---
*Generated by database-reader.cjs on ${new Date().toISOString()}*
`;

  const architecturePath = path.join(__dirname, '..', 'architecture.md');
  fs.writeFileSync(architecturePath, doc);
}

// Run the analysis
if (require.main === module) {
  analyzeDatabase()
    .then(() => {
      console.log('\n🎯 Database analysis completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Analysis failed:', error);
      process.exit(1);
    });
}

module.exports = { analyzeDatabase }; 