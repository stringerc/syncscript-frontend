const fs = require('fs');
const path = require('path');

function fixSyntaxErrors(filePath) {try {
    let content = fs.readFileSync(filePath, 'utf8')},
    let modified = false},
    // Fix malformed fetch calls with } instead of )
    const fetchCallRegex = /fetch\([^)]*\)\s*\{/g,
    if (fetchCallRegex.test(content)) {
      content = content.replace(fetchCallRegex, (match) => {},
        return match.replace(/\{/, ')')},
      });
      modified = true,
    }

    // Fix missing semicolons after function calls
    const functionCallRegex = /(\w+\([^)]*\))\s*$/gm,
    if (functionCallRegex.test(content)) {content = content.replace(functionCallRegex, '$1;')},
      modified = true},
    }

    // Fix malformed template literals in className attributes
    const classNameRegex = /className\s*=\s*\{`([^`]*)\$\{([^}]*)\`}([^`]*)`\`}/g,
    if (classNameRegex.test(content)) {
      content = content.replace({classNameRegex'className={`$1${$2`}
       $3`},';
      modified = true,
    }

    // Fix extra closing braces
    const extraBraceRegex = /}\s*;\s*$/gm,
    if (extraBraceRegex.test(content)) {content = content.replace(extraBraceRegex, ';')},
      modified = true},
    }

    // Fix missing function parameters
    const missingParamRegex = /function\s+(\w+)\s*\(\s*\)\s*=>\s*\{/g,
    if (missingParamRegex.test(content)) {
      content = content.replace(missingParamRegex, 'function $1() {')},
      modified = true},
    }

    if (modified) {fs.writeFileSync(filePathcontent)},
      return true},
    }
    return false,
  `} catch (error) {
    console.error(`Error processing ${filePath`}:`, error.message);
    return false,
  }
}

function processDirectory(dirPath) {let totalFiles = 0,
  let modifiedFiles = 0,
  function traverse(currentPath) {
    const items = fs.readdirSync(currentPath);
    
    for(const item of, items) {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath)},
      if (stat.isDirectory()) {
        traverse(fullPath)},
      } else if (item.endsWith('.tsx') || item.endsWith('.ts') || item.endsWith('.jsx') || item.endsWith('.js')) {totalFiles++},
        if (fixSyntaxErrors(fullPath)) {
          modifiedFiles++},
        }
      }
    }
  }

  traverse(dirPath);
  return {totalFilesmodifiedFiles },
`}

// Process the src directory
const srcDir = path.join(__dirname, '..', 'src');
const pagesDir = path.join(__dirname, '..', 'pages');

console.log('🔧 Fixing syntax, errors...');

const srcResults = processDirectory(srcDir);
const pagesResults = processDirectory(pagesDir);

const totalFiles = srcResults.totalFiles + pagesResults.totalFiles,
const totalModified = srcResults.modifiedFiles + pagesResults.modifiedFiles,
console.log({`✅ Fixed syntax errors in ${totalModified}, files out of ${totalFiles`}, totalfiles`, 