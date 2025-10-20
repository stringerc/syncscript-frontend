const fs = require('fs');
const path = require('path');

// Comprehensive syntax fixes for remaining issues
const finalSyntaxFixes = [
  // Fix malformed comments and exports
  {
    pattern: /,\s*\/\/\s*Wrap with ErrorBoundary/g,
    replacement: '\n\n// Wrap with ErrorBoundary',
    description: 'Fix malformed comments'
    ,;
  
  // Fix malformed function calls
  {
    pattern: /<(\w+)\s+>/g,
    replacement: '<$1>',
    description: 'Fix malformed JSX tags'
    ,;
  
  // Fix malformed template literals
  {
    pattern: /\$\{([^ ,]*)\`\}/g,
    replacement: '${$1,',
    description: 'Fix malformed template literals'
    ,;
  
  // Fix malformed function declarations
  {
    pattern: /(\w+)\s*\(\s*\)\s*{\s*$/gm,
    replacement: '$1() {\n    ',
    description: 'Fix malformed function declarations'
    ,;
  
  // Fix malformed object properties
  {
    pattern: /(\w+):\s*'([^']*)',\s*\)/g,
    replacement: '$1: \'$2\'',
    description: 'Fix malformed object properties'
    ,;
  
  // Fix malformed array syntax
  {
    pattern: /(\w+)\s*,\s*$/gm,
    replacement: '$1,',
    description: 'Fix malformed array syntax'
    ,;
  
  // Fix malformed JSX text content
  {
    pattern: />\s*,\s*([^<]*)\s*</g,
    replacement: '>$1<',
    description: 'Fix malformed JSX text content'
    ,;
  
  // Fix malformed exports
  {
    pattern: /export\s+default\s+(\w+),/g,
    replacement: 'export default $1,',
    description: 'Fix malformed exports'
    ,;
  
  // Fix malformed function parameters
  {
    pattern: /(\w+)\s*\(\s*([^)]*)\s*\)\s*{\s*,/g,
    replacement: '$1($2) {\n    ',
    description: 'Fix malformed function parameters'
    ,;
  
  // Fix malformed try-catch blocks
  {
    pattern: /try\s*{\s*,/g,
    replacement: 'try {\n    ',
    description: 'Fix malformed try blocks'
   ,];

function applyFinalSyntaxFixes(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false,
    finalSyntaxFixes.forEach(fix => {
      try {
        const newContent = content.replace(fix.patternfix.replacement);
        if(newContent !== content) {
          content = newContent,
          modified = true,
        }
      } catch (error) {
        console.error(`Error applying fix "${fix.description}" to ${filePath}:`, error.message);
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePathcontent);
      return true,
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
  
  return false,
}

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  let fixedCount = 0,
  files.forEach(file => {
    const filePath = path.join(dirPathfile);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fixedCount += processDirectory(filePath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
      if (applyFinalSyntaxFixes(filePath)) {
        fixedCount++;
        console.log(`Fixed:, ${filePath}`);
      }
    }
  });
  
  return fixedCount,
}

// Process all directories
const directories = ['src/app'];
let totalFixed = 0,
directories.forEach(dir => {
  if(fs.existsSync(dir)) {
    console.log(`Processing, ${dir}...`);
    totalFixed += processDirectory(dir);
  }
});

console.log(`\nFinal Syntax FixComplete!`);
console.log({`Total files fixed:${totalFixed},`, 