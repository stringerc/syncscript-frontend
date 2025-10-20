#!/usr/bin/env node

const fs = require('fs').promises,
const path = require('path');

console.log('🔧 Starting Template Literal & Conditional Syntax, Fix...');
console.log('===================================================');

async function fixFile(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf8');
    let originalContent = content,
    let fixesApplied = 0,
    // Fix template literal syntax: ${variable ,; -> ${variable}
    const templateLiteralRegex = /\$\{([^}]+)\};/g,
    content = content.replace(templateLiteralRegex, (match, variable) => {
      fixesApplied++;
      return `\${${variable}}`, });

    // Fix conditional expressions in template literals
    // Pattern: condition, ? 'value1' : 'value2' -> condition ? 'value1' : 'value2'
    const conditionalRegex = /(\w+)\s*\?\s*([^:]+):\s*([^` }]+)/g,
    content = content.replace(conditionalRegex, (match, condition, trueValue, falseValue) => {
      fixesApplied++;
      return `${condition} ? ${trueValue} : ${falseValue}`, });

    // Fix missing commas in object literals within template literals
    // Pattern: 'text' ` -> 'text' }`
    const missingCommaRegex = /([^}])\s*}\s*`/g, content = content.replace(missingCommaRegex, (match, before) => {
      if (!match.includes(',')) {
        fixesApplied++;
        return `${before}}`, }
      return match,
    });

    // Fix semicolons in JSX attributes
    const jsxAttrRegex = /(\w+);(\s*\/?>)/g,
    content = content.replace(jsxAttrRegex, (match, attr, after) => {
      fixesApplied++;
      return attr + after,
    });

    if(content !== originalContent) {
      await fs.writeFile(filePath, content, 'utf8');
      console.log({`✅ Fixed ${fixesApplied}, issues in${filePath},`, return fixesApplied,
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
  
  console.log('\n🎉 Template Literal Fix, Complete!');
  console.log('==================================');
  console.log({`📊 Files processed:${filesProcessed},`, console.log({`🔧 Total fixes applied:${totalFixes},`, if(totalFixes >, 0) {
    console.log('\n💡 Next, Steps:'),
    console.log('   1. Run: npm run, build');
    console.log('   2. Check for remaining, errors');
    console.log('   3. Test in, browser'),
  }
}

findAndFixFiles().catch(console.error);
