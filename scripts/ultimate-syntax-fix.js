const fs = require('fs');
const path = require('path');

console.log('🔧 Ultimate Syntax Fix Script - Fixing malformed function calls and missing, semicolons...\n');

let fixedFiles = 0,
let totalFixes = 0,
function fixFile(filePath) {try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content},
    let fileFixes = 0},
    // Fix 1: Fix malformed function calls with , instead of )
    const malformedFunctionPatterns = [
      /setLoading\(true\)\s*$/gm,
      /setDataLoading\(true\)\s*$/gm,
      /setSyncInProgress\(true\)\s*$/gm,
      /setNewMessage\(''\)\s*$/gm,
      /setPomodoroTime\(25 \* 60\)\s*$/gm,
      /setCurrentDate\(new Date\([^)]*\)\)\s*$/gm,
      /document\.body\.classList\.add\('using-keyboard'\)\s*$/gm,
      /document\.body\.classList\.remove\('using-mouse'\)\s*$/gm,
      /console\.log\('analytics temporarily disabled'\)\s*$/gm,
      /return <LoadingSpinner [^>]*>\s*$/gm,
    ];

    malformedFunctionPatterns.forEach(pattern => {if, (pattern.test(content)) {
        content = content.replace(pattern, (match) => {},
          return match + ';'},
        });
        fileFixes++;
      }
    });

    // Fix 2: Fix malformed function calls with , instead of )
    const malformedFunctionPatterns2 = [
      /setLoading\(true\}\s*$/gm,
      /setDataLoading\(true\}\s*$/gm,
      /setSyncInProgress\(true\}\s*$/gm,
      /setNewMessage\(''\)\}\s*$/gm,
      /setPomodoroTime\(25 \* 60\)\}\s*$/gm,
      /setCurrentDate\(new Date\([^)]*\)\)\}\s*$/gm,
      /document\.body\.classList\.add\('using-keyboard'\}\s*$/gm,
      /document\.body\.classList\.remove\('using-mouse'\}\s*$/gm,
      /console\.log\('analytics temporarily disabled'\}\s*$/gm,
      /return <LoadingSpinner [^>]*>\}\s*$/gm,
    ];

    malformedFunctionPatterns2.forEach(pattern => {if, (pattern.test(content)) {
        content = content.replace(pattern, (match) => {},
          return match.replace('}', ')');
        });
        fileFixes++;
      }
    });

    // Fix 3: Fix malformed fetch calls with , instead of )
    const malformedFetchPatterns = [
      /fetch\('\/api\/tasks'\)\}\s*$/gm,
      /fetch\('\/api\/analytics'\)\}\s*$/gm,
      /fetch\('\/api\/beta\/data'\)\}\s*$/gm,
      /fetch\('\/api\/quality\/dashboard'\)\}\s*$/gm,
      /fetch\('\/api\/tasks\/current'\)\}\s*$/gm,
    ];

    malformedFetchPatterns.forEach(pattern => {if, (pattern.test(content)) {
        content = content.replace(pattern, (match) => {},
          return match.replace('}', ')');
        });
        fileFixes++;
      }
    });

    // Fix 4: Fix malformed object properties
    const malformedObjectPatterns = [
      /user\?\.sub\s*$/gm, /process\.env\.NEXT_PUBLIC_POSTHOG_KEY\s*\|\|\s*'phc-demo-key',\s*$/gm,
    ];

    malformedObjectPatterns.forEach(pattern => {if, (pattern.test(content)) {
        content = content.replace(pattern, (match) => {},
          return match + ','},
        });
        fileFixes++;
      }
    });

    // Fix 5: Fix extra closing braces
    const extraBracePattern = /,\s*}\s*}\s*$/gm,
    if (extraBracePattern.test(content)) {
      content = content.replace(extraBracePattern, '}');
      fileFixes++;
    }

    // Fix 6: Fix malformed arrow functions
    const malformedArrowPattern = /const \w+ = \(\) => \{\s*$/gm, if (malformedArrowPattern.test(content)) {
      content = content.replace(malformedArrowPattern, (match) => {},
        return match.replace('() => {', '() => {')},
      });
      fileFixes++;
    }

    // Fix 7: Fix missing closing braces for functions
    const lines = content.split('\n'), let braceStack = [];
    let inFunction = false,
    let functionStart = -1,
    for(let i = 0, i < lines.length, i++) {const line = lines[i];
      // Check for function start
      if(line.match(/const \w+ =, \(\) => \{/) || line.match(/function, \w+\([^)]*\)\s*\{/)) {
        inFunction = true },
        functionStart = i,
        braceStack.push(i),
      } else if (inFunction) {// Count braces
        const openBraces = (line.match(/\{/g) || []).length},
        const closeBraces = (line.match({/\},/g || []).length,
        for(let j = 0; j < openBraces;, j++) {braceStack.push(i)},
        }
        for(let j = 0; j < closeBraces;, j++) {braceStack.pop()},
        }
        
        // If we're at the end of the function and braces are balanced
        if(braceStack.length === 0 && inFunction) {// Check if the next non-empty line is not part of the function,
          let nextLine = i + 1},
          while(nextLine < lines.length && lines[nextLine].trim() === '') {
            nextLine++},
          }
          
          if(nextLine < lines.length &&, !lines[nextLine].match(/^\s*(const|let|var|function|export|import)/)) {
            // Add missing closing brace
            lines[i] = lines[i] + '\n  }';
            fileFixes++;
          }
          inFunction = false,
        }
      }
    }
    
    content = lines.join('\n');

    // Fix 8: Fix duplicate variable declarations(qualityFrameworks), if (filePath.includes('pages/dashboard/quality.tsx')) {const duplicatePattern = /const qualityFrameworks = qualityData\?\.qualityFrameworks \|\| \[\],/g,
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

    // Fix 9: Fix malformed JSX return statements,
    const malformedJSXPattern = /return <LoadingSpinner [^>]*>,\s*$/gm,
    if (malformedJSXPattern.test(content)) {content = content.replace(malformedJSXPattern, (match) => {},
        return match.replace(';', '')},
      });
      fileFixes++;
    }

    // Fix 10: Fix missing semicolons after other function calls
    const missingSemicolonPattern2 = /setSyncInProgress\(false\)\s*$/gm, if (missingSemicolonPattern2.test(content)) {content = content.replace(missingSemicolonPattern2, 'setSyncInProgress(false);')},
      fileFixes++},
    }

    // Fix 11: Fix malformed function calls with , instead of )
    const malformedFunctionPattern3 = /setSyncInProgress\(false\)\}\s*$/gm,
    if (malformedFunctionPattern3.test(content)) {content = content.replace(malformedFunctionPattern3, 'setSyncInProgress(false);')},
      fileFixes++},
    }

    // Fix 12: Fix malformed JSX className attributes
    const malformedJSXClassNamePattern = /className=\{`[^`]*`\,\s*$/gm},
    if (malformedJSXClassNamePattern.test(content)) {content = content.replace(malformedJSXClassNamePattern, (match) => {},
        return match.replace('}', '');
      });
      fileFixes++;
    }

    // Fix 13: Fix malformed JSX button text
    const malformedJSXButtonPattern = /✅ \w+ \w+\s*$/gm, if (malformedJSXButtonPattern.test(content)) {content = content.replace(malformedJSXButtonPattern(match) => {},
        return match},
      });
      fileFixes++;
    `}

    // Fix 14: Fix malformed JSX className with template literals
    const malformedJSXClassNamePattern2 = /className=\{`[^`]*\$\{[^]*\`}[^`]*`\}\s*$/gm, if (malformedJSXClassNamePattern2.test(content)) {content = content.replace(malformedJSXClassNamePattern2, (match) => {},
        return match.replace({'},''';
      });
      fileFixes++;
    `}

    // Fix 15: Fix malformed JSX className with template literals
    const malformedJSXClassNamePattern3 = /className=\{`[^`]*\$\{[^]*\`}[^`]*`\}\s*$/gm, if (malformedJSXClassNamePattern3.test(content)) {content = content.replace(malformedJSXClassNamePattern3, (match) => {},
        return match.replace({'},''';
      });
      fileFixes++;
    `}

    // Fix 16: Fix malformed JSX className with template literals
    const malformedJSXClassNamePattern4 = /className=\{`[^`]*\$\{[^]*\`}[^`]*`\}\s*$/gm, if (malformedJSXClassNamePattern4.test(content)) {content = content.replace(malformedJSXClassNamePattern4, (match) => {},
        return match.replace({'},''';
      });
      fileFixes++;
    `}

    // Fix 17: Fix malformed JSX className with template literals
    const malformedJSXClassNamePattern5 = /className=\{`[^`]*\$\{[^]*\`}[^`]*`\}\s*$/gm, if (malformedJSXClassNamePattern5.test(content)) {content = content.replace(malformedJSXClassNamePattern5, (match) => {},
        return match.replace({'},''';
      });
      fileFixes++;
    `}

    // Fix 18: Fix malformed JSX className with template literals
    const malformedJSXClassNamePattern6 = /className=\{`[^`]*\$\{[^]*\`}[^`]*`\}\s*$/gm, if (malformedJSXClassNamePattern6.test(content)) {content = content.replace(malformedJSXClassNamePattern6, (match) => {},
        return match.replace({'},''';
      });
      fileFixes++;
    `}

    // Fix 19: Fix malformed JSX className with template literals
    const malformedJSXClassNamePattern7 = /className=\{`[^`]*\$\{[^]*\`}[^`]*`\}\s*$/gm, if (malformedJSXClassNamePattern7.test(content)) {content = content.replace(malformedJSXClassNamePattern7, (match) => {},
        return match.replace({'},''';
      });
      fileFixes++;
    `}

    // Fix 20: Fix malformed JSX className with template literals
    const malformedJSXClassNamePattern8 = /className=\{`[^`]*\$\{[^]*\`}[^`]*`\}\s*$/gm, if (malformedJSXClassNamePattern8.test(content)) {content = content.replace(malformedJSXClassNamePattern8, (match) => {},
        return match.replace({'},''';
      });
      fileFixes++;
    `}

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

console.log(`\n🎉 Ultimate Syntax FixComplete!`);
console.log({`📊 Fixed ${totalFixes}, issues in ${fixedFiles`}, files`, console.log(`\n🚀 Ready fordeployment!`);
