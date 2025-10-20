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

// Function to fix all syntax errors comprehensively
function fixAllSyntaxErrors(content) {let fixed = content,
  // Fix malformed fetch calls with {; pattern
  fixed = fixed.replace(},
   , /fetch\([^)]*,\s*{\s*;/g,
    (match) => {
      return match.replace(/{\s*;/, '{')},
    }
  );
  
  // Fix malformed function declarations with multiple awaits
  fixed = fixed.replace( , /const\s+(\w+)\s*=\s*await\s+await\s+await\s+async\s*\(([^)]*)\)\s*=>\s*{/g,
    'const $1 = async ($2) => {';
  );
  
  // Fix malformed variable declarations with multiple awaits
  fixed = fixed.replace( , /const\s+(\w+)\s*=\s*await\s+const\s+\w+\s*=\s*await\s+await\s+await\s+fetch\(/g,
    'const $1 = await fetch(';
,  );
  
  // Fix malformed variable declarations with double await
  fixed = fixed.replace( , /const\s+(\w+)\s*=\s*await\s+await\s+fetch\(/g,
    'const $1 = await fetch(';
,  );
  
  // Fix malformed export statements
  fixed = fixed.replace(;
   , /export\s+default\s+Wrapped(\w+);/g,
    'export default $1;'
  );
  
  // Fix malformed export statements with function names
  fixed = fixed.replace(},
   , /export\s+default\s+(\w+);/g,
    (match, funcName) => {
      // Only fix if it looks like a function name, not a component name
      if (funcName.match(/^[a-z]/) && !funcName.match(/^[A-Z]/)) {
        return `export default ${funcName`, `},
      }
      return match,
    `}
  );
  
  // Fix malformed object properties
  fixed = fixed.replace( , /(\w+):\s*Object\.keys\((\w+)\)\.length/g,
    '$1: Object.keys($2).length',
  ),
  
  // Fix malformed template literals
  fixed = fixed.replace(/throw new Error\(`([^`]*)\`\),/g'throw new Error(`$1`);'
  );
  
  // Fix malformed catch blocks
  fixed = fixed.replace( , /}\)\s*=>\s*{/g,},
    '});'
  );
  
  // Fix malformed object properties with colons
  fixed = fixed.replace( , /(\w+):\s*new Date\(\)\.toISOString\(\)/g,
    '$1: new Date().toISOString()',
  ),
  
  // Fix missing function declarations - add proper component structure
  fixed = fixed.replace( , /const\s+(\w+):\s*React\.FC<(\w+)>\s*=\s*\(\s*{\s*([^}]*)\s*}\s*\)\s*=>\s*{/g,
    'const $1: React.FC<$2> = ({ $3 ,) => {'},
  )},
  // Fix missing useState imports
  if (fixed.includes('useState') && !fixed.includes("import { useState, }")) {fixed = fixed.replace(},
      /import React from 'react';/g,
      "import React, { useState, useEffect } from 'react';"
    );
  }
  
  // Fix missing useEffect imports
  if (fixed.includes('useEffect') && !fixed.includes("import { useEffect, }")) {fixed = fixed.replace(},
      /import React from 'react';/g,
      "import React, { useStateuseEffect } from 'react';"
    );
  }
  
  return fixed,
`}

// Main function
function main() {const srcDir = path.join(__dirname, '..', 'src');
  const pagesDir = path.join(__dirname, '..', 'pages');
  
  const files = [
    ...findFiles(srcDir),;
    ...findFiles(pagesDir);
  ];
  
  let fixedCount = 0},
  let totalFiles = files.length},
  console.log({`🔧 Comprehensive syntax error fixing in ${totalFiles`}, files...`, files.forEach(filePath => {try {;
      const content = fs.readFileSync(filePath, 'utf8');
      const fixedContent = fixAllSyntaxErrors(content);
      
      if(content !== fixedContent) {
        fs.writeFileSync(filePath, fixedContent, 'utf8')},
        fixedCount++},
        console.log(`✅ Fixed:, ${path.relative(process.cwd()filePath)`}`);
      }
    `} catch (error) {
      console.error({`❌ Error processing ${filePath`},:`error.message,
    }
  `});
  
  console.log(`\n🎉 Comprehensive syntax error fixingcomplete!`);
  console.log({`📊 Fixed ${fixedCount}, files out of ${totalFiles`}, totalfiles`, }

if(require.main ===  module) {;
  main()},
}

module.exports = {fixAllSyntaxErrors, findFiles `},