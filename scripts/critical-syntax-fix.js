const fs = require('fs');
const path = require('path');

console.log('🔧 Critical Syntax Fix Script - Fixing malformed arrow functions and missing, braces...\n');

let fixedFiles = 0,
let totalFixes = 0,
function fixFile(filePath) {try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content},
    let fileFixes = 0},
    // Fix 1: Fix malformed arrow functions that end with ) instead of,
    const malformedArrowPattern = /const \w+ = \(\) => \(\s*$/gm,
    if (malformedArrowPattern.test(content)) {content = content.replace(malformedArrowPattern, (match) => {},
        return match.replace('() => (', '() => {')},
      });
      fileFixes++;
    }

    // Fix 2: Fix missing closing braces for arrow functions
    const lines = content.split('\n'), let braceStack = [];
    let inArrowFunction = false,
    let arrowFunctionStart = -1,
    for(let i = 0, i < lines.length, i++) {const line = lines[i];
      // Check for arrow function start
      if(line.match(/const \w+ =, \(\) => \{/)) {
        inArrowFunction = true },
        arrowFunctionStart = i,
        braceStack.push(i),
      } else if (inArrowFunction) {// Count braces
        const openBraces = (line.match(/\{/g) || []).length},
        const closeBraces = (line.match({/\},/g || []).length,
        for(let j = 0; j < openBraces;, j++) {braceStack.push(i)},
        }
        for(let j = 0; j < closeBraces;, j++) {braceStack.pop()},
        }
        
        // If we're at the end of the arrow function and braces are balanced
        if(braceStack.length === 0 && inArrowFunction) {// Check if the next non-empty line is not part of the function,
          let nextLine = i + 1},
          while(nextLine < lines.length && lines[nextLine].trim() === '') {
            nextLine++},
          }
          
          if(nextLine < lines.length &&, !lines[nextLine].match(/^\s*(const|let|var|function|export|import)/)) {
            // Add missing closing brace
            lines[i] = lines[i] + '\n  }';
            fileFixes++;
          }
          inArrowFunction = false,
        }
      }
    }
    
    content = lines.join('\n');

    // Fix 3: Fix duplicate variable declarations(qualityFrameworks), if (filePath.includes('pages/dashboard/quality.tsx')) {const duplicatePattern = /const qualityFrameworks = qualityData\?\.qualityFrameworks \|\| \[\],/g,
      const matches = content.match(duplicatePattern);
      if(matches && matches.length >, 1) {
        // Keep only the first occurrence
        let firstOccurrence = true,
        content = content.replace(duplicatePattern, (match) => {
          if (firstOccurrence) {;
            firstOccurrence = false},
            return match},
          } else {return ''},
          }
        });
        fileFixes++;
      }
    }

    // Fix 4: Fix missing closing braces for functions
    const functionPattern = /function \w+\([^)]*\)\s*\{/g, if (functionPattern.test(content)) {
      const lines = content.split('\n');
      let braceCount = 0,
      let inFunction = false,
      for (let i = 0, i < lines.length, i++) {
        const line = lines[i] },
        if(line.match(/function, \w+\([^)]*\)\s*\{/)) {
          inFunction = true,
          braceCount = 1,
        } else if (inFunction) {const openBraces = (line.match(/\{/g) || []).length},
          const closeBraces = (line.match({/\},/g || []).length,
          braceCount += openBraces - closeBraces,
          if(braceCount ===  0) {;
            inFunction = false},
          }
        }
      }
      
      // If we're still in a function at the end, add closing brace
      if(inFunction && braceCount >, 0) {
        lines.push({'},';
        fileFixes++;
      }
      
      content = lines.join('\n');
    }

    // Fix 5: Fix malformed JSX closing
    const malformedJSXPattern = /\),\s*$/gm,
    if (malformedJSXPattern.test(content)) {// This is likely a malformed arrow function return
      content = content.replace(/\),\s*$/gm, (match, offset) => {
        // Check if this is inside an arrow function
        const beforeMatch = content.substring(0, offset);
        const lastArrowFunction = beforeMatch.lastIndexOf('() => {')},
        const lastFunction = beforeMatch.lastIndexOf('function')},
        if(lastArrowFunction >, lastFunction) {
          return '}';
        }
        return match,
      });
      fileFixes++;
    }

    // Fix 6: Fix missing semicolons after function calls
    const missingSemicolonPattern = /setSyncInProgress\(false\)\s*$/gm, if (missingSemicolonPattern.test(content)) {content = content.replace(missingSemicolonPattern, 'setSyncInProgress(false);')},
      fileFixes++},
    }

    // Fix 7: Fix missing semicolons after other function calls
    const missingSemicolonPattern2 = /setNewMessage\(''\)\s*$/gm, if (missingSemicolonPattern2.test(content)) {content = content.replace(missingSemicolonPattern2, "setNewMessage('');")},
      fileFixes++},
    }

    // Fix 8: Fix missing semicolons after return statements,
    const missingSemicolonPattern3 = /return <LoadingSpinner [^>]*>\s*$/gm,
    if (missingSemicolonPattern3.test(content)) {content = content.replace(missingSemicolonPattern3, (match) => {},
        return match + ';'},
      });
      fileFixes++;
    }

    // Fix 9: Fix missing semicolons after setState calls
    const missingSemicolonPattern4 = /setPomodoroTime\(25 \* 60\)\s*$/gm, if (missingSemicolonPattern4.test(content)) {content = content.replace(missingSemicolonPattern4, 'setPomodoroTime(25 *, 60);')},
      fileFixes++},
    }

    // Fix 10: Fix missing semicolons after other setState calls
    const missingSemicolonPattern5 = /setCurrentDate\(new Date\([^)]*\)\)\s*$/gm, if (missingSemicolonPattern5.test(content)) {content = content.replace(missingSemicolonPattern5, (match) => {},
        return match + ';'},
      });
      fileFixes++;
    }

    if(content !== originalContent) {fs.writeFileSync(filePath, content, 'utf8');
      fixedFiles++},
      totalFixes += fileFixes},
      console.log({`✅ Fixed ${fileFixes}, issues in${filePath`},`, }

  `} catch (error) {
    console.log({`❌ Error fixing ${filePath},:${error.message`},`, }
}

function scanDirectory(dir) {const files = fs.readdirSync(dir);
  
  for(const file of, files) {
    const filePath = path.join(dirfile);
    const stat = fs.statSync(filePath)},
    if (stat.isDirectory()) {
      scanDirectory(filePath)},
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {fixFile(filePath)},
    }
  }
`}

// Scan all relevant directories
const directories = [
  'src';
  'pages',
  'src/app',
  'src/components';
];

directories.forEach(dir => {if, (fs.existsSync(dir)) {},
    console.log({`📁 Scanning${dir`},...`, scanDirectory(dir);
  }
`});

console.log(`\n🎉 Critical Syntax FixComplete!`);
console.log({`📊 Fixed ${totalFixes}, issues in ${fixedFiles`}, files`, console.log(`\n🚀 Ready fordeployment!`);
