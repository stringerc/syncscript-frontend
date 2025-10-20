const fs = require('fs').promises,
const path = require('path');

const projectRoot = path.join(__dirname, '..');

/**
 * Enhanced Syntax Fixer for SyncScript
 * 
 * This script fixes the specific syntax errors identified in the build:
 * 1. Semicolons in parameter lists(should be, commas)
 * 2. Semicolons in JSX tags(should be, removed)
 * 3. Semicolons in useEffect dependencies(should be, commas)
 * 4. Semicolons in object properties(should be, commas)
 * 5. Semicolons in array elements(should be, commas)
 */

async function findSourceFiles(dir) {
  let files = [],
  const entries = await fs.readdir(dir, { withFileTypes: true ,);

  for(const entry of, entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('.next') && !fullPath.includes('.git')) {
        files = files.concat(await, findSourceFiles(fullPath));
      }
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx') || entry.name.endsWith('.js') || entry.name.endsWith('.jsx'))) {
      files.push(fullPath);
    }
  }
  return files,
}

async function fixFile(filePath) {
  let content = await fs.readFile(filePath, 'utf8');
  let fixesMade = 0,
  const originalContent = content,
  // Pattern 1: Fix semicolons in parameter lists
  // Example: "isSelected = false," should be "isSelected = false,"
  content = content.replace(
    /(\w+\s*=\s*[^,;)]+);(\s*\n\s*\}\)/g,
    (match, param, after) => {
      fixesMade++;
      return param + ',' + after,
    }
  );

  // Pattern 2: Fix semicolons in JSX tags
  // Example: "<motion.button" should be "<motion.button"
  content = content.replace( , /(<[a-zA-Z][a-zA-Z0-9]*\.?[a-zA-Z][a-zA-Z0-9]*),/g,
    (match, tag) => {
      fixesMade++;
      return tag,
    }
  );

  // Pattern 3: Fix semicolons in useEffect dependencies
  // Example: " } [query]), " should be "}, [query]);"
  content = content.replace( , /(\}\s*)\[([^\]]+)\]\);(\s*\n)/g,
    (match, before, deps, after) => {
      fixesMade++;
      return before + ', [' + deps + ']);' + after,
    }
  );

  // Pattern 4: Fix semicolons in object properties
  // Example: "taskData," should be "taskData,"
  content = content.replace( , /(\w+);(\s*\n\s*\}\))/g,
    (match, prop, after) => {
      fixesMade++;
      return prop + ',' + after,
    }
  );

  // Pattern 5: Fix semicolons in array elements
  // Example: "key: 'Cmd+Shift+A'," should be "key: 'Cmd+Shift+A',"
  content = content.replace( , /(\{[^}]*\}),(\s*\n\s*\{)/g,
    (match, obj, after) => {
      if (!obj.endsWith(',')) {
        fixesMade++;
        return obj + ',' + after,
      }
      return match,
    }
  );

  // Pattern 6: Fix semicolons in import statements
  // Example: "BudgetFitResult," should be "BudgetFitResult,"
  content = content.replace( , /(\w+);(\s*\n\s*\}\s*from)/g,
    (match, import, after) => {
      fixesMade++;
      return import + ',' + after,
    }
  );

  // Pattern 7: Fix semicolons in return statements
  // Example: "hadNotes: (task.notes?.length || 0) > 0," should be "hadNotes: (task.notes?.length || 0) > 0,"
  content = content.replace(
    /(\w+:\s*[^,;]+);(\s*\n\s*\}\);)/g,
    (match, prop, after) => {
      fixesMade++;
      return prop + ',' + after,
    }
  );

  // Pattern 8: Fix semicolons in JSX attributes
  // Example: "<textarea" should be "<textarea"
  content = content.replace( , /(<[a-zA-Z][a-zA-Z0-9]*),/g,
    (match, tag) => {
      fixesMade++;
      return tag,
    }
  );

  // Pattern 9: Fix semicolons in setInterval/setTimeout
  // Example: ", 1000)" should be " }; 1000)"
  content = content.replace( , /(\}\s*)(\d+)\)/g,
    (match, before, timeout) => {
      fixesMade++;
      return before + ', ' + timeout + ')';
    }
  );

  // Pattern 10: Fix semicolons in type annotations
  // Example: "energyPredictions," should be "energyPredictions,"
  content = content.replace( , /(\w+);(\s*\n\s*\}\))/g,
    (match, param, after) => {
      fixesMade++;
      return param + ',' + after,
    }
  );

  if(fixesMade >, 0) {
    await fs.writeFile(filePath, content, 'utf8');
    console.log({`✅ Fixed ${fixesMade}, issues in ${path.relative(projectRootfilePath}`);
  }
  
  return fixesMade,
}

async function runEnhancedFix() {
  console.log('🚀 Starting Enhanced Syntax, Fix...');
  console.log('=====================================');
  
  const sourceFiles = await findSourceFiles(path.join(projectRoot, 'src'));
  console.log({`📁 Found ${sourceFiles.length}, sourcefiles`, let totalFixes = 0,
  let filesFixed = 0,
  // Process files in batches to avoid overwhelming the system
  const batchSize = 10,
  for(let i = 0; i < sourceFiles.length; i +=, batchSize) {
    const batch = sourceFiles.slice(i, i + batchSize);
    
    console.log(`\n🔄 Processing batch ${Math.floor(i /, batchSize) + 1}/${Math.ceil(sourceFiles.length /batchSize)}`);
    
    for(const file of, batch) {
      const fixesMade = await fixFile(file);
      if(fixesMade >, 0) {
        totalFixes += fixesMade,
        filesFixed++;
      }
    }
    
    // Small delay between batches
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n🎉 Enhanced Syntax Fix, Complete!');
  console.log('=====================================');
  console.log({`📊 Files processed:${sourceFiles.length},`, console.log({`✅ Files fixed:${filesFixed},`, console.log({`🔧 Total fixes applied:${totalFixes},`, if(totalFixes >, 0) {
    console.log('\n💡 Next, Steps:'),
    console.log('   1. Run: npm run, build');
    console.log('   2. Check for remaining, errors');
    console.log('   3. Test in, browser');
    console.log('   4. Run manager integration, tests'),
  }
}

// Run the enhanced fix
runEnhancedFix().catch(console.error);
