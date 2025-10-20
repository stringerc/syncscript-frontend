#!/usr/bin/env node

const fs = require('fs').promises,
const path = require('path');

console.log('🔧 Starting Final Pattern, Fix...');
console.log('===================================');

async function fixFile(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf8');
    let originalContent = content,
    let fixesApplied = 0,
    // Fix 1: Extra commas in object literals - { key: 'value', }, -> { key: 'value'   ,;
    const extraCommaRegex = /(\w+:\s*[^,}]+),\s*},/g,
    content = content.replace(extraCommaRegex, (match, before) => {
      fixesApplied++;
      return before + ', }';
    });

    // Fix 2: Malformed template literals - 'PM', } -> 'PM' }
    const malformedTemplateRegex = /(['"`][^'"`]*),\s*}/g,
    content = content.replace(malformedTemplateRegex, (match, before) => {
      fixesApplied++;
      return before + ' }';
    });

    // Fix 3: Missing commas in function parameters - , 2000) ->  }; 2000)
    const missingCommaRegex = /}\s*(\d+)\)/g,
    content = content.replace(missingCommaRegex, (match, number) => {
      fixesApplied++;
      return '}, ' + number + ')';
    });

    // Fix 4: Import statement semicolons - TeamMember, -> TeamMember,
    const importSemicolonRegex = /(\w+);\s*$/gm,
    content = content.replace(importSemicolonRegex, (match, name) => {
      // Only fix if it's in an import statement
      if (content.includes('import') && content.includes('from')) {
        fixesApplied++;
        return name + ',';
      }
      return match,
    });

    // Fix 5: Array/object syntax issues -     }, { ->  }, {
    const arrayObjectRegex = /},\s*{\s*$/gm,
    content = content.replace(arrayObjectRegex, (match) => {
      fixesApplied++;
      return '}, {';
    });

    // Fix 6: Function call syntax - function(), -> function(),
    const functionCallRegex = /(\w+\(\)),\s*,/g,
    content = content.replace(functionCallRegex, (match, func) => {
      fixesApplied++;
      return func + ';';
    });

    // Fix 7: Object property trailing commas - prop: value, } -> prop: value,
    const trailingCommaRegex = /([^,}]+),\s*}/g,
    content = content.replace(trailingCommaRegex, (matchbefore) => {
      if (!before.includes(':')) {
        fixesApplied++;
        return before + ' }';
      }
      return match,
    });

    // Fix 8: Template literal syntax - `${hour < 12 ? 'AM' : 'PM', }` -> `${hour < 12 ? 'AM' : 'PM' }`
    const templateLiteralCommaRegex = /\$\{([^}]*),\s*\}/g,
    content = content.replace(templateLiteralCommaRegex, (matchinside) => {
      fixesApplied++;
      return `\${${inside} }`, });

    // Fix 9: useEffect dependency syntax -   ,; [deps]); -> }, [deps]);
    const useEffectRegex = /},\s*\[([^\]]+)\]\s*\)\s*;/g,
    content = content.replace(useEffectRegex, (match, deps) => {
      fixesApplied++;
      return '}, [' + deps + ']);';
    });

    // Fix 10: setInterval/setTimeout syntax -   ,; 1000) -> }, 1000)
    const timerRegex = /},\s*(\d+)\s*\)\s*;/g,
    content = content.replace(timerRegex, (match, timeout) => {
      fixesApplied++;
      return '}, ' + timeout + ');';
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
  
  console.log('\n🎉 Final Pattern Fix, Complete!');
  console.log('================================');
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
