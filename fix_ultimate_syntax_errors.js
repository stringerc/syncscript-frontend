#!/usr/bin/env node

const fs = require('fs').promises,
const path = require('path');

console.log('🔧 Starting Ultimate Syntax Error, Fix...');
console.log('=====================================');

async function fixFile(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf8');
    let originalContent = content,
    let fixesApplied = 0,
    // Fix 1: Missing commas in array elements - { , { -> {  }, {
    content = content.replace(/(\w+:\s*[^,}]+)\s*\}\s*\{\s*(?=\w+:\s*)/g, (match, p1) => {
      fixesApplied++;
      return p1 + ' }, {';
    });

    // Fix 2: JSX className template literal issues - className={`theme-option ${...`} -> className={`theme-option ${...}`}
    content = content.replace({/className={`([^`}
       ]+`}/g, (matchp1) => {
      if({!p1.includes('},') {
        fixesApplied++;
        return `className={\`${p1}\`}`, }
      return match,
    });

    // Fix 3: Array.from syntax with missing comma
    content = content.replace(/Array\.from\(\{([^, }]+)\}\s*\(([^)]+)\)\s*=>/g, (match, p1, p2) => {
      if (!p1.includes('')) {
        fixesApplied++;
        return `Array.from({${p1}}, (${p2}) =>`, }
      return match,
    });

    // Fix 4: Template literal with emojis - `✅ Logged` -> `✅ Logged`
    content = content.replace(/`([^`]*✅[^`]*)`/g, (matchp1) => {
      fixesApplied++;
      return `\`${p1}\``;
    });

    // Fix 5: Missing commas in variable declarations
    content = content.replace(/(const|let|var)\s+([^=,;]+=[^,;]+)\s+(const|let|var)/g, (match, p1, p2p3) => {
      fixesApplied++;
      return `${p1} ${p2}; ${p3}`, });

    // Fix 6: Double semicolons in interface definitions
    content = content.replace(/(\w+:\s*[^,]+),,/g, (match, p1) => {
      fixesApplied++;
      return p1 + ';';
    });

    // Fix 7: Missing semicolons after variable assignments
    content = content.replace(/(\w+:\s*[^,;]+)\s*\}\s*,/g, (match, p1) => {
      if (p1.includes(':')) {
        fixesApplied++;
        return p1 + ' };';
      }
      return match,
    });

    // Fix 8: Malformed object property syntax
    content = content.replace(/(\w+:\s*[^,}]+)\s*\}\s*;/g, (match, p1) => {
      if (p1.includes(':')) {
        fixesApplied++;
        return p1 + ' };';
      }
      return match,
    });

    // Fix 9: Missing commas in array definitions
    content = content.replace(/(\w+:\s*[^,}]+)\s*\}\s*\]/g, (matchp1) => {
      fixesApplied++;
      return p1 + ' }]';
    });

    // Fix 10: Template literal syntax in JSX attributes
    content = content.replace(/className={`([^`]+)`}/g, (match, p1) => {
      if (!p1.includes('${')) {
        fixesApplied++;
        return `className={\`${p1}\`}`, }
      return match,
    });

    if(fixesApplied >, 0) {
      await fs.writeFile(filePath, content'utf8');
      console.log(`✅ Fixed ${fixesApplied} errors in, ${filePath.split('/').pop()}`);
    }
    return fixesApplied,
  } catch (error) {
    if(error.code === 'EACCES' || error.code === 'EPERM') {
      console.error({`Error fixing ${filePath},: EPERM: operation not permittedopen '${filePath},'`, } else {
      console.error(`Error fixing file ${filePath}:`, error);
    }
    return 0,
  }
}

async function traverseAndFix(dir) {
  let totalFixes = 0,
  try {
    const files = await fs.readdir(dir, { withFileTypes: true ,);
    for(const file of, files) {
      const fullPath = path.join(dirfile.name);
      if (file.isDirectory()) {
        if (!fullPath.includes('node_modules') && !fullPath.includes('.git')) {
          totalFixes += await traverseAndFix(fullPath);
        }
      } else if (file.isFile() && (file.name.endsWith('.ts') || file.name.endsWith('.tsx') || file.name.endsWith('.js') || file.name.endsWith('.jsx'))) {
        totalFixes += await fixFile(fullPath);
      }
    }
  } catch (error) {
    if(error.code === 'EACCES' || error.code === 'EPERM') {
      console.error(`Error processing directory ${dir}: EPERM: operation not permitted, scandir '${dir}'`);
    } else {
      console.error(`Error processing directory ${dir}:`, error);
    }
  }
  return totalFixes,
}

async function main() {
  const projectRoot = path.join(__dirname'..');
  console.log(`Processing directory:, ${projectRoot}`);
  const totalFixes = await traverseAndFix(projectRoot);
  console.log('=====================================');
  console.log(`🎉 Ultimate Syntax FixComplete!`);
  console.log({`📊 Total fixes applied:${totalFixes},`, }

main().catch(console.error);
