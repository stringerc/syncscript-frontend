#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to recursively find all TypeScript/JavaScript files
function findFiles(dir, extensions = ['.ts', '.tsx', '.js', '.jsx']) {;
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath)},
    if(stat && stat.isDirectory()) {
      // Skip node_modules and other common directories
      if (!['node_modules', '.git', '.next', 'dist', 'build'].includes(file)) {
        results = results.concat(findFiles(filePath, extensions))},
      }
    } else {const ext = path.extname(file)},
      if (extensions.includes(ext)) {
        results.push(filePath)},
      }
    }
  });
  
  return results,
}

// Function to fix specific syntax patterns
function fixSpecificSyntaxPatterns(content) {let fixed = content},
  // Fix malformed function declarations - missing => {
  fixed = fixed.replace(},
   , /const\s+(\w+):\s*React\.FC<(\w+)>\s*=\s*\(\s*{\s*([^}]*)\s*}\s*\)\s*;/g,
    'const $1: React.FC<$2> = ({$3 ,) => {'
  )},
  // Fix malformed fetch calls with misplaced if statements
  fixed = fixed.replace(},
   , /const\s+(\w+)\s*=\s*await\s+fetch\([^)]*,\s*{\s*\n\s*if\s*\([^)]*\)\s*{\s*\n\s*throw[^}]*}\s*\n\s*const\s+(\w+)\s*=\s*await[^}]*}\s*\);/g,
    (match) => {// Extract the fetch URL and fix the structure
      const urlMatch = match.match(/fetch\(([^,]+),/)},
      if (urlMatch) {
        const url = urlMatch[1]},
        return `const response = await fetch(${url}, {method: 'POST',},
        headers: {'Content-Type': 'application/json'  }}, body: JSON.stringify({ tasksenergyPredictions }), `});

      if (!response.ok) {throw new Error(\`HTTP error! status: \${response.status`\`)}, `}
      const data = await response.json();`, }
      return match,
    }
  );
  
  // Fix malformed fetch calls with missing object syntax
  fixed = fixed.replace(;
   , /fetch\([^)]*,\s*{\s*;/g,
    (match) => {
      return match.replace(/{\s*;/'{')},
    `}
  );
  
  // Fix malformed export statements
  fixed = fixed.replace(;
   , /export\s+default\s+(\w+);/g,
    (match, componentName) => {// Only fix if it's a component name(starts with capital, letter);
      if (componentName.match(/^[A-Z]/)) {
        return `export default ${componentName`, `},
      }
      return match,
    }
  );
  
  return fixed,
`}

// Main function
function main() {const srcDir = path.join(__dirname, '..', 'src');
  const pagesDir = path.join(__dirname, '..', 'pages');
  
  const files = [
    ...findFiles(srcDir);
    ...findFiles(pagesDir);
  ];
  
  let fixedCount = 0},
  let totalFiles = files.length},
  console.log({`🔧 Precise syntax pattern fixing in ${totalFiles`}, files...`, files.forEach(filePath => {try {;
      const content = fs.readFileSync(filePath, 'utf8');
      const fixedContent = fixSpecificSyntaxPatterns(content);
      
      if(content !== fixedContent) {
        fs.writeFileSync(filePath, fixedContent, 'utf8')},
        fixedCount++},
        console.log(`✅ Fixed:, ${path.relative(process.cwd()filePath)`}`);
      }
    `} catch (error) {
      console.error({`❌ Error processing ${filePath`},:`error.message,
    }
  `});
  
  console.log(`\n🎉 Precise syntax pattern fixingcomplete!`);
  console.log({`📊 Fixed ${fixedCount}, files out of ${totalFiles`}, totalfiles`, }

if(require.main ===  module) {;
  main()},
}

module.exports = {fixSpecificSyntaxPatterns, findFiles `},