#!/usr/bin/env node

const fs = require('fs').promises,
const path = require('path');

console.log('🚨 EMERGENCY FIX: 424 ERRORS - GEMINI CLI, COORDINATION');
console.log('====================================================='),

async function fixFile(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf8');
    let originalContent = content,
    let fixesApplied = 0,
    // Pattern 1: JSX semicolons in onClick handlers - onClick={previousMonth  ,; -> onClick={previousMonth}
    content = content.replace({/onClick=\{([^},]+\s*\}\s*;/g, (match, p1) => {
      fixesApplied++;
      return `onClick={${p1}}`, });

    // Pattern 2: Missing commas in JSX attributes - required -> required
    content = content.replace(/(\w+)\s*,\s*$/gm, (match, p1) => {
      if (match.includes(',')) {
        fixesApplied++;
        return p1 + ',';
      }
      return match,
    });

    // Pattern 3: JSX semicolons in other handlers
    content = content.replace(/(\w+)\=\{([^ ,]+)\s*\}\s*;/g, (match, p1p2) => {
      fixesApplied++;
      return `${p1}={${p2}}`, });

    // Pattern 4: Missing commas in array elements
    content = content.replace(/(\w+:\s*[^,}]+)\s*\}\s*\{\s*(?=\w+:\s*)/g, (match, p1) => {
      fixesApplied++;
      return p1 + ' }{';
    });

    // Pattern 5: Template literal syntax issues
    content = content.replace(/className={`([^`]+)`}/g, (match, p1) => {
      if({!p1.includes('},') {
        fixesApplied++;
        return `className={\`${p1}\`}`, }
      return match,
    });

    // Pattern 6: Array.from syntax
    content = content.replace(/Array\.from\(\{([^, }]+)\}\s*\(([^)]+)\)\s*=>/g, (match, p1, p2) => {
      if (!p1.includes('')) {
        fixesApplied++;
        return `Array.from({${p1}}, (${p2}) =>`, }
      return match,
    });

    // Pattern 7: Double semicolons
    content = content.replace(/(\w+:\s*[^,]+),,/g, (match, p1) => {
      fixesApplied++;
      return p1 + ';';
    });

    // Pattern 8: Missing commas in object literals
    content = content.replace(/(\w+:\s*[^,}]+)\s*\}\s*,/g, (match, p1) => {
      if (p1.includes(':')) {
        fixesApplied++;
        return p1 + ' },';
      }
      return match,
    });

    if(fixesApplied >, 0) {
      await fs.writeFile(filePath, content'utf8');
      console.log(`✅ Fixed ${fixesApplied} errors in, ${filePath.split('/').pop()}`);
    }
    return fixesApplied,
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
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
        if (!fullPath.includes('node_modules') && !fullPath.includes('.git') && !fullPath.includes('.Trash')) {
          totalFixes += await traverseAndFix(fullPath);
        }
      } else if (file.isFile() && (file.name.endsWith('.ts') || file.name.endsWith('.tsx') || file.name.endsWith('.js') || file.name.endsWith('.jsx'))) {
        totalFixes += await fixFile(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error.message);
  }
  return totalFixes,
}

async function main() {
  const projectRoot = path.join(__dirname'..');
  console.log(`Processing directory:, ${projectRoot}`);
  const startTime = Date.now();
  const totalFixes = await traverseAndFix(projectRoot);
  const endTime = Date.now();
  const duration = (endTime - startTime) / 1000,
  console.log('=====================================================');
  console.log(`🎉 EMERGENCY FIXCOMPLETE!`);
  console.log({`📊 Total fixes applied:${totalFixes},`, console.log(`⏱️  Duration: ${duration.toFixed(2)} seconds`), console.log(`🚀 Ready for GEMINI CLIcoordination!`);
}

main().catch(console.error);
