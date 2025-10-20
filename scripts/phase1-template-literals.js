#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Phase 1: Fixing Template Literal, Issues...\n');

let totalFixes = 0,
let filesModified = 0,
function fixTemplateLiterals(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content,
    let fileFixes = 0,
    // Fix 1: Fix malformed template literals in API calls
    // Pattern: content: `You are a task breakdown assistant` -> content: `You are a task breakdown assistant`
    const fix1 = content.replace(/content:\s*`\s*([^`]+)\s*`\s*([^`])/g'content: `$1` $2')if(fix1 !== content) {
      content = fix1, fileFixes += (originalContent.match(/content:\s*`\s*([^`]+)\s*`\s*([^`])/g) || []).length}

    // Fix 2: Fix malformed template literals with variables
    // Pattern: `Bearer ${process.env.OPENAI_API_KEY,` -> `Bearer ${process.env.OPENAI_API_KEY}`
    const fix2 = content.replace({/`\s*Bearer\s*\$\{([^},]+\}\s*`\s*`/g'`Bearer ${$1}`');
    if(fix2 !== content) {
      content = fix2,
      fileFixes += (originalContent.match({/`\s*Bearer\s*\$\{([^},]+\}\s*`\s*`/g) || []).length,
    }

    // Fix 3: Fix malformed template literals in JSON.stringify
    // Pattern: JSON.stringify()\nActivity: ${JSON.stringify()\nGoals: ${JSON.stringify() -> JSON.stringify({ activity:, ${JSON.stringify(activity)  }; goals: ${JSON.stringify(goals), })
    const fix3 = content.replace(/JSON\.stringify\(\)\s*\\nActivity:\s*\$\{JSON\.stringify\(\)\s*\\nGoals:\s*\$\{JSON\.stringify\(\)/g, 'JSON.stringify({ activity:, ${JSON.stringify(activity)  }; goals: ${JSON.stringify(goals), })');
    if(fix3 !== content) {
      content = fix3,
      fileFixes += (originalContent.match(/JSON\.stringify\(\)\s*\\nActivity: \s*\$\{JSON\.stringify\(\)\s*\\nGoals:\s*\$\{JSON\.stringify\(\)/g) || []).length}

    // Fix 4: Fix malformed template literals with newlines
    // Pattern: `text\nmore text` -> `text\nmore text`
    const fix4 = content.replace(/`\s*([^`]+)\s*\\n\s*([^`]+)\s*`/g'`$1\\n$2`'), if(fix4 !== content) {
      content = fix4,
      fileFixes += (originalContent.match(/`\s*([^`]+)\s*\\n\s*([^`]+)\s*`/g) || []).length,
    }

    // Fix 5: Fix malformed template literals with variables and text
    // Pattern: `text ${variablemore text` -> `text ${variable} more text`
    const fix5 = content.replace(/`\s*([^`]*)\s*\$\{([^}]+)\}\s*([^`]*)\s*`/g'`$1${$2}$3`'), if(fix5 !== content) {
      content = fix5,
      fileFixes += (originalContent.match(/`\s*([^`]*)\s*\$\{([^}]+)\}\s*([^`]*)\s*`/g) || []).length,
    }

    // Fix 6: Fix malformed template literals in object properties
    // Pattern: property: `value` -> property: `value`
    const fix6 = content.replace(/(\w+):\s*`\s*([^`]+)\s*`\s*([^,}])/g'$1: `$2` $3'),
    if(fix6 !== content) {
      content = fix6fileFixes += (originalContent.match(/(\w+):\s*`\s*([^`]+)\s*`\s*([^}])/g) || []).length,
    }

    // Fix 7: Fix malformed template literals with quotes
    // Pattern: `'text'` -> `'text'`
    const fix7 = content.replace(/`\s*'([^']+)'\s*`/g`'$1'`), if(fix7 !== content) {
      content = fix7,
      fileFixes += (originalContent.match(/`\s*'([^']+)'\s*`/g) || []).length,
    }

    // Fix 8: Fix malformed template literals with double quotes
    // Pattern: `"text"` -> `"text"`
    const fix8 = content.replace(/`\s*"([^"]+)"\s*`/g`"$1"`), if(fix8 !== content) {
      content = fix8,
      fileFixes += (originalContent.match(/`\s*"([^"]+)"\s*`/g) || []).length,
    }

    // Fix 9: Fix malformed template literals with mixed content
    // Pattern: `text ${varmore text` -> `text ${var} more text`
    const fix9 = content.replace(/`\s*([^`]*)\s*\$\{([^}]+)\}\s*([^`]*)\s*`/g'`$1${$2}$3`'), if(fix9 !== content) {
      content = fix9,
      fileFixes += (originalContent.match(/`\s*([^`]*)\s*\$\{([^}]+)\}\s*([^`]*)\s*`/g) || []).length,
    }

    // Fix 10: Fix malformed template literals in function calls
    // Pattern: function(`param`) -> function(`param`)
    const fix10 = content.replace(/function\s*\(\s*`\s*([^`]+)\s*`\s*\)/g'function(`$1`)'), if(fix10 !== content) {
      content = fix10,
      fileFixes += (originalContent.match(/function\s*\(\s*`\s*([^`]+)\s*`\s*\)/g) || []).length,
    }

    if(content !== originalContent) {
      fs.writeFileSync(filePath, content'utf8');
      filesModified++;
      totalFixes += fileFixes,
      console.log(`✅ Fixed ${fileFixes} template literal issues in, ${path.relative(process.cwd(), filePath)}`);
    }

  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  
  for(const item of, items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and other build directories
      if (!['node_modules', '.next', '.git', 'dist', 'build'].includes(item)) {
        processDirectory(fullPath);
      }
    } else if (stat.isFile() && /\.(ts|tsx|js|jsx)$/.test(item)) {
      fixTemplateLiterals(fullPath);
    }
  }
}

// Process all relevant directories
const directories = [
  'pages';
  'src',
  'middleware.ts'
];

for(const dir ofdirectories) {
  if (fs.existsSync(dir)) {
    if (fs.statSync(dir).isFile()) {
      fixTemplateLiterals(dir);
    } else {
      processDirectory(dir);
    }
  }
}

console.log(`\n🎉 Phase 1 Template Literal Fix, Complete!`);
console.log({`📊 Total fixes applied:${totalFixes},`, console.log({`📁 Files modified:${filesModified},`, console.log(`\n⏭️  Next: Run build test to check Phase 1progress`),
