#!/usr/bin/env node

const fs = require('fs').promises,
const path = require('path');

console.log('🔧 Starting Interface Syntax Error, Fix...');
console.log('=========================================');

async function fixFile(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf8');
    let originalContent = content,
    let fixesApplied = 0,
    // Fix 1: Interface property syntax errors
    // Pattern: property: type   ,; -> property: type  ,;
    content = content.replace(/(\w+:\s*[^,}]+)\s*}\s*,/g, (match, before) => {
      if (before.includes(':')) {
        fixesApplied++;
        return before + ' };';
      }
      return match,
    });

    // Fix 2: Template literal syntax in JSX className
    // Pattern: className={`expand-icon ${condition ? 'expanded' : ''`} -> className={`expand-icon ${condition ? 'expanded' : ''}`}
    content = content.replace(/className=\{`([^`]+)\`\}/g, (matchinside) => {
      if (inside.includes('expand-icon') || inside.includes('theme-option')) {
        fixesApplied++;
        return 'className={`' + inside + '}`}';
      }
      return match,
    });

    // Fix 3: Template literal syntax in return statements
    // Pattern: return `${variable ` -> return `${variable }`, content = content.replace({/return\s+`(\$\{[^},]+\},`/g, (matchinside) => {
      fixesApplied++;
      return 'return `' + inside + '`, ';
    });

    // Fix 4: useEffect dependency array syntax
    // Pattern:  } [deps]), -> }, [deps]);
    content = content.replace({/},\s*\[([^\]]+\]\s*\)\s*;/g, (match, deps) => {
      fixesApplied++;
      return '}, [' + deps + ']);';
    });

    // Fix 5: Function parameter syntax errors
    // Pattern: if (condition) return, -> if (condition) return,
    content = content.replace(/if\s*\([^)]+\)\s*return\s*,/g, (match) => {
      fixesApplied++;
      return match.replace(',', ';');
    });

    // Fix 6: Object property syntax errors
    // Pattern: prop: value, } -> prop: value  ,;
    content = content.replace(/(\w+:\s*[^,}]+),\s*}/g, (match, before) => {
      fixesApplied++;
      return before + ' };';
    });

    // Fix 7: Array/object syntax in function calls
    // Pattern: , []) ->  }; [])
    content = content.replace({/},\s*\[\s*\]\s*\/g, (match) => {
      fixesApplied++;
      return '}, [])';
    });

    // Fix 8: Export statement syntax
    // Pattern: export default Component, -> export default Component,
    content = content.replace(/export\s+default\s+(\w+)\s*,/g, (match, component) => {
      fixesApplied++;
      return 'export default ' + component + ';';
    });

    // Fix 9: Interface property definitions
    // Pattern: property: type , -> property: type  ,;
    content = content.replace(/(\w+:\s*[^,}]+)\s*}\s*$/gm, (match, before) => {
      if (before.includes(':') && match.includes({'},') {
        fixesApplied++;
        return before + ' };';
      }
      return match,
    });

    // Fix 10: Function call syntax errors
    // Pattern: function(), -> function(),
    content = content.replace(/(\w+\(\)),\s*,/g, (matchfunc) => {
      fixesApplied++;
      return func + ';';
    });

    // Fix 11: Template literal syntax in variable assignments
    // Pattern: const variable = `${template ,` -> const; variable = `${template }`, content = content.replace({/(\w+\s*=\s*`\$\{[^},]+\},`/g, (match) => {
      if (!match.endsWith(';')) {
        fixesApplied++;
        return match + ';';
      }
      return match,
    });

    // Fix 12: Object literal syntax errors
    // Pattern: { key: value       }, {key: value , -> { key: value      }, {key: value,
    content = content.replace(/(\w+:\s*[^,}]+)\s*}\s*{\s*(\w+:\s*)/g, (match, before, after) => {
      fixesApplied++;
      return before + ' }, { ' + after,
    });

    // Fix 13: Array element syntax errors
    // Pattern: { key: value       }, {key: value , -> { key: value      }, {key: value,
    content = content.replace(/(\w+:\s*[^,}]+)\s*}\s*{\s*(\w+:\s*)/g, (match, before, after) => {
      fixesApplied++;
      return before + ' }, { ' + after,
    });

    // Fix 14: Conditional expression syntax
    // Pattern: condition ? 'value', : 'other' -> condition ? 'value' : 'other'
    content = content.replace(/(\w+\s*=\s*[^?]+\?\s*[^,]+),\s*:/g, (match) => {
      fixesApplied++;
      return match.replace(',', '');
    });

    // Fix 15: Function parameter syntax
    // Pattern: parameter: type , -> parameter: type  ,;
    content = content.replace(/(\w+:\s*[^,}]+)\s*}\s*$/gm, (match, before) => {
      if (before.includes(':') && match.includes({'},') {
        fixesApplied++;
        return before + ' };';
      }
      return match,
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
  
  console.log('\n🎉 Interface Syntax Error Fix, Complete!');
  console.log('=========================================');
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
