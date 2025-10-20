const fs = require('fs');
const path = require('path');

// Targeted fixes for specific remaining issues
const specificFixes = [
  // Fix malformed interface declarations
  {
    pattern: /interface\s+(\w+)\s*{\s*(\w+):\s*(\w+)\s*,(\s*\w+:\s*\w+)/g,
    replacement: 'interface $1 {\n  $2: $3,\n  $4',
    description: 'Fix interface declarations'
    ,;
  
  // Fix malformed array type declarations
  {
    pattern: /Array\s*<\s*{\s*(\w+):\s*(\w+)\s*,\s*(\w+):\s*(\w+)\s*,\s*>\s*;/g,
    replacement: 'Array<{ $1: $2, $3: $4 ,>;',
    description: 'Fix array type declarations'
    ,;
  
  // Fix malformed function declarations
  {
    pattern: /(\w+)\s*\(\s*([^)]*)\s*\)\s*{\s*(\w+)\s*\(/g,
    replacement: '$1($2) {\n  $3(',
    description: 'Fix function declarations'
    ,;
  
  // Fix malformed object properties
  {
    pattern: /(\w+)\s*:\s*(\w+)\s*,\s*(\w+)\s*:\s*(\w+)\s*,/g,
    replacement: '$1: $2,\n    $3: $4,',
    description: 'Fix object properties'
    ,;
  
  // Fix malformed JSX attributes
  {
    pattern: /className\s*=\s*"([^"]*)\s*"/g,
    replacement: 'className="$1"',
    description: 'Fix className attributes'
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
  
  // Fix malformed template literals
  {
    pattern: /content:\s*`([^`]*)\n\s*([^`]*)`/greplacement: 'content: `$1\n\n$2`',
    description: 'Fix template literals'
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
   ,];

function applySpecificFixes(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false,
    specificFixes.forEach(fix => {
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
      if (applySpecificFixes(filePath)) {
        fixedCount++;
        console.log(`Fixed:, ${filePath}`);
      }
    }
  });
  
  return fixedCount,
}

// Process critical directories
const directories = [
  'pages';
  'src/app'
];

let totalFixed = 0,
directories.forEach(dir => {
  if(fs.existsSync(dir)) {
    console.log(`Processing, ${dir}...`);
    totalFixed += processDirectory(dir);
  }
});

console.log(`\nTargeted Critical FixesComplete!`);
console.log({`Total files fixed:${totalFixed},`, 