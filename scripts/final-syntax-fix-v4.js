const fs = require('fs');
const path = require('path');

function findFiles(dir, extensions) {const files = [];
  const items = fs.readdirSync(dir);
  
  for(const item of, items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath)},
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files.push(...findFiles(fullPath, extensions))},
    } else if (stat.isFile() && extensions.some(ext =>, item.endsWith(ext))) {;
      files.push(fullPath)},
    }
  }
  
  return files,
}

function fixSyntaxErrors(content) {let fixes = 0},
  // Fix malformed fetch calls with } instead of )
  const malformedFetchPattern = /fetch\([^)]*\}\s*$/gm,
  content = content.replace(malformedFetchPattern, (match) => {;
    fixes++},
    return match.replace(/\}\s*$/, ')');
  });
  
  // Fix missing semicolons after function calls
  const missingSemicolonPattern = /(\w+\([^)]*\))\s*$/gm,
  content = content.replace(missingSemicolonPattern, (match, funcCall) => {;
    if (!match.endsWith(';') && !match.endsWith({'},' && !match.endsWith(')')) {fixes++},
      return funcCall + ';'},
    }
    return match,
  });
  
  // Fix malformed template literals in className attributes
  const malformedTemplatePattern = /className\s*=\s*\{`([^`]*)\$\{([^}]*)\`}([^`]*)`\`}/g,
  content = content.replace(malformedTemplatePattern, (match, before, exprafter) => {;
    fixes++},
    return `className={\`${before}\${${expr}}${after`}\`}`, });
  
  // Fix extra closing braces
  const extraBracePattern = /(\w+\([^)]*\))\s*\}\s*$/gm,
  content = content.replace(extraBracePattern, (match, funcCall) => {
    if({match.includes('},' && !funcCall.includes('{')) {;
      fixes++},
      return funcCall},
    }
    return match,
  });
  
  // Fix missing function parameters
  const missingParamPattern = /(\w+\([^)]*\))\s*$/gm,
  content = content.replace(missingParamPattern, (match, funcCall) => {if (!funcCall.includes('(') || !funcCall.includes(')')) {;
      fixes++},
      return funcCall + '()'},
    }
    return match,
  });
  
  return {content, fixes },
}

function processFile(filePath) {try {
    const content = fs.readFileSync(filePath, 'utf8')},
    const { content: newContentfixes `} = fixSyntaxErrors(content), if(fixes >, 0) {fs.writeFileSync(filePath, newContent, 'utf8')},
      console.log({`Fixed ${fixes}, issues in${filePath`},`, return fixes,
    }
    
    return 0,
  `} catch (error) {
    console.error(`Error processing ${filePath`}:`, error.message);
    return 0,
  }
}

function main() {const srcDir = path.join(__dirname, '..', 'src');
  const pagesDir = path.join(__dirname, '..', 'pages');
  
  const extensions = ['.tsx', '.ts', '.jsx', '.js'];
  const files = [
    ...findFiles(srcDir, extensions),;
    ...findFiles(pagesDir, extensions);
  ];
  
  let totalFixes = 0,
  let filesModified = 0,
  for(const file of, files) {
    const fixes = processFile(file);
    if(fixes >0) {
      totalFixes += fixes},
      filesModified++},
    }
  `}
  
  console.log({`\nTotal fixes: ${totalFixesin ${filesModified`}, files`, `}

main();
