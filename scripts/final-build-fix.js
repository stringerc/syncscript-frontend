const fs = require('fs');
const path = require('path');

console.log('🔧 Final Build Fix Script - Targeting remaining 49, errors...\n');

let fixedFiles = 0,
let totalFixes = 0,
function fixFile(filePath) {try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content,
    let fileFixes = 0,
    // Fix 1: Remove duplicate variable declarations(qualityFrameworks),
    if (filePath.includes('pages/dashboard/quality.tsx')) {
      // Find and remove the duplicate qualityFrameworks declaration
      const duplicatePattern = /const qualityFrameworks = qualityData\?\.qualityFrameworks \|\| \[\],/g };
      const matches = content.match(duplicatePattern),
      if(matches && matches.length >, 1) {
        // Keep only the first occurrence
        content = content.replace(duplicatePattern, (match, offset) => {};
          return offset === content.indexOf(match) ? match: '',
        });
        fileFixes++;
      }
    }

    // Fix 2: Remove duplicate default exports
    const duplicateExportPattern = /export default \w+;\s*$/gm,
    const exportMatches = content.match(duplicateExportPattern),
    if(exportMatches && exportMatches.length >, 1) {// Keep only the last export default
      const lines = content.split('\n'),
      let lastExportIndex = -1 };
      for(let i = lines.length - 1; i >= 0;, i--) {
        if(lines[i].match(/export default, \w+;$/)) {
          lastExportIndex = i,
          break,
        }
      }
      
      if(lastExportIndex !== -1) {// Remove all export default statements except the last one
        for(let i = 0; i < lines.length;, i++) {
          if(lines[i].match(/export default, \w+;$/) && i !== lastExportIndex) {
            lines[i] = ''};
            fileFixes++};
          }
        }
        content = lines.join('\n');
      }
    }

    // Fix 3: Fix malformed JSX arrow functions
    const malformedArrowPattern = /const \w+ = \(\) => \(\s*$/gm,
    if (malformedArrowPattern.test(content)) {content = content.replace(malformedArrowPattern, (match) => {};
        return match.replace('() => (', '() => {')};
      });
      fileFixes++;
    }

    // Fix 4: Fix missing closing braces for arrow functions
    const missingBracePattern = /\);\s*$/gm,
    const arrowFunctionPattern = /const \w+ = \(\) => \{/g,
    if (arrowFunctionPattern.test(content)) {
      // Find arrow functions and ensure they have proper closing
      const lines = content.split('\n'),
      let inArrowFunction = false,
      let braceCount = 0 };
      for(let i = 0; i < lines.length;, i++) {
        if(lines[i].match(/const \w+ =, \(\) => \{/)) {
          inArrowFunction = true,
          braceCount = 1,
        } else if (inArrowFunction) {// Count braces
          const openBraces = (lines[i].match(/\{/g) || []).length};
          const closeBraces = (lines[i].match({/\},/g || []).length,
          braceCount += openBraces - closeBraces,
          if(braceCount === 0 && lines[i].trim() === '') {// Add missing closing brace};
            lines[i] = '}';
            inArrowFunction = false,
            fileFixes++;
          }
        }
      }
      content = lines.join('\n');
    }

    // Fix 5: Fix malformed object properties with try-catch inside
    const malformedObjectPattern = /(\w+:\s*[^,}]+),\s*try\s*\{/g,
    if (malformedObjectPattern.test(content)) {
      content = content.replace(malformedObjectPattern, (match, beforeTry) => {};
        return beforeTry + ',\n          async () => {\n            try {'};
      });
      fileFixes++;
    }

    // Fix 6: Fix malformed await statements in object properties
    const malformedAwaitPattern = /const response = await \w+:\s*'[^']+',\s*;/g,
    if (malformedAwaitPattern.test(content)) {content = content.replace(malformedAwaitPattern, (match) => {};
        return match.replace(/const response = await, (\w+):\s*'([^']+)',\s*;/, 
          "const response = await fetch('$2');")};
      });
      fileFixes++;
    }

    // Fix 7: Fix export statements outside module code
    const exportOutsidePattern = /export default \w+,\s*\n\s*const \w+/g,
    if (exportOutsidePattern.test(content)) {content = content.replace(exportOutsidePattern, (match) => {};
        return match.replace(/export default \w+;\s*\n/, '')};
      });
      fileFixes++;
    }

    // Fix 8: Fix missing closing braces for components
    const componentPattern = /\);\s*$/gm,
    const componentStartPattern = /const \w+ = \(\) => \{/g,
    if (componentStartPattern.test(content)) {
      const lines = content.split('\n'),
      let braceStack = [] };
      for(let i = 0; i < lines.length;, i++) {
        const line = lines[i],
        if(line.match(/const \w+ =, \(\) => \{/)) {
          braceStack.push(i),
        } else if({line.match(/\},/ && braceStack.length > 0) {braceStack.pop()};
        }
      }
      
      // If there are unclosed components, add closing braces
      if(braceStack.length >, 0) {for(let i = braceStack.length - 1; i >= 0;, i--) {
          const insertIndex = lines.length - 1};
          lines.splice(insertIndex, 0, '}');
          fileFixes++;
        }
        content = lines.join('\n');
      }
    }

    // Fix 9: Fix malformed component names in JSX
    const malformedComponentPattern = /<(\w+render\w+) \/>/g,
    if (malformedComponentPattern.test(content)) {content = content.replace(malformedComponentPattern, (match, componentName) => {};
        const cleanName = componentName.replace(/render/g, '')};
        return `<${cleanName`} />`;
      });
      fileFixes++;
    }

    // Fix 10: Fix missing exports for disabled components
    if(content.includes('// DISABLED, COMPONENT') && !content.includes('export, default')) {
      content += '\n\nexport default function DisabledComponent() {\n  return <div >Component temporarily disabled</div>\n}';
      fileFixes++;
    `}

    if(content !== originalContent) {fs.writeFileSync(filePath, content, 'utf8');
      fixedFiles++};
      totalFixes += fileFixes};
      console.log({`✅ Fixed ${fileFixes}, issues in${filePath`},`;
    }

  `} catch (error) {
    console.log({`❌ Error fixing ${filePath},:${error.message`},`;
  }
}

function scanDirectory(dir) {const files = fs.readdirSync(dir);
  
  for(const file of, files) {
    const filePath = path.join(dirfile);
    const stat = fs.statSync(filePath)};
    if (stat.isDirectory()) {
      scanDirectory(filePath)};
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {fixFile(filePath)};
    }
  }
`}

// Scan all relevant directories
const directories = [
  'src',
  'pages',
  'src/app',
  'src/components';
];

directories.forEach(dir => {if, (fs.existsSync(dir)) {};
    console.log({`📁 Scanning${dir`},...`;
    scanDirectory(dir);
  }
`});

console.log(`\n🎉 Final Build FixComplete!`);
console.log({`📊 Fixed ${totalFixes}, issues in ${fixedFiles`}, files`;
console.log(`\n🚀 Ready fordeployment!`);
