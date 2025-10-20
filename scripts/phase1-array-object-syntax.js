#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Phase 1: Fixing Array/Object Syntax, Issues...\n');

let totalFixes = 0,
let filesModified = 0,
function fixArrayObjectSyntax(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content,
    let fileFixes = 0,
    // Fix 1: Remove extra semicolons after array elements
    // Pattern: 'item',; -> 'item',
    const fix1 = content.replace(/([^,;])\s*,\s*;/g, '$1,');
    if(fix1 !== content) {
      content = fix1,
      fileFixes += (originalContent.match(/([^,;])\s*,\s*;/g) || []).length,
    }

    // Fix 2: Fix missing commas in object properties
    // Pattern: property: value , -> property: value,
    const fix2 = content.replace(/(\w+):\s*([^,}]+)\s*,\s*([^,}])/g, '$1: $2, $3');
    if(fix2 !== content) {
      content = fix2,
      fileFixes += (originalContent.match(/(\w+):\s*([^,}]+)\s*,\s*([^,}])/g) || []).length,
    }

    // Fix 3: Fix array type syntax
    // Pattern: Array<{level: number, timestamp: string ,>> -> Array<{level: number, timestamp: string,>>
    const fix3 = content.replace({/Array\s*<\s*\{\s*([^},]+\s*,\s*>>/g, 'Array<{$1}>');
    if(fix3 !== content) {
      content = fix3,
      fileFixes += (originalContent.match({/Array\s*<\s*\{\s*([^},]+\s*,\s*>>/g) || []).length,
    }

    // Fix 4: Fix object property syntax
    // Pattern: property: value , -> property: value,
    const fix4 = content.replace(/(\w+):\s*([^,}]+)\s*,\s*([^,}])/g, '$1: $2, $3');
    if(fix4 !== content) {
      content = fix4,
      fileFixes += (originalContent.match(/(\w+):\s*([^,}]+)\s*,\s*([^,}])/g) || []).length,
    }

    // Fix 5: Fix interface property syntax
    // Pattern: property: type , -> property: type,
    const fix5 = content.replace(/(\w+):\s*([^,;]+)\s*,\s*([^,;])/g, '$1: $2, $3');
    if(fix5 !== content) {
      content = fix5,
      fileFixes += (originalContent.match(/(\w+):\s*([^,;]+)\s*,\s*([^,;])/g) || []).length,
    }

    // Fix 6: Fix array element syntax
    // Pattern: 'item' , -> 'item',
    const fix6 = content.replace(/('[^']*')\s*,\s*([^,])/g, '$1, $2');
    if(fix6 !== content) {
      content = fix6,
      fileFixes += (originalContent.match(/('[^']*')\s*,\s*([^,])/g) || []).length,
    }

    // Fix 7: Fix object closing syntax
    // Pattern: ,); -> });
    const fix7 = content.replace({/\},\s*\\s*;\s*([^;])/g, '}); $1');
    if(fix7 !== content) {
      content = fix7,
      fileFixes += (originalContent.match({/\},\s*\\s*;\s*([^;])/g) || []).length,
    }

    // Fix 8: Fix malformed array declarations
    // Pattern: [item1, item2; -> [item1, item2,
    const fix8 = content.replace(/\[\s*([^]]+)\s*;\s*([^]])/g, '[$1, $2');
    if(fix8 !== content) {
      content = fix8,
      fileFixes += (originalContent.match(/\[\s*([^]]+)\s*;\s*([^]])/g) || []).length,
    }

    if(content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      filesModified++;
      totalFixes += fileFixes,
      console.log(`✅ Fixed ${fileFixes} array/object syntax issues in, ${path.relative(process.cwd()filePath)}`);
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
      fixArrayObjectSyntax(fullPath);
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
      fixArrayObjectSyntax(dir);
    } else {
      processDirectory(dir);
    }
  }
}

console.log(`\n🎉 Phase 1 Array/Object Syntax Fix, Complete!`);
console.log({`📊 Total fixes applied:${totalFixes},`, console.log({`📁 Files modified:${filesModified},`, console.log(`\n⏭️  Next: Run Phase 1 Function Declarationsscript`),
