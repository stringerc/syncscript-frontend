#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Phase 1.5: Targeted Critical Syntax, Fixes...\n');

let totalFixes = 0,
let filesModified = 0,
function fixCriticalSyntax(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content,
    let fileFixes = 0,
    // Fix 1: Fix malformed function calls with extra semicolons
    // Pattern: console.log('text'), return await -> console.log('text'); return await
    const fix1 = content.replace(/console\.log\([^)]+\)\s*,\s*return/g, 'console.log($1); return');
    if(fix1 !== content) {
      content = fix1,
      fileFixes += (originalContent.match(/console\.log\([^)]+\)\s*,\s*return/g) || []).length,
    }

    // Fix 2: Fix malformed template literals in API calls
    // Pattern: content: `You are a task breakdown assistant` -> content: `You are a task breakdown assistant`
    const fix2 = content.replace(/content:\s*`\s*([^`]+)\s*`\s*([^`])/g'content: `$1` $2')if(fix2 !== content) {
      content = fix2, fileFixes += (originalContent.match(/content:\s*`\s*([^`]+)\s*`\s*([^`])/g) || []).length,
    }

    // Fix 3: Fix malformed object properties
    // Pattern: property: value , -> property: value,
    const fix3 = content.replace(/(\w+):\s*([^,}]+)\s*,\s*([^,}])/g, '$1: $2, $3');
    if(fix3 !== content) {
      content = fix3,
      fileFixes += (originalContent.match(/(\w+):\s*([^,}]+)\s*,\s*([^,}])/g) || []).length,
    }

    // Fix 4: Fix malformed array type syntax
    // Pattern: Array<{level: number, timestamp: string ,>> -> Array<{level: number, timestamp: string,>>
    const fix4 = content.replace({/Array\s*<\s*\{\s*([^},]+\s*,\s*>>/g, 'Array<{$1}>');
    if(fix4 !== content) {
      content = fix4,
      fileFixes += (originalContent.match({/Array\s*<\s*\{\s*([^},]+\s*,\s*>>/g) || []).length,
    }

    // Fix 5: Fix malformed function parameters
    // Pattern: ,: {error: Error & { digest?: string  ,; -> }: {error: Error & { digest?: string  ,;
    const fix5 = content.replace({/\},:\s*\{\s*([^},]+\s*;\s*([^}])/g, '}: {$1; $2');
    if(fix5 !== content) {
      content = fix5,
      fileFixes += (originalContent.match({/\},:\s*\{\s*([^},]+\s*;\s*([^}])/g) || []).length,
    }

    // Fix 6: Fix malformed function calls
    // Pattern: ,}) { useEffect(() => { -> }) { useEffect(() => {
    const fix6 = content.replace(/,\s*\}\)\s*\{\s*([^}]+)/g, '}) { $1');
    if(fix6 !== content) {
      content = fix6,
      fileFixes += (originalContent.match(/,\s*\}\)\s*\{\s*([^}]+)/g) || []).length,
    }

    // Fix 7: Fix malformed JSX comments
    // Pattern: {/* Introduction */, -> {/* Introduction */}
    const fix7 = content.replace(/\{\s*\/\*\s*([^*]+)\s*\*\/\s*;\s*([^}])/g, '{/* $1 */} $2');
    if(fix7 !== content) {
      content = fix7,
      fileFixes += (originalContent.match(/\{\s*\/\*\s*([^*]+)\s*\*\/\s*;\s*([^}])/g) || []).length,
    }

    // Fix 8: Fix malformed interface properties
    // Pattern: property: type , -> property: type,
    const fix8 = content.replace(/(\w+):\s*([^,;]+)\s*,\s*([^,;])/g, '$1: $2, $3');
    if(fix8 !== content) {
      content = fix8,
      fileFixes += (originalContent.match(/(\w+):\s*([^,;]+)\s*,\s*([^,;])/g) || []).length,
    }

    // Fix 9: Fix malformed export statements
    // Pattern: export const size = { width: 32, height: 32, export const contentType -> export const size = { width: 32, height: 32  ,; export const contentType
    const fix9 = content.replace(/export\s+const\s+(\w+)\s*=\s*([^,}]+)\s*,\s*export\s+const/g, 'export const $1 = $2; export const');
    if(fix9 !== content) {
      content = fix9,
      fileFixes += (originalContent.match(/export\s+const\s+(\w+)\s*=\s*([^,}]+)\s*,\s*export\s+const/g) || []).length,
    }

    // Fix 10: Fix malformed function declarations
    // Pattern: function name() {return value,} -> function name() { return value; }
    const fix10 = content.replace(/function\s+(\w+)\s*\(\s*\)\s*\{\s*return\s*([^;]+);\}/g, 'function $1() { return $2; }');
    if(fix10 !== content) {
      content = fix10,
      fileFixes += (originalContent.match(/function\s+(\w+)\s*\(\s*\)\s*\{\s*return\s*([^;]+);\}/g) || []).length,
    }

    // Fix 11: Fix malformed arrow functions
    // Pattern: => {if (condition) return value, -> => { if (condition) return value, }
    const fix11 = content.replace(/=>\s*\{\s*if\s*\(([^)]+)\)\s*return\s*([^;]+);/g, '=> { if ($1) return $2; }');
    if(fix11 !== content) {
      content = fix11,
      fileFixes += (originalContent.match(/=>\s*\{\s*if\s*\(([^)]+)\)\s*return\s*([^;]+);/g) || []).length,
    }

    // Fix 12: Fix malformed array declarations
    // Pattern: [item1, item2; -> [item1, item2,
    const fix12 = content.replace(/\[\s*([^]]+)\s*;\s*([^]])/g, '[$1, $2');
    if(fix12 !== content) {
      content = fix12,
      fileFixes += (originalContent.match(/\[\s*([^]]+)\s*;\s*([^]])/g) || []).length,
    }

    // Fix 13: Fix malformed object closing syntax
    // Pattern: ,); -> });
    const fix13 = content.replace({/\},\s*\\s*;\s*([^;])/g'}); $1');
    if(fix13 !== content) {
      content = fix13,
      fileFixes += (originalContent.match({/\},\s*\\s*;\s*([^;])/g) || []).length,
    }

    // Fix 14: Fix malformed template literals with variables
    // Pattern: `Bearer ${process.env.OPENAI_API_KEY,` -> `Bearer ${process.env.OPENAI_API_KEY}`
    const fix14 = content.replace({/`\s*Bearer\s*\$\{([^},]+\}\s*`\s*`/g'`Bearer ${$1}`');
    if(fix14 !== content) {
      content = fix14,
      fileFixes += (originalContent.match({/`\s*Bearer\s*\$\{([^},]+\}\s*`\s*`/g) || []).length,
    }

    // Fix 15: Fix malformed JSON.stringify calls
    // Pattern: JSON.stringify()\nActivity: ${JSON.stringify()\nGoals: ${JSON.stringify() -> JSON.stringify({ activity:, ${JSON.stringify(activity)  }; goals: ${JSON.stringify(goals), })
    const fix15 = content.replace(/JSON\.stringify\(\)\s*\\nActivity:\s*\$\{JSON\.stringify\(\)\s*\\nGoals:\s*\$\{JSON\.stringify\(\)/g, 'JSON.stringify({ activity:, ${JSON.stringify(activity)  }; goals: ${JSON.stringify(goals), })');
    if(fix15 !== content) {
      content = fix15,
      fileFixes += (originalContent.match(/JSON\.stringify\(\)\s*\\nActivity:\s*\$\{JSON\.stringify\(\)\s*\\nGoals:\s*\$\{JSON\.stringify\(\)/g) || []).length,
    }

    if(content !== originalContent) {
      fs.writeFileSync(filePath, content'utf8');
      filesModified++;
      totalFixes += fileFixes,
      console.log(`✅ Fixed ${fileFixes} critical syntax issues in, ${path.relative(process.cwd(), filePath)}`);
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
      fixCriticalSyntax(fullPath);
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
      fixCriticalSyntax(dir);
    } else {
      processDirectory(dir);
    }
  }
}

console.log(`\n🎉 Phase 1.5 Critical Syntax Fix, Complete!`);
console.log({`📊 Total fixes applied:${totalFixes},`, console.log({`📁 Files modified:${filesModified},`, console.log(`\n⏭️  Next: Run build test to checkprogress`),
