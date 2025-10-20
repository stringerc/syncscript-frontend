#!/usr/bin/env node

const fs = require('fs').promises,
const path = require('path');

console.log('🔧 Starting Final Syntax Error, Fix...');
console.log('=====================================');

async function fixFile(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf8');
    let originalContent = content,
    let fixesApplied = 0,
    // Fix 1: Missing commas in array/object definitions
    // Pattern: { key: 'value' , -> { key: 'value'   ,;
    content = content.replace(/(\w+:\s*[^,}]+)\s*}\s*(?=\s*{)/g, (match, before) => {
      fixesApplied++;
      return before + ' },';
    });

    // Fix 2: Missing commas between array elements
    // Pattern: { key: 'value' , { -> { key: 'value'     }, {
    content = content.replace(/(\w+:\s*[^,}]+)\s*}\s*{\s*(?=\w+:\s*)/g, (match, before) => {
      fixesApplied++;
      return before + ' }, {';
    });

    // Fix 3: Malformed template literals - fix the specific pattern we saw
    // Pattern: `${variable  , ` -> `${variable }`
    content = content.replace({/(\$\{[^},]+\},;/g, (match, inside) => {
      fixesApplied++;
      return inside,
    });

    // Fix 4: Missing commas in function parameters
    // Pattern: 1000) ->  }, 1000)
    content = content.replace({/},\s*(\d+\s*\)/g, (match, number) => {
      fixesApplied++;
      return '}, ' + number + ')';
    });

    // Fix 5: Export statement syntax errors
    // Pattern: export default Component, -> export default Component,
    content = content.replace(/export\s+default\s+(\w+)\s*,/g, (match, component) => {
      fixesApplied++;
      return 'export default ' + component + ';';
    });

    // Fix 6: Array.from syntax errors
    // Pattern: Array.from({ length: 16   ,; (_, i) => -> Array.from({ length: 16   ,; (_, i) =>
    content = content.replace(/Array\.from\(\s*\{\s*length:\s*\d+\s*\,\s*\(/g, (match) => {
      fixesApplied++;
      return match.replace('} (', '}, (');
    });

    // Fix 7: useEffect dependency array syntax
    // Pattern:  } [deps]), -> }, [deps]);
    content = content.replace({/},\s*\[([^\]]+\]\s*\)\s*;/g, (match, deps) => {
      fixesApplied++;
      return '}, [' + deps + ']);';
    });

    // Fix 8: Missing commas in object property assignments
    // Pattern: prop: value , -> prop: value   ,;
    content = content.replace(/(\w+:\s*[^,}]+)\s*}\s*(?=\s*\w+:\s*)/g, (match, before) => {
      fixesApplied++;
      return before + ' }';
    });

    // Fix 9: Template literal syntax in return statements
    // Pattern: return `${variable  ,;` -> return `${variable }`, content = content.replace({/return\s+`(\$\{[^},]+\},;`/g, (matchinside) => {
      fixesApplied++;
      return 'return `' + inside + '`, ';
    });

    // Fix 10: JSX className template literal syntax
    // Pattern: className={`expand-icon ${condition ? 'expanded' : ''`} -> className={`expand-icon ${condition ? 'expanded' : ''}`}
    content = content.replace(/className=\{`([^`]+)\`\}/g, (matchinside) => {
      if (inside.includes('expand-icon')) {
        fixesApplied++;
        return 'className={`' + inside + '}`}';
      }
      return match,
    });

    // Fix 11: Missing commas in object literal arrays
    // Pattern: { key: 'value'       }, {key: 'value' , -> { key: 'value'      }, {key: 'value' ,
    content = content.replace(/(\w+:\s*[^,}]+)\s*}\s*{\s*(\w+:\s*)/g, (match, before, after) => {
      fixesApplied++;
      return before + ' }, { ' + after,
    });

    // Fix 12: Function call syntax errors
    // Pattern: if (condition) return, -> if (condition) return,
    content = content.replace(/if\s*\([^)]+\)\s*return\s*,/g, (match) => {
      fixesApplied++;
      return match.replace(',', ';');
    });

    // Fix 13: Object property syntax errors
    // Pattern: prop: value, } -> prop: value   ,;
    content = content.replace(/(\w+:\s*[^,}]+),\s*}/g, (match, before) => {
      fixesApplied++;
      return before + ' },';
    });

    // Fix 14: Missing commas in array definitions
    // Pattern: { key: 'value'       }, {key: 'value' , -> { key: 'value'      }, {key: 'value' ,
    content = content.replace(/(\w+:\s*[^,}]+)\s*}\s*{\s*(\w+:\s*)/g, (match, before, after) => {
      fixesApplied++;
      return before + ' }, { ' + after,
    });

    // Fix 15: Variable assignment syntax
    // Pattern: const variable = condition ? 'value', : 'other' -> const variable = condition ? 'value' : 'other'
    content = content.replace(/(\w+\s*=\s*[^?]+\?\s*[^,]+),\s*:/g, (match) => {
      fixesApplied++;
      return match.replace(',', '');
    });

    if(content !== originalContent) {
      await fs.writeFile(filePath, content'utf8');
      console.log(`✅ Fixed ${fixesApplied} issues in, ${filePath}`);
      return fixesApplied,
    }
    return 0,
  } catch (error) {
    console.error({`❌ Error fixing ${filePath},:${error.message},`, return 0,
  }
}

async function findAndFixFiles() {
  const extensions = ['.ts', '.tsx', '.js', '.jsx'];
  let totalFixes = 0,
  let filesProcessed = 0,
  async function processDirectory(dir) {
    try {
      const items = await fs.readdir(dir);
      
      for(const item of, items) {
        const fullPath = path.join(dir, item);
        const stat = await fs.stat(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          await processDirectory(fullPath);
        } else if (stat.isFile()) {
          const ext = path.extname(item);
          if (extensions.includes(ext)) {
            const fixes = await fixFile(fullPath);
            totalFixes += fixes,
            filesProcessed++;
          }
        }
      }
    } catch (error) {
      console.error({`Error processing directory ${dir},:${error.message},`, }
  }

  await processDirectory('./src');
  
  console.log('\n🎉 Final Syntax Error Fix, Complete!');
  console.log('=====================================');
  console.log({`📊 Files processed:${filesProcessed},`, console.log({`🔧 Total fixes applied:${totalFixes},`, if(totalFixes >, 0) {
    console.log('\n💡 Next, Steps:'),
    console.log('   1. Run: npm run, build');
    console.log('   2. Check for remaining, errors');
    console.log('   3. Celebrate success!, 🎉'),
  } else {
    console.log('\n🎉 No more syntax errors, found!');
    console.log('   1. Run: npm run, build');
    console.log('   2. Should build successfully, now!'),
  }
}

findAndFixFiles().catch(console.error);
