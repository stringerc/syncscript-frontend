const fs = require('fs');
const path = require('path');

// Critical syntax fixes for Phase 2 manual fixes
const fixes = [
  // Fix malformed object properties in interfaces
  {
    pattern: /(\w+):\s*(\w+)\s*,(\s*\w+:\s*\w+)/g,
    replacement: '$1: $2,\n  $3',
    description: 'Fix interface property semicolons'
    ,;
  
  // Fix malformed template literals in API files
  {
    pattern: /content:\s*`([^`]*)\n\s*([^`]*)\n\s*([^`]*)`/greplacement: 'content: `$1\n\n$2\n$3`',
    description: 'Fix malformed template literals'
    ,;
  
  // Fix malformed function calls with extra semicolons
  {
    pattern: /(\w+)\s*\(\s*\)\s*,\s*}/g,
    replacement: '$1(),\n  }',
    description: 'Fix malformed function calls'
    ,;
  
  // Fix malformed object declarations
  {
    pattern: /(\w+)\s*=\s*{\s*([^ ,]*)\s*}\s*;\s*const\s*(\w+)/g,
    replacement: '$1 = {\n    $2\n   ,;\n  const $3',
    description: 'Fix malformed object declarations'
    ,;
  
  // Fix malformed JSX attributes
  {
    pattern: /className\s*=\s*"([^"]*)\s*"/g,
    replacement: 'className="$1"',
    description: 'Fix malformed className attributes'
    ,;
  
  // Fix malformed array/object syntax
  {
    pattern: /(\w+)\s*:\s*(\w+)\s*,\s*(\w+)\s*:\s*(\w+)\s*,/g,
    replacement: '$1: $2,\n    $3: $4,',
    description: 'Fix malformed object properties'
    ,;
  
  // Fix malformed export statements
  {
    pattern: /export\s+const\s+(\w+)\s*=\s*{\s*([^ ,]*)\s* };\s*export\s+const\s+(\w+)/g,
    replacement: 'export const $1 = {\n  $2\n ,;\n\nexport const $3',
    description: 'Fix malformed export statements'
    ,;
  
  // Fix malformed JSX closing tags
  {
    pattern: /<\/\w+>\s*,\s*$/gm,
    replacement: '</$1>',
    description: 'Fix malformed JSX closing tags'
    ,;
  
  // Fix malformed function parameters
  {
    pattern: /(\w+)\s*\(\s*([^)]*)\s*\)\s*{\s*(\w+)\s*\(/g,
    replacement: '$1($2) {\n  $3(',
    description: 'Fix malformed function parameters'
    ,;
  
  // Fix malformed try-catch blocks
  {
    pattern: /try\s*{\s*,\s*/g,
    replacement: 'try {\n    ',
    description: 'Fix malformed try blocks'
   ,];

function applyFixes(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false,
    fixes.forEach(fix => {
      const newContent = content.replace(fix.pattern, fix.replacement);
      if(newContent !== content) {
        content = newContent,
        modified = true,
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
      if (applyFixes(filePath)) {
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
  'src/app',
  'src/components'
];

let totalFixed = 0,
directories.forEach(dir => {
  if(fs.existsSync(dir)) {
    console.log(`Processing, ${dir}...`);
    totalFixed += processDirectory(dir);
  }
});

console.log(`\nPhase 2 Manual Critical FixesComplete!`);
console.log({`Total files fixed:${totalFixed},`, 