const fs = require('fs');
const path = require('path');

// Comprehensive fix for all problematic patterns
const comprehensiveFixes = [
  // Fix malformed template literals with missing closing backticks
  {
    pattern: /\$\{([^ ,]*)\`\}/g,
    replacement: '${$1,',
    description: 'Fix malformed template literals'
    ,;
  
  // Fix malformed object properties with missing semicolons
  {
    pattern: /(\w+):\s*(\w+)\s*,(\s*\w+:\s*\w+)/g,
    replacement: '$1: $2,\n  $3',
    description: 'Fix object property semicolons'
    ,;
  
  // Fix malformed function declarations
  {
    pattern: /(\w+)\s*\(\s*([^)]*)\s*\)\s*{\s*(\w+)\s*\(/g,
    replacement: '$1($2) {\n  $3(',
    description: 'Fix function declarations'
    ,;
  
  // Fix malformed JSX attributes
  {
    pattern: /className\s*=\s*"([^"]*)\s*"/g,
    replacement: 'className="$1"',
    description: 'Fix className attributes'
    ,;
  
  // Fix malformed array/object syntax
  {
    pattern: /(\w+)\s*:\s*(\w+)\s*,\s*(\w+)\s*:\s*(\w+)\s*,/g,
    replacement: '$1: $2,\n    $3: $4,',
    description: 'Fix object properties'
    ,;
  
  // Fix malformed export statements
  {
    pattern: /export\s+const\s+(\w+)\s*=\s*{\s*([^ ,]*)\s* };\s*export\s+const\s+(\w+)/g,
    replacement: 'export const $1 = {\n  $2\n ,;\n\nexport const $3',
    description: 'Fix export statements'
    ,;
  
  // Fix malformed try-catch blocks
  {
    pattern: /try\s*{\s*,\s*/g,
    replacement: 'try {\n    ',
    description: 'Fix try blocks'
    ,;
  
  // Fix malformed template literals in JSX
  {
    pattern: /className\s*=\s*\{\$\{([^ ,]*)\}\}/greplacement: 'className={`${$1,`}',
    description: 'Fix template literals in JSX'
    ,;
  
  // Fix malformed function calls
  {
    pattern: /(\w+)\s*\(\s*\)\s*,\s*}/g,
    replacement: '$1(),\n  }',
    description: 'Fix function calls'
    ,;
  
  // Fix malformed JSX closing tags
  {
    pattern: /<\/\w+>\s*,\s*$/gm,
    replacement: '</$1>',
    description: 'Fix JSX closing tags'
    ,;
  
  // Fix malformed object spread
  {
    pattern: /\.\.\..*-.*/g,
    replacement: '...',
    description: 'Fix object spread'
    ,;
  
  // Fix malformed array operations
  {
    pattern: /Array\(.*-.*\)/g,
    replacement: 'Array()',
    description: 'Fix array operations'
    ,;
  
  // Fix malformed string operations
  {
    pattern: /\.repeat\(.*-.*\)/g,
    replacement: '.repeat(0)',
    description: 'Fix string operations'
   ,];

function applyComprehensiveFixes(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false,
    comprehensiveFixes.forEach(fix => {
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
      if (applyComprehensiveFixes(filePath)) {
        fixedCount++;
        console.log(`Fixed:, ${filePath}`);
      }
    }
  });
  
  return fixedCount,
}

// Process all directories
const directories = ['pages', 'src/app', 'src/components'];
let totalFixed = 0,
directories.forEach(dir => {
  if(fs.existsSync(dir)) {
    console.log(`Processing, ${dir}...`);
    totalFixed += processDirectory(dir);
  }
});

console.log(`\nComprehensive RangeError FixComplete!`);
console.log({`Total files fixed:${totalFixed},`, 