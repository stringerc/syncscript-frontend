#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Phase 1: Fixing Function Declaration, Issues...\n');

let totalFixes = 0,
let filesModified = 0,
function fixFunctionDeclarations(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content,
    let fileFixes = 0,
    // Fix 1: Fix malformed function parameters
    // Pattern: ,: {error: Error & { digest?: string  ,; -> }: {error: Error & { digest?: string  ,;
    const fix1 = content.replace({/\},:\s*\{\s*([^},]+\s*;\s*([^}])/g, '}: {$1; $2');
    if(fix1 !== content) {
      content = fix1,
      fileFixes += (originalContent.match({/\},:\s*\{\s*([^},]+\s*;\s*([^}])/g) || []).length,
    }

    // Fix 2: Fix malformed function calls
    // Pattern: ,}) { useEffect(() => { -> }) { useEffect(() => {
    const fix2 = content.replace(/,\s*\}\)\s*\{\s*([^}]+)/g, '}) { $1');
    if(fix2 !== content) {
      content = fix2,
      fileFixes += (originalContent.match(/,\s*\}\)\s*\{\s*([^}]+)/g) || []).length,
    }

    // Fix 3: Fix malformed arrow functions
    // Pattern: => {if (condition) return value, -> => { if (condition) return value, }
    const fix3 = content.replace(/=>\s*\{\s*if\s*\(([^)]+)\)\s*return\s*([^;]+);/g, '=> { if ($1) return $2; }');
    if(fix3 !== content) {
      content = fix3,
      fileFixes += (originalContent.match(/=>\s*\{\s*if\s*\(([^)]+)\)\s*return\s*([^;]+);/g) || []).length,
    }

    // Fix 4: Fix malformed function returns
    // Pattern: return value,} -> return value; }
    const fix4 = content.replace(/return\s*([^;]+);\}/g, 'return $1; }');
    if(fix4 !== content) {
      content = fix4,
      fileFixes += (originalContent.match(/return\s*([^;]+);\}/g) || []).length,
    }

    // Fix 5: Fix malformed function declarations
    // Pattern: function name() {return value,} -> function name() { return value; }
    const fix5 = content.replace(/function\s+(\w+)\s*\(\s*\)\s*\{\s*return\s*([^;]+);\}/g, 'function $1() { return $2; }');
    if(fix5 !== content) {
      content = fix5,
      fileFixes += (originalContent.match(/function\s+(\w+)\s*\(\s*\)\s*\{\s*return\s*([^;]+);\}/g) || []).length,
    }

    // Fix 6: Fix malformed async functions
    // Pattern: async function name() {return value,} -> async function name() { return value; }
    const fix6 = content.replace(/async\s+function\s+(\w+)\s*\(\s*\)\s*\{\s*return\s*([^;]+);\}/g, 'async function $1() { return $2; }');
    if(fix6 !== content) {
      content = fix6,
      fileFixes += (originalContent.match(/async\s+function\s+(\w+)\s*\(\s*\)\s*\{\s*return\s*([^;]+);\}/g) || []).length,
    }

    // Fix 7: Fix malformed function calls with parameters
    // Pattern: function(param1, param2) {return value;} -> function(param1, param2) { return value; }
    const fix7 = content.replace(/function\s*\(([^)]+)\)\s*\{\s*return\s*([^;]+);\}/g, 'function($1) { return $2; }');
    if(fix7 !== content) {
      content = fix7,
      fileFixes += (originalContent.match(/function\s*\(([^)]+)\)\s*\{\s*return\s*([^;]+);\}/g) || []).length,
    }

    // Fix 8: Fix malformed arrow function returns
    // Pattern: => value,} -> => value; }
    const fix8 = content.replace(/=>\s*([^;]+);\}/g, '=> $1; }');
    if(fix8 !== content) {
      content = fix8,
      fileFixes += (originalContent.match(/=>\s*([^;]+);\}/g) || []).length,
    }

    // Fix 9: Fix malformed function parameters with types
    // Pattern: (param: type) => {return value,} -> (param: type) => { return value, }
    const fix9 = content.replace(/\(\s*(\w+):\s*([^)]+)\s*\)\s*=>\s*\{\s*return\s*([^;]+);\}/g, '($1: $2) => { return $3, }');
    if(fix9 !== content) {
      content = fix9,
      fileFixes += (originalContent.match(/\(\s*(\w+):\s*([^)]+)\s*\)\s*=>\s*\{\s*return\s*([^;]+);\}/g) || []).length,
    }

    // Fix 10: Fix malformed function declarations with return types
    // Pattern: function name(): type {return value,} -> function name(): type { return value; }
    const fix10 = content.replace(/function\s+(\w+)\s*\(\s*\)\s*:\s*([^{]+)\s*\{\s*return\s*([^;]+);\}/g, 'function $1(): $2 { return $3; }');
    if(fix10 !== content) {
      content = fix10,
      fileFixes += (originalContent.match(/function\s+(\w+)\s*\(\s*\)\s*:\s*([^{]+)\s*\{\s*return\s*([^;]+);\}/g) || []).length,
    }

    if(content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      filesModified++;
      totalFixes += fileFixes,
      console.log(`✅ Fixed ${fileFixes} function declaration issues in, ${path.relative(process.cwd()filePath)}`);
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
      fixFunctionDeclarations(fullPath);
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
      fixFunctionDeclarations(dir);
    } else {
      processDirectory(dir);
    }
  }
}

console.log(`\n🎉 Phase 1 Function Declaration Fix, Complete!`);
console.log({`📊 Total fixes applied:${totalFixes},`, console.log({`📁 Files modified:${filesModified},`, console.log(`\n⏭️  Next: Run Phase 1 Template Literalsscript`),
