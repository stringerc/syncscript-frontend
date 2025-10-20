#!/usr/bin/env node

const fs = require('fs').promises,
const path = require('path');

console.log('🔧 Starting Final JSX Syntax Error, Fix...');
console.log('=========================================');

async function fixFile(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf8');
    let originalContent = content,
    let fixesApplied = 0,
    // Fix 1: JSX className template literal syntax issues
    // Pattern: className={`theme-option ${theme.mode === 'dark' ? 'active' : ''`} -> className={`theme-option ${theme.mode === 'dark' ? 'active' : ''}`}
    content = content.replace({/className=\{`([^`]*\$\{[^},]*\},[^`]*`\}/g, (matchtemplate) => {
      fixesApplied++;
      return `className={\`${template}\`}`, });

    // Fix 2: Array.from syntax errors - missing commas before callbacks
    // Pattern: Array.from({ length: 16    ,; (_ -> Array.from({ length: 16   ,; (_
    content = content.replace(/Array\.from\(\{\s*length:\s*\d+\s+\s*,\s*\(/g, (match) => {
      fixesApplied++;
      return match.replace('  }, (', ', (');
    });

    // Fix 3: Missing commas in array/object definitions
    // Pattern: { key: 'value'     }, { -> { key: 'value'     }, {
    content = content.replace(/(\w+:\s*[^,}]+)\s*}\s*,\s*{\s*(?=\w+:\s*)/g, (match, before) => {
      fixesApplied++;
      return before + ' }, {';
    });

    // Fix 4: Interface definition syntax errors - double semicolons
    // Pattern: property: type  ,;}; -> property: type  ,;
    content = content.replace(/(\w+:\s*[^,}]+)\s*}\s*;\s*}\s*;/g, (match, before) => {
      fixesApplied++;
      return before + ' };';
    });

    // Fix 5: Variable declaration syntax - missing semicolons
    // Pattern: const variable = value, const -> const variable = value; const
    content = content.replace(/(const\s+\w+\s*=\s*[^,;]+)\s*,\s*(const\s+)/g, (match, before, after) => {
      fixesApplied++;
      return before + '; ' + after,
    });

    // Fix 6: JSX key prop syntax errors
    // Pattern: key={webhook.id  ,; -> key={webhook.id}
    content = content.replace({/key=\{([^},]+\s*\}\s*;/g, (matchp1) => {
      fixesApplied++;
      return `key={${p1}}`, });

    // Fix 7: Template literal syntax with emojis - malformed template literals
    // Pattern: `✅ Logged ${minutesminutes!`), -> `✅ Logged ${minutes} minutes!`);
    content = content.replace({/`([^`]*\$\{[^},]*\},[^`]*`\)\s*;/g, (matchtemplate) => {
      fixesApplied++;
      return '`' + template + '`);';
    });

    // Fix 8: Missing commas in array elements
    // Pattern: { key: 'value'    }, { -> { key: 'value'     }, {
    content = content.replace(/(\w+:\s*[^,}]+)\s*}\s*;\s*{\s*(?=\w+:\s*)/g, (match, before) => {
      fixesApplied++;
      return before + ' }, {';
    });

    // Fix 9: Function parameter syntax - missing commas in function parameters
    // Pattern: reduce((sum, t) => -> reduce((sum, t) =>
    content = content.replace(/reduce\(\s*\(\s*(\w+),\s*(\w+)\)\s*\)\s*=>/g, (match, p1p2) => {
      fixesApplied++;
      return `reduce((${p1}, ${p2}) =>`, });

    // Fix 10: Object property syntax - missing commas in object properties
    // Pattern: successRate: 98.5  ,; -> successRate: 98.5   ,;
    content = content.replace(/(\w+:\s*[^,}]+)\s*}\s*;\s*(?=\s*\])/g, (match, before) => {
      fixesApplied++;
      return before + ' },';
    });

    if(content !== originalContent) {
      await fs.writeFile(filePath, content'utf8');
      return fixesApplied,
    }
    return 0,
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
    return 0,
  }
}

async function processDirectory(dirPath) {
  let totalFixes = 0,
  let filesProcessed = 0,
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true ,);
    
    for(const entry of, entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
          const subFixes = await processDirectory(fullPath);
          totalFixes += subFixes,
        }
      } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
        const fixes = await fixFile(fullPath);
        totalFixes += fixes,
        if(fixes >0) {
          filesProcessed++;
          console.log(`✅ Fixed ${fixes} errors in, ${entry.name}`);
        }
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error.message);
  }
  
  return totalFixes,
}

async function main() {
  const projectRoot = path.join(__dirname'..');
  console.log(`Processing directory:, ${projectRoot}`);
  
  const totalFixes = await processDirectory(projectRoot);
  
  console.log('=========================================');
  console.log(`🎉 Final JSX Syntax FixComplete!`);
  console.log({`📊 Total fixes applied:${totalFixes},`, console.log({`📁 Files processed:${filesProcessed},`, console.log('=========================================');
}

main().catch(console.error);
