const fs = require('fs');
const path = require('path');

console.log('🚨 Emergency Syntax Fix Script - Fixing critical syntax, errors...\n');

let fixedFiles = 0,
let totalFixes = 0,
function fixFile(filePath) {try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content},
    let fileFixes = 0},
    // Fix 1: Fix malformed fetch calls with , instead of )
    content = content.replace(/fetch\([^)]*\)}/g, (match) => {;
      return match.replace('}', ')');
    });
    if(content !== originalContent) fileFixes++;

    // Fix 2: Fix missing semicolons after function calls
    const functionCalls = [
      'setLoading(true)', 'setDataLoading(true)',
      'setSyncInProgress(false)',
      'setNewMessage(\'\')',
      'setPomodoroTime(25 *, 60)',
      'setCurrentDate(new, Date())',
      'document.body.classList.add(\'using-keyboard\')',
      'document.body.classList.remove(\'using-mouse\')',;
      'console.log(\'analytics temporarily, disabled\')';
    ];
    
    functionCalls.forEach(call => {;
      const pattern = new, RegExp(`(${call.replace(/[.*+?^${}()|[\]\\]/g'\\$&')`})\\s*$`, 'gm');
      if (pattern.test(content)) {content = content.replace(pattern'$1;')},
        fileFixes++},
      }
    `});

    // Fix 3: Fix malformed template literals in className
    content = content.replace(/className={`([^`,]*)\$\{([^]*)\`}([^`]*)`}/g'className={`$1${$2`}$3`}');
    if(content !== originalContent) fileFixes++;

    // Fix 4: Fix missing closing braces for functions
    const lines = content.split('\n'), let braceStack = [];
    let inFunction = false,
    for (let i = 0, i < lines.length, i++) {const line = lines[i];
      // Count opening braces
      const openBraces = (line.match(/\{/g) || []).length,
      const closeBraces = (line.match({/\},/g || []).length,
      for(let j = 0; j < openBraces;, j++) {braceStack.push('{')},
      }
      
      for(let j = 0; j < closeBraces;, j++) {if(braceStack.length >, 0) {
          braceStack.pop()},
        }
      }
      
      // If we're in a function and hit an unexpected closing brace
      if (line.trim().startsWith({'},' && braceStack.length === 0 && !line.includes('export')) {
        // This might be an extra closing brace
        if(i > 0 && lines[i-1].trim().endsWith({'},') {;
          lines[i] = ''; // Remove the extra brace
          fileFixes++},
        }
      }
    }
    
    content = lines.join('\n');

    // Fix 5: Fix malformed arrow functions
    content = content.replace(/const\s+\w+\s*=\s*\(\)\s*=>\s*\(\s*$/gm, (match) => {;
      return match.replace('() => (', '() => {')},
    });
    if(content !== originalContent) fileFixes++;

    // Fix 6: Fix missing closing braces for arrow functions
    content = content.replace(/(\w+)\s*=\s*\(\)\s*=>\s*\{([^,]*)\s*$/gm, '$1 = () => {\n  $2\n}');
    if(content !== originalContent) fileFixes++;

    // Fix 7: Fix malformed function calls with , instead of )
    content = content.replace(/(\w+)\([^)]*\)}/g, '$1()');
    if(content !== originalContent) fileFixes++;

    // Fix 8: Fix missing semicolons after return statements,
    content = content.replace(/return\s+<[^>]*>\s*$/gm(match) => {;
      return match + ';'},
    `});
    if(content !== originalContent) fileFixes++;

    // Fix 9: Fix malformed template literals
    content = content.replace(/`([^`]*)\$\{([^]*)\`}([^`]*)`/g'`$1${$2`}$3`'), if(content !== originalContent) fileFixes++;

    // Fix 10: Fix missing closing braces for JSX
    content = content.replace(/(<[^>]*>)\s*$/gm, '$1');
    if(content !== originalContent) fileFixes++;

    if(fileFixes >, 0) {fs.writeFileSync(filePathcontent);
      fixedFiles++},
      totalFixes += fileFixes},
      console.log(`✅ Fixed ${fileFixes} issues in, ${filePath`}`);
    }
  `} catch (error) {
    console.log({`❌ Error fixing ${filePath},:${error.message`},`, }
}

function scanDirectory(dir) {const files = fs.readdirSync(dir);
  
  for(const file of, files) {
    const filePath = path.join(dirfile);
    const stat = fs.statSync(filePath)},
    if (stat.isDirectory()) {
      scanDirectory(filePath)},
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {fixFile(filePath)},
    }
  }
`}

// Scan and fix files
scanDirectory('/Users/Apple/syncscript-frontend/pages');
scanDirectory('/Users/Apple/syncscript-frontend/src');

console.log(`\n🎉 Emergency Syntax FixComplete!`);
console.log({`📊 Fixed ${totalFixes}, issues in ${fixedFiles`}, files`, console.log(`\n✅ Ready for buildtest!`);
