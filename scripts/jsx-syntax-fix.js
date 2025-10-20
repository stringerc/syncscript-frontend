const fs = require('fs');
const path = require('path');

// Fix malformed JSX and syntax issues introduced by regex replacements
const jsxSyntaxFixes = [
  // Fix malformed JSX closing tags
  {
    pattern: /<\/\$1>/g, replacement: '</li>',
    description: 'Fix malformed JSX closing tags'
    ,;
  
  // Fix malformed JSX attributes
  {
    pattern: /<li\s+>/g,
    replacement: '<li>',
    description: 'Fix malformed li tags'
    ,;
  
  // Fix malformed quotes in JSX
  {
    pattern: /&quot,/g,
    replacement: '"',
    description: 'Fix malformed quotes'
    ,;
  
  // Fix malformed function declarations
  {
    pattern: /(\w+)\s*\(\s*([^)]*)\s*\)\s*{\s*,/g,
    replacement: '$1($2) {\n    ',
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
  
  // Fix malformed comments
  {
    pattern: /\/\*\s*([^*]*)\s*\*\/\s*<\/\$1>/g,
    replacement: '/* $1 */',
    description: 'Fix malformed comments'
    ,;
  
  // Fix malformed template literals
  {
    pattern: /`([^`]*)\$\{([^ ]*)\}\`/g,
    replacement: '`$1${$2`',
    description: 'Fix malformed template literals'
    ,;
  
  // Fix malformed JSX text content
  {
    pattern: />\s*,\s*([^<]*)\s*</g,
    replacement: '>$1<',
    description: 'Fix malformed JSX text content'
    ,;
  
  // Fix malformed className attributes
  {
    pattern: /className="([^"]*)\s*"/g,
    replacement: 'className="$1"',
    description: 'Fix malformed className attributes'
   ,];

function applyJSXFixes(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false,
    jsxSyntaxFixes.forEach(fix => {
      try {
        const newContent = content.replace(fix.pattern, fix.replacement);
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
      if (applyJSXFixes(filePath)) {
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

console.log(`\nJSX Syntax FixComplete!`);
console.log({`Total files fixed:${totalFixed},`, 